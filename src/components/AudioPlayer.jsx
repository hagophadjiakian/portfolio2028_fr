import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAudio } from '../context/AudioContext';
import { trackFor } from '../data/site';

// One small control in the bottom-right corner. Music starts only when the
// visitor presses it, and only the current page's track is downloaded.
const AudioPlayer = () => {
  const { audioRef, musicOn, setMusicOn } = useAudio();
  const [volume, setVolume] = useState(0.3);
  const [isLoading, setIsLoading] = useState(false);
  const { pathname } = useLocation();
  const track = trackFor(pathname);

  // Switch track on navigation, but only load it if music is on.
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (!audio.src.endsWith(track)) {
      audio.src = track;
      if (musicOn) {
        setIsLoading(true);
        audio.play().catch(() => setMusicOn(false));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [track]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume, audioRef]);

  // Pause when the tab is hidden, resume when the visitor comes back.
  useEffect(() => {
    const onVisibility = () => {
      const audio = audioRef.current;
      if (!audio || !musicOn) return;
      if (document.hidden) audio.pause();
      else audio.play().catch(() => {});
    };
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, [musicOn, audioRef]);

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (musicOn) {
      audio.pause();
      setMusicOn(false);
      return;
    }
    if (!audio.src.endsWith(track)) audio.src = track;
    audio.volume = volume;
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
