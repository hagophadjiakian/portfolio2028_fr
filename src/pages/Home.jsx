import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Hero3D from '../components/Hero3D';

const motivationalQuotes = [
  "The body achieves what the mind believes.",
  "Every step forward is a victory.",
  "Resilience is not just surviving, it's thriving."
];

const Home = () => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const fullText = 'SCI Survivor • Engineer • Developer • Dreamer';

  useEffect(() => {
    if (currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + fullText[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, 80);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex]);

  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % motivationalQuotes.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <Hero3D />

      {/* Warm gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary via-secondary to-primary opacity-90" />

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Survivor Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="inline-block survivor-badge mb-6"
          >
            <span className="text-coral font-medium flex items-center gap-2">
              <span className="text-hope">✦</span>
              SCI Survivor Since 2013
              <span className="text-hope">✦</span>
            </span>
          </motion.div>

          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="mb-6"
          >
            <div className="w-56 h-56 md:w-72 md:h-72 mx-auto rounded-full bg-gradient-to-br from-coral to-sky p-1 shadow-lg overflow-hidden">
              <img
                src="https://hagophadjiakian2028-be.up.railway.app/assets/images/survivor.jpg"
                alt="Hagop Hadjiakian"
                className="w-full h-full rounded-full object-contain bg-secondary"
              />
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-sky text-lg mb-4 font-serif"
          >
            Hello, I'm
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6"
          >
            <span className="gradient-text">Hagop</span>
            <br />
            <span className="text-white">Hadjiakian</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="text-xl md:text-2xl text-muted mb-6 h-8"
          >
            <span className="font-mono">
              {displayText}
              <span className="animate-pulse text-coral">|</span>
            </span>
          </motion.div>

          {/* Motivational Quote */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="mb-8"
          >
            <motion.p
              key={quoteIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="motivational-quote text-xl md:text-2xl text-sky-light max-w-2xl mx-auto"
            >
              "{motivationalQuotes[quoteIndex]}"
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to="/about">
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="btn-primary">
                My Journey
              </motion.button>
            </Link>
            <Link to="/projects">
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="btn-secondary">
                View Projects
              </motion.button>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.2 }}
            className="mt-12 flex flex-wrap justify-center gap-8"
          >
            {[
              { value: '11+', label: 'Years Fighting' },
              { value: '5+', label: 'Years in Tech' },
              { value: '∞', label: 'Determination' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                whileHover={{ scale: 1.1 }}
                className="text-center"
              >
                <span className="text-3xl md:text-4xl font-bold gradient-text">{stat.value}</span>
                <p className="text-muted text-sm mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex flex-col items-center text-muted"
          >
            <span className="text-sm mb-2 font-serif">Discover More</span>
            <svg className="w-6 h-6 text-coral" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div>
        </motion.div>
      </div>

      {/* Background Gradient Orbs - Warmer colors */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-coral/10 rounded-full filter blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-sky/10 rounded-full filter blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-hope/5 rounded-full filter blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
    </div>
  );
};

export default Home;
