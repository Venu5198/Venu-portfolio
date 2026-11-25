"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { TrendingDown, Server, Cpu, Database, Check } from "lucide-react";
import { BentoSpotlightTile } from "./BentoSpotlightTile";
import { useTheme } from "@/shared/context/ThemeContext";

export function Tile5FinOpsSimulator() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [isOptimized, setIsOptimized] = useState(true);

  // Spend breakdown numbers ($ / month)
  const items = [
    {
      name: "GKE Autopilot / Node Pool",
      icon: Server,
      unoptimized: 3400,
      optimized: 2550,
      description: "HPA tuning & spot instance scheduling",
    },
    {
      name: "Cloud Run & Ingress CPU",
      icon: Cpu,
      unoptimized: 1200,
      optimized: 900,
      description: "Concurrency optimization & min-instance cuts",
    },
    {
      name: "Redis Memory & Datastore",
      icon: Database,
      unoptimized: 800,
      optimized: 600,
      description: "Sliding-window TTL & volatile-lru eviction",
    },
  ];

  const totalUnoptimized = 5400;
  const totalOptimized = 4050;
  const currentTotal = isOptimized ? totalOptimized : totalUnoptimized;
  const monthlySavings = totalUnoptimized - totalOptimized;
  const percentSavings = 25; // 25%

  return (
    <BentoSpotlightTile
      id="tile-finops"
      className="lg:col-span-5 col-span-12 flex flex-col justify-between"
    >
      <div>
        {/* Header & Segmented Pill Switcher */}
        <div
          className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 mb-4 border-b ${
            isDark ? "border-white/[0.08]" : "border-black/[0.08]"
          }`}
        >
          <div className="flex items-center gap-2">
            <TrendingDown className="w-4 h-4 text-[#30D158] dark:text-[#30D158]" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#1D1D1F] dark:text-[#F5F5F7]">
              GCP FinOps Simulator
            </span>
          </div>

          {/* Interactive Apple Segmented Control */}
          <div
            className={`inline-flex p-1 rounded-full border self-start sm:self-auto ${
              isDark ? "bg-white/[0.05] border-white/10" : "bg-black/[0.05] border-black/10"
            }`}
          >
            <button
              onClick={() => setIsOptimized(false)}
              className={`px-3 py-1 rounded-full text-[11px] font-mono transition-all cursor-pointer ${
                !isOptimized
                  ? isDark
                    ? "bg-white text-black font-semibold shadow-sm"
                    : "bg-white text-black font-semibold shadow-xs"
                  : "text-[#52525B] dark:text-[#86868B] hover:text-current"
              }`}
            >
              Unoptimized
            </button>
            <button
              onClick={() => setIsOptimized(true)}
              className={`px-3 py-1 rounded-full text-[11px] font-mono transition-all cursor-pointer flex items-center gap-1 ${
                isOptimized
                  ? "bg-[#30D158] dark:bg-[#30D158] text-black font-semibold shadow-sm"
                  : "text-[#52525B] dark:text-[#86868B] hover:text-current"
              }`}
            >
              <span>Rightsized</span>
              <Check className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Live Savings Readout Card */}
        <div
          className={`p-4 rounded-2xl border mb-4 flex items-center justify-between ${
            isDark
              ? "bg-white/[0.02] border-white/[0.08]"
              : "bg-[#F2F2F7] border-black/[0.06] shadow-sm"
          }`}
        >
          <div className="space-y-0.5">
            <div className="text-[10px] font-mono uppercase tracking-wider text-[#52525B] dark:text-[#86868B]">
              {isOptimized ? "Total Optimized Spend" : "Legacy Baseline Spend"}
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-[#1D1D1F] dark:text-[#F5F5F7] tabular-nums">
              ${currentTotal.toLocaleString()}
              <span className="text-xs font-normal opacity-60"> / mo</span>
            </div>
          </div>

          <div className="text-right space-y-0.5">
            <div className="text-[10px] font-mono text-[#30D158] uppercase font-bold tracking-wider">
              {isOptimized ? "Measured Savings" : "Optimization Potential"}
            </div>
            <div className="text-lg sm:text-xl font-bold font-mono text-[#30D158] tabular-nums">
              -${monthlySavings.toLocaleString()} / mo
            </div>
            <div className="text-[10px] font-mono text-emerald-500 dark:text-emerald-400 font-semibold">
              ({percentSavings}% Reduced)
            </div>
          </div>
        </div>

        {/* Animated Workload Spend Bars */}
        <div className="space-y-3">
          {items.map((item, idx) => {
            const Icon = item.icon;
            const currentVal = isOptimized ? item.optimized : item.unoptimized;
            const percentage = (currentVal / item.unoptimized) * 100;

            return (
              <div key={idx} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-2 text-[#1D1D1F] dark:text-[#F5F5F7]">
                    <Icon className="w-3.5 h-3.5 text-[#007AFF] dark:text-[#32ADE6]" />
                    <span className="font-medium text-[11px]">{item.name}</span>
                  </div>
                  <span className="font-bold tabular-nums opacity-90">
                    ${currentVal.toLocaleString()}
                  </span>
                </div>

                <div
                  className={`h-2 w-full rounded-full overflow-hidden relative ${
                    isDark ? "bg-white/[0.06]" : "bg-black/[0.06]"
                  }`}
                >
                  <motion.div
                    className={`h-full rounded-full transition-colors duration-300 ${
                      isOptimized ? "bg-[#30D158]" : "bg-amber-400"
                    }`}
                    initial={false}
                    animate={{ width: `${percentage}%` }}
                    transition={{ type: "spring", stiffness: 420, damping: 32 }}
                  />
                </div>
                <div className="text-[10px] text-[#52525B] dark:text-[#86868B] font-light">
                  {item.description}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div
        className={`pt-3.5 mt-3.5 border-t text-[10px] font-mono flex items-center justify-between ${
          isDark ? "border-white/[0.08] text-[#86868B]" : "border-black/[0.08] text-[#52525B]"
        }`}
      >
        <span>GCP Cloud Monitoring &amp; Budgets</span>
        <span className="text-[#30D158] font-semibold">20–25% Cost Reduction Sustained</span>
      </div>
    </BentoSpotlightTile>
  );
}
