import React from 'react';
import { Link } from 'react-router-dom';
import { SocialIconRow, CvButton } from './SocialLinks';
import { NAV_LINKS } from './Navbar';
import { PROFILE } from '../data/site';

const Footer = () => {
  return (
    <footer className="relative z-10 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link to="/">
              <span className="text-3xl font-bold gradient-text">HH</span>
              <span className="sr-only"> – {PROFILE.name}, home</span>
            </Link>
            <p className="mt-4 text-muted text-sm">SCI Survivor since 2013</p>
            <p className="mt-2 motivational-quote text-sky-light text-sm">"The body achieves what the mind believes."</p>
          </div>

          <nav aria-label="Footer">
            <h2 className="text-lg font-semibold mb-4 text-coral">Quick Links</h2>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-muted hover:text-coral transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-lg font-semibold mb-4 text-coral">Connect With Me</h2>
            <SocialIconRow />
            <p className="mt-4 text-muted text-sm">Let's inspire each other.</p>
            <div className="mt-4">
              <CvButton className="btn-secondary inline-block text-sm" />
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted text-sm flex items-center gap-2" suppressHydrationWarning>
            <span className="text-hope" aria-hidden="true">✦</span>© {new Date().getFullYear()} {PROFILE.name}
            <span className="text-hope" aria-hidden="true">✦</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
