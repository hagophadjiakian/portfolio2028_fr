import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import { AudioProvider } from './context/AudioContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ParticleBackground from './components/ParticleBackground';
import AudioPlayer from './components/AudioPlayer';
import WelcomeOverlay from './components/WelcomeOverlay';
import ScrollToTop from './components/ScrollToTop';

import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Skills from './pages/Skills';
import Experience from './pages/Experience';
import Videos from './pages/Videos';
import Contact from './pages/Contact';

function App() {
  return (
    <AudioProvider>
      <Router>
        <ScrollToTop />
        <div className="min-h-screen bg-primary relative">
          <WelcomeOverlay />
          <ParticleBackground />
          <Navbar />
          <main className="relative z-10">
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
              </Routes>
            </AnimatePresence>
          </main>
          <Footer />
          <AudioPlayer />
        </div>
      </Router>
    </AudioProvider>
  );
}

export default App;
