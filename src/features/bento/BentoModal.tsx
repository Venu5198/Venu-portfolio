"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, ShieldCheck, CheckCircle2, Layers, Cpu } from "lucide-react";
import { projectsData } from "@/shared/data/projects";

interface BentoModalProps {
  projectId: string | null;
  onClose: () => void;
}

export function BentoModal({ projectId, onClose }: BentoModalProps) {
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
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
        {/* Backdrop blur */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-xl"
        />

        {/* Modal Window Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 24 }}
          transition={{ type: "spring", stiffness: 320, damping: 28 }}
          className="relative w-full max-w-3xl max-h-[85vh] flex flex-col rounded-[2.5rem] bg-[#161618] border border-white/15 shadow-[0_24px_80px_rgba(0,0,0,0.9)] overflow-hidden z-10"
        >
          {/* Header */}
          <div className="p-6 sm:p-8 border-b border-white/[0.08] flex items-start justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 text-xs font-mono text-[#32ADE6] mb-2 font-medium">
                <span>{project.category}</span>
                <span className="text-white/20">·</span>
                <span>{project.role}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#F5F5F7] tracking-tight">
                {project.title} — Blueprint &amp; Specs
              </h2>
            </div>

            <button
              onClick={onClose}
              className="p-2.5 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-zinc-300 hover:text-white transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Segmented Tab Controls */}
          <div className="px-6 sm:px-8 pt-4 pb-2 border-b border-white/[0.08] flex items-center gap-2 overflow-x-auto no-scrollbar">
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
                    ? "bg-white text-black font-semibold shadow-sm"
                    : "text-[#86868B] hover:text-white bg-white/[0.03] hover:bg-white/[0.06]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Modal Content Body */}
          <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-sm text-[#86868B] leading-relaxed">
            {activeTab === "overview" && (
              <div className="space-y-6">
                <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-2">
                  <div className="text-xs font-mono font-bold uppercase text-[#F5F5F7]">The Problem</div>
                  <p className="text-zinc-300 font-light">{breakdown?.contextScale?.problem}</p>
                </div>

                <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-2">
                  <div className="text-xs font-mono font-bold uppercase text-[#F5F5F7]">Scale &amp; Engineering Scope</div>
                  <p className="text-zinc-300 font-light">{breakdown?.contextScale?.scaleSummary}</p>
                  <ul className="list-disc pl-5 space-y-1 text-xs text-zinc-400 font-light pt-2">
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
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black font-semibold text-xs hover:bg-zinc-200 transition-colors shadow-sm"
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
                  <div key={idx} className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-white text-sm">{dec.title}</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/[0.05] text-[#32ADE6]">
                        {dec.category}
                      </span>
                    </div>
                    <p className="text-zinc-300 text-xs font-light">{dec.decision}</p>
                    <div className="text-[11px] text-[#86868B] font-mono pt-1">
                      <strong>Trade-off:</strong> {dec.tradeoff}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "safeguards" && (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-emerald-500/[0.05] border border-emerald-500/20 text-xs font-mono text-emerald-300">
                  <strong>Production SLA:</strong> {breakdown?.reliabilitySecurity?.uptimeSla}
                </div>
                {breakdown?.reliabilitySecurity?.resilienceMechanisms?.map((mech, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-1.5">
                    <div className="font-semibold text-white text-xs">{mech.title}</div>
                    <div className="text-zinc-400 text-xs font-light">{mech.detail}</div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "stack" && (
              <div className="space-y-4">
                <div className="text-xs font-mono text-[#86868B]">
                  Production verified modules leveraged across this service:
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.highlights.map((h, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-2xl bg-white/[0.02] border border-white/[0.06] text-xs font-mono text-zinc-300 flex items-start gap-2.5 w-full"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#30D158] shrink-0 mt-0.5" />
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
