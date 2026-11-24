"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight, Play, Pause, Zap, Shield, Key, Layers, Send } from "lucide-react";

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
    color: "#bef264",
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
    color: "#fde047",
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
    color: "#d8b4fe",
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
    color: "#fda4af",
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
    color: "#93c5fd",
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
    color: "#bef264",
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
    color: "#fde047",
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
    color: "#d8b4fe",
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
    color: "#fda4af",
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
    color: "#93c5fd",
  },
];

export function VibeArchitectureSection() {
  const [mode, setMode] = useState<ArchitectureMode>("syncrivo");
  const [activeStage, setActiveStage] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

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
      className="py-24 relative scroll-mt-28"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header with Mode Toggles */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-6 border-b-2 border-black/10">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#bef264] text-black text-xs font-mono font-bold border-2 border-black shadow-[2px_2px_0px_#000]">
              <Sparkles className="w-3.5 h-3.5" />
              INTERACTIVE PIPELINE TOPOLOGY
            </div>
            <h2 className="text-4xl sm:text-6xl font-black text-black tracking-tight leading-[0.95]">
              Distributed Event Architecture
            </h2>
            <p className="text-zinc-600 max-w-xl text-base sm:text-lg font-normal">
              Click through the 5-stage pipelines below or switch modes to inspect how SyncRivo bridges
              enterprise messages and how OCNORA executes autonomous agent graphs.
            </p>
          </div>

          {/* Mode Switcher Sticker Pills */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setMode("syncrivo");
                setActiveStage(0);
              }}
              className={`px-4 py-2.5 rounded-2xl font-mono text-xs font-black border-2 border-black transition-all cursor-pointer ${
                mode === "syncrivo"
                  ? "bg-[#bef264] text-black shadow-[3px_3px_0px_#000] translate-x-[-1px] translate-y-[-1px]"
                  : "bg-white text-zinc-600 hover:text-black shadow-[1.5px_1.5px_0px_#000]"
              }`}
            >
              SyncRivo Bridge ⚡
            </button>
            <button
              onClick={() => {
                setMode("ocnora");
                setActiveStage(0);
              }}
              className={`px-4 py-2.5 rounded-2xl font-mono text-xs font-black border-2 border-black transition-all cursor-pointer ${
                mode === "ocnora"
                  ? "bg-[#d8b4fe] text-black shadow-[3px_3px_0px_#000] translate-x-[-1px] translate-y-[-1px]"
                  : "bg-white text-zinc-600 hover:text-black shadow-[1.5px_1.5px_0px_#000]"
              }`}
            >
              OCNORA Engine 🤖
            </button>
          </div>
        </div>

        {/* 5-Stage Interactive Pipeline Stepper */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-10">
          {stages.map((stg, idx) => {
            const isSelected = activeStage === idx;
            return (
              <button
                key={idx}
                onClick={() => {
                  setActiveStage(idx);
                  setIsPaused(true);
                }}
                className={`p-4 rounded-2xl text-left border-2 border-black transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? "shadow-[5px_5px_0px_#000] translate-x-[-2px] translate-y-[-2px]"
                    : "bg-white hover:bg-zinc-50 shadow-[2px_2px_0px_#000]"
                }`}
                style={{ backgroundColor: isSelected ? stg.color : "#FFFFFF" }}
              >
                <div className="flex items-center justify-between pb-3">
                  <span className="font-mono text-xs font-black text-black">STAGE {stg.step}</span>
                  {isSelected && <span className="w-2 h-2 rounded-full bg-black animate-ping" />}
                </div>
                <div className="text-xs font-black text-black leading-snug line-clamp-2">
                  {stg.label}
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Stage Callout Notebook */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${mode}-${activeStage}`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="p-8 sm:p-10 rounded-3xl bg-white border-2 border-black shadow-[8px_8px_0px_#000] space-y-6"
          >
            <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-black/10 pb-4">
              <div className="space-y-1">
                <div className="inline-block px-3 py-1 rounded-full bg-[#fde047] text-black font-mono text-[11px] font-black border-2 border-black">
                  {stages[activeStage].tag}
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-black">
                  Stage {stages[activeStage].step}: {stages[activeStage].label}
                </h3>
              </div>
              <div className="font-mono text-xs font-bold text-zinc-600">
                {isPaused ? "⏸️ Auto-cycle paused" : "▶️ Auto-cycling"}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-8 space-y-4">
                <p className="text-base sm:text-lg text-zinc-700 font-normal leading-relaxed">
                  {stages[activeStage].detail}
                </p>
                <div className="p-4 rounded-2xl bg-[#faf8f5] border-2 border-black space-y-1">
                  <div className="font-mono text-xs font-black text-black uppercase">
                    ARCHITECTURAL TRADE-OFF / IMPACT
                  </div>
                  <p className="text-xs text-zinc-700 leading-relaxed font-medium">
                    {stages[activeStage].tradeoff}
                  </p>
                </div>
              </div>

              <div className="lg:col-span-4 p-5 rounded-2xl bg-[#faf8f5] border-2 border-black space-y-3">
                <div className="font-mono text-xs font-black text-black uppercase">
                  ACTIVE COMPONENTS
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {stages[activeStage].badges.map((b, bIdx) => (
                    <span
                      key={bIdx}
                      className="px-2.5 py-1 rounded-lg bg-white border border-black font-mono text-xs font-bold text-black"
                    >
                      {b}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
