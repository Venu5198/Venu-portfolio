"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ExternalLink,
  Shield,
  Layers,
  Cpu,
  Activity,
  CheckCircle2,
  Lock,
  Zap,
  ArrowRight,
  ShieldCheck,
  Check,
} from "lucide-react";
import { Project } from "@/shared/types/project";
import { TelemetryBadge } from "@/shared/components/TelemetryBadge";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

type TabType = "context" | "architecture" | "reliability" | "stack";

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

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
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
          transition={{ type: "spring", duration: 0.45, bounce: 0.12 }}
          className="relative w-full max-w-4xl max-h-[92vh] bg-[#0c0c11] border border-white/[0.14] rounded-3xl shadow-[0_25px_70px_-15px_rgba(0,0,0,0.95)] overflow-hidden flex flex-col z-10"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.08] bg-[#111117]/95 backdrop-blur-md">
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
              aria-label="Close modal (Esc)"
              title="Close (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Content Body */}
          <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
            {/* Title & Live Link */}
            <div className="space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                  {project.title}
                </h2>
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20 font-mono text-xs font-semibold transition-all shadow-[0_0_20px_rgba(6,182,212,0.15)]"
                  >
                    <span>Visit Live Platform</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
              <p className="text-zinc-300 text-sm sm:text-base font-light leading-relaxed">
                {project.tagline}
              </p>
              <div className="inline-block px-3 py-1 rounded-md bg-white/[0.04] border border-white/[0.08] font-mono text-xs text-zinc-300">
                Role: <span className="text-emerald-400 font-semibold">{project.role}</span>
              </div>
            </div>

            {/* Metrics Overview Ribbon */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {(breakdown?.contextScale.metrics ?? project.metrics).map((m, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06]"
                >
                  <div className="text-[10px] font-mono uppercase text-zinc-500 tracking-wider">
                    {m.label}
                  </div>
                  <div className="text-sm sm:text-base font-mono font-bold text-white mt-1">
                    {m.value}
                  </div>
                </div>
              ))}
            </div>

            {/* Structured Engineering Tabs */}
            <div className="flex flex-wrap items-center gap-2 border-b border-white/[0.08] pb-1 font-mono text-xs">
              <button
                onClick={() => setActiveTab("context")}
                className={`px-3.5 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                  activeTab === "context"
                    ? "bg-white/[0.08] text-white border-b-2 border-cyan-400 font-semibold"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                <Activity className="w-3.5 h-3.5 text-cyan-400" />
                Context &amp; Scale
              </button>
              <button
                onClick={() => setActiveTab("architecture")}
                className={`px-3.5 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                  activeTab === "architecture"
                    ? "bg-white/[0.08] text-white border-b-2 border-emerald-400 font-semibold"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                <Layers className="w-3.5 h-3.5 text-emerald-400" />
                Core Architecture Decisions
              </button>
              <button
                onClick={() => setActiveTab("reliability")}
                className={`px-3.5 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                  activeTab === "reliability"
                    ? "bg-white/[0.08] text-white border-b-2 border-purple-400 font-semibold"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                <Shield className="w-3.5 h-3.5 text-purple-400" />
                Reliability &amp; Security
              </button>
              <button
                onClick={() => setActiveTab("stack")}
                className={`px-3.5 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                  activeTab === "stack"
                    ? "bg-white/[0.08] text-white border-b-2 border-amber-400 font-semibold"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                <Cpu className="w-3.5 h-3.5 text-amber-400" />
                Tech Stack
              </button>
            </div>

            {/* Tab 1: Context & Scale */}
            {activeTab === "context" && (
              <div className="space-y-6">
                {breakdown ? (
                  <>
                    <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-2">
                      <div className="font-mono text-[11px] text-cyan-400 uppercase tracking-widest font-semibold">
                        // Problem &amp; Operational Challenge
                      </div>
                      <p className="text-sm text-zinc-300 leading-relaxed font-light">
                        {breakdown.contextScale.problem}
                      </p>
                    </div>

                    <div className="space-y-3">
                      <div className="font-mono text-xs text-zinc-400 uppercase tracking-wider font-semibold">
                        Platform Scope &amp; Verified Enterprise Footprint
                      </div>
                      <div className="space-y-2.5">
                        {breakdown.contextScale.scopePoints.map((pt, i) => (
                          <div
                            key={i}
                            className="flex items-start gap-3 p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.04]"
                          >
                            <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                            <span className="text-sm text-zinc-300 leading-relaxed font-light">
                              {pt}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="space-y-4">
                    <p className="text-sm text-zinc-300 leading-relaxed font-light">
                      {project.overview}
                    </p>
                    <div className="space-y-2 pt-2">
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
              </div>
            )}

            {/* Tab 2: Core Architecture Decisions */}
            {activeTab === "architecture" && (
              <div className="space-y-4">
                {breakdown ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {breakdown.coreDecisions.map((dec, i) => (
                      <div
                        key={i}
                        className="p-4 rounded-2xl bg-white/[0.025] border border-white/[0.07] space-y-3 flex flex-col justify-between"
                      >
                        <div className="space-y-2">
                          <div className="flex items-center justify-between gap-2">
                            <span className="font-mono text-[10px] text-emerald-400 uppercase tracking-wider font-semibold">
                              {dec.category}
                            </span>
                          </div>
                          <h4 className="text-sm font-bold text-white tracking-tight">
                            {dec.title}
                          </h4>
                          <div className="space-y-1.5 pt-1">
                            <p className="text-xs text-zinc-300 leading-relaxed font-light">
                              <strong className="text-zinc-100 font-medium">Decision: </strong>
                              {dec.decision}
                            </p>
                            <p className="text-xs text-zinc-400 leading-relaxed font-light">
                              <strong className="text-zinc-300 font-medium">Trade-off / Impact: </strong>
                              {dec.tradeoff}
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/[0.04]">
                          {dec.badges.map((b, bIdx) => (
                            <span
                              key={bIdx}
                              className="px-2 py-0.5 rounded bg-white/[0.04] text-[10px] font-mono text-zinc-300 border border-white/[0.04]"
                            >
                              {b}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
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
              </div>
            )}

            {/* Tab 3: Reliability & Security */}
            {activeTab === "reliability" && (
              <div className="space-y-6">
                {breakdown ? (
                  <>
                    {/* SLA Banner */}
                    <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-between flex-wrap gap-3">
                      <div className="flex items-center gap-3">
                        <ShieldCheck className="w-5 h-5 text-purple-400" />
                        <div>
                          <div className="font-mono text-[10px] uppercase text-purple-300 tracking-wider">
                            Measured Production Reliability
                          </div>
                          <div className="text-sm font-mono font-bold text-white">
                            {breakdown.reliabilitySecurity.uptimeSla}
                          </div>
                        </div>
                      </div>
                      <span className="font-mono text-xs text-emerald-400 font-semibold px-2.5 py-1 rounded bg-emerald-500/10 border border-emerald-500/20">
                        ● Zero Unhandled Outages
                      </span>
                    </div>

                    {/* Resilience Mechanisms */}
                    <div className="space-y-3">
                      <div className="font-mono text-xs text-zinc-400 uppercase tracking-wider font-semibold">
                        Resilience &amp; Failover Patterns
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {breakdown.reliabilitySecurity.resilienceMechanisms.map((mech, i) => (
                          <div
                            key={i}
                            className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-1.5"
                          >
                            <div className="text-xs font-bold text-white">{mech.title}</div>
                            <p className="text-xs text-zinc-400 leading-relaxed font-light">
                              {mech.detail}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Security & Compliance Checklist */}
                    <div className="space-y-3">
                      <div className="font-mono text-xs text-zinc-400 uppercase tracking-wider font-semibold">
                        Security Controls &amp; Compliance Readiness
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {breakdown.reliabilitySecurity.securityCompliance.map((sec, i) => (
                          <div
                            key={i}
                            className="flex items-start gap-2.5 p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]"
                          >
                            <Lock className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />
                            <span className="text-xs text-zinc-300 leading-relaxed font-light">
                              {sec}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] text-sm text-zinc-400 font-light">
                    Sustains continuous production uptime via declarative health probes, automated
                    container restarts, and strict role-based access control.
                  </div>
                )}
              </div>
            )}

            {/* Tab 4: Tech Stack */}
            {activeTab === "stack" && (
              <div className="space-y-4">
                <div className="font-mono text-xs text-zinc-400 uppercase tracking-wider font-semibold">
                  Technologies, Runtimes &amp; Infrastructure
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((item, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-zinc-200"
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
