"use client";

import { useEffect, useRef } from "react";

export default function NoiseOverlay() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Small fixed canvas — CSS stretches it, giving a coarse grain feel
    canvas.width = 256;
    canvas.height = 256;

    let rafId: number;
    let tick = 0;

    const draw = () => {
      tick++;
      // Redraw every 3 frames (~20 fps) for animated grain without burning CPU
      if (tick % 3 === 0) {
        const { width: w, height: h } = canvas;
        const imageData = ctx.createImageData(w, h);
        const d = imageData.data;
        for (let i = 0; i < d.length; i += 4) {
          const v = (Math.random() * 255) | 0;
          d[i] = d[i + 1] = d[i + 2] = v;
          d[i + 3] = (Math.random() * 22) | 0; // max ~9% opacity per grain pixel
        }
        ctx.putImageData(imageData, 0, 0);
      }
      rafId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 6,
        opacity: 0.3,
        mixBlendMode: "overlay",
      }}
    />
  );
}
