import React from 'react';
import { motion } from 'motion/react';
import { Github, Linkedin, Mail, ChevronDown, Twitter, Download } from 'lucide-react';
import defaultProfileImage from 'figma:asset/1ac8a0de9b9832b65561dc9bbf6bb3579a3f1c6d.png';

export function Hero({ data }: { data: any }) {
  const profile = data?.profile || {};
  
  const scrollToAbout = () => {
    const element = document.getElementById('about');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-blue-500/10"></div>
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-cyan-400/5 rounded-full"
            style={{
              width: Math.random() * 300 + 50,
              height: Math.random() * 300 + 50,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Text Content */}
          <div className="flex-1 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-cyan-400 mb-2"
              >
                Hi, my name is
              </motion.p>
              <h1 className="sr-only">{profile.name || 'Shady Yasser'} - {profile.title || 'DevOps Engineer'}</h1>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-5xl md:text-7xl mb-4 tracking-tight"
                aria-hidden="true"
              >
                {profile.name || 'Shady Yasser'} <span className="text-cyan-400"></span>
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-3xl md:text-5xl text-slate-400 mb-6"
              >
                {profile.title || 'DevOps Engineer'}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="text-slate-400 max-w-xl text-lg"
              >
                {profile.tagline || 'Specializing in cloud infrastructure, CI/CD pipelines, and automation.'}
              </motion.p>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="flex gap-4"
            >
              {profile.github && (
                <motion.a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 bg-slate-800/50 rounded-lg border border-slate-700 hover:border-cyan-400 hover:bg-slate-800 transition-all"
                >
                  <Github className="w-6 h-6 text-cyan-400" />
                </motion.a>
              )}
              {profile.linkedin && (
                <motion.a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 bg-slate-800/50 rounded-lg border border-slate-700 hover:border-cyan-400 hover:bg-slate-800 transition-all"
                >
                  <Linkedin className="w-6 h-6 text-cyan-400" />
                </motion.a>
              )}
              {profile.twitter && (
                <motion.a
                  href={profile.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 bg-slate-800/50 rounded-lg border border-slate-700 hover:border-cyan-400 hover:bg-slate-800 transition-all"
                >
                  <Twitter className="w-6 h-6 text-cyan-400" />
                </motion.a>
              )}
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 bg-slate-800/50 rounded-lg border border-slate-700 hover:border-cyan-400 hover:bg-slate-800 transition-all"
              >
                <Mail className="w-6 h-6 text-cyan-400" />
              </motion.a>
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
            >
              {profile.resumeUrl ? (
                <motion.a
                  href={profile.resumeUrl}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 px-8 py-3 bg-cyan-500 hover:bg-cyan-600 text-slate-950 rounded-lg transition-colors mt-4"
                >
                  <Download className="w-5 h-5" />
                  Download Resume
                </motion.a>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 bg-cyan-500 hover:bg-cyan-600 text-slate-950 rounded-lg transition-colors mt-4 opacity-50 cursor-not-allowed"
                  disabled
                >
                  Upload Resume in Dashboard
                </motion.button>
              )}
            </motion.div>
          </div>

          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ delay: 0.5, duration: 1, type: 'spring' }}
            className="relative"
          >
            <motion.div
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: 'linear',
              }}
              className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full blur-2xl opacity-30"
            />
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full opacity-20 blur-xl"></div>
              <img
                src={profile.photoUrl || defaultProfileImage}
                alt={profile.name || 'Shady Yasser'}
                className="relative w-full h-full object-cover rounded-full border-4 border-cyan-400/30 shadow-2xl"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        onClick={scrollToAbout}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors"
        >
          <span className="text-sm">Scroll Down</span>
          <ChevronDown className="w-6 h-6" />
        </motion.div>
      </motion.button>
    </section>
  );
}
