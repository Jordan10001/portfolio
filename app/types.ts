export interface Project {
  id: string;
  name: string;
  description: string;
  image: string; // fallback SVG or standard illustration
  badges: string[]; // icon names from lucide-react or technologies like Vue, React, Postgre, Py, etc.
  githubUrl?: string;
  demoUrl?: string;
}

export interface Skill {
  name: string;
  category: "Languages" | "Frameworks" | "Databases" | "Tools";
  iconName: string; // Lucide icon or custom SVG representation
  color?: string; // Optional pastel background hex/class
}

export interface Certificate {
  id: string;
  name: string;
  issuer: string;
  date: string;
  image: string;
  link?: string;
}

export interface GithubContributionDay {
  date: string;
  count: number;
  level: number;
}

export interface GithubContributionsData {
  total: {
    [year: string]: number;
  };
  contributions: GithubContributionDay[];
}
