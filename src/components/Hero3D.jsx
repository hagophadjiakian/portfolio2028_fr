import React from 'react';
import { motion } from 'framer-motion';
import useMediaQuery, { FULL_MOTION_QUERY } from '../hooks/useMediaQuery';

// Decorative background for the home hero. Animated on larger screens;
// static on phones and when the visitor prefers reduced motion.
const orbs = [
  { className: 'top-1/4 left-1/3 w-72 h-72 bg-coral/20', animate: { scale: [1, 1.2, 1], x: [0, 30, 0], y: [0, -20, 0] }, duration: 8 },
  { className: 'top-1/3 right-1/4 w-96 h-96 bg-sky/15', animate: { scale: [1.2, 1, 1.2], x: [0, -40, 0], y: [0, 30, 0] }, duration: 10 },
  { className: 'bottom-1/4 left-1/4 w-80 h-80 bg-hope/10', animate: { scale: [1, 1.3, 1], x: [0, 20, 0], y: [0, 40, 0] }, duration: 12 },
];

const dots = [
  { className: 'top-1/4 right-1/3 w-3 h-3 bg-coral', animate: { y: [0, -30, 0], opacity: [0.4, 0.8, 0.4] }, duration: 4 },
  { className: 'bottom-1/3 right-1/4 w-4 h-4 bg-sky', animate: { y: [0, 25, 0], opacity: [0.3, 0.7, 0.3] }, duration: 5 },
  { className: 'top-1/2 left-1/4 w-2 h-2 bg-hope', animate: { y: [0, -20, 0], x: [0, 15, 0], opacity: [0.5, 0.9, 0.5] }, duration: 6 },
  { className: 'top-1/3 left-1/2 w-3 h-3 bg-coral-light', animate: { y: [0, 20, 0], x: [0, -15, 0], opacity: [0.4, 0.8, 0.4] }, duration: 7 },
];

const Hero3D = () => {
  const animated = useMediaQuery(FULL_MOTION_QUERY);
  const loop = (duration) => ({ duration, repeat: Infinity, ease: 'easeInOut' });

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {orbs.map((o) => (
        <motion.div
          key={o.className}
          animate={animated ? o.animate : undefined}
          transition={loop(o.duration)}
          className={`absolute rounded-full filter blur-3xl ${o.className}`}
        />
      ))}

      {dots.map((d) => (
        <motion.div
          key={d.className}
          animate={animated ? d.animate : undefined}
          transition={loop(d.duration)}
          className={`absolute rounded-full opacity-50 ${d.className}`}
        />
      ))}

      {animated && (
        <>
          <motion.div
            animate={{ y: [100, -100], opacity: [0, 0.6, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeOut' }}
            className="absolute bottom-0 left-1/3 w-1 h-20 bg-gradient-to-t from-coral/0 via-coral/50 to-coral/0 rounded-full"
          />
          <motion.div
            animate={{ y: [100, -100], opacity: [0, 0.4, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeOut', delay: 2 }}
            className="absolute bottom-0 right-1/3 w-1 h-24 bg-gradient-to-t from-hope/0 via-hope/50 to-hope/0 rounded-full"
          />
        </>
      )}

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(247,108,108,0.3) 1px, transparent 0)',
          backgroundSize: '50px 50px',
        }}
      />
    </div>
  );
};

export default Hero3D;
