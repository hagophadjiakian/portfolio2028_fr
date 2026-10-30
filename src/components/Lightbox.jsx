import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Start downloading the large version of an image (used when the visitor
// points at or touches a thumbnail, so the viewer opens with it ready).
const preloaded = new Set();
export const preloadImage = (src) => {
  if (!src || preloaded.has(src) || typeof Image === 'undefined') return;
  preloaded.add(src);
  const img = new Image();
  img.decoding = 'async';
  img.src = src;
};

// Shows the thumbnail (already downloaded for the page) immediately, and swaps
// in the large version as soon as it has loaded.
const ViewerImage = ({ image }) => {
  const large = image.full || image.src;
  const [largeReady, setLargeReady] = useState(large === image.src);
  const imgClass = 'w-full h-auto max-h-[80vh] object-contain rounded-lg shadow-2xl';
  return (
    <>
      {!largeReady && <img src={image.src} alt="" aria-hidden="true" className={imgClass} />}
      <img
        src={large}
        alt={image.title}
        onLoad={() => setLargeReady(true)}
        className={largeReady ? imgClass : 'hidden'}
      />
      {!largeReady && (
        <span
          className="absolute bottom-3 left-3 w-6 h-6 border-2 border-white/40 border-t-white rounded-full animate-spin"
          aria-hidden="true"
        />
      )}
    </>
  );
};

// Full-screen image viewer used on My Story and Projects.
// Closes with Escape, the X button or a click outside; focus moves to the
// close button when it opens and returns to the thumbnail when it closes.
const Lightbox = ({ image, onClose }) => {
  const closeRef = useRef(null);
  const lastFocused = useRef(null);

  useEffect(() => {
    if (!image) return undefined;
    lastFocused.current = document.activeElement;
    closeRef.current?.focus();
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'Tab') {
        // keep focus inside the dialog (only one focusable element)
        e.preventDefault();
        closeRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
      lastFocused.current?.focus?.();
    };
  }, [image, onClose]);

  return (
    <AnimatePresence>
      {image && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 p-2 sm:p-4"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={image.title}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="relative max-w-4xl max-h-[95vh] w-full flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-center mb-3 px-2">
              <p className="text-white flex items-center gap-2">
                {image.icon && (
                  <span className="text-xl" aria-hidden="true">
                    {image.icon}
                  </span>
                )}
                <span className="font-semibold text-sm sm:text-base">{image.title}</span>
              </p>
            </div>

            <div className="flex-1 flex items-center justify-center overflow-hidden relative">
              <ViewerImage key={image.full || image.src} image={image} />
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                className="absolute top-2 right-2 sm:top-4 sm:right-4 w-10 h-10 sm:w-12 sm:h-12 bg-coral hover:bg-coral-light text-white rounded-full flex items-center justify-center transition-all shadow-lg hover:scale-110"
                aria-label="Close image"
              >
                <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <p className="text-center text-muted text-xs sm:text-sm mt-3 px-2">Tap outside, press Esc or the X button to close</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Thumbnail that opens the lightbox; a real button so it works with the keyboard.
export const ZoomButton = ({ onClick, title, children, className = '', preload }) => (
  <button
    type="button"
    onClick={onClick}
    onPointerEnter={() => preloadImage(preload)}
    onFocus={() => preloadImage(preload)}
    onTouchStart={() => preloadImage(preload)}
    className={`block w-full text-left rounded-lg overflow-hidden cursor-zoom-in relative group ${className}`}
    aria-label={`Enlarge image: ${title}`}
  >
    {children}
    <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity bg-black/40 rounded-lg pointer-events-none">
      <span className="text-white text-sm flex items-center gap-2 bg-black/50 px-3 py-2 rounded-full">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
        </svg>
        Click to zoom
      </span>
    </span>
  </button>
);

export default Lightbox;
