import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedSection, { AnimatedItem } from '../components/AnimatedSection';
import GlassCard from '../components/GlassCard';
import { PROFILE, LINKS } from '../data/site';
import SocialIcon from '../components/SocialIcon';
import { SocialIconRow, CvButton, externalProps } from '../components/SocialLinks';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState(null);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
  };

  // The form has no server: it opens the visitor's email app with the message
  // ready to send. The wording below says exactly that.
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const emailBody = `Name: ${formData.name}
Email: ${formData.email}

${formData.message}`;

    const mailtoLink = `mailto:${PROFILE.email}?subject=${encodeURIComponent(
      `Portfolio: ${formData.subject}`
    )}&body=${encodeURIComponent(emailBody)}`;

    window.location.href = mailtoLink;
    setSubmitStatus('opened');
  };


  return (
    <div className="min-h-screen pt-24 pb-16">
      <AnimatedSection title="Let's Connect" titleAs="h1" subtitle="Have a project in mind? Want to share your story? Reach out!">

        {/* Motivational intro */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <p className="motivational-quote text-xl text-sky-light max-w-2xl mx-auto">
            "Together, we can turn challenges into opportunities."
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <AnimatedItem>
            <GlassCard glow glowColor="coral" hover={false}>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <span aria-hidden="true">✉️</span>
                Send a Message
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                {['name', 'email', 'subject'].map((field) => (
                  <div key={field}>
                    <label htmlFor={field} className="block text-sm font-medium mb-2 capitalize">{field}</label>
                    <motion.input
                      whileFocus={{ scale: 1.01 }}
                      type={field === 'email' ? 'email' : 'text'}
                      id={field}
                      name={field}
                      value={formData[field]}
                      onChange={handleChange}
                      autoComplete={field === 'name' ? 'name' : field === 'email' ? 'email' : 'off'}
                      aria-invalid={errors[field] ? 'true' : undefined}
                      aria-describedby={errors[field] ? `${field}-error` : undefined}
                      className={`w-full px-4 py-3 rounded-lg bg-white/5 border ${errors[field] ? 'border-red-500' : 'border-white/10'} focus:border-coral focus:outline-none transition-colors`}
                      placeholder={field === 'email' ? 'your@email.com' : field === 'name' ? 'Your name' : "What's this about?"}
                    />
                    {errors[field] && (
                      <motion.p id={`${field}-error`} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-red-400 text-sm mt-1">
                        {errors[field]}
                      </motion.p>
                    )}
                  </div>
                ))}

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
                  <motion.textarea
                    whileFocus={{ scale: 1.01 }}
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    aria-invalid={errors.message ? 'true' : undefined}
                    aria-describedby={errors.message ? 'message-error' : undefined}
                    rows={5}
                    className={`w-full px-4 py-3 rounded-lg bg-white/5 border ${errors.message ? 'border-red-500' : 'border-white/10'} focus:border-coral focus:outline-none transition-colors resize-none`}
                    placeholder="Share your thoughts, ideas, or just say hello..."
                  />
                  {errors.message && (
                    <motion.p id="message-error" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-red-400 text-sm mt-1">
                      {errors.message}
                    </motion.p>
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full btn-primary"
                >
                  Open in my email app
                </motion.button>
                <p className="text-muted text-xs text-center">
                  This opens your email app with the message ready. Press send there to deliver it.
                </p>
              </form>

              <AnimatePresence>
                {submitStatus === 'opened' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    role="status"
                    className="mt-4 p-4 rounded-lg bg-hope/20 text-hope text-sm"
                  >
                    Your email app should now be open with your message. Press send there to deliver it. Nothing
                    opened? Email me directly at{' '}
                    <a href={`mailto:${PROFILE.email}`} className="underline">
                      {PROFILE.email}
                    </a>
                    .
                  </motion.div>
                )}
              </AnimatePresence>
            </GlassCard>
          </AnimatedItem>

          {/* Contact Info */}
          <div className="space-y-6">
            <AnimatedItem>
              <GlassCard glow glowColor="sky">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <span aria-hidden="true">🌐</span>
                  Find Me Online
                </h2>
                <ul className="space-y-5">
                  {LINKS.map((link, index) => (
                    <motion.li
                      key={link.name}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.08 }}
                      className="flex items-center gap-4"
                    >
                      <span className="w-10 h-10 rounded-full glass flex items-center justify-center text-sky-light shrink-0">
                        <SocialIcon name={link.icon} className="w-5 h-5" />
                      </span>
                      <div className="min-w-0">
                        <p className="text-sm text-muted">{link.name}</p>
                        <a
                          href={link.href}
                          {...externalProps(link.href)}
                          className="text-white hover:text-coral transition-colors break-all"
                        >
                          {link.handle}
                        </a>
                      </div>
                    </motion.li>
                  ))}
                  <li className="flex items-center gap-4">
                    <span className="w-10 h-10 rounded-full glass flex items-center justify-center shrink-0" aria-hidden="true">
                      📍
                    </span>
                    <div>
                      <p className="text-sm text-muted">Location</p>
                      <p className="text-white">{PROFILE.location}</p>
                    </div>
                  </li>
                </ul>
              </GlassCard>
            </AnimatedItem>

            <AnimatedItem>
              <GlassCard glow glowColor="hope">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <span className="text-hope">✦</span>
                  Let's Inspire Each Other
                </h2>
                <p className="text-muted mb-6">
                  Whether you want to discuss technology, share your own journey of resilience,
                  or collaborate on projects that make a difference — I'm here to listen.
                </p>
                <SocialIconRow
                  only={['Email', 'GitHub', 'LinkedIn', 'NeurolinkUp']}
                  linkClassName="p-3 glass rounded-lg text-sky-light hover:text-coral hover:bg-coral/10 transition-colors"
                  iconClassName="w-6 h-6"
                />
                <div className="mt-6">
                  <CvButton />
                </div>
              </GlassCard>
            </AnimatedItem>

            <AnimatedItem>
              <GlassCard>
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-3 h-3 bg-hope rounded-full" />
                    <div className="absolute inset-0 w-3 h-3 bg-hope rounded-full animate-ping" />
                  </div>
                  <span className="text-muted">Open to inspiring collaborations and meaningful connections</span>
                </div>
              </GlassCard>
            </AnimatedItem>

            {/* Quote */}
            <AnimatedItem>
              <GlassCard className="text-center">
                <p className="motivational-quote text-lg text-sky-light">
                  "Every connection is a chance to inspire and be inspired."
                </p>
              </GlassCard>
            </AnimatedItem>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
};

export default Contact;
