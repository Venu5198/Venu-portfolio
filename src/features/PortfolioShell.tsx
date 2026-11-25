"use client";

import React from "react";
import { Navbar } from "@/shared/components/Navbar";
import { HeroSection } from "@/features/hero/HeroSection";
import { ProjectsSection } from "@/features/projects/ProjectsSection";
import { ArchitectureSection } from "@/features/architecture/ArchitectureSection";
import { ArsenalSection } from "@/features/arsenal/ArsenalSection";
import { CertificationsSection } from "@/features/certifications/CertificationsSection";
import { ContactSection } from "@/features/contact/ContactSection";

export function PortfolioShell() {
  return (
    <main className="relative min-h-screen w-full max-w-full bg-[#000000] text-[#F5F5F7] selection:bg-cyan-500/25 selection:text-white">
      {/* Floating Dynamic Island Liquid Glass Navbar */}
      <Navbar />

      {/* Unified Apple Spatial Layout */}
      <div className="relative w-full">
        <HeroSection />
        <ProjectsSection />
        <ArchitectureSection />
        <ArsenalSection />
        <CertificationsSection />
        <ContactSection />
      </div>
    </main>
  );
}
