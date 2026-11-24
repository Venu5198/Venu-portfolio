"use client";

import React from "react";
import { motion } from "framer-motion";
import { ExternalLink, ArrowRight, Server, Bot, Layers, Sparkles, CheckCircle2 } from "lucide-react";
import { projectsData } from "@/shared/data/projects";
import { Project } from "@/shared/types/project";

interface VibeProjectsSectionProps {
  onSelectProject: (p: Project) => void;
}

const slowSpring = {
  duration: 1.1,
  ease: [0.22, 1, 0.36, 1] as const,
};

export function VibeProjectsSection({ onSelectProject }: VibeProjectsSectionProps) {
  const syncrivo = projectsData.find((p) => p.id === "syncrivo")!;
  const ocnora = projectsData.find((p) => p.id === "ocnora")!;
  const finops = projectsData.find((p) => p.id === "gcp-cost-finops")!;
  const gitops = projectsData.find((p) => p.id === "gitops-platform-fleet")!;

  return (
    <section id="projects" className="py-24 relative scroll-mt-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header with Playful Badge */}
        <div className="space-y-3 mb-16 pb-6 border-b-2 border-black/10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#fde047] text-black text-xs font-mono font-bold border-2 border-black shadow-[2px_2px_0px_#000]">
            <Sparkles className="w-3.5 h-3.5" />
            FLAGSHIP CODE &amp; ARCHITECTURE
          </div>
          <h2 className="text-4xl sm:text-6xl font-black text-black tracking-tight leading-[0.95]">
            Shipped Systems &amp; Team Contributions
          </h2>
          <p className="text-zinc-600 max-w-2xl text-base sm:text-lg font-normal">
            Real production systems serving enterprise teams daily. Click into either flagship platform
            for architectural blueprints, event pipelines, and reliability guardrails.
          </p>
        </div>

        {/* Project 01: SyncRivo (Zine Card Style) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={slowSpring}
          className="mb-16 rounded-3xl bg-white border-2 border-black shadow-[8px_8px_0px_#000] overflow-hidden"
        >
          {/* Pastel Header Ribbon */}
          <div className="px-6 py-4 bg-[#bef264] border-b-2 border-black flex flex-wrap items-center justify-between gap-3 font-mono text-xs font-bold text-black">
            <span className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-black animate-ping" />
              // 01 · 5-PLATFORM MESSAGING BRIDGE · SYNCRIVO.AI
            </span>
            <span className="px-3 py-1 rounded-full bg-white border-2 border-black text-[11px] shadow-[2px_2px_0px_#000]">
              LATENCY: &lt; 95MS · 99.98% SLA
            </span>
          </div>

          <div className="p-6 sm:p-10 space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Headline, Bio & Narrative */}
              <div className="lg:col-span-8 space-y-4">
                <div className="space-y-2">
                  <div className="inline-block px-3 py-1 rounded-full bg-[#d8b4fe] text-black text-xs font-mono font-bold border-2 border-black shadow-[2px_2px_0px_#000]">
                    {syncrivo.role}
                  </div>
                  <h3 className="text-3xl sm:text-5xl font-black text-black tracking-tight">
                    {syncrivo.title}
                  </h3>
                </div>

                <p className="text-base sm:text-lg text-zinc-700 font-normal leading-relaxed">
                  {syncrivo.tagline}
                </p>

                {/* Narrative Pills Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="p-4 rounded-2xl bg-[#faf8f5] border-2 border-black space-y-1">
                    <div className="font-mono text-xs font-bold text-black flex items-center gap-2">
                      <Server className="w-3.5 h-3.5 text-cyan-600" />
                      FASTAPI &amp; REDIS MESH
                    </div>
                    <div className="text-xs text-zinc-600 leading-relaxed">
                      High-throughput webhook ingestion acknowledging platform webhooks under 10ms,
                      with Redis sliding-window deduplication and echo-loop guards.
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#faf8f5] border-2 border-black space-y-1">
                    <div className="font-mono text-xs font-bold text-black flex items-center gap-2">
                      <Layers className="w-3.5 h-3.5 text-purple-600" />
                      NATIVE SENDER ATTRIBUTION
                    </div>
                    <div className="text-xs text-zinc-600 leading-relaxed">
                      Bidirectional schema translation preserving mrkdwn, Teams HTML, Zoom formatting,
                      and native user attribution via delegated OAuth scopes.
                    </div>
                  </div>
                </div>

                {/* Sticker Pills Collection */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {["Slack 💬", "Microsoft Teams 👥", "Google Chat 💬", "Zoom Team Chat 📹", "Cisco Webex 🌐", "Redis Echo Guard 🛡️", "Google Cloud Run ☁️"].map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-full bg-[#fef08a] border-2 border-black text-xs font-mono font-bold text-black shadow-[1.5px_1.5px_0px_#000]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action CTA Buttons */}
                <div className="flex flex-wrap items-center gap-4 pt-4">
                  <button
                    onClick={() => onSelectProject(syncrivo)}
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-[#fde047] text-black font-black text-xs border-2 border-black shadow-[4px_4px_0px_#000] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[6px_6px_0px_#000] transition-all cursor-pointer"
                  >
                    <span>Inspect Blueprint &amp; Specs 👀</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  {syncrivo.liveUrl && (
                    <a
                      href={syncrivo.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-5 py-3 rounded-2xl bg-[#FFF] border-2 border-black text-black font-mono text-xs font-bold shadow-[2px_2px_0px_#000] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all"
                    >
                      <span>syncrivo.ai</span>
                      <ExternalLink className="w-3.5 h-3.5 text-zinc-600" />
                    </a>
                  )}
                </div>
              </div>

              {/* Right Column: Verified App Store Badges */}
              <div className="lg:col-span-4 p-6 rounded-3xl bg-[#faf8f5] border-2 border-black space-y-4">
                <div className="font-mono text-xs font-bold text-black uppercase tracking-wider">
                  VERIFIED MARKETPLACES
                </div>
                <div className="space-y-2">
                  {[
                    "Microsoft AppSource Certified",
                    "Google Workspace Marketplace",
                    "Zoom App Marketplace Approved",
                    "Webex App Hub Listed",
                  ].map((mkt, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white border border-black text-xs font-mono font-semibold text-black"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{mkt}</span>
                    </div>
                  ))}
                </div>
                <div className="text-[11px] font-mono text-zinc-600 pt-2 border-t border-black/10">
                  Reliability Champion Award recognized for 99.98% production uptime.
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Project 02: OCNORA (Zine Card Style) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={slowSpring}
          className="mb-16 rounded-3xl bg-white border-2 border-black shadow-[8px_8px_0px_#000] overflow-hidden"
        >
          {/* Pastel Header Ribbon */}
          <div className="px-6 py-4 bg-[#d8b4fe] border-b-2 border-black flex flex-wrap items-center justify-between gap-3 font-mono text-xs font-bold text-black">
            <span className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-black animate-ping" />
              // 02 · AI WORKFLOW AUTOMATION ENGINE · OCNORA.AI
            </span>
            <span className="px-3 py-1 rounded-full bg-white border-2 border-black text-[11px] shadow-[2px_2px_0px_#000]">
              1,000+ APP PROVIDERS · AUTONOMOUS PRs
            </span>
          </div>

          <div className="p-6 sm:p-10 space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Narrative */}
              <div className="lg:col-span-8 space-y-4">
                <div className="space-y-2">
                  <div className="inline-block px-3 py-1 rounded-full bg-[#bef264] text-black text-xs font-mono font-bold border-2 border-black shadow-[2px_2px_0px_#000]">
                    {ocnora.role}
                  </div>
                  <h3 className="text-3xl sm:text-5xl font-black text-black tracking-tight">
                    {ocnora.title}
                  </h3>
                </div>

                <p className="text-base sm:text-lg text-zinc-700 font-normal leading-relaxed">
                  {ocnora.tagline}
                </p>

                {/* Narrative Pills Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="p-4 rounded-2xl bg-[#faf8f5] border-2 border-black space-y-1">
                    <div className="font-mono text-xs font-bold text-black flex items-center gap-2">
                      <Server className="w-3.5 h-3.5 text-purple-600" />
                      DAG ENGINE &amp; 1,000+ APPS
                    </div>
                    <div className="text-xs text-zinc-600 leading-relaxed">
                      Custom stateful execution DAG supporting event triggers, condition branches,
                      suspend/resume cycles, and checkpoints across 1,000+ app connectors.
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#faf8f5] border-2 border-black space-y-1">
                    <div className="font-mono text-xs font-bold text-black flex items-center gap-2">
                      <Bot className="w-3.5 h-3.5 text-emerald-600" />
                      LLM BUDGET CIRCUIT BREAKERS
                    </div>
                    <div className="text-xs text-zinc-600 leading-relaxed">
                      Dynamic multi-model router balancing Gemini, Claude, and GPT with hard USD/token
                      ceilings, plus autonomous Git worktree code runners opening PRs.
                    </div>
                  </div>
                </div>

                {/* Sticker Pills */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {["1,000+ App Connectors 🔌", "Build with AI 🤖", "Git Worktree Runner 🌲", "120 Bugs → 0 Cleared 🎯", "Token Cost Ledger 📊"].map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-full bg-[#bae6fd] border-2 border-black text-xs font-mono font-bold text-black shadow-[1.5px_1.5px_0px_#000]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action CTA Buttons */}
                <div className="flex flex-wrap items-center gap-4 pt-4">
                  <button
                    onClick={() => onSelectProject(ocnora)}
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-[#fda4af] text-black font-black text-xs border-2 border-black shadow-[4px_4px_0px_#000] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[6px_6px_0px_#000] transition-all cursor-pointer"
                  >
                    <span>Inspect Engine Specifications 🔍</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  {ocnora.liveUrl && (
                    <a
                      href={ocnora.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-5 py-3 rounded-2xl bg-[#FFF] border-2 border-black text-black font-mono text-xs font-bold shadow-[2px_2px_0px_#000] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all"
                    >
                      <span>ocnora.ai</span>
                      <ExternalLink className="w-3.5 h-3.5 text-zinc-600" />
                    </a>
                  )}
                </div>
              </div>

              {/* Right Column: Defect Backlog Milestone Record */}
              <div className="lg:col-span-4 p-6 rounded-3xl bg-[#d9f99d] border-2 border-black shadow-[4px_4px_0px_#000] space-y-3">
                <div className="font-mono text-xs font-black text-black uppercase tracking-wider">
                  DEFECT ELIMINATION RECORD
                </div>
                <div className="text-4xl font-black text-black">120 → 0</div>
                <p className="text-xs text-zinc-800 leading-relaxed font-medium">
                  Took a 120-defect legacy backlog to zero by establishing rigid CI/CD verification gates
                  (lint, TypeScript, pytest, and Playwright E2E suites).
                </p>
                <div className="pt-2 border-t border-black/20 text-[11px] font-mono text-zinc-800 font-bold">
                  Zero unhandled production outages sustained.
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Secondary Systems: Studio Index Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            onClick={() => onSelectProject(finops)}
            className="p-8 rounded-3xl bg-white border-2 border-black shadow-[6px_6px_0px_#000] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all cursor-pointer space-y-3"
          >
            <div className="inline-block px-3 py-1 rounded-full bg-[#fde047] text-black font-mono text-xs font-bold border-2 border-black">
              CLOUD OPTIMIZATION
            </div>
            <h4 className="text-2xl font-black text-black">{finops.title}</h4>
            <p className="text-sm text-zinc-600 leading-relaxed">{finops.summary}</p>
            <div className="font-mono text-xs font-bold text-emerald-700">
              ✓ 20–25% Monthly Spend Reduced Within 60 Days
            </div>
          </div>

          <div
            onClick={() => onSelectProject(gitops)}
            className="p-8 rounded-3xl bg-white border-2 border-black shadow-[6px_6px_0px_#000] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all cursor-pointer space-y-3"
          >
            <div className="inline-block px-3 py-1 rounded-full bg-[#e9d5ff] text-black font-mono text-xs font-bold border-2 border-black">
              KUBERNETES GITOPS FLEET
            </div>
            <h4 className="text-2xl font-black text-black">{gitops.title}</h4>
            <p className="text-sm text-zinc-600 leading-relaxed">{gitops.summary}</p>
            <div className="font-mono text-xs font-bold text-purple-700">
              ✓ 20+ Production Services · 35% Faster Incident MTTR
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
