"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import ScrambleText from "@/components/ui/ScrambleText";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
}

export default function SectionHeading({
  title,
  subtitle,
  centered = true,
}: SectionHeadingProps) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      className={cn("mb-0", centered && "text-center")}
    >
      <motion.h2
        variants={fadeInUp}
        className="text-4xl md:text-5xl font-bold mb-0"
        style={{ fontFamily: "var(--font-space-grotesk)" }}
      >
        <ScrambleText text={title} className="neon-gradient-text" />
      </motion.h2>
      {subtitle && (
        <motion.p
          variants={fadeInUp}
          className="text-base md:text-lg max-w-xl mx-auto leading-relaxed"
          style={{ color: "var(--text-secondary)" }}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
}

function cn(...classes: (string | undefined | false)[]) {
  return classes.filter(Boolean).join(" ");
}
