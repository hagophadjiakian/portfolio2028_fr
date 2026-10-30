import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence, MotionConfig } from 'framer-motion';

import { AudioProvider } from './context/AudioContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ParticleBackground from './components/ParticleBackground';
import AudioPlayer from './components/AudioPlayer';
import ScrollToTop from './components/ScrollToTop';
import RouteMeta from './components/RouteMeta';

import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Skills from './pages/Skills';
import Experience from './pages/Experience';
import Videos from './pages/Videos';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

// Everything inside the router. Shared by the browser entry and the prerender step.
const AppShell = () => (
  <MotionConfig reducedMotion="user">
    <AudioProvider>
      <ScrollToTop />
      <RouteMeta />
      <div className="min-h-screen bg-primary relative">
        <ParticleBackground />
        <Navbar />
        <main id="main" className="relative z-10">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/skills" element={<Skills />} />
              <Route path="/experience" element={<Experience />} />
              <Route path="/videos" element={<Videos />} />
              <Route path="/documentation" element={<Navigate to="/videos" replace />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AnimatePresence>
        </main>
        <Footer />
        <AudioPlayer />
      </div>
    </AudioProvider>
  </MotionConfig>
);

export default AppShell;
