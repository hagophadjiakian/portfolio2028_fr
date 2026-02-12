import React, { useState, useEffect, useRef } from 'react';
import { useAudio } from '../context/AudioContext';

// Track active video globally
let setActiveCallbacks = new Set();

const setGlobalActiveVideo = (videoId) => {
  setActiveCallbacks.forEach(cb => cb(videoId));
};

const YouTubePlayer = ({ videoId, title, className = '' }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const iframeRef = useRef(null);
  const { pauseForVideo, resumeAfterVideo } = useAudio();

  // Subscribe to global active video changes
  useEffect(() => {
    const callback = (activeId) => {
      if (activeId !== videoId && isPlaying) {
        setIsPlaying(false);
        setIsLoading(false);
      }
    };
    setActiveCallbacks.add(callback);
    return () => setActiveCallbacks.delete(callback);
  }, [videoId, isPlaying]);

  // Listen for YouTube player state changes
  useEffect(() => {
    if (!isPlaying) return;

    const handleMessage = (event) => {
      // Accept messages from YouTube
      if (!event.origin.includes('youtube.com')) return;

      try {
        const data = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;

        // Check for state change events
        if (data.event === 'onStateChange' || data.event === 'infoDelivery') {
          const playerState = data.info?.playerState ?? data.info;

          // 1 = playing, 2 = paused, 0 = ended
          if (playerState === 2 || playerState === 0) {
            resumeAfterVideo();
          } else if (playerState === 1) {
            pauseForVideo();
          }
        }

        // Handle initialDelivery which contains playerState
        if (data.event === 'initialDelivery' && data.info?.playerState !== undefined) {
          if (data.info.playerState === 2 || data.info.playerState === 0) {
            resumeAfterVideo();
          }
        }
      } catch (e) {
        // Not JSON or parsing error, ignore
      }
    };

    window.addEventListener('message', handleMessage);

    // Send listening command to iframe after it loads
    const sendListeningCommand = () => {
      if (iframeRef.current && iframeRef.current.contentWindow) {
        iframeRef.current.contentWindow.postMessage(JSON.stringify({
          event: 'listening',
          id: videoId,
          channel: 'widget'
        }), '*');

        // Also request current state
        iframeRef.current.contentWindow.postMessage(JSON.stringify({
          event: 'command',
          func: 'addEventListener',
          args: ['onStateChange']
        }), '*');
      }
    };

    // Try sending command after a short delay
    const timer = setTimeout(sendListeningCommand, 1000);

    return () => {
      window.removeEventListener('message', handleMessage);
      clearTimeout(timer);
    };
  }, [isPlaying, pauseForVideo, resumeAfterVideo, videoId]);

  const handlePlay = () => {
    setGlobalActiveVideo(videoId);
    setIsLoading(true);
    setIsPlaying(true);
    pauseForVideo();
  };

  const handleStop = (e) => {
    e.stopPropagation();
    setIsPlaying(false);
    setIsLoading(false);
    setGlobalActiveVideo(null);
    resumeAfterVideo();
  };

  const handleIframeLoad = () => {
    setIsLoading(false);

    // Initialize YouTube API listener
    if (iframeRef.current && iframeRef.current.contentWindow) {
      iframeRef.current.contentWindow.postMessage(JSON.stringify({
        event: 'listening',
        id: videoId,
        channel: 'widget'
      }), '*');
    }
  };

  // Show thumbnail with play button
  if (!isPlaying) {
    return (
      <div
        className={`aspect-video bg-black relative cursor-pointer group ${className}`}
        onClick={handlePlay}
      >
        {/* Use smaller thumbnail (mqdefault) for faster mobile loading, upgrade to hqdefault on load */}
        <img
          src={`https://img.youtube.com/vi/${videoId}/mqdefault.jpg`}
          srcSet={`https://img.youtube.com/vi/${videoId}/mqdefault.jpg 320w, https://img.youtube.com/vi/${videoId}/hqdefault.jpg 480w`}
          sizes="(max-width: 640px) 320px, 480px"
          alt={title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/20 transition-colors">
          <div className="w-16 h-16 md:w-20 md:h-20 bg-red-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
            <svg className="w-8 h-8 md:w-10 md:h-10 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      </div>
    );
  }

  // Show iframe when playing
  return (
    <div className={`aspect-video bg-black relative ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black z-10">
          <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
        </div>
      )}

      <button
        onClick={handleStop}
        className="absolute top-2 right-2 z-20 w-8 h-8 bg-black/70 hover:bg-black rounded-full flex items-center justify-center text-white transition-colors"
        title="Close video"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <iframe
        ref={iframeRef}
        className="w-full h-full"
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&enablejsapi=1&rel=0&modestbranding=1&widgetid=1`}
        title={title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        onLoad={handleIframeLoad}
      />
    </div>
  );
};

export default YouTubePlayer;
