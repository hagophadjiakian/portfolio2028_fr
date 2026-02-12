import React, { useState } from 'react';
import { useAudio } from '../context/AudioContext';

// Track active video globally
let setActiveCallbacks = new Set();

const setGlobalActiveVideo = (videoId) => {
  setActiveCallbacks.forEach(cb => cb(videoId));
};

const YouTubePlayer = ({ videoId, title, className = '' }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const { pauseForVideo } = useAudio();

  // Subscribe to global active video changes
  React.useEffect(() => {
    const callback = (activeId) => {
      if (activeId !== videoId && isPlaying) {
        setIsPlaying(false);
      }
    };
    setActiveCallbacks.add(callback);
    return () => setActiveCallbacks.delete(callback);
  }, [videoId, isPlaying]);

  const handlePlay = () => {
    setGlobalActiveVideo(videoId);
    setIsPlaying(true);
    pauseForVideo();
  };

  // Show thumbnail with play button
  if (!isPlaying) {
    return (
      <div
        className={`aspect-video bg-black relative cursor-pointer group ${className}`}
        onClick={handlePlay}
      >
        <img
          src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
          alt={title}
          className="w-full h-full object-cover"
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
    <div className={`aspect-video bg-black ${className}`}>
      <iframe
        className="w-full h-full"
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
        title={title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
};

export default YouTubePlayer;
