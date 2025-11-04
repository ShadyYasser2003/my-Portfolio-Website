import React from 'react';
import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import * as Icons from 'lucide-react';

export function About({ data }: { data: any }) {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  
  const about = data?.about || {};
  const paragraphs = about.paragraphs || [];
  const highlights = about.highlights || [];

  return (
    <section id="about" ref={ref} className="py-20 px-6 relative overflow-hidden">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl mb-4 flex items-center gap-4"
          >
            <span className="text-cyan-400 text-3xl" aria-label="Section 1">01.</span> About Me
            <span className="flex-1 h-px bg-slate-700 ml-4" aria-hidden="true"></span>
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-12 mt-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="space-y-6"
            >
              {paragraphs.map((paragraph: string, index: number) => (
                <p key={index} className="text-slate-300 text-lg leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </motion.div>

            <div className="grid grid-cols-2 gap-4">
              {highlights.map((item: any, index: number) => {
                const IconComponent = (Icons as any)[item.icon] || Icons.Cloud;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.6 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 hover:border-cyan-400 transition-all"
                  >
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                      className="w-12 h-12 bg-cyan-400/10 rounded-lg flex items-center justify-center mb-4"
                    >
                      <IconComponent className="w-6 h-6 text-cyan-400" />
                    </motion.div>
                    <h3 className="text-white mb-2">{item.title}</h3>
                    <p className="text-slate-400 text-sm">{item.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
