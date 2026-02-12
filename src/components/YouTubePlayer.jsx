import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useAudio } from '../context/AudioContext';

// Global state for YouTube API
let apiReady = false;
let apiLoadPromise = null;
const players = new Map(); // Map of videoId to player

const loadYouTubeAPI = () => {
  if (apiReady && window.YT && window.YT.Player) {
    return Promise.resolve();
  }

  if (apiLoadPromise) {
    return apiLoadPromise;
  }

  apiLoadPromise = new Promise((resolve) => {
    if (window.YT && window.YT.Player) {
      apiReady = true;
      resolve();
      return;
    }

    const originalCallback = window.onYouTubeIframeAPIReady;

    window.onYouTubeIframeAPIReady = () => {
      apiReady = true;
      if (originalCallback) originalCallback();
      resolve();
    };

    if (!document.querySelector('script[src*="youtube.com/iframe_api"]')) {
      const script = document.createElement('script');
      script.src = 'https://www.youtube.com/iframe_api';
      script.async = true;
      document.head.appendChild(script);
    }
  });

  return apiLoadPromise;
};

// Pause all other YouTube players
const pauseOtherPlayers = (currentVideoId) => {
  players.forEach((player, id) => {
    if (id !== currentVideoId && player.getPlayerState) {
      try {
        if (player.getPlayerState() === 1) {
          player.pauseVideo();
        }
      } catch (e) {}
    }
  });
};

// Check if any player is playing
const isAnyPlayerPlaying = () => {
  for (const player of players.values()) {
    try {
      if (player.getPlayerState && player.getPlayerState() === 1) {
        return true;
      }
    } catch (e) {}
  }
  return false;
};

const YouTubePlayer = ({ videoId, title, className = '' }) => {
  const [isActivated, setIsActivated] = useState(false);
  const containerRef = useRef(null);
  const playerRef = useRef(null);
  const { pauseForVideo, resumeAfterVideo } = useAudio();

  const handleClick = useCallback(() => {
    setIsActivated(true);
  }, []);

  useEffect(() => {
    if (!isActivated) return;

    let mounted = true;
    const playerId = `yt-${videoId}-${Date.now()}`;

    const initPlayer = async () => {
      await loadYouTubeAPI();

      if (!mounted || !containerRef.current) return;

      containerRef.current.id = playerId;

      playerRef.current = new window.YT.Player(playerId, {
        videoId,
        playerVars: {
          playsinline: 1,
          rel: 0,
          modestbranding: 1,
          autoplay: 1, // Auto-play when activated
        },
        events: {
          onReady: () => {
            if (mounted) {
              players.set(videoId, playerRef.current);
              pauseOtherPlayers(videoId);
              pauseForVideo();
            }
          },
          onStateChange: (event) => {
            if (!mounted) return;

            if (event.data === 1) {
              pauseOtherPlayers(videoId);
              pauseForVideo();
            } else if (event.data === 2 || event.data === 0) {
              if (!isAnyPlayerPlaying()) {
                resumeAfterVideo();
              }
            }
          },
        },
      });
    };

    initPlayer();

    return () => {
      mounted = false;
      players.delete(videoId);
      if (playerRef.current) {
        try {
          playerRef.current.destroy();
        } catch (e) {}
      }
    };
  }, [isActivated, videoId, pauseForVideo, resumeAfterVideo]);

  // Show thumbnail with play button until clicked
  if (!isActivated) {
    return (
      <div
        className={`aspect-video bg-black/50 relative cursor-pointer group ${className}`}
        onClick={handleClick}
      >
        {/* YouTube thumbnail */}
        <img
          src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
          alt={title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        {/* Play button overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors">
          <div className="w-16 h-16 md:w-20 md:h-20 bg-red-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
            <svg className="w-8 h-8 md:w-10 md:h-10 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      </div>
    );
  }

  // Show player once activated
  return (
    <div className={`aspect-video bg-black/50 ${className}`}>
      <div ref={containerRef} className="w-full h-full" />
    </div>
  );
};

export default YouTubePlayer;
