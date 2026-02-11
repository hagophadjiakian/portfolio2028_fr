import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const WelcomeOverlay = ({ onEnter }) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleEnter = () => {
    setIsVisible(false);
    if (onEnter) onEnter();
  };

  const roles = [
    'SCI Survivor',
    'Software & QA Engineer',
    'Rehabilitation Tech Developer'
  ];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 z-[100] flex items-center justify-center"
          style={{
            background: 'radial-gradient(circle at center, #1b2838 0%, #0d1b2a 100%)'
          }}
          onClick={handleEnter}
        >
          {/* Animated background orbs */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              animate={{
                scale: [1, 1.3, 1],
                x: [0, 30, 0],
                y: [0, -20, 0],
              }}
              transition={{ duration: 8, repeat: Infinity }}
              className="absolute top-1/4 left-1/3 w-96 h-96 bg-coral/20 rounded-full filter blur-3xl"
            />
            <motion.div
              animate={{
                scale: [1.2, 1, 1.2],
                x: [0, -30, 0],
                y: [0, 20, 0],
              }}
              transition={{ duration: 10, repeat: Infinity }}
              className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-sky/15 rounded-full filter blur-3xl"
            />
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.2, 0.1],
              }}
              transition={{ duration: 6, repeat: Infinity }}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-hope/10 rounded-full filter blur-3xl"
            />
          </div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="relative z-10 text-center px-6 max-w-2xl"
          >
            {/* Survivor Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="inline-block survivor-badge mb-8"
            >
              <span className="text-coral font-medium flex items-center gap-2">
                <span className="text-hope">✦</span>
                Since 2013
                <span className="text-hope">✦</span>
              </span>
            </motion.div>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="text-5xl md:text-7xl font-bold mb-6"
            >
              <span className="gradient-text">Hagop</span>
              <br />
              <span className="text-white">Hadjiakian</span>
            </motion.h1>

            {/* Roles */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="flex flex-wrap justify-center gap-3 mb-8"
            >
              {roles.map((role, index) => (
                <motion.span
                  key={role}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 + index * 0.2 }}
                  className="px-4 py-2 glass rounded-full text-sm font-medium text-sky-light"
                >
                  {role}
                </motion.span>
              ))}
            </motion.div>

            {/* Quote */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8 }}
              className="motivational-quote text-xl md:text-2xl text-sky-light mb-10 max-w-xl mx-auto"
            >
              "The body achieves what the mind believes"
            </motion.p>

            {/* Enter Button */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.2 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleEnter}
              className="btn-primary text-lg px-10 py-4 group"
            >
              <span className="flex items-center gap-3">
                <span>🎵</span>
                <span>Enter My World</span>
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </span>
            </motion.button>

          </motion.div>

          {/* Floating particles */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -30, 0],
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{
                duration: 3 + i,
                repeat: Infinity,
                delay: i * 0.5,
              }}
              className="absolute w-2 h-2 bg-coral rounded-full"
              style={{
                left: `${15 + i * 15}%`,
                top: `${30 + (i % 3) * 20}%`,
              }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WelcomeOverlay;
