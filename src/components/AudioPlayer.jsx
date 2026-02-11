import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { useAudio } from '../context/AudioContext';

// Audio tracks for each page - motivational & inspiring
const audioTracks = {
  '/': '/audio/home.mp3',
  '/about': '/audio/about.mp3',
  '/projects': '/audio/projects.mp3',
  '/skills': '/audio/skills.mp3',
  '/experience': '/audio/experience.mp3',
  '/documentation': '/audio/projects.mp3',
  '/contact': '/audio/contact.mp3',
};

const AudioPlayer = () => {
  const { audioRef, isMuted, setIsMuted } = useAudio();
  const [volume, setVolume] = useState(0.3);
  const [currentTrack, setCurrentTrack] = useState('/audio/home.mp3');
  const [isLoading, setIsLoading] = useState(true);
  const preloadedAudio = useRef({});
  const location = useLocation();

  // Preload all audio tracks on mount
  useEffect(() => {
    Object.values(audioTracks).forEach((trackUrl) => {
      if (!preloadedAudio.current[trackUrl]) {
        const audio = new Audio();
        audio.preload = 'auto';
        audio.src = trackUrl;
        preloadedAudio.current[trackUrl] = audio;
      }
    });
  }, []);

  // Start playing immediately on mount
  useEffect(() => {
    const track = audioTracks[location.pathname] || audioTracks['/'];
    setCurrentTrack(track);
    setIsLoading(true);

    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.src = track;
      audioRef.current.load();
      audioRef.current.play().catch(() => {});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Change track when route changes
  useEffect(() => {
    const newTrack = audioTracks[location.pathname] || audioTracks['/'];

    if (newTrack !== currentTrack && audioRef.current) {
      setCurrentTrack(newTrack);
      setIsLoading(true);
      const wasPlaying = !audioRef.current.paused && !isMuted;

      audioRef.current.src = newTrack;
      audioRef.current.load();
      audioRef.current.volume = volume;

      if (wasPlaying || !isMuted) {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {});
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  // Handle volume changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [volume]);

  // Handle mute/unmute
  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.play().catch(() => {});
        setIsMuted(false);
      } else {
        audioRef.current.pause();
        setIsMuted(true);
      }
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        loop
        preload="auto"
        onCanPlayThrough={() => setIsLoading(false)}
        onWaiting={() => setIsLoading(true)}
        onPlaying={() => setIsLoading(false)}
      />

      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
        {/* Volume Slider - shows when playing */}
        <AnimatePresence>
          {!isMuted && (
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 'auto' }}
              exit={{ opacity: 0, width: 0 }}
              className="glass px-3 py-2 rounded-full overflow-hidden"
            >
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-20 h-1 accent-coral cursor-pointer"
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Play/Mute Button */}
        <motion.button
          onClick={toggleMute}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className={`p-4 rounded-full glass transition-all duration-300 ${
            !isMuted ? 'bg-coral/20 border-coral/50' : ''
          }`}
          title={isMuted ? 'Play Music' : 'Mute Music'}
        >
          <motion.span
            animate={!isMuted ? { scale: [1, 1.2, 1] } : {}}
            transition={{ duration: 1, repeat: Infinity }}
            className="text-2xl"
          >
            {isMuted ? '🔇' : '🎵'}
          </motion.span>
        </motion.button>
      </div>

      {/* Music indicator when playing */}
      <AnimatePresence>
        {!isMuted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed bottom-6 left-6 z-50 flex items-center gap-2 glass px-4 py-2 rounded-full"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-coral border-t-transparent rounded-full animate-spin" />
                <span className="text-xs text-muted ml-2">Loading...</span>
              </>
            ) : (
              <>
                <div className="flex items-end gap-1 h-4">
                  {[1, 2, 3, 4].map((i) => (
                    <motion.div
                      key={i}
                      animate={{
                        height: ['40%', '100%', '40%'],
                      }}
                      transition={{
                        duration: 0.5,
                        repeat: Infinity,
                        delay: i * 0.1,
                      }}
                      className="w-1 bg-coral rounded-full"
                      style={{ height: '40%' }}
                    />
                  ))}
                </div>
                <span className="text-xs text-muted ml-2">Now Playing</span>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AudioPlayer;
