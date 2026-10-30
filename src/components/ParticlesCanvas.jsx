import React, { useEffect, useMemo, useState } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';

// Colours match the site palette (coral, sky, hope green).
const PALETTE = ['#f76c6c', '#a8c0e8', '#4ade80'];

const ParticlesCanvas = () => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setReady(true));
  }, []);

  const options = useMemo(
    () => ({
      background: { color: { value: 'transparent' } },
      fpsLimit: 45,
      interactivity: {
        detectsOn: 'window',
        events: { onHover: { enable: true, mode: 'grab' }, onClick: { enable: false } },
        modes: { grab: { distance: 140, links: { opacity: 0.4, color: '#f76c6c' } } },
      },
      particles: {
        color: { value: PALETTE },
        links: { color: '#a8c0e8', distance: 150, enable: true, opacity: 0.15, width: 1 },
        move: { direction: 'none', enable: true, outModes: { default: 'bounce' }, random: true, speed: 0.6, straight: false },
        number: { density: { enable: true }, value: 40 },
        opacity: { value: { min: 0.15, max: 0.5 } },
        shape: { type: 'circle' },
        size: { value: { min: 1, max: 3 } },
      },
      detectRetina: true,
    }),
    []
  );

  if (!ready) return null;
  return <Particles id="tsparticles" options={options} className="fixed inset-0 z-0 pointer-events-none" />;
};

export default ParticlesCanvas;
