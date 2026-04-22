export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  github?: string;
  demo?: string;
  featured: boolean;
  category: "ML" | "Data Engineering" | "MLOps" | "NLP" | "Computer Vision";
  metrics?: string;
  metricsLabel?: string;
}

export interface SkillGroup {
  name: string;
  skills: Skill[];
}

export interface Skill {
  name: string;
  icon: string;
  proficiency: 1 | 2 | 3;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  issuerLogo: string;
  date: string;
  credentialUrl: string;
  accentColor: string;
  description: string;
}

export interface NavItem {
  label: string;
  href: string;
}
