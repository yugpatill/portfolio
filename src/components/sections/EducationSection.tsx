"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import SectionHeading from "@/components/ui/SectionHeading";

const coursework = [
  "Machine Learning",
  "Artificial Intelligence",
  "Data Mining",
  "Data Structures & Algorithms",
  "Cloud Computing",
  "Big Data Analytics",
  "R Programming",
  "Operating Systems",
  "Database Systems",
  "Python for Web APIs",
  "Computer Networks",
  "Software Engineering",
];

const education = [
  {
    degree: "Master of Science in Computer Science",
    school: "New Jersey Institute of Technology",
    location: "Newark, NJ",
    period: "Sep 2024 – Present",
    gpa: "3.6 / 4.0",
    gpaLabel: "GPA",
    accent: "#a855f7",
  },
  {
    degree: "Bachelor of Engineering in Electronics & Telecommunication",
    school: "Army Institute of Technology",
    location: "Pune, India",
    period: "Aug 2020 – May 2024",
    gpa: "7.95 / 10",
    gpaLabel: "CGPA",
    accent: "#06b6d4",
  },
];

type EduEntry = typeof education[number];

export default function EducationSection() {
  return (
    <section id="education" style={{ width: "100%" }}>
      <div
        style={{
          width: "100%",
          padding: "0 5%",
          display: "flex",
          flexDirection: "column",
          gap: "1.75rem",
        }}
      >
        <SectionHeading title="Education & Coursework" />

        {/* Education cards */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1.25rem" }}
        >
          {education.map((edu) => (
            <EduCard key={edu.school} edu={edu} />
          ))}
        </motion.div>

        {/* Coursework card */}
        <CourseworkCard />
      </div>
    </section>
  );
}

function EduCard({ edu }: { edu: EduEntry }) {
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
        el.style.borderColor = `${edu.accent}40`;
        el.style.boxShadow = `0 6px 24px ${edu.accent}14, inset 0 1px 0 ${edu.accent}10`;
      }}
      style={{
        rotateX: springRX,
        rotateY: springRY,
        transformPerspective: 800,
        position: "relative",
        background: "var(--bg-card)",
        border: "1px solid var(--border-card)",
        borderRadius: "0.75rem",
        padding: "1.75rem 2rem",
        boxShadow: "var(--shadow-card)",
        transition: "border-color 0.3s ease, box-shadow 0.3s ease",
        overflow: "hidden",
        cursor: "default",
      }}
    >
      {/* Accent top line */}
      <div style={{
        position: "absolute",
        top: 0, left: "1.5rem", right: "1.5rem",
        height: "1px",
        background: `linear-gradient(90deg, transparent, ${edu.accent}50, transparent)`,
      }} />

      <h3 style={{
        fontFamily: "var(--font-space-grotesk)",
        fontSize: "1rem", fontWeight: 700,
        color: "var(--text-primary)",
        marginBottom: "0.4rem", lineHeight: 1.35,
      }}>
        {edu.degree}
      </h3>

      <p style={{ fontSize: "0.82rem", fontWeight: 600, color: edu.accent, marginBottom: "0.2rem", opacity: 0.9 }}>
        {edu.school}
      </p>
      <p style={{ fontSize: "0.75rem", color: "var(--text-dim)", marginBottom: "1.25rem" }}>
        {edu.location}
      </p>

      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        paddingTop: "1rem", borderTop: "1px solid var(--divider)",
      }}>
        <span style={{ fontSize: "0.75rem", fontFamily: "monospace", color: "var(--text-muted)" }}>
          {edu.period}
        </span>
        <div style={{ display: "flex", alignItems: "baseline", gap: "0.35rem" }}>
          <span style={{
            fontSize: "1.1rem", fontWeight: 700,
            background: `linear-gradient(135deg, ${edu.accent}, #ffffff80)`,
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
          }}>
            {edu.gpa}
          </span>
          <span style={{ fontSize: "0.65rem", color: "var(--text-muted)", fontFamily: "monospace" }}>
            {edu.gpaLabel}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

function CourseworkCard() {
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springRX = useSpring(rotateX, { stiffness: 200, damping: 20 });
  const springRY = useSpring(rotateY, { stiffness: 200, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    rotateX.set(((e.clientY - rect.top) / rect.height - 0.5) * -6);
    rotateY.set(((e.clientX - rect.left) / rect.width - 0.5) * 6);
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
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.borderColor = "rgba(59,130,246,0.35)";
        el.style.boxShadow = "0 6px 24px rgba(59,130,246,0.12), inset 0 1px 0 rgba(59,130,246,0.06)";
      }}
      style={{
        rotateX: springRX,
        rotateY: springRY,
        transformPerspective: 1200,
        background: "var(--bg-card)",
        border: "1px solid var(--border-card)",
        borderRadius: "0.75rem",
        padding: "1.5rem 2rem",
        boxShadow: "var(--shadow-card)",
        transition: "border-color 0.3s ease, box-shadow 0.3s ease",
        cursor: "default",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "0.625rem", marginBottom: "1rem" }}>
        <div style={{
          width: "3px", height: "1.1rem", borderRadius: "2px",
          background: "#3b82f6", boxShadow: "0 0 8px #3b82f680", flexShrink: 0,
        }} />
        <span style={{
          color: "#3b82f6", fontSize: "0.7rem", fontFamily: "monospace",
          textTransform: "uppercase", letterSpacing: "0.12em", fontWeight: 600,
        }}>
          Relevant Coursework
        </span>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
        {coursework.map((course) => (
          <span key={course} style={{
            background: "rgba(59,130,246,0.08)",
            border: "1px solid rgba(59,130,246,0.25)",
            color: "var(--text-primary)",
            fontSize: "0.78rem",
            padding: "0.3rem 0.85rem",
            borderRadius: "999px",
            fontFamily: "monospace",
            whiteSpace: "nowrap",
          }}>
            {course}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
