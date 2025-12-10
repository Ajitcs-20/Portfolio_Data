import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, Database, GitBranch } from 'lucide-react';
import { Experience as ExperienceType } from '../types';

interface ExperienceProps {
  experience: ExperienceType[];
}

export const Experience: React.FC<ExperienceProps> = ({ experience }) => {
  return (
    <div className="container mx-auto px-6 py-20 relative">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-5xl font-bold mb-4 flex justify-center items-center gap-4">
          <GitBranch className="text-primary" size={40} />
          <span className="text-foreground">Execution <span className="text-gradient">History</span></span>
        </h2>
        <p className="text-muted-foreground font-mono text-sm border px-2 py-1 inline-block border-border rounded bg-bg-secondary">
          SELECT * FROM experience ORDER BY date DESC
        </p>
      </motion.div>

      <div className="relative max-w-5xl mx-auto">
        {/* Animated Pipeline Line */}
        <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-1 bg-border/50 overflow-hidden rounded">
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-transparent via-primary to-transparent animate-data-flow" style={{ backgroundSize: '100% 200%' }}></div>
        </div>

        <div className="space-y-12">
          {experience.map((exp, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative flex flex-col md:flex-row gap-8 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
            >
              {/* Pipeline Node/Connector */}
              <div className="absolute left-[11px] md:left-1/2 transform md:-translate-x-1/2 top-8 w-6 h-6 bg-background border-4 border-primary rounded-full z-10 shadow-[0_0_15px_rgba(14,165,233,0.8)]"></div>

              {/* Content Card */}
              <div className="md:w-1/2 pl-12 md:pl-0 md:px-12">
                <div className="bg-bg-secondary border border-border p-6 rounded-sm hover:border-primary transition-all duration-300 relative group shadow-lg">
                   {/* Tech corner accents */}
                   <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-primary opacity-0 group-hover:opacity-100 transition-opacity"></div>
                   <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-primary opacity-0 group-hover:opacity-100 transition-opacity"></div>
                   <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-primary opacity-0 group-hover:opacity-100 transition-opacity"></div>
                   <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-primary opacity-0 group-hover:opacity-100 transition-opacity"></div>
                   
                  <div className="flex justify-between items-start mb-4 border-b border-border pb-2">
                    <div>
                      <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors flex items-center gap-2">
                        {exp.role}
                      </h3>
                      <div className="flex items-center gap-2 text-secondary font-mono text-sm mt-1">
                        <Database size={14} />
                        <span>@{exp.company}</span>
                      </div>
                    </div>
                    <span className="text-muted-foreground font-mono text-xs bg-background px-2 py-1 rounded border border-border">
                      {exp.duration}
                    </span>
                  </div>

                  <ul className="space-y-3">
                    {exp.details.map((detail, i) => (
                      <li key={i} className="text-muted-foreground text-sm flex items-start gap-3 font-mono">
                        <span className="text-primary mt-1 opacity-60">console.log</span>
                        <span className="text-muted-foreground/70">('</span>
                        <span className="flex-1">{detail}</span>
                        <span className="text-muted-foreground/70">');</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              {/* Empty Space for Grid alignment */}
              <div className="md:w-1/2"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};