"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ExternalLink,
  Shield,
  Layers,
  Cpu,
  Activity,
  CheckCircle2,
  Server,
  Zap,
} from "lucide-react";
import { Project } from "@/shared/types/project";
import { TelemetryBadge } from "@/shared/components/TelemetryBadge";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [activeTab, setActiveTab] = useState<"highlights" | "architecture" | "stack">(
    "highlights"
  );

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", duration: 0.5, bounce: 0.15 }}
          className="relative w-full max-w-4xl max-h-[90vh] bg-[#0d0d12] border border-white/[0.12] rounded-3xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col z-10"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.08] bg-[#121218]/90">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-cyan-400 font-semibold uppercase tracking-wider">
                [{project.category}]
              </span>
              <TelemetryBadge
                status="online"
                label={project.statusTelemetry.status}
                subLabel={project.statusTelemetry.uptime}
              />
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-zinc-400 hover:text-white hover:bg-white/[0.08] transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Content Body */}
          <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
            {/* Title & Live Link */}
            <div className="space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {project.title}
                </h2>
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20 font-mono text-xs font-semibold transition-all"
                  >
                    <span>Visit Live Platform</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
              <p className="text-zinc-400 text-sm sm:text-base">{project.tagline}</p>
              <div className="inline-block px-3 py-1 rounded-md bg-white/[0.04] border border-white/[0.06] font-mono text-xs text-zinc-300">
                Role: <span className="text-emerald-400">{project.role}</span>
              </div>
            </div>

            {/* Metrics Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {project.metrics.map((m, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06]"
                >
                  <div className="text-[11px] font-mono uppercase text-zinc-500">
                    {m.label}
                  </div>
                  <div className="text-base sm:text-lg font-mono font-bold text-white mt-0.5">
                    {m.value}
                  </div>
                </div>
              ))}
            </div>

            {/* Tabs Navigation */}
            <div className="flex items-center gap-2 border-b border-white/[0.08] pb-1 font-mono text-xs">
              <button
                onClick={() => setActiveTab("highlights")}
                className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                  activeTab === "highlights"
                    ? "bg-white/[0.08] text-white border-b-2 border-cyan-400"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                Key Achievements
              </button>
              <button
                onClick={() => setActiveTab("architecture")}
                className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                  activeTab === "architecture"
                    ? "bg-white/[0.08] text-white border-b-2 border-emerald-400"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                <Layers className="w-3.5 h-3.5 text-emerald-400" />
                Architecture Topology
              </button>
              <button
                onClick={() => setActiveTab("stack")}
                className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                  activeTab === "stack"
                    ? "bg-white/[0.08] text-white border-b-2 border-amber-400"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                <Cpu className="w-3.5 h-3.5 text-amber-400" />
                Tech Stack
              </button>
            </div>

            {/* Tab: Highlights */}
            {activeTab === "highlights" && (
              <div className="space-y-3">
                <p className="text-sm text-zinc-300 leading-relaxed font-light">
                  {project.overview}
                </p>
                <div className="space-y-2.5 pt-2">
                  {project.highlights.map((h, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]"
                    >
                      <Zap className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span className="text-sm text-zinc-300 leading-relaxed">{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab: Architecture */}
            {activeTab === "architecture" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.architecture.map((arch, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] space-y-2"
                  >
                    <div className="font-mono text-[11px] text-cyan-400 uppercase tracking-wider">
                      {arch.domain}
                    </div>
                    <div className="font-semibold text-white text-sm">{arch.title}</div>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      {arch.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {arch.badges.map((b, bIdx) => (
                        <span
                          key={bIdx}
                          className="px-2 py-0.5 rounded bg-white/[0.04] text-[10px] font-mono text-zinc-300"
                        >
                          {b}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Tab: Stack */}
            {activeTab === "stack" && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((item, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 rounded-lg bg-white/[0.05] border border-white/[0.08] text-xs font-mono text-zinc-200"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
