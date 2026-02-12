import React from 'react';

const YouTubePlayer = ({ videoId, title, className = '' }) => {
  return (
    <div className={`aspect-video ${className}`}>
      <iframe
        className="w-full h-full"
        src={`https://www.youtube.com/embed/${videoId}`}
        title={title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
};

export default YouTubePlayer;
