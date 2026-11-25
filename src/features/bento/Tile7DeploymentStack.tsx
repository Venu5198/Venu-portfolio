"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Layers, Check, Clock } from "lucide-react";
import { BentoSpotlightTile } from "./BentoSpotlightTile";
import { useTheme } from "@/shared/context/ThemeContext";

export function Tile7DeploymentStack() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Part A: Deployment Switcher & Slow-Mo
  const [deployMode, setDeployMode] = useState<"rolling" | "blueGreen">("rolling");
  const [isSlowMo, setIsSlowMo] = useState<boolean>(false);

  // Part B: Stack Filter Pills
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const categories = [
    { id: "all", label: "All Stack" },
    { id: "backend", label: "Backend" },
    { id: "cloud", label: "Cloud & K8s" },
    { id: "devops", label: "IaC & CI/CD" },
    { id: "ai", label: "AI & Data" },
  ];

  const technologies = [
    { name: "Python", category: "backend", tag: "FastAPI / AsyncIO" },
    { name: "FastAPI", category: "backend", tag: "Microservices" },
    { name: "Redis", category: "backend", tag: "Pub/Sub & Locks" },
    { name: "PostgreSQL", category: "backend", tag: "Relational / ACID" },
    { name: "MongoDB", category: "backend", tag: "Document Store" },
    { name: "Kafka", category: "backend", tag: "Event Streaming" },
    { name: "Kubernetes", category: "cloud", tag: "CKA Certified" },
    { name: "GCP (Cloud Run/GKE)", category: "cloud", tag: "Primary Cloud" },
    { name: "AWS", category: "cloud", tag: "DevOps Pro Certified" },
    { name: "Docker", category: "cloud", tag: "Multi-stage Builds" },
    { name: "Terraform", category: "devops", tag: "Certified Associate" },
    { name: "GitHub Actions", category: "devops", tag: "CI/CD Automations" },
    { name: "Argo CD", category: "devops", tag: "GitOps Continuous Delivery" },
    { name: "Helm", category: "devops", tag: "K8s Templating" },
    { name: "Prometheus & Grafana", category: "devops", tag: "Observability" },
    { name: "LLM Agent DAGs", category: "ai", tag: "Stateful Execution" },
    { name: "Token Circuit Breakers", category: "ai", tag: "FinOps Cost Guard" },
    { name: "OAuth 2.0 Integrations", category: "ai", tag: "Slack / Teams / Zoom" },
  ];

  const transitionSettings = isSlowMo
    ? { duration: 3.2, ease: "easeInOut" as const }
    : { type: "spring" as const, stiffness: 420, damping: 32 };

  return (
    <BentoSpotlightTile
      id="tile-stack"
      className="lg:col-span-8 col-span-12 flex flex-col justify-between"
    >
      <div>
        {/* Header */}
        <div
          className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 mb-6 border-b ${
            isDark ? "border-white/[0.08]" : "border-black/[0.08]"
          }`}
        >
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#007AFF] dark:text-[#32ADE6]" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#1D1D1F] dark:text-[#F5F5F7]">
              Deployment Pipeline &amp; Stack Matrix
            </span>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            {/* 0.25x Slow-Mo Inspector Toggle */}
            <button
              onClick={() => setIsSlowMo(!isSlowMo)}
              className={`px-3 py-1 rounded-full text-[11px] font-mono transition-all flex items-center gap-1.5 cursor-pointer border ${
                isSlowMo
                  ? isDark
                    ? "bg-amber-400 text-black font-semibold border-amber-300"
                    : "bg-amber-500 text-white font-semibold border-amber-600"
                  : isDark
                  ? "bg-white/[0.04] text-[#A1A1AA] border-white/10 hover:text-white"
                  : "bg-black/[0.04] text-[#52525B] border-black/10 hover:text-black"
              }`}
              title="Toggle slow-motion transition inspection"
            >
              <Clock className="w-3 h-3" />
              <span>{isSlowMo ? "0.25x Slow-Mo: ON" : "0.25x Slow-Mo"}</span>
            </button>

            {/* Part A Deployment Switcher */}
            <div
              className={`inline-flex p-1 rounded-full border ${
                isDark ? "bg-white/[0.05] border-white/10" : "bg-black/[0.05] border-black/10"
              }`}
            >
              <button
                onClick={() => setDeployMode("rolling")}
                className={`px-3 py-1 rounded-full text-[11px] font-mono transition-all cursor-pointer ${
                  deployMode === "rolling"
                    ? isDark
                      ? "bg-white text-black font-semibold shadow-sm"
                      : "bg-white text-black font-semibold shadow-xs"
                    : "text-[#52525B] dark:text-[#86868B] hover:text-current"
                }`}
              >
                Rolling Update
              </button>
              <button
                onClick={() => setDeployMode("blueGreen")}
                className={`px-3 py-1 rounded-full text-[11px] font-mono transition-all cursor-pointer ${
                  deployMode === "blueGreen"
                    ? isDark
                      ? "bg-[#32ADE6] text-black font-semibold shadow-sm"
                      : "bg-[#007AFF] text-white font-semibold shadow-xs"
                    : "text-[#52525B] dark:text-[#86868B] hover:text-current"
                }`}
              >
                Blue-Green Cutover
              </button>
            </div>
          </div>
        </div>

        {/* Part A: Live Traffic Visualizer */}
        <div
          className={`p-4 rounded-2xl border mb-6 space-y-3 ${
            isDark ? "bg-white/[0.02] border-white/[0.08]" : "bg-[#F2F2F7] border-black/[0.06] shadow-sm"
          }`}
        >
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="opacity-75">
              {deployMode === "rolling"
                ? "Progressive Canary Shift: v1.14 (Stable) → v1.15 (Next)"
                : "Active vs Staging Cluster: Zero-Downtime Traffic Routing"}
            </span>
            <span className="text-[#34C759] dark:text-[#30D158] font-semibold flex items-center gap-1">
              <Check className="w-3.5 h-3.5" />
              0s Downtime
            </span>
          </div>

          {/* Traffic split bar */}
          <div className="space-y-1.5">
            <div
              className={`h-2.5 w-full rounded-full overflow-hidden flex ${
                isDark ? "bg-white/[0.06]" : "bg-black/[0.06]"
              }`}
            >
              {deployMode === "rolling" ? (
                <>
                  <motion.div
                    className="h-full bg-[#0A84FF]"
                    initial={false}
                    animate={{ width: "25%" }}
                    transition={transitionSettings}
                  />
                  <motion.div
                    className="h-full bg-[#32ADE6]"
                    initial={false}
                    animate={{ width: "75%" }}
                    transition={transitionSettings}
                  />
                </>
              ) : (
                <>
                  <motion.div
                    className="h-full bg-transparent"
                    initial={false}
                    animate={{ width: "0%" }}
                  />
                  <motion.div
                    className="h-full bg-[#30D158]"
                    initial={false}
                    animate={{ width: "100%" }}
                    transition={transitionSettings}
                  />
                </>
              )}
            </div>
            <div className="flex justify-between text-[10px] font-mono text-[#52525B] dark:text-[#86868B]">
              <span>
                {deployMode === "rolling" ? "v1.14: 25% Traffic" : "Blue (Previous): Inactive Standby"}
              </span>
              <span className="font-semibold text-[#1D1D1F] dark:text-[#F5F5F7]">
                {deployMode === "rolling" ? "v1.15: 75% Traffic" : "Green (Current): 100% Traffic Active"}
              </span>
            </div>
          </div>

          {/* Pipeline stages */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-[11px] font-mono">
            <div
              className={`p-2 rounded-xl border flex items-center gap-2 ${
                isDark ? "bg-white/[0.03] border-white/[0.06]" : "bg-white border-black/[0.06]"
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#007AFF] dark:bg-[#32ADE6]" />
              <span className="truncate">GitHub Actions</span>
            </div>
            <div
              className={`p-2 rounded-xl border flex items-center gap-2 ${
                isDark ? "bg-white/[0.03] border-white/[0.06]" : "bg-white border-black/[0.06]"
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF9500] dark:bg-[#FF9F0A]" />
              <span className="truncate">Trivy &amp; Docker</span>
            </div>
            <div
              className={`p-2 rounded-xl border flex items-center gap-2 ${
                isDark ? "bg-white/[0.03] border-white/[0.06]" : "bg-white border-black/[0.06]"
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#AF52DE] dark:bg-[#BF5AF2]" />
              <span className="truncate">Argo CD GitOps</span>
            </div>
            <div
              className={`p-2 rounded-xl border flex items-center gap-2 ${
                isDark ? "bg-white/[0.03] border-white/[0.06]" : "bg-white border-black/[0.06]"
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#34C759] dark:bg-[#30D158]" />
              <span className="truncate">GKE / Cloud Run</span>
            </div>
          </div>
        </div>

        {/* Part B: Category Filter Pills */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              Filter Technologies
            </span>
            <span className="text-[11px] font-mono text-[#52525B] dark:text-[#86868B]">
              {activeCategory === "all" ? "Showing all" : `Filtered: ${activeCategory}`}
            </span>
          </div>

          {/* Filter Bar with Guaranteed High Contrast in both modes */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer ${
                    isActive
                      ? isDark
                        ? "bg-white text-black font-semibold shadow-md"
                        : "bg-[#007AFF] text-white font-semibold shadow-sm"
                      : isDark
                      ? "text-[#A1A1AA] hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/10"
                      : "text-[#52525B] hover:text-[#1D1D1F] bg-white border border-black/[0.08] shadow-2xs"
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Tech Pills Grid with Illumination and Dimming */}
          <div className="flex flex-wrap gap-2 pt-1">
            {technologies.map((tech, idx) => {
              const isMatch = activeCategory === "all" || tech.category === activeCategory;
              return (
                <div
                  key={idx}
                  className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all duration-300 border ${
                    isMatch
                      ? isDark
                        ? "bg-white/[0.06] border-white/20 text-[#F5F5F7] shadow-sm scale-100"
                        : "bg-white border-black/15 text-[#1D1D1F] shadow-sm scale-100"
                      : isDark
                      ? "bg-white/[0.02] border-white/5 text-zinc-600 opacity-30 scale-95"
                      : "bg-[#F2F2F7] border-black/5 text-zinc-400 opacity-30 scale-95"
                  }`}
                >
                  <span className="font-semibold">{tech.name}</span>
                  <span className="text-[10px] opacity-70 ml-1.5">
                    {tech.tag}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div
        className={`pt-4 mt-6 border-t text-[11px] font-mono flex items-center justify-between ${
          isDark ? "border-white/[0.08] text-[#86868B]" : "border-black/[0.08] text-[#52525B]"
        }`}
      >
        <span>GitOps Declarative State · Sync Automated</span>
        <span className="text-emerald-500 dark:text-emerald-400 font-semibold">Argo CD Synced</span>
      </div>
    </BentoSpotlightTile>
  );
}
