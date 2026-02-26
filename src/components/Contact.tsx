import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter } from 'lucide-react';
import { sendContactMessage } from '../utils/api';

export function Contact({ data }: { data: any }) {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });
  
  const profile = data?.profile || {};
  const contact = data?.contact || {};
  
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      await sendContactMessage(formData.name, formData.email, formData.message);
      setSent(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSent(false), 5000);
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message. Please try again.');
    } finally {
      setSending(false);
    }
  };

  const contactInfo = [
    { icon: Mail, label: 'Email', value: profile.email || 'your.email@example.com', href: `mailto:${profile.email}` },
    { icon: Phone, label: 'Phone', value: profile.phone || '+1 (555) 123-4567', href: `tel:${profile.phone}` },
    { icon: MapPin, label: 'Location', value: profile.location || 'Available for Remote Work', href: '#' },
  ];

  const socialLinks = [
    { icon: Github, label: 'GitHub', href: profile.github || 'https://github.com' },
    { icon: Linkedin, label: 'LinkedIn', href: profile.linkedin || 'https://linkedin.com' },
    { icon: Twitter, label: 'Twitter', href: profile.twitter || 'https://twitter.com' },
  ].filter(social => social.href && social.href !== 'https://github.com' && social.href !== 'https://linkedin.com' && social.href !== 'https://twitter.com');

  return (
    <section id="contact" ref={ref} className="py-20 px-6 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-cyan-500/5 to-blue-500/5 rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.h2
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl mb-8 flex items-center gap-4"
        >
          <span className="text-cyan-400 text-3xl" aria-label="Section 5">05.</span> {contact.introTitle || 'Get In Touch'}
          <span className="flex-1 h-px bg-slate-700 ml-4" aria-hidden="true"></span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-slate-400 text-lg mb-16 max-w-2xl"
        >
          {contact.introText || "I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision. Feel free to reach out!"}
        </motion.p>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="space-y-6"
            >
              {contactInfo.map((info, index) => (
                <motion.a
                  key={index}
                  href={info.href}
                  initial={{ opacity: 0, x: -50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  whileHover={{ x: 10 }}
                  className="flex items-center gap-4 p-4 bg-slate-800/30 border border-slate-700 rounded-lg hover:border-cyan-400/50 transition-all group"
                >
                  <div className="w-12 h-12 bg-cyan-400/10 rounded-lg flex items-center justify-center group-hover:bg-cyan-400/20 transition-colors">
                    <info.icon className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div>
                    <p className="text-slate-500 text-sm">{info.label}</p>
                    <p className="text-white group-hover:text-cyan-400 transition-colors">{info.value}</p>
                  </div>
                </motion.a>
              ))}
            </motion.div>

            {/* Social Links */}
            {socialLinks.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="pt-6"
              >
                <h3 className="text-xl text-white mb-4">Connect With Me</h3>
                <div className="flex gap-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-12 h-12 bg-slate-800/50 border border-slate-700 rounded-lg flex items-center justify-center hover:border-cyan-400 hover:bg-slate-800 transition-all group"
                    >
                      <social.icon className="w-6 h-6 text-slate-400 group-hover:text-cyan-400 transition-colors" />
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="bg-slate-800/30 border border-slate-700 rounded-lg p-8"
          >
            <h3 className="text-2xl text-white mb-6">{contact.formTitle || 'Send a Message'}</h3>
            {sent && (
              <div className="mb-4 p-4 bg-green-500/10 border border-green-500/30 rounded-lg text-green-400 text-sm">
                Message sent successfully! I'll get back to you soon.
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-slate-300 mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white focus:border-cyan-400 focus:outline-none transition-colors"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-slate-300 mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white focus:border-cyan-400 focus:outline-none transition-colors"
                  placeholder="your.email@example.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-slate-300 mb-2">Message</label>
                <textarea
                  id="message"
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white focus:border-cyan-400 focus:outline-none transition-colors resize-none"
                  placeholder="Your message..."
                />
              </div>
              <motion.button
                type="submit"
                disabled={sending}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-slate-950 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <span>{sending ? 'Sending...' : 'Send Message'}</span>
                <Send className="w-5 h-5" />
              </motion.button>
            </form>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-20 pt-8 border-t border-slate-800 text-center"
        >
          <p className="text-slate-500">
            Designed & Built by {profile.name || 'Shady Yasser'} • © 2026 All rights reserved.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
