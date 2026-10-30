import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Hero3D from '../components/Hero3D';
import { yearsSinceInjury, yearsInTech } from '../data/site';

const motivationalQuotes = [
  'The body achieves what the mind believes.',
  'Every step forward is a victory.',
  "Resilience is not just surviving, it's thriving.",
];

const fullText = 'SCI Survivor • Engineer • Developer • Dreamer';

const Home = () => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + fullText[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, 80);
      return () => clearTimeout(timeout);
    }
    return undefined;
  }, [currentIndex]);

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % motivationalQuotes.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    { value: `${yearsSinceInjury()}+`, label: 'Years Fighting' },
    { value: `${yearsInTech()}+`, label: 'Years in Tech' },
    { value: '∞', label: 'Determination' },
  ];

  return (
    <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden pt-24 pb-20 md:pt-28">
      <Hero3D />

      {/* Warm gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary via-secondary to-primary opacity-90" />

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
          {/* Survivor Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="inline-block survivor-badge mb-5"
          >
            <span className="text-coral font-medium flex items-center gap-2 text-sm md:text-base">
              <span className="text-hope" aria-hidden="true">✦</span>
              SCI Survivor Since 2013
              <span className="text-hope" aria-hidden="true">✦</span>
            </span>
          </motion.div>

          {/* Profile photo: portrait frame so the full photo is visible */}
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }} className="mb-5">
            <div className="mx-auto w-32 h-44 sm:w-36 sm:h-48 lg:w-40 lg:h-56 [@media(max-height:820px)]:w-28 [@media(max-height:820px)]:h-36 rounded-3xl bg-gradient-to-br from-coral to-sky p-1 shadow-lg">
              <img
                src="/assets/images/survivor.jpg"
                alt="Hagop Hadjiakian standing with his walker"
                className="w-full h-full rounded-[1.25rem] object-cover object-top bg-secondary"
                width="160"
                height="224"
                loading="eager"
                fetchpriority="high"
              />
            </div>
          </motion.div>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-sky text-lg mb-2 font-serif">
            Hello, I'm
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-5xl sm:text-6xl lg:text-7xl [@media(min-width:640px)_and_(max-height:820px)]:text-6xl font-bold leading-tight mb-4"
          >
            <span className="gradient-text">Hagop</span>
            <br />
            <span className="text-white">Hadjiakian</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="text-lg md:text-xl text-muted mb-4 min-h-[1.75rem]"
          >
            {/* Screen readers get the full line at once instead of the typing effect */}
            <span className="sr-only">{fullText}</span>
            <span className="font-mono" aria-hidden="true">
              {displayText}
              <span className="animate-pulse text-coral">|</span>
            </span>
          </motion.div>

          {/* Motivational Quote */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} className="mb-6">
            <motion.p
              key={quoteIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="motivational-quote text-lg md:text-xl text-sky-light max-w-2xl mx-auto"
            >
              "{motivationalQuotes[quoteIndex]}"
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center"
          >
            <Link to="/about" className="btn-primary inline-block">
              My Journey
            </Link>
            <Link to="/projects" className="btn-secondary inline-block">
              View Projects
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.dl
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.2 }}
            className="mt-10 flex flex-wrap justify-center gap-8"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="text-center flex flex-col-reverse">
                <dt className="text-muted text-sm mt-1">{stat.label}</dt>
                <dd className="text-3xl md:text-4xl font-bold gradient-text" suppressHydrationWarning>
                  {stat.value}
                </dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>
      </div>

      {/* Background Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-coral/10 rounded-full filter blur-3xl animate-pulse-slow motion-reduce:animate-none pointer-events-none" />
      <div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-sky/10 rounded-full filter blur-3xl animate-pulse-slow motion-reduce:animate-none pointer-events-none"
        style={{ animationDelay: '1s' }}
      />
      <div
        className="absolute top-1/2 right-1/3 w-64 h-64 bg-hope/5 rounded-full filter blur-3xl animate-pulse-slow motion-reduce:animate-none pointer-events-none"
        style={{ animationDelay: '2s' }}
      />
    </section>
  );
};

export default Home;
