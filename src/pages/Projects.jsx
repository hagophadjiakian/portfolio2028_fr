import React, { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedSection, { AnimatedItem } from '../components/AnimatedSection';
import GlassCard from '../components/GlassCard';
import OptimizedImage from '../components/OptimizedImage';
import OptimizedVideo from '../components/OptimizedVideo';
import { useAudio } from '../context/AudioContext';

const Projects = () => {
  const { pauseForVideo, resumeAfterVideo } = useAudio();
  const videoRefs = useRef([]);
  const [zoomedImage, setZoomedImage] = useState(null);

  const handleVideoPlay = useCallback((index) => {
    // Pause all other videos
    videoRefs.current.forEach((video, i) => {
      if (video && i !== index && !video.paused) {
        video.pause();
      }
    });
    // Pause the background soundtrack
    pauseForVideo();
  }, [pauseForVideo]);

  const handleVideoPause = useCallback(() => {
    // Check if all videos are paused
    const anyPlaying = videoRefs.current.some((video) => video && !video.paused);
    if (!anyPlaying) {
      // Resume the background soundtrack
      resumeAfterVideo();
    }
  }, [resumeAfterVideo]);

  // Close lightbox on ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && zoomedImage) {
        setZoomedImage(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [zoomedImage]);

  const project1Videos = [
    { src: '/assets/videos/exo1.mp4', title: 'Exoskeleton Demo', icon: '🦿' },
    { src: '/assets/videos/emg1.mp4', title: 'EMG Signal Testing', icon: '⚡' },
    { src: '/assets/videos/emg2.mp4', title: 'Muscle Activity Detection', icon: '📊' },
    { src: '/assets/videos/emg3.mp4', title: 'EMG System in Action', icon: '🔬' },
  ];

  const project1Images = [
    { src: '/assets/images/projectposter.jpg', title: 'Project Poster', icon: '📋' },
    { src: '/assets/images/exo2.jpg', title: 'Exoskeleton Design', icon: '🦿' },
    { src: '/assets/images/book.jpg', title: 'Research & Documentation', icon: '📖' },
  ];

  const project3Videos = [
    { src: '/assets/videos/bike.mp4', title: 'Passive/Active Cycling Device', icon: '🚴' },
    { src: '/assets/videos/ankle.mp4', title: 'Ankle Mobilization System', icon: '🦶' },
    { src: '/assets/videos/water.mp4', title: 'Hydrostimulation Therapy', icon: '💧' },
  ];

  return (
    <div className="min-h-screen pt-24 pb-16">
      <AnimatedSection title="My Projects" subtitle="Turning challenges into innovations — technology with purpose">

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
                <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                  <span className="text-hope">✦</span>
                  Technologies & Skills
                </h4>
                <div className="flex flex-wrap gap-2">
                  {['Arduino', 'Electronics', 'Biomechanics', 'EMG Sensors', 'MATLAB', 'Signal Processing', 'Mechanical Design'].map((tech) => (
                    <span key={tech} className="px-3 py-1 text-sm rounded-full bg-coral/20 text-coral">
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
              <AnimatedItem key={video.src}>
                <GlassCard glow glowColor={index % 2 === 0 ? 'coral' : 'sky'}>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xl">{video.icon}</span>
                    <h4 className="font-semibold text-sky-light">{video.title}</h4>
                  </div>
                  <OptimizedVideo
                    ref={(el) => (videoRefs.current[index] = el)}
                    src={video.src}
                    title={video.title}
                    onPlay={() => handleVideoPlay(index)}
                    onPause={handleVideoPause}
                    onEnded={handleVideoPause}
                  />
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
                    <span className="text-xl">{item.icon}</span>
                    <h4 className="font-semibold text-sky-light">{item.title}</h4>
                  </div>
                  <div
                    className="rounded-lg overflow-hidden cursor-pointer relative group"
                    onClick={() => setZoomedImage(item)}
                  >
                    <OptimizedImage
                      src={item.src}
                      alt={item.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 rounded-lg">
                      <span className="text-white text-sm flex items-center gap-2 bg-black/50 px-3 py-2 rounded-full">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                        </svg>
                        Click to zoom
                      </span>
                    </div>
                  </div>
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
                <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                  <span className="text-hope">✦</span>
                  Technologies & Skills
                </h4>
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
                <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                  <span className="text-hope">✦</span>
                  Demo Video
                </h4>
                <OptimizedVideo
                  ref={(el) => (videoRefs.current[4] = el)}
                  src="/assets/videos/controller.mp4"
                  title="EMG Controller Demo"
                  onPlay={() => handleVideoPlay(4)}
                  onPause={handleVideoPause}
                  onEnded={handleVideoPause}
                />
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
                <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                  <span className="text-hope">✦</span>
                  Technologies & Skills
                </h4>
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
              <AnimatedItem key={video.src}>
                <GlassCard glow glowColor={index === 0 ? 'coral' : index === 1 ? 'sky' : 'hope'}>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xl">{video.icon}</span>
                    <h4 className="font-semibold text-sky-light">{video.title}</h4>
                  </div>
                  <OptimizedVideo
                    ref={(el) => (videoRefs.current[5 + index] = el)}
                    src={video.src}
                    title={video.title}
                    onPlay={() => handleVideoPlay(5 + index)}
                    onPause={handleVideoPause}
                    onEnded={handleVideoPause}
                  />
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

      {/* Image Lightbox/Zoom Modal */}
      <AnimatePresence>
        {zoomedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 p-4"
            onClick={() => setZoomedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-4xl max-h-[90vh] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setZoomedImage(null)}
                className="absolute -top-12 right-0 text-white hover:text-coral transition-colors flex items-center gap-2"
              >
                <span>Close</span>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Image title */}
              <div className="absolute -top-12 left-0 text-white flex items-center gap-2">
                <span className="text-xl">{zoomedImage.icon}</span>
                <span className="font-semibold">{zoomedImage.title}</span>
              </div>

              {/* Zoomed image */}
              <img
                src={zoomedImage.src}
                alt={zoomedImage.title}
                className="w-full h-auto max-h-[85vh] object-contain rounded-lg shadow-2xl"
              />

              {/* Zoom hint */}
              <p className="text-center text-muted text-sm mt-4">
                Click outside or press ESC to close
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Projects;
