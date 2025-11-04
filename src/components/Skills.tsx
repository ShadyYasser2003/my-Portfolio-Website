import React from 'react';
import { motion } from 'motion/react';
import { useInView } from 'motion/react';

export function Skills({ data }: { data: any }) {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const skillCategories = data?.skills || [];

  return (
    <section id="skills" ref={ref} className="py-20 px-6 relative overflow-hidden">
      <div className="container mx-auto max-w-6xl">
        <motion.h2
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl mb-16 flex items-center gap-4"
        >
          <span className="text-cyan-400 text-3xl" aria-label="Section 2">02.</span> Skills & Technologies
          <span className="flex-1 h-px bg-slate-700 ml-4" aria-hidden="true"></span>
        </motion.h2>

        {skillCategories.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skillCategories.map((category: any, categoryIndex: number) => (
              <motion.div
                key={categoryIndex}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: categoryIndex * 0.1, duration: 0.6 }}
                className="bg-slate-800/30 border border-slate-700 rounded-lg p-6 hover:border-cyan-400/50 transition-all"
              >
                <h3 className="text-xl text-cyan-400 mb-6">{category.title}</h3>
                <div className="space-y-4">
                  {(category.skills || []).map((skill: any, skillIndex: number) => (
                    <div key={skillIndex}>
                      <div className="flex justify-between mb-2">
                        <span className="text-slate-300">{skill.name}</span>
                        <span className="text-slate-500 text-sm">{skill.level}%</span>
                      </div>
                      <div className="h-2 bg-slate-700/50 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={isInView ? { width: `${skill.level}%` } : {}}
                          transition={{ delay: categoryIndex * 0.1 + skillIndex * 0.1, duration: 1, ease: 'easeOut' }}
                          className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-slate-500">
            <p>No skills added yet. Use the dashboard to add your skills.</p>
          </div>
        )}
      </div>
    </section>
  );
}
