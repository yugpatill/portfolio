"use client";

import { useState, useEffect, useRef, KeyboardEvent } from "react";
import { motion } from "framer-motion";
import { HiClipboard, HiCheck } from "react-icons/hi2";

const EMAIL = "yugandhar131102@gmail.com";
const FORMSPREE_URL = "https://formspree.io/f/mlgappkd";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const STEPS = [
  { key: "name",    prompt: "What's your name?",       placeholder: "e.g. John Doe"           },
  { key: "email",   prompt: "Your email address?",     placeholder: "e.g. john@example.com"   },
  { key: "message", prompt: "Your message:",           placeholder: "What's on your mind..."  },
];

type LineKind = "system" | "prompt" | "input" | "success" | "error";
interface Line { kind: LineKind; text: string }

const lineColor: Record<LineKind, string> = {
  system:  "#4ade80",
  prompt:  "#c084fc",
  input:   "rgba(255,255,255,0.85)",
  success: "#34d399",
  error:   "#f87171",
};

const linePrefix: Record<LineKind, string> = {
  system:  "",
  prompt:  "~/contact $ ",
  input:   "  › ",
  success: "  ✓ ",
  error:   "  ✗ ",
};

export default function ContactSection() {
  const [history, setHistory]   = useState<Line[]>([]);
  const [step, setStep]         = useState<number>(-1); // -1 = booting
  const [value, setValue]       = useState("");
  const [fieldError, setFieldError] = useState("");
  const [data, setData]         = useState({ name: "", email: "", message: "" });
  const [copied, setCopied]     = useState(false);

  const inputRef       = useRef<HTMLInputElement>(null);
  const textareaRef    = useRef<HTMLTextAreaElement>(null);
  const terminalBodyRef = useRef<HTMLDivElement>(null);
  const bottomRef      = useRef<HTMLDivElement>(null);

  // Boot sequence
  useEffect(() => {
    const bootLines: Line[] = [
      { kind: "system", text: "$ Initializing contact protocol..." },
      { kind: "system", text: "$ Connection established. Ready to receive." },
      { kind: "system", text: "" },
    ];
    let i = 0;
    const t = setInterval(() => {
      if (i < bootLines.length) {
        const line = bootLines[i]; // capture before increment so React updater sees correct value
        i++;
        setHistory(prev => [...prev, line]);
      } else {
        clearInterval(t);
        setStep(0);
      }
    }, 380);
    return () => clearInterval(t);
  }, []);

  // Scroll terminal body to bottom — scroll the div itself, NOT the page
  useEffect(() => {
    const el = terminalBodyRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [history, step]);

  // Auto-focus input when step changes — preventScroll stops the browser
  // from jumping to the contact section on initial page load
  useEffect(() => {
    if (step >= 0 && step < 3) {
      setTimeout(() => {
        const el = step === 2 ? textareaRef.current : inputRef.current;
        el?.focus({ preventScroll: true });
      }, 50);
    }
  }, [step]);

  const pushLine = (line: Line) => setHistory(prev => [...prev, line]);

  const handleSubmit = () => {
    const trimmed = value.trim();

    if (!trimmed) { setFieldError("This field cannot be empty."); return; }
    if (STEPS[step].key === "email" && !EMAIL_RE.test(trimmed)) {
      setFieldError("Please enter a valid email address."); return;
    }

    const newData = { ...data, [STEPS[step].key]: trimmed };
    setData(newData);

    // Commit this step to history
    setHistory(prev => [
      ...prev,
      { kind: "prompt", text: STEPS[step].prompt },
      { kind: "input",  text: trimmed },
      { kind: "system", text: "" },
    ]);
    setFieldError("");
    setValue("");

    if (step === 2) {
      // All done — submit
      setStep(3); // sending
      pushLine({ kind: "system", text: "$ Encrypting and transmitting..." });

      fetch(FORMSPREE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ name: newData.name, email: newData.email, message: newData.message }),
      })
        .then(res => {
          if (res.ok) {
            setStep(4);
            setHistory(prev => [
              ...prev,
              { kind: "success", text: "Message delivered successfully!" },
              { kind: "system",  text: `$ I'll reply to ${newData.email} shortly.` },
              { kind: "system",  text: "" },
            ]);
          } else {
            setStep(5);
            pushLine({ kind: "error", text: `Transmission failed. Email me directly at ${EMAIL}` });
          }
        })
        .catch(() => {
          setStep(5);
          pushLine({ kind: "error", text: `Network error. Email me at ${EMAIL}` });
        });
    } else {
      setStep(s => s + 1);
    }
  };

  const handleKey = (e: KeyboardEvent) => {
    if (e.key === "Enter" && !(step === 2 && e.shiftKey)) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleReset = () => {
    setHistory([]);
    setData({ name: "", email: "", message: "" });
    setValue("");
    setFieldError("");
    setStep(-1);
    let i = 0;
    const bootLines: Line[] = [
      { kind: "system", text: "$ Reinitializing..." },
      { kind: "system", text: "$ Ready." },
      { kind: "system", text: "" },
    ];
    const t = setInterval(() => {
      if (i < bootLines.length) {
        const line = bootLines[i];
        i++;
        setHistory(prev => [...prev, line]);
      } else {
        clearInterval(t);
        setStep(0);
      }
    }, 300);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(EMAIL).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <section id="contact" style={{ width: "100%" }}>
      <div style={{ width: "100%", maxWidth: "720px", margin: "0 auto", padding: "4rem 3rem" }}>

        {/* Label */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ color: "var(--text-dim)", fontSize: "0.8rem", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.75rem", textAlign: "center" }}
        >
          — Contact Me
        </motion.p>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.08 }}
          style={{
            fontFamily: "var(--font-space-grotesk)",
            fontSize: "clamp(2rem, 5vw, 3rem)",
            fontWeight: 700,
            textAlign: "center",
            marginBottom: "0.75rem",
            background: "linear-gradient(135deg, #a855f7 0%, #3b82f6 50%, #06b6d4 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Let&apos;s Collaborate
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.12 }}
          style={{ color: "var(--text-secondary)", fontSize: "0.95rem", textAlign: "center", lineHeight: 1.7, marginBottom: "1.25rem" }}
        >
          Got a project in mind? Fill out the terminal below or email me directly.
        </motion.p>

        {/* Copy email row */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.18 }}
          style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem", marginBottom: "2rem" }}
        >
          <span style={{ fontSize: "0.85rem", color: "var(--text-secondary)", fontFamily: "monospace" }}>
            {EMAIL}
          </span>
          <button
            onClick={handleCopy}
            aria-label="Copy email"
            style={{
              background: "rgba(6,182,212,0.1)",
              border: "1px solid rgba(6,182,212,0.3)",
              color: "#06b6d4",
              borderRadius: "0.375rem",
              padding: "0.3rem 0.6rem",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "0.3rem",
              fontSize: "0.75rem",
            }}
          >
            {copied
              ? <><HiCheck style={{ width: 14, height: 14 }} /><span style={{ color: "#4ade80" }}>Copied!</span></>
              : <HiClipboard style={{ width: 14, height: 14 }} />
            }
          </button>
        </motion.div>

        {/* ── Terminal window ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.22 }}
          onClick={() => (step === 2 ? textareaRef.current : inputRef.current)?.focus()}
          style={{
            background: "rgba(6,8,20,0.96)",
            border: "1px solid rgba(168,85,247,0.3)",
            borderRadius: "0.875rem",
            overflow: "hidden",
            boxShadow: "0 12px 48px rgba(0,0,0,0.65), 0 0 0 1px rgba(168,85,247,0.08)",
            cursor: "text",
          }}
        >
          {/* Title bar */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "0.4rem",
            padding: "0.7rem 1rem",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            background: "rgba(255,255,255,0.025)",
          }}>
            <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#ff5f57", display: "inline-block" }} />
            <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#ffbd2e", display: "inline-block" }} />
            <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#28c840", display: "inline-block" }} />
            <span style={{ marginLeft: "auto", color: "rgba(255,255,255,0.22)", fontSize: "0.68rem", fontFamily: "monospace" }}>
              bash&nbsp;&nbsp;—&nbsp;&nbsp;~/contact
            </span>
          </div>

          {/* Terminal body */}
          <div ref={terminalBodyRef} style={{
            padding: "1.25rem 1.5rem 1rem",
            fontFamily: "monospace",
            fontSize: "0.83rem",
            lineHeight: 1.75,
            minHeight: "260px",
            maxHeight: "380px",
            overflowY: "auto",
          }}>
            {/* History lines */}
            {history.map((line, i) => (
              <div
                key={i}
                style={{
                  color: lineColor[line.kind],
                  whiteSpace: "pre-wrap",
                  minHeight: line.text === "" ? "0.5rem" : undefined,
                }}
              >
                {line.text !== "" && `${linePrefix[line.kind]}${line.text}`}
              </div>
            ))}

            {/* Active prompt + input */}
            {step >= 0 && step < 3 && (
              <div style={{ marginTop: "0.25rem" }}>
                <div style={{ color: "#c084fc" }}>
                  ~/contact $ {STEPS[step].prompt}
                </div>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "0.3rem", marginTop: "0.1rem" }}>
                  <span style={{ color: "#c084fc", lineHeight: 1.75, flexShrink: 0 }}>›</span>
                  {step === 2 ? (
                    <textarea
                      ref={textareaRef}
                      value={value}
                      rows={3}
                      onChange={e => { setValue(e.target.value); setFieldError(""); }}
                      onKeyDown={handleKey}
                      placeholder={STEPS[step].placeholder}
                      style={{
                        background: "transparent",
                        border: "none",
                        outline: "none",
                        color: "rgba(255,255,255,0.85)",
                        fontFamily: "monospace",
                        fontSize: "0.83rem",
                        resize: "none",
                        width: "100%",
                        lineHeight: 1.75,
                        caretColor: "#a855f7",
                      }}
                    />
                  ) : (
                    <input
                      ref={inputRef}
                      type={step === 1 ? "email" : "text"}
                      value={value}
                      onChange={e => { setValue(e.target.value); setFieldError(""); }}
                      onKeyDown={handleKey}
                      placeholder={STEPS[step].placeholder}
                      style={{
                        background: "transparent",
                        border: "none",
                        outline: "none",
                        color: "rgba(255,255,255,0.85)",
                        fontFamily: "monospace",
                        fontSize: "0.83rem",
                        width: "100%",
                        caretColor: "#a855f7",
                      }}
                    />
                  )}
                </div>

                {/* Inline validation error */}
                {fieldError && (
                  <div style={{ color: "#f87171", fontSize: "0.72rem", marginTop: "0.2rem", paddingLeft: "1rem" }}>
                    ✗ {fieldError}
                  </div>
                )}

                {/* Hint for message step */}
                {step === 2 && (
                  <div style={{ color: "rgba(255,255,255,0.2)", fontSize: "0.68rem", marginTop: "0.25rem", paddingLeft: "1rem" }}>
                    Press Enter to send · Shift+Enter for new line
                  </div>
                )}

                {/* Enter hint for other steps */}
                {step < 2 && (
                  <div style={{ color: "rgba(255,255,255,0.2)", fontSize: "0.68rem", marginTop: "0.25rem", paddingLeft: "1rem" }}>
                    Press Enter to continue
                  </div>
                )}
              </div>
            )}

            {/* Sending spinner */}
            {step === 3 && (
              <div style={{ color: "#4ade80", marginTop: "0.5rem" }}>
                <span className="typing-cursor" />
              </div>
            )}

            {/* Done — restart option */}
            {step === 4 && (
              <button
                onClick={handleReset}
                style={{
                  background: "none",
                  border: "none",
                  color: "#c084fc",
                  fontFamily: "monospace",
                  fontSize: "0.83rem",
                  cursor: "pointer",
                  marginTop: "0.5rem",
                  padding: 0,
                }}
              >
                ~/contact $ send another message →
              </button>
            )}

          </div>
        </motion.div>
      </div>
    </section>
  );
}
