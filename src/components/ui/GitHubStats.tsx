"use client";

import { useEffect, useState } from "react";

type GitHubUser = {
  public_repos: number;
  followers: number;
};

type Stat = {
  emoji: string;
  value: string | number;
  label: string;
};

export default function GitHubStats() {
  const [data, setData] = useState<GitHubUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("https://api.github.com/users/yugpatill")
      .then((r) => {
        if (!r.ok) throw new Error("fetch failed");
        return r.json() as Promise<GitHubUser>;
      })
      .then((d) => {
        setData(d);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  if (error) return null;

  const stats: Stat[] = loading
    ? [
        { emoji: "📦", value: "—", label: "Repos" },
        { emoji: "⭐", value: "—", label: "Stars" },
        { emoji: "👥", value: "—", label: "Followers" },
      ]
    : [
        { emoji: "📦", value: data?.public_repos ?? 0, label: "Repos" },
        { emoji: "⭐", value: 12, label: "Stars" },
        { emoji: "👥", value: data?.followers ?? 0, label: "Followers" },
      ];

  return (
    <div
      style={{
        display: "inline-flex",
        gap: "1.5rem",
        background: "linear-gradient(135deg, rgba(14,20,50,0.9) 0%, rgba(8,12,32,0.95) 100%)",
        border: "1px solid rgba(168,85,247,0.2)",
        borderRadius: "0.75rem",
        padding: "0.75rem 1.5rem",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
      }}
    >
      {stats.map((s, i) => (
        <div
          key={i}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.15rem",
          }}
        >
          {loading ? (
            <div
              style={{
                width: "2rem",
                height: "1.25rem",
                borderRadius: "0.25rem",
                background: "rgba(255,255,255,0.08)",
                animation: "shimmer 1.5s infinite",
              }}
            />
          ) : (
            <span
              style={{
                fontSize: "1.1rem",
                fontWeight: 700,
                background: "linear-gradient(135deg, #a855f7, #06b6d4)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                fontFamily: "var(--font-space-grotesk)",
              }}
            >
              {s.emoji}&nbsp;{s.value}
            </span>
          )}
          <span
            style={{
              fontSize: "0.65rem",
              color: "rgba(255,255,255,0.35)",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
            }}
          >
            {s.label}
          </span>
        </div>
      ))}

      <style>{`
        @keyframes shimmer {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.8; }
        }
      `}</style>
    </div>
  );
}
