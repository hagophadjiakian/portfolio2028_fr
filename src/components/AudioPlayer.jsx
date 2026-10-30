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

// How long to keep the current track playing while the next page's track
// downloads, before switching anyway.
const SWITCH_TIMEOUT_MS = 8000;

// One small control in the bottom-right corner. Music starts only when the
// visitor presses it, and only the current page's track is downloaded.
const AudioPlayer = () => {
  const { audioRef, musicOn, setMusicOn, pausedForVideo } = useAudio();
  const [volume, setVolume] = useState(0.3);
  const [isLoading, setIsLoading] = useState(false);
  const { pathname } = useLocation();
  const extension = useRef('mp3');
  const volumeRef = useRef(volume);
  const pendingSwitch = useRef(null);
  const warmedUp = useRef(false);
  const musicOnRef = useRef(musicOn);
  musicOnRef.current = musicOn;

  useEffect(() => {
    extension.current = pickExtension();
  }, []);

  const urlFor = useCallback((path) => `${trackFor(path)}.${extension.current}`, []);

  // Changing page. If music is off, just point at the new track (nothing
  // downloads). If music is on, keep the current track playing while the next
  // one downloads, then switch with a short fade — no silent gap.
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return undefined;
    const next = urlFor(pathname);
    if (audio.src.endsWith(next)) return undefined;

    pendingSwitch.current?.abort();
    pendingSwitch.current = null;

    if (!musicOn) {
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
          setMusicOn(false);
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
      if (!audio || !musicOn) return;
      if (document.hidden) audio.pause();
      else if (!pausedForVideo.current) audio.play().catch(() => {});
    };
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, [musicOn, audioRef, pausedForVideo]);

  // Start downloading when the visitor points at (or focuses, or touches) the
  // button, so the music starts sooner when they press it.
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
      return;
    }
    const next = urlFor(pathname);
    if (!audio.src.endsWith(next)) audio.src = next;
    audio.volume = volumeRef.current;
    setIsLoading(true);
    audio
      .play()
      .then(() => setMusicOn(true))
      .catch(() => {
        setIsLoading(false);
        setMusicOn(false);
      });
  };

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

      <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 flex items-center gap-2">
        {musicOn && (
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
          onClick={toggleMusic}
          onPointerEnter={warmUp}
          onFocus={warmUp}
          onTouchStart={warmUp}
          aria-pressed={musicOn}
          aria-label={musicOn ? 'Pause background music' : 'Play background music'}
          title={musicOn ? 'Pause music' : 'Play music'}
          className={`w-11 h-11 md:w-12 md:h-12 rounded-full glass flex items-center justify-center transition-colors duration-300 hover:border-coral/50 ${
            musicOn ? 'bg-coral/20 border-coral/50' : ''
          }`}
        >
          {isLoading ? (
            <span className="w-4 h-4 border-2 border-coral border-t-transparent rounded-full animate-spin" aria-hidden="true" />
          ) : (
            <span className="text-lg" aria-hidden="true">
              {musicOn ? '🎵' : '🔇'}
            </span>
          )}
        </button>
      </div>
    </>
  );
};

export default AudioPlayer;
