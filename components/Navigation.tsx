import React, { useState, useEffect } from 'react';
import { Menu, X, Github, Linkedin, Mail } from 'lucide-react';
import { SectionType } from '../types';

interface NavigationProps {
  activeSection: SectionType;
  scrollToSection: (section: SectionType) => void;
  socials: { platform: string; url: string }[];
}

export const Navigation: React.FC<NavigationProps> = ({ activeSection, scrollToSection, socials }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: SectionType.HOME, label: 'Home' },
    { id: SectionType.ABOUT, label: 'About' },
    { id: SectionType.EXPERIENCE, label: 'Experience' },
    { id: SectionType.PROJECTS, label: 'Projects' },
    { id: SectionType.CONTACT, label: 'Contact' },
  ];

  const getIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'github': return <Github size={20} />;
      case 'linkedin': return <Linkedin size={20} />;
      default: return <Mail size={20} />;
    }
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-dark/80 backdrop-blur-lg border-b border-white/5 py-4' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="text-2xl font-bold tracking-tighter cursor-pointer" onClick={() => scrollToSection(SectionType.HOME)}>
          <span className="text-white">Ajit</span>
          <span className="text-primary">.dev</span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className={`text-sm font-medium transition-colors hover:text-primary ${activeSection === link.id ? 'text-primary' : 'text-slate-300'}`}
            >
              {link.label}
            </button>
          ))}
        </div>

        <div className="hidden md:flex items-center space-x-4">
          {socials.slice(0, 3).map((social, idx) => (
            <a 
              key={idx}
              href={social.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-white transition-colors"
            >
              {getIcon(social.platform)}
            </a>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-dark/95 backdrop-blur-xl border-b border-white/10 p-6 flex flex-col space-y-4 shadow-2xl">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => {
                scrollToSection(link.id);
                setIsMobileMenuOpen(false);
              }}
              className={`text-lg font-medium py-2 ${activeSection === link.id ? 'text-primary' : 'text-slate-300'}`}
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};