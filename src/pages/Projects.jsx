import React, { useState, useCallback } from 'react';
import AnimatedSection, { AnimatedItem } from '../components/AnimatedSection';
import GlassCard from '../components/GlassCard';
import YouTubePlayer from '../components/YouTubePlayer';
import Lightbox, { ZoomButton } from '../components/Lightbox';

// Project photo with a loading placeholder underneath. It needs no JavaScript:
// the placeholder simply shows until the photo arrives and covers it.
const ProjectImage = ({ src, alt, className }) => (
  <div className="relative w-full h-48 bg-white/5 rounded-lg overflow-hidden">
    <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-white/5 via-white/10 to-white/5" aria-hidden="true" />
    <img src={src} alt={alt} className={`relative w-full h-48 object-cover ${className}`} loading="lazy" decoding="async" />
  </div>
);

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
    // The same file is used for the card and the full-screen viewer, so the
    // viewer opens instantly
    { src: '/assets/images/projectposter.webp', title: 'Project Poster', icon: '📋' },
    { src: '/assets/images/exo2.webp', title: 'Exoskeleton Design', icon: '🦿' },
    { src: '/assets/images/book.webp', title: 'Research & Documentation', icon: '📖' },
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
        <div className="text-center mb-12 reveal">
          <p className="motivational-quote text-xl text-sky-light max-w-2xl mx-auto">
            "Every project is a step toward making the impossible possible."
          </p>
        </div>

        {/* ==================== PROJECT 1 ==================== */}
        <div className="mb-8">
          <div className="flex items-center justify-center gap-3 mb-6 reveal">
            <div className="h-px bg-gradient-to-r from-transparent via-coral to-transparent flex-1 max-w-32" />
            <span className="text-coral font-mono text-sm">PROJECT 01</span>
            <div className="h-px bg-gradient-to-r from-transparent via-coral to-transparent flex-1 max-w-32" />
          </div>
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
          <h3 className="text-2xl font-bold text-center mb-4 text-sky-light reveal">
            Project Videos
          </h3>
          <p className="text-center text-muted mb-8 max-w-2xl mx-auto reveal">
            Watch the exoskeleton and EMG system in action
          </p>

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
          <h3 className="text-2xl font-bold text-center mb-4 text-sky-light reveal">
            Project Gallery
          </h3>
          <p className="text-center text-muted mb-8 max-w-2xl mx-auto reveal">
            Documentation and design of the exoskeleton project
          </p>

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
          <div className="flex items-center justify-center gap-3 mb-6 reveal">
            <div className="h-px bg-gradient-to-r from-transparent via-sky to-transparent flex-1 max-w-32" />
            <span className="text-sky font-mono text-sm">PROJECT 02</span>
            <div className="h-px bg-gradient-to-r from-transparent via-sky to-transparent flex-1 max-w-32" />
          </div>
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
          <div className="flex items-center justify-center gap-3 mb-6 reveal">
            <div className="h-px bg-gradient-to-r from-transparent via-hope to-transparent flex-1 max-w-32" />
            <span className="text-hope font-mono text-sm">PROJECT 03</span>
            <div className="h-px bg-gradient-to-r from-transparent via-hope to-transparent flex-1 max-w-32" />
          </div>
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
          <h3 className="text-2xl font-bold text-center mb-4 text-sky-light reveal">
            Rehabilitation Device Videos
          </h3>
          <p className="text-center text-muted mb-8 max-w-2xl mx-auto reveal">
            See the DIY rehabilitation devices in action
          </p>

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
        <div className="text-center reveal">
          <GlassCard className="inline-block max-w-2xl">
            <p className="motivational-quote text-xl text-sky-light mb-4">
              "These projects represent my commitment to creating technology that serves humanity —
              especially those who face challenges similar to mine."
            </p>
            <p className="text-coral font-medium">— Hagop Hadjiakian</p>
          </GlassCard>
        </div>
      </AnimatedSection>

      <Lightbox image={zoomedImage} onClose={closeZoom} />
    </div>
  );
};

export default Projects;
