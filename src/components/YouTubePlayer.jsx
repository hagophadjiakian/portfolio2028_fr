import React, { useState, useEffect, useRef } from 'react';
import { useAudio } from '../context/AudioContext';

// Privacy-friendly embed domain (no tracking cookies until the video plays)
const EMBED_ORIGIN = 'https://www.youtube-nocookie.com';
const YT_ORIGINS = ['https://www.youtube-nocookie.com', 'https://www.youtube.com'];

// Open the connections the YouTube player needs as soon as the visitor shows
// intent (pointer over, focus or touch on a video), so it starts faster when
// they press play. Done once per page visit.
const WARM_ORIGINS = [EMBED_ORIGIN, 'https://www.youtube.com', 'https://www.google.com'];
let warmedUp = false;
const warmConnections = () => {
  if (warmedUp || typeof document === 'undefined') return;
  warmedUp = true;
  for (const href of WARM_ORIGINS) {
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = href;
    document.head.appendChild(link);
  }
};

// Track active video globally
let setActiveCallbacks = new Set();

const setGlobalActiveVideo = (videoId) => {
  setActiveCallbacks.forEach(cb => cb(videoId));
};

const YouTubePlayer = ({ videoId, title, className = '' }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const iframeRef = useRef(null);
  const containerRef = useRef(null);
  const onScreen = useRef(true);
  const { pauseForVideo, resumeAfterVideo } = useAudio();

  const sendCommand = (func) => {
    iframeRef.current?.contentWindow?.postMessage(JSON.stringify({ event: 'command', func, args: [] }), EMBED_ORIGIN);
  };

  // Pause the video when it is scrolled (mostly) off the screen, so it doesn't
  // keep playing out of sight. Press play again to continue where it stopped.
  useEffect(() => {
    if (!isPlaying || typeof IntersectionObserver === 'undefined') return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        onScreen.current = entry.isIntersecting && entry.intersectionRatio >= 0.25;
        if (!onScreen.current) sendCommand('pauseVideo');
      },
      { threshold: [0, 0.25] }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [isPlaying]);

  // If the visitor leaves the page while this video plays, let the music resume
  const playingRef = useRef(false);
  const resumeRef = useRef(resumeAfterVideo);
  playingRef.current = isPlaying;
  resumeRef.current = resumeAfterVideo;
  useEffect(() => () => {
    if (playingRef.current) resumeRef.current();
  }, []);

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
      // Accept messages from YouTube only
      if (!YT_ORIGINS.includes(event.origin)) return;

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
        }), EMBED_ORIGIN);

        // Also request current state
        iframeRef.current.contentWindow.postMessage(JSON.stringify({
          event: 'command',
          func: 'addEventListener',
          args: ['onStateChange']
        }), EMBED_ORIGIN);
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
    // Scrolled away while it was loading: don't start playing out of sight
    // (the player needs a moment after loading before it accepts commands)
    [500, 1500].forEach((ms) =>
      setTimeout(() => {
        if (!onScreen.current) sendCommand('pauseVideo');
      }, ms)
    );

    // Initialize YouTube API listener
    if (iframeRef.current && iframeRef.current.contentWindow) {
      iframeRef.current.contentWindow.postMessage(JSON.stringify({
        event: 'listening',
        id: videoId,
        channel: 'widget'
      }), EMBED_ORIGIN);
    }
  };

  // Show thumbnail with play button
  if (!isPlaying) {
    return (
      <button
        type="button"
        className={`aspect-video bg-black relative cursor-pointer group w-full block ${className}`}
        onClick={handlePlay}
        onPointerEnter={warmConnections}
        onFocus={warmConnections}
        onTouchStart={warmConnections}
        aria-label={`Play video: ${title}`}
        style={{ touchAction: 'manipulation', WebkitTapHighlightColor: 'transparent' }}
      >
        {/* Small thumbnail (mqdefault) on phones, larger (hqdefault) on bigger screens */}
        <img
          src={`https://i.ytimg.com/vi/${videoId}/mqdefault.jpg`}
          srcSet={`https://i.ytimg.com/vi/${videoId}/mqdefault.jpg 320w, https://i.ytimg.com/vi/${videoId}/hqdefault.jpg 480w`}
          sizes="(max-width: 640px) 320px, 480px"
          alt=""
          className="w-full h-full object-cover pointer-events-none select-none"
          loading="lazy"
          draggable="false"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/20 transition-colors pointer-events-none" aria-hidden="true">
          <div className="w-16 h-16 md:w-20 md:h-20 bg-red-600 rounded-full flex items-center justify-center group-hover:scale-110 group-active:scale-95 transition-transform shadow-lg">
            <svg className="w-8 h-8 md:w-10 md:h-10 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      </button>
    );
  }

  // Show iframe when playing
  return (
    <div ref={containerRef} className={`aspect-video bg-black relative ${className}`}>
      {/* While YouTube's player loads, keep the thumbnail on screen with a spinner */}
      {isLoading && (
        <div className="absolute inset-0 z-10" aria-hidden="true">
          <img
            src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
            alt=""
            className="w-full h-full object-cover"
            draggable="false"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/40">
            <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin" />
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={handleStop}
        className="absolute top-2 right-2 z-20 w-8 h-8 bg-black/70 hover:bg-black rounded-full flex items-center justify-center text-white transition-colors"
        title="Close video"
        aria-label={`Close video: ${title}`}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <iframe
        ref={iframeRef}
        className="w-full h-full"
        src={`${EMBED_ORIGIN}/embed/${videoId}?autoplay=1&playsinline=1&enablejsapi=1&rel=0&modestbranding=1&widgetid=1&origin=${encodeURIComponent(window.location.origin)}`}
        title={title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        onLoad={handleIframeLoad}
      />
    </div>
  );
};

export default YouTubePlayer;
