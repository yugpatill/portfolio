"use client";

import { useEffect, useRef, useState } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";

interface ScrambleTextProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  /** Delay before scramble starts after entering viewport (ms) */
  delay?: number;
}

export default function ScrambleText({
  text,
  className,
  style,
  delay = 0,
}: ScrambleTextProps) {
  const [display, setDisplay] = useState(text);
  const elRef = useRef<HTMLSpanElement>(null);
  const rafRef = useRef<number>(0);
  const hasRunRef = useRef(false);

  const startScramble = () => {
    if (hasRunRef.current) return;
    hasRunRef.current = true;

    let iter = 0;

    const step = () => {
      iter += 0.55;
      setDisplay(
        text
          .split("")
          .map((char, i) => {
            if (char === " ") return " ";
            if (i < Math.floor(iter)) return char;
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );

      if (iter < text.length) {
        rafRef.current = requestAnimationFrame(step);
      } else {
        setDisplay(text);
      }
    };

    if (delay > 0) {
      setTimeout(() => { rafRef.current = requestAnimationFrame(step); }, delay);
    } else {
      rafRef.current = requestAnimationFrame(step);
    }
  };

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          startScramble();
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(rafRef.current);
    };
  }, [text]);

  return (
    <span ref={elRef} className={className} style={style}>
      {display}
    </span>
  );
}
