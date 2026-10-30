import React from 'react';
import { motion } from 'framer-motion';
import SocialIcon from './SocialIcon';
import { LINKS, PROFILE, isExternal } from '../data/site';

const externalProps = (href) => (isExternal(href) ? { target: '_blank', rel: 'noopener noreferrer' } : {});

// Row of icon links, each with an accessible name.
export const SocialIconRow = ({ only, className = '', linkClassName = 'text-muted hover:text-coral transition-colors', iconClassName }) => {
  const links = only ? LINKS.filter((l) => only.includes(l.name)) : LINKS;
  return (
    <ul className={`flex flex-wrap gap-4 ${className}`}>
      {links.map((link) => (
        <li key={link.name}>
          <motion.a
            href={link.href}
            {...externalProps(link.href)}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className={`inline-flex ${linkClassName}`}
            aria-label={isExternal(link.href) ? `${link.name} (opens in a new tab)` : `Email ${PROFILE.email}`}
            title={link.name}
          >
            <SocialIcon name={link.icon} className={iconClassName} />
          </motion.a>
        </li>
      ))}
    </ul>
  );
};

// "Download CV" button, shown only when PROFILE.cvUrl is set in src/data/site.js
export const CvButton = ({ className = 'btn-secondary inline-block' }) => {
  if (!PROFILE.cvUrl) return null;
  return (
    <a href={PROFILE.cvUrl} download className={className}>
      Download CV
    </a>
  );
};

export { externalProps };
