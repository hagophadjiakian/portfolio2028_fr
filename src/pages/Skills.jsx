import React from 'react';
import { motion } from 'framer-motion';
import AnimatedSection, { AnimatedItem } from '../components/AnimatedSection';
import GlassCard from '../components/GlassCard';
import { yearsSinceInjury } from '../data/site';

// Grouped skills with a short line on where they are used.
// No percentage bars: they are hard to interpret and recruiters tend to ignore them.
const skillGroups = [
  {
    title: 'Testing & QA',
    color: 'coral',
    icon: '🔍',
    summary: 'Test automation, manual and API testing, acceptance testing.',
    skills: ['Playwright', 'Selenium', 'Manual testing', 'API testing', 'Acceptance testing', 'Postman', 'Jira plugins', 'Bug detection'],
  },
  {
    title: 'Programming & Web',
    color: 'sky',
    icon: '💻',
    summary: 'Backend services, web interfaces and databases.',
    skills: ['Python', 'Java', 'JavaScript', 'TypeScript', 'React', 'FastAPI', 'Tailwind CSS', 'REST APIs', 'jQuery', 'MySQL', 'AI APIs (Gemini)'],
  },
  {
    title: 'DevOps & Tools',
    color: 'hope',
    icon: '🔧',
    summary: 'Version control, continuous integration and Linux environments.',
    skills: ['Git / GitHub', 'Jenkins', 'Groovy', 'CI/CD', 'Unix / Linux', 'VS Code', 'Agile'],
  },
  {
    title: 'Hardware & Rehab Tech',
    color: 'coral',
    icon: '🦾',
    summary: 'Rehabilitation devices, muscle sensors and movement analysis.',
    skills: [
      'Arduino',
      'Electronics',
      'EMG sensors',
      'Signal processing',
      'Computer vision (pose estimation)',
      'Biomechanics',
      'MATLAB',
      'LabVIEW',
      'Flowcode',
    ],
  },
];

const chipColors = {
  coral: 'bg-coral/15 text-coral-light border-coral/20',
  sky: 'bg-sky/15 text-sky-light border-sky/20',
  hope: 'bg-hope/15 text-hope border-hope/20',
};

const Skills = () => {
  const strengths = [
    { name: 'Resilience', icon: '💪', text: `${yearsSinceInjury()} years of turning a spinal cord injury into a drive to build.` },
    { name: 'Problem Solving', icon: '🧩', text: 'From failing tests to home-built rehabilitation devices.' },
    { name: 'Adaptability', icon: '🔄', text: 'Four languages, two countries, hardware and software.' },
    { name: 'Determination', icon: '🎯', text: 'Graduated in Electrical Engineering after my injury.' },
  ];

  return (
    <div className="min-h-screen pt-24 pb-16">
      <AnimatedSection title="Skills & Expertise" subtitle="Technologies I use to turn challenges into solutions">
        {/* Motivational intro */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <p className="motivational-quote text-xl text-sky-light max-w-2xl mx-auto">"Every skill learned is a step toward independence."</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillGroups.map((group, index) => (
            <AnimatedItem key={group.title}>
              <GlassCard className="h-full" glow glowColor={group.color} delay={index * 0.1}>
                <div className="flex items-center gap-4 mb-2">
                  <span className="text-3xl" aria-hidden="true">
                    {group.icon}
                  </span>
                  <h2 className="text-xl font-bold">{group.title}</h2>
                </div>
                <p className="text-muted text-sm mb-5">{group.summary}</p>
                <ul className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <li key={skill} className={`px-3 py-1.5 rounded-full text-sm border ${chipColors[group.color]}`}>
                      {skill}
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </AnimatedItem>
          ))}
        </div>

        {/* Core Strengths */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-20">
          <h2 className="text-2xl font-bold text-center mb-4 gradient-text">Core Strengths</h2>
          <p className="text-center text-muted mb-10 max-w-xl mx-auto">Skills that go beyond code — qualities forged through perseverance</p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {strengths.map((item) => (
              <li key={item.name} className="glass-card p-6 text-center">
                <span className="text-3xl block mb-3" aria-hidden="true">
                  {item.icon}
                </span>
                <h3 className="font-semibold mb-2">{item.name}</h3>
                <p className="text-muted text-sm" suppressHydrationWarning>
                  {item.text}
                </p>
              </li>
            ))}
          </ul>
        </motion.div>
      </AnimatedSection>
    </div>
  );
};

export default Skills;
