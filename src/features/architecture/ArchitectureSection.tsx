"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu, ShieldCheck, Play, Pause } from "lucide-react";
import { PipelineRunner } from "@/features/pipeline-runner/PipelineRunner";
import { SystemsCluster3D } from "@/shared/components/webgl/SystemsCluster3D";

const transitionEase = [0.16, 1, 0.3, 1] as const;

interface TopologyNode {
  id: string;
  step: string;
  label: string;
  type: string;
  stageTag: string;
  description: string;
  tech: string[];
}

export function ArchitectureSection() {
  const [activeMode, setActiveMode] = useState<"syncrivo" | "ocnora">("syncrivo");
  const [selectedNodeId, setSelectedNodeId] = useState<string>("sync-dedup");
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [viewFormat, setViewFormat] = useState<"3d" | "stages">("3d");

  const syncrivoNodes: TopologyNode[] = [
    {
      id: "sync-ingress",
      step: "01",
      label: "Webhook Ingress & Signature Verification",
      type: "Ingress Receiver",
      stageTag: "< 200ms ACK",
      description:
        "FastAPI asynchronous webhook receivers accepting high-velocity events from Slack, Teams Graph API, Google Chat, Zoom, and Cisco Webex. Validates cryptographic HMAC signatures and enqueues events immediately to acknowledge upstream platforms within strict HTTP timeout windows.",
      tech: ["FastAPI", "AsyncIO", "HMAC-SHA256", "Google Cloud Run"],
    },
    {
      id: "sync-dedup",
      step: "02",
      label: "Redis Deduplication & Loop Guard",
      type: "Distributed Lock",
      stageTag: "Zero Echo",
      description:
        "Distributed Redis cluster utilizing atomic SETNX locks and SHA-256 payload fingerprints. Prevents infinite feedback loops when messages are mirrored across multi-linked cross-organization channels; maintains bidirectional conversation and thread ID lookup tables.",
      tech: ["Redis Cluster", "Atomic Locks", "SHA-256 Fingerprints"],
    },
    {
      id: "sync-auth",
      step: "03",
      label: "Auth & Identity Resolution",
      type: "Auth Module",
      stageTag: "OAuth 2.0 / JWT",
      description:
        "Custom authentication library published to Google Artifact Registry. Enforces multi-tenant organizational linkages, validates active vs. suspended states, and resolves delegated credentials.",
      tech: ["Artifact Registry", "OAuth 2.0", "JWT", "Tenant Isolation"],
    },
    {
      id: "sync-translation",
      step: "04",
      label: "AST Payload Normalization",
      type: "AST Engine",
      stageTag: "Bi-Directional",
      description:
        "Bi-directional AST normalizer converting between Markdown, Slack mrkdwn, Teams HTML, Zoom formatting, and Webex blocks. Handles message edits, thread parent linking, deletions, and attachment proxies.",
      tech: ["AST Normalizer", "Slack Blocks", "Teams Graph", "Zoom API"],
    },
    {
      id: "sync-delivery",
      step: "05",
      label: "Downstream Delivery & Attribution",
      type: "Egress Dispatcher",
      stageTag: "Backoff / DLQ",
      description:
        "Asynchronous egress workers delivering transformed messages into destination platforms with native sender attribution. Governed by exponential backoff with jitter and Dead Letter Queue alerts.",
      tech: ["Delegated Tokens", "Exponential Backoff", "DLQ Alerting"],
    },
  ];

  const ocnoraNodes: TopologyNode[] = [
    {
      id: "ocn-connect",
      step: "01",
      label: "Provider Ingestion & Intent Definition",
      type: "Provider Ingestion",
      stageTag: "1,000+ Providers",
      description:
        "Integration ecosystem connecting 1,000+ cataloged cloud and app services or generating end-to-end multi-step workflow graphs directly from user intent via semantic prompt routing.",
      tech: ["1,000+ Providers", "Build with AI", "Prompt Engineering"],
    },
    {
      id: "ocn-validate",
      step: "02",
      label: "Pre-Flight & Budget Circuit Breaker",
      type: "Governance",
      stageTag: "USD & Token Caps",
      description:
        "Workflow health pre-flight validation, input schema verification, and dry-run testing before execution. Evaluates Human-in-the-loop approvals and dynamic LLM routing enforced by per-tenant budget ceilings.",
      tech: ["Pre-Flight Dry Run", "Human Approvals", "Model Routing"],
    },
    {
      id: "ocn-execution",
      step: "03",
      label: "Stateful Graph Execution",
      type: "DAG Engine",
      stageTag: "Async DAG",
      description:
        "Asynchronous execution engine orchestrating topological DAG dependencies, event triggers, conditional branching, and persistent suspend/resume states in MongoDB.",
      tech: ["Python AsyncIO", "MongoDB State", "Docker", "GKE"],
    },
    {
      id: "ocn-audit",
      step: "04",
      label: "Audit & Observability",
      type: "KMS Encrypted",
      stageTag: "Envelope Security",
      description:
        "Comprehensive audit logs tracking every step mutation and state execution. Features envelope-encrypted secrets at rest (Google Cloud KMS / AWS KMS) and tenant data-layer isolation.",
      tech: ["Cloud KMS", "AWS KMS", "Tenant Isolation", "Audit Logs"],
    },
    {
      id: "ocn-runner",
      step: "05",
      label: "Autonomous Git Worktree Runner",
      type: "Software Delivery",
      stageTag: "120 Defects → 0",
      description:
        "Autonomous AI coding agents leasing isolated git worktrees to pick up queued product backlog tasks, execute comprehensive verification suites (lint, types, pytest, Playwright), and open verified PRs.",
      tech: ["Git Worktrees", "AI Agents", "pytest", "Playwright"],
    },
  ];

  const currentNodes = activeMode === "syncrivo" ? syncrivoNodes : ocnoraNodes;
  const activeNode =
    currentNodes.find((n) => n.id === selectedNodeId) || currentNodes[0];

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setSelectedNodeId((prevId) => {
        const currentIndex = currentNodes.findIndex((n) => n.id === prevId);
        const nextIndex = (currentIndex + 1) % currentNodes.length;
        return currentNodes[nextIndex].id;
      });
    }, 4500);
    return () => clearInterval(interval);
  }, [currentNodes, isPaused]);

  return (
    <section
      id="architecture"
      className="py-24 relative scroll-mt-24"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header with Segmented Pills */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 pb-8 border-b border-hairline">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-cyan-400 font-semibold uppercase tracking-wider">
              <Cpu className="w-3.5 h-3.5" />
              <span>Systems Architecture</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-black text-white tracking-[-0.03em]">
              Distributed Event Architecture
            </h2>
            <p className="text-zinc-400 max-w-xl text-base font-light leading-relaxed">
              Explore the interactive 3D distributed systems cluster or inspect pipeline stages, engineering trade-offs, and operational safeguards.
            </p>
          </div>

          {/* Segmented Controls */}
          <div className="flex flex-wrap items-center gap-3">
            {/* View Format: 3D Topology vs Stages */}
            <div className="flex items-center p-1 rounded-full bg-white/[0.05] border border-white/10">
              <button
                type="button"
                onClick={() => setViewFormat("3d")}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                  viewFormat === "3d"
                    ? "bg-white text-black font-semibold shadow-md"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                🌐 3D Topology
              </button>
              <button
                type="button"
                onClick={() => setViewFormat("stages")}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                  viewFormat === "stages"
                    ? "bg-white text-black font-semibold shadow-md"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                ⚡ Pipeline Stages
              </button>
            </div>

            {/* Platform Selection */}
            <div className="flex items-center p-1 rounded-full bg-white/[0.05] border border-white/10">
              <button
                onClick={() => {
                  setActiveMode("syncrivo");
                  setSelectedNodeId("sync-dedup");
                }}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                  activeMode === "syncrivo"
                    ? "bg-cyan-400 text-black font-bold shadow-md"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                SyncRivo Bridge
              </button>
              <button
                onClick={() => {
                  setActiveMode("ocnora");
                  setSelectedNodeId("ocn-validate");
                }}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                  activeMode === "ocnora"
                    ? "bg-amber-400 text-black font-bold shadow-md"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                OCNORA Engine
              </button>
            </div>

            {/* Pause/Play toggle */}
            <button
              onClick={() => setIsPaused(!isPaused)}
              className="p-2 rounded-full bg-white/[0.05] border border-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer"
              title={isPaused ? "Resume auto-rotation" : "Pause auto-rotation"}
            >
              {isPaused ? <Play className="w-3.5 h-3.5 text-emerald-400" /> : <Pause className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* 3D Topology Centerpiece (Apple Framed Spatial Canvas) */}
        {viewFormat === "3d" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="mb-14 border border-white/[0.12] rounded-[2.5rem] bg-[#0c0c12] overflow-hidden shadow-[0_24px_60px_rgba(0,0,0,0.85)]"
          >
            <div className="p-4 sm:p-5 border-b border-white/[0.08] flex items-center justify-between text-xs font-mono text-zinc-400 bg-black/40">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
                <span className="text-white font-semibold">Interactive Three.js Systems Cluster</span>
              </div>
              <span className="text-[11px] text-zinc-500">Drag to Orbit · Scroll to Zoom · Click Node to Raycast</span>
            </div>
            <SystemsCluster3D theme="dark" />
          </motion.div>
        )}

        {/* Stages View */}
        <div className="relative py-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative z-10">
            {currentNodes.map((node) => {
              const isSelected = activeNode.id === node.id;
              return (
                <div
                  key={node.id}
                  onClick={() => {
                    setSelectedNodeId(node.id);
                    setIsPaused(true);
                  }}
                  className={`p-5 rounded-3xl transition-all cursor-pointer border ${
                    isSelected
                      ? "bg-white/[0.08] border-white/30 shadow-xl"
                      : "bg-[#0c0c12] border-white/[0.08] hover:border-white/20"
                  }`}
                >
                  <div className="flex items-center justify-between font-mono text-xs mb-3">
                    <span
                      className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs ${
                        isSelected
                          ? activeMode === "syncrivo"
                            ? "bg-cyan-400 text-black"
                            : "bg-amber-400 text-black"
                          : "bg-white/[0.05] text-zinc-400"
                      }`}
                    >
                      {node.step}
                    </span>
                    <span className="text-[10px] text-zinc-400 bg-white/[0.05] px-2.5 py-0.5 rounded-full">
                      {node.stageTag}
                    </span>
                  </div>
                  <div className="text-[11px] font-mono text-zinc-500 uppercase">{node.type}</div>
                  <div className="font-semibold text-sm text-white mt-1 leading-snug">{node.label}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Stage Detail Panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeNode.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4, ease: transitionEase }}
            className="mt-8 p-8 sm:p-10 rounded-[2rem] bg-[#0c0c12] border border-white/[0.1] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
          >
            <div className="lg:col-span-8 space-y-3">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-xs font-mono px-3 py-1 rounded-full bg-white/[0.06] text-white font-medium">
                  STAGE {activeNode.step} · {activeNode.type}
                </span>
                <span className="text-xs font-mono text-emerald-400 font-semibold">
                  [{activeNode.stageTag}]
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white">{activeNode.label}</h3>
              <p className="text-zinc-300 text-base leading-relaxed font-light">
                {activeNode.description}
              </p>
            </div>

            <div className="lg:col-span-4 lg:border-l lg:border-hairline lg:pl-8 space-y-2.5">
              <div className="text-xs font-mono uppercase text-zinc-500 tracking-wider">
                Protocols &amp; Tooling
              </div>
              <div className="flex flex-wrap gap-2">
                {activeNode.tech.map((t, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-full bg-white/[0.05] border border-white/[0.08] text-xs font-mono text-zinc-200"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Decisions & Operational Safeguards */}
        <div className="mt-16 space-y-6">
          <div className="flex items-center justify-between border-b border-hairline pb-4">
            <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest font-semibold flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" />
              <span>Architectural Decisions &amp; Operational Safeguards</span>
            </div>
            <span className="text-xs font-mono text-zinc-500">
              {activeMode === "syncrivo" ? "5-PLATFORM BRIDGE" : "AI DAG RUNTIME"}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(activeMode === "syncrivo"
              ? [
                  {
                    decision: "Asynchronous Ingress Decoupling",
                    category: "High-Throughput Ingestion",
                    tradeoff: "Decoupled Redis Pub/Sub buffer vs. direct synchronous API dispatch.",
                    safeguard: "Immediate <10ms HTTP 200 response to satisfy Slack/Teams 3s SLA; isolates downstream rate limits.",
                  },
                  {
                    decision: "Cryptographic Loop & Echo Prevention",
                    category: "Event Processing",
                    tradeoff: "Sliding-window Redis SETNX locks with SHA-256 payload fingerprints vs. localized in-memory cache.",
                    safeguard: "Guarantees multi-pod consistency; 0% reflection across bridges with < 1KB per message memory footprint.",
                  },
                  {
                    decision: "Universal AST Intermediate Schema",
                    category: "Payload Translation",
                    tradeoff: "Intermediate AST translation schema vs. direct N×N point-to-point platform mappers.",
                    safeguard: "Scales at O(N) complexity for adding new platforms; preserves formatting fidelity and thread cards.",
                  },
                  {
                    decision: "Artifact Registry Auth Wheel & DLQ",
                    category: "Identity & Reliability",
                    tradeoff: "Centralized private Python wheel and jittered backoff vs. replicated auth code.",
                    safeguard: "Enforces uniform token lifecycles, true sender profile attribution, and Dead Letter Queue alert routing.",
                  },
                ]
              : [
                  {
                    decision: "Topological Stateful DAG Runtime",
                    category: "Workflow Engine",
                    tradeoff: "Dependency-aware DAG sorting with MongoDB checkpointing vs. sequential script execution.",
                    safeguard: "Enforces step-level checkpoint persistence; enables resilient suspend/resume across async steps and approvals.",
                  },
                  {
                    decision: "Dynamic Model Router & Budget Circuit Breaker",
                    category: "AI Governance",
                    tradeoff: "Pre-flight token and USD ledger checks on each LLM call vs. asynchronous post-billing alerts.",
                    safeguard: "Enforces hard tenant-level financial caps, completely preventing runaway cost spikes during autonomous agent loops.",
                  },
                  {
                    decision: "Isolated Ephemeral Git Worktree Sandboxes",
                    category: "Software Delivery",
                    tradeoff: "Container sandboxes with isolated Git worktrees vs. shared workspace directories.",
                    safeguard: "Complete workspace isolation for concurrent coding agents; eliminates dirty git states and working dir leaks.",
                  },
                  {
                    decision: "Strict CI/CD Quality Gates & Defect Eradication",
                    category: "Platform Reliability",
                    tradeoff: "Multi-stage pipeline checks (lint, TypeScript, pytest, Playwright E2E) vs. rapid unverified deployments.",
                    safeguard: "Cleared 120 backlogged defects to zero; eliminated file descriptor exhaustion and proxy timeouts.",
                  },
                ]
            ).map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-[#0c0c12] border border-white/[0.08] space-y-2 hover:border-white/20 transition-colors"
              >
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-white font-bold">{item.decision}</span>
                  <span className="text-zinc-500 uppercase">{item.category}</span>
                </div>
                <div className="text-xs text-zinc-300 font-light leading-relaxed">
                  <strong className="text-zinc-400 block mb-0.5 font-normal">Trade-Off:</strong>
                  {item.tradeoff}
                </div>
                <div className="text-xs text-emerald-400/90 font-light leading-relaxed pt-2 border-t border-hairline">
                  <strong className="text-emerald-500 block mb-0.5 font-normal">Safeguard Deployed:</strong>
                  {item.safeguard}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Client-Side Pipeline Runner */}
        <div className="mt-14">
          <PipelineRunner />
        </div>
      </div>
    </section>
  );
}
