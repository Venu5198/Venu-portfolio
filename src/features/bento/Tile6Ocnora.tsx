"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, ExternalLink, GitBranch } from "lucide-react";
import { BentoSpotlightTile } from "./BentoSpotlightTile";
import { useTheme } from "@/shared/context/ThemeContext";

interface Tile6OcnoraProps {
  onOpenModal: (projectId: string) => void;
}

export function Tile6Ocnora({ onOpenModal }: Tile6OcnoraProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const capabilities = [
    "1,000+ Providers",
    "DAG Graph Runtime",
    "Token Circuit Breakers",
    "GKE Autopilot",
  ];

  return (
    <BentoSpotlightTile
      id="tile-ocnora"
      className="lg:col-span-7 col-span-12 flex flex-col justify-between"
    >
      <div>
        {/* Category & Status */}
        <div
          className={`flex items-center justify-between pb-3 mb-5 border-b ${
            isDark ? "border-white/[0.08]" : "border-black/[0.08]"
          }`}
        >
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${isDark ? "bg-[#BF5AF2]" : "bg-[#AF52DE]"}`} />
            <span
              className={`text-xs font-mono font-bold uppercase tracking-wider ${
                isDark ? "text-[#BF5AF2]" : "text-[#AF52DE]"
              }`}
            >
              Flagship Case Study 02
            </span>
          </div>
          <span
            className={`text-xs font-mono px-2.5 py-0.5 rounded-full border ${
              isDark
                ? "text-[#A1A1AA] bg-white/[0.04] border-white/10"
                : "text-[#52525B] bg-black/[0.04] border-black/10"
            }`}
          >
            Autonomous AI Engine &amp; DAG
          </span>
        </div>

        {/* Title & Headline */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center justify-between">
            <h2
              className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${
                isDark ? "text-[#F5F5F7]" : "text-[#1D1D1F]"
              }`}
            >
              OCNORA.ai
            </h2>
            <a
              href="https://ocnora.ai"
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-1 text-xs font-mono transition-colors ${
                isDark ? "text-[#86868B] hover:text-[#BF5AF2]" : "text-[#52525B] hover:text-[#AF52DE]"
              }`}
            >
              <span>ocnora.ai</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <p
            className={`text-sm sm:text-base font-medium leading-snug ${
              isDark ? "text-[#F5F5F7]" : "text-[#1D1D1F]"
            }`}
          >
            Autonomous AI Workflow &amp; Agent Runtime executing complex distributed tasks.
          </p>

          <p
            className={`text-xs sm:text-sm font-light leading-relaxed ${
              isDark ? "text-[#A1A1AA]" : "text-[#52525B]"
            }`}
          >
            Contributed as Backend &amp; DevOps Developer to OCNORA&apos;s multi-tenant AI agent runtime, stateful DAG workflow orchestrator, and production Kubernetes deployments. Engineered token usage governance, tool schema generation across 1,000+ app integrations, and zero-loss execution recovery.
          </p>
        </div>

        {/* Capability Chips */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {capabilities.map((c, idx) => (
            <span
              key={idx}
              className={`text-[11px] font-mono px-2.5 py-1 rounded-full border ${
                isDark
                  ? "bg-white/[0.04] border-white/10 text-zinc-300"
                  : "bg-black/[0.04] border-black/10 text-zinc-800"
              }`}
            >
              {c}
            </span>
          ))}
        </div>

        {/* Architectural Highlights Matrix */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div
            className={`p-3.5 rounded-2xl border space-y-1 ${
              isDark
                ? "bg-white/[0.02] border-white/[0.06]"
                : "bg-[#F2F2F7] border-black/[0.04]"
            }`}
          >
            <div className={`text-[11px] font-mono uppercase ${isDark ? "text-[#86868B]" : "text-[#52525B]"}`}>
              App Integrations
            </div>
            <div
              className={`text-lg font-bold font-mono ${
                isDark ? "text-[#F5F5F7]" : "text-[#1D1D1F]"
              }`}
            >
              1,000+ Providers
            </div>
            <div className={`text-[10px] ${isDark ? "text-zinc-400" : "text-zinc-500"}`}>
              Dynamic OAuth 2.0 &amp; OpenAPI AST
            </div>
          </div>

          <div
            className={`p-3.5 rounded-2xl border space-y-1 ${
              isDark
                ? "bg-white/[0.02] border-white/[0.06]"
                : "bg-[#F2F2F7] border-black/[0.04]"
            }`}
          >
            <div className={`text-[11px] font-mono uppercase ${isDark ? "text-[#86868B]" : "text-[#52525B]"}`}>
              DAG Reliability
            </div>
            <div
              className={`text-lg font-bold font-mono ${
                isDark ? "text-[#30D158]" : "text-[#34C759]"
              }`}
            >
              120 → 0 Defects
            </div>
            <div className={`text-[10px] ${isDark ? "text-zinc-400" : "text-zinc-500"}`}>
              Mock regression &amp; replay suites
            </div>
          </div>

          <div
            className={`p-3.5 rounded-2xl border space-y-1 ${
              isDark
                ? "bg-white/[0.02] border-white/[0.06]"
                : "bg-[#F2F2F7] border-black/[0.04]"
            }`}
          >
            <div className={`text-[11px] font-mono uppercase ${isDark ? "text-[#86868B]" : "text-[#52525B]"}`}>
              AI Cost Safeguards
            </div>
            <div
              className={`text-sm font-bold ${
                isDark ? "text-[#F5F5F7]" : "text-[#1D1D1F]"
              }`}
            >
              USD &amp; Token Breakers
            </div>
            <div className={`text-[10px] ${isDark ? "text-zinc-400" : "text-zinc-500"}`}>
              Circuit breaker triggers on budget cap
            </div>
          </div>

          <div
            className={`p-3.5 rounded-2xl border space-y-1 ${
              isDark
                ? "bg-white/[0.02] border-white/[0.06]"
                : "bg-[#F2F2F7] border-black/[0.04]"
            }`}
          >
            <div className={`text-[11px] font-mono uppercase ${isDark ? "text-[#86868B]" : "text-[#52525B]"}`}>
              Infrastructure
            </div>
            <div
              className={`text-sm font-bold ${
                isDark ? "text-[#F5F5F7]" : "text-[#1D1D1F]"
              }`}
            >
              GKE &amp; Argo CD
            </div>
            <div className={`text-[10px] ${isDark ? "text-zinc-400" : "text-zinc-500"}`}>
              GitOps-driven continuous releases
            </div>
          </div>
        </div>
      </div>

      {/* Trigger Modal CTA */}
      <div
        className={`pt-4 border-t flex items-center justify-between ${
          isDark ? "border-white/[0.08]" : "border-black/[0.08]"
        }`}
      >
        <motion.button
          onClick={() => onOpenModal("ocnora")}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`px-5 py-2.5 rounded-full font-semibold text-xs transition-colors shadow-md flex items-center gap-2 cursor-pointer ${
            isDark
              ? "bg-white text-black hover:bg-zinc-200"
              : "bg-[#007AFF] text-white hover:bg-blue-600"
          }`}
        >
          <span>Inspect DAG &amp; Guardrails</span>
          <ArrowRight className="w-4 h-4" />
        </motion.button>

        <span
          className={`text-[11px] font-mono hidden sm:flex items-center gap-1.5 ${
            isDark ? "text-[#86868B]" : "text-[#52525B]"
          }`}
        >
          <GitBranch className={`w-3.5 h-3.5 ${isDark ? "text-[#BF5AF2]" : "text-[#AF52DE]"}`} />
          <span>Autonomous Execution Trees</span>
        </span>
      </div>
    </BentoSpotlightTile>
  );
}
