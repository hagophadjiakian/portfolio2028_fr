import React, { useState, forwardRef, useEffect, useRef, useImperativeHandle } from 'react';

const OptimizedVideo = forwardRef(({ src, title, onPlay, onPause, onEnded, className = '' }, ref) => {
  const [isLoading, setIsLoading] = useState(true);
  const videoRef = useRef(null);

  // Expose the video element to parent via ref
  useImperativeHandle(ref, () => videoRef.current);

  // Reset loading state when src changes
  useEffect(() => {
    setIsLoading(true);
  }, [src]);

  const handleCanPlay = () => {
    setIsLoading(false);
  };

  const handleLoadedData = () => {
    setIsLoading(false);
  };

  const handleWaiting = () => {
    setIsLoading(true);
  };

  const handlePlaying = () => {
    setIsLoading(false);
  };

  return (
    <div className="relative rounded-lg overflow-hidden bg-black/50">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10 pointer-events-none">
          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 border-3 border-coral border-t-transparent rounded-full animate-spin" />
            <span className="text-muted text-sm">Loading video...</span>
          </div>
        </div>
      )}
      <video
        ref={videoRef}
        className={`w-full h-auto ${className}`}
        controls
        playsInline
        preload="metadata"
        onCanPlay={handleCanPlay}
        onLoadedData={handleLoadedData}
        onWaiting={handleWaiting}
        onPlaying={handlePlaying}
        onPlay={onPlay}
        onPause={onPause}
        onEnded={onEnded}
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
});

OptimizedVideo.displayName = 'OptimizedVideo';

export default OptimizedVideo;
