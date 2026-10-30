import { useEffect, useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

// useLayoutEffect in the browser (scroll before paint), useEffect during prerender
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useIsomorphicLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
};

export default ScrollToTop;
