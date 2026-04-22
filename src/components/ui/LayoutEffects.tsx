"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";

const GradientOrbs  = dynamic(() => import("@/components/ui/GradientOrbs"),    { ssr: false });
const CursorGlow    = dynamic(() => import("@/components/ui/CursorGlow"),      { ssr: false });
const NoiseOverlay  = dynamic(() => import("@/components/ui/NoiseOverlay"),    { ssr: false });

export default function LayoutEffects() {
  useEffect(() => {
    // Disable browser scroll restoration so it can't jump to a previous position.
    // scroll-snap then has nothing to fight against and always starts at the top.
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  return (
    <>
      <GradientOrbs />
      <CursorGlow />
      <NoiseOverlay />
    </>
  );
}
