import React, { createContext, useContext, useRef, useState, useCallback, useEffect } from 'react';

const AudioContext = createContext();

// Audio tracks for each page
const audioTracks = {
  '/': '/audio/home.mp3',
  '/about': '/audio/about.mp3',
  '/projects': '/audio/projects.mp3',
  '/skills': '/audio/skills.mp3',
  '/experience': '/audio/experience.mp3',
  '/documentation': '/audio/projects.mp3',
  '/contact': '/audio/contact.mp3',
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};

export const AudioProvider = ({ children }) => {
  const audioRef = useRef(null);
  const preloadedAudio = useRef({});
  const [isMuted, setIsMuted] = useState(false);
  const [wasPlayingBeforeVideo, setWasPlayingBeforeVideo] = useState(false);
  const [shouldAutoPlay, setShouldAutoPlay] = useState(false);

  // Preload all audio tracks immediately when app starts
  useEffect(() => {
    Object.values(audioTracks).forEach((trackUrl) => {
      if (!preloadedAudio.current[trackUrl]) {
        const audio = new Audio();
        audio.preload = 'auto';
        audio.src = trackUrl;
        audio.load();
        preloadedAudio.current[trackUrl] = audio;
      }
    });
  }, []);

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
    preloadedAudio,
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
