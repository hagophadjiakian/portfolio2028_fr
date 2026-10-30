import React, { createContext, useContext, useRef, useState, useCallback } from 'react';

const AudioContext = createContext(null);

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};

// Music is OFF until the visitor turns it on. Nothing is downloaded before that:
// the <audio> element in AudioPlayer uses preload="none" and only loads the
// current page's track when it is actually played.
export const AudioProvider = ({ children }) => {
  const audioRef = useRef(null);
  const [musicOn, setMusicOn] = useState(false);
  const pausedForVideo = useRef(false);

  const pauseForVideo = useCallback(() => {
    const audio = audioRef.current;
    if (audio && !audio.paused) {
      pausedForVideo.current = true;
      audio.pause();
    }
  }, []);

  const resumeAfterVideo = useCallback(() => {
    const audio = audioRef.current;
    if (audio && pausedForVideo.current && musicOn) {
      audio.play().catch(() => {});
    }
    pausedForVideo.current = false;
  }, [musicOn]);

  const value = { audioRef, musicOn, setMusicOn, pauseForVideo, resumeAfterVideo };

  return <AudioContext.Provider value={value}>{children}</AudioContext.Provider>;
};

export default AudioContext;
