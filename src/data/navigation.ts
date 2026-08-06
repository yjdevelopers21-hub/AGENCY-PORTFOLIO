import { NavItem } from '@/types';

export const navItems: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Work', href: '/work' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export const footerServices: NavItem[] = [
  { label: 'Website Design', href: '/services#website-design' },
  { label: 'Web Development', href: '/services#web-development' },
  { label: 'eCommerce Solutions', href: '/services#ecommerce-solutions' },
  { label: 'Web Applications', href: '/services#web-applications' },
  { label: 'Maintenance & Support', href: '/services#maintenance-support' },
];

export const footerCompany: NavItem[] = [
  { label: 'About Us', href: '/about' },
  { label: 'Our Process', href: '/about#process' },
  { label: 'Selected Work', href: '/work' },
];

export const footerQuickLinks: NavItem[] = [
  { label: 'Contact Us', href: '/contact' },
  { label: 'Privacy Policy', href: '#' },
  { label: 'Terms & Conditions', href: '#' },
];
