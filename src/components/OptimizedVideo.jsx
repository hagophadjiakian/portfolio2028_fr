import React, { useState, forwardRef } from 'react';

const OptimizedVideo = forwardRef(({ src, title, onPlay, onPause, onEnded, className = '' }, ref) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleCanPlay = () => {
    setIsLoading(false);
  };

  const handleWaiting = () => {
    setIsLoading(true);
  };

  const handlePlaying = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  return (
    <div className="relative rounded-lg overflow-hidden bg-black/50">
      {isLoading && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 border-3 border-coral border-t-transparent rounded-full animate-spin" />
            <span className="text-muted text-sm">Loading video...</span>
          </div>
        </div>
      )}
      {hasError ? (
        <div className="flex items-center justify-center bg-black/50 min-h-[200px]">
          <div className="text-center">
            <span className="text-3xl block mb-2">⚠️</span>
            <span className="text-muted text-sm">Video failed to load</span>
            <button
              onClick={() => {
                setHasError(false);
                setIsLoading(true);
              }}
              className="block mx-auto mt-2 text-coral text-sm hover:underline"
            >
              Retry
            </button>
          </div>
        </div>
      ) : (
        <video
          ref={ref}
          className={`w-full h-auto ${className}`}
          controls
          playsInline
          preload="auto"
          onCanPlay={handleCanPlay}
          onWaiting={handleWaiting}
          onPlaying={handlePlaying}
          onError={handleError}
          onPlay={onPlay}
          onPause={onPause}
          onEnded={onEnded}
        >
          <source src={src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
    </div>
  );
});

OptimizedVideo.displayName = 'OptimizedVideo';

export default OptimizedVideo;
