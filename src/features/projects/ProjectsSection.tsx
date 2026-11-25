"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ExternalLink,
  ArrowRight,
  Activity,
  Bot,
  Zap,
  Layers,
  ShieldCheck,
  CheckCircle2,
  Server,
  Cloud,
} from "lucide-react";
import { projectsData } from "@/shared/data/projects";
import { Project } from "@/shared/types/project";
import { ProjectModal } from "./ProjectModal";

export function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const syncrivo = projectsData.find((p) => p.id === "syncrivo")!;
  const ocnora = projectsData.find((p) => p.id === "ocnora")!;
  const finops = projectsData.find((p) => p.id === "gcp-cost-finops")!;
  const gitops = projectsData.find((p) => p.id === "gitops-platform-fleet")!;

  return (
    <section id="projects" className="py-24 relative scroll-mt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="space-y-3 mb-16 pb-8 border-b border-hairline">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-cyan-400 font-semibold uppercase tracking-wider">
            <span>Flagship Systems</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-black text-white tracking-[-0.03em]">
            Production Systems &amp; Architecture
          </h2>
          <p className="text-zinc-400 max-w-2xl text-base sm:text-lg font-light leading-relaxed">
            Core backend microservices, distributed event bridges, and cloud-native infrastructure engineered for enterprise reliability and zero downtime.
          </p>
        </div>

        {/* Flagship Card 01: SyncRivo */}
        <div className="mb-20 p-8 sm:p-12 rounded-[2.5rem] bg-[#0c0c12] border border-white/[0.1] shadow-[0_20px_50px_rgba(0,0,0,0.6)] space-y-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-mono text-cyan-400 font-semibold">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              SyncRivo.ai · 5-Platform Enterprise Bridge
            </span>
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
              <span>LATENCY: &lt; 95MS</span>
              <span className="text-zinc-600">·</span>
              <span className="text-emerald-400 font-bold">99.98% SLA</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Narrative */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <h3 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                  {syncrivo.title}
                </h3>
                <div className="text-xs sm:text-sm font-mono text-cyan-400 mt-2 font-medium">
                  {syncrivo.role}
                </div>
              </div>

              <p className="text-base sm:text-lg text-zinc-300 font-light leading-relaxed">
                {syncrivo.tagline}
              </p>

              {/* Engineering Highlights Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] space-y-1.5">
                  <div className="text-xs font-mono text-cyan-400 font-bold flex items-center gap-2">
                    <Server className="w-3.5 h-3.5" />
                    Asynchronous Ingress
                  </div>
                  <div className="text-xs text-zinc-400 font-light leading-relaxed">
                    FastAPI webhook receivers verify HMAC-SHA256 signatures and enqueue events to Redis in &lt;10ms.
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] space-y-1.5">
                  <div className="text-xs font-mono text-emerald-400 font-bold flex items-center gap-2">
                    <Activity className="w-3.5 h-3.5" />
                    Loop &amp; Echo Prevention
                  </div>
                  <div className="text-xs text-zinc-400 font-light leading-relaxed">
                    Redis distributed locks (<code className="text-zinc-200">SETNX</code>) and SHA-256 fingerprints eliminate echo loops with 0% duplication.
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] space-y-1.5">
                  <div className="text-xs font-mono text-purple-400 font-bold flex items-center gap-2">
                    <Layers className="w-3.5 h-3.5" />
                    AST Normalization
                  </div>
                  <div className="text-xs text-zinc-400 font-light leading-relaxed">
                    Intermediate AST schema translating between Markdown, Slack mrkdwn, Teams HTML, Zoom, and Webex blocks.
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] space-y-1.5">
                  <div className="text-xs font-mono text-amber-400 font-bold flex items-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Auth Wheel &amp; DLQ
                  </div>
                  <div className="text-xs text-zinc-400 font-light leading-relaxed">
                    Private multi-tenant OAuth module with exponential backoff, jitter, and Dead Letter Queue alert routing.
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => setSelectedProject(syncrivo)}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-semibold text-xs hover:bg-zinc-200 transition-all cursor-pointer"
                >
                  <span>Inspect Blueprint &amp; Specs</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                {syncrivo.liveUrl && (
                  <a
                    href={syncrivo.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-5 py-3 rounded-full bg-white/[0.05] border border-white/10 hover:bg-white/[0.08] text-zinc-300 hover:text-white text-xs font-mono transition-all"
                  >
                    <span>syncrivo.ai</span>
                    <ExternalLink className="w-3.5 h-3.5 text-zinc-500" />
                  </a>
                )}
              </div>
            </div>

            {/* Right Telemetry Column */}
            <div className="lg:col-span-5 space-y-6 lg:border-l lg:border-hairline lg:pl-8">
              <div className="text-xs font-mono uppercase text-zinc-400 tracking-wider">
                Production Performance
              </div>

              <div className="grid grid-cols-2 gap-3.5">
                {syncrivo.metrics.map((m, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
                    <div className="text-[10px] font-mono text-zinc-500 uppercase">{m.label}</div>
                    <div className="text-2xl font-mono font-bold text-white mt-1">{m.value}</div>
                  </div>
                ))}
              </div>

              {/* Stack Pills */}
              <div className="space-y-2">
                <div className="text-xs font-mono text-zinc-500 uppercase">Core Stack</div>
                <div className="flex flex-wrap gap-2">
                  {syncrivo.stack.map((item, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-zinc-300"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Citation */}
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 space-y-1">
                <div className="text-xs font-mono text-amber-400 font-bold">
                  Reliability Champion Conferred
                </div>
                <div className="text-xs text-zinc-400 font-light">
                  Recognized for sustaining 99.98% production bridge availability across enterprise messaging fleets.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Flagship Card 02: OCNORA */}
        <div className="mb-20 p-8 sm:p-12 rounded-[2.5rem] bg-[#0c0c12] border border-white/[0.1] shadow-[0_20px_50px_rgba(0,0,0,0.6)] space-y-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-mono text-amber-400 font-semibold">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              OCNORA.ai · AI Workflow Automation Platform
            </span>
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
              <span>1,000+ PROVIDERS</span>
              <span className="text-zinc-600">·</span>
              <span className="text-emerald-400 font-bold">ZERO BACKLOG DEFECTS</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Narrative */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <h3 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                  {ocnora.title}
                </h3>
                <div className="text-xs sm:text-sm font-mono text-amber-400 mt-2 font-medium">
                  {ocnora.role}
                </div>
              </div>

              <p className="text-base sm:text-lg text-zinc-300 font-light leading-relaxed">
                {ocnora.tagline}
              </p>

              {/* Engineering Highlights Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] space-y-1.5">
                  <div className="text-xs font-mono text-amber-400 font-bold flex items-center gap-2">
                    <Server className="w-3.5 h-3.5" />
                    Stateful DAG Engine
                  </div>
                  <div className="text-xs text-zinc-400 font-light leading-relaxed">
                    Topological execution graph with step-level MongoDB checkpointing for long-running workflows.
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] space-y-1.5">
                  <div className="text-xs font-mono text-cyan-400 font-bold flex items-center gap-2">
                    <Bot className="w-3.5 h-3.5" />
                    Budget Circuit Breakers
                  </div>
                  <div className="text-xs text-zinc-400 font-light leading-relaxed">
                    Pre-flight model router with hard tenant-level USD and token spend ceilings preventing cost spikes.
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] space-y-1.5">
                  <div className="text-xs font-mono text-emerald-400 font-bold flex items-center gap-2">
                    <Layers className="w-3.5 h-3.5" />
                    Git Worktree Runners
                  </div>
                  <div className="text-xs text-zinc-400 font-light leading-relaxed">
                    Confined autonomous AI coding agents in Docker sandboxes leasing isolated Git worktrees and opening verified PRs.
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] space-y-1.5">
                  <div className="text-xs font-mono text-purple-400 font-bold flex items-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Multi-Stage Verification
                  </div>
                  <div className="text-xs text-zinc-400 font-light leading-relaxed">
                    Rigorous CI/CD verification gates (lint, TypeScript, pytest, Playwright) clearing 120 backlogged defects to 0.
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => setSelectedProject(ocnora)}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-semibold text-xs hover:bg-zinc-200 transition-all cursor-pointer"
                >
                  <span>Inspect Engine Specs</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                {ocnora.liveUrl && (
                  <a
                    href={ocnora.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-5 py-3 rounded-full bg-white/[0.05] border border-white/10 hover:bg-white/[0.08] text-zinc-300 hover:text-white text-xs font-mono transition-all"
                  >
                    <span>ocnora.ai</span>
                    <ExternalLink className="w-3.5 h-3.5 text-zinc-500" />
                  </a>
                )}
              </div>
            </div>

            {/* Right Telemetry Column */}
            <div className="lg:col-span-5 space-y-6 lg:border-l lg:border-hairline lg:pl-8">
              <div className="text-xs font-mono uppercase text-zinc-400 tracking-wider">
                Reliability Milestone
              </div>

              {/* Backlog Cleared Card */}
              <div className="p-6 rounded-3xl bg-emerald-950/25 border border-emerald-500/25 space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-semibold uppercase">
                  <CheckCircle2 className="w-4 h-4" />
                  Test Backlog Cleared
                </div>
                <div className="text-3xl font-mono font-black text-white">120 Defects → 0 Bugs</div>
                <p className="text-xs text-zinc-400 font-light leading-relaxed">
                  Eliminated file descriptor exhaustion, container disk leaks, and proxy timeouts across runtime instances.
                </p>
              </div>

              {/* Stack */}
              <div className="space-y-2">
                <div className="text-xs font-mono text-zinc-500 uppercase">Engine Stack</div>
                <div className="flex flex-wrap gap-2">
                  {ocnora.stack.map((item, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-zinc-300"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Supporting Cloud & Platform Work */}
        <div className="space-y-6">
          <div className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
            Supporting Cloud &amp; Platform Infrastructure
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div
              onClick={() => setSelectedProject(finops)}
              className="p-8 rounded-3xl bg-[#0c0c12] border border-white/[0.08] hover:border-emerald-500/40 transition-all cursor-pointer group space-y-3"
            >
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-emerald-400 font-bold uppercase">Cloud Cost Governance</span>
                <span className="text-zinc-500">GCP PROD</span>
              </div>
              <h4 className="text-2xl font-bold text-white group-hover:text-emerald-300 transition-colors">
                {finops.title}
              </h4>
              <p className="text-sm text-zinc-400 font-light leading-relaxed">
                Automated cloud-cost telemetry workflows reducing monthly GCP spend by 20–25% through container rightsizing and disk cleanup.
              </p>
              <div className="pt-3 border-t border-hairline flex items-center justify-between text-xs font-mono">
                <span className="text-emerald-400 font-bold">-20% to -25% Monthly Spend</span>
                <span className="text-zinc-400 group-hover:text-white transition-colors">View Specs →</span>
              </div>
            </div>

            <div
              onClick={() => setSelectedProject(gitops)}
              className="p-8 rounded-3xl bg-[#0c0c12] border border-white/[0.08] hover:border-purple-500/40 transition-all cursor-pointer group space-y-3"
            >
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-purple-400 font-bold uppercase">Platform Engineering</span>
                <span className="text-zinc-500">GITOPS FLEET</span>
              </div>
              <h4 className="text-2xl font-bold text-white group-hover:text-purple-300 transition-colors">
                {gitops.title}
              </h4>
              <p className="text-sm text-zinc-400 font-light leading-relaxed">
                Declarative Kubernetes platform using Argo CD and Helm. Automated canary and blue-green rollouts sustaining 99.9%+ uptime.
              </p>
              <div className="pt-3 border-t border-hairline flex items-center justify-between text-xs font-mono">
                <span className="text-purple-400 font-bold">20+ Production Services</span>
                <span className="text-zinc-400 group-hover:text-white transition-colors">View Fleet →</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Case-Study Deep-Dive Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
