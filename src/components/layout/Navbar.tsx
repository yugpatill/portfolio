"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiMoon, HiSun } from "react-icons/hi2";
import { useScrollSpy } from "@/hooks/useScrollSpy";

const NAV_ITEMS = [
  { label: "Home",           href: "#hero",           num: "01" },
  { label: "Projects",       href: "#projects",       num: "02" },
  { label: "Skills",         href: "#skills",         num: "03" },
  { label: "Certifications", href: "#certifications", num: "04" },
  { label: "Education",      href: "#education",      num: "05" },
  { label: "Contact",        href: "#contact",        num: "06" },
];

const SECTION_IDS = ["hero", "projects", "skills", "certifications", "education", "contact"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const activeId = useScrollSpy(SECTION_IDS, 120);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (href: string) => {
    setMobileOpen(false);
    document.getElementById(href.replace("#", ""))?.scrollIntoView({ behavior: "smooth" });
  };

  const toggleDarkMode = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("light-mode", !next);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          background: scrolled ? "var(--nav-bg-scrolled)" : "var(--nav-bg)",
          backdropFilter: scrolled ? "blur(32px)" : "blur(20px)",
          WebkitBackdropFilter: scrolled ? "blur(32px)" : "blur(20px)",
          borderBottom: scrolled
            ? "1px solid rgba(168,85,247,0.2)"
            : "1px solid transparent",
          boxShadow: scrolled
            ? "0 1px 0 rgba(168,85,247,0.15), 0 4px 32px rgba(0,0,0,0.4)"
            : "none",
          transition: "background 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease, backdrop-filter 0.35s ease",
        }}
      >
        <div className="w-full px-10 flex items-center justify-between" style={{ height: "4.5rem" }}>

          {/* Logo — left */}
          <motion.button
            onClick={() => handleNav("#hero")}
            className="cursor-pointer bg-transparent border-0"
            whileHover={{ y: -1 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            style={{ marginLeft: "1.5rem" }}
          >
            <span
              style={{
                fontFamily: "var(--font-orbitron)",
                fontSize: "1.4rem",
                fontWeight: 600,
                background: "linear-gradient(135deg, #a855f7, #3b82f6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                letterSpacing: "0.04em",
              }}
            >
              yp
            </span>
          </motion.button>

          {/* Desktop nav — pinned to right edge */}
          <div className="hidden md:flex items-center gap-4">
            {NAV_ITEMS.map((item) => {
              const id = item.href.replace("#", "");
              const isActive = activeId === id;
              return (
                <motion.button
                  key={item.href}
                  onClick={() => handleNav(item.href)}
                  whileHover={{ y: -1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className="relative px-3 py-2 text-sm cursor-pointer bg-transparent border-0 flex items-center gap-1"
                  style={{ color: isActive ? "#c084fc" : "var(--text-nav)" }}
                >
                  <span
                    className="text-xs font-mono"
                    style={{ color: isActive ? "#c084fc" : "#a855f7", opacity: isActive ? 1 : 0.75 }}
                  >
                    {item.num}.
                  </span>
                  <span className="font-medium">{item.label}</span>
                </motion.button>
              );
            })}

            {/* Dark/Light toggle */}
            <motion.button
              onClick={toggleDarkMode}
              whileHover={{ y: -1 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              aria-label="Toggle dark/light mode"
              style={{
                background: "var(--bg-surface)",
                border: "1px solid var(--border-surface)",
                borderRadius: "0.5rem",
                padding: "0.4rem",
                color: "var(--text-nav)",
                cursor: "pointer",
                width: "2rem",
                height: "2rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {isDark ? <HiMoon style={{ width: 14, height: 14 }} /> : <HiSun style={{ width: 14, height: 14 }} />}
            </motion.button>

            {/* Resume — no border, just accent text */}
            <motion.a
              href="https://drive.google.com/drive/folders/1YaF8lHN9xqHpHzkPoOZAL6hC3UoynIC-?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -1 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="text-sm font-medium"
              style={{
                color: "#a855f7",
                letterSpacing: "0.03em",
                marginRight: "1.5rem",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "#c084fc"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "#a855f7"; }}
            >
              Resume
            </motion.a>
          </div>

          {/* Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2 bg-transparent border-0 cursor-pointer"
            aria-label="Toggle menu"
          >
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="block h-0.5 w-6 rounded bg-white/70"
                animate={{
                  rotate: mobileOpen ? (i === 0 ? 45 : i === 2 ? -45 : 0) : 0,
                  y: mobileOpen ? (i === 0 ? 8 : i === 2 ? -8 : 0) : 0,
                  opacity: mobileOpen && i === 1 ? 0 : 1,
                }}
                transition={{ duration: 0.22 }}
              />
            ))}
          </button>
        </div>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-y-0 right-0 z-40 w-64 flex flex-col pt-24 pb-8 px-6"
            style={{
              background: "var(--nav-bg-scrolled)",
              backdropFilter: "blur(40px)",
              borderLeft: "1px solid var(--border-card)",
            }}
          >
            <div className="flex flex-col">
              {NAV_ITEMS.map((item, i) => (
                <motion.button
                  key={item.href}
                  onClick={() => handleNav(item.href)}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                  className="text-left py-4 text-sm font-medium bg-transparent border-0 cursor-pointer border-b flex items-center gap-2"
                  style={{
                    color: "var(--text-primary)",
                    borderColor: "var(--border-card)",
                  }}
                >
                  <span className="text-xs font-mono text-purple-400">{item.num}.</span>
                  {item.label}
                </motion.button>
              ))}
            </div>
            <motion.a
              href="https://drive.google.com/drive/folders/1YaF8lHN9xqHpHzkPoOZAL6hC3UoynIC-?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.38 }}
              className="mt-8 py-2.5 text-center text-sm font-medium text-purple-400 rounded"
              style={{ border: "1px solid #a855f7" }}
            >
              Resume
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 z-30 bg-black/50 md:hidden"
          />
        )}
      </AnimatePresence>
    </>
  );
}
