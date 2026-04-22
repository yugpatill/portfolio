"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { HiArrowTopRightOnSquare } from "react-icons/hi2";
import { SiGoogle, SiAnthropic } from "react-icons/si";
import SectionHeading from "@/components/ui/SectionHeading";
import { certifications } from "@/data/certifications";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { IconType } from "react-icons";

const containerStyle: React.CSSProperties = {
  width: "100%",
  padding: "0 5%",
  display: "flex",
  flexDirection: "column",
  gap: "1.75rem",
};

const issuerIconMap: Record<string, { icon: IconType; color: string }> = {
  "Google Career Certificates": { icon: SiGoogle,    color: "#4285F4" },
  "Anthropic":                  { icon: SiAnthropic, color: "#cc785c" },
};

export default function CertificationsSection() {
  return (
    <section id="certifications" style={{ width: "100%" }}>
      <div style={containerStyle}>
        <SectionHeading title="Certifications" />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "1.25rem",
          }}
        >
          {certifications.map((cert) => {
            const issuer = issuerIconMap[cert.issuer];
            const IssuerIcon = issuer?.icon;
            const iconColor = issuer?.color ?? cert.accentColor;

            return (
              <CertCard
                key={cert.id}
                cert={cert}
                IssuerIcon={IssuerIcon}
                iconColor={iconColor}
              />
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

type CertCardProps = {
  cert: (typeof certifications)[number];
  IssuerIcon: IconType | undefined;
  iconColor: string;
};

function CertCard({ cert, IssuerIcon, iconColor }: CertCardProps) {
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const springRX = useSpring(rotateX, { stiffness: 200, damping: 20 });
  const springRY = useSpring(rotateY, { stiffness: 200, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    rotateX.set((y - rect.height / 2) / rect.height * -8);
    rotateY.set((x - rect.width / 2) / rect.width * 8);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    rotateX.set(0);
    rotateY.set(0);
    (e.currentTarget as HTMLDivElement).style.borderColor = "var(--border-card-alt)";
    (e.currentTarget as HTMLDivElement).style.boxShadow = "var(--shadow-card-alt)";
  };

  return (
    <motion.div
      variants={fadeInUp}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = `${cert.accentColor}50`;
        (e.currentTarget as HTMLDivElement).style.boxShadow = `0 12px 40px ${cert.accentColor}18`;
      }}
      style={{
        rotateX: springRX,
        rotateY: springRY,
        transformPerspective: 800,
        display: "flex",
        flexDirection: "column",
        cursor: "default",
        background: "var(--bg-card-alt)",
        border: "1px solid var(--border-card-alt)",
        borderRadius: "1rem",
        padding: "1.5rem 1.75rem 1.5rem",
        boxShadow: "var(--shadow-card-alt)",
        transition: "border-color 0.25s ease, box-shadow 0.25s ease",
      }}
    >
      {/* Provider icon */}
      <div
        style={{
          width: "2.4rem",
          height: "2.4rem",
          borderRadius: "0.6rem",
          background: `${iconColor}18`,
          border: `1px solid ${iconColor}30`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "1.1rem",
          flexShrink: 0,
        }}
      >
        {IssuerIcon && (
          <IssuerIcon style={{ width: "1.1rem", height: "1.1rem", color: iconColor }} />
        )}
      </div>

      {/* Title */}
      <h3
        className="font-bold text-white leading-snug"
        style={{ fontFamily: "var(--font-space-grotesk)", fontSize: "0.9rem", marginBottom: "0.5rem", color: "var(--text-primary)" }}
      >
        {cert.title}
      </h3>

      <p className="text-xs" style={{ color: "var(--text-dim)", marginBottom: "0.75rem" }}>
        {cert.issuer}
      </p>

      {/* Description */}
      <p style={{
        fontSize: "0.73rem",
        color: "var(--text-desc)",
        lineHeight: 1.65,
        flex: 1,
        marginBottom: "1rem",
      }}>
        {cert.description}
      </p>

      {/* Footer */}
      <div
        className="flex items-center justify-between pt-3"
        style={{ borderTop: "1px solid var(--divider-card)" }}
      >
        <span className="text-xs font-mono" style={{ color: "var(--text-muted)" }}>
          {cert.date}
        </span>
        <a
          href={cert.credentialUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-xs font-semibold transition-colors duration-200"
          style={{ color: cert.accentColor, opacity: 0.7 }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.7")}
        >
          Verify
          <HiArrowTopRightOnSquare style={{ width: "0.7rem", height: "0.7rem" }} />
        </a>
      </div>
    </motion.div>
  );
}
