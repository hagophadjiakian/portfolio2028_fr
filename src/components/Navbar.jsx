import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export const NAV_LINKS = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'My Story' },
  { path: '/projects', label: 'Projects' },
  { path: '/skills', label: 'Skills' },
  { path: '/experience', label: 'Journey' },
  { path: '/videos', label: 'Videos' },
  { path: '/contact', label: 'Connect' },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const links = NAV_LINKS;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  // While the phone menu is open: the page behind can't scroll, Escape closes
  // it, and it closes by itself if the screen becomes wide (rotating a tablet).
  useEffect(() => {
    if (!mobileOpen) return undefined;
    const html = document.documentElement;
    const previous = [html.style.overflow, document.body.style.overflow];
    html.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    const onKey = (e) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    const wide = window.matchMedia('(min-width: 768px)');
    const onWide = (e) => {
      if (e.matches) setMobileOpen(false);
    };
    window.addEventListener('keydown', onKey);
    wide.addEventListener('change', onWide);
    return () => {
      [html.style.overflow, document.body.style.overflow] = previous;
      window.removeEventListener('keydown', onKey);
      wide.removeEventListener('change', onWide);
    };
  }, [mobileOpen]);

  return (
    <nav
      aria-label="Main"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 animate-nav-in ${isScrolled ? 'py-4' : 'py-6'} ${
        mobileOpen ? 'bg-primary' : isScrolled ? 'glass' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link to="/">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2"
            >
              <span className="text-2xl font-bold gradient-text">HH</span>
              <span className="hidden sm:inline text-xs text-coral-light font-mono">SCI Survivor</span>
              {/* Spoken name starts with the visible text (WCAG "label in name") */}
              <span className="sr-only"> – Hagop Hadjiakian, home</span>
            </motion.div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="relative group"
                aria-current={location.pathname === link.path ? 'page' : undefined}
              >
                <span className={`text-sm font-medium transition-colors ${
                  location.pathname === link.path ? 'text-coral-light' : 'text-muted hover:text-white'
                }`}>
                  {link.label}
                </span>
                <motion.span
                  aria-hidden="true"
                  className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-coral to-sky"
                  initial={{ width: 0 }}
                  animate={{ width: location.pathname === link.path ? '100%' : 0 }}
                  whileHover={{ width: '100%' }}
                />
              </Link>
            ))}
          </div>

          {/* Mobile Toggle */}
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-white"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            {/* Three lines that turn into an X */}
            <span className="relative block w-6 h-5" aria-hidden="true">
              <span
                className={`absolute left-0 top-0 w-full h-0.5 rounded-full bg-coral transition-transform duration-200 ${
                  mobileOpen ? 'translate-y-[9px] rotate-45' : ''
                }`}
              />
              <span
                className={`absolute left-0 top-[9px] w-full h-0.5 rounded-full bg-white transition-opacity duration-200 ${
                  mobileOpen ? 'opacity-0' : ''
                }`}
              />
              <span
                className={`absolute left-0 bottom-0 w-full h-0.5 rounded-full bg-coral transition-transform duration-200 ${
                  mobileOpen ? '-translate-y-[9px] -rotate-45' : ''
                }`}
              />
            </span>
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              // Solid panel covering the whole screen under the bar
              className="md:hidden absolute top-full inset-x-0 z-[999] h-screen overflow-y-auto overscroll-contain bg-primary border-t border-white/10"
            >
              <div className="pt-4 pb-32 px-4 space-y-1">
                {links.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    aria-current={location.pathname === link.path ? 'page' : undefined}
                    className={`block text-lg font-medium py-3 ${
                      location.pathname === link.path ? 'text-coral-light' : 'text-muted hover:text-white'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
