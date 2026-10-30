import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedSection, { AnimatedItem } from '../components/AnimatedSection';
import GlassCard from '../components/GlassCard';
import { PROFILE } from '../data/site';

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

  const contactInfo = [
    {
      icon: '📧',
      label: 'Email',
      value: 'hagophadjiakian@gmail.com',
      href: 'mailto:hagophadjiakian@gmail.com',
    },
    {
      icon: '📍',
      label: 'Location',
      value: 'Lebanon / Armenia',
      href: null,
    },
    {
      icon: '💼',
      label: 'LinkedIn',
      value: 'hagop-a-hadjiakian',
      href: 'https://www.linkedin.com/in/hagop-a-hadjiakian-744b32156',
    },
    {
      icon: '📸',
      label: 'Instagram',
      value: '@hagop_a_hadji_akian',
      href: 'https://www.instagram.com/hagop_a_hadji_akian/',
    },
    {
      icon: '📘',
      label: 'Facebook',
      value: 'Hagop Hadjiakian',
      href: 'https://www.facebook.com/hagop.aris.hadjiakian/',
    },
  ];

  return (
    <div className="min-h-screen pt-24 pb-16">
      <AnimatedSection title="Let's Connect" subtitle="Have a project in mind? Want to share your story? Reach out!">

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
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <span>✉️</span>
                Send a Message
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
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
                      className={`w-full px-4 py-3 rounded-lg bg-white/5 border ${errors[field] ? 'border-red-500' : 'border-white/10'} focus:border-coral focus:outline-none transition-colors`}
                      placeholder={field === 'email' ? 'your@email.com' : field === 'name' ? 'Your name' : "What's this about?"}
                    />
                    {errors[field] && (
                      <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-red-500 text-sm mt-1">
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
                    rows={5}
                    className={`w-full px-4 py-3 rounded-lg bg-white/5 border ${errors.message ? 'border-red-500' : 'border-white/10'} focus:border-coral focus:outline-none transition-colors resize-none`}
                    placeholder="Share your thoughts, ideas, or just say hello..."
                  />
                  {errors.message && (
                    <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-red-500 text-sm mt-1">
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
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <span>🌐</span>
                  Find Me Online
                </h3>
                <div className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <motion.div key={info.label} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1 }} className="flex items-center gap-4">
                      <div className="text-2xl">{info.icon}</div>
                      <div>
                        <p className="text-sm text-muted">{info.label}</p>
                        {info.href ? (
                          <a href={info.href} {...(!info.href.startsWith('mailto:') && { target: '_blank', rel: 'noopener noreferrer' })} className="text-white hover:text-coral transition-colors">{info.value}</a>
                        ) : (
                          <p className="text-white">{info.value}</p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </GlassCard>
            </AnimatedItem>

            <AnimatedItem>
              <GlassCard glow glowColor="hope">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <span className="text-hope">✦</span>
                  Let's Inspire Each Other
                </h3>
                <p className="text-muted mb-6">
                  Whether you want to discuss technology, share your own journey of resilience,
                  or collaborate on projects that make a difference — I'm here to listen.
                </p>
                <div className="flex gap-4">
                  {[
                    { href: 'mailto:hagophadjiakian@gmail.com', icon: '📧' },
                    { href: 'https://www.linkedin.com/in/hagop-a-hadjiakian-744b32156', icon: '💼' },
                    { href: 'https://www.instagram.com/hagop_a_hadji_akian/', icon: '📸' },
                    { href: 'https://www.facebook.com/hagop.aris.hadjiakian/', icon: '📘' },
                  ].map((social, i) => (
                    <motion.a
                      key={i}
                      href={social.href}
                      {...(!social.href.startsWith('mailto:') && { target: '_blank', rel: 'noopener noreferrer' })}
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-3 glass rounded-lg text-2xl hover:bg-coral/10 transition-colors"
                    >
                      {social.icon}
                    </motion.a>
                  ))}
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
