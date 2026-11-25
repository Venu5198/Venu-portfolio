"use client";

import React, { useState } from "react";
import { TopStatusStrip } from "./TopStatusStrip";
import { Tile1Identity } from "./Tile1Identity";
import { Tile2Telemetry } from "./Tile2Telemetry";
import { Tile3SyncRivo } from "./Tile3SyncRivo";
import { Tile4Credentials } from "./Tile4Credentials";
import { Tile5FinOpsSimulator } from "./Tile5FinOpsSimulator";
import { Tile6Ocnora } from "./Tile6Ocnora";
import { Tile7DeploymentStack } from "./Tile7DeploymentStack";
import { Tile8Outreach } from "./Tile8Outreach";
import { BentoModal } from "./BentoModal";
import { CommandPalette } from "./CommandPalette";
import { FloatingDock } from "./FloatingDock";

export function BentoGrid() {
  const [activeModalProject, setActiveModalProject] = useState<string | null>(null);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  const handleNavigateToOutreach = () => {
    const el = document.getElementById("tile-outreach");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#000000] text-[#F5F5F7] pb-32">
      {/* Non-colliding Top Status Strip */}
      <TopStatusStrip
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
      />

      {/* Main Centered 12-Column Apple Bento Grid (max-w-[1140px]) */}
      <main className="w-full max-w-[1140px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-12 gap-4">
          {/* Tile 1 (7 Cols) — Identity, Portrait & ⌘K Trigger */}
          <Tile1Identity
            onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
            onNavigateToOutreach={handleNavigateToOutreach}
          />

          {/* Tile 2 (5 Cols) — Production Telemetry (2×2 Gauges) */}
          <Tile2Telemetry />

          {/* Tile 3 (7 Cols) — Flagship Case Study 1: SyncRivo */}
          <Tile3SyncRivo
            onOpenModal={(id) => setActiveModalProject(id)}
          />

          {/* Tile 4 (5 Cols) — Verified Credentials & Honors */}
          <Tile4Credentials />

          {/* Tile 5 (5 Cols) — Interactive GCP FinOps Simulator Widget */}
          <Tile5FinOpsSimulator />

          {/* Tile 6 (7 Cols) — Flagship Case Study 2: OCNORA */}
          <Tile6Ocnora
            onOpenModal={(id) => setActiveModalProject(id)}
          />

          {/* Tile 7 (8 Cols) — Deployment Switcher & Stack Matrix */}
          <Tile7DeploymentStack />

          {/* Tile 8 (4 Cols) — Direct Outreach & Contacts */}
          <Tile8Outreach />
        </div>

        {/* Footer info line */}
        <footer className="mt-12 pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-[#86868B] select-none">
          <div>
            © 2026 Venu K. Backend Developer — Python, DevOps &amp; AI.
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[#30D158] font-semibold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#30D158]" />
              100% Operational SLA
            </span>
            <span className="text-white/20">·</span>
            <span>Tirupati, AP · India</span>
          </div>
        </footer>
      </main>

      {/* macOS Floating Dock */}
      <FloatingDock
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        onOpenModal={(id) => setActiveModalProject(id)}
      />

      {/* Apple visionOS Spring Sheet Modal */}
      <BentoModal
        projectId={activeModalProject}
        onClose={() => setActiveModalProject(null)}
      />

      {/* ⌘K Command Palette */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onOpenModal={(id) => setActiveModalProject(id)}
      />
    </div>
  );
}
