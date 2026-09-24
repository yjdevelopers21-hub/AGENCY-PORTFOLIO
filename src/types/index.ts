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

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface ProjectItem {
  id: string;
  _id?: string;
  slug?: string;
  title: string;
  category: string;
  description: string;
  longDescription?: string;
  image: string;
  accentColor?: string;
  href?: string;
  liveUrl?: string;
  githubUrl?: string;
  client?: string;
  timeline?: string;
  services?: string[];
  tags?: string[];
  challenge?: string;
  solution?: string;
  metrics?: ProjectMetric[];
  featured?: boolean;
  order?: number;
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
