"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Command, Moon, Sun, ChevronDown, Check, Sparkles, Layers, Cpu, TrendingDown, Mail, Terminal } from "lucide-react";
import { useTheme } from "@/shared/context/ThemeContext";

interface DynamicIslandProps {
  onOpenCommandPalette: () => void;
  actionFeedback?: string | null;
}

export function DynamicIsland({
  onOpenCommandPalette,
  actionFeedback,
}: DynamicIslandProps) {
  const { theme, toggleTheme } = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    setIsExpanded(false);
  };

  return (
    <div className="sticky top-3 z-40 flex justify-center px-4 w-full max-w-[1140px] mx-auto pointer-events-none select-none">
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 420, damping: 32 }}
        className={`pointer-events-auto overflow-hidden transition-colors duration-300 ${
          theme === "dark"
            ? "bg-[#000000]/92 text-white border border-white/15 shadow-[0_12px_40px_rgba(0,0,0,0.85)]"
            : "bg-white/95 text-[#1D1D1F] border border-black/10 shadow-[0_12px_36px_rgba(0,0,0,0.12)]"
        } ${isExpanded ? "rounded-[2rem] p-4 sm:p-5 w-full max-w-md" : "rounded-full px-4 py-2"}`}
      >
        {/* Compact Bar State */}
        {!isExpanded ? (
          <div className="flex items-center gap-3 text-xs font-mono">
            {/* Status Indicator */}
            <div
              onClick={() => setIsExpanded(true)}
              className="flex items-center gap-2 cursor-pointer group"
            >
              <span className="w-2 h-2 rounded-full bg-[#30D158] animate-pulse" />
              <span className="font-bold tracking-tight">VK</span>
              <span className="opacity-40">·</span>
              <span className="hidden sm:inline font-medium text-[11px] opacity-80 group-hover:opacity-100 transition-opacity">
                {actionFeedback || "Backend Developer — Python, DevOps & AI"}
              </span>
              <span className="sm:hidden font-medium text-[11px] opacity-80">
                {actionFeedback || "99.98% SLA"}
              </span>
            </div>

            <div className="w-[1px] h-3.5 bg-current opacity-20" />

            {/* Actions: Search, Theme, Expand */}
            <div className="flex items-center gap-1.5">
              <Link
                href="/terminal"
                className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#0A84FF]/10 hover:bg-[#0A84FF]/20 text-[#0A84FF] dark:text-[#32ADE6] border border-[#0A84FF]/20 text-[10px] font-mono font-semibold transition-all hover:scale-105 cursor-pointer"
                title="Switch to Terminal Mode (Neovim & Code Wall)"
              >
                <Terminal className="w-3 h-3" />
                <span className="hidden sm:inline">Terminal</span>
              </Link>

              <button
                onClick={onOpenCommandPalette}
                className="p-1.5 rounded-full hover:bg-current hover:bg-opacity-10 transition-colors cursor-pointer"
                title="Search (⌘K)"
                aria-label="Search (⌘K)"
              >
                <Command className="w-3.5 h-3.5 text-[#0A84FF] dark:text-[#32ADE6]" />
              </button>

              <button
                onClick={toggleTheme}
                className="p-1.5 rounded-full hover:bg-current hover:bg-opacity-10 transition-colors cursor-pointer"
                title={`Switch to ${theme === "dark" ? "Light" : "Dark"} Mode`}
                aria-label="Toggle iOS Appearance"
              >
                {theme === "dark" ? (
                  <Sun className="w-3.5 h-3.5 text-[#FF9F0A]" />
                ) : (
                  <Moon className="w-3.5 h-3.5 text-[#007AFF]" />
                )}
              </button>

              <button
                onClick={() => setIsExpanded(true)}
                className="p-1 rounded-full hover:bg-current hover:bg-opacity-10 transition-colors cursor-pointer text-xs"
                title="Expand Dynamic Island"
                aria-label="Expand Dynamic Island"
              >
                <ChevronDown className="w-3 h-3 opacity-60" />
              </button>
            </div>
          </div>
        ) : (
          /* Expanded Island View */
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-current border-opacity-10">
              <div className="flex items-center gap-2 text-xs font-mono">
                <span className="w-2.5 h-2.5 rounded-full bg-[#30D158] animate-pulse" />
                <span className="font-bold">Live System Activity</span>
              </div>
              <button
                onClick={() => setIsExpanded(false)}
                className="text-xs font-mono opacity-60 hover:opacity-100 px-2 py-0.5 rounded cursor-pointer"
              >
                Done
              </button>
            </div>

            {/* Quick Activity Status */}
            <div className={`p-3 rounded-2xl text-xs font-mono ${theme === "dark" ? "bg-white/[0.05]" : "bg-black/[0.04]"} space-y-1`}>
              <div className="flex justify-between font-semibold">
                <span>Production Health</span>
                <span className="text-[#30D158]">99.98% SLA Sustained</span>
              </div>
              <div className="text-[11px] opacity-70">
                FastAPI microservices &amp; Redis Pub/Sub cluster operating at zero loss.
              </div>
            </div>

            {/* Quick Navigation Inset List */}
            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              <button
                onClick={() => scrollTo("tile-syncrivo")}
                className={`p-2.5 rounded-xl text-left flex items-center gap-2 transition-colors cursor-pointer ${
                  theme === "dark" ? "hover:bg-white/[0.08] bg-white/[0.03]" : "hover:bg-black/[0.06] bg-black/[0.02]"
                }`}
              >
                <Layers className="w-3.5 h-3.5 text-[#32ADE6]" />
                <span className="truncate">SyncRivo Bridge</span>
              </button>

              <button
                onClick={() => scrollTo("tile-ocnora")}
                className={`p-2.5 rounded-xl text-left flex items-center gap-2 transition-colors cursor-pointer ${
                  theme === "dark" ? "hover:bg-white/[0.08] bg-white/[0.03]" : "hover:bg-black/[0.06] bg-black/[0.02]"
                }`}
              >
                <Cpu className="w-3.5 h-3.5 text-[#BF5AF2]" />
                <span className="truncate">OCNORA DAG</span>
              </button>

              <button
                onClick={() => scrollTo("tile-finops")}
                className={`p-2.5 rounded-xl text-left flex items-center gap-2 transition-colors cursor-pointer ${
                  theme === "dark" ? "hover:bg-white/[0.08] bg-white/[0.03]" : "hover:bg-black/[0.06] bg-black/[0.02]"
                }`}
              >
                <TrendingDown className="w-3.5 h-3.5 text-[#30D158]" />
                <span className="truncate">FinOps Simulator</span>
              </button>

              <button
                onClick={() => scrollTo("tile-outreach")}
                className={`p-2.5 rounded-xl text-left flex items-center gap-2 transition-colors cursor-pointer ${
                  theme === "dark" ? "hover:bg-white/[0.08] bg-white/[0.03]" : "hover:bg-black/[0.06] bg-black/[0.02]"
                }`}
              >
                <Mail className="w-3.5 h-3.5 text-[#0A84FF]" />
                <span className="truncate">Direct Contact</span>
              </button>
            </div>

            {/* Terminal Mode Alternate Experience */}
            <Link
              href="/terminal"
              className={`p-3 rounded-2xl flex items-center justify-between text-xs font-mono transition-all cursor-pointer border ${
                theme === "dark"
                  ? "bg-gradient-to-r from-cyan-950/40 to-blue-950/30 border-cyan-500/30 hover:border-cyan-400 text-white"
                  : "bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200 hover:border-blue-300 text-blue-950"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-cyan-500/20 flex items-center justify-center text-cyan-400">
                  <Terminal className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold flex items-center gap-1.5">
                    Terminal Mode
                    <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">Neovim</span>
                  </div>
                  <div className="text-[10px] opacity-70">Code wall, buffer tabs, :theme &amp; wheel nav</div>
                </div>
              </div>
              <span className="text-[11px] font-bold text-cyan-400">Open ↗</span>
            </Link>

            {/* Appearance Switcher Row */}
            <div className="flex items-center justify-between pt-2 border-t border-current border-opacity-10 text-xs font-mono">
              <span className="opacity-70">Appearance System:</span>
              <button
                onClick={toggleTheme}
                className={`px-3 py-1.5 rounded-full font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                  theme === "dark"
                    ? "bg-white text-black hover:bg-zinc-200"
                    : "bg-[#007AFF] text-white hover:bg-blue-600"
                }`}
              >
                {theme === "dark" ? (
                  <>
                    <Sun className="w-3 h-3 text-amber-500" />
                    <span>Switch to iOS Light</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-3 h-3" />
                    <span>Switch to iOS Dark</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
