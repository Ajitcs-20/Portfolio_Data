import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download, Database, Server, Cpu, FileJson, Activity } from 'lucide-react';
import { PortfolioData } from '../types';

interface HeroProps {
  data: PortfolioData;
  onInitializeChat?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ data, onInitializeChat }) => {
  const [displayText, setDisplayText] = useState('');
  const fullText = `> ${data.title}`;

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) clearInterval(interval);
    }, 100);
    return () => clearInterval(interval);
  }, [fullText]);

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      {/* Background Tech Elements: Binary Stream */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 opacity-10">
         {Array.from({ length: 20 }).map((_, i) => (
           <div 
             key={i}
             className="absolute font-mono text-primary text-xs"
             style={{
               left: `${Math.random() * 100}%`,
               top: `-20px`,
               animation: `dataFlow ${2 + Math.random() * 5}s linear infinite`,
               animationDelay: `${Math.random() * 5}s`,
               opacity: Math.random()
             }}
           >
             {Math.random() > 0.5 ? '10110' : '01001'}
           </div>
         ))}
      </div>

      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="z-10"
        >
          <div className="inline-flex items-center gap-3 px-4 py-2 mb-6 border border-primary/30 rounded-sm bg-dark-lighter/50 backdrop-blur-sm">
            <Activity size={16} className="text-green-500 animate-pulse" />
            <span className="text-primary font-mono text-xs tracking-widest uppercase">System Status: Online</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-4 leading-tight cursor-pointer transition-all duration-300 hover:drop-shadow-[0_0_20px_rgba(14,165,233,0.8)]">
            <span className="text-white hover:text-cyan-300 transition-colors">HELLO_WORLD</span><br/>
            <span className="text-slate-400 text-3xl md:text-5xl hover:text-cyan-400 transition-colors">I am {data.name}</span>
          </h1>
          
          <h2 className="text-xl md:text-2xl text-primary mb-6 font-mono h-8 cursor-pointer transition-all duration-300 hover:drop-shadow-[0_0_15px_rgba(6,182,212,0.8)]">
            {displayText}<span className="animate-pulse">_</span>
          </h2>
          
          <p className="text-slate-400 text-lg mb-8 max-w-lg leading-relaxed font-mono text-sm border-l-2 border-primary/50 pl-4 py-2 bg-gradient-to-r from-primary/5 to-transparent cursor-pointer transition-all duration-300 hover:text-slate-200 hover:drop-shadow-[0_0_12px_rgba(6,182,212,0.6)] hover:border-primary hover:bg-gradient-to-r hover:from-primary/15 hover:to-transparent">
            {data.bio}
          </p>
          
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={onInitializeChat}
              className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-sm font-semibold transition-all flex items-center gap-2 shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px] hover:drop-shadow-[0_0_15px_rgba(14,165,233,0.8)]"
            >
              Initialize Chat
              <ArrowRight size={18} />
            </button>
            <button className="border border-slate-600 hover:border-primary text-slate-300 hover:text-white px-8 py-3 rounded-sm font-semibold transition-all flex items-center gap-2 font-mono hover:bg-primary/10 hover:drop-shadow-[0_0_12px_rgba(14,165,233,0.6)]">
              <Download size={18} />
              get_resume.pdf
            </button>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative hidden lg:block"
        >
          <div className="relative w-full aspect-square max-w-md mx-auto">
            {/* Holographic rings */}
            <div className="absolute inset-0 border border-primary/30 rounded-full scale-100 animate-[spin_20s_linear_infinite]"></div>
            <div className="absolute inset-0 border border-dashed border-secondary/30 rounded-full scale-110 animate-[spin_15s_linear_infinite_reverse]"></div>
            <div className="absolute inset-0 border border-dotted border-accent/30 rounded-full scale-125 animate-[spin_30s_linear_infinite]"></div>
            
            <div className="relative w-full h-full glass-card rounded-full flex items-center justify-center overflow-hidden border-2 border-primary/50 p-2 shadow-[0_0_30px_rgba(14,165,233,0.3)]">
              <img 
                src={data.avatarUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${data.name}&backgroundColor=1e293b`}
                alt={data.name}
                className="w-full h-full object-cover rounded-full"
              />
              
              {/* Floating Data Nodes */}
              <motion.div 
                className="absolute top-10 right-0 bg-dark border border-primary text-primary p-2 rounded-md font-mono text-xs shadow-lg"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <Database size={16} className="inline mr-1" />
                SQL_DB
              </motion.div>
              
              <motion.div 
                className="absolute bottom-10 left-0 bg-dark border border-secondary text-secondary p-2 rounded-md font-mono text-xs shadow-lg"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity }}
              >
                <Cpu size={16} className="inline mr-1" />
                ETL_PROC
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};