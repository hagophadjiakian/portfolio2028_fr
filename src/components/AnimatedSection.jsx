import React from 'react';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const AnimatedSection = ({ children, className = '', title, subtitle, id, ...props }) => {
  return (
    <section id={id} className={`py-20 px-4 sm:px-6 lg:px-8 ${className}`} {...props}>
      <div className="max-w-7xl mx-auto">
        {(title || subtitle) && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            {title && (
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="gradient-text">{title}</span>
              </h2>
            )}
            {subtitle && (
              <p className="text-muted text-lg max-w-2xl mx-auto">{subtitle}</p>
            )}
          </motion.div>
        )}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
};

export const AnimatedItem = ({ children, className = '', ...props }) => {
  return (
    <motion.div variants={itemVariants} className={className} {...props}>
      {children}
    </motion.div>
  );
};

export default AnimatedSection;
