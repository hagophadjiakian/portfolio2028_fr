import React, { Suspense, lazy } from 'react';
import useMediaQuery, { FULL_MOTION_QUERY } from '../hooks/useMediaQuery';

// The particle library is only downloaded on larger screens without
// "reduce motion"; phones skip it entirely (saves CPU and battery).
const ParticlesCanvas = lazy(() => import('./ParticlesCanvas'));

const ParticleBackground = () => {
  const enabled = useMediaQuery(FULL_MOTION_QUERY);
  if (!enabled) return null;
  return (
    <Suspense fallback={null}>
      <ParticlesCanvas />
    </Suspense>
  );
};

export default ParticleBackground;
