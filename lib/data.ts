/* ── Portfolio data — Single source of truth for all content ── */

export const personalInfo = {
  name: "Chandan R.S.",
  role: "Full Stack Developer",
  tagline: "I build AI-powered digital experiences",
  bio: "Computer Science graduate from Bangalore Institute of Technology with a passion for shipping AI-powered full-stack products. MERN stack developer experienced with Python, Docker, CI/CD, Gemini API, TensorFlow, and cloud deployment across fintech, productivity, and eldercare domains.",
  email: "crs142005@gmail.com",
  phone: "+91-6364692501",
  location: "Bengaluru, Karnataka",
  github: "https://github.com/Chandan-14r",
  linkedin: "https://www.linkedin.com/in/chandanrs142005",
  resume: "https://drive.google.com/file/d/1C0AXZjoedxjKL8jWuqTtMwphozU3iiW0/view?usp=sharing",
  photo: "/chandan-photo.jpg",
};

export const stats = [
  { label: "CGPA", value: 8.9, suffix: "/10", decimals: 1 },
  { label: "LeetCode", value: 200, suffix: "+", decimals: 0 },
  { label: "News/day", value: 10, suffix: "k+", decimals: 0 },
  { label: "Users", value: 500, suffix: "+", decimals: 0 },
];

export interface Project {
  id: string;
  title: string;
  type: string;
  description: string;
  tags: string[];
  categories: string[];
  image: string;
  color: string;
}

export const projects: Project[] = [
  {
    id: "inheritance-os",
    title: "Inheritance OS",
    type: "Fidelity Hackathon",
    description:
      "AI-powered estate planning platform built as a 48-hour MVP with React, Node, MongoDB, Python, Gemini API, Docker, GCP, and GitHub Actions. Reduced estate planning workflow time by 60%.",
    tags: ["React", "Node.js", "MongoDB", "Gemini API", "Docker", "GCP"],
    categories: ["fullstack", "ai", "cloud"],
    image: "/projects/inheritance-os.jpg",
    color: "#00f0ff",
  },
  {
    id: "investisync",
    title: "InvestiSync",
    type: "Personal Project",
    description:
      "AI-driven financial portfolio tracker processing 10,000+ news articles daily with Gemini sentiment analysis. Improved MongoDB query response time by 25% using compound indexing.",
    tags: ["MERN", "Gemini API", "MongoDB Indexing", "Cloud Run", "Finance"],
    categories: ["fullstack", "ai", "cloud"],
    image: "/projects/investisync.jpg",
    color: "#8b5cf6",
  },
  {
    id: "nova-agent",
    title: "Nova Productivity Agent",
    type: "Open-Source Project",
    description:
      "Microservices productivity agent integrating Gmail, Zoom, and Telegram APIs with Python NLP pipelines. Reduced meeting documentation from 20 minutes to under 3 minutes.",
    tags: ["Python", "Gmail API", "Zoom API", "Telegram Bot", "Microservices"],
    categories: ["ai", "fullstack"],
    image: "/projects/nova-agent.jpg",
    color: "#f59e0b",
  },
  {
    id: "carecompanion",
    title: "CareCompanion Guardian",
    type: "Academic Capstone",
    description:
      "Elderly AI care assistant with NLP-based conversation routing, TensorFlow fall detection (94% accuracy), REST APIs, React Native UI, Twilio SMS alerts, and Docker containerization.",
    tags: ["Python", "TensorFlow", "REST APIs", "React Native", "Twilio"],
    categories: ["ai", "fullstack"],
    image: "/projects/carecompanion.jpg",
    color: "#10b981",
  },
];

export const skillCategories = [
  {
    title: "Languages",
    color: "#00f0ff",
    items: ["Python", "JavaScript", "Java", "SQL"],
  },
  {
    title: "Full Stack",
    color: "#8b5cf6",
    items: ["React.js", "Node.js", "Express.js", "MongoDB"],
  },
  {
    title: "AI & ML",
    color: "#f59e0b",
    items: ["Gemini API", "TensorFlow", "NLP", "LangChain"],
  },
  {
    title: "Cloud & DevOps",
    color: "#10b981",
    items: ["Docker", "GitHub Actions", "GCP Cloud Run", "Vercel"],
  },
];

export const experience = [
  {
    title: "AI / Full-Stack Developer Intern",
    company: "Fidelity Investments — Hackathon Project",
    description:
      "Built Inheritance OS in a 48-hour sprint, integrated Gemini API document parsing, automated CI/CD with GitHub Actions, and deployed Docker services to GCP Cloud Run.",
    tags: ["React", "Gemini API", "Docker", "GCP", "CI/CD"],
  },
  {
    title: "Open-Source Software Engineer",
    company: "Nova Productivity Agent",
    description:
      "Designed a modular microservices architecture with Gmail, Zoom, and Telegram integrations, cutting meeting documentation time from 20 minutes to under 3 minutes. Attracted 3 external contributors.",
    tags: ["Python", "APIs", "Microservices", "NLP"],
  },
  {
    title: "B.E. Computer Science and Engineering",
    company: "Bangalore Institute of Technology",
    description:
      "CGPA 8.9/10, top 2% of cohort. Coursework: DSA, Machine Learning, Cloud Computing, DBMS, NLP, and Operating Systems. AWS Community Builder.",
    tags: ["DSA", "ML", "Cloud", "NLP", "DBMS"],
  },
];

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];
