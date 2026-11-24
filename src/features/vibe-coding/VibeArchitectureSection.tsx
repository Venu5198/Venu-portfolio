"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Sparkles, ArrowRight, Play, Pause, Zap, Shield, Key, Layers, Send } from "lucide-react";
import { ComicBurst, ComicBurstItem } from "./ComicBurst";
import { PipelineRunner } from "@/features/pipeline-runner/PipelineRunner";

type ArchitectureMode = "syncrivo" | "ocnora";

interface Stage {
  step: string;
  label: string;
  tag: string;
  summary: string;
  detail: string;
  tradeoff: string;
  badges: string[];
  color: string;
}

const syncrivoStages: Stage[] = [
  {
    step: "01",
    label: "Webhook Ingress & Signature Verification",
    tag: "INGRESS RECEIVER",
    summary: "Asynchronous webhook verification and Redis Pub/Sub enqueueing under 10ms.",
    detail:
      "FastAPI ingress receivers verify cryptographic HMAC signatures (Slack, Teams, Zoom, Webex) and immediately enqueue raw payloads into Redis Pub/Sub, acknowledging HTTP 200 within 10ms.",
    tradeoff: "Decouples ingress from processing; eliminates third-party webhook timeout failures.",
    badges: ["FastAPI", "Python", "Redis Pub/Sub", "HMAC"],
    color: "#C6FF00",
  },
  {
    step: "02",
    label: "Redis Deduplication & Loop Guard",
    tag: "EVENT DEDUPLICATION",
    summary: "Origin fingerprinting preventing cascading reflection across cross-linked channels.",
    detail:
      "Applies cryptographic message fingerprinting with sliding-window Redis keys and distributed locks to drop echoed messages within 2ms.",
    tradeoff: "Guarantees 0% echo loops across multi-platform channel meshes.",
    badges: ["Redis Cache", "Distributed Locks", "Event Hash"],
    color: "#FDE047",
  },
  {
    step: "03",
    label: "Identity & Token Resolution",
    tag: "ENTERPRISE AUTH",
    summary: "Multi-tenant OAuth token lifecycle management via Artifact Registry library.",
    detail:
      "Resolves cross-platform user mappings using delegated user tokens (Teams), bot customization (Slack), domain delegation (Google), and OAuth (Zoom/Webex).",
    tradeoff: "Requires robust token refresh workflows, but provides native sender attribution.",
    badges: ["OAuth 2.0", "JWT", "Google Workspace", "Microsoft Graph"],
    color: "#FFFFFF",
  },
  {
    step: "04",
    label: "Payload Translation Engine",
    tag: "AST NORMALIZATION",
    summary: "Universal intermediate schema mapping Markdown, mrkdwn, Teams HTML, and files.",
    detail:
      "AST normalization engine converts platform-specific payload representations (mentions, threads, edits, deletes, file attachments) into universal format.",
    tradeoff: "Avoids N×N translation complexity while preserving rich text formatting fidelity.",
    badges: ["AST Parser", "Slack mrkdwn", "Teams HTML", "Schema Normalization"],
    color: "#2563EB",
  },
  {
    step: "05",
    label: "Downstream Delivery & Attribution",
    tag: "NATIVE SENDER ATTRIBUTION",
    summary: "Reliable dispatch with exponential backoff and dead-letter queue recovery.",
    detail:
      "Dispatches transformed payloads to target channels with native sender attribution, retrying transient 5xx errors with randomized jitter before routing to dead-letter queue.",
    tradeoff: "Zero lost messages with automated recovery and full audit trail.",
    badges: ["Retries", "Exponential Backoff", "DLQ", "Audit Trail"],
    color: "#FF4D00",
  },
];

const ocnoraStages: Stage[] = [
  {
    step: "01",
    label: "Connect & Define",
    tag: "PROVIDER INGESTION",
    summary: "Ingest triggers and actions across 1,000+ app connectors or 'Build with AI'.",
    detail:
      "Topological workflow engine ingests webhooks, schedules, or polling triggers across 1,000+ pre-cataloged apps or natural-language prompts synthesized by AI.",
    tradeoff: "Universal catalog schema bridges SaaS APIs with zero custom glue code.",
    badges: ["1,000+ Connectors", "FastAPI", "Natural Language", "MongoDB"],
    color: "#C6FF00",
  },
  {
    step: "02",
    label: "Validate & Budget Guards",
    tag: "GOVERNANCE & CIRCUIT BREAKERS",
    summary: "Per-tenant USD and token budget ceilings with upstream rate-limit protection.",
    detail:
      "Applies pre-flight validation, schema checks, and circuit-breaker token budgets before invoking external LLMs or third-party APIs.",
    tradeoff: "Guarantees zero unexpected cloud bills or runaway agent loops.",
    badges: ["Circuit Breaker", "Token Ledger", "Cost Guardrails", "Rate Limits"],
    color: "#FDE047",
  },
  {
    step: "03",
    label: "Stateful Graph Execution",
    tag: "ASYNC DAG RUNTIME",
    summary: "Topological sorting with MongoDB checkpoints and suspend/resume cycles.",
    detail:
      "Executes directed acyclic graphs (DAG) with step-level state persistence, allowing long-running batch workflows and human-in-the-loop approvals to pause and resume.",
    tradeoff: "State checkpointing adds minor persistence latency, but prevents data loss.",
    badges: ["Python AsyncIO", "DAG Engine", "MongoDB Checkpoints"],
    color: "#FFFFFF",
  },
  {
    step: "04",
    label: "Audit & Inspect",
    tag: "TELEMETRY & LOGGING",
    summary: "Real-time execution diffs, node-level metrics, and full run histories.",
    detail:
      "Emits live telemetry to the Ops Center canvas, recording execution step inputs, outputs, error stacks, and token consumption ledgers.",
    tradeoff: "Complete visual observability for debugging complex agent workflows.",
    badges: ["Ops Center", "Diff Viewer", "Prometheus", "Audit Trail"],
    color: "#2563EB",
  },
  {
    step: "05",
    label: "Autonomous Git Worktree Runner",
    tag: "SOFTWARE DELIVERY",
    summary: "AI coding agents operate in isolated Git worktrees and submit verified PRs.",
    detail:
      "Dispatches backlog tasks to isolated container sandboxes that lease git branches, run tests (lint, pytest, Playwright), and open pull requests autonomously.",
    tradeoff: "Requires branch lease coordination, but guarantees zero repo pollution.",
    badges: ["Git Worktrees", "Docker Sandbox", "GitHub Actions", "pytest"],
    color: "#FF4D00",
  },
];

const packetWittyNotes = {
  syncrivo: [
    "FastAPI Ingress: HMAC verified under 10ms! Enqueued to Redis Pub/Sub, HTTP 200 acknowledged. Zero timeouts! ⚡",
    "Redis Loop Guard: Cryptographic event fingerprint checked across sliding window. Dropped echo loop, zero cascade! 🛡️",
    "Auth & Token Resolver: Delegated OAuth tokens retrieved via internal Artifact Registry library. Sender identity locked in! 🔑",
    "AST Parser Engine: Slack mrkdwn, Teams HTML, code blocks, and attachments normalized without schema corruption! 🔄",
    "Downstream Dispatch: Delivered to destination platform with native user avatar and exponential backoff recovery! 🚀",
  ],
  ocnora: [
    "Trigger Ingress: Webhook alert caught from GitHub and Slack. Mapped into DAG state execution graph! 🔌",
    "Budget Guard: Dynamic multi-model token ceiling verified. $10,000 runaway LLM loops permanently blocked! 🛑",
    "Stateful DAG Engine: PostgreSQL checkpoint committed. Async task graph nodes resumed across 1,000+ connectors! 🧠",
    "Audit & OpenTelemetry: Trace spans logged, prompt token ledger verified, step execution record immutable! 📊",
    "Git Worktree Runner: Isolated branch cloned, automated tests passed, PR autonomously submitted to GitHub! 🌲",
  ],
};

export function VibeArchitectureSection() {
  const [mode, setMode] = useState<ArchitectureMode>("syncrivo");
  const [activeStage, setActiveStage] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isGlitching, setIsGlitching] = useState(false);
  const [bursts, setBursts] = useState<ComicBurstItem[]>([]);

  const stageBursts = {
    syncrivo: [
      "*INGRESS <10MS!*",
      "*ECHO DROPPED!*",
      "*AUTH LOCKED!*",
      "*AST PARSED!*",
      "*DLQ DISPATCH!*",
    ],
    ocnora: [
      "*1,000+ APPS!*",
      "*BUDGET GUARD!*",
      "*DAG RUNTIME!*",
      "*OTEL LOGGED!*",
      "*PR SUBMITTED!*",
    ],
  };

  const triggerBurst = (text: string, e?: React.MouseEvent, color = "#FDE047") => {
    const id = Date.now() + Math.random();
    const newBurst: ComicBurstItem = {
      id,
      text,
      x: e ? e.clientX : typeof window !== "undefined" ? window.innerWidth * 0.5 : 500,
      y: e ? e.clientY : typeof window !== "undefined" ? window.innerHeight * 0.45 : 350,
      color,
      rotate: Math.floor(Math.random() * 18) - 9,
    };
    setBursts((prev) => [...prev, newBurst]);
    setTimeout(() => {
      setBursts((prev) => prev.filter((b) => b.id !== id));
    }, 950);
  };

  const switchMode = (newMode: ArchitectureMode, e?: React.MouseEvent) => {
    setMode(newMode);
    setActiveStage(0);
    setIsGlitching(true);
    triggerBurst(newMode === "syncrivo" ? "*BRIDGE SYNC!*" : "*DAG ENGINE!*", e, newMode === "syncrivo" ? "#C6FF00" : "#00F0FF");
    setTimeout(() => setIsGlitching(false), 260);
  };

  const fireConfetti = (e?: React.MouseEvent) => {
    try {
      confetti({
        particleCount: 35,
        spread: 60,
        origin: e
          ? { x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight }
          : { y: 0.6 },
        colors: ["#C6FF00", "#FF4D00", "#2563EB", "#00F0FF", "#FDE047"],
      });
    } catch {}
  };

  const stages = mode === "syncrivo" ? syncrivoStages : ocnoraStages;

  // Auto-cycle through stages
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveStage((prev) => (prev + 1) % stages.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPaused, stages.length]);

  return (
    <section
      id="architecture"
      className="py-24 relative scroll-mt-36 sm:scroll-mt-44 pt-28"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Onomatopoeia Comic Burst Layer */}
      <ComicBurst bursts={bursts} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header with Mode Toggles */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-6 border-b-[2.5px] border-[#0A0A0A]/20">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C6FF00] text-[#0A0A0A] text-xs font-mono font-black border-2 border-[#0A0A0A] shadow-[2px_2px_0px_#0A0A0A]">
              <Sparkles className="w-3.5 h-3.5" />
              INTERACTIVE PIPELINE TOPOLOGY
            </div>
            <h2 className="font-comic text-5xl sm:text-7xl font-black text-[#0A0A0A] tracking-tight leading-[0.92] uppercase rotate-[-0.5deg]">
              Distributed Event Architecture
            </h2>
            <p className="text-zinc-800 max-w-xl text-base sm:text-lg font-medium">
              Click through the 5-stage pipelines below or switch modes to inspect how SyncRivo bridges
              enterprise messages and how OCNORA executes autonomous agent graphs.
            </p>
          </div>

          {/* Mode Switcher Sticker Pills */}
          <div className="flex items-center gap-3">
            <button
              onClick={(e) => switchMode("syncrivo", e)}
              className={`px-4 py-2.5 rounded-2xl font-mono text-xs font-black border-[2.5px] border-[#0A0A0A] spider-spring-btn spider-rgb-hover transition-all cursor-pointer ${
                mode === "syncrivo"
                  ? "bg-[#C6FF00] text-[#0A0A0A] shadow-[3.5px_3.5px_0px_#0A0A0A] translate-x-[-1px] translate-y-[-1px]"
                  : "bg-white text-zinc-700 hover:text-black shadow-[2px_2px_0px_#0A0A0A]"
              }`}
            >
              SyncRivo Bridge ⚡
            </button>
            <button
              onClick={(e) => switchMode("ocnora", e)}
              className={`px-4 py-2.5 rounded-2xl font-mono text-xs font-black border-[2.5px] border-[#0A0A0A] spider-spring-btn spider-rgb-hover transition-all cursor-pointer ${
                mode === "ocnora"
                  ? "bg-[#2563EB] text-white shadow-[3.5px_3.5px_0px_#0A0A0A] translate-x-[-1px] translate-y-[-1px]"
                  : "bg-white text-zinc-700 hover:text-black shadow-[2px_2px_0px_#0A0A0A]"
              }`}
            >
              OCNORA Engine 🤖
            </button>
          </div>
        </div>

        {/* Interactive Architecture Packet Simulator Track with 250ms Dimensional Glitch */}
        <motion.div
          key={`${mode}-${activeStage}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, ease: (t: number) => Math.floor(t * 4) / 4 }}
          className={`mb-8 p-4 sm:p-5 rounded-3xl bg-white border-[2.5px] border-[#0A0A0A] shadow-[6px_6px_0px_#0A0A0A] flex flex-wrap items-center justify-between gap-4 ${
            isGlitching ? "animate-spider-glitch" : ""
          }`}
        >
          <div className="flex items-center gap-3">
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C6FF00] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#C6FF00]"></span>
            </span>
            <div className="font-mono text-xs font-bold text-[#0A0A0A] flex flex-wrap items-center gap-2">
              <span className="text-zinc-600 uppercase font-black tracking-wider">PACKET HOPPER:</span>
              <motion.span
                key={`badge-${mode}-${activeStage}`}
                initial={{ scale: 0.85, x: -6 }}
                animate={{ scale: 1, x: 0 }}
                transition={{ type: "spring", stiffness: 450, damping: 18 }}
                className="px-3 py-1 rounded-full text-xs font-mono font-black border-2 border-[#0A0A0A] shadow-[2px_2px_0px_#0A0A0A] spider-text-hover"
                style={{
                  backgroundColor: stages[activeStage].color,
                  color: stages[activeStage].color === "#2563EB" || stages[activeStage].color === "#FF4D00" ? "#FFFFFF" : "#0A0A0A",
                }}
              >
                Stage 0{activeStage + 1} Payload: {stages[activeStage].tag}
              </motion.span>
            </div>
          </div>
          <div className="flex items-center gap-2 font-mono text-xs text-zinc-900 font-bold bg-[#F4F4F0] px-3.5 py-2 rounded-2xl border-2 border-[#0A0A0A] shadow-[2px_2px_0px_#0A0A0A] max-w-xl">
            <span>💬</span>
            <span className="leading-snug">{packetWittyNotes[mode][activeStage]}</span>
          </div>
        </motion.div>

        {/* 5-Stage Interactive Pipeline Stepper with Crisp Stepped Physics */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-10">
          {stages.map((stg, idx) => {
            const isSelected = activeStage === idx;
            const isDarkBg = isSelected && (stg.color === "#2563EB" || stg.color === "#FF4D00");
            return (
              <motion.button
                key={idx}
                whileHover={{ scale: 1.05, y: -3, transition: { type: "spring", stiffness: 500, damping: 20 } }}
                whileTap={{ scale: 0.95, y: 1 }}
                onClick={(e) => {
                  setActiveStage(idx);
                  setIsPaused(true);
                  fireConfetti(e);
                  triggerBurst(stageBursts[mode][idx], e, stg.color === "#FFFFFF" ? "#00F0FF" : stg.color);
                }}
                className={`p-4 rounded-2xl text-left border-[2.5px] border-[#0A0A0A] spider-spring-btn transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? "shadow-[6px_6px_0px_#0A0A0A] translate-x-[-2px] translate-y-[-2px]"
                    : "bg-white hover:bg-zinc-50 shadow-[2.5px_2.5px_0px_#0A0A0A] hover:shadow-[5px_5px_0px_#0A0A0A]"
                }`}
                style={{
                  backgroundColor: isSelected ? stg.color : "#FFFFFF",
                  color: isDarkBg ? "#FFFFFF" : "#0A0A0A",
                }}
              >
                <div className="flex items-center justify-between pb-3">
                  <span className={`font-mono text-xs font-black ${isDarkBg ? "text-white" : "text-[#0A0A0A]"}`}>STAGE {stg.step}</span>
                  {isSelected && <span className={`w-2.5 h-2.5 rounded-full ${isDarkBg ? "bg-white" : "bg-[#0A0A0A]"} animate-ping`} />}
                </div>
                <div className={`text-xs font-black leading-snug line-clamp-2 ${isDarkBg ? "text-white" : "text-[#0A0A0A]"}`}>
                  {stg.label}
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Selected Stage Callout Notebook with Halftone Print Watermark */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${mode}-${activeStage}`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25, ease: (t: number) => Math.floor(t * 5) / 5 }}
            className={`relative p-8 sm:p-10 rounded-3xl bg-white border-[3px] border-[#0A0A0A] shadow-[10px_10px_0px_#0A0A0A] space-y-6 overflow-hidden ${
              isGlitching ? "animate-spider-glitch" : ""
            }`}
          >
            {/* High-Contrast Ben-Day Halftone Watermark in Stage Corner */}
            <div className="absolute top-0 right-0 w-52 h-52 spider-halftone opacity-25 pointer-events-none rounded-tr-3xl" />

            <div className="relative flex flex-wrap items-center justify-between gap-4 border-b-2 border-[#0A0A0A]/10 pb-4">
              <div className="space-y-1">
                <div className="inline-block px-3 py-1 rounded-full bg-[#C6FF00] text-[#0A0A0A] font-mono text-[11px] font-black border-2 border-[#0A0A0A] spider-text-hover">
                  {stages[activeStage].tag}
                </div>
                <h3 className="font-comic text-2xl sm:text-4xl font-black text-[#0A0A0A] uppercase tracking-wide">
                  Stage {stages[activeStage].step}: {stages[activeStage].label}
                </h3>
              </div>
              <div className="font-mono text-xs font-bold text-zinc-700">
                {isPaused ? "⏸️ Auto-cycle paused" : "▶️ Auto-cycling"}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-8 space-y-4">
                <p className="text-base sm:text-lg text-zinc-800 font-medium leading-relaxed">
                  {stages[activeStage].detail}
                </p>
                <div className="p-4 rounded-2xl bg-[#F4F4F0] border-2 border-[#0A0A0A] shadow-[2px_2px_0px_#0A0A0A] space-y-1">
                  <div className="font-mono text-xs font-black text-[#0A0A0A] uppercase">
                    ARCHITECTURAL TRADE-OFF / IMPACT
                  </div>
                  <p className="text-xs text-zinc-800 leading-relaxed font-bold">
                    {stages[activeStage].tradeoff}
                  </p>
                </div>
              </div>

              <div className="lg:col-span-4 p-5 rounded-2xl bg-[#F4F4F0] border-2 border-[#0A0A0A] shadow-[2px_2px_0px_#0A0A0A] space-y-3">
                <div className="font-mono text-xs font-black text-[#0A0A0A] uppercase">
                  ACTIVE COMPONENTS
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {stages[activeStage].badges.map((b, bIdx) => (
                    <span
                      key={bIdx}
                      className="px-2.5 py-1 rounded-lg bg-white border border-[#0A0A0A] font-mono text-xs font-bold text-[#0A0A0A]"
                    >
                      {b}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Client-Side Interactive CI/CD Pipeline Runner Widget */}
        <div className="mt-16">
          <PipelineRunner />
        </div>
      </div>
    </section>
  );
}
