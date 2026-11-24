"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/shared/context/ThemeContext";
import { Navbar } from "@/shared/components/Navbar";
import { GridBackground } from "@/shared/components/GridBackground";
import { HeroSection } from "@/features/hero/HeroSection";
import { ProjectsSection } from "@/features/projects/ProjectsSection";
import { ArchitectureSection } from "@/features/architecture/ArchitectureSection";
import { ArsenalSection } from "@/features/arsenal/ArsenalSection";
import { CertificationsSection } from "@/features/certifications/CertificationsSection";
import { ContactSection } from "@/features/contact/ContactSection";
import { VibeLayout } from "@/features/vibe-coding/VibeLayout";

export function PortfolioShell() {
  const { theme } = useTheme();

  return (
    <main
      className={`relative min-h-screen transition-colors duration-300 ${
        theme === "light"
          ? "bg-[#F4F4F0] text-[#0A0A0A]"
          : "bg-[#09090B] text-[#F4F4F5] selection:bg-cyan-500/30 selection:text-white"
      }`}
    >
      {/* Floating Navbar (with Theme Toggle) */}
      <Navbar />

      {/* Dual Layout: Gen-Z Vibe Coding (Light) vs. Engineering Console (Dark) with smooth cross-fade */}
      <AnimatePresence mode="wait">
        <motion.div
          key={theme}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.28, ease: "easeInOut" }}
        >
          {theme === "light" ? (
            <VibeLayout />
          ) : (
            <div className="relative">
              <GridBackground />
              <HeroSection />
              <ProjectsSection />
              <ArchitectureSection />
              <ArsenalSection />
              <CertificationsSection />
              <ContactSection />
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </main>
  );
}
