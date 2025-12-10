import React, { useState, useEffect } from 'react';
import { Menu, X, Github, Linkedin, Mail } from 'lucide-react';
import { SectionType } from '../types';
import { ThemeToggle } from './ThemeToggle';

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
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-background/80 backdrop-blur-lg border-b border-border py-4' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="text-2xl font-bold tracking-tighter cursor-pointer" onClick={() => scrollToSection(SectionType.HOME)}>
          <span className="text-foreground">Ajit</span>
          <span className="text-primary">.dev</span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className={`text-sm font-medium transition-colors hover:text-primary ${activeSection === link.id ? 'text-primary' : 'text-foreground/80'}`}
            >
              {link.label}
            </button>
          ))}
        </div>

        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center space-x-4">
            {socials.slice(0, 3).map((social, idx) => (
              <a
                key={idx}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {getIcon(social.platform)}
              </a>
            ))}
          </div>

          <ThemeToggle />

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-background/95 backdrop-blur-xl border-b border-border p-6 flex flex-col space-y-4 shadow-2xl">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => {
                scrollToSection(link.id);
                setIsMobileMenuOpen(false);
              }}
              className={`text-lg font-medium py-2 ${activeSection === link.id ? 'text-primary' : 'text-muted-foreground'}`}
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};