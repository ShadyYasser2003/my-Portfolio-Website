import React from 'react';
import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { ExternalLink, Github } from 'lucide-react';
import * as Icons from 'lucide-react';

export function Projects({ data }: { data: any }) {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const projects = data?.projects || [];

  return (
    <section id="projects" ref={ref} className="py-20 px-6 relative overflow-hidden">
      <div className="container mx-auto max-w-6xl">
        <motion.h2
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl mb-16 flex items-center gap-4"
        >
          <span className="text-cyan-400 text-3xl" aria-label="Section 3">03.</span> Featured Projects
          <span className="flex-1 h-px bg-slate-700 ml-4" aria-hidden="true"></span>
        </motion.h2>

        {projects.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project: any, index: number) => {
              const IconComponent = (Icons as any)[project.icon] || Icons.Server;
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  whileHover={{ y: -10 }}
                  className="bg-slate-800/30 border border-slate-700 rounded-lg overflow-hidden hover:border-cyan-400/50 transition-all group"
                >
                  {/* Project Header */}
                  <div className={`bg-gradient-to-br ${project.gradient} p-6 relative overflow-hidden`}>
                    <motion.div
                      className="absolute inset-0 bg-black/20"
                      initial={{ scale: 0, opacity: 0 }}
                      whileHover={{ scale: 2, opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    />
                    <div className="relative z-10">
                      <IconComponent className="w-12 h-12 text-white mb-4" />
                    </div>
                  </div>

                  {/* Project Content */}
                  <div className="p-6 space-y-4">
                    <h3 className="text-xl text-white group-hover:text-cyan-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      {project.description}
                    </p>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2">
                      {(project.tech || []).map((tech: string, techIndex: number) => (
                        <span
                          key={techIndex}
                          className="px-3 py-1 bg-slate-700/50 text-cyan-400 text-xs rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Links */}
                    <div className="flex gap-4 pt-4">
                      {project.githubUrl && (
                        <motion.a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          className="text-slate-400 hover:text-cyan-400 transition-colors"
                        >
                          <Github className="w-5 h-5" />
                        </motion.a>
                      )}
                      {project.liveUrl && (
                        <motion.a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          className="text-slate-400 hover:text-cyan-400 transition-colors"
                        >
                          <ExternalLink className="w-5 h-5" />
                        </motion.a>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20 text-slate-500">
            <p>No projects added yet. Use the dashboard to showcase your work.</p>
          </div>
        )}
      </div>
    </section>
  );
}
