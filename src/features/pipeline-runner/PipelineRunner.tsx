"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  Play,
  RotateCcw,
  CheckCircle2,
  Loader2,
  Terminal,
  Check,
} from "lucide-react";
import confetti from "canvas-confetti";
import { useTheme } from "@/shared/context/ThemeContext";
import { pipelineStages } from "@/shared/data/pipeline";
import { PipelineStageStatus } from "@/shared/types/pipeline";

export function PipelineRunner() {
  const { theme } = useTheme();
  const isLight = theme === "light";

  const [isRunning, setIsRunning] = useState(false);
  const [currentStageIndex, setCurrentStageIndex] = useState<number>(-1);
  const [stageStatuses, setStageStatuses] = useState<Record<string, PipelineStageStatus>>({
    typecheck: "idle",
    build: "idle",
    routes: "idle",
    edge: "idle",
  });
  const [stageDurations, setStageDurations] = useState<Record<string, number>>({});
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    "$ ready to run automated checks — click 'Run Pipeline' to verify production bundle.",
  ]);
  const [isComplete, setIsComplete] = useState(false);
  const [totalTimeMs, setTotalTimeMs] = useState(0);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const resetPipeline = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setIsRunning(false);
    setCurrentStageIndex(-1);
    setIsComplete(false);
    setTotalTimeMs(0);
    setStageStatuses({
      typecheck: "idle",
      build: "idle",
      routes: "idle",
      edge: "idle",
    });
    setStageDurations({});
    setTerminalLogs([
      "$ pipeline reset. ready to run automated checks.",
    ]);
  };

  const runStage = (index: number) => {
    if (index >= pipelineStages.length) {
      setIsRunning(false);
      setIsComplete(true);
      setTerminalLogs((prev) => [
        ...prev,
        "✔ [COMPLETE] All 4 verification stages passed cleanly. 0 errors detected.",
        "✔ Edge deploy target verified: Vercel / Cloud Run zero-downtime routing active.",
      ]);
      if (isLight) {
        try {
          confetti({
            particleCount: 50,
            spread: 60,
            origin: { y: 0.8 },
            colors: ["#C6FF00", "#00F0FF", "#FF0055", "#0A0A0A"],
          });
        } catch {}
      }
      return;
    }

    const stage = pipelineStages[index];
    setCurrentStageIndex(index);
    setStageStatuses((prev) => ({ ...prev, [stage.id]: "running" }));
    setTerminalLogs((prev) => [
      ...prev,
      `$ [STAGE 0${index + 1}/04] ${stage.command}...`,
    ]);

    timerRef.current = setTimeout(() => {
      const elapsed = stage.durationMs;
      setStageDurations((prev) => ({ ...prev, [stage.id]: elapsed }));
      setStageStatuses((prev) => ({ ...prev, [stage.id]: "passed" }));
      setTotalTimeMs((prev) => prev + elapsed);
      setTerminalLogs((prev) => [
        ...prev,
        `  └─ ${stage.outputSummary} (${elapsed}ms)`,
      ]);

      // Trigger next stage
      runStage(index + 1);
    }, stage.durationMs);
  };

  const startPipeline = () => {
    if (isRunning) return;
    resetPipeline();
    setIsRunning(true);
    setTerminalLogs([
      `$ init CI verification pipeline [${new Date().toLocaleTimeString()}]`,
      "$ target: next.js 16 + react 19 (production build)",
    ]);
    setTimeout(() => {
      runStage(0);
    }, 150);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <div
      className={`rounded-3xl p-6 sm:p-8 space-y-6 transition-all ${
        isLight
          ? "bg-white border-[2.5px] border-[#0A0A0A] shadow-[8px_8px_0px_#0A0A0A]"
          : "bg-[#0c0c11] border border-white/[0.08] shadow-[0_15px_40px_rgba(0,0,0,0.45)]"
      }`}
    >
      {/* Top Banner / Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span
              className={`font-mono text-xs uppercase tracking-wider font-bold ${
                isLight ? "text-[#0A0A0A]" : "text-cyan-400"
              }`}
            >
              {isLight ? "⚡ CI AUTOMATION // PIPELINE RUNNER" : "AUTOMATION // PIPELINE RUNNER"}
            </span>
            <span
              className={`px-2.5 py-0.5 rounded-full font-mono text-[10px] font-bold ${
                isComplete
                  ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                  : isRunning
                  ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 animate-pulse"
                  : "bg-white/[0.04] text-zinc-400 border border-white/[0.06]"
              }`}
            >
              {isComplete ? "ALL CHECKS PASSED" : isRunning ? "RUNNING CHECKS..." : "READY"}
            </span>
          </div>
          <h3
            className={`text-xl sm:text-2xl font-black tracking-tight ${
              isLight ? "font-comic uppercase text-[#0A0A0A]" : "text-white"
            }`}
          >
            Client-Side Build &amp; Deploy Verification
          </h3>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={resetPipeline}
            disabled={isRunning && !isComplete}
            className={`p-2.5 rounded-xl font-mono text-xs transition-all cursor-pointer ${
              isLight
                ? "bg-[#FAF8F5] border-2 border-[#0A0A0A] text-[#0A0A0A] hover:bg-zinc-100 shadow-[2px_2px_0px_#0A0A0A] disabled:opacity-40"
                : "bg-white/[0.03] border border-white/[0.08] text-zinc-400 hover:text-white hover:bg-white/[0.06] disabled:opacity-40"
            }`}
            title="Reset Pipeline"
            aria-label="Reset Pipeline"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            onClick={startPipeline}
            disabled={isRunning}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer ${
              isLight
                ? "bg-[#C6FF00] text-[#0A0A0A] border-2 border-[#0A0A0A] shadow-[3px_3px_0px_#0A0A0A] hover:translate-x-[-1px] hover:translate-y-[-1px] spider-rgb-hover disabled:opacity-50"
                : "bg-cyan-400 text-black hover:bg-cyan-300 shadow-[0_0_20px_rgba(6,182,212,0.35)] disabled:opacity-50"
            }`}
          >
            {isRunning ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Running Stage 0{currentStageIndex + 1}...</span>
              </>
            ) : isComplete ? (
              <>
                <Check className="w-4 h-4" />
                <span>Re-Run Pipeline</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current" />
                <span>Run Pipeline</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* 4 Pipeline Stages Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {pipelineStages.map((stage, idx) => {
          const status = stageStatuses[stage.id];
          const isCurrent = currentStageIndex === idx && isRunning;
          const duration = stageDurations[stage.id];

          return (
            <motion.div
              key={stage.id}
              animate={isCurrent ? { scale: [1, 1.02, 1] } : { scale: 1 }}
              transition={{ repeat: isCurrent ? Infinity : 0, duration: 1 }}
              className={`p-4 rounded-2xl transition-all border ${
                isLight
                  ? status === "passed"
                    ? "bg-[#ECFCCB] border-2 border-[#0A0A0A] shadow-[3px_3px_0px_#0A0A0A]"
                    : isCurrent
                    ? "bg-[#FEF08A] border-2 border-[#0A0A0A] shadow-[4px_4px_0px_#0A0A0A]"
                    : "bg-[#FAF8F5] border-2 border-[#0A0A0A]/40"
                  : status === "passed"
                  ? "bg-emerald-950/20 border-emerald-500/30"
                  : isCurrent
                  ? "bg-cyan-950/25 border-cyan-400/50 shadow-[0_0_20px_rgba(6,182,212,0.15)]"
                  : "bg-white/[0.02] border-white/[0.06]"
              }`}
            >
              <div className="flex items-center justify-between font-mono text-[11px] mb-2">
                <span
                  className={`font-black ${
                    isLight
                      ? "text-[#0A0A0A]"
                      : status === "passed"
                      ? "text-emerald-400"
                      : isCurrent
                      ? "text-cyan-400"
                      : "text-zinc-500"
                  }`}
                >
                  STAGE {stage.step}
                </span>

                {status === "passed" ? (
                  <span className="flex items-center gap-1 font-bold text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{duration ? `${duration}ms` : "PASS"}</span>
                  </span>
                ) : isCurrent ? (
                  <span className="flex items-center gap-1 text-cyan-600 dark:text-cyan-300 font-bold">
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>RUNNING</span>
                  </span>
                ) : (
                  <span className="text-zinc-500 font-medium">QUEUED</span>
                )}
              </div>

              <div
                className={`font-bold text-sm leading-snug mb-1 ${
                  isLight ? "text-[#0A0A0A]" : "text-white"
                }`}
              >
                {stage.name}
              </div>

              <div className="font-mono text-[10px] text-zinc-500 mb-2 truncate">
                <code>{stage.command}</code>
              </div>

              <p
                className={`text-xs leading-relaxed line-clamp-2 ${
                  isLight ? "text-zinc-700" : "text-zinc-400 font-light"
                }`}
              >
                {stage.description}
              </p>
            </motion.div>
          );
        })}
      </div>

      {/* Terminal Output Log Drawer */}
      <div
        className={`rounded-2xl p-4 font-mono text-xs overflow-x-auto space-y-1 ${
          isLight
            ? "bg-[#09090B] text-[#C6FF00] border-2 border-[#0A0A0A] shadow-[4px_4px_0px_#0A0A0A]"
            : "bg-[#07070a] border border-white/[0.06] text-zinc-300"
        }`}
      >
        <div className="flex items-center justify-between pb-2 border-b border-white/10 text-[11px] text-zinc-400">
          <div className="flex items-center gap-2">
            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
            <span>PIPELINE_OUTPUT_STREAM</span>
          </div>
          <div className="flex items-center gap-3">
            {totalTimeMs > 0 && (
              <span className="text-emerald-400 font-bold">
                ELAPSED: {totalTimeMs}ms
              </span>
            )}
            <span className="text-zinc-500">NODE v20 · NEXT 16.4</span>
          </div>
        </div>

        <div className="pt-2 max-h-36 overflow-y-auto space-y-1 scrollbar-thin">
          {terminalLogs.map((log, idx) => (
            <div
              key={idx}
              className={`leading-relaxed text-[11px] ${
                log.startsWith("✔")
                  ? "text-emerald-400 font-bold"
                  : log.startsWith("$ [STAGE")
                  ? "text-cyan-300 font-bold"
                  : log.startsWith("  └─")
                  ? isLight
                    ? "text-[#FDE047]"
                    : "text-zinc-300"
                  : isLight
                  ? "text-[#C6FF00]"
                  : "text-zinc-400"
              }`}
            >
              {log}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
