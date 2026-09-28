/**
 * SITE CONFIGURATION
 * ─────────────────────────────────────────────────────
 * Update this file to change personal information,
 * social links, and other site-wide constants.
 * ─────────────────────────────────────────────────────
 */

const siteConfig = {
  // ── Identity ────────────────────────────────────────
  name: "Ayushmaan Singh",
  firstName: "Ayushmaan",
  title: "Software Developer",
  subtitle: "MCA Student at VIT",
  location: "Kolkata, West Bengal",

  // ── Contact ─────────────────────────────────────────
  email: "ayushmaansingh8777@gmail.com",
  phone: "+91 8777244703",

  // ── CV / Resume ─────────────────────────────────────
  // Place your PDF at: public/assets/Ayushmaan_Singh_Ez.pdf
  cvPath: "/assets/Ayushmaan_Singh_Ez.pdf",

  // ── Social Links ────────────────────────────────────
  // Replace the "#" placeholders below with your actual profile URLs
  social: {
    github: "https://github.com/Ayushmaaan-Singh",
    linkedin: "https://www.linkedin.com/in/ayushmaan-singh-799b98224",
    leetcode: "https://leetcode.com/u/AyushmaaanSingh/",
  },

  // ── Hero ────────────────────────────────────────────
  heroLabel: "SOFTWARE DEVELOPER",
  heroHeading: "Hi, I'm",
  heroTagline: "I build software that solves problems.",
  heroDescription:
    "I'm a software developer and MCA student focused on building full-stack applications, backend systems, and AI-powered solutions.",

  // ── About ───────────────────────────────────────────
  aboutHeading: "I'm passionate about building intelligent software solutions.",
  aboutDescription:
    "I'm an MCA student and software developer interested in building full-stack applications, backend systems, and AI-powered solutions. I enjoy working with real-world data, distributed systems, and machine learning to turn ideas into practical software.",

  // ── About Stat Blocks ───────────────────────────────
  aboutStats: [
    { title: "MCA", subtitle: "Vellore Institute of Technology" },
    { title: "8.58", subtitle: "Current CGPA" },
    { title: "170+", subtitle: "LeetCode Problems" },
    { title: "2027", subtitle: "MCA Graduation" },
  ],

  // ── Education ───────────────────────────────────────
  education: [
    {
      institution: "Vellore Institute of Technology",
      degree: "Master of Computer Applications",
      duration: "Expected June 2027",
      cgpa: "8.58",
      coursework: [
        "Machine Learning",
        "Data Science",
        "Advanced Java",
        "MySQL",
      ],
    },
    {
      institution: "Techno India Kolkata",
      degree: "Bachelor of Computer Applications",
      duration: "2022 – 2025",
      cgpa: "7.96",
      coursework: [
        "Data Structures & Algorithms",
        "Object-Oriented Programming",
        "Database Management Systems",
        "Operating Systems",
        "HTML / CSS / JavaScript",
        "Shell Scripting",
      ],
    },
  ],

  // ── Hero Technologies (visible under buttons) ───────
  heroTechnologies: ["Java", "Python", "React", "Spring Boot", "FastAPI", "Docker"],

  // ── Approach Quote ──────────────────────────────────
  approachQuote:
    '"I enjoy turning ideas into practical software — from full-stack web applications and backend systems to machine learning pipelines and AI-powered solutions."',

  // ── Contact CTA ─────────────────────────────────────
  contactLabel: "LET'S WORK TOGETHER",
  contactHeading: "Have an idea or project in mind?",
  contactDescription:
    "I'm interested in building useful software, exploring new technologies, and working on challenging development and AI projects.",

  // ── Footer ──────────────────────────────────────────
  footerYear: "2026",
};

export default siteConfig;
