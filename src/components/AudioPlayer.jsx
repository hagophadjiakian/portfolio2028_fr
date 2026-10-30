import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAudio } from '../context/AudioContext';
import { trackFor } from '../data/site';

// Each track exists as Opus (.webm, about 750 KB) and MP3 (.mp3, about 940 KB).
// Use the smaller Opus file wherever the browser can play it.
const pickExtension = () => {
  const probe = document.createElement('audio');
  return probe.canPlayType('audio/webm; codecs="opus"') ? 'webm' : 'mp3';
};

// Gradual volume change (ignored on iPhone, where volume is hardware-only).
const fadeTo = (audio, target, ms) =>
  new Promise((resolve) => {
    const from = audio.volume;
    const start = performance.now();
    const step = (now) => {
      const t = Math.min(1, (now - start) / ms);
      audio.volume = Math.min(1, Math.max(0, from + (target - from) * t));
      if (t < 1) requestAnimationFrame(step);
      else resolve();
    };
    requestAnimationFrame(step);
  });

// The visitor's choice is remembered in this browser (only "off" changes anything).
const PREF_KEY = 'hh-music';
const readPref = () => {
  try {
    return localStorage.getItem(PREF_KEY);
  } catch {
    return null;
  }
};
const savePref = (value) => {
  try {
    localStorage.setItem(PREF_KEY, value);
  } catch {
    // storage unavailable (private mode): the choice lasts for this visit only
  }
};

// How long to keep the current track playing while the next page's track
// downloads, before switching anyway.
const SWITCH_TIMEOUT_MS = 8000;
// Wait this long after the page has loaded before trying to start the music,
// so it doesn't slow down the first view.
const AUTOSTART_DELAY_MS = 1500;

// Music is ON by default. Browsers only allow sound after the visitor has
// tapped or clicked the page, so it starts right away where that's allowed and
// otherwise with the first tap or click anywhere. Nothing downloads before then.
// One small control in the bottom-right corner turns it off (remembered).
const AudioPlayer = () => {
  const { audioRef, musicOn, setMusicOn, pausedForVideo } = useAudio();
  const [volume, setVolume] = useState(0.3);
  const [isLoading, setIsLoading] = useState(false);
  // Playback has begun at least once during this visit
  const [started, setStarted] = useState(false);
  const { pathname } = useLocation();
  const extension = useRef('mp3');
  const volumeRef = useRef(volume);
  const pendingSwitch = useRef(null);
  const warmedUp = useRef(false);
  const musicOnRef = useRef(musicOn);
  musicOnRef.current = musicOn;
  const startedRef = useRef(started);
  startedRef.current = started;
  const pathnameRef = useRef(pathname);
  pathnameRef.current = pathname;

  useEffect(() => {
    extension.current = pickExtension();
    if (readPref() === 'off') setMusicOn(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const urlFor = useCallback((path) => `${trackFor(path)}.${extension.current}`, []);

  // Start the music when the browser allows it.
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !musicOn || started) return undefined;

    const start = (src, showSpinner) => {
      const track = src || urlFor(pathnameRef.current);
      if (!audio.src.endsWith(track)) audio.src = track;
      audio.volume = volumeRef.current;
      if (showSpinner) setIsLoading(true);
      return audio
        .play()
        .then(() => setStarted(true))
        .catch(() => setIsLoading(false));
    };

    // 1. Try shortly after the page has loaded (works where autoplay is allowed).
    let timer = null;
    const tryNow = () => {
      timer = setTimeout(() => start(undefined, false), AUTOSTART_DELAY_MS);
    };
    if (document.readyState === 'complete') tryNow();
    else window.addEventListener('load', tryNow, { once: true });

    // 2. Otherwise start with the first mouse click or tap anywhere. Clicks made
    //    with the keyboard are ignored, so screen-reader users aren't
    //    interrupted (they can use the music button).
    const onFirstClick = (event) => {
      if (event.detail === 0) return;
      const target = event.target instanceof Element ? event.target : null;
      if (target?.closest('[data-music-toggle], [aria-label^="Play video"]')) return;
      // Clicking a link to another page: start that page's track directly
      const link = target?.closest('a[href^="/"]');
      start(link ? urlFor(new URL(link.href).pathname) : undefined, true);
    };
    document.addEventListener('click', onFirstClick, true);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('load', tryNow);
      document.removeEventListener('click', onFirstClick, true);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [musicOn, started]);

  // Changing page. If no music is playing, just point at the new track (nothing
  // downloads). If music is playing, keep the current track going while the
  // next one downloads, then switch with a short fade — no silent gap.
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return undefined;
    const next = urlFor(pathname);
    if (audio.src.endsWith(next)) return undefined;

    pendingSwitch.current?.abort();
    pendingSwitch.current = null;

    if (!musicOn || !started) {
      audio.preload = 'none'; // undo any warm-up, so nothing downloads
      audio.src = next;
      warmedUp.current = false;
      return undefined;
    }

    const controller = new AbortController();
    pendingSwitch.current = controller;
    const timer = setTimeout(() => controller.abort(), SWITCH_TIMEOUT_MS);

    fetch(next, { signal: controller.signal })
      .then((response) => response.blob()) // read it all, so it's in the browser cache
      .catch(() => {})
      .finally(async () => {
        clearTimeout(timer);
        // A newer page change replaced this one
        if (pendingSwitch.current !== controller) return;
        pendingSwitch.current = null;
        if (!audio.paused) await fadeTo(audio, 0, 400);
        audio.src = next;
        // Music was turned off meanwhile, or a video is playing (music resumes after it)
        if (!musicOnRef.current || pausedForVideo.current) return;
        audio.volume = 0;
        try {
          await audio.play();
          await fadeTo(audio, volumeRef.current, 800);
        } catch {
          setStarted(false); // wait for the next click to start again
        }
      });

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    volumeRef.current = volume;
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume, audioRef]);

  // Pause when the tab is hidden, resume when the visitor comes back.
  useEffect(() => {
    const onVisibility = () => {
      const audio = audioRef.current;
      if (!audio || !musicOn || !startedRef.current) return;
      if (document.hidden) audio.pause();
      else if (!pausedForVideo.current) audio.play().catch(() => {});
    };
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, [musicOn, audioRef, pausedForVideo]);

  // When music is off, start downloading as soon as the visitor points at (or
  // focuses, or touches) the button, so it starts sooner when they press it.
  const warmUp = () => {
    const audio = audioRef.current;
    if (!audio || musicOn || warmedUp.current) return;
    warmedUp.current = true;
    const next = urlFor(pathname);
    if (!audio.src.endsWith(next)) audio.src = next;
    audio.preload = 'auto';
    audio.load();
  };

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (musicOn) {
      pendingSwitch.current?.abort();
      pendingSwitch.current = null;
      audio.pause();
      setMusicOn(false);
      setIsLoading(false);
      savePref('off');
      return;
    }
    const next = urlFor(pathname);
    if (!audio.src.endsWith(next)) audio.src = next;
    audio.volume = volumeRef.current;
    savePref('on');
    setMusicOn(true);
    setIsLoading(true);
    audio
      .play()
      .then(() => setStarted(true))
      .catch(() => setIsLoading(false));
  };

  // On, but waiting for the visitor's first tap before the browser allows sound
  const waiting = musicOn && !started && !isLoading;

  return (
    <>
      <audio
        ref={audioRef}
        loop
        preload="none"
        onWaiting={() => setIsLoading(true)}
        onPlaying={() => setIsLoading(false)}
        onPause={() => setIsLoading(false)}
      />

      <aside aria-label="Background music" className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 flex items-center gap-2">
        {musicOn && started && (
          <label className="hidden md:flex glass px-3 py-2 rounded-full items-center">
            <span className="sr-only">Music volume</span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="w-20 h-1 accent-coral cursor-pointer"
            />
          </label>
        )}

        <button
          type="button"
          data-music-toggle=""
          onClick={toggleMusic}
          onPointerEnter={warmUp}
          onFocus={warmUp}
          onTouchStart={warmUp}
          aria-pressed={musicOn}
          aria-label={musicOn ? 'Pause background music' : 'Play background music'}
          title={waiting ? 'Music starts when you tap the page. Press to turn it off' : musicOn ? 'Pause music' : 'Play music'}
          className={`relative w-11 h-11 md:w-12 md:h-12 rounded-full glass flex items-center justify-center transition-colors duration-300 hover:border-coral/50 ${
            musicOn ? 'bg-coral/20 border-coral/50' : ''
          }`}
        >
          {waiting && (
            <span className="absolute inset-0 rounded-full border-2 border-coral/60 animate-ping motion-reduce:animate-none" aria-hidden="true" />
          )}
          {isLoading ? (
            <span className="w-4 h-4 border-2 border-coral border-t-transparent rounded-full animate-spin" aria-hidden="true" />
          ) : (
            <span className="text-lg" aria-hidden="true">
              {musicOn ? '🎵' : '🔇'}
            </span>
          )}
        </button>
      </aside>
    </>
  );
};

export default AudioPlayer;
