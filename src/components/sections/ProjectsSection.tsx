"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { SiGithub } from "react-icons/si";
import { HiArrowTopRightOnSquare } from "react-icons/hi2";
import { HiOutlineFolder } from "react-icons/hi";
import SectionHeading from "@/components/ui/SectionHeading";
import MarqueeStrip from "@/components/ui/MarqueeStrip";
import { projects } from "@/data/projects";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import { Project } from "@/types";

const containerStyle: React.CSSProperties = {
  width: "100%",
  padding: "1.5rem 3% 0",
  display: "flex",
  flexDirection: "column",
  gap: "1.75rem",
};

export default function ProjectsSection() {
  return (
    <section id="projects" style={{ width: "100%" }}>
      <MarqueeStrip />
      <div style={containerStyle}>
        <SectionHeading title="Projects" />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "1.25rem",
          }}
        >
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const springRX = useSpring(rotateX, { stiffness: 200, damping: 20 });
  const springRY = useSpring(rotateY, { stiffness: 200, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    rotateX.set((y - rect.height / 2) / rect.height * -10);
    rotateY.set((x - rect.width / 2) / rect.width * 10);
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
        el.style.borderColor = "rgba(6,182,212,0.3)";
        el.style.boxShadow = "0 6px 24px rgba(6,182,212,0.1), inset 0 1px 0 rgba(6,182,212,0.06)";
      }}
      style={{
        rotateX: springRX,
        rotateY: springRY,
        transformPerspective: 800,
        position: "relative",
        display: "flex",
        flexDirection: "column",
        borderRadius: "0.75rem",
        padding: "1.25rem 1.4rem 1.1rem",
        background: "var(--bg-card)",
        border: "1px solid var(--border-card)",
        boxShadow: "var(--shadow-card)",
        transition: "border-color 0.3s ease, box-shadow 0.3s ease",
        cursor: "default",
        overflow: "hidden",
      }}
    >
      {/* Accent top line */}
      <div style={{
        position: "absolute",
        top: 0, left: "1.5rem", right: "1.5rem",
        height: "1px",
        background: "linear-gradient(90deg, transparent, rgba(6,182,212,0.35), transparent)",
      }} />

      {/* Header: folder + links */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.6rem" }}>
        <HiOutlineFolder style={{ width: "1.4rem", height: "1.4rem", color: "#06b6d4", opacity: 0.85 }} />
        <div style={{ display: "flex", gap: "0.625rem" }}>
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer"
              style={{ color: "var(--text-link)", transition: "color 0.2s" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-link-hover)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-link)")}
            ><SiGithub size={13} /></a>
          )}
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noopener noreferrer"
              style={{ color: "var(--text-link)", transition: "color 0.2s" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-link-hover)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-link)")}
            ><HiArrowTopRightOnSquare style={{ width: "0.8rem", height: "0.8rem" }} /></a>
          )}
        </div>
      </div>

      {/* Title */}
      <h3 style={{
        fontFamily: "var(--font-space-grotesk)",
        fontSize: "0.875rem",
        fontWeight: 700,
        color: "var(--text-primary)",
        marginBottom: "0.35rem",
        lineHeight: 1.35,
      }}>{project.title}</h3>

      {/* Metrics */}
      {project.metrics && (
        <div style={{ marginBottom: "0.25rem" }}>
          <span style={{
            fontSize: "1rem", fontWeight: 700,
            background: "linear-gradient(135deg, #a855f7, #06b6d4)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
          }}>{project.metrics}</span>
          <span style={{ fontSize: "0.62rem", color: "var(--text-muted)", marginLeft: "0.3rem" }}>{project.metricsLabel}</span>
        </div>
      )}

      {/* Description */}
      <p style={{
        fontSize: "0.76rem",
        color: "var(--text-desc)",
        lineHeight: 1.6,
        flex: 1,
        display: "-webkit-box",
        WebkitLineClamp: 3,
        WebkitBoxOrient: "vertical",
        overflow: "hidden",
      }}>{project.description}</p>

      {/* Tags */}
      <div style={{
        display: "flex", flexWrap: "wrap", gap: "0 0.625rem",
        marginTop: "0.625rem", paddingTop: "0.5rem",
        borderTop: "1px solid var(--divider)",
      }}>
        {project.tags.slice(0, 4).map((tag) => (
          <span key={tag} style={{ fontSize: "0.62rem", fontFamily: "monospace", color: "var(--tag-color)" }}>
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
