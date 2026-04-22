"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { SiGithub } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";
import { HiArrowDown } from "react-icons/hi";
import { HiArrowDownTray } from "react-icons/hi2";
import ParticleBackground from "@/components/ui/ParticleBackground";
import TypingEffect from "@/components/ui/TypingEffect";
import AnimatedCode from "@/components/ui/AnimatedCode";
import { fadeInUp, staggerContainer, slideInLeft } from "@/lib/animations";

const socials = [
  { icon: SiGithub, href: "https://github.com/yugpatill", label: "GitHub" },
  { icon: FaLinkedin, href: "https://www.linkedin.com/in/yugandharpatil/", label: "LinkedIn" },
];

const TYPING_WORDS = [
  "ML Engineer",
  "AI Engineer",
  "Data Scientist",
  "GenAI Developer",
  "Python Developer",
];

export default function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -120]);

  return (
    <section
      ref={ref}
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20"
    >
      <ParticleBackground />

      {/* Parallax orbs */}
      <motion.div style={{ y }} className="absolute inset-0 pointer-events-none" aria-hidden>
        <div
          className="absolute top-1/4 -left-32 w-96 h-96 rounded-full opacity-20 blur-3xl"
          style={{ background: "radial-gradient(circle, #7c3aed, transparent 70%)" }}
        />
        <div
          className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full opacity-15 blur-3xl"
          style={{ background: "radial-gradient(circle, #06b6d4, transparent 70%)" }}
        />
      </motion.div>

      <motion.div style={{ opacity }} className="relative z-10 w-full px-6">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "4rem",
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          {/* ── Left: hero content ── */}
          <div style={{ flex: "0 1 560px" }}>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}
            >
              {/* Status badge */}
              <motion.div variants={fadeInUp} style={{ display: "flex", justifyContent: "center" }}>
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.4rem",
                    background: "rgba(168,85,247,0.1)",
                    border: "1px solid rgba(168,85,247,0.3)",
                    borderRadius: "999px",
                    padding: "0.3rem 0.9rem",
                    fontSize: "0.75rem",
                    color: "var(--text-primary)",
                    letterSpacing: "0.04em",
                  }}
                >
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ade80", display: "inline-block", boxShadow: "0 0 6px #4ade80" }} />
                  Open to full-time opportunities
                </span>
              </motion.div>

              {/* Name */}
              <motion.h1
                variants={fadeInUp}
                style={{
                  fontFamily: "var(--font-space-grotesk)",
                  fontSize: "clamp(3rem, 7vw, 5rem)",
                  fontWeight: 700,
                  lineHeight: 1.05,
                  letterSpacing: "-0.02em",
                  textAlign: "center",
                }}
              >
                <span style={{ color: "var(--text-hero)" }}>Yugandhar</span>{" "}
                <span className="neon-gradient-text">Patil</span>
              </motion.h1>

              {/* Typing subtitle */}
              <motion.div
                variants={fadeInUp}
                style={{
                  fontFamily: "var(--font-space-grotesk)",
                  fontSize: "1.4rem",
                  fontWeight: 500,
                  color: "var(--text-secondary)",
                  textAlign: "center",
                  minHeight: "2rem",
                }}
              >
                <TypingEffect words={TYPING_WORDS} />
              </motion.div>

              {/* Location + Education badge */}
              <motion.div variants={fadeInUp} style={{ display: "flex", justifyContent: "center", gap: "0.75rem", flexWrap: "wrap" }}>
                {[
                  { text: "📍 Newark, NJ" },
                  { text: "🎓 MS CS · NJIT" },
                  { text: "GPA 3.6 / 4.0" },
                ].map(({ text }) => (
                  <span
                    key={text}
                    style={{
                      fontSize: "0.72rem",
                      color: "var(--text-dim)",
                      background: "var(--bg-surface)",
                      border: "1px solid var(--border-surface)",
                      borderRadius: "999px",
                      padding: "0.25rem 0.75rem",
                      fontFamily: "monospace",
                    }}
                  >
                    {text}
                  </span>
                ))}
              </motion.div>

              {/* CTAs */}
              <motion.div variants={fadeInUp} style={{ display: "flex", gap: "1.25rem", justifyContent: "center", flexWrap: "wrap" }}>
                <motion.button
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
                  className="btn-primary"
                >
                  View My Work
                  <HiArrowDown className="w-4 h-4" />
                </motion.button>
                <motion.a
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  href="https://drive.google.com/drive/folders/1YaF8lHN9xqHpHzkPoOZAL6hC3UoynIC-?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline"
                >
                  Download Resume
                  <HiArrowDownTray className="w-4 h-4" />
                </motion.a>
              </motion.div>

              {/* Socials */}
              <motion.div variants={staggerContainer} style={{ display: "flex", gap: "0.75rem", justifyContent: "center" }}>
                {socials.map(({ icon: Icon, href, label }, i) => (
                  <motion.a
                    key={label}
                    variants={slideInLeft}
                    custom={i}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    whileHover={{ y: -3, scale: 1.12 }}
                    transition={{ type: "spring", stiffness: 400 }}
                    style={{
                      width: 42,
                      height: 42,
                      borderRadius: "0.75rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "var(--text-nav)",
                      background: "var(--bg-surface)",
                      border: "1px solid var(--border-surface)",
                      transition: "color 0.2s",
                      textDecoration: "none",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-primary)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-nav)")}
                  >
                    <Icon size={18} />
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>
          </div>

          {/* ── Right: animated code ── */}
          <div className="hidden lg:block" style={{ flex: "0 0 auto" }}>
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <AnimatedCode />
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        style={{ opacity }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.4rem" }}
        >
          <span style={{ color: "var(--text-muted)", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase" }}>Scroll</span>
          <HiArrowDown style={{ color: "#a855f7", width: 18, height: 18 }} />
        </motion.div>
      </motion.div>
    </section>
  );
}
