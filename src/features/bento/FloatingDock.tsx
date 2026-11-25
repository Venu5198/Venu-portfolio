"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  User,
  Activity,
  Layers,
  Award,
  TrendingDown,
  Cpu,
  Mail,
  Command,
  Sun,
  Moon,
} from "lucide-react";
import { useTheme } from "@/shared/context/ThemeContext";

interface FloatingDockProps {
  onOpenCommandPalette: () => void;
  onOpenModal: (projectId: string) => void;
}

export function FloatingDock({
  onOpenCommandPalette,
  onOpenModal,
}: FloatingDockProps) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const dockItems = [
    {
      id: "identity",
      label: "Profile",
      icon: User,
      action: () => scrollTo("tile-identity"),
    },
    {
      id: "telemetry",
      label: "Telemetry",
      icon: Activity,
      action: () => scrollTo("tile-telemetry"),
    },
    {
      id: "syncrivo",
      label: "SyncRivo",
      icon: Layers,
      action: () => scrollTo("tile-syncrivo"),
    },
    {
      id: "credentials",
      label: "Credentials",
      icon: Award,
      action: () => scrollTo("tile-credentials"),
    },
    {
      id: "finops",
      label: "FinOps",
      icon: TrendingDown,
      action: () => scrollTo("tile-finops"),
    },
    {
      id: "ocnora",
      label: "OCNORA AI",
      icon: Cpu,
      action: () => scrollTo("tile-ocnora"),
    },
    {
      id: "contact",
      label: "Contact",
      icon: Mail,
      action: () => scrollTo("tile-outreach"),
    },
  ];

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 select-none">
      <div
        className={`flex items-center gap-1 sm:gap-1.5 px-3 sm:px-4 py-2 rounded-full border shadow-[0_16px_40px_rgba(0,0,0,0.4)] backdrop-blur-2xl transition-colors duration-300 ${
          isDark
            ? "bg-[#1C1C1E]/80 border-white/15 text-[#A1A1AA]"
            : "bg-white/90 border-black/10 text-[#52525B] shadow-lg"
        }`}
      >
        {dockItems.map((item) => {
          const Icon = item.icon;
          return (
            <motion.button
              key={item.id}
              onClick={item.action}
              whileHover={{ scale: 1.15, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className={`p-2 sm:p-2.5 rounded-full transition-colors cursor-pointer group relative ${
                isDark
                  ? "hover:text-[#F5F5F7] hover:bg-white/10"
                  : "hover:text-[#1D1D1F] hover:bg-black/5"
              }`}
              aria-label={item.label}
              title={item.label}
            >
              <Icon className="w-4 h-4" />
              <span className="sr-only">{item.label}</span>
            </motion.button>
          );
        })}

        <div className="w-[1px] h-4 bg-current opacity-20 mx-0.5" />

        {/* ⌘K Trigger inside dock */}
        <motion.button
          onClick={onOpenCommandPalette}
          whileHover={{ scale: 1.12, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className={`p-2 sm:p-2.5 rounded-full transition-colors cursor-pointer flex items-center gap-1 ${
            isDark
              ? "text-[#32ADE6] hover:bg-white/10"
              : "text-[#007AFF] hover:bg-black/5"
          }`}
          aria-label="Command Palette"
          title="Command Palette (⌘K)"
        >
          <Command className="w-4 h-4" />
          <span className="text-[10px] font-mono font-semibold hidden sm:inline">⌘K</span>
        </motion.button>

        {/* Appearance Toggle inside dock */}
        <motion.button
          onClick={toggleTheme}
          whileHover={{ scale: 1.12, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className={`p-2 sm:p-2.5 rounded-full transition-colors cursor-pointer ${
            isDark
              ? "text-[#FF9F0A] hover:bg-white/10"
              : "text-[#007AFF] hover:bg-black/5"
          }`}
          aria-label="Toggle iOS Appearance"
          title={`Switch to ${isDark ? "Light" : "Dark"} Mode`}
        >
          {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </motion.button>
      </div>
    </div>
  );
}
