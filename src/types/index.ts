export interface NavItem {
  label: string;
  href: string;
}

export interface ServiceItem {
  id: string;
  iconName: string;
  title: string;
  description: string;
  href: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  accentColor?: string;
  href: string;
  tags?: string[];
}

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
}

export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar?: string;
}

export interface WhyUsItem {
  id: string;
  title: string;
  description?: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface CompanyConfig {
  name: string;
  tagline: string;
  subtagline: string;
  email: string;
  phone: string;
  copyrightYear: number;
  socials: SocialLink[];
}
