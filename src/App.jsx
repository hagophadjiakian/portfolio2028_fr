import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import { AudioProvider } from './context/AudioContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ParticleBackground from './components/ParticleBackground';
import AudioPlayer from './components/AudioPlayer';
import WelcomeOverlay from './components/WelcomeOverlay';

import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Skills from './pages/Skills';
import Experience from './pages/Experience';
import Documentation from './pages/Documentation';
import Contact from './pages/Contact';

function App() {
  const [hasEntered, setHasEntered] = useState(false);

  return (
    <AudioProvider>
      <Router>
        <div className="min-h-screen bg-primary relative">
          <WelcomeOverlay onEnter={() => setHasEntered(true)} />
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
                <Route path="/documentation" element={<Documentation />} />
                <Route path="/contact" element={<Contact />} />
              </Routes>
            </AnimatePresence>
          </main>
          <Footer />
          {hasEntered && <AudioPlayer />}
        </div>
      </Router>
    </AudioProvider>
  );
}

export default App;
