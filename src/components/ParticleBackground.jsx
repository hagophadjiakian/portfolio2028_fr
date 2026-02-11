import React, { useCallback, useMemo } from 'react';
import Particles from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';

const ParticleBackground = () => {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  const options = useMemo(() => ({
    background: { color: { value: 'transparent' } },
    fpsLimit: 60,
    interactivity: {
      events: {
        onHover: { enable: true, mode: 'grab' },
        onClick: { enable: true, mode: 'push' },
      },
      modes: {
        grab: { distance: 140, links: { opacity: 0.5, color: '#a855f7' } },
        push: { quantity: 4 },
      },
    },
    particles: {
      color: { value: ['#a855f7', '#3b82f6', '#06b6d4'] },
      links: {
        color: '#a855f7',
        distance: 150,
        enable: true,
        opacity: 0.2,
        width: 1,
      },
      move: {
        direction: 'none',
        enable: true,
        outModes: { default: 'bounce' },
        random: true,
        speed: 1,
        straight: false,
      },
      number: {
        density: { enable: true, area: 800 },
        value: 60,
      },
      opacity: {
        value: 0.5,
        random: true,
        animation: { enable: true, speed: 1, minimumValue: 0.1, sync: false },
      },
      shape: { type: 'circle' },
      size: {
        value: { min: 1, max: 3 },
        random: true,
        animation: { enable: true, speed: 2, minimumValue: 0.5, sync: false },
      },
    },
    detectRetina: true,
  }), []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={options}
      className="fixed inset-0 z-0"
    />
  );
};

export default ParticleBackground;
