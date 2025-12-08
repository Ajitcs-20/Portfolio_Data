export interface Project {
  title: string;
  description: string;
  technologies: string[];
  link?: string;
}

export interface Experience {
  role: string;
  company: string;
  duration: string;
  details: string[];
}

export interface SocialLink {
  platform: string;
  url: string;
}

export interface PortfolioData {
  name: string;
  title: string;
  bio: string;
  email: string;
  location: string;
  avatarUrl?: string;
  skills: string[];
  experience: Experience[];
  projects: Project[];
  socials: SocialLink[];
}

export enum SectionType {
  HOME = 'home',
  ABOUT = 'about',
  SKILLS = 'skills',
  EXPERIENCE = 'experience',
  PROJECTS = 'projects',
  CONTACT = 'contact'
}