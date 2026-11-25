"use client";

import React from "react";
import { Activity, Zap, TrendingDown, Clock, ShieldCheck } from "lucide-react";
import { BentoSpotlightTile } from "./BentoSpotlightTile";
import { useTheme } from "@/shared/context/ThemeContext";

export function Tile2Telemetry() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const telemetryData = [
    {
      label: "Uptime SLA",
      value: "99.98%",
      subtext: "SyncRivo Production Bridge",
      color: isDark ? "#30D158" : "#34C759", // Green
      icon: Activity,
      sparkline: (
        <svg viewBox="0 0 100 24" className="w-full h-5 stroke-[#30D158] dark:stroke-[#30D158] fill-none stroke-[2]">
          <path d="M0,18 L20,18 L25,6 L30,22 L35,14 L40,18 L60,18 L65,8 L70,20 L75,12 L80,18 L100,18" />
        </svg>
      ),
    },
    {
      label: "Cloud FinOps",
      value: "20–25%",
      subtext: "GCP / Kubernetes Saved",
      color: isDark ? "#32ADE6" : "#007AFF", // Cyan / Blue
      icon: TrendingDown,
      sparkline: (
        <svg viewBox="0 0 100 24" className={`w-full h-5 ${isDark ? "stroke-[#32ADE6]" : "stroke-[#007AFF]"} fill-none stroke-[2]`}>
          <path d="M0,6 L20,8 L40,12 L60,16 L80,19 L100,21" />
        </svg>
      ),
    },
    {
      label: "Faster MTTR",
      value: "35%",
      subtext: "Automated Health Rollbacks",
      color: isDark ? "#BF5AF2" : "#AF52DE", // Purple
      icon: Clock,
      sparkline: (
        <svg viewBox="0 0 100 24" className={`w-full h-5 ${isDark ? "stroke-[#BF5AF2]" : "stroke-[#AF52DE]"} fill-none stroke-[2]`}>
          <path d="M0,20 L25,18 L50,14 L75,9 L100,4" />
        </svg>
      ),
    },
    {
      label: "Microservices",
      value: "20+",
      subtext: "FastAPI / Docker / Cloud Run",
      color: isDark ? "#FF9F0A" : "#FF9500", // Amber
      icon: Zap,
      sparkline: (
        <svg viewBox="0 0 100 24" className={`w-full h-5 ${isDark ? "stroke-[#FF9F0A]" : "stroke-[#FF9500]"} fill-none stroke-[2]`}>
          <path d="M0,16 L15,14 L30,17 L45,11 L60,13 L75,7 L90,9 L100,5" />
        </svg>
      ),
    },
  ];

  return (
    <BentoSpotlightTile
      id="tile-telemetry"
      className="lg:col-span-5 col-span-12 flex flex-col justify-between"
    >
      <div>
        {/* Header */}
        <div
          className={`flex items-center justify-between pb-3 mb-4 border-b ${
            isDark ? "border-white/[0.08]" : "border-black/[0.08]"
          }`}
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#007AFF] dark:bg-[#32ADE6] animate-ping" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#1D1D1F] dark:text-[#F5F5F7]">
              Production Telemetry
            </span>
          </div>
          <span className="text-[10px] font-mono text-[#52525B] dark:text-[#86868B]">
            Activity Monitor
          </span>
        </div>

        {/* 2x2 Gauges Grid */}
        <div className="grid grid-cols-2 gap-3.5">
          {telemetryData.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className={`p-3.5 sm:p-4 rounded-2xl border transition-all flex flex-col justify-between space-y-2 group/card ${
                  isDark
                    ? "bg-white/[0.03] border-white/[0.08] hover:border-white/15"
                    : "bg-[#F2F2F7] border-black/[0.06] hover:border-black/15 shadow-sm"
                }`}
              >
                <div className="flex items-center justify-between text-[11px] font-mono text-[#52525B] dark:text-[#86868B]">
                  <span className="truncate">{item.label}</span>
                  <Icon className="w-3.5 h-3.5 opacity-70 group-hover/card:opacity-100 transition-opacity" />
                </div>

                <div className="space-y-1">
                  <div
                    className="text-2xl sm:text-3xl font-extrabold tracking-tight font-mono tabular-nums"
                    style={{ color: item.color }}
                  >
                    {item.value}
                  </div>
                  <div className="text-[10px] font-mono text-[#52525B] dark:text-[#86868B] truncate">
                    {item.subtext}
                  </div>
                </div>

                <div className="pt-1 opacity-75 group-hover/card:opacity-100 transition-opacity">
                  {item.sparkline}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div
        className={`pt-4 mt-4 border-t flex items-center justify-between text-[11px] font-mono ${
          isDark ? "border-white/[0.08] text-[#A1A1AA]" : "border-black/[0.08] text-[#52525B]"
        }`}
      >
        <span className="flex items-center gap-1.5 text-[#30D158] dark:text-[#30D158] font-semibold">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Continuous Health Audits</span>
        </span>
        <span className="opacity-60">Prometheus &amp; Grafana</span>
      </div>
    </BentoSpotlightTile>
  );
}
