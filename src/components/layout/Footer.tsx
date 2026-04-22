"use client";

import { SiGithub } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";
import { motion } from "framer-motion";

const socials = [
  { icon: SiGithub, href: "https://github.com/yugpatill", label: "GitHub" },
  { icon: FaLinkedin, href: "https://www.linkedin.com/in/yugandharpatil/", label: "LinkedIn" },
];

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid var(--divider)",
        padding: "2rem 3rem 2rem 5rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "1rem",
      }}
    >
      {/* Creative tagline */}
      <p
        style={{
          fontFamily: "var(--font-space-grotesk)",
          fontSize: "0.8rem",
          color: "var(--text-muted)",
          letterSpacing: "0.04em",
        }}
      >
        Designed &amp; built by{" "}
        <span
          style={{
            background: "linear-gradient(135deg, #a855f7, #06b6d4)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            fontWeight: 600,
          }}
        >
          Yugandhar Patil
        </span>{" "}
        · No models were overfit in the making of this portfolio.
      </p>

      {/* Socials */}
      <div style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
        {socials.map(({ icon: Icon, href, label }) => (
          <motion.a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            whileHover={{ y: -2 }}
            transition={{ type: "spring", stiffness: 400 }}
            style={{ color: "var(--text-link)", transition: "color 0.2s" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#a855f7")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-link)")}
          >
            <Icon size={17} />
          </motion.a>
        ))}
        <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", fontFamily: "monospace" }}>
          © {new Date().getFullYear()}
        </span>
      </div>
    </footer>
  );
}
