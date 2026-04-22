"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import ScrambleText from "@/components/ui/ScrambleText";

const containerStyle: React.CSSProperties = {
  width: "100%",
  padding: "0 5%",
  display: "flex",
  flexDirection: "column",
  gap: "1.75rem",
};

interface SkillCategory {
  name: string;
  accent: string;
  skills: string[];
}

const categories: SkillCategory[] = [
  {
    name: "Programming Languages",
    accent: "#a855f7",
    skills: ["Python", "R", "C / C++", "SQL", "MySQL", "PostgreSQL"],
  },
  {
    name: "Machine Learning",
    accent: "#06b6d4",
    skills: [
      "Supervised & Unsupervised Learning", "Regression", "Classification", "Clustering",
      "Decision Trees", "Random Forest", "SVM", "KNN", "Naive Bayes",
      "Feature Engineering", "Model Selection", "Cross-Validation", "Hyperparameter Tuning",
    ],
  },
  {
    name: "Deep Learning",
    accent: "#f97316",
    skills: ["Neural Networks", "CNNs", "RNNs", "Backpropagation", "Model Training", "TensorFlow", "PyTorch"],
  },
  {
    name: "Generative AI & LLMs",
    accent: "#ec4899",
    skills: ["LLMs", "Prompt Engineering", "RAG", "Embeddings", "HuggingFace Transformers", "LangChain", "FAISS", "Pinecone"],
  },
  {
    name: "Data Science & Analytics",
    accent: "#10b981",
    skills: ["EDA", "Data Cleaning", "Data Wrangling", "Statistical Analysis", "A/B Testing", "Matplotlib", "Seaborn", "Tableau", "Power BI"],
  },
  {
    name: "MLOps & Deployment",
    accent: "#3b82f6",
    skills: ["FastAPI", "Flask", "REST APIs", "Docker", "Model Deployment", "Git", "GitHub", "CI/CD", "AWS"],
  },
  {
    name: "Computer Fundamentals",
    accent: "#f59e0b",
    skills: ["Data Structures & Algorithms", "OOP", "DBMS", "Operating Systems", "Computer Networks", "Cryptography"],
  },
  {
    name: "Libraries",
    accent: "#8b5cf6",
    skills: ["NumPy", "Pandas", "Scikit-learn", "TensorFlow", "PyTorch", "SciPy", "Matplotlib", "Seaborn"],
  },
];

export default function SkillsSection() {
  return (
    <section id="skills" style={{ width: "100%" }}>
      <div style={containerStyle}>

        {/* Heading */}
        <div style={{ textAlign: "center" }}>
          <h2
            style={{
              fontFamily: "var(--font-space-grotesk)",
              fontSize: "clamp(1.8rem, 4vw, 2.75rem)",
              fontWeight: 700,
              background: "linear-gradient(135deg, #c084fc, #818cf8, #38bdf8)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              marginBottom: "0.6rem",
            }}
          >
            <ScrambleText text="Skills & Stack" />
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem" }}>
            Technologies I use to build ML systems and GenAI applications.
          </p>
        </div>

        {/* 4-col grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1.25rem" }}
        >
          {categories.map((cat) => (
            <SkillCard key={cat.name} cat={cat} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function SkillCard({ cat }: { cat: SkillCategory }) {
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springRX = useSpring(rotateX, { stiffness: 200, damping: 20 });
  const springRY = useSpring(rotateY, { stiffness: 200, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    rotateX.set(((e.clientY - rect.top) / rect.height - 0.5) * -10);
    rotateY.set(((e.clientX - rect.left) / rect.width - 0.5) * 10);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    rotateX.set(0);
    rotateY.set(0);
    const el = e.currentTarget as HTMLDivElement;
    el.style.borderColor = "var(--border-card)";
    el.style.boxShadow = "var(--shadow-card)";
  };

  return (
    <motion.div
      variants={fadeInUp}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.borderColor = `${cat.accent}40`;
        el.style.boxShadow = `0 6px 24px ${cat.accent}18, inset 0 1px 0 ${cat.accent}10`;
      }}
      style={{
        rotateX: springRX,
        rotateY: springRY,
        transformPerspective: 800,
        background: "var(--bg-card)",
        border: "1px solid var(--border-card)",
        borderRadius: "0.75rem",
        padding: "1.5rem",
        boxShadow: "var(--shadow-card)",
        transition: "border-color 0.3s ease, box-shadow 0.3s ease",
        overflow: "hidden",
        cursor: "default",
      }}
    >
      {/* Category header */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.625rem", marginBottom: "1.25rem" }}>
        <div style={{
          width: "3px", height: "1.1rem", borderRadius: "2px",
          background: cat.accent, boxShadow: `0 0 8px ${cat.accent}80`, flexShrink: 0,
        }} />
        <span style={{
          color: cat.accent, fontSize: "0.7rem", fontFamily: "monospace",
          textTransform: "uppercase", letterSpacing: "0.12em", fontWeight: 600,
        }}>
          {cat.name}
        </span>
      </div>

      {/* Skill pills */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
        {cat.skills.map((skill) => (
          <span key={skill} style={{
            background: `${cat.accent}12`,
            border: `1px solid ${cat.accent}30`,
            color: "var(--text-primary)",
            fontSize: "0.78rem",
            padding: "0.3rem 0.75rem",
            borderRadius: "999px",
            fontFamily: "monospace",
            whiteSpace: "nowrap",
          }}>
            {skill}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
