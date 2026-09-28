import image1 from '../assets/image1.png';
import image2 from '../assets/image2.png';
import image3 from '../assets/image3.png';
import image4 from '../assets/image4.png';

/**
 * PROJECTS DATA
 * ─────────────────────────────────────────────────────
 * Edit this file to update project cards.
 * Each project maps 1-to-1 to a card on the homepage.
 * There should be exactly 4 projects.
 * ─────────────────────────────────────────────────────
 */

const projects = [
  {
    id: 1,
    title: "Minit",
    subtitle: "Quick Commerce Delivery",
    description:
      "A real-time quick commerce delivery system built around asynchronous messaging and distributed services.",
    details: [
      "Developed a real-time quick commerce delivery system with asynchronous messaging.",
      "Implemented Redis caching for the product catalog and current inventory.",
      "Utilized Apache Kafka as a distributed event bus to enable asynchronous communication between services while supporting high throughput and data consistency.",
    ],
    image: image1,
    technologies: ["Node.js", "Apache Kafka", "Redis", "MongoDB"],
    category: "Distributed Systems",
    year: "2026",
    github: "https://github.com/umangarora05/Unthinkable-Solutions-project",
    live: "https://min.umangarora.in/",
  },

  {
    id: 2,
    title: "AutoXP",
    subtitle: "AI-Powered Used Car Price Prediction & Marketplace",
    description:
      "A full-stack vehicle valuation platform that predicts fair market prices using machine learning and multiple vehicle attributes.",
    details: [
      "Engineered a full-stack vehicle valuation platform that predicts fair market prices using 10+ vehicle attributes.",
      "Built an end-to-end machine learning pipeline involving data preprocessing, feature engineering, and ensemble regression models.",
      "Developed and optimized Random Forest and XGBoost regression models using feature selection, categorical encoding, and cross-validation.",
      "Implemented a health-check endpoint for ML model availability and database connectivity.",
      "Configured automated uptime monitoring with failure alerting for the live-hosted service.",
    ],
    metric: {
      value: "90%+",
      label: "Prediction accuracy (project-reported result)",
    },
    image: image3,
    technologies: ["FastAPI", "React", "MongoDB", "Scikit-Learn", "Random Forest", "XGBoost"],
    category: "Machine Learning",
    year: "2026",
    github: "https://github.com/Ayushmaaan-Singh/autoxp-ai",
    live: "https://frontend-kohl-seven-pham1ldw89.vercel.app/",
  },

  {
    id: 3,
    title: "LearneXa",
    subtitle: "AI-Enabled E-Learning Platform",
    description:
      "An AI-enabled e-learning platform that uses RAG and LLM integration to provide semantic course-document queries and automated educational content generation.",
    details: [
      "Integrated Spring AI to develop a Retrieval-Augmented Generation system allowing students to perform semantic queries across uploaded course documents.",
      "Integrated the Gemini API through Spring AI to automate the generation of certification quizzes and assignments.",
      "Used Inngest observability to monitor asynchronous job execution, retries, and failures for reliable AI-generated content delivery.",
    ],
    metric: {
      value: "85%",
      label: "Reduction in manual content creation",
    },
    image: image2,
    technologies: ["Spring AI", "Spring Boot", "React", "MySQL", "PGVector", "Gemini API", "Inngest"],
    category: "AI / Full Stack",
    year: "2026",
    github: "https://github.com/Ayushmaaan-Singh/Learnexa",
    live: "",
  },

  {
    id: 4,
    title: "Unthinkable",
    subtitle: "Local-First Meeting Intelligence App",
    description: "A local-first meeting intelligence app that converts uploaded audio recordings into searchable, actionable meeting records using faster-whisper and Gemini Flash.",
    details: [
      "Developed a React/Vite frontend and FastAPI backend for managing and transcribing meeting audio/video.",
      "Implemented local audio transcription using faster-whisper and generated structured summaries, highlights, decisions, and action items via the Gemini API.",
      "Persisted meeting data, cross-meeting to-do lists, and completion states in a local SQLite database.",
      "Built features for timestamp-aware audio playback, Markdown export, and Mermaid flowchart generation from meeting decisions.",
    ],
    image: image4,
    technologies: ["React", "Vite", "FastAPI", "faster-whisper", "Gemini API", "SQLite"],
    category: "AI / Full Stack",
    year: "2026",
    github: "https://github.com/Ayushmaaan-Singh/Unthinkable_Solutions_Meeting_Summarizer",
    live: "",
  },
];

export default projects;
