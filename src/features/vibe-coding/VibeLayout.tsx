"use client";

import React, { useState } from "react";
import { VibeHeroSection } from "./VibeHeroSection";
import { VibeProjectsSection } from "./VibeProjectsSection";
import { VibeArchitectureSection } from "./VibeArchitectureSection";
import { VibeArsenalSection } from "./VibeArsenalSection";
import { VibeCertificationsSection } from "./VibeCertificationsSection";
import { VibeContactSection } from "./VibeContactSection";
import { VibeMarquee } from "./VibeMarquee";
import { StudioCursor } from "./StudioCursor";
import { ProjectModal } from "@/features/projects/ProjectModal";
import { Project } from "@/shared/types/project";

export function VibeLayout() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <div className="relative min-h-screen w-full max-w-full overflow-x-clip bg-[#F4F4F0] text-[#0A0A0A] selection:bg-[#C6FF00] selection:text-[#0A0A0A]">
      {/* Studio / Comic Custom Mouse Cursor (Desktop Light Mode Only) */}
      <StudioCursor />

      {/* Vibe Hero Section */}
      <VibeHeroSection />

      {/* Vibe Projects Showcase */}
      <VibeProjectsSection onSelectProject={setSelectedProject} />

      {/* Vibe Systems Architecture Pipeline */}
      <VibeArchitectureSection />

      {/* Kinetic Marquee Ticker 02 */}
      <VibeMarquee
        items={[
          "BATTLE-TESTED TOOLING 🛠️",
          "KUBERNETES & DOCKER FLEET 🐳",
          "PROMETHEUS & GRAFANA 📊",
          "AWS CERTIFIED DEVOPS PRO 🏆",
          "CKA KUBERNETES ADMIN ☸️",
          "TERRAFORM INFRA AS CODE 🏗️",
          "FASTAPI + ASYNCIO ⚡",
          "BUILT WITH TEAM 🤝",
        ]}
        rotate="rotate-1"
        direction="right"
        color="#FF4D00"
      />

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
