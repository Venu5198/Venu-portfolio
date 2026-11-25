"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ExternalLink,
  Shield,
  Layers,
  Activity,
  CheckCircle2,
  Server,
  Code2,
} from "lucide-react";
import { Project } from "@/shared/types/project";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

type TabType = "context" | "architecture" | "reliability" | "stack";

const springTransition = {
  type: "spring" as const,
  stiffness: 300,
  damping: 28,
};

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [activeTab, setActiveTab] = useState<TabType>("context");

  // Prevent scroll jump and lock background scroll smoothly
  useEffect(() => {
    if (!project) return;
    const scrollY = window.scrollY;
    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;

    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
      window.scrollTo({ top: scrollY, behavior: "instant" });
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  const breakdown = project.engineeringBreakdown;

  const tabs: { id: TabType; label: string; icon: React.ReactNode }[] = [
    { id: "context", label: "Overview & Scale", icon: <Activity className="w-3.5 h-3.5" /> },
    { id: "architecture", label: "Architecture", icon: <Layers className="w-3.5 h-3.5" /> },
    { id: "reliability", label: "Reliability & Guards", icon: <Shield className="w-3.5 h-3.5" /> },
    { id: "stack", label: "Tech Stack", icon: <Code2 className="w-3.5 h-3.5" /> },
  ];

  return (
    <AnimatePresence>
      <div
        role="dialog"
        aria-modal="true"
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
      >
        {/* Apple Blur Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-2xl"
        />

        {/* Apple Spatial Glass Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 16 }}
          transition={springTransition}
          className="relative w-full max-w-4xl max-h-[90vh] rounded-[2.5rem] overflow-hidden flex flex-col z-10 bg-[#0D0D14]/95 border border-white/[0.14] shadow-[0_25px_80px_rgba(0,0,0,0.95)] text-white"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-6 py-4.5 border-b border-white/[0.08] bg-white/[0.02]">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-semibold text-cyan-400 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20">
                {project.category}
              </span>
              <span className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                {project.statusTelemetry.status}
              </span>
            </div>

            <motion.button
              onClick={onClose}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              className="p-2 rounded-full text-zinc-400 hover:text-white hover:bg-white/[0.08] transition-colors cursor-pointer"
              aria-label="Close modal"
              title="Close (Esc)"
            >
              <X className="w-5 h-5" />
            </motion.button>
          </div>

          {/* Modal Content Body */}
          <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
            {/* Title & Live Link */}
            <div className="space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white">
                  {project.title}
                </h2>
                {project.liveUrl && (
                  <motion.a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium bg-white text-black hover:bg-zinc-200 transition-colors shadow-sm"
                  >
                    <span>Visit Live Platform</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </motion.a>
                )}
              </div>

              <p className="text-sm sm:text-base leading-relaxed text-zinc-300 font-light">
                {project.tagline}
              </p>

              <div className="inline-block px-3.5 py-1.5 rounded-full font-mono text-xs bg-white/[0.04] border border-white/[0.08] text-zinc-300">
                Role: <span className="text-emerald-400 font-semibold">{project.role}</span>
              </div>
            </div>

            {/* Metrics Overview Ribbon */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {(breakdown?.contextScale.metrics ?? project.metrics).map((m, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06]"
                >
                  <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">
                    {m.label}
                  </div>
                  <div className="text-base sm:text-lg font-mono text-white font-bold mt-1">
                    {m.value}
                  </div>
                </div>
              ))}
            </div>

            {/* Fluid Segmented Tabs Bar */}
            <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-white/[0.04] border border-white/[0.08]">
              {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`relative px-4 py-2 rounded-xl text-xs font-medium transition-colors flex items-center gap-2 cursor-pointer ${
                      isActive ? "text-black font-semibold" : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="modalActiveTabPill"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        className="absolute inset-0 rounded-xl bg-white -z-10 shadow-md"
                      />
                    )}
                    {tab.icon}
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Tab 1: Context & Scale */}
            {activeTab === "context" && breakdown && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="space-y-4"
              >
                <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-2">
                  <div className="text-xs font-mono uppercase text-cyan-400 font-semibold">
                    The Problem &amp; Systems Challenge
                  </div>
                  <p className="text-sm text-zinc-300 font-light leading-relaxed">
                    {breakdown.contextScale.problem}
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-2">
                  <div className="text-xs font-mono uppercase text-emerald-400 font-semibold">
                    Engineering Scale &amp; Scope
                  </div>
                  <p className="text-sm text-zinc-300 font-light leading-relaxed">
                    {breakdown.contextScale.scaleSummary}
                  </p>
                  <ul className="list-disc list-inside text-xs text-zinc-400 font-light space-y-1 pt-1">
                    {breakdown.contextScale.scopePoints.map((pt, idx) => (
                      <li key={idx}>{pt}</li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}

            {/* Tab 2: Architecture Decisions */}
            {activeTab === "architecture" && breakdown && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="space-y-4"
              >
                {breakdown.coreDecisions.map((dec, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-3"
                  >
                    <div className="text-sm font-bold text-white flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                        <span>{dec.title}</span>
                      </div>
                      <span className="text-[10px] font-mono text-zinc-500 uppercase">{dec.category}</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-light">
                      <div className="space-y-1">
                        <span className="text-zinc-500 font-mono uppercase block text-[10px]">
                          Choice Made
                        </span>
                        <p className="text-zinc-300 leading-relaxed">{dec.decision}</p>
                      </div>
                      <div className="space-y-1">
                        <span className="text-zinc-500 font-mono uppercase block text-[10px]">
                          Trade-Off Evaluated
                        </span>
                        <p className="text-zinc-300 leading-relaxed">{dec.tradeoff}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            {/* Tab 3: Reliability & Security */}
            {activeTab === "reliability" && breakdown && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="space-y-4"
              >
                <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-2">
                  <div className="text-xs font-mono uppercase text-purple-400 font-semibold">
                    Production Uptime SLA &amp; Standards
                  </div>
                  <p className="text-sm text-zinc-300 font-light leading-relaxed">
                    {breakdown.reliabilitySecurity.uptimeSla}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {breakdown.reliabilitySecurity.resilienceMechanisms.map((mech, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] text-xs text-zinc-300 font-light leading-relaxed space-y-1"
                    >
                      <div className="font-semibold text-white flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{mech.title}</span>
                      </div>
                      <p className="text-zinc-400 text-[11px] leading-normal">{mech.detail}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Tab 4: Tech Stack */}
            {activeTab === "stack" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="space-y-4"
              >
                <div className="text-xs font-mono uppercase text-zinc-400 tracking-wider">
                  Technologies Deployed in Production
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {project.stack.map((item, idx) => (
                    <span
                      key={idx}
                      className="px-4 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-zinc-200"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
