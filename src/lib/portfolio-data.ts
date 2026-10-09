export const personalInfo = {
  name: "Chandan R.S.",
  role: "Full Stack Developer",
  tagline: "I build AI-powered digital experiences",
  bioShort: "Building digital products with real impact.",
  bioMedium: "Computer Science graduate from Bangalore Institute of Technology building AI-powered full-stack products that ship directly to production.",
  bioLong: "MERN stack developer deeply experienced with Python, Docker pipelines, CI/CD workflows, Gemini API, TensorFlow architectures, and highly resilient cloud deployments. I thrive at the intersection of complex backend algorithms and premium visual interfaces. With engineering experience spanning fintech modules, productivity platforms, and automated predictive healthcare systems, I prioritize robust delivery.",
  email: "crs142005@gmail.com",
  phone: "+91-6364692501",
  location: {
    lat: 12.9716, // // TODO(me): Verify lat
    lng: 77.5946, // // TODO(me): Verify lng
    label: "Bengaluru, Karnataka",
  },
  github: "https://github.com/Chandan-14r",
  linkedin: "https://www.linkedin.com/in/chandanrs142005",
  resume: "https://drive.google.com/file/d/1C0AXZjoedxjKL8jWuqTtMwphozU3iiW0/view?usp=sharing",
  photo: "/chandan-photo.jpg", // TODO(me): Replace with clean transparent portrait cutout for Cyber
  introVideo: null, // TODO(me): Provide /intro.mp4 if available for Series theme
};

export const stats = [
  { label: "CGPA", value: 8.9, suffix: "/10", decimals: 1 },
  { label: "LeetCode", value: 200, suffix: "+", decimals: 0 },
  { label: "News/day", value: 10, suffix: "k+", decimals: 0 },
  { label: "Users", value: 500, suffix: "+", decimals: 0 },
  // TODO(me): Add explicit quantifiable metrics for About count-up stats if needed
];

export interface Project {
  id: string;
  title: string;
  type: string; // e.g. "Fidelity Hackathon"
  overview: string;
  problem: string; // TODO(me): Provide specific 1-line problem
  solution: string; // TODO(me): Provide specific 1-line solution
  result: string; // TODO(me): Provide specific 1-line result
  tags: string[];
  categories: string[];
  image: string; // TODO(me): Ensure 1600x1000 screenshots
  color: string;
  liveUrl?: string; // TODO(me): Provide URL
  repoUrl?: string; // TODO(me): Provide URL
  durationTag: string; // TODO(me): e.g. "6 min read"
}

export const projects: Project[] = [
  {
    id: "inheritance-os",
    title: "Inheritance OS",
    type: "Fidelity Hackathon",
    overview: "AI-powered estate planning platform built as a 48-hour MVP with React, Node, MongoDB, Python, Gemini API, Docker, GCP, and GitHub Actions. Reduced estate planning workflow time by 60%.",
    problem: "Estate planning is slow and fragmented.", // TODO(me): Verify
    solution: "AI-powered centralized document parsing and CI/CD driven platform.", // TODO(me): Verify
    result: "Reduced workflow time by 60%.", // TODO(me): Verify
    tags: ["React", "Node.js", "MongoDB", "Gemini API", "Docker", "GCP"],
    categories: ["fullstack", "ai", "cloud"],
    image: "/projects/inheritance-os.jpg",
    color: "#00f0ff",
    durationTag: "4 min read", // TODO(me): Verify
  },
  {
    id: "investisync",
    title: "InvestiSync",
    type: "Personal Project",
    overview: "AI-driven financial portfolio tracker processing 10,000+ news articles daily with Gemini sentiment analysis. Improved MongoDB query response time by 25% using compound indexing.",
    problem: "Real-time financial tracking lacks robust AI sentiment context.", // TODO(me): Verify
    solution: "10,000+ daily article NLP analysis with optimized compound indexing.", // TODO(me): Verify
    result: "Improved query response time by 25%.", // TODO(me): Verify
    tags: ["MERN", "Gemini API", "MongoDB Indexing", "Cloud Run", "Finance"],
    categories: ["fullstack", "ai", "cloud"],
    image: "/projects/investisync.jpg",
    color: "#8b5cf6",
    durationTag: "6 min read", // TODO(me): Verify
  },
  {
    id: "nova-agent",
    title: "Nova Productivity Agent",
    type: "Open-Source Project",
    overview: "Microservices productivity agent integrating Gmail, Zoom, and Telegram APIs with Python NLP pipelines. Reduced meeting documentation from 20 minutes to under 3 minutes.",
    problem: "Meeting documentation is a manual bottleneck.", // TODO(me): Verify
    solution: "Python NLP microservices integrated across Gmail/Zoom.", // TODO(me): Verify
    result: "Reduced documentation time from 20 min to <3 min.", // TODO(me): Verify
    tags: ["Python", "Gmail API", "Zoom API", "Telegram Bot", "Microservices"],
    categories: ["ai", "fullstack"],
    image: "/projects/nova-agent.jpg",
    color: "#f59e0b",
    durationTag: "5 min read", // TODO(me): Verify
  },
  {
    id: "carecompanion",
    title: "CareCompanion Guardian",
    type: "Academic Capstone",
    overview: "Elderly AI care assistant with NLP-based conversation routing, TensorFlow fall detection (94% accuracy), REST APIs, React Native UI, Twilio SMS alerts, and Docker containerization.",
    problem: "Elderly monitoring systems lack localized AI and privacy.", // TODO(me): Verify
    solution: "TensorFlow edge-detection model paired with secure REST APIs.", // TODO(me): Verify
    result: "Achieved 94% accuracy in fall detection.", // TODO(me): Verify
    tags: ["Python", "TensorFlow", "REST APIs", "React Native", "Twilio"],
    categories: ["ai", "fullstack"],
    image: "/projects/carecompanion.jpg",
    color: "#10b981",
    durationTag: "7 min read", // TODO(me): Verify
  },
];

export const skillCategories = [
  {
    title: "Languages",
    color: "#00f0ff",
    items: [
      { name: "Python", level: "Daily driver" },
      { name: "JavaScript", level: "Daily driver" },
      { name: "Java", level: "Comfortable" },
      { name: "SQL", level: "Comfortable" },
    ], // TODO(me): Verify levels
  },
  {
    title: "Full Stack",
    color: "#8b5cf6",
    items: [
      { name: "React.js", level: "Daily driver" },
      { name: "Node.js", level: "Comfortable" },
      { name: "Express.js", level: "Comfortable" },
      { name: "MongoDB", level: "Comfortable" },
    ],
  },
  {
    title: "AI & ML",
    color: "#f59e0b",
    items: [
      { name: "Gemini API", level: "Daily driver" },
      { name: "TensorFlow", level: "Learning" },
      { name: "NLP", level: "Comfortable" },
      { name: "LangChain", level: "Learning" },
    ],
  },
  {
    title: "Cloud & DevOps",
    color: "#10b981",
    items: [
      { name: "Docker", level: "Comfortable" },
      { name: "GitHub Actions", level: "Comfortable" },
      { name: "GCP Cloud Run", level: "Learning" },
      { name: "Vercel", level: "Daily driver" },
    ],
  },
];

export const experience = [
  {
    id: "exp-1",
    title: "AI / Full-Stack Developer Intern",
    company: "Fidelity Investments — Hackathon Project",
    date: "2023", // TODO(me): Provide actual dates
    description: "Built Inheritance OS in a 48-hour sprint, integrated Gemini API document parsing, automated CI/CD with GitHub Actions, and deployed Docker services to GCP Cloud Run.",
    tags: ["React", "Gemini API", "Docker", "GCP", "CI/CD"],
  },
  {
    id: "exp-2",
    title: "Open-Source Software Engineer",
    company: "Nova Productivity Agent",
    date: "2023", // TODO(me): Provide actual dates
    description: "Designed a modular microservices architecture with Gmail, Zoom, and Telegram integrations, cutting meeting documentation time from 20 minutes to under 3 minutes. Attracted 3 external contributors.",
    tags: ["Python", "APIs", "Microservices", "NLP"],
  },
];

export const education = [
  {
    id: "edu-1",
    title: "B.E. Computer Science and Engineering",
    company: "Bangalore Institute of Technology",
    date: "2023-2027", // TODO(me): Verify dates
    description: "CGPA 8.9/10, top 2% of cohort. Coursework: DSA, Machine Learning, Cloud Computing, DBMS, NLP, and Operating Systems. AWS Community Builder.",
    tags: ["DSA", "ML", "Cloud", "NLP", "DBMS"],
  }
];

export const services = [
  {
    id: "srv-1",
    title: "AI Full-Stack Development",
    checklist: ["Gemini API Integration", "NLP Pipelines", "Next.js / MERN"],
    value: "Bridging complex AI reasoning with performant frontend interfaces."
  },
  {
    id: "srv-2",
    title: "Backend and Distributed Systems",
    checklist: ["Microservices", "Python & Node.js", "Docker Containerization"],
    value: "Building robust, scalable architectures for high-traffic environments."
  },
  {
    id: "srv-3",
    title: "DevOps and Infrastructure",
    checklist: ["CI/CD Workflows", "GCP Cloud Run", "Vercel Optimization"],
    value: "Automating deployment pipelines for reliable and rapid production shipping."
  },
  // TODO(me): Review and modify supported services based on real data
];
