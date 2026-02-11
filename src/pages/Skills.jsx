import React from 'react';
import { motion } from 'framer-motion';
import AnimatedSection, { AnimatedItem } from '../components/AnimatedSection';
import GlassCard from '../components/GlassCard';

const Skills = () => {
  const skillCategories = [
    {
      title: 'Testing & QA',
      color: 'coral',
      icon: '🔍',
      skills: [
        { name: 'Playwright', level: 90 },
        { name: 'Selenium', level: 88 },
        { name: 'Manual Testing', level: 95 },
        { name: 'API Testing', level: 85 },
        { name: 'Jira Plugins', level: 80 },
        { name: 'Bug Detection', level: 92 },
      ],
    },
    {
      title: 'Programming',
      color: 'sky',
      icon: '💻',
      skills: [
        { name: 'Python', level: 88 },
        { name: 'Java', level: 85 },
        { name: 'JavaScript', level: 82 },
        { name: 'React', level: 80 },
        { name: 'jQuery', level: 78 },
        { name: 'MySQL', level: 75 },
      ],
    },
    {
      title: 'Tools & Hardware',
      color: 'hope',
      icon: '🔧',
      skills: [
        { name: 'Git/GitHub', level: 90 },
        { name: 'Jenkins', level: 85 },
        { name: 'Unix/Linux', level: 82 },
        { name: 'Arduino', level: 80 },
        { name: 'MATLAB', level: 75 },
        { name: 'LabVIEW', level: 70 },
      ],
    },
  ];

  const getGradient = (color) => {
    const gradients = {
      coral: 'from-coral to-coral-light',
      sky: 'from-sky to-sky-light',
      hope: 'from-hope to-emerald-400',
    };
    return gradients[color];
  };

  const getTextColor = (color) => {
    const colors = {
      coral: 'text-coral',
      sky: 'text-sky',
      hope: 'text-hope',
    };
    return colors[color];
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <AnimatedSection title="Skills & Expertise" subtitle="Technologies I use to turn challenges into solutions">

        {/* Motivational intro */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <p className="motivational-quote text-xl text-sky-light max-w-2xl mx-auto">
            "Every skill learned is a step toward independence."
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, catIndex) => (
            <AnimatedItem key={category.title}>
              <GlassCard className="h-full" glow glowColor={category.color} delay={catIndex * 0.1}>
                <div className="flex items-center gap-4 mb-6">
                  <div className={`text-3xl`}>
                    {category.icon}
                  </div>
                  <h3 className="text-xl font-bold">{category.title}</h3>
                </div>

                <div className="space-y-5">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skill.name}>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">{skill.name}</span>
                        <span className={`text-sm ${getTextColor(category.color)}`}>{skill.level}%</span>
                      </div>
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: catIndex * 0.1 + skillIndex * 0.1 }}
                          className={`h-full rounded-full bg-gradient-to-r ${getGradient(category.color)}`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </AnimatedItem>
          ))}
        </div>

        {/* Other Technologies */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-16">
          <h3 className="text-2xl font-bold text-center mb-8 gradient-text">Other Technologies</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {['REST APIs', 'Groovy', 'Electronics', 'Flowcode', 'Biomechanics', 'EMG Sensors', 'CI/CD', 'Agile', 'VS Code', 'Postman', 'Acceptance Testing', 'Signal Processing'].map((tech, index) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.1, y: -2 }}
                className="px-4 py-2 glass rounded-full text-sm font-medium text-muted hover:text-white hover:border-coral/50 transition-all cursor-default"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Core Strengths - More personal/motivational */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-20">
          <h3 className="text-2xl font-bold text-center mb-4 gradient-text">Core Strengths</h3>
          <p className="text-center text-muted mb-12 max-w-xl mx-auto">
            Skills that go beyond code — qualities forged through perseverance
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { name: 'Resilience', value: 100, icon: '💪' },
              { name: 'Problem Solving', value: 95, icon: '🧩' },
              { name: 'Adaptability', value: 98, icon: '🔄' },
              { name: 'Determination', value: 100, icon: '🎯' },
            ].map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col items-center"
              >
                <div className="relative w-28 h-28 mb-4">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8" />
                    <motion.circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="url(#gradient)"
                      strokeWidth="8"
                      strokeLinecap="round"
                      initial={{ strokeDasharray: '0 283' }}
                      whileInView={{ strokeDasharray: `${item.value * 2.83} 283` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, delay: index * 0.1 }}
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#f76c6c" />
                        <stop offset="100%" stopColor="#a8c0e8" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl">{item.icon}</span>
                  </div>
                </div>
                <span className="text-sm text-muted text-center">{item.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </AnimatedSection>
    </div>
  );
};

export default Skills;
