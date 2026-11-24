"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Cpu,
  Layers,
  ArrowRight,
  ShieldCheck,
  Zap,
  Activity,
  Server,
  Sparkles,
  Play,
  Pause,
} from "lucide-react";
import { TelemetryBadge } from "@/shared/components/TelemetryBadge";

const transitionEase = [0.22, 1, 0.36, 1] as const;

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

  const syncrivoNodes: TopologyNode[] = [
    {
      id: "sync-ingress",
      step: "01",
      label: "Webhook Ingress & Signature Verification",
      type: "Ingress Receiver",
      stageTag: "Fast Acknowledge (< 200ms)",
      description:
        "FastAPI asynchronous webhook receivers accepting high-velocity events from Slack, Teams Graph API, Google Chat, Zoom Team Chat, and Cisco Webex. Validates cryptographic HMAC signatures and enqueues events immediately to acknowledge upstream platforms within strict HTTP timeout windows.",
      tech: ["FastAPI", "AsyncIO", "HMAC-SHA256", "Google Cloud Run", "Event Queue"],
    },
    {
      id: "sync-dedup",
      step: "02",
      label: "Redis Deduplication, Loop Guard & ID Mapping",
      type: "Distributed Lock & Cache",
      stageTag: "Zero Echo Guarantee",
      description:
        "Distributed Redis cluster utilizing atomic SETNX locks and SHA-256 payload fingerprints. Prevents infinite feedback loops when messages are mirrored across multi-linked cross-organization channels; maintains bidirectional conversation and thread ID lookup tables.",
      tech: ["Redis Cluster", "Atomic Locks", "SHA-256 Fingerprints", "Thread Mapping"],
    },
    {
      id: "sync-auth",
      step: "03",
      label: "Auth & Token/Identity Resolution",
      type: "Enterprise Auth Library",
      stageTag: "Artifact Registry Auth",
      description:
        "Custom versioned authentication library published to Google Artifact Registry. Enforces multi-tenant organizational linkages, validates active vs. suspended states, and resolves delegated credentials (Teams delegated tokens, Slack chat:write.customize, Google domain-wide delegation, Zoom OAuth, and Webex OAuth).",
      tech: ["Artifact Registry", "OAuth 2.0", "JWT", "Tenant Isolation", "HIPAA BAA"],
    },
    {
      id: "sync-translation",
      step: "04",
      label: "Payload & Format Translation",
      type: "AST Normalization",
      stageTag: "Bi-Directional AST",
      description:
        "Bi-directional AST normalizer converting between Markdown, Slack mrkdwn, Teams HTML, Zoom formatting, and Webex blocks. Handles message edits, thread parent linking, soft and hard deletions, attachment/file-card proxies, and cross-platform @mention user ID translations.",
      tech: ["AST Normalizer", "Slack Blocks", "Teams Graph", "Zoom API", "Webex API"],
    },
    {
      id: "sync-delivery",
      step: "05",
      label: "Downstream Delivery & Native Attribution",
      type: "Egress Dispatcher",
      stageTag: "Retries / Backoff / DLQ",
      description:
        "Asynchronous egress workers delivering transformed messages into destination platforms with native sender avatar and display-name attribution. Governed by exponential backoff with jitter, HTTP 429 rate-limit backoff, and Dead Letter Queue (DLQ) alerts for persistent upstream failures.",
      tech: ["Delegated Tokens", "Exponential Backoff", "Rate Limiting", "DLQ Alerting"],
    },
  ];

  const ocnoraNodes: TopologyNode[] = [
    {
      id: "ocn-connect",
      step: "01",
      label: "Connect & Define",
      type: "Provider Ingestion",
      stageTag: "1,000+ App Providers",
      description:
        "Integration ecosystem connecting 1,000+ cataloged cloud and app services (GCP, AWS, Salesforce, Notion, Workspace) or generating end-to-end multi-step workflow graphs directly from plain-English intent via 'Build with AI' semantic prompt enhancement.",
      tech: ["1,000+ Providers", "Build with AI", "Prompt Engineering", "Next.js"],
    },
    {
      id: "ocn-validate",
      step: "02",
      label: "Validate & Approve / Budget Guardrails",
      type: "Pre-Flight & Governance",
      stageTag: "USD & Token Ledger",
      description:
        "Workflow health pre-flight validation, input schema verification, and dry-run testing before execution. Evaluates Human-in-the-loop approval nodes and dynamic LLM routing (Claude, Gemini, GPT) enforced by per-tenant token and USD budget circuit breakers.",
      tech: ["Pre-Flight Dry Run", "Human Approvals", "Model Routing", "Budget Enforcer"],
    },
    {
      id: "ocn-execution",
      step: "03",
      label: "Stateful Graph Execution",
      type: "Core DAG Runtime",
      stageTag: "Async DAG Runtime",
      description:
        "Asynchronous execution engine orchestrating topological DAG dependencies, event triggers, conditional branching, and persistent suspend/resume states for long-running batch and real-time integration workflows.",
      tech: ["Python AsyncIO", "MongoDB State", "Docker", "GKE", "DAG Engine"],
    },
    {
      id: "ocn-audit",
      step: "04",
      label: "Audit & Inspect",
      type: "Security & Observability",
      stageTag: "Envelope KMS Encrypted",
      description:
        "Comprehensive audit logs tracking every step mutation and state execution. Features envelope-encrypted secrets at rest (Google Cloud KMS / AWS KMS), tenant data-layer isolation, and enterprise OIDC/SAML 2.0 single sign-on with JIT provisioning.",
      tech: ["Cloud KMS", "AWS KMS", "Tenant Isolation", "Audit Logs", "SAML / OIDC"],
    },
    {
      id: "ocn-runner",
      step: "05",
      label: "Git Worktree PR Runner (Delivery)",
      type: "Autonomous Software Delivery",
      stageTag: "120 Defects → 0 Bugs",
      description:
        "Autonomous AI coding agents leasing isolated git worktrees to pick up queued product backlog tasks, implement code changes, execute comprehensive verification suites (lint, types, pytest, Vitest, Playwright), and open verified GitHub PRs.",
      tech: ["Git Worktrees", "AI Coding Agents", "pytest", "Playwright", "GitHub PRs"],
    },
  ];

  const currentNodes = activeMode === "syncrivo" ? syncrivoNodes : ocnoraNodes;
  const activeNode =
    currentNodes.find((n) => n.id === selectedNodeId) || currentNodes[0];

  // Auto-Cycle through stages 01 -> 05 every 4 seconds unless paused by hover/click
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setSelectedNodeId((prevId) => {
        const currentIndex = currentNodes.findIndex((n) => n.id === prevId);
        const nextIndex = (currentIndex + 1) % currentNodes.length;
        return currentNodes[nextIndex].id;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [currentNodes, isPaused]);

  return (
    <section
      id="architecture"
      className="py-28 relative scroll-mt-32"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header with Mode Toggles */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-8 border-b border-hairline">
          <div className="space-y-4">
            <div className="font-mono text-xs text-emerald-400 uppercase tracking-[0.25em] font-semibold flex items-center gap-2">
              <Cpu className="w-3.5 h-3.5" />
              Connected Pipeline Flow
            </div>
            <h2 className="text-4xl sm:text-6xl font-black text-white tracking-tighter uppercase leading-[0.9]">
              Systems Architecture
            </h2>
            <p className="text-zinc-400 max-w-xl text-base font-light leading-relaxed">
              Cinematic animated pipeline showing end-to-end data transmission. Cycles
              automatically or click any stage to pause and inspect.
            </p>
          </div>

          {/* Mode Switcher Tabs with Crystal Clear Labels */}
          <div className="flex items-center gap-3 self-start">
            <div className="flex items-center p-1 rounded-full bg-white/[0.03] border border-hairline">
              <button
                onClick={() => {
                  setActiveMode("syncrivo");
                  setSelectedNodeId("sync-dedup");
                }}
                className={`px-5 py-2.5 rounded-full text-xs font-mono font-bold transition-all duration-300 ${
                  activeMode === "syncrivo"
                    ? "bg-cyan-400 text-black shadow-[0_0_25px_rgba(6,182,212,0.45)]"
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
                className={`px-5 py-2.5 rounded-full text-xs font-mono font-bold transition-all duration-300 ${
                  activeMode === "ocnora"
                    ? "bg-amber-400 text-black shadow-[0_0_25px_rgba(245,158,11,0.45)]"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                OCNORA Engine
              </button>
            </div>

            {/* Play/Pause indicator button */}
            <button
              onClick={() => setIsPaused(!isPaused)}
              className="p-2.5 rounded-full bg-white/[0.03] border border-hairline text-zinc-400 hover:text-white transition-colors"
              title={isPaused ? "Resume auto-cycling" : "Pause auto-cycling"}
            >
              {isPaused ? <Play className="w-3.5 h-3.5 text-emerald-400" /> : <Pause className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Visual Connected Pipeline Flow Diagram */}
        <div className="relative py-8">
          {/* Continuous Connecting Line with Traveling Data-Packet Pulse (Desktop) */}
          <div className="hidden md:block absolute top-[4.25rem] left-8 right-8 h-0.5 bg-gradient-to-r from-cyan-500/20 via-emerald-500/30 to-purple-500/20 overflow-hidden -z-0">
            {/* Animated Data-Packet Pulse traveling along connector */}
            <motion.div
              className={`absolute top-0 bottom-0 w-24 rounded-full blur-[2px] opacity-90 ${
                activeMode === "syncrivo"
                  ? "bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
                  : "bg-gradient-to-r from-transparent via-amber-400 to-transparent"
              }`}
              animate={{ left: ["-15%", "105%"] }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </div>

          {/* 5 Connected Stages */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative z-10">
            {currentNodes.map((node) => {
              const isSelected = activeNode.id === node.id;

              return (
                <div
                  key={node.id}
                  onClick={() => {
                    setSelectedNodeId(node.id);
                    setIsPaused(true);
                  }}
                  className="cursor-pointer group flex flex-col items-start space-y-4"
                >
                  {/* Node Pin & Stage Header */}
                  <div className="flex items-center gap-3">
                    <motion.div
                      animate={isSelected ? { scale: 1.15 } : { scale: 1 }}
                      transition={{ duration: 0.4, ease: transitionEase }}
                      className={`w-9 h-9 rounded-full flex items-center justify-center font-mono text-xs font-bold transition-all duration-400 ${
                        isSelected
                          ? activeMode === "syncrivo"
                            ? "bg-cyan-400 text-black shadow-[0_0_25px_rgba(6,182,212,0.6)]"
                            : "bg-amber-400 text-black shadow-[0_0_25px_rgba(245,158,11,0.6)]"
                          : "bg-[#121218] border border-white/20 text-zinc-400 group-hover:border-white/50 group-hover:text-white"
                      }`}
                    >
                      {node.step}
                    </motion.div>

                    <span
                      className={`font-mono text-[10px] px-2.5 py-0.5 rounded-full transition-colors duration-300 ${
                        isSelected
                          ? "bg-white/10 text-white font-semibold"
                          : "text-zinc-500 bg-white/[0.02]"
                      }`}
                    >
                      {node.stageTag}
                    </span>
                  </div>

                  {/* Stage Title & Type */}
                  <div
                    className={`w-full p-4 rounded-2xl transition-all duration-300 border ${
                      isSelected
                        ? "bg-white/[0.05] border-white/30 shadow-xl"
                        : "bg-transparent border-hairline group-hover:border-white/20"
                    }`}
                  >
                    <div className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider">
                      {node.type}
                    </div>
                    <div
                      className={`font-bold text-sm sm:text-base mt-1 leading-snug transition-colors duration-300 ${
                        isSelected ? "text-white" : "text-zinc-300 group-hover:text-white"
                      }`}
                    >
                      {node.label}
                    </div>

                    <div className="mt-3 pt-3 border-t border-hairline flex items-center gap-1.5 font-mono text-[10px]">
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          isSelected
                            ? activeMode === "syncrivo"
                              ? "bg-cyan-400 animate-ping"
                              : "bg-amber-400 animate-ping"
                            : "bg-zinc-600"
                        }`}
                      />
                      <span className={isSelected ? "text-white font-bold" : "text-zinc-500"}>
                        {isSelected ? "ACTIVE STAGE" : "CLICK TO LOCK"}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Stage Deep-Dive Inspection Pane */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeNode.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: transitionEase }}
            className="mt-12 p-8 sm:p-10 rounded-3xl bg-[#0e0e14] border border-hairline grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
          >
            <div className="lg:col-span-8 space-y-3">
              <div className="flex flex-wrap items-center gap-3">
                <span className="font-mono text-xs uppercase px-3 py-1 rounded-full bg-white/[0.05] text-zinc-300 font-semibold">
                  STAGE {activeNode.step} · {activeNode.type}
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white">{activeNode.label}</h3>
                <span className="font-mono text-xs text-emerald-400 font-bold">
                  [{activeNode.stageTag}]
                </span>
              </div>
              <p className="text-zinc-300 text-base leading-relaxed font-light">
                {activeNode.description}
              </p>
            </div>

            <div className="lg:col-span-4 lg:border-l lg:border-hairline lg:pl-8 space-y-3">
              <div className="text-xs font-mono uppercase text-zinc-500 tracking-wider">
                TECHNOLOGY &amp; PROTOCOLS
              </div>
              <div className="flex flex-wrap gap-2">
                {activeNode.tech.map((t, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-lg bg-white/[0.04] border border-hairline text-xs font-mono text-zinc-200"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
