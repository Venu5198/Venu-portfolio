import React from "react";
import { Navbar } from "@/shared/components/Navbar";
import { GridBackground } from "@/shared/components/GridBackground";
import { HeroSection } from "@/features/hero/HeroSection";
import { ProjectsSection } from "@/features/projects/ProjectsSection";
import { ArchitectureSection } from "@/features/architecture/ArchitectureSection";
import { ArsenalSection } from "@/features/arsenal/ArsenalSection";
import { CertificationsSection } from "@/features/certifications/CertificationsSection";
import { ContactSection } from "@/features/contact/ContactSection";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#09090B] text-[#F4F4F5] selection:bg-cyan-500/30 selection:text-white">
      {/* Background Architectural Grid and Coordinates */}
      <GridBackground />

      {/* Floating System Dock Navbar */}
      <Navbar />

      {/* Hero Domain */}
      <HeroSection />

      {/* Flagship Case Studies & Bento Projects Domain */}
      <ProjectsSection />

      {/* Interactive Architecture Flow & Telemetry Domain */}
      <ArchitectureSection />

      {/* Tech Arsenal & Capabilities Domain */}
      <ArsenalSection />

      {/* Certifications, Honors & Education Domain */}
      <CertificationsSection />

      {/* Terminal Contact Domain & Footer */}
      <ContactSection />
    </main>
  );
}
