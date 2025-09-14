// Centralized data & configuration for portfolio sections
// All sections (Hero, Skills, Projects, Contact, Navbar) consume these exports so UI stays data-driven.

import { progress } from 'framer-motion';

export const navLinks = [
  { name: 'Home', href: '#hero', id: 'hero' },
  { name: 'Skills', href: '#skills', id: 'skills' },
  { name: 'Projects', href: '#projects', id: 'projects' },
  { name: 'Contact', href: '#contact', id: 'contact' },
];

export const socialLinks = [
  {
    id: 'linkedin',
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/zakaria-said-a948362a7',
    color: 'hover:text-sky-400',
  },
  {
    id: 'github',
    label: 'GitHub',
    href: 'https://github.com/Zakariast578',
    color: 'hover:text-gray-200',
  },
  {
    id: 'twitter',
    label: 'X / Twitter',
    href: 'https://x.com/zak1said',
    color: 'hover:text-blue-300',
  },
];

export const heroContent = {
  badge: "Full-Stack • Data • AI",
  roles: [
    "Data Scientist ",
    2200,
    "AI & ML Enthusiast",
    2000,
    "MERN Developer",
    2400,
  ],
  intro:
    "I craft intelligent, scalable applications that merge data science, modern web engineering, and AI-driven experiences to deliver measurable impact.",
  ctas: [
    { label: "View My Work", href: "#projects", primary: true },
    { label: "Contact Me", href: "#contact", primary: false },
  ],
  name: "Zakaria Said",
};

export const skillsData = [
  {
    category: 'Frontend',
    skills: [
      { name: 'React', level: 'Advanced' , progress: 95},
      { name: 'Next.js', level: 'Advanced' , progress: 90},
      { name: 'JavaScript', level: 'Advanced' , progress: 85},
      { name: 'TypeScript', level: 'Intermediate' , progress: 80},
      { name: 'Tailwind CSS', level: 'Advanced' , progress: 90},
      { name: 'HTML5', level: 'Advanced' , progress: 95},
      { name: 'CSS3', level: 'Advanced' , progress: 90},
    ],
  },
  {
    category: 'Backend',
    skills: [
      { name: 'Node.js', level: 'Advanced' , progress: 90},
      { name: 'Express', level: 'Intermediate' , progress: 85},
      { name: 'Python', level: 'Advanced' , progress: 95},
      { name: 'Django', level: 'Advanced' , progress: 90},
      { name: 'MongoDB', level: 'Intermediate' , progress: 86},
      { name: 'PostgreSQL', level: 'Intermediate' , progress: 80},
    ],
  },
  {
    category: 'UI/UX & Design',
    skills: [
      { name: 'Framer Motion', level: 'Intermediate' , progress: 80},
      { name: 'shadcn/ui', level: 'Advanced' , progress: 90},
      { name: 'Figma', level: 'Intermediate' , progress: 85},
      { name: 'Accessibility', level: 'Intermediate' , progress: 80},
    ],
  },
  {
    category: 'Tools & DevOps',
    skills: [
      { name: 'Git & GitHub', level: 'Advanced' , progress: 90},
      { name: 'Vercel', level: 'Intermediate' , progress: 80},
      { name: 'CI/CD', level: 'Intermediate' , progress: 75},
    ],
  },
];

export const projectsData = [
  {
    title: '4Smart',
    description:
      'A comprehensive school management system streamlining administration, communication, and learning outcomes.',
    tags: ['React', 'Node.js', 'Express', 'Mongoose', 'TailwindCSS'],
    imageKey: 'project',
    liveLink: 'https://zakariast578.github.io/4-smart/',
    githubLink: 'https://github.com/Zakariast578/4-smart',
    status: 'Complete',
  },
  {
    title: 'Portfolio Website V2',
    description:
      'My personal portfolio focusing on refined UI, motion design, accessibility, and performance.',
    tags: ['React', 'TailwindCSS', 'Framer Motion', 'shadcn/ui'],
    imageKey: 'project3',
    liveLink: 'https://zakariasaid.dev',
    githubLink: 'https://github.com/Zakariast578/portfolio',
    status: 'Complete',
  },
  {
    title: 'Somali TalentLink',
    description:
      'A platform connecting Somali youth with jobs & gigs to foster economic growth and skill development.',
    tags: ['React', 'Django', 'PostgreSQL', 'TailwindCSS', 'UI/UX'],
    imageKey: 'project2',
    liveLink: 'https://somalitalentlink.com',
    githubLink: 'https://github.com/zakaria-abdiaziz/talentlink-frontend',
    status: 'In Progress',
  },
  {
    title: 'E-commerce Platform',
    description:
      'A modern e-commerce solution (architecture & core modules in progress) focused on performance & DX.',
    tags: ['Next.js', 'TypeScript', 'GraphQL', 'Stripe'],
    imageKey: 'project1',
    liveLink: null,
    githubLink: 'https://github.com/zakaria-abdiaziz/',
    status: 'In Progress',
  },
];

export const contactInfo = {
  email: 'info@zakariasaid.dev',
  location: 'Available Worldwide',
  responseTime: 'Within 24/7 hours',
  availabilityTag: 'Open to opportunities',
};

// Lightweight map for project image imports (used in Projects component to stay data-driven)
export const projectImageMap = {
  project: () => import('@/assets/project.png'),
  project1: () => import('@/assets/project1.jpg'),
  project2: () => import('@/assets/project2.png'),
  project3: () => import('@/assets/project3.png'),
};
