import React, { useEffect, useRef } from 'react';
import { useAudio } from '../context/AudioContext';

// Global state for YouTube API
let apiReady = false;
let apiLoadPromise = null;
const players = new Set();

const loadYouTubeAPI = () => {
  if (apiReady && window.YT && window.YT.Player) {
    return Promise.resolve();
  }

  if (apiLoadPromise) {
    return apiLoadPromise;
  }

  apiLoadPromise = new Promise((resolve) => {
    // Check if already loaded
    if (window.YT && window.YT.Player) {
      apiReady = true;
      resolve();
      return;
    }

    // Store original callback if exists
    const originalCallback = window.onYouTubeIframeAPIReady;

    window.onYouTubeIframeAPIReady = () => {
      apiReady = true;
      if (originalCallback) originalCallback();
      resolve();
    };

    // Check if script already exists
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
const pauseOtherPlayers = (currentPlayer) => {
  players.forEach((player) => {
    if (player !== currentPlayer && player.getPlayerState) {
      try {
        const state = player.getPlayerState();
        if (state === 1) { // Playing
          player.pauseVideo();
        }
      } catch (e) {
        // Player might be destroyed
      }
    }
  });
};

// Check if any player is currently playing
const isAnyPlayerPlaying = () => {
  for (const player of players) {
    try {
      if (player.getPlayerState && player.getPlayerState() === 1) {
        return true;
      }
    } catch (e) {
      // Player might be destroyed
    }
  }
  return false;
};

const YouTubePlayer = ({ videoId, title, className = '' }) => {
  const containerRef = useRef(null);
  const playerRef = useRef(null);
  const { pauseForVideo, resumeAfterVideo } = useAudio();

  useEffect(() => {
    let mounted = true;
    const playerId = `yt-${videoId}-${Math.random().toString(36).substr(2, 9)}`;

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
        },
        events: {
          onReady: () => {
            if (mounted) {
              players.add(playerRef.current);
            }
          },
          onStateChange: (event) => {
            if (!mounted) return;

            // 1 = playing, 2 = paused, 0 = ended
            if (event.data === 1) {
              // Video started playing
              pauseOtherPlayers(playerRef.current);
              pauseForVideo();
            } else if (event.data === 2 || event.data === 0) {
              // Video paused or ended
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
      if (playerRef.current) {
        players.delete(playerRef.current);
        try {
          playerRef.current.destroy();
        } catch (e) {
          // Ignore destroy errors
        }
      }
    };
  }, [videoId, pauseForVideo, resumeAfterVideo]);

  return (
    <div className={`aspect-video bg-black/50 ${className}`}>
      <div ref={containerRef} className="w-full h-full" />
    </div>
  );
};

export default YouTubePlayer;
