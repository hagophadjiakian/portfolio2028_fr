import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedSection, { AnimatedItem } from '../components/AnimatedSection';
import GlassCard from '../components/GlassCard';
import YouTubePlayer from '../components/YouTubePlayer';
import { yearsSinceInjury, yearsInTech, PROFILE } from '../data/site';
import { SocialIconRow } from '../components/SocialLinks';

const About = () => {
  const [zoomedImage, setZoomedImage] = useState(null);

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

  const highlights = [
    { label: 'Years Fighting', value: `${yearsSinceInjury()}+`, icon: '💪' },
    { label: 'Languages Spoken', value: '4', icon: '🌍' },
    { label: 'Years in Tech', value: `${yearsInTech()}+`, icon: '💻' },
    { label: 'Never Give Up', value: '∞', icon: '✨' },
  ];

  const timeline = [
    {
      year: '2019',
      title: 'Software & QA Engineer',
      description: 'Building and testing digital products, developing automation frameworks and Jira plugins.',
      type: 'career',
      icon: '💼'
    },
    {
      year: '2018',
      title: 'Electrical Engineering Degree',
      description: 'Graduated from NDU Notre Dame University Louaize, Zouk Mosbeh, Lebanon. Final year project on Passive Knee Exoskeleton.',
      type: 'education',
      icon: '🎓'
    },
    {
      year: '2015',
      title: 'HAL Exoskeleton Rehabilitation - Japan',
      description: 'Traveled to Japan for 2-month intensive rehabilitation with Cyberdyne HAL exoskeleton. Achieved neuroplasticity recovery.',
      type: 'milestone',
      icon: '🇯🇵'
    },
    {
      year: '2013',
      title: 'Life-Changing Moment',
      description: 'Spinal cord injury at the T6 level, initially diagnosed as complete. The beginning of a new chapter - not an ending, but a transformation.',
      type: 'life',
      icon: '🦋'
    },
  ];

  return (
    <div className="min-h-screen pt-24 pb-16">
      <AnimatedSection title="My Story" subtitle="From adversity to achievement - a journey of resilience">

        {/* Hero Quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <p className="motivational-quote text-2xl md:text-3xl text-sky-light max-w-3xl mx-auto">
            "The body achieves what the mind believes."
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <AnimatedItem>
            <GlassCard className="relative overflow-hidden" glow glowColor="coral">
              <div className="absolute top-0 right-0 w-32 h-32 bg-coral/20 rounded-full filter blur-2xl" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-sky/20 rounded-full filter blur-2xl" />

              <div className="relative z-10">
                {/* Profile Header */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-coral to-sky p-1">
                    <img
                      src="/assets/images/profilepic.jpg"
                      alt="Hagop Hadjiakian"
                      className="w-full h-full rounded-full object-cover"
                      loading="eager"
                      fetchpriority="high"
                    />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">Hagop Hadjiakian</h3>
                    <p className="text-coral font-mono text-sm">SCI Survivor • Engineer</p>
                    <p className="text-muted text-sm">{PROFILE.location}</p>
                    <SocialIconRow
                      only={['GitHub', 'LinkedIn', 'NeurolinkUp']}
                      className="mt-2 gap-3"
                      iconClassName="w-5 h-5"
                    />
                  </div>
                </div>

                <div className="space-y-4 text-muted leading-relaxed">
                  <p>
                    I'm a software and quality assurance engineer with an Electrical Engineering degree.
                    I speak <span className="text-sky">Armenian, Arabic, French, and English</span>.
                  </p>

                  <p>
                    In <span className="text-coral font-semibold">2013</span>, I experienced a spinal cord injury
                    that changed my life forever. I was initially diagnosed with a complete injury at the T6 level,
                    and doctors said I would never walk again.
                  </p>

                  <p>
                    But I refused to accept that fate. In <span className="text-coral font-semibold">2015</span>,
                    I traveled to Japan for rehabilitation with the <span className="text-hope">HAL exoskeleton by Cyberdyne</span>.
                    Since then I have regained sensation and voluntary movement in my hips and knees, and I can walk
                    short distances with a KAFO walker.
                  </p>

                  <p className="text-sky-light font-serif italic">
                    My story isn't just about code — it's about the human spirit's ability to adapt, overcome,
                    and transform challenges into opportunities.
                  </p>
                </div>

                {/* Survivor Badge */}
                <div className="mt-6 inline-flex items-center gap-2 survivor-badge">
                  <span className="text-hope">✦</span>
                  <span className="text-coral">T6 SCI Survivor</span>
                  <span className="text-hope">✦</span>
                </div>
              </div>
            </GlassCard>
          </AnimatedItem>

          <div className="space-y-6">
            <AnimatedItem>
              <div className="grid grid-cols-2 gap-4">
                {highlights.map((stat, index) => (
                  <GlassCard
                    key={stat.label}
                    delay={index * 0.1}
                    glow
                    glowColor={index % 2 === 0 ? 'coral' : 'sky'}
                    className="text-center"
                  >
                    <span className="text-2xl mb-2 block">{stat.icon}</span>
                    <motion.span
                      initial={{ opacity: 0, scale: 0.5 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2 + index * 0.1 }}
                      className="text-3xl font-bold gradient-text block mb-1"
                    >
                      {stat.value}
                    </motion.span>
                    <span className="text-muted text-sm">{stat.label}</span>
                  </GlassCard>
                ))}
              </div>
            </AnimatedItem>

            <AnimatedItem>
              <GlassCard glow glowColor="hope">
                <h4 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <span className="text-hope">✦</span>
                  What Drives Me
                </h4>
                <ul className="space-y-3">
                  {[
                    'Turning limitations into innovations',
                    'Building rehabilitation technology',
                    'Inspiring others facing challenges',
                    'Continuous learning and growth',
                    'Helping the SCI community'
                  ].map((item, index) => (
                    <li key={index} className="flex items-center text-muted">
                      <span className="w-2 h-2 bg-coral rounded-full mr-3" />
                      {item}
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </AnimatedItem>

            <AnimatedItem>
              <GlassCard className="text-center">
                <p className="motivational-quote text-lg text-sky-light">
                  "Every step I take is a victory over the impossible."
                </p>
              </GlassCard>
            </AnimatedItem>
          </div>
        </div>

        {/* Achievements & Personal Gallery */}
        <div className="mt-16">
          <motion.h3
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-3xl font-bold text-center mb-4 gradient-text"
          >
            Achievements & Moments
          </motion.h3>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center text-muted mb-8 max-w-2xl mx-auto"
          >
            Milestones that mark my journey of perseverance
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { src: '/assets/images/diploma.jpg', title: 'Engineering Diploma', icon: '🎓', color: 'coral' },
              { src: '/assets/images/deans.jpg', title: "Dean's List Recognition", icon: '🏆', color: 'hope' },
              { src: '/assets/images/dog.jpeg', title: 'My Companion', icon: '🐕', color: 'sky' },
            ].map((item) => (
              <AnimatedItem key={item.src}>
                <GlassCard glow glowColor={item.color}>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xl">{item.icon}</span>
                    <h4 className="font-semibold text-sky-light">{item.title}</h4>
                  </div>
                  <div
                    className="rounded-lg overflow-hidden cursor-pointer relative group bg-white/5"
                    onClick={() => setZoomedImage(item)}
                  >
                    <img
                      src={item.src}
                      alt={item.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="eager"
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

        {/* Graduation Day - Featured Video */}
        <div className="mt-16">
          <AnimatedItem>
            <GlassCard glow glowColor="hope" className="max-w-2xl mx-auto">
              <div className="flex items-center justify-center gap-2 mb-4">
                <span className="text-3xl">🎓</span>
                <h3 className="text-2xl font-bold gradient-text">Graduation Day</h3>
                <span className="text-3xl">🎉</span>
              </div>
              <p className="text-center text-muted mb-4">
                A moment of triumph — completing my Engineering degree against all odds
              </p>
              <div className="rounded-lg overflow-hidden bg-black/50">
                <YouTubePlayer videoId="GzARVvM03kA" title="Graduation Day" />
              </div>
            </GlassCard>
          </AnimatedItem>
        </div>

        {/* Timeline - My Journey */}
        <div className="mt-20">
          <motion.h3
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-3xl font-bold text-center mb-4 gradient-text"
          >
            My Journey
          </motion.h3>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center text-muted mb-12 max-w-2xl mx-auto"
          >
            From challenge to triumph — the milestones that shaped who I am today
          </motion.p>

          {/* One column on phones (line on the left), alternating on larger screens */}
          <div className="relative">
            <div className="absolute left-2 md:left-1/2 md:-translate-x-1/2 w-1 h-full bg-gradient-to-b from-coral via-sky to-hope rounded-full" />

            <div className="space-y-12">
              {timeline.map((item, index) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className={`relative flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  <div
                    className={`w-full pl-10 md:w-1/2 ${
                      index % 2 === 0 ? 'md:pl-0 md:pr-12 md:text-right' : 'md:pl-12 md:text-left'
                    }`}
                  >
                    <GlassCard hover={false} className={item.type === 'life' ? 'border-coral/30' : ''}>
                      <div
                        className={`flex items-center gap-2 mb-2 flex-wrap justify-start ${
                          index % 2 === 0 ? 'md:justify-end' : 'md:justify-start'
                        }`}
                      >
                        <span className="text-2xl" aria-hidden="true">{item.icon}</span>
                        <span className="text-coral font-mono text-sm">{item.year}</span>
                      </div>
                      <h4 className="text-base sm:text-xl font-semibold mt-2 break-words">{item.title}</h4>
                      <p className="text-muted mt-2 text-sm sm:text-base">{item.description}</p>
                    </GlassCard>
                  </div>
                  <div className="absolute left-2 md:left-1/2 -translate-x-1/2 z-10 ml-0.5 md:ml-0">
                    <div
                      className={`w-4 h-4 rounded-full ${
                        item.type === 'life'
                          ? 'bg-coral neon-glow-coral'
                          : item.type === 'milestone'
                          ? 'bg-hope neon-glow-hope'
                          : 'bg-sky neon-glow-sky'
                      }`}
                    />
                  </div>
                  <div className="hidden md:block md:w-1/2" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Rehabilitation Journey Videos */}
        <div className="mt-20">
          <motion.h3
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-3xl font-bold text-center mb-4 gradient-text"
          >
            My Rehabilitation Journey
          </motion.h3>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center text-muted mb-12 max-w-2xl mx-auto"
          >
            Videos documenting my path to recovery — every step a victory
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { videoId: '5kuD94961R0', title: 'HAL Exoskeleton in Japan', icon: '🇯🇵' },
              { videoId: 'OvAIdbngms8', title: 'KAFO Walker Progress', icon: '🚶' },
              { videoId: 'Vy1L4aWXQZY', title: 'AFO Training Session', icon: '🦿' },
              { videoId: 'wTIbsn8npcM', title: 'Rehabilitation Exercise', icon: '💪' },
              { videoId: '6wFjlG343Jo', title: 'Recovery Training', icon: '✨' },
            ].map((video, index) => (
              <AnimatedItem key={video.videoId}>
                <GlassCard glow glowColor={index % 3 === 0 ? 'coral' : index % 3 === 1 ? 'sky' : 'hope'}>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xl">{video.icon}</span>
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
          className="mt-20 text-center"
        >
          <GlassCard className="inline-block max-w-2xl">
            <p className="motivational-quote text-xl text-sky-light mb-4">
              "My story isn't just about surviving — it's about thriving, innovating, and proving that
              our greatest obstacles can become our greatest teachers."
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
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 p-2 sm:p-4"
            onClick={() => setZoomedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-4xl max-h-[95vh] w-full flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image title */}
              <div className="flex items-center justify-center mb-3 px-2">
                <div className="text-white flex items-center gap-2">
                  <span className="text-xl">{zoomedImage.icon}</span>
                  <span className="font-semibold text-sm sm:text-base">{zoomedImage.title}</span>
                </div>
              </div>

              {/* Zoomed image */}
              <div className="flex-1 flex items-center justify-center overflow-hidden relative">
                <img
                  src={zoomedImage.src}
                  alt={zoomedImage.title}
                  className="w-full h-auto max-h-[80vh] object-contain rounded-lg shadow-2xl"
                />
                {/* Large floating X button on image - easy to see */}
                <button
                  onClick={() => setZoomedImage(null)}
                  className="absolute top-2 right-2 sm:top-4 sm:right-4 w-10 h-10 sm:w-12 sm:h-12 bg-coral hover:bg-coral-light text-white rounded-full flex items-center justify-center transition-all shadow-lg hover:scale-110"
                  title="Close"
                >
                  <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Zoom hint */}
              <p className="text-center text-muted text-xs sm:text-sm mt-3 px-2">
                Tap outside or press the X button to close
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default About;
