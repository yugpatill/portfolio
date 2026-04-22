"use client";

import dynamic from "next/dynamic";

const SectionDots = dynamic(() => import("@/components/ui/SectionDots"), { ssr: false });
const BackToTop = dynamic(() => import("@/components/ui/BackToTop"), { ssr: false });

export default function ClientOverlays() {
  return (
    <>
      <SectionDots />
      <BackToTop />
    </>
  );
}
