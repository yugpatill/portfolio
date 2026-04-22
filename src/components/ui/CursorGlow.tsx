"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CursorGlow() {
  const [visible, setVisible] = useState(false);

  const mouseX = useMotionValue(-200);
  const mouseY = useMotionValue(-200);

  // Dot — snappy
  const dotX = useSpring(mouseX, { stiffness: 300, damping: 28 });
  const dotY = useSpring(mouseY, { stiffness: 300, damping: 28 });

  // Glow ring — laggier
  const glowX = useSpring(mouseX, { stiffness: 150, damping: 20 });
  const glowY = useSpring(mouseY, { stiffness: 150, damping: 20 });

  useEffect(() => {
    // Only show on fine-pointer devices (non-touch)
    const mq = window.matchMedia("(pointer: fine)");
    if (!mq.matches) return;
    setVisible(true);

    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mouseX, mouseY]);

  if (!visible) return null;

  return (
    <>
      {/* Glow ring */}
      <motion.div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          x: glowX,
          y: glowY,
          translateX: "-50%",
          translateY: "-50%",
          width: 36,
          height: 36,
          borderRadius: "50%",
          border: "1px solid rgba(168,85,247,0.5)",
          background: "rgba(168,85,247,0.06)",
          filter: "blur(4px)",
          zIndex: 9999,
          pointerEvents: "none",
        }}
      />

      {/* Dot */}
      <motion.div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
          width: 10,
          height: 10,
          borderRadius: "50%",
          background: "#a855f7",
          zIndex: 9999,
          pointerEvents: "none",
        }}
      />
    </>
  );
}
