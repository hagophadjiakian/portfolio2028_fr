import React from 'react';
import AnimatedSection, { AnimatedItem } from '../components/AnimatedSection';
import GlassCard from '../components/GlassCard';
import YouTubePlayer from '../components/YouTubePlayer';

const Videos = () => {

  return (
    <div className="min-h-screen pt-24 pb-16">
      <AnimatedSection title="Videos" titleAs="h1" subtitle="Video records of my journey and projects">

        {/* Motivational intro */}
        <div className="text-center mb-12 reveal">
          <p className="motivational-quote text-xl text-sky-light max-w-2xl mx-auto">
            "Every moment recorded is a step remembered."
          </p>
        </div>

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

              <div className="rounded-lg overflow-hidden bg-black/50">
                <YouTubePlayer videoId="O7V3FCIaXww" title="Video Documentation" />
              </div>
            </GlassCard>
          </AnimatedItem>
        </div>

        {/* Bottom Motivation */}
        <div className="text-center reveal">
          <GlassCard className="inline-block max-w-2xl">
            <p className="motivational-quote text-xl text-sky-light mb-4">
              "Documentation is the bridge between experience and inspiration."
            </p>
            <p className="text-coral font-medium">— Hagop Hadjiakian</p>
          </GlassCard>
        </div>
      </AnimatedSection>
    </div>
  );
};

export default Videos;
