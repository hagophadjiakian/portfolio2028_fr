import React, { useState, useCallback, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import AnimatedSection, { AnimatedItem } from '../components/AnimatedSection';
import GlassCard from '../components/GlassCard';
import YouTubePlayer from '../components/YouTubePlayer';
import Lightbox, { ZoomButton } from '../components/Lightbox';

// Image component with loading state and WebP support
const ProjectImage = ({ src, alt, className }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const imgRef = useRef(null);

  // Generate WebP source from jpg path
  const webpSrc = src.replace('.jpg', '.webp');

  // The page is prerendered, so the image may finish loading before React
  // attaches onLoad. Check once on mount so it never stays hidden.
  useEffect(() => {
    const img = imgRef.current;
    if (img?.complete && img.naturalWidth > 0) setIsLoaded(true);
  }, []);

  return (
    <div className="relative w-full h-48 bg-white/5 rounded-lg overflow-hidden">
      {/* Loading skeleton */}
      {!isLoaded && !isError && (
        <div className="js-skeleton absolute inset-0 flex items-center justify-center">
          <div className="animate-pulse w-full h-full bg-gradient-to-r from-white/5 via-white/10 to-white/5" />
        </div>
      )}
      <picture>
        <source srcSet={webpSrc} type="image/webp" />
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          className={`js-fade w-full h-48 object-cover transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'} ${className}`}
          loading="lazy"
          decoding="async"
          onLoad={() => setIsLoaded(true)}
          onError={() => setIsError(true)}
        />
      </picture>
    </div>
  );
};

const Projects = () => {
  const [zoomedImage, setZoomedImage] = useState(null);
  const closeZoom = useCallback(() => setZoomedImage(null), []);

  const project1Videos = [
    { videoId: '6zXxEmv3FGQ', title: 'Exoskeleton Demo', icon: '🦿' },
    { videoId: 'M_FjHuaS_cQ', title: 'EMG Signal Testing', icon: '⚡' },
    { videoId: '6KrIZY9vJAo', title: 'Muscle Activity Detection', icon: '📊' },
    { videoId: 'Mwd52trIwRg', title: 'EMG System in Action', icon: '🔬' },
  ];

  const project1Images = [
    { src: '/assets/images/projectposter.jpg', title: 'Project Poster', icon: '📋' },
    { src: '/assets/images/exo2.jpg', title: 'Exoskeleton Design', icon: '🦿' },
    { src: '/assets/images/book.jpg', title: 'Research & Documentation', icon: '📖' },
  ];

  const project3Videos = [
    { videoId: '4tQ8UKjAMCw', title: 'Passive/Active Cycling Device', icon: '🚴' },
    { videoId: 'IPR-4TjGFVk', title: 'Ankle Mobilization System', icon: '🦶' },
    { videoId: '6xpJWvZf5kk', title: 'Hydrostimulation Therapy', icon: '💧' },
  ];

  return (
    <div className="min-h-screen pt-24 pb-16">
      <AnimatedSection title="My Projects" titleAs="h1" subtitle="Turning challenges into innovations — technology with purpose">

        {/* Motivational intro */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <p className="motivational-quote text-xl text-sky-light max-w-2xl mx-auto">
            "Every project is a step toward making the impossible possible."
          </p>
        </motion.div>

        {/* ==================== PROJECT 1 ==================== */}
        <div className="mb-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="flex items-center justify-center gap-3 mb-6"
          >
            <div className="h-px bg-gradient-to-r from-transparent via-coral to-transparent flex-1 max-w-32" />
            <span className="text-coral font-mono text-sm">PROJECT 01</span>
            <div className="h-px bg-gradient-to-r from-transparent via-coral to-transparent flex-1 max-w-32" />
          </motion.div>
        </div>

        {/* Project 1 - Featured Card */}
        <div className="mb-12">
          <AnimatedItem>
            <GlassCard glow glowColor="coral" className="max-w-4xl mx-auto">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-4xl">🦿</span>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold gradient-text">
                    Passive Knee Exoskeleton & Surface Electromyography Device
                  </h2>
                  <p className="text-coral text-sm">University Final Year Project — Assistive Biomechanics</p>
                </div>
              </div>

              <div className="space-y-4 text-muted leading-relaxed mb-6">
                <p>
                  As part of my final year project at university, with the help of my colleagues we designed and built a
                  <span className="text-sky-light font-medium"> passive knee exoskeleton</span>.
                </p>
                <p>
                  It was developed with the goal of providing mechanical support to individuals with lower limb weakness.
                </p>
                <p className="text-sky-light font-serif italic">
                  This project combined my interest in biomechanics and my determination to create practical solutions for mobility and movement.
                </p>
              </div>

              {/* Technologies */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                  <span className="text-hope">✦</span>
                  Technologies & Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {['Arduino', 'Electronics', 'Biomechanics', 'EMG Sensors', 'MATLAB', 'Signal Processing', 'Mechanical Design'].map((tech) => (
                    <span key={tech} className="px-3 py-1 text-sm rounded-full bg-coral/20 text-coral-light">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Impact Quote */}
              <div className="text-center py-4 border-t border-white/10">
                <p className="motivational-quote text-lg text-sky-light">
                  "Helping those with mobility challenges regain independence"
                </p>
              </div>
            </GlassCard>
          </AnimatedItem>
        </div>

        {/* Project 1 - Videos */}
        <div className="mb-12">
          <motion.h3
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-2xl font-bold text-center mb-4 text-sky-light"
          >
            Project Videos
          </motion.h3>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center text-muted mb-8 max-w-2xl mx-auto"
          >
            Watch the exoskeleton and EMG system in action
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {project1Videos.map((video, index) => (
              <AnimatedItem key={video.videoId}>
                <GlassCard glow glowColor={index % 2 === 0 ? 'coral' : 'sky'}>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xl" aria-hidden="true">{video.icon}</span>
                    <h4 className="font-semibold text-sky-light">{video.title}</h4>
                  </div>
                  <div className="rounded-lg overflow-hidden bg-black/50">
                    <YouTubePlayer videoId={video.videoId} title={video.title} />
                  </div>
                </GlassCard>
              </AnimatedItem>
            ))}
          </div>
        </div>

        {/* Project 1 - Gallery */}
        <div className="mb-20">
          <motion.h3
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-2xl font-bold text-center mb-4 text-sky-light"
          >
            Project Gallery
          </motion.h3>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center text-muted mb-8 max-w-2xl mx-auto"
          >
            Documentation and design of the exoskeleton project
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {project1Images.map((item, index) => (
              <AnimatedItem key={item.src}>
                <GlassCard glow glowColor={index % 3 === 0 ? 'coral' : index % 3 === 1 ? 'hope' : 'sky'}>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xl" aria-hidden="true">{item.icon}</span>
                    <h4 className="font-semibold text-sky-light">{item.title}</h4>
                  </div>
                  <ZoomButton title={item.title} onClick={() => setZoomedImage(item)}>
                    <ProjectImage
                      src={item.src}
                      alt={item.title}
                      className="group-hover:scale-105 transition-transform duration-300"
                    />
                  </ZoomButton>
                </GlassCard>
              </AnimatedItem>
            ))}
          </div>
        </div>

        {/* ==================== PROJECT 2 ==================== */}
        <div className="mb-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="flex items-center justify-center gap-3 mb-6"
          >
            <div className="h-px bg-gradient-to-r from-transparent via-sky to-transparent flex-1 max-w-32" />
            <span className="text-sky font-mono text-sm">PROJECT 02</span>
            <div className="h-px bg-gradient-to-r from-transparent via-sky to-transparent flex-1 max-w-32" />
          </motion.div>
        </div>

        {/* Project 2 - EMG Controlled Motor */}
        <div className="mb-16">
          <AnimatedItem>
            <GlassCard glow glowColor="sky" className="max-w-4xl mx-auto">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-4xl">⚡</span>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold gradient-text">
                    EMG Controlled Motor Activation Device
                  </h2>
                  <p className="text-sky text-sm">Muscle-Driven Control System for Motors Using EMG Signals</p>
                </div>
              </div>

              <div className="space-y-4 text-muted leading-relaxed mb-6">
                <p>
                  This device is designed to convert <span className="text-sky-light font-medium">muscle activity into mechanical motion</span> by
                  using electromyography (EMG) signals to control a motor.
                </p>
                <p>
                  When a user voluntarily contracts specific muscles, surface EMG sensors detect the electrical signals
                  generated by that activity. These signals are then <span className="text-coral font-medium">amplified, filtered, and processed</span> in
                  real-time by a microcontroller.
                </p>
                <p>
                  Once the EMG signal exceeds a predefined threshold—indicating intentional muscle contraction—the system
                  sends a command to activate a motor. This motor can be used to drive an external mechanical component,
                  such as a <span className="text-hope font-medium">robotic joint, a rehabilitation device, or a prosthetic mechanism</span>.
                </p>
                <p className="text-sky-light font-serif italic">
                  The system enables intuitive, muscle-based control of assistive technology, allowing users to interact
                  with or control devices using their natural muscle signals. It is particularly useful for applications
                  in neurorehabilitation, prosthetics, and wearable robotics.
                </p>
              </div>

              {/* Technologies */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                  <span className="text-hope">✦</span>
                  Technologies & Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {['Arduino', 'EMG Sensors', 'Motor Control', 'Signal Processing', 'Electronics', 'Microcontrollers'].map((tech) => (
                    <span key={tech} className="px-3 py-1 text-sm rounded-full bg-sky/20 text-sky">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Video */}
              <div className="mb-4">
                <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                  <span className="text-hope">✦</span>
                  Demo Video
                </h3>
                <div className="rounded-lg overflow-hidden bg-black/50">
                  <YouTubePlayer videoId="rXHn76RE3Ao" title="EMG Controlled Motor Demo" />
                </div>
              </div>

              {/* Impact Quote */}
              <div className="text-center py-4 border-t border-white/10">
                <p className="motivational-quote text-lg text-sky-light">
                  "Bridging the gap between thought and motion"
                </p>
              </div>
            </GlassCard>
          </AnimatedItem>
        </div>

        {/* ==================== PROJECT 3 ==================== */}
        <div className="mb-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="flex items-center justify-center gap-3 mb-6"
          >
            <div className="h-px bg-gradient-to-r from-transparent via-hope to-transparent flex-1 max-w-32" />
            <span className="text-hope font-mono text-sm">PROJECT 03</span>
            <div className="h-px bg-gradient-to-r from-transparent via-hope to-transparent flex-1 max-w-32" />
          </motion.div>
        </div>

        {/* Project 3 - Homemade Rehabilitation Devices */}
        <div className="mb-12">
          <AnimatedItem>
            <GlassCard glow glowColor="hope" className="max-w-4xl mx-auto">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-4xl">🦾</span>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold gradient-text">
                    Homemade Neurological Rehabilitation Devices
                  </h2>
                  <p className="text-hope text-sm">Custom-Built Assistive Tools for SCI Recovery and Muscle Stimulation</p>
                </div>
              </div>

              <div className="space-y-4 text-muted leading-relaxed mb-6">
                <p>
                  This project showcases a series of <span className="text-sky-light font-medium">DIY rehabilitation devices</span> I built to support
                  my own neurological recovery journey as a spinal cord injury survivor.
                </p>

                <ul className="space-y-3 ml-4">
                  <li className="flex items-start gap-3">
                    <span className="text-coral mt-1">•</span>
                    <span>A <span className="text-coral font-medium">passive and active cycling device</span> designed to stimulate leg movement and prevent joint stiffness.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-sky mt-1">•</span>
                    <span>A <span className="text-sky font-medium">custom-built ankle mobilization system</span> allowing controlled plantarflexion and dorsiflexion, aimed at reducing muscle atrophy and preserving range of motion.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-hope mt-1">•</span>
                    <span>A <span className="text-hope font-medium">therapeutic hydrostimulation setup</span> that delivers warm water to my legs to promote blood circulation and relieve muscle tension.</span>
                  </li>
                </ul>

                <p className="text-sky-light font-serif italic">
                  These devices are born out of necessity, creativity, and determination to improve physical function using accessible, low-cost tools.
                </p>
              </div>

              {/* Technologies */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                  <span className="text-hope">✦</span>
                  Technologies & Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {['DIY Electronics', 'Mechanical Design', 'Arduino', 'Motor Systems', 'Rehabilitation', 'Problem Solving'].map((tech) => (
                    <span key={tech} className="px-3 py-1 text-sm rounded-full bg-hope/20 text-hope">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Impact Quote */}
              <div className="text-center py-4 border-t border-white/10">
                <p className="motivational-quote text-lg text-sky-light">
                  "Personal recovery tools born from necessity"
                </p>
              </div>
            </GlassCard>
          </AnimatedItem>
        </div>

        {/* Project 3 - Videos */}
        <div className="mb-16">
          <motion.h3
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-2xl font-bold text-center mb-4 text-sky-light"
          >
            Rehabilitation Device Videos
          </motion.h3>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center text-muted mb-8 max-w-2xl mx-auto"
          >
            See the DIY rehabilitation devices in action
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {project3Videos.map((video, index) => (
              <AnimatedItem key={video.videoId}>
                <GlassCard glow glowColor={index === 0 ? 'coral' : index === 1 ? 'sky' : 'hope'}>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xl" aria-hidden="true">{video.icon}</span>
                    <h4 className="font-semibold text-sky-light">{video.title}</h4>
                  </div>
                  <div className="rounded-lg overflow-hidden bg-black/50">
                    <YouTubePlayer videoId={video.videoId} title={video.title} />
                  </div>
                </GlassCard>
              </AnimatedItem>
            ))}
          </div>
        </div>

        {/* Bottom Motivation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <GlassCard className="inline-block max-w-2xl">
            <p className="motivational-quote text-xl text-sky-light mb-4">
              "These projects represent my commitment to creating technology that serves humanity —
              especially those who face challenges similar to mine."
            </p>
            <p className="text-coral font-medium">— Hagop Hadjiakian</p>
          </GlassCard>
        </motion.div>
      </AnimatedSection>

      <Lightbox image={zoomedImage} onClose={closeZoom} />
    </div>
  );
};

export default Projects;
