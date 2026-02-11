import React, { createContext, useContext, useRef, useState, useCallback } from 'react';

const AudioContext = createContext();

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};

export const AudioProvider = ({ children }) => {
  const audioRef = useRef(null);
  const [isMuted, setIsMuted] = useState(false);
  const [wasPlayingBeforeVideo, setWasPlayingBeforeVideo] = useState(false);
  const [shouldAutoPlay, setShouldAutoPlay] = useState(false);

  const pauseForVideo = useCallback(() => {
    if (audioRef.current && !audioRef.current.paused) {
      setWasPlayingBeforeVideo(true);
      audioRef.current.pause();
    }
  }, []);

  const resumeAfterVideo = useCallback(() => {
    if (audioRef.current && wasPlayingBeforeVideo && !isMuted) {
      audioRef.current.play().catch(() => {});
      setWasPlayingBeforeVideo(false);
    }
  }, [wasPlayingBeforeVideo, isMuted]);

  const triggerPlay = useCallback(() => {
    setShouldAutoPlay(true);
  }, []);

  const value = {
    audioRef,
    isMuted,
    setIsMuted,
    pauseForVideo,
    resumeAfterVideo,
    shouldAutoPlay,
    triggerPlay,
  };

  return (
    <AudioContext.Provider value={value}>
      {children}
    </AudioContext.Provider>
  );
};

export default AudioContext;
