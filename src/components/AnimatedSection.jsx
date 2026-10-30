import React from 'react';

// Page section with an optional header. Everything is visible as soon as the
// page arrives — nothing waits for JavaScript. The header animates in with CSS
// at first paint, and blocks wrapped in <AnimatedItem> fade in as they scroll
// into view where the browser supports CSS scroll-driven animations (see
// `.reveal` in index.css); other browsers simply show them.
const AnimatedSection = ({ children, className = '', title, titleAs: TitleTag = 'h2', subtitle, id, ...props }) => {
  return (
    <section id={id} className={`py-20 px-4 sm:px-6 lg:px-8 ${className}`} {...props}>
      <div className="max-w-7xl mx-auto">
        {(title || subtitle) && (
          <div className="text-center mb-16 animate-fade-down">
            {title && (
              <TitleTag className="text-4xl md:text-5xl font-bold mb-4">
                <span className="gradient-text">{title}</span>
              </TitleTag>
            )}
            {subtitle && (
              <p className="text-muted text-lg max-w-2xl mx-auto">{subtitle}</p>
            )}
          </div>
        )}
        <div>{children}</div>
      </div>
    </section>
  );
};

export const AnimatedItem = ({ children, className = '', ...props }) => {
  return (
    <div className={`reveal ${className}`} {...props}>
      {children}
    </div>
  );
};

export default AnimatedSection;
