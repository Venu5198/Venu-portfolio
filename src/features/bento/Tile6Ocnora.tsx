"use client";

import React from "react";
import { motion } from "framer-motion";
import { Cpu, ArrowRight, ExternalLink, ShieldCheck, GitBranch, Terminal } from "lucide-react";
import { BentoSpotlightTile } from "./BentoSpotlightTile";

interface Tile6OcnoraProps {
  onOpenModal: (projectId: string) => void;
}

export function Tile6Ocnora({ onOpenModal }: Tile6OcnoraProps) {
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
        <div className="flex items-center justify-between pb-3 mb-5 border-b border-white/[0.08]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#BF5AF2]" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#BF5AF2]">
              Flagship Case Study 02
            </span>
          </div>
          <span className="text-xs font-mono text-[#86868B] px-2.5 py-0.5 rounded-full bg-white/[0.04] border border-white/10">
            Autonomous AI Engine &amp; DAG
          </span>
        </div>

        {/* Title & Headline */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#F5F5F7] tracking-tight">
              OCNORA.ai
            </h2>
            <a
              href="https://ocnora.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-mono text-[#86868B] hover:text-[#BF5AF2] transition-colors"
            >
              <span>ocnora.ai</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <p className="text-sm sm:text-base text-[#F5F5F7] font-medium leading-snug">
            Autonomous AI Workflow &amp; Agent Runtime executing complex distributed tasks.
          </p>

          <p className="text-xs sm:text-sm text-[#86868B] font-light leading-relaxed">
            Contributed as Backend &amp; DevOps Developer to OCNORA&apos;s multi-tenant AI agent runtime, stateful DAG workflow orchestrator, and production Kubernetes deployments. Engineered token usage governance, tool schema generation across 1,000+ app integrations, and zero-loss execution recovery.
          </p>
        </div>

        {/* Capability Chips */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {capabilities.map((c, idx) => (
            <span
              key={idx}
              className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-zinc-300"
            >
              {c}
            </span>
          ))}
        </div>

        {/* Architectural Highlights Matrix */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-1">
            <div className="text-[11px] font-mono text-[#86868B] uppercase">App Integrations</div>
            <div className="text-lg font-bold text-[#F5F5F7] font-mono">1,000+ Providers</div>
            <div className="text-[10px] text-zinc-400">Dynamic OAuth 2.0 &amp; OpenAPI AST</div>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-1">
            <div className="text-[11px] font-mono text-[#86868B] uppercase">DAG Reliability</div>
            <div className="text-lg font-bold text-[#30D158] font-mono">120 → 0 Defects</div>
            <div className="text-[10px] text-zinc-400">Mock regression &amp; replay suites</div>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-1">
            <div className="text-[11px] font-mono text-[#86868B] uppercase">AI Cost Safeguards</div>
            <div className="text-sm font-bold text-[#F5F5F7]">USD &amp; Token Breakers</div>
            <div className="text-[10px] text-zinc-400">Circuit breaker triggers on budget cap</div>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-1">
            <div className="text-[11px] font-mono text-[#86868B] uppercase">Infrastructure</div>
            <div className="text-sm font-bold text-[#F5F5F7]">GKE &amp; Argo CD</div>
            <div className="text-[10px] text-zinc-400">GitOps-driven continuous releases</div>
          </div>
        </div>
      </div>

      {/* Trigger Modal CTA */}
      <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between">
        <motion.button
          onClick={() => onOpenModal("ocnora")}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-5 py-2.5 rounded-full bg-white text-black font-semibold text-xs hover:bg-zinc-200 transition-colors shadow-md flex items-center gap-2 cursor-pointer"
        >
          <span>Inspect DAG &amp; Guardrails</span>
          <ArrowRight className="w-4 h-4" />
        </motion.button>

        <span className="text-[11px] font-mono text-[#86868B] hidden sm:flex items-center gap-1.5">
          <GitBranch className="w-3.5 h-3.5 text-[#BF5AF2]" />
          <span>Autonomous Execution Trees</span>
        </span>
      </div>
    </BentoSpotlightTile>
  );
}
