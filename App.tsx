import React, { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { Experience } from './components/Experience';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';
import { Terminal } from './components/Terminal';
import { WaterAnimation } from './components/WaterAnimation';
import { FloatingParticles } from './components/FloatingParticles';
import { PortfolioData, SectionType } from './types';
import { DEFAULT_PORTFOLIO } from './constants';
import { generatePortfolioContent } from './services/geminiService';
import { Loader2, Wand2 } from 'lucide-react';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<SectionType>(SectionType.HOME);
  const [data, setData] = useState<PortfolioData>(DEFAULT_PORTFOLIO);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const LINKEDIN_URL = "https://www.linkedin.com/in/ajit-sharma-ajitcse20/";

  // Smooth scroll handler
  const scrollToSection = (section: SectionType) => {
    setActiveSection(section);
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Intersection Observer to update active section on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id as SectionType);
          }
        });
      },
      { threshold: 0.3 }
    );

    Object.values(SectionType).forEach((section) => {
      const element = document.getElementById(section);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const handleRegenerate = async () => {
    // Check if API key is available in env before attempting
    if (!process.env.API_KEY) {
      alert("Please configure process.env.API_KEY to use the AI generation feature. Using default high-quality data.");
      return;
    }

    setIsGenerating(true);
    setError(null);
    try {
      const generatedData = await generatePortfolioContent(LINKEDIN_URL);
      setData(generatedData);
    } catch (err) {
      console.error("Failed to generate portfolio:", err);
      setError("Could not generate new data. Please try again later.");
    } finally {
      setIsGenerating(false);
    }
  };

  if (isLoading) {
    return (
      <div className="h-screen w-full bg-dark flex flex-col items-center justify-center text-white">
        <Loader2 className="animate-spin text-primary mb-4" size={48} />
        <p className="animate-pulse code-font">Initializing Data Pipeline...</p>
      </div>
    );
  }

  return (
    <div className="bg-dark min-h-screen text-slate-200 selection:bg-primary/30 selection:text-white relative overflow-hidden">
      {/* Animated Background Effects */}
      <FloatingParticles count={60} />
      <WaterAnimation />
      
      {/* Background Grid */}
      <div className="fixed inset-0 bg-grid-pattern opacity-40 pointer-events-none z-10"></div>

      <div className="relative z-20">
        <Navigation 
          activeSection={activeSection} 
          scrollToSection={scrollToSection}
          socials={data.socials}
        />
        
        <Terminal />

        {/* AI Trigger Button (Bottom Right) */}
        {process.env.API_KEY && (
          <button 
            onClick={handleRegenerate}
            disabled={isGenerating}
            className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-primary to-secondary p-4 rounded-full shadow-lg shadow-cyan-500/30 hover:scale-110 transition-transform disabled:opacity-50 disabled:cursor-not-allowed group border border-white/10"
            title="Regenerate with Gemini AI"
          >
            {isGenerating ? (
              <Loader2 className="animate-spin text-white" size={24} />
            ) : (
              <Wand2 className="text-white group-hover:rotate-12 transition-transform" size={24} />
            )}
          </button>
        )}

        <main>
          <section id={SectionType.HOME}>
            <Hero data={data} />
          </section>

          <section id={SectionType.ABOUT} className="py-20 bg-dark-lighter/50 relative border-y border-white/5">
            <div className="container mx-auto px-6 text-center max-w-3xl">
              <div className="inline-block p-2 rounded-lg bg-primary/10 mb-6 border border-primary/20">
                 <span className="code-font text-primary text-sm font-bold">SELECT * FROM developers WHERE name = 'Ajit'</span>
              </div>
              <h2 className="text-3xl font-bold mb-8">About <span className="text-gradient">Me</span></h2>
              <p className="text-lg text-slate-400 leading-loose code-font font-light">{data.bio}</p>
            </div>
          </section>

          <section id={SectionType.SKILLS}>
             <Skills skills={data.skills} />
          </section>

          <section id={SectionType.EXPERIENCE}>
            <Experience experience={data.experience} />
          </section>

          <section id={SectionType.PROJECTS} className="bg-dark-lighter/30 border-t border-white/5">
            <Projects projects={data.projects} />
          </section>

          <section id={SectionType.CONTACT} className="py-32 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent pointer-events-none"></div>
            <div className="container mx-auto px-6 text-center relative z-10">
              <h2 className="text-4xl md:text-6xl font-bold mb-8">Ready to <span className="text-gradient">Connect?</span></h2>
              <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto code-font">
                // Initialize connection handshake
              </p>
              <a 
                href={`mailto:${data.email}`}
                className="inline-block bg-white text-dark px-10 py-4 rounded-sm font-bold text-lg hover:bg-primary hover:text-white transition-all shadow-[4px_4px_0px_0px_rgba(14,165,233,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]"
              >
                EXECUTE_MAILTO()
              </a>
              
              <footer className="mt-20 text-slate-600 code-font text-xs uppercase tracking-widest">
                <p>/* System Status: Operational | © {new Date().getFullYear()} {data.name} */</p>
              </footer>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default App;