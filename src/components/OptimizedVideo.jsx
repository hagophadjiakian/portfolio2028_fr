import React, { forwardRef, useRef, useImperativeHandle } from 'react';

const OptimizedVideo = forwardRef(({ src, title, onPlay, onPause, onEnded, className = '' }, ref) => {
  const videoRef = useRef(null);

  // Expose the video element to parent via ref
  useImperativeHandle(ref, () => videoRef.current);

  return (
    <div className="rounded-lg overflow-hidden bg-black/50">
      <video
        ref={videoRef}
        className={`w-full h-auto ${className}`}
        controls
        playsInline
        preload="metadata"
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
