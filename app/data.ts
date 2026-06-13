import { Project, Skill, Certificate } from "./types";

export const PORTFOLIO_OWNER = {
  name: "Aaron Jordan",
  title: "Neobrutalist Developer",
  shortDesc: "Building raw, Experiment, Prototype , and high-impact web experiences. Interested in LLM.",
  intro: "I am a Data Science and Analytics student at Petra Christian University ",
  location: "Southeast Asia ",
  email: "c14240117@john.petra.ac.id",
  whatsapp: "+62 000-0000-0000",
  instagram: "@__aaronjordan",
  githubUsername: "jordan10001",
  linkedin: "----",
  discord: "58358832",
  coreStack: ["TypeScript", "Java", "React", "Node.js", "PostgreSQL", "Python"],
  loopingText: "✦ Data Analyst ✦ Data Enginer ✦ UI/UX Design ✦ Frontend Dev ✦ Vibe coder ✦ LLM Enthusiast ✦",
  devStatusShell: {
    teaeLevel: "100%",
    layoutEngine: "Neobrutalism",
    speed: "Blazing Fast 🚀",
  },
  aboutTitle: "hi,i'm aaron",
  aboutIntro: "I am a Data Science and Analytics student at Petra Christian University with a strong interest in data, AI, and large language models (LLMs). I enjoy exploring how technology and data can create meaningful solutions.",
  aboutDesc: "Currently, I am learning machine learning, data analysis, and how (LLMs) Work."
  
};

export const PROJECTS_DATA: Project[] = [
  {
    id: "project1",
    name: "my-ip",
    description: "Advanced Geolocation IP lookup and network diagnostic dashboard.",
    image: "projects/my-ip.png", 
    badges: ["Next.js", "API", "TS"],
    githubUrl: "https://github.com/jordan10001/my-ip",
    demoUrl: "https://my-ip.jordan10001.workers.dev/"
  },
  {
    id: "project2",
    name: "p2p-transfer",
    description: "LAN-based file transfer application.",
    image: "projects/p2p-transfer.png", 
    badges: ["Go", "Lan", "Fiber"],
    githubUrl: "https://github.com/Jordan10001/p2p-tf",
    demoUrl: ""
  },
  {
    id: "project3",
    name: "coming soon",
    description: "coming soon",
    image: "projects/coming-soon.png", 
    badges: ["Database", "Cpu", "FileText", "Share2"],
    githubUrl: "https://github.com/jordan10001",
    demoUrl: ""
  },
  {
    id: "project4",
    name: "coming soon",
    description: "coming soon",
    image: "projects/coming-soon.png", 
    badges: ["Database", "Cpu", "FileText", "Share2"],
    githubUrl: "https://github.com/jordan10001",
    demoUrl: ""
  }
];

export const SKILLS_DATA: Skill[] = [
  { name: "Vue.js", category: "Frameworks", iconName: "Code2" },
  { name: "JavaScript / TS", category: "Languages", iconName: "CornerDownRight" },
  { name: "Python", category: "Languages", iconName: "Binary" },
  { name: "PostgreSQL", category: "Databases", iconName: "Database" },
  { name: "React & Vite", category: "Frameworks", iconName: "Layers" },
  { name: "Tailwind CSS", category: "Tools", iconName: "Sparkles" },
  { name: "Node.js & Express", category: "Frameworks", iconName: "Server" },
  { name: "Git & Deployment", category: "Tools", iconName: "GitBranch" }
];

export const CERTIFICATES_DATA: Certificate[] = [
  {
    id: "cert1",
    name: "coming-soon",
    issuer: "coming-soon",
    date: "Aug 2024",
    image: "certificates/coming-soon.png",
    link: ""
  },
  {
    id: "cert2",
    name: "coming-soon",
    issuer: "coming-soon",
    date: "Dec 2024",
    image: "certificates/coming-soon.png",
    link: ""
  },
  {
    id: "cert3",
    name: "coming-soon",
    issuer: "coming-soon",
    date: "Apt 2025",
    image: "certificates/coming-soon.png",
    link: ""
  }
];

export const PLAYLIST_DATA = [
  {
    name: "Slab_Geometry",
    url: "/audio/slab_geometry.mp3"
  },
  {
    name: "load Bearing",
    url: "/audio/load_bearing.mp3"
  },
  {
    name: "Monolith Glass",
    url: "/audio/monolith_glass.mp3"
  }
];
