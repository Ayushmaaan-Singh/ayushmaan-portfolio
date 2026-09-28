/**
 * SKILLS DATA
 * ─────────────────────────────────────────────────────
 * Each skill item now carries an official `docs` URL.
 * The badge in the UI becomes a clickable link.
 * ─────────────────────────────────────────────────────
 */

const skills = [
  {
    id: "languages",
    category: "Languages",
    icon: "{ }",
    items: [
      { name: "Java",   docs: "https://docs.oracle.com/en/java/" },
      { name: "Python", docs: "https://docs.python.org/3/" },
      { name: "SQL",    docs: "https://dev.mysql.com/doc/refman/8.0/en/sql-statements.html" },
    ],
  },
  {
    id: "frontend",
    category: "Frontend",
    icon: "◈",
    items: [
      { name: "React",       docs: "https://react.dev/" },
      { name: "HTML",        docs: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
      { name: "CSS",         docs: "https://developer.mozilla.org/en-US/docs/Web/CSS" },
      { name: "JavaScript",  docs: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
      { name: "Material UI", docs: "https://mui.com/material-ui/getting-started/" },
    ],
  },
  {
    id: "backend",
    category: "Backend & APIs",
    icon: "⟩_",
    items: [
      { name: "Spring Boot", docs: "https://spring.io/projects/spring-boot" },
      { name: "FastAPI",     docs: "https://fastapi.tiangolo.com/" },
      { name: "REST APIs",   docs: "https://restfulapi.net/" },
      { name: "Node.js",     docs: "https://nodejs.org/en/docs" },
    ],
  },
  {
    id: "ai",
    category: "AI / GenAI",
    icon: "✦",
    items: [
      { name: "RAG Development",  docs: "https://python.langchain.com/docs/concepts/rag/" },
      { name: "LLM Integration",  docs: "https://platform.openai.com/docs/guides/text-generation" },
      { name: "Spring AI",        docs: "https://docs.spring.io/spring-ai/reference/" },
      { name: "Gemini API",       docs: "https://ai.google.dev/gemini-api/docs" },
      { name: "Scikit-Learn",     docs: "https://scikit-learn.org/stable/user_guide.html" },
    ],
  },
  {
    id: "databases",
    category: "Databases & Cloud",
    icon: "⬡",
    items: [
      { name: "MySQL",       docs: "https://dev.mysql.com/doc/" },
      { name: "MongoDB",     docs: "https://www.mongodb.com/docs/" },
      { name: "PGVector",    docs: "https://github.com/pgvector/pgvector" },
      { name: "Redis",       docs: "https://redis.io/docs/latest/" },
      { name: "AWS S3",      docs: "https://docs.aws.amazon.com/s3/" },
      { name: "AWS Lambda",  docs: "https://docs.aws.amazon.com/lambda/" },
      { name: "Firebase",    docs: "https://firebase.google.com/docs" },
    ],
  },
  {
    id: "tools",
    category: "Tools & DevOps",
    icon: "⚙",
    items: [
      { name: "Git",    docs: "https://git-scm.com/doc" },
      { name: "Docker", docs: "https://docs.docker.com/" },
      { name: "Kafka",  docs: "https://kafka.apache.org/documentation/" },
      { name: "Codex",  docs: "https://platform.openai.com/docs/guides/code" },
    ],
  },
];

export default skills;
