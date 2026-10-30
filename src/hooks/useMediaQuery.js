import { useEffect, useState } from 'react';

// Returns true when the media query matches. Starts as `defaultValue` so the
// prerendered HTML and the first client render agree, then updates.
const useMediaQuery = (query, defaultValue = false) => {
  const [matches, setMatches] = useState(defaultValue);

  useEffect(() => {
    const mql = window.matchMedia(query);
    const update = () => setMatches(mql.matches);
    update();
    mql.addEventListener('change', update);
    return () => mql.removeEventListener('change', update);
  }, [query]);

  return matches;
};

// Heavy decorative animation only on larger screens, and never when the
// visitor has asked their device to reduce motion.
export const FULL_MOTION_QUERY = '(min-width: 768px) and (prefers-reduced-motion: no-preference)';

export default useMediaQuery;
