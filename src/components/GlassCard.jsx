import React from 'react';
import { motion } from 'framer-motion';

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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay }}
      whileHover={hover ? { scale: 1.02, y: -5 } : {}}
      className={`
        glass-card p-6 transition-all duration-300
        ${glow ? glowStyles[glowColor] : ''}
        ${hover ? 'hover:border-white/20' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default GlassCard;
