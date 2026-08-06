import { ProjectItem } from '@/types';

export const projectsData: ProjectItem[] = [
  {
    id: 'furniqa',
    title: 'Furniqa — Furniture Store',
    category: 'E-COMMERCE',
    description: 'A modern eCommerce platform with a seamless shopping experience.',
    image: '/images/projects/furniqa.jpg',
    accentColor: '#D97706',
    href: '#',
    tags: ['Next.js', 'Tailwind', 'Stripe', 'Framer Motion'],
  },
  {
    id: 'solidestate',
    title: 'Solidestate — Real Estate',
    category: 'REAL ESTATE',
    description: 'A high-performance website for a premium real estate brand.',
    image: '/images/projects/solidestate.jpg',
    accentColor: '#2563EB',
    href: '#',
    tags: ['React', 'TypeScript', 'Mapbox', 'Tailwind'],
  },
  {
    id: 'skilly',
    title: 'Skilly — Online Courses',
    category: 'EDUCATION',
    description: 'An engaging platform for online learning and skill development.',
    image: '/images/projects/skilly.jpg',
    accentColor: '#7C3AED',
    href: '#',
    tags: ['Next.js', 'Video Streaming', 'Tailwind', 'PostgreSQL'],
  },
];
