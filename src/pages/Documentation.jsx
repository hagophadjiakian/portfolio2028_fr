import React, { useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import AnimatedSection, { AnimatedItem } from '../components/AnimatedSection';
import GlassCard from '../components/GlassCard';
import OptimizedVideo from '../components/OptimizedVideo';
import { useAudio } from '../context/AudioContext';

const Documentation = () => {
  const { pauseForVideo, resumeAfterVideo } = useAudio();
  const videoRef = useRef(null);

  const handleVideoPlay = useCallback(() => {
    pauseForVideo();
  }, [pauseForVideo]);

  const handleVideoPause = useCallback(() => {
    resumeAfterVideo();
  }, [resumeAfterVideo]);

  return (
    <div className="min-h-screen pt-24 pb-16">
      <AnimatedSection title="Documentation" subtitle="Visual records of my journey and projects">

        {/* Motivational intro */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <p className="motivational-quote text-xl text-sky-light max-w-2xl mx-auto">
            "Every moment documented is a step remembered."
          </p>
        </motion.div>

        {/* Featured Video */}
        <div className="mb-16">
          <AnimatedItem>
            <GlassCard glow glowColor="coral" className="max-w-4xl mx-auto">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-4xl">📹</span>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold gradient-text">
                    Video Documentation
                  </h2>
                  <p className="text-coral text-sm">Capturing moments of progress and determination</p>
                </div>
              </div>

              <OptimizedVideo
                ref={videoRef}
                src="/assets/videos/ajz.mp4"
                title="Video Documentation"
                onPlay={handleVideoPlay}
                onPause={handleVideoPause}
                onEnded={handleVideoPause}
              />
            </GlassCard>
          </AnimatedItem>
        </div>

        {/* Bottom Motivation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <GlassCard className="inline-block max-w-2xl">
            <p className="motivational-quote text-xl text-sky-light mb-4">
              "Documentation is the bridge between experience and inspiration."
            </p>
            <p className="text-coral font-medium">— Hagop Hadjiakian</p>
          </GlassCard>
        </motion.div>
      </AnimatedSection>
    </div>
  );
};

export default Documentation;
