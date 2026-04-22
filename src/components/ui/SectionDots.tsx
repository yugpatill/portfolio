"use client";

import { useState } from "react";
import { useScrollSpy } from "@/hooks/useScrollSpy";

const SECTIONS = [
  { id: "hero", label: "Home" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "certifications", label: "Certifications" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

const SECTION_IDS = SECTIONS.map((s) => s.id);

export default function SectionDots() {
  const activeId = useScrollSpy(SECTION_IDS, 120);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const handleClick = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      className="hidden md:flex"
      style={{
        position: "fixed",
        right: "1.25rem",
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 50,
        flexDirection: "column",
        gap: "0.75rem",
        alignItems: "center",
      }}
    >
      {SECTIONS.map(({ id, label }) => {
        const isActive = activeId === id;
        const isHovered = hoveredId === id;

        return (
          <div
            key={id}
            style={{ position: "relative", display: "flex", alignItems: "center" }}
            onMouseEnter={() => setHoveredId(id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            {/* Tooltip */}
            <div
              style={{
                position: "absolute",
                right: "calc(100% + 0.6rem)",
                background: "var(--nav-bg-scrolled)",
                border: "1px solid rgba(168,85,247,0.25)",
                borderRadius: "0.375rem",
                padding: "0.25rem 0.6rem",
                fontSize: "0.7rem",
                color: "var(--text-primary)",
                whiteSpace: "nowrap",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                pointerEvents: "none",
                opacity: isHovered ? 1 : 0,
                transform: isHovered ? "translateX(0)" : "translateX(4px)",
                transition: "opacity 0.2s ease, transform 0.2s ease",
              }}
            >
              {label}
            </div>

            {/* Dot */}
            <button
              onClick={() => handleClick(id)}
              aria-label={`Navigate to ${label}`}
              style={{
                width: isActive ? 10 : 7,
                height: isActive ? 10 : 7,
                borderRadius: "50%",
                background: isActive ? "#a855f7" : "var(--border-surface)",
                border: isActive ? "none" : "1px solid var(--border-card)",
                boxShadow: isActive ? "0 0 8px #a855f7" : "none",
                cursor: "pointer",
                padding: 0,
                transition: "all 0.3s ease",
                display: "block",
              }}
            />
          </div>
        );
      })}
    </div>
  );
}
