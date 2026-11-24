"use client";

import React, { useState } from "react";
import { VibeHeroSection } from "./VibeHeroSection";
import { VibeProjectsSection } from "./VibeProjectsSection";
import { VibeArchitectureSection } from "./VibeArchitectureSection";
import { VibeArsenalSection } from "./VibeArsenalSection";
import { VibeCertificationsSection } from "./VibeCertificationsSection";
import { VibeContactSection } from "./VibeContactSection";
import { ProjectModal } from "@/features/projects/ProjectModal";
import { Project } from "@/shared/types/project";

export function VibeLayout() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <div className="relative min-h-screen bg-[#FAF8F5] text-[#18181B] selection:bg-[#bef264] selection:text-black">
      {/* Vibe Hero Section */}
      <VibeHeroSection />

      {/* Vibe Projects Showcase */}
      <VibeProjectsSection onSelectProject={setSelectedProject} />

      {/* Vibe Systems Architecture Pipeline */}
      <VibeArchitectureSection />

      {/* Vibe Sticker Arsenal */}
      <VibeArsenalSection />

      {/* Vibe Official Credentials & Honors */}
      <VibeCertificationsSection />

      {/* Vibe Contact Station & Footer */}
      <VibeContactSection />

      {/* Shared Detail Modal */}
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </div>
  );
}
