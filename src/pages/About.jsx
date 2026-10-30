import React, { useState, useCallback } from 'react';
import AnimatedSection, { AnimatedItem } from '../components/AnimatedSection';
import GlassCard from '../components/GlassCard';
import YouTubePlayer from '../components/YouTubePlayer';
import { yearsSinceInjury, yearsInTech, PROFILE } from '../data/site';
import { SocialIconRow } from '../components/SocialLinks';
import Lightbox, { ZoomButton } from '../components/Lightbox';

const About = () => {
  const [zoomedImage, setZoomedImage] = useState(null);

  const closeZoom = useCallback(() => setZoomedImage(null), []);

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
      <AnimatedSection title="My Story" titleAs="h1" subtitle="From adversity to achievement - a journey of resilience">

        {/* Hero Quote */}
        <div className="text-center mb-16 reveal">
          <p className="motivational-quote text-2xl md:text-3xl text-sky-light max-w-3xl mx-auto">
            "The body achieves what the mind believes."
          </p>
        </div>

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
                      src="/assets/images/profilepic-240.webp"
                      alt="Hagop Hadjiakian"
                      className="w-full h-full rounded-full object-cover"
                      width="237"
                      height="240"
                    />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">Hagop Hadjiakian</h2>
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
                    <span className="text-2xl mb-2 block" aria-hidden="true">{stat.icon}</span>
                    <span className="text-3xl font-bold gradient-text block mb-1 reveal" suppressHydrationWarning>
                      {stat.value}
                    </span>
                    <span className="text-muted text-sm">{stat.label}</span>
                  </GlassCard>
                ))}
              </div>
            </AnimatedItem>

            <AnimatedItem>
              <GlassCard glow glowColor="hope">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <span className="text-hope">✦</span>
                  What Drives Me
                </h2>
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
          <h2 className="text-3xl font-bold text-center mb-4 gradient-text reveal">
            Achievements & Moments
          </h2>
          <p className="text-center text-muted mb-8 max-w-2xl mx-auto reveal">
            Milestones that mark my journey of perseverance
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              // src: small version for the card; full: large version for the lightbox
              { src: '/assets/images/diploma.webp', title: 'Engineering Diploma', icon: '🎓', color: 'coral' },
              { src: '/assets/images/deans-800.webp', full: '/assets/images/deans-1600.webp', title: "Dean's List Recognition", icon: '🏆', color: 'hope' },
              { src: '/assets/images/dog-800.webp', full: '/assets/images/dog-1600.webp', title: 'My Companion', icon: '🐕', color: 'sky' },
            ].map((item) => (
              <AnimatedItem key={item.src}>
                <GlassCard glow glowColor={item.color}>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xl" aria-hidden="true">{item.icon}</span>
                    <h3 className="font-semibold text-sky-light">{item.title}</h3>
                  </div>
                  <ZoomButton title={item.title} onClick={() => setZoomedImage(item)} preload={item.full} className="bg-white/5">
                    <img
                      src={item.src}
                      alt={item.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                      decoding="async"
                    />
                  </ZoomButton>
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
                <h2 className="text-2xl font-bold gradient-text">Graduation Day</h2>
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
          <h2 className="text-3xl font-bold text-center mb-4 gradient-text reveal">
            My Journey
          </h2>
          <p className="text-center text-muted mb-12 max-w-2xl mx-auto reveal">
            From challenge to triumph — the milestones that shaped who I am today
          </p>

          {/* One column on phones (line on the left), alternating on larger screens */}
          <div className="relative">
            <div className="absolute left-2 md:left-1/2 md:-translate-x-1/2 w-1 h-full bg-gradient-to-b from-coral via-sky to-hope rounded-full" />

            <div className="space-y-12">
              {timeline.map((item, index) => (
                <div key={item.year} className={`relative flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} reveal`}>
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
                      <h3 className="text-base sm:text-xl font-semibold mt-2 break-words">{item.title}</h3>
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
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Rehabilitation Journey Videos */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-center mb-4 gradient-text reveal">
            My Rehabilitation Journey
          </h2>
          <p className="text-center text-muted mb-12 max-w-2xl mx-auto reveal">
            Videos documenting my path to recovery — every step a victory
          </p>

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
                    <span className="text-xl" aria-hidden="true">{video.icon}</span>
                    <h3 className="font-semibold text-sky-light">{video.title}</h3>
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
        <div className="mt-20 text-center reveal">
          <GlassCard className="inline-block max-w-2xl">
            <p className="motivational-quote text-xl text-sky-light mb-4">
              "My story isn't just about surviving — it's about thriving, innovating, and proving that
              our greatest obstacles can become our greatest teachers."
            </p>
            <p className="text-coral font-medium">— Hagop Hadjiakian</p>
          </GlassCard>
        </div>
      </AnimatedSection>

      <Lightbox image={zoomedImage} onClose={closeZoom} />
    </div>
  );
};

export default About;
