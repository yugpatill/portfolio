"use client";

import {
  SiPython, SiPandas, SiNumpy, SiTensorflow, SiPytorch,
  SiScikitlearn, SiDocker, SiFastapi,
  SiPostgresql, SiMysql, SiJupyter, SiGithub, SiFlask,
  SiR, SiKeras,
} from "react-icons/si";
import { IconType } from "react-icons";

interface StackItem {
  label: string;
  icon?: IconType;
  color: string;
}

const ITEMS: StackItem[] = [
  { label: "Python",       icon: SiPython,       color: "#4B8BBE" },
  { label: "PyTorch",      icon: SiPytorch,      color: "#EE4C2C" },
  { label: "TensorFlow",   icon: SiTensorflow,   color: "#FF6F00" },
  { label: "scikit-learn", icon: SiScikitlearn,  color: "#F7931E" },
  { label: "Pandas",       icon: SiPandas,       color: "#a78bfa" },
  { label: "NumPy",        icon: SiNumpy,        color: "#4DABF7" },
  { label: "HuggingFace",                        color: "#FFD21E" },
  { label: "FastAPI",      icon: SiFastapi,      color: "#009688" },
  { label: "Docker",       icon: SiDocker,       color: "#2496ED" },
  { label: "AWS",                                color: "#FF9900" },
  { label: "PostgreSQL",   icon: SiPostgresql,   color: "#4169E1" },
  { label: "MySQL",        icon: SiMysql,        color: "#4479A1" },
  { label: "Keras",        icon: SiKeras,        color: "#D00000" },
  { label: "Jupyter",      icon: SiJupyter,      color: "#F37626" },
  { label: "Flask",        icon: SiFlask,        color: "#c084fc" },
  { label: "GitHub",       icon: SiGithub,       color: "#e2e8f0" },
  { label: "R",            icon: SiR,            color: "#276DC3" },
  { label: "LangChain",                          color: "#06b6d4" },
  { label: "RAG / FAISS",                        color: "#a855f7" },
];

// Duplicate for seamless infinite loop
const TRACK = [...ITEMS, ...ITEMS];

export default function MarqueeStrip() {
  return (
    <div
      style={{
        width: "100%",
        overflow: "hidden",
        borderTop: "1px solid var(--border-card)",
        borderBottom: "1px solid var(--border-card)",
        padding: "0.8rem 0",
        background: "rgba(0,0,0,0.18)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        maskImage: "linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%)",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "3.5rem",
          width: "max-content",
          animation: "marquee 35s linear infinite",
          willChange: "transform",
        }}
      >
        {TRACK.map(({ label, icon: Icon, color }, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.45rem",
              flexShrink: 0,
              color: "var(--text-dim)",
              fontSize: "0.78rem",
              fontFamily: "monospace",
              letterSpacing: "0.05em",
              userSelect: "none",
            }}
          >
            {Icon
              ? <Icon size={14} style={{ color, flexShrink: 0 }} />
              : <span style={{ width: 7, height: 7, borderRadius: "50%", background: color, flexShrink: 0, display: "inline-block" }} />
            }
            {label}
          </div>
        ))}
      </div>
    </div>
  );
}
