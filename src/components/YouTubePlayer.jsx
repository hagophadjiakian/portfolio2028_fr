import React, { useEffect, useRef, useCallback } from 'react';
import { useAudio } from '../context/AudioContext';

// Global registry of all YouTube players for pausing others
let allPlayers = [];
let apiLoaded = false;
let apiLoading = false;

const loadYouTubeAPI = () => {
  return new Promise((resolve) => {
    if (apiLoaded) {
      resolve();
      return;
    }

    if (apiLoading) {
      // Wait for existing load
      const checkLoaded = setInterval(() => {
        if (apiLoaded) {
          clearInterval(checkLoaded);
          resolve();
        }
      }, 100);
      return;
    }

    apiLoading = true;

    // Create script tag
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    // Wait for API to load
    window.onYouTubeIframeAPIReady = () => {
      apiLoaded = true;
      resolve();
    };
  });
};

const YouTubePlayer = ({ videoId, title, className = '' }) => {
  const containerRef = useRef(null);
  const playerRef = useRef(null);
  const { pauseForVideo, resumeAfterVideo } = useAudio();

  const pauseOtherPlayers = useCallback(() => {
    allPlayers.forEach((p) => {
      if (p !== playerRef.current && p.getPlayerState && p.getPlayerState() === 1) {
        p.pauseVideo();
      }
    });
  }, []);

  const onPlayerStateChange = useCallback((event) => {
    // YouTube Player States: -1 unstarted, 0 ended, 1 playing, 2 paused, 3 buffering, 5 cued
    if (event.data === 1) {
      // Playing - pause soundtrack and other videos
      pauseOtherPlayers();
      pauseForVideo();
    } else if (event.data === 2 || event.data === 0) {
      // Paused or ended - check if any other YouTube video is playing
      const anyPlaying = allPlayers.some(
        (p) => p.getPlayerState && p.getPlayerState() === 1
      );
      if (!anyPlaying) {
        resumeAfterVideo();
      }
    }
  }, [pauseForVideo, resumeAfterVideo, pauseOtherPlayers]);

  useEffect(() => {
    let mounted = true;

    const initPlayer = async () => {
      await loadYouTubeAPI();

      if (!mounted || !containerRef.current) return;

      // Create unique ID for container
      const containerId = `yt-player-${videoId}-${Date.now()}`;
      containerRef.current.id = containerId;

      playerRef.current = new window.YT.Player(containerId, {
        videoId: videoId,
        playerVars: {
          playsinline: 1,
          rel: 0,
          modestbranding: 1,
        },
        events: {
          onStateChange: onPlayerStateChange,
        },
      });

      allPlayers.push(playerRef.current);
    };

    initPlayer();

    return () => {
      mounted = false;
      // Remove from global registry
      allPlayers = allPlayers.filter((p) => p !== playerRef.current);
      // Destroy player
      if (playerRef.current && playerRef.current.destroy) {
        playerRef.current.destroy();
      }
    };
  }, [videoId, onPlayerStateChange]);

  return (
    <div className={`aspect-video ${className}`}>
      <div ref={containerRef} className="w-full h-full" />
    </div>
  );
};

export default YouTubePlayer;
