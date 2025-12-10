import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Terminal, Play } from 'lucide-react';
import { Project } from '../types';

interface ProjectsProps {
  projects: Project[];
}

export const Projects: React.FC<ProjectsProps> = ({ projects }) => {
  return (
    <div className="container mx-auto px-6 py-20">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-5xl font-bold mb-4">Query <span className="text-gradient">Results</span></h2>
        <p className="text-muted-foreground font-mono">// Displaying {projects.length} rows from [Projects] table</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group"
          >
            {/* IDE Window Style Card */}
            <div className="bg-bg-secondary border border-border rounded-lg overflow-hidden flex flex-col h-full hover:shadow-[0_0_20px_rgba(14,165,233,0.15)] transition-all duration-300 hover:-translate-y-1">
              
              {/* Window Toolbar */}
              <div className="bg-terminal px-4 py-2 flex justify-between items-center border-b border-border">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                  </div>
                  <span className="ml-3 font-mono text-xs text-muted-foreground">project_{index + 1}.sql</span>
                </div>
                <div className="flex gap-2 text-muted-foreground">
                  <Play size={14} className="hover:text-green-400 cursor-pointer" />
                </div>
              </div>

              <div className="p-6 flex flex-col flex-grow relative">
                 <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
                 
                 <div className="mb-4">
                   <h3 className="text-2xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors font-mono">
                     {project.title}
                   </h3>
                   <div className="text-sm font-mono text-muted-foreground/80 mb-4">
                      -- {project.description}
                   </div>
                 </div>

                 {/* Tech Stack Grid */}
                 <div className="mt-auto mb-6">
                   <div className="text-xs font-mono text-muted-foreground/80 mb-2">DEPENDENCIES:</div>
                   <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, i) => (
                      <span key={i} className="text-xs font-mono px-2 py-1 bg-background border border-border text-secondary rounded-sm">
                        {tech}
                      </span>
                    ))}
                   </div>
                 </div>

                 <div className="flex gap-4 pt-4 border-t border-border">
                   <a href="#" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors font-mono group/link">
                     <Github size={16} />
                     <span className="group-hover/link:underline">VIEW_SOURCE</span>
                   </a>
                   <a href={project.link || '#'} className="flex items-center gap-2 text-sm text-primary hover:text-foreground transition-colors font-mono group/link">
                     <ExternalLink size={16} />
                     <span className="group-hover/link:underline">DEPLOY_PREVIEW</span>
                   </a>
                 </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};