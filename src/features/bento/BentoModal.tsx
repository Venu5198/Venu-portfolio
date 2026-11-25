"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, CheckCircle2 } from "lucide-react";
import { projectsData } from "@/shared/data/projects";
import { useTheme } from "@/shared/context/ThemeContext";

interface BentoModalProps {
  projectId: string | null;
  onClose: () => void;
}

export function BentoModal({ projectId, onClose }: BentoModalProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [activeTab, setActiveTab] = useState<"overview" | "decisions" | "safeguards" | "stack">("overview");

  const project = projectsData.find((p) => p.id === projectId) || projectsData[0];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (projectId) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [projectId, onClose]);

  if (!projectId) return null;

  const breakdown = project.engineeringBreakdown;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6 md:p-10">
        {/* Backdrop blur */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/70 backdrop-blur-md"
        />

        {/* iOS-Style Sheet Modal */}
        <motion.div
          initial={{ opacity: 0, y: "100%" }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: "100%" }}
          transition={{ type: "spring", stiffness: 350, damping: 32 }}
          className={`relative w-full max-w-3xl max-h-[88vh] flex flex-col rounded-t-[2.5rem] sm:rounded-[2.5rem] border shadow-[0_24px_80px_rgba(0,0,0,0.9)] overflow-hidden z-10 ${
            isDark
              ? "bg-[#161618] border-white/15 text-[#F5F5F7]"
              : "bg-white border-black/10 text-[#1D1D1F]"
          }`}
        >
          {/* iOS Sheet Top Grabber Handle */}
          <div className="pt-3 pb-1 flex justify-center shrink-0">
            <div
              className={`w-12 h-1.5 rounded-full ${
                isDark ? "bg-white/20" : "bg-black/20"
              }`}
            />
          </div>

          {/* Header */}
          <div
            className={`p-6 sm:p-8 pt-3 border-b flex items-start justify-between gap-4 ${
              isDark ? "border-white/[0.08]" : "border-black/[0.08]"
            }`}
          >
            <div>
              <div
                className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono mb-2 font-medium border ${
                  isDark
                    ? "bg-white/[0.05] border-white/10 text-[#32ADE6]"
                    : "bg-black/[0.04] border-black/10 text-[#007AFF]"
                }`}
              >
                <span>{project.category}</span>
                <span className="opacity-30">·</span>
                <span>{project.role}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                {project.title} — Blueprint &amp; Specs
              </h2>
            </div>

            <button
              onClick={onClose}
              className={`p-2.5 rounded-full border transition-colors cursor-pointer ${
                isDark
                  ? "bg-white/[0.06] hover:bg-white/[0.12] border-white/10 text-zinc-300 hover:text-white"
                  : "bg-black/[0.04] hover:bg-black/[0.08] border-black/10 text-zinc-700 hover:text-black"
              }`}
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Segmented Tab Controls */}
          <div
            className={`px-6 sm:px-8 pt-4 pb-2 border-b flex items-center gap-2 overflow-x-auto no-scrollbar ${
              isDark ? "border-white/[0.08]" : "border-black/[0.08]"
            }`}
          >
            {(
              [
                { id: "overview", label: "Overview" },
                { id: "decisions", label: "Architecture Decisions" },
                { id: "safeguards", label: "Reliability Safeguards" },
                { id: "stack", label: "Verified Stack" },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === tab.id
                    ? isDark
                      ? "bg-white text-black font-semibold shadow-sm"
                      : "bg-[#007AFF] text-white font-semibold shadow-sm"
                    : isDark
                    ? "text-[#A1A1AA] hover:text-white bg-white/[0.03] hover:bg-white/[0.06]"
                    : "text-[#52525B] hover:text-[#1D1D1F] bg-black/[0.03] hover:bg-black/[0.06]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Modal Content Body */}
          <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-sm leading-relaxed">
            {activeTab === "overview" && (
              <div className="space-y-6">
                <div
                  className={`p-4 rounded-2xl border space-y-2 ${
                    isDark
                      ? "bg-white/[0.02] border-white/[0.06]"
                      : "bg-[#F2F2F7] border-black/[0.04]"
                  }`}
                >
                  <div className="text-xs font-mono font-bold uppercase opacity-90">The Problem</div>
                  <p className="font-light opacity-90">{breakdown?.contextScale?.problem}</p>
                </div>

                <div
                  className={`p-4 rounded-2xl border space-y-2 ${
                    isDark
                      ? "bg-white/[0.02] border-white/[0.06]"
                      : "bg-[#F2F2F7] border-black/[0.04]"
                  }`}
                >
                  <div className="text-xs font-mono font-bold uppercase opacity-90">Scale &amp; Engineering Scope</div>
                  <p className="font-light opacity-90">{breakdown?.contextScale?.scaleSummary}</p>
                  <ul className="list-disc pl-5 space-y-1 text-xs opacity-80 font-light pt-2">
                    {breakdown?.contextScale?.scopePoints?.map((pt, idx) => (
                      <li key={idx}>{pt}</li>
                    ))}
                  </ul>
                </div>

                {project.liveUrl && (
                  <div className="pt-2">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-xs transition-colors shadow-sm ${
                        isDark
                          ? "bg-white text-black hover:bg-zinc-200"
                          : "bg-[#007AFF] text-white hover:bg-blue-600"
                      }`}
                    >
                      <span>Visit Live Application</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                )}
              </div>
            )}

            {activeTab === "decisions" && (
              <div className="space-y-4">
                {breakdown?.coreDecisions?.map((dec, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-2xl border space-y-2 ${
                      isDark
                        ? "bg-white/[0.02] border-white/[0.06]"
                        : "bg-[#F2F2F7] border-black/[0.04]"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-sm">{dec.title}</span>
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                          isDark
                            ? "bg-white/[0.05] text-[#32ADE6]"
                            : "bg-black/[0.05] text-[#007AFF]"
                        }`}
                      >
                        {dec.category}
                      </span>
                    </div>
                    <p className="text-xs font-light opacity-90">{dec.decision}</p>
                    <div className="text-[11px] font-mono opacity-70 pt-1">
                      <strong>Trade-off:</strong> {dec.tradeoff}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "safeguards" && (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-emerald-500/[0.08] border border-emerald-500/25 text-xs font-mono text-emerald-600 dark:text-emerald-300 font-semibold">
                  <strong>Production SLA:</strong> {breakdown?.reliabilitySecurity?.uptimeSla}
                </div>
                {breakdown?.reliabilitySecurity?.resilienceMechanisms?.map((mech, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-2xl border space-y-1.5 ${
                      isDark
                        ? "bg-white/[0.02] border-white/[0.06]"
                        : "bg-[#F2F2F7] border-black/[0.04]"
                    }`}
                  >
                    <div className="font-semibold text-xs">{mech.title}</div>
                    <div className="text-xs font-light opacity-80">{mech.detail}</div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "stack" && (
              <div className="space-y-4">
                <div className="text-xs font-mono opacity-70">
                  Production verified modules leveraged across this service:
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.highlights.map((h, idx) => (
                    <div
                      key={idx}
                      className={`p-3 rounded-2xl border text-xs font-mono flex items-start gap-2.5 w-full ${
                        isDark
                          ? "bg-white/[0.02] border-white/[0.06]"
                          : "bg-[#F2F2F7] border-black/[0.04]"
                      }`}
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#34C759] dark:text-[#30D158] shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
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
