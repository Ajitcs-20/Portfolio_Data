import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, Cpu, Layers } from 'lucide-react';

interface SkillsProps {
  skills: string[];
}

export const Skills: React.FC<SkillsProps> = ({ skills }) => {
  return (
    <div className="container mx-auto px-6 py-20 bg-bg-secondary/20 border-y border-border">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-12">
        
        {/* Left Side: Title & Info */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="md:w-1/3"
        >
          <div className="flex items-center gap-2 mb-4 text-primary">
            <Cpu size={24} />
            <span className="font-mono text-sm tracking-widest">SYSTEM_CAPABILITIES</span>
          </div>
          <h2 className="text-4xl font-bold mb-6">Tech <span className="text-gradient">Stack</span></h2>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            My engineering toolkit is optimized for scalable data processing, cloud architecture, and modern frontend development.
          </p>
          
          <div className="bg-terminal p-4 rounded border border-border font-mono text-xs text-muted-foreground">
            <div className="flex justify-between border-b border-border pb-2 mb-2">
              <span>CPU_USAGE</span>
              <span className="text-green-500">34%</span>
            </div>
            <div className="flex justify-between">
              <span>MEMORY</span>
              <span className="text-green-500">1.2GB / 16GB</span>
            </div>
          </div>
        </motion.div>

        {/* Right Side: JSON/Grid View */}
        <motion.div 
           className="md:w-2/3 bg-background border border-border rounded-lg p-6 font-mono text-sm shadow-2xl relative overflow-hidden"
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
        >
          {/* Header */}
          <div className="absolute top-0 left-0 w-full h-8 bg-terminal border-b border-border flex items-center px-4 gap-2">
            <div className="w-2 h-2 rounded-full bg-red-500"></div>
            <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <span className="ml-2 text-xs text-muted-foreground">config.json</span>
          </div>

          <div className="mt-6 text-foreground/80">
            <div><span className="text-purple-400">export const</span> <span className="text-yellow-300">stack</span> = <span className="text-blue-400">{'{'}</span></div>
            
            <div className="pl-4 py-2 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
              {skills.map((skill, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.03 }}
                  className="hover:bg-terminal cursor-crosshair rounded px-2 -mx-2 flex items-center group"
                >
                  <span className="text-muted-foreground/50 mr-2 opacity-50 select-none">{String(index).padStart(2, '0')}</span>
                  <span className="text-secondary">"{skill}"</span>: <span className="text-green-400 group-hover:animate-pulse">true</span>,
                </motion.div>
              ))}
            </div>

            <div><span className="text-blue-400">{'}'}</span>;</div>
          </div>
          
          {/* Decorative blinking cursor at end */}
          <div className="mt-2 w-2 h-4 bg-muted-foreground animate-pulse inline-block"></div>
        </motion.div>

      </div>
    </div>
  );
};