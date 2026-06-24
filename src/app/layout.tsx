import type { Metadata } from "next";
import { Inter, Space_Grotesk, Orbitron } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import LayoutEffects from "@/components/ui/LayoutEffects";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  display: "swap",
  weight: ["600"],
});

export const metadata: Metadata = {
  title: "Yugandhar Patil | ML Engineer & Data Scientist",
  description:
    "Portfolio of Yugandhar Patil — MS CS student at NJIT specializing in Machine Learning, Generative AI, RAG systems, and Data Science.",
  openGraph: {
    title: "Yugandhar Patil | ML Engineer & Data Scientist",
    description:
      "Building ML systems and GenAI applications. MS Computer Science @ NJIT. Open to new opportunities.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} ${orbitron.variable}`}>
      <body>
        <LayoutEffects />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
