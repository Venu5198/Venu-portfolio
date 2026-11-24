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
import { useTheme } from "@/shared/context/ThemeContext";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

type TabType = "context" | "architecture" | "reliability" | "stack";

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [activeTab, setActiveTab] = useState<TabType>("context");
  const { theme } = useTheme();
  const isLight = theme === "light";

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
      <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
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
          className={`relative w-full max-w-4xl max-h-[92vh] rounded-3xl overflow-hidden flex flex-col z-10 transition-colors ${
            isLight
              ? "bg-[#F4F4F0] border-2 border-[#0A0A0A] shadow-[10px_10px_0px_#0A0A0A] text-[#0A0A0A]"
              : "bg-[#09090B] border border-white/[0.08] shadow-[0_25px_70px_-15px_rgba(0,0,0,0.95)] text-white"
          }`}
        >
          {/* Header Bar */}
          <div
            className={`flex items-center justify-between px-6 py-4 border-b ${
              isLight
                ? "bg-[#FDE047] border-[#0A0A0A] text-[#0A0A0A]"
                : "border-white/[0.08] bg-[#111117]/95 backdrop-blur-md"
            }`}
          >
            <div className="flex items-center gap-3">
              <span
                className={`font-mono text-xs font-black uppercase tracking-wider ${
                  isLight ? "text-[#0A0A0A]" : "text-cyan-400 font-semibold"
                }`}
              >
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
              data-cursor="CLOSE ✕"
              className={`p-1.5 rounded-full transition-colors cursor-pointer ${
                isLight
                  ? "text-[#0A0A0A] hover:bg-black/10 border-2 border-[#0A0A0A] bg-white shadow-[1.5px_1.5px_0px_#0A0A0A]"
                  : "text-zinc-400 hover:text-white hover:bg-white/[0.08]"
              }`}
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
                <h2
                  className={`text-2xl sm:text-4xl font-black tracking-tight ${
                    isLight ? "text-[#0A0A0A]" : "text-white"
                  }`}
                >
                  {project.title}
                </h2>
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="OPEN ↗"
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-mono text-xs font-black transition-all ${
                      isLight
                        ? "bg-[#C6FF00] text-[#0A0A0A] border-2 border-[#0A0A0A] shadow-[2px_2px_0px_#0A0A0A] hover:translate-x-[-1px] hover:translate-y-[-1px]"
                        : "bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20 shadow-[0_0_20px_rgba(6,182,212,0.15)]"
                    }`}
                  >
                    <span>Visit Live Platform</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
              <p
                className={`text-sm sm:text-base leading-relaxed ${
                  isLight ? "text-zinc-800 font-medium" : "text-zinc-300 font-light"
                }`}
              >
                {project.tagline}
              </p>
              <div
                className={`inline-block px-3 py-1 rounded-md font-mono text-xs ${
                  isLight
                    ? "bg-[#C6FF00] text-[#0A0A0A] border-2 border-[#0A0A0A] shadow-[2px_2px_0px_#0A0A0A] font-black"
                    : "bg-white/[0.04] border border-white/[0.08] text-zinc-300"
                }`}
              >
                Role: <span className={isLight ? "text-[#0A0A0A] font-black" : "text-emerald-400 font-semibold"}>{project.role}</span>
              </div>
            </div>

            {/* Metrics Overview Ribbon */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {(breakdown?.contextScale.metrics ?? project.metrics).map((m, idx) => (
                <div
                  key={idx}
                  className={`p-3.5 rounded-2xl ${
                    isLight
                      ? "bg-white border-2 border-[#0A0A0A] shadow-[3px_3px_0px_#0A0A0A]"
                      : "bg-white/[0.02] border border-white/[0.06] rounded-xl"
                  }`}
                >
                  <div
                    className={`text-[10px] font-mono uppercase tracking-wider ${
                      isLight ? "text-zinc-700 font-black" : "text-zinc-500"
                    }`}
                  >
                    {m.label}
                  </div>
                  <div
                    className={`text-sm sm:text-base font-mono mt-1 ${
                      isLight ? "text-[#0A0A0A] font-black" : "text-white font-bold"
                    }`}
                  >
                    {m.value}
                  </div>
                </div>
              ))}
            </div>

            {/* Structured Engineering Tabs */}
            <div
              className={`flex flex-wrap items-center gap-2 border-b pb-1 font-mono text-xs ${
                isLight ? "border-[#0A0A0A]/20" : "border-white/[0.08]"
              }`}
            >
              <button
                onClick={() => setActiveTab("context")}
                data-cursor="TAB"
                className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-2 cursor-pointer ${
                  activeTab === "context"
                    ? isLight
                      ? "bg-[#C6FF00] text-[#0A0A0A] border-2 border-[#0A0A0A] shadow-[2px_2px_0px_#0A0A0A] font-black"
                      : "bg-white/[0.08] text-white border-b-2 border-cyan-400 font-semibold"
                    : isLight
                    ? "text-zinc-800 hover:text-black hover:bg-zinc-200/60 font-bold"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                <Activity className={`w-3.5 h-3.5 ${isLight ? "text-[#0A0A0A]" : "text-cyan-400"}`} />
                Context &amp; Scale
              </button>
              <button
                onClick={() => setActiveTab("architecture")}
                data-cursor="TAB"
                className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-2 cursor-pointer ${
                  activeTab === "architecture"
                    ? isLight
                      ? "bg-[#2563EB] text-white border-2 border-[#0A0A0A] shadow-[2px_2px_0px_#0A0A0A] font-black"
                      : "bg-white/[0.08] text-white border-b-2 border-emerald-400 font-semibold"
                    : isLight
                    ? "text-zinc-800 hover:text-black hover:bg-zinc-200/60 font-bold"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                <Layers className={`w-3.5 h-3.5 ${isLight ? "text-white" : "text-emerald-400"}`} />
                Core Architecture Decisions
              </button>
              <button
                onClick={() => setActiveTab("reliability")}
                data-cursor="TAB"
                className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-2 cursor-pointer ${
                  activeTab === "reliability"
                    ? isLight
                      ? "bg-[#FF4D00] text-white border-2 border-[#0A0A0A] shadow-[2px_2px_0px_#0A0A0A] font-black"
                      : "bg-white/[0.08] text-white border-b-2 border-purple-400 font-semibold"
                    : isLight
                    ? "text-zinc-800 hover:text-black hover:bg-zinc-200/60 font-bold"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                <Shield className={`w-3.5 h-3.5 ${isLight ? "text-white" : "text-purple-400"}`} />
                Reliability &amp; Security
              </button>
              <button
                onClick={() => setActiveTab("stack")}
                data-cursor="TAB"
                className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-2 cursor-pointer ${
                  activeTab === "stack"
                    ? isLight
                      ? "bg-[#FDE047] text-[#0A0A0A] border-2 border-[#0A0A0A] shadow-[2px_2px_0px_#0A0A0A] font-black"
                      : "bg-white/[0.08] text-white border-b-2 border-amber-400 font-semibold"
                    : isLight
                    ? "text-zinc-800 hover:text-black hover:bg-zinc-200/60 font-bold"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                <Cpu className={`w-3.5 h-3.5 ${isLight ? "text-[#0A0A0A]" : "text-amber-400"}`} />
                Tech Stack
              </button>
            </div>

            {/* Tab 1: Context & Scale */}
            {activeTab === "context" && (
              <div className="space-y-6">
                {breakdown ? (
                  <>
                    <div
                      className={`p-4 rounded-2xl space-y-2 ${
                        isLight
                          ? "bg-white border-2 border-black shadow-[3px_3px_0px_#000]"
                          : "bg-white/[0.02] border border-white/[0.06]"
                      }`}
                    >
                      <div
                        className={`font-mono text-[11px] uppercase tracking-widest font-bold ${
                          isLight ? "text-purple-700" : "text-cyan-400"
                        }`}
                      >
                        // Problem &amp; Operational Challenge
                      </div>
                      <p
                        className={`text-sm leading-relaxed ${
                          isLight ? "text-zinc-800 font-normal" : "text-zinc-300 font-light"
                        }`}
                      >
                        {breakdown.contextScale.problem}
                      </p>
                    </div>

                    <div className="space-y-3">
                      <div
                        className={`font-mono text-xs uppercase tracking-wider font-bold ${
                          isLight ? "text-black" : "text-zinc-400"
                        }`}
                      >
                        Platform Scope &amp; Verified Enterprise Footprint
                      </div>
                      <div className="space-y-2.5">
                        {breakdown.contextScale.scopePoints.map((pt, i) => (
                          <div
                            key={i}
                            className={`flex items-start gap-3 p-3.5 rounded-xl ${
                              isLight
                                ? "bg-white border-2 border-black shadow-[2px_2px_0px_#000]"
                                : "bg-white/[0.02] border border-white/[0.04]"
                            }`}
                          >
                            <CheckCircle2
                              className={`w-4 h-4 shrink-0 mt-0.5 ${
                                isLight ? "text-emerald-700" : "text-cyan-400"
                              }`}
                            />
                            <span
                              className={`text-sm leading-relaxed ${
                                isLight ? "text-zinc-800 font-medium" : "text-zinc-300 font-light"
                              }`}
                            >
                              {pt}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="space-y-4">
                    <p
                      className={`text-sm leading-relaxed ${
                        isLight ? "text-zinc-800 font-normal" : "text-zinc-300 font-light"
                      }`}
                    >
                      {project.overview}
                    </p>
                    <div className="space-y-2 pt-2">
                      {project.highlights.map((h, i) => (
                        <div
                          key={i}
                          className={`flex items-start gap-3 p-3 rounded-xl ${
                            isLight
                              ? "bg-white border-2 border-black shadow-[2px_2px_0px_#000]"
                              : "bg-white/[0.02] border border-white/[0.04]"
                          }`}
                        >
                          <Zap
                            className={`w-4 h-4 shrink-0 mt-0.5 ${
                              isLight ? "text-purple-700" : "text-cyan-400"
                            }`}
                          />
                          <span
                            className={`text-sm leading-relaxed ${
                              isLight ? "text-zinc-800 font-medium" : "text-zinc-300"
                            }`}
                          >
                            {h}
                          </span>
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
                        className={`p-4 rounded-2xl space-y-3 flex flex-col justify-between ${
                          isLight
                            ? "bg-white border-2 border-black shadow-[4px_4px_0px_#000]"
                            : "bg-white/[0.025] border border-white/[0.07]"
                        }`}
                      >
                        <div className="space-y-2">
                          <div className="flex items-center justify-between gap-2">
                            <span
                              className={`font-mono text-[10px] uppercase tracking-wider font-black ${
                                isLight ? "text-emerald-800" : "text-emerald-400"
                              }`}
                            >
                              {dec.category}
                            </span>
                          </div>
                          <h4
                            className={`text-sm font-bold tracking-tight ${
                              isLight ? "text-black" : "text-white"
                            }`}
                          >
                            {dec.title}
                          </h4>
                          <div className="space-y-1.5 pt-1">
                            <p
                              className={`text-xs leading-relaxed ${
                                isLight ? "text-zinc-700 font-normal" : "text-zinc-300 font-light"
                              }`}
                            >
                              <strong className={isLight ? "text-black font-bold" : "text-zinc-100 font-medium"}>Decision: </strong>
                              {dec.decision}
                            </p>
                            <p
                              className={`text-xs leading-relaxed ${
                                isLight ? "text-zinc-600 font-normal" : "text-zinc-400 font-light"
                              }`}
                            >
                              <strong className={isLight ? "text-zinc-900 font-bold" : "text-zinc-300 font-medium"}>Trade-off / Impact: </strong>
                              {dec.tradeoff}
                            </p>
                          </div>
                        </div>

                        <div
                          className={`flex flex-wrap gap-1.5 pt-2 border-t ${
                            isLight ? "border-black/10" : "border-white/[0.04]"
                          }`}
                        >
                          {dec.badges.map((b, bIdx) => (
                            <span
                              key={bIdx}
                              className={`px-2 py-0.5 rounded text-[10px] font-mono ${
                                isLight
                                  ? "bg-[#d8b4fe] text-black border border-black font-bold"
                                  : "bg-white/[0.04] text-zinc-300 border border-white/[0.04]"
                              }`}
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
                        className={`p-4 rounded-2xl space-y-2 ${
                          isLight
                            ? "bg-white border-2 border-black shadow-[3px_3px_0px_#000]"
                            : "bg-white/[0.03] border border-white/[0.06]"
                        }`}
                      >
                        <div
                          className={`font-mono text-[11px] uppercase tracking-wider font-bold ${
                            isLight ? "text-purple-700" : "text-cyan-400"
                          }`}
                        >
                          {arch.domain}
                        </div>
                        <div
                          className={`font-bold text-sm ${
                            isLight ? "text-black" : "text-white"
                          }`}
                        >
                          {arch.title}
                        </div>
                        <p
                          className={`text-xs leading-relaxed ${
                            isLight ? "text-zinc-700 font-normal" : "text-zinc-400"
                          }`}
                        >
                          {arch.description}
                        </p>
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {arch.badges.map((b, bIdx) => (
                            <span
                              key={bIdx}
                              className={`px-2 py-0.5 rounded text-[10px] font-mono ${
                                isLight
                                  ? "bg-[#bef264] text-black border border-black font-bold"
                                  : "bg-white/[0.04] text-zinc-300"
                              }`}
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
                    <div
                      className={`p-4 rounded-2xl flex items-center justify-between flex-wrap gap-3 ${
                        isLight
                          ? "bg-[#bef264] border-2 border-black shadow-[4px_4px_0px_#000] text-black"
                          : "bg-purple-500/10 border border-purple-500/20"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <ShieldCheck
                          className={`w-5 h-5 ${
                            isLight ? "text-black" : "text-purple-400"
                          }`}
                        />
                        <div>
                          <div
                            className={`font-mono text-[10px] uppercase tracking-wider ${
                              isLight ? "text-zinc-800 font-black" : "text-purple-300"
                            }`}
                          >
                            Measured Production Reliability
                          </div>
                          <div
                            className={`text-sm font-mono font-bold ${
                              isLight ? "text-black font-black" : "text-white"
                            }`}
                          >
                            {breakdown.reliabilitySecurity.uptimeSla}
                          </div>
                        </div>
                      </div>
                      <span
                        className={`font-mono text-xs font-bold px-2.5 py-1 rounded-full ${
                          isLight
                            ? "bg-white text-black border border-black shadow-[1.5px_1.5px_0px_#000]"
                            : "text-emerald-400 font-semibold bg-emerald-500/10 border border-emerald-500/20"
                        }`}
                      >
                        ● Zero Unhandled Outages
                      </span>
                    </div>

                    {/* Resilience Mechanisms */}
                    <div className="space-y-3">
                      <div
                        className={`font-mono text-xs uppercase tracking-wider font-bold ${
                          isLight ? "text-black" : "text-zinc-400 font-semibold"
                        }`}
                      >
                        Resilience &amp; Failover Patterns
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {breakdown.reliabilitySecurity.resilienceMechanisms.map((mech, i) => (
                          <div
                            key={i}
                            className={`p-3.5 rounded-2xl space-y-1.5 ${
                              isLight
                                ? "bg-white border-2 border-black shadow-[3px_3px_0px_#000]"
                                : "bg-white/[0.02] border border-white/[0.06] rounded-xl"
                            }`}
                          >
                            <div
                              className={`text-xs font-bold ${
                                isLight ? "text-black" : "text-white"
                              }`}
                            >
                              {mech.title}
                            </div>
                            <p
                              className={`text-xs leading-relaxed ${
                                isLight ? "text-zinc-700 font-normal" : "text-zinc-400 font-light"
                              }`}
                            >
                              {mech.detail}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Security & Compliance Checklist */}
                    <div className="space-y-3">
                      <div
                        className={`font-mono text-xs uppercase tracking-wider font-bold ${
                          isLight ? "text-black" : "text-zinc-400 font-semibold"
                        }`}
                      >
                        Security Controls &amp; Compliance Readiness
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {breakdown.reliabilitySecurity.securityCompliance.map((sec, i) => (
                          <div
                            key={i}
                            className={`flex items-start gap-2.5 p-3 rounded-xl ${
                              isLight
                                ? "bg-white border-2 border-black shadow-[2px_2px_0px_#000]"
                                : "bg-white/[0.02] border border-white/[0.04]"
                            }`}
                          >
                            <Lock
                              className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${
                                isLight ? "text-purple-700" : "text-purple-400"
                              }`}
                            />
                            <span
                              className={`text-xs leading-relaxed ${
                                isLight ? "text-zinc-800 font-medium" : "text-zinc-300 font-light"
                              }`}
                            >
                              {sec}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <div
                    className={`p-4 rounded-2xl text-sm ${
                      isLight
                        ? "bg-white border-2 border-black text-zinc-800"
                        : "bg-white/[0.02] border border-white/[0.06] text-zinc-400 font-light"
                    }`}
                  >
                    Sustains continuous production uptime via declarative health probes, automated
                    container restarts, and strict role-based access control.
                  </div>
                )}
              </div>
            )}

            {/* Tab 4: Tech Stack */}
            {activeTab === "stack" && (
              <div className="space-y-4">
                <div
                  className={`font-mono text-xs uppercase tracking-wider font-bold ${
                    isLight ? "text-black" : "text-zinc-400 font-semibold"
                  }`}
                >
                  Technologies, Runtimes &amp; Infrastructure
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((item, idx) => (
                    <span
                      key={idx}
                      className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold ${
                        isLight
                          ? "bg-[#fde047] text-black border-2 border-black shadow-[2px_2px_0px_#000]"
                          : "bg-white/[0.04] border border-white/[0.08] text-zinc-200"
                      }`}
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
