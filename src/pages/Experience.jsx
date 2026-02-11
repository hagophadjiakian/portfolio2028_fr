import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedSection, { AnimatedItem } from '../components/AnimatedSection';
import GlassCard from '../components/GlassCard';

const Experience = () => {
  const [expandedId, setExpandedId] = useState(null);

  const experiences = [
    {
      id: 1,
      role: 'Software & QA Engineer',
      company: 'IT Industry',
      location: 'Lebanon',
      period: '2019',
      type: 'Full-time',
      icon: '💼',
      description: 'Building, testing, and improving digital products that serve real people.',
      responsibilities: [
        'Developed and maintained test automation frameworks using Playwright and Selenium',
        'Created custom Jira plugins for enhanced project management workflows',
        'Implemented CI/CD pipelines with Jenkins using Groovy scripting',
        'Performed manual and automated API testing',
        'Collaborated with development teams in agile environments',
      ],
      technologies: ['Playwright', 'Selenium', 'Python', 'Java', 'Jenkins', 'Jira'],
    },
    {
      id: 2,
      role: 'Rehabilitation Technology Developer',
      company: 'Personal Projects',
      location: 'Lebanon',
      period: '2013 - Present',
      type: 'Self-directed',
      icon: '🦾',
      description: 'Designing and building custom rehabilitation devices for spinal cord injury recovery.',
      responsibilities: [
        'Built passive/active cycling devices for leg stimulation',
        'Designed custom ankle mobilization systems',
        'Created therapeutic hydrostimulation setups',
        'Developed EMG-controlled motor activation systems',
        'Applied biomechanics principles to assistive technology',
      ],
      technologies: ['Arduino', 'Electronics', 'EMG Sensors', 'Motor Control', 'MATLAB'],
    },
    {
      id: 3,
      role: 'HAL Exoskeleton Rehabilitation',
      company: 'Tsukuba Kenryugakuen / Cyberdyne',
      location: 'Japan',
      period: '2015',
      type: 'Rehabilitation',
      icon: '🇯🇵',
      description: 'Participated in advanced neuroplasticity rehabilitation using HAL exoskeleton technology.',
      responsibilities: [
        'Completed 2-month intensive rehabilitation program',
        'Trained with HAL (Hybrid Assistive Limb) exoskeleton by Cyberdyne',
        'Achieved neuroplasticity recovery enabling knee extension',
        'Progressed from complete T6 paraplegia to regaining sensation',
        'Now able to walk short distances with KAFO walker',
      ],
      technologies: ['HAL Exoskeleton', 'Cyberdyne Technology', 'Neuroplasticity Training'],
    },
    {
      id: 4,
      role: 'Electrical Engineering Student',
      company: 'NDU Notre Dame University Louaize',
      location: 'Lebanon',
      period: '2011 - 2018',
      type: 'Education',
      icon: '🎓',
      description: 'Studied Electrical Engineering with focus on electronics and control systems.',
      responsibilities: [
        'Completed final year project on Passive Knee Exoskeleton & sEMG Device',
        'Studied electronics fundamentals and signal processing',
        'Worked with MATLAB simulations and NI LabVIEW',
        'Designed circuits using Flowcode and Arduino',
        'Graduated from NDU Notre Dame University Louaize, Zouk Mosbeh, Lebanon',
      ],
      technologies: ['Electronics', 'MATLAB', 'LabVIEW', 'Flowcode', 'Arduino'],
    },
  ];

  const education = [
    {
      degree: 'Bachelor of Science in Electrical Engineering',
      school: 'NDU Notre Dame University Louaize, Zouk Mosbeh, Lebanon',
      period: '2011 - 2018',
      icon: '🎓',
      description: 'Graduated from NDU Notre Dame University Louaize, Zouk Mosbeh, Lebanon. Final year project on Passive Knee Exoskeleton & Surface Electromyography Device.',
    },
    {
      degree: 'HAL Exoskeleton Rehabilitation Training',
      school: 'Tsukuba Kenryugakuen, Japan',
      period: '2015',
      icon: '🦾',
      description: 'Intensive 2-month neuroplasticity rehabilitation program using Cyberdyne HAL exoskeleton technology.',
    },
  ];

  return (
    <div className="min-h-screen pt-24 pb-16">
      <AnimatedSection title="My Journey" subtitle="From challenge to triumph — every experience shaped who I am">

        {/* Motivational intro */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <p className="motivational-quote text-xl text-sky-light max-w-2xl mx-auto">
            "Every setback is a setup for a comeback."
          </p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-1 h-full bg-gradient-to-b from-coral via-sky to-hope rounded-full" />

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative flex items-start ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} flex-col md:flex-row`}
              >
                <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'} pl-8 md:pl-0`}>
                  <GlassCard
                    glow
                    glowColor={index % 3 === 0 ? 'coral' : index % 3 === 1 ? 'sky' : 'hope'}
                    className="cursor-pointer"
                    onClick={() => setExpandedId(expandedId === exp.id ? null : exp.id)}
                  >
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="text-2xl">{exp.icon}</span>
                      <span className="text-coral font-mono text-sm">{exp.period}</span>
                      <span className="px-2 py-0.5 text-xs rounded-full bg-coral/20 text-coral">{exp.type}</span>
                    </div>

                    <h3 className="text-xl font-bold mb-1">{exp.role}</h3>
                    <p className="text-sky mb-2">{exp.company}</p>
                    <p className="text-muted text-sm mb-3">{exp.location}</p>
                    <p className="text-muted">{exp.description}</p>

                    <AnimatePresence>
                      {expandedId === exp.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="mt-4 pt-4 border-t border-white/10">
                            <h4 className="text-sm font-semibold mb-3">Key Achievements:</h4>
                            <ul className="space-y-2 mb-4">
                              {exp.responsibilities.map((resp, i) => (
                                <li key={i} className="flex items-start text-muted text-sm">
                                  <span className="w-1.5 h-1.5 bg-coral rounded-full mt-2 mr-3 flex-shrink-0" />
                                  {resp}
                                </li>
                              ))}
                            </ul>

                            <h4 className="text-sm font-semibold mb-3">Technologies:</h4>
                            <div className="flex flex-wrap gap-2">
                              {exp.technologies.map((tech) => (
                                <span key={tech} className="px-2 py-1 text-xs rounded-full bg-white/5 text-muted">
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <motion.div animate={{ rotate: expandedId === exp.id ? 180 : 0 }} className="mt-4 flex justify-center">
                      <svg className="w-5 h-5 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </motion.div>
                  </GlassCard>
                </div>

                <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 mt-6">
                  <motion.div
                    whileHover={{ scale: 1.3 }}
                    className={`w-4 h-4 rounded-full border-2 border-primary ${
                      index % 3 === 0 ? 'bg-coral neon-glow-coral' :
                      index % 3 === 1 ? 'bg-sky neon-glow-sky' :
                      'bg-hope neon-glow-hope'
                    }`}
                  />
                </div>

                <div className="hidden md:block w-1/2" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Education */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-24">
          <h3 className="text-3xl font-bold text-center mb-4 gradient-text">Education & Training</h3>
          <p className="text-center text-muted mb-12">Knowledge gained through perseverance</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {education.map((edu, index) => (
              <AnimatedItem key={edu.degree}>
                <GlassCard glow glowColor={index === 0 ? 'coral' : 'hope'}>
                  <div className="flex items-start gap-4">
                    <div className="text-3xl">{edu.icon}</div>
                    <div>
                      <span className="text-coral font-mono text-sm">{edu.period}</span>
                      <h4 className="text-lg font-bold mt-1">{edu.degree}</h4>
                      <p className="text-sky">{edu.school}</p>
                      <p className="text-muted text-sm mt-2">{edu.description}</p>
                    </div>
                  </div>
                </GlassCard>
              </AnimatedItem>
            ))}
          </div>
        </motion.div>

        {/* Bottom motivation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mt-20 text-center"
        >
          <GlassCard className="inline-block max-w-2xl">
            <p className="motivational-quote text-xl text-sky-light mb-4">
              "My journey proves that with determination, any obstacle can become a stepping stone."
            </p>
            <p className="text-coral font-medium">— Hagop Hadjiakian</p>
          </GlassCard>
        </motion.div>
      </AnimatedSection>
    </div>
  );
};

export default Experience;
