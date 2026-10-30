import React, { createContext, useContext, useRef, useState, useCallback } from 'react';

const AudioContext = createContext(null);

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};

// Music is ON by default (see AudioPlayer for when it actually starts). The
// <audio> element uses preload="none", so nothing downloads until it plays.
export const AudioProvider = ({ children }) => {
  const audioRef = useRef(null);
  const [musicOn, setMusicOn] = useState(true);
  // True while a video is playing and the music is paused for it
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

  const value = { audioRef, musicOn, setMusicOn, pauseForVideo, resumeAfterVideo, pausedForVideo };

  return <AudioContext.Provider value={value}>{children}</AudioContext.Provider>;
};

export default AudioContext;
