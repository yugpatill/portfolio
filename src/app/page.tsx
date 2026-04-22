import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollProgressBar from "@/components/ui/ScrollProgressBar";
import HeroSection from "@/components/sections/HeroSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import SkillsSection from "@/components/sections/SkillsSection";
import CertificationsSection from "@/components/sections/CertificationsSection";
import EducationSection from "@/components/sections/EducationSection";
import ContactSection from "@/components/sections/ContactSection";
import ClientOverlays from "@/components/ui/ClientOverlays";

export default function Home() {
  return (
    <>
      <ClientOverlays />
      <ScrollProgressBar />
      <Navbar />
      <main>
        <div className="snap-section" style={{ padding: 0, justifyContent: "center" }}><HeroSection /></div>
        <div className="snap-section" style={{ paddingTop: "4.5rem", justifyContent: "center" }}><ProjectsSection /></div>
        <div className="snap-section" style={{ paddingTop: "4.5rem", justifyContent: "center" }}><SkillsSection /></div>
        <div className="snap-section" style={{ paddingTop: "4.5rem", justifyContent: "center" }}><CertificationsSection /></div>
        <div className="snap-section" style={{ paddingTop: "4.5rem", justifyContent: "center" }}><EducationSection /></div>
        <div className="snap-section" style={{ paddingTop: "4.5rem", justifyContent: "space-between" }}>
          <div style={{ flex: 1, display: "flex", alignItems: "center" }}>
            <ContactSection />
          </div>
          <Footer />
        </div>
      </main>
    </>
  );
}
