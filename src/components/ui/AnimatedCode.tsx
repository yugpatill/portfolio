"use client";

import { useEffect, useState, useRef } from "react";

type CodeLine = {
  text: string;
  color: string;
};

const CODE_LINES: CodeLine[] = [
  { text: "import pandas as pd", color: "rgba(255,255,255,0.7)" },
  { text: "from sklearn.ensemble import RandomForest", color: "rgba(255,255,255,0.7)" },
  { text: "", color: "rgba(255,255,255,0.7)" },
  { text: "# Train model → 91% accuracy", color: "#4ade80" },
  { text: "model = RandomForestClassifier(", color: "#c084fc" },
  { text: "  n_estimators=100, max_depth=8", color: "rgba(255,255,255,0.5)" },
  { text: ")", color: "rgba(255,255,255,0.5)" },
  { text: "model.fit(X_train, y_train)", color: "#c084fc" },
  { text: "", color: "rgba(255,255,255,0.7)" },
  { text: "accuracy = model.score(X_test, y_test)", color: "rgba(255,255,255,0.7)" },
  { text: 'print(f"Accuracy: {accuracy:.2%}")', color: "#38bdf8" },
  { text: "# → Accuracy: 91.23%", color: "#4ade80" },
];

const CHAR_DELAY = 40; // ms per character
const LINE_PAUSE = 120; // extra pause between lines

export default function AnimatedCode() {
  // completedLines[i] holds the fully typed string for line i
  const [completedLines, setCompletedLines] = useState<string[]>([]);
  // currentLineText is the partially typed current line
  const [currentLineText, setCurrentLineText] = useState("");
  const [currentLineIdx, setCurrentLineIdx] = useState(0);
  const [done, setDone] = useState(false);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    let lineIdx = 0;
    let charIdx = 0;
    const completed: string[] = [];

    const typeNext = () => {
      if (lineIdx >= CODE_LINES.length) {
        setDone(true);
        return;
      }

      const line = CODE_LINES[lineIdx];

      if (charIdx <= line.text.length) {
        setCurrentLineText(line.text.slice(0, charIdx));
        charIdx++;
        const id = setTimeout(typeNext, CHAR_DELAY);
        timeoutsRef.current.push(id);
      } else {
        // Line complete
        completed.push(line.text);
        setCompletedLines([...completed]);
        setCurrentLineText("");
        lineIdx++;
        charIdx = 0;
        if (lineIdx < CODE_LINES.length) {
          const id = setTimeout(typeNext, LINE_PAUSE);
          timeoutsRef.current.push(id);
        } else {
          setDone(true);
        }
      }
    };

    const id = setTimeout(typeNext, 600);
    timeoutsRef.current.push(id);

    return () => {
      timeoutsRef.current.forEach(clearTimeout);
      timeoutsRef.current = [];
    };
  }, []);

  return (
    <div
      style={{
        background: "rgba(8,12,32,0.85)",
        border: "1px solid rgba(168,85,247,0.25)",
        borderRadius: "0.75rem",
        padding: "1.25rem 1.5rem",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        fontFamily: "monospace",
        fontSize: "0.75rem",
        lineHeight: 1.8,
        minWidth: "320px",
        maxWidth: "400px",
        boxShadow: "0 8px 40px rgba(0,0,0,0.6), 0 0 0 1px rgba(168,85,247,0.1)",
      }}
    >
      {/* macOS-style title bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.4rem",
          marginBottom: "1rem",
          paddingBottom: "0.75rem",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#ff5f57", display: "inline-block" }} />
        <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#ffbd2e", display: "inline-block" }} />
        <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#28c840", display: "inline-block" }} />
        <span
          style={{
            marginLeft: "auto",
            color: "rgba(255,255,255,0.3)",
            fontSize: "0.7rem",
          }}
        >
          python&nbsp;&nbsp;model.py
        </span>
      </div>

      {/* Code content */}
      <div>
        {CODE_LINES.slice(0, completedLines.length).map((line, i) => (
          <div key={i} style={{ color: line.color, minHeight: "1.35em" }}>
            {completedLines[i]}
          </div>
        ))}

        {/* Currently typing line */}
        {!done && currentLineIdx < CODE_LINES.length && (
          <div style={{ color: CODE_LINES[completedLines.length]?.color ?? "rgba(255,255,255,0.7)" }}>
            {currentLineText}
            <span
              style={{
                display: "inline-block",
                width: "2px",
                height: "1em",
                background: "#a855f7",
                marginLeft: "1px",
                verticalAlign: "text-bottom",
                animation: "blink 1s infinite",
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
