"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ExternalLink,
  ArrowRight,
  Server,
  Activity,
  Layers,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { projectsData } from "@/shared/data/projects";
import { Project } from "@/shared/types/project";
import { ProjectModal } from "./ProjectModal";

const appleSpring = {
  type: "spring" as const,
  mass: 0.9,
  stiffness: 220,
  damping: 28,
};

export function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const syncrivo = projectsData.find((p) => p.id === "syncrivo")!;
  const ocnora = projectsData.find((p) => p.id === "ocnora")!;
  const finops = projectsData.find((p) => p.id === "gcp-cost-finops")!;
  const gitops = projectsData.find((p) => p.id === "gitops-platform-fleet")!;

  return (
    <section id="projects" className="py-28 sm:py-36 relative scroll-mt-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="space-y-4 mb-20 pb-8 border-b border-hairline">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-white/[0.10] text-xs font-mono text-cyan-400 font-semibold uppercase tracking-wider">
            <span>Production Systems</span>
          </div>
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-[-0.035em]">
            Flagship Engineering Work
          </h2>
          <p className="text-[#8E8E93] max-w-2xl text-base sm:text-lg font-light leading-relaxed">
            Core backend microservices, distributed event bridges, and cloud-native infrastructure engineered for enterprise reliability and zero downtime.
          </p>
        </div>

        {/* Flagship Case Study 01: SyncRivo */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={appleSpring}
          className="mb-24 p-8 sm:p-14 apple-card space-y-10"
        >
          {/* Card Top Ribbon */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-mono text-cyan-400 font-semibold">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              SyncRivo.ai · 5-Platform Enterprise Bridge
            </span>
            <div className="flex items-center gap-2 text-xs font-mono text-[#8E8E93]">
              <span>LATENCY: &lt; 95MS</span>
              <span className="text-zinc-700">·</span>
              <span className="text-emerald-400 font-semibold">99.98% SLA</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
            {/* Left Narrative: Problem -> Contribution -> Outcome */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <h3 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                  {syncrivo.title}
                </h3>
                <div className="text-xs sm:text-sm font-mono text-cyan-400 mt-2 font-medium">
                  {syncrivo.role}
                </div>
              </div>

              <p className="text-base sm:text-lg text-[#E5E5EA] font-light leading-relaxed">
                {syncrivo.tagline}
              </p>

              {/* 3-Part Apple Editorial Breakdown */}
              <div className="space-y-4 pt-2">
                <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-1.5">
                  <div className="text-xs font-mono text-zinc-400 font-bold uppercase tracking-wider flex items-center gap-2">
                    <Server className="w-3.5 h-3.5 text-cyan-400" />
                    Problem &amp; Challenge
                  </div>
                  <p className="text-xs sm:text-sm text-[#8E8E93] font-light leading-relaxed">
                    Enterprise communication is fragmented across Slack, Microsoft Teams, Google Chat, Zoom Team Chat, and Cisco Webex. Cross-organization teams require real-time synchronization without broken thread hierarchies or cascading feedback loop reflection.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-1.5">
                  <div className="text-xs font-mono text-zinc-400 font-bold uppercase tracking-wider flex items-center gap-2">
                    <Layers className="w-3.5 h-3.5 text-emerald-400" />
                    Backend &amp; DevOps Contribution
                  </div>
                  <p className="text-xs sm:text-sm text-[#8E8E93] font-light leading-relaxed">
                    Architected FastAPI asynchronous webhook receivers (<code className="text-zinc-200">&lt;10ms</code> ACK) decoupled via Redis Pub/Sub, distributed <code className="text-zinc-200">SETNX</code> deduplication locks with SHA-256 fingerprints, bi-directional AST payload schema normalization, and private Artifact Registry authentication wheels.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-1.5">
                  <div className="text-xs font-mono text-zinc-400 font-bold uppercase tracking-wider flex items-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
                    Reliability &amp; Outcome
                  </div>
                  <p className="text-xs sm:text-sm text-[#8E8E93] font-light leading-relaxed">
                    Conferred Reliability Champion award (Mar 2025) for maintaining 99.98% production uptime across enterprise messaging bridge services. Published official verified listings on Microsoft AppSource, Google Workspace Marketplace, Zoom App Marketplace, and Webex App Hub.
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3.5 pt-3">
                <motion.button
                  onClick={() => setSelectedProject(syncrivo)}
                  whileHover={{ y: -2, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={appleSpring}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white text-black font-semibold text-xs hover:bg-zinc-200 transition-shadow shadow-[0_4px_24px_rgba(255,255,255,0.22)] cursor-pointer"
                >
                  <span>Inspect Blueprint &amp; Specs</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>

                {syncrivo.liveUrl && (
                  <motion.a
                    href={syncrivo.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -2, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={appleSpring}
                    className="inline-flex items-center gap-1.5 px-5 py-3.5 rounded-full bg-white/[0.05] border border-white/[0.12] hover:bg-white/[0.09] hover:border-white/[0.2] text-zinc-300 hover:text-white text-xs font-mono transition-colors"
                  >
                    <span>syncrivo.ai</span>
                    <ExternalLink className="w-3.5 h-3.5 text-[#8E8E93]" />
                  </motion.a>
                )}
              </div>
            </div>

            {/* Right Telemetry Column */}
            <div className="lg:col-span-5 space-y-6 lg:border-l lg:border-hairline lg:pl-10">
              <div className="text-xs font-mono uppercase text-[#8E8E93] tracking-wider">
                Production Performance
              </div>

              <div className="grid grid-cols-2 gap-3.5">
                {syncrivo.metrics.map((m, idx) => (
                  <div key={idx} className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
                    <div className="text-[10px] font-mono text-[#8E8E93] uppercase">{m.label}</div>
                    <div className="text-2xl font-mono font-bold text-white mt-1.5">{m.value}</div>
                  </div>
                ))}
              </div>

              {/* Stack Pills */}
              <div className="space-y-2.5 pt-2">
                <div className="text-xs font-mono text-[#8E8E93] uppercase">Core Stack</div>
                <div className="flex flex-wrap gap-2">
                  {syncrivo.stack.map((item, idx) => (
                    <span
                      key={idx}
                      className="px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-zinc-300"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Award Citation */}
              <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/20 space-y-1">
                <div className="text-xs font-mono text-amber-400 font-bold">
                  Reliability Champion Conferred
                </div>
                <div className="text-xs text-[#8E8E93] font-light leading-relaxed">
                  Conferred Mar 2025 for sustaining 99.98% production bridge availability across enterprise messaging fleets.
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Flagship Case Study 02: OCNORA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={appleSpring}
          className="mb-24 p-8 sm:p-14 apple-card space-y-10"
        >
          {/* Card Top Ribbon */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-mono text-amber-400 font-semibold">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              OCNORA.ai · AI Workflow Platform
            </span>
            <div className="flex items-center gap-2 text-xs font-mono text-[#8E8E93]">
              <span>1,000+ PROVIDERS</span>
              <span className="text-zinc-700">·</span>
              <span className="text-emerald-400 font-semibold">ZERO BACKLOG DEFECTS</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
            {/* Left Narrative: Problem -> Contribution -> Outcome */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <h3 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                  {ocnora.title}
                </h3>
                <div className="text-xs sm:text-sm font-mono text-amber-400 mt-2 font-medium">
                  {ocnora.role}
                </div>
              </div>

              <p className="text-base sm:text-lg text-[#E5E5EA] font-light leading-relaxed">
                {ocnora.tagline}
              </p>

              {/* 3-Part Apple Editorial Breakdown */}
              <div className="space-y-4 pt-2">
                <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-1.5">
                  <div className="text-xs font-mono text-zinc-400 font-bold uppercase tracking-wider flex items-center gap-2">
                    <Server className="w-3.5 h-3.5 text-amber-400" />
                    Problem &amp; Challenge
                  </div>
                  <p className="text-xs sm:text-sm text-[#8E8E93] font-light leading-relaxed">
                    Long-running autonomous AI workflows suffer from state fragmentation, runaway recursive LLM API billing spikes, and git workspace pollution when coding agents work across concurrent tasks.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-1.5">
                  <div className="text-xs font-mono text-zinc-400 font-bold uppercase tracking-wider flex items-center gap-2">
                    <Layers className="w-3.5 h-3.5 text-cyan-400" />
                    Backend &amp; DevOps Contribution
                  </div>
                  <p className="text-xs sm:text-sm text-[#8E8E93] font-light leading-relaxed">
                    Engineered asynchronous topological DAG runtime with MongoDB step checkpointing for resilient pause/resume, pre-flight dynamic LLM routers enforcing hard tenant USD budget circuit breakers, and container sandboxes leasing isolated Git worktrees.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-1.5">
                  <div className="text-xs font-mono text-zinc-400 font-bold uppercase tracking-wider flex items-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    Reliability &amp; Outcome
                  </div>
                  <p className="text-xs sm:text-sm text-[#8E8E93] font-light leading-relaxed">
                    Established strict multi-stage verification gates (lint, TypeScript, pytest, Playwright E2E) clearing a 120-defect legacy backlog to zero while eliminating file descriptor exhaustion and proxy timeout leaks.
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3.5 pt-3">
                <motion.button
                  onClick={() => setSelectedProject(ocnora)}
                  whileHover={{ y: -2, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={appleSpring}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white text-black font-semibold text-xs hover:bg-zinc-200 transition-shadow shadow-[0_4px_24px_rgba(255,255,255,0.22)] cursor-pointer"
                >
                  <span>Inspect Engine Specs</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>

                {ocnora.liveUrl && (
                  <motion.a
                    href={ocnora.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -2, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={appleSpring}
                    className="inline-flex items-center gap-1.5 px-5 py-3.5 rounded-full bg-white/[0.05] border border-white/[0.12] hover:bg-white/[0.09] hover:border-white/[0.2] text-zinc-300 hover:text-white text-xs font-mono transition-colors"
                  >
                    <span>ocnora.ai</span>
                    <ExternalLink className="w-3.5 h-3.5 text-[#8E8E93]" />
                  </motion.a>
                )}
              </div>
            </div>

            {/* Right Telemetry Column */}
            <div className="lg:col-span-5 space-y-6 lg:border-l lg:border-hairline lg:pl-10">
              <div className="text-xs font-mono uppercase text-[#8E8E93] tracking-wider">
                Reliability Milestone
              </div>

              {/* Cleared Backlog Card */}
              <div className="p-6 rounded-3xl bg-emerald-950/25 border border-emerald-500/25 space-y-2.5">
                <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-semibold uppercase">
                  <CheckCircle2 className="w-4 h-4" />
                  Test Backlog Cleared
                </div>
                <div className="text-3xl font-mono font-black text-white">120 Defects → 0 Bugs</div>
                <p className="text-xs text-[#8E8E93] font-light leading-relaxed">
                  Eliminated file descriptor exhaustion, container disk leaks, and proxy timeouts across runtime instances.
                </p>
              </div>

              {/* Stack */}
              <div className="space-y-2.5 pt-2">
                <div className="text-xs font-mono text-[#8E8E93] uppercase">Engine Stack</div>
                <div className="flex flex-wrap gap-2">
                  {ocnora.stack.map((item, idx) => (
                    <span
                      key={idx}
                      className="px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-zinc-300"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Supporting Platform & Cloud Infrastructure */}
        <div className="space-y-6">
          <div className="text-xs font-mono text-[#8E8E93] uppercase tracking-wider">
            Supporting Platform &amp; Cloud Infrastructure
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              onClick={() => setSelectedProject(finops)}
              whileHover={{ y: -3 }}
              transition={appleSpring}
              className="p-8 apple-card hover:border-emerald-500/40 transition-colors cursor-pointer group space-y-3"
            >
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-emerald-400 font-bold uppercase">Cloud Cost Governance</span>
                <span className="text-[#8E8E93]">GCP PROD</span>
              </div>
              <h4 className="text-2xl font-bold text-white group-hover:text-emerald-300 transition-colors">
                {finops.title}
              </h4>
              <p className="text-sm text-[#8E8E93] font-light leading-relaxed">
                Automated cloud-cost telemetry workflows reducing monthly GCP spend by 20–25% through container rightsizing and disk cleanup.
              </p>
              <div className="pt-3 border-t border-hairline flex items-center justify-between text-xs font-mono">
                <span className="text-emerald-400 font-bold">-20% to -25% Monthly Spend</span>
                <span className="text-zinc-400 group-hover:text-white transition-colors">View Specs →</span>
              </div>
            </motion.div>

            <motion.div
              onClick={() => setSelectedProject(gitops)}
              whileHover={{ y: -3 }}
              transition={appleSpring}
              className="p-8 apple-card hover:border-purple-500/40 transition-colors cursor-pointer group space-y-3"
            >
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-purple-400 font-bold uppercase">Platform Engineering</span>
                <span className="text-[#8E8E93]">GITOPS FLEET</span>
              </div>
              <h4 className="text-2xl font-bold text-white group-hover:text-purple-300 transition-colors">
                {gitops.title}
              </h4>
              <p className="text-sm text-[#8E8E93] font-light leading-relaxed">
                Declarative Kubernetes platform using Argo CD and Helm. Automated canary and blue-green rollouts sustaining 99.9%+ uptime.
              </p>
              <div className="pt-3 border-t border-hairline flex items-center justify-between text-xs font-mono">
                <span className="text-purple-400 font-bold">20+ Production Services</span>
                <span className="text-zinc-400 group-hover:text-white transition-colors">View Fleet →</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Spring-Animated Apple Sheet Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
