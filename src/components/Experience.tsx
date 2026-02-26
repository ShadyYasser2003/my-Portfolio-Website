import React from 'react';
import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { Briefcase, Calendar, MapPin } from 'lucide-react';

export function Experience({ data }: { data: any }) {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  const experiences = data?.experiences || [];
  const certifications = data?.certifications || [];

  return (
    <section id="experience" ref={ref} className="py-20 px-6 relative overflow-hidden">
      <div className="container mx-auto max-w-6xl">
        <motion.h2
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl mb-16 flex items-center gap-4"
        >
          <span className="text-cyan-400 text-3xl" aria-label="Section 4">04.</span> Experience
          <span className="flex-1 h-px bg-slate-700 ml-4" aria-hidden="true"></span>
        </motion.h2>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Timeline */}
          <div className="lg:col-span-2 space-y-8">
            {experiences.length > 0 ? (
              experiences.map((exp: any, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: index * 0.15, duration: 0.6 }}
                  className="relative pl-8 border-l-2 border-slate-700 hover:border-cyan-400 transition-all"
                >
                  {/* Timeline dot */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{ delay: index * 0.15 + 0.2, type: 'spring' }}
                    className="absolute left-0 top-0 w-4 h-4 -ml-[9px] bg-cyan-400 rounded-full border-4 border-slate-950"
                  />

                  <div className="bg-slate-800/30 border border-slate-700 rounded-lg p-6 hover:border-cyan-400/50 transition-all">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl text-white mb-1">{exp.title}</h3>
                        <p className="text-cyan-400">{exp.company}</p>
                      </div>
                      <div className="flex flex-col gap-2 text-slate-400 text-sm">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          {exp.period}
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          {exp.location}
                        </div>
                      </div>
                    </div>

                    <ul className="space-y-2">
                      {(exp.achievements || []).map((achievement: string, achIndex: number) => (
                        <motion.li
                          key={achIndex}
                          initial={{ opacity: 0, x: -20 }}
                          animate={isInView ? { opacity: 1, x: 0 } : {}}
                          transition={{ delay: index * 0.15 + 0.3 + achIndex * 0.05 }}
                          className="text-slate-300 text-sm flex items-start gap-2"
                        >
                          <span className="text-cyan-400 mt-1">▹</span>
                          <span>{achievement}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-20 text-slate-500">
                <p>No experience added yet. Use the dashboard to add your work history.</p>
              </div>
            )}
          </div>

          {/* Certifications */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="bg-slate-800/30 border border-slate-700 rounded-lg p-6 sticky top-24"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-cyan-400/10 rounded-lg flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-cyan-400" />
                </div>
                <h3 className="text-xl text-white">Certifications</h3>
              </div>

              {certifications.length > 0 ? (
                <ul className="space-y-4">
                  {certifications.map((cert: string, index: number) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      whileHover={{ x: 5 }}
                      className="text-slate-300 text-sm flex items-start gap-2 group cursor-default"
                    >
                      <span className="text-cyan-400 mt-1 group-hover:scale-125 transition-transform">✓</span>
                      <span className="group-hover:text-cyan-400 transition-colors">{cert}</span>
                    </motion.li>
                  ))}
                </ul>
              ) : (
                <p className="text-slate-500 text-sm">No certifications added yet.</p>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
