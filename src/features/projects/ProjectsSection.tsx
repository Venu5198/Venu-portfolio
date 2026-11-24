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
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Server,
  Cloud,
} from "lucide-react";
import { projectsData } from "@/shared/data/projects";
import { Project } from "@/shared/types/project";
import { TelemetryBadge } from "@/shared/components/TelemetryBadge";
import { ProjectModal } from "./ProjectModal";

export function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const syncrivo = projectsData.find((p) => p.id === "syncrivo")!;
  const ocnora = projectsData.find((p) => p.id === "ocnora")!;
  const finops = projectsData.find((p) => p.id === "gcp-cost-finops")!;
  const gitops = projectsData.find((p) => p.id === "gitops-platform-fleet")!;

  return (
    <section id="projects" className="py-28 relative scroll-mt-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="space-y-4 mb-20 pb-8 border-b border-hairline">
          <div className="font-mono text-xs text-cyan-400 uppercase tracking-[0.25em] font-semibold flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            Flagship Engineering Deliveries
          </div>
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tighter uppercase leading-[0.9]">
            Production Systems Built Solo
          </h2>
          <p className="text-zinc-400 max-w-2xl text-base sm:text-lg font-light leading-relaxed">
            Single-handedly designed, coded, and operated from line zero to active enterprise
            production. Click either flagship system to inspect full architecture blueprints.
          </p>
        </div>

        {/* Narrative Showcase 01: SyncRivo (5 Enterprise Messaging Platforms) */}
        <div className="mb-24 pb-20 border-b border-hairline space-y-10">
          <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
            <span className="text-cyan-400 font-bold uppercase tracking-widest flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              // 01 · 5-PLATFORM MESSAGING BRIDGE · SYNCRIVO.AI
            </span>
            <div className="flex items-center gap-3">
              <span className="text-zinc-500">SYNC LATENCY: &lt; 95MS</span>
              <TelemetryBadge status="online" label="5 ECOSYSTEMS LIVE" />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
            {/* Left: Project Headline & Narrative */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <h3 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                  {syncrivo.title}
                </h3>
                <div className="font-mono text-xs sm:text-sm text-cyan-400">
                  {syncrivo.role}
                </div>
              </div>

              <p className="text-base sm:text-lg text-zinc-300 font-light leading-relaxed">
                {syncrivo.tagline}
              </p>

              {/* Narrative Pillars with Hairlines */}
              <div className="space-y-4 pt-2">
                <div className="p-5 rounded-2xl bg-white/[0.02] border border-hairline space-y-1.5">
                  <div className="font-mono text-xs text-cyan-400 font-bold flex items-center gap-2">
                    <Server className="w-3.5 h-3.5" />
                    DISTRIBUTED AUTH &amp; SHARED LIBRARY
                  </div>
                  <div className="text-xs text-zinc-400 font-light leading-relaxed">
                    Designed a multi-service architecture with a versioned shared auth library
                    published to Google Artifact Registry. FastAPI backends on MongoDB with Redis
                    cluster for sub-millisecond deduplication and echo/loop guards.
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-white/[0.02] border border-hairline space-y-1.5">
                  <div className="font-mono text-xs text-emerald-400 font-bold flex items-center gap-2">
                    <Activity className="w-3.5 h-3.5" />
                    NATIVE IDENTITY ATTRIBUTION ACROSS 5 PLATFORMS
                  </div>
                  <div className="text-xs text-zinc-400 font-light leading-relaxed">
                    Real-time sync of edits, deletes, threads, attachments, and file cards across
                    Slack, Microsoft Teams, Google Chat, Zoom Team Chat, and Cisco Webex with native
                    sender avatars and interactive in-chat <code className="text-zinc-200">.search</code> and{" "}
                    <code className="text-zinc-200">.support</code> modal dialogs.
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-white/[0.02] border border-hairline space-y-1.5">
                  <div className="font-mono text-xs text-purple-400 font-bold flex items-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    VERIFIED MARKETPLACES &amp; HIPAA READINESS
                  </div>
                  <div className="text-xs text-zinc-400 font-light leading-relaxed">
                    Official verified apps on Microsoft AppSource, Google Workspace Marketplace,
                    Zoom App Marketplace, and Webex App Hub. HttpOnly sessions, CSRF guards, RBAC,
                    and led HIPAA readiness with BAA negotiations and SOC 2 prep.
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <button
                  onClick={() => setSelectedProject(syncrivo)}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-cyan-400 text-black font-bold text-xs hover:bg-cyan-300 transition-all shadow-[0_0_25px_rgba(6,182,212,0.4)]"
                >
                  <span>Inspect Blueprint &amp; Specs</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                {syncrivo.liveUrl && (
                  <a
                    href={syncrivo.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-5 py-3 rounded-full bg-white/[0.03] border border-hairline text-zinc-300 hover:text-white text-xs font-mono transition-all"
                  >
                    <span>syncrivo.ai</span>
                    <ExternalLink className="w-3.5 h-3.5 text-zinc-500" />
                  </a>
                )}
              </div>
            </div>

            {/* Right: Operational Telemetry & Tech Stack */}
            <div className="lg:col-span-5 space-y-6 lg:border-l lg:border-hairline lg:pl-10">
              <div className="font-mono text-xs uppercase text-zinc-500 tracking-wider">
                PRODUCTION OPERATIONAL METRICS
              </div>

              <div className="grid grid-cols-2 gap-4">
                {syncrivo.metrics.map((m, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-white/[0.02] border border-hairline">
                    <div className="text-[10px] font-mono text-zinc-500 uppercase">{m.label}</div>
                    <div className="text-xl font-mono font-bold text-white mt-1">{m.value}</div>
                  </div>
                ))}
              </div>

              {/* Tech Stack Pills */}
              <div className="space-y-2 pt-2">
                <div className="text-xs font-mono text-zinc-500 uppercase">
                  CORE INFRASTRUCTURE STACK
                </div>
                <div className="flex flex-wrap gap-2">
                  {syncrivo.stack.map((item, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-lg bg-white/[0.03] border border-hairline text-xs font-mono text-zinc-300"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Award Recognition Note */}
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 space-y-1">
                <div className="text-xs font-mono text-amber-400 font-bold">
                  RELIABILITY CHAMPION RECOGNITION
                </div>
                <div className="text-xs text-zinc-400 font-light">
                  Conferred Mar 2025 for maintaining 99.98% production uptime across distributed
                  messaging bridge services.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Narrative Showcase 02: OCNORA (AI Workflow Platform) */}
        <div className="mb-24 pb-20 border-b border-hairline space-y-10">
          <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
            <span className="text-amber-400 font-bold uppercase tracking-widest flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              // 02 · AI WORKFLOW AUTOMATION PLATFORM · OCNORA.AI
            </span>
            <div className="flex items-center gap-3">
              <span className="text-zinc-500">1,000+ PROVIDERS</span>
              <TelemetryBadge status="alert" label="COMPETING WITH N8N" />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
            {/* Left: Project Narrative & Engine Specs */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <h3 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                  {ocnora.title}
                </h3>
                <div className="font-mono text-xs sm:text-sm text-amber-400">
                  {ocnora.role}
                </div>
              </div>

              <p className="text-base sm:text-lg text-zinc-300 font-light leading-relaxed">
                {ocnora.tagline}
              </p>

              {/* Engine Highlights */}
              <div className="space-y-4 pt-2">
                <div className="p-5 rounded-2xl bg-white/[0.02] border border-hairline space-y-1.5">
                  <div className="font-mono text-xs text-amber-400 font-bold flex items-center gap-2">
                    <Server className="w-3.5 h-3.5" />
                    STATE MACHINE &amp; 1,000+ APP PROVIDERS
                  </div>
                  <div className="text-xs text-zinc-400 font-light leading-relaxed">
                    Custom stateful workflow engine supporting arbitrary triggers, dry runs,
                    execution order, suspend/resume of long-running batch steps, and complete run
                    history across 1,000+ cataloged providers (GCP, AWS, Salesforce, Notion,
                    Workspace).
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-white/[0.02] border border-hairline space-y-1.5">
                  <div className="font-mono text-xs text-cyan-400 font-bold flex items-center gap-2">
                    <Bot className="w-3.5 h-3.5" />
                    BUILD WITH AI &amp; COST GOVERNANCE
                  </div>
                  <div className="text-xs text-zinc-400 font-light leading-relaxed">
                    Turns natural language intent into working graphs with prompt enhancement.
                    Auto-discovers LLMs with per-node selection, hard budget alerts, and per-call
                    usage ledgers.
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-white/[0.02] border border-hairline space-y-1.5">
                  <div className="font-mono text-xs text-emerald-400 font-bold flex items-center gap-2">
                    <Layers className="w-3.5 h-3.5" />
                    AUTONOMOUS GIT WORKTREE CODE RUNNER
                  </div>
                  <div className="text-xs text-zinc-400 font-light leading-relaxed">
                    Autonomous AI agents implement queued product backlog tasks in isolated git
                    worktrees, run test suites, and open verified GitHub PRs with leases and
                    retries. Self-hosted via Docker Compose/Helm or Cloud Run/GKE.
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <button
                  onClick={() => setSelectedProject(ocnora)}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-amber-400 text-black font-bold text-xs hover:bg-amber-300 transition-all shadow-[0_0_25px_rgba(245,158,11,0.4)]"
                >
                  <span>Inspect Engine Specifications</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                {ocnora.liveUrl && (
                  <a
                    href={ocnora.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-5 py-3 rounded-full bg-white/[0.03] border border-hairline text-zinc-300 hover:text-white text-xs font-mono transition-all"
                  >
                    <span>ocnora.ai</span>
                    <ExternalLink className="w-3.5 h-3.5 text-zinc-500" />
                  </a>
                )}
              </div>
            </div>

            {/* Right: Cleared Defect Backlog Record & Node Stats */}
            <div className="lg:col-span-5 space-y-6 lg:border-l lg:border-hairline lg:pl-10">
              <div className="font-mono text-xs uppercase text-zinc-500 tracking-wider">
                DEFECT ELIMINATION &amp; RELIABILITY
              </div>

              {/* Large Defect Milestone Callout */}
              <div className="p-6 rounded-3xl bg-emerald-950/20 border border-emerald-500/20 space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase font-semibold">
                  <CheckCircle2 className="w-4 h-4" />
                  Test Backlog Cleared
                </div>
                <div className="text-3xl font-mono font-black text-white">120 Defects → 0 Bugs</div>
                <p className="text-xs text-zinc-400 font-light leading-relaxed">
                  Engineered comprehensive verification gates (lint, types, unit, component, E2E)
                  and resolved severe production leaks: file descriptors, runaway container disk,
                  and proxy timeouts.
                </p>
              </div>

              {/* Tech Stack Pills */}
              <div className="space-y-2 pt-2">
                <div className="text-xs font-mono text-zinc-500 uppercase">
                  ENGINE &amp; RUNTIME STACK
                </div>
                <div className="flex flex-wrap gap-2">
                  {ocnora.stack.map((item, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-lg bg-white/[0.03] border border-hairline text-xs font-mono text-zinc-300"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Supporting Verified Deployments: FinOps Engine & Kubernetes Fleet */}
        <div className="space-y-6">
          <div className="font-mono text-xs text-zinc-500 uppercase tracking-wider">
            SUPPORTING PLATFORM &amp; CLOUD INFRASTRUCTURE
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div
              onClick={() => setSelectedProject(finops)}
              className="p-8 rounded-3xl bg-white/[0.02] border border-hairline hover:border-emerald-500/40 transition-all cursor-pointer group space-y-4"
            >
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="text-emerald-400 font-bold uppercase tracking-wider">
                  CLOUD COST GOVERNANCE
                </span>
                <span className="text-zinc-500">GCP PROD</span>
              </div>
              <h4 className="text-2xl font-bold text-white group-hover:text-emerald-300 transition-colors">
                {finops.title}
              </h4>
              <p className="text-sm text-zinc-400 font-light leading-relaxed">
                Automated cloud-cost telemetry workflows reducing monthly GCP spend by 20–25%
                through container rightsizing, cold-start scheduling, and persistent disk cleanup.
              </p>
              <div className="pt-4 border-t border-hairline flex items-center justify-between text-xs font-mono">
                <span className="text-emerald-400 font-bold">-20% to -25% Monthly Spend</span>
                <span className="text-zinc-500 group-hover:text-white transition-colors">
                  View Specs →
                </span>
              </div>
            </div>

            <div
              onClick={() => setSelectedProject(gitops)}
              className="p-8 rounded-3xl bg-white/[0.02] border border-hairline hover:border-purple-500/40 transition-all cursor-pointer group space-y-4"
            >
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="text-purple-400 font-bold uppercase tracking-wider">
                  PLATFORM ENGINEERING
                </span>
                <span className="text-zinc-500">GITOPS FLEET</span>
              </div>
              <h4 className="text-2xl font-bold text-white group-hover:text-purple-300 transition-colors">
                {gitops.title}
              </h4>
              <p className="text-sm text-zinc-400 font-light leading-relaxed">
                Declarative Kubernetes platform using Argo CD and Helm. Automated canary and
                blue-green rollouts sustaining 99.9%+ uptime across 20+ microservices with 35% faster
                incident recovery.
              </p>
              <div className="pt-4 border-t border-hairline flex items-center justify-between text-xs font-mono">
                <span className="text-purple-400 font-bold">20+ Production Services</span>
                <span className="text-zinc-500 group-hover:text-white transition-colors">
                  View Fleet →
                </span>
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
