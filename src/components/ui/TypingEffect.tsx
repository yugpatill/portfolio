"use client";

import { useState, useEffect } from "react";

interface TypingEffectProps {
  words: string[];
  typeSpeed?: number;
  deleteSpeed?: number;
  pauseMs?: number;
}

export default function TypingEffect({
  words,
  typeSpeed = 80,
  deleteSpeed = 45,
  pauseMs = 2200,
}: TypingEffectProps) {
  const [displayed, setDisplayed] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIndex % words.length];

    const tick = () => {
      if (!isDeleting) {
        setDisplayed(current.substring(0, displayed.length + 1));
        if (displayed.length + 1 === current.length) {
          setTimeout(() => setIsDeleting(true), pauseMs);
          return;
        }
      } else {
        setDisplayed(current.substring(0, displayed.length - 1));
        if (displayed.length - 1 === 0) {
          setIsDeleting(false);
          setWordIndex((i) => i + 1);
          return;
        }
      }
    };

    const timeout = setTimeout(tick, isDeleting ? deleteSpeed : typeSpeed);
    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, wordIndex, words, typeSpeed, deleteSpeed, pauseMs]);

  return <span className="typing-cursor">{displayed}</span>;
}
