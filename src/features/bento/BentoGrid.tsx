"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { DynamicIsland } from "./DynamicIsland";
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
import { useTheme } from "@/shared/context/ThemeContext";

export function BentoGrid() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [activeModalProject, setActiveModalProject] = useState<string | null>(null);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [actionFeedback, setActionFeedback] = useState<string | null>(null);

  const handleNavigateToOutreach = () => {
    const el = document.getElementById("tile-outreach");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const isModalOrPaletteOpen = !!activeModalProject || isCommandPaletteOpen;

  return (
    <div
      className={`relative min-h-screen transition-colors duration-300 pb-36 ${
        isDark ? "bg-[#050507] text-[#F5F5F7]" : "bg-[#F2F2F7] text-[#1D1D1F]"
      }`}
    >
      {/* iOS Dynamic Island / Live Activity Pill */}
      <DynamicIsland
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        actionFeedback={actionFeedback}
      />

      {/* Main Apple Canvas with iOS Sheet Background Recession Effect */}
      <motion.div
        animate={{
          scale: isModalOrPaletteOpen ? 0.955 : 1,
          filter: isModalOrPaletteOpen ? "brightness(0.65) blur(1.5px)" : "brightness(1) blur(0px)",
          borderRadius: isModalOrPaletteOpen ? "2rem" : "0rem",
        }}
        transition={{ type: "spring", stiffness: 350, damping: 32 }}
        className="w-full transition-all duration-300 origin-top overflow-hidden"
      >
        <main className="w-full max-w-[1140px] mx-auto px-4 sm:px-6 pt-4">
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

            {/* Tile 7 (8 Cols) — Deployment Switcher & Stack Matrix (with 0.25x Slow-Mo) */}
            <Tile7DeploymentStack />

            {/* Tile 8 (4 Cols) — Direct Outreach & Contacts */}
            <Tile8Outreach />
          </div>

          {/* iOS-Style Grouped Footer */}
          <footer
            className={`mt-14 pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono select-none ${
              isDark ? "border-white/[0.08] text-[#86868B]" : "border-black/[0.08] text-[#52525B]"
            }`}
          >
            <div>
              © 2026 Venu K. Backend Developer — Python, DevOps &amp; AI.
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[#30D158] font-semibold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#30D158]" />
                100% Operational SLA
              </span>
              <span className="opacity-30">·</span>
              <span>Tirupati, AP · India</span>
            </div>
          </footer>
        </main>
      </motion.div>

      {/* macOS / iOS Floating Dock */}
      <FloatingDock
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        onOpenModal={(id) => setActiveModalProject(id)}
      />

      {/* iOS visionOS Spring Sheet Modal */}
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
