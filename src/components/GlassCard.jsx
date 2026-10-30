import React from 'react';

// Card used across the site. It is visible as soon as the page arrives (no
// waiting for JavaScript); the lift-on-hover effect is plain CSS.
// `delay` is accepted for backwards compatibility but no longer used.
// eslint-disable-next-line no-unused-vars
const GlassCard = ({ children, className = '', hover = true, glow = false, glowColor = 'coral', delay = 0, ...props }) => {
  const glowStyles = {
    coral: 'hover:shadow-[0_0_30px_rgba(247,108,108,0.4)]',
    sky: 'hover:shadow-[0_0_30px_rgba(168,192,232,0.4)]',
    hope: 'hover:shadow-[0_0_30px_rgba(74,222,128,0.4)]',
    purple: 'hover:shadow-[0_0_30px_rgba(168,85,247,0.4)]',
    blue: 'hover:shadow-[0_0_30px_rgba(59,130,246,0.4)]',
    cyan: 'hover:shadow-[0_0_30px_rgba(6,182,212,0.4)]',
  };

  return (
    <div
      className={`
        glass-card p-6 transition-all duration-300
        ${glow ? glowStyles[glowColor] : ''}
        ${hover ? 'hover:border-white/20 motion-safe:hover:-translate-y-1 motion-safe:hover:scale-[1.02]' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
};

export default GlassCard;
