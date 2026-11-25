"use client";

import React from "react";
import { Activity, Zap, TrendingDown, Clock, ShieldCheck } from "lucide-react";
import { BentoSpotlightTile } from "./BentoSpotlightTile";

export function Tile2Telemetry() {
  const telemetryData = [
    {
      label: "Uptime SLA",
      value: "99.98%",
      subtext: "SyncRivo Production Bridge",
      color: "#30D158", // System Green
      icon: Activity,
      sparkline: (
        <svg viewBox="0 0 100 24" className="w-full h-5 stroke-[#30D158] fill-none stroke-[2]">
          <path d="M0,18 L20,18 L25,6 L30,22 L35,14 L40,18 L60,18 L65,8 L70,20 L75,12 L80,18 L100,18" />
        </svg>
      ),
    },
    {
      label: "Cloud FinOps",
      value: "20–25%",
      subtext: "GCP / Kubernetes Saved",
      color: "#32ADE6", // System Cyan
      icon: TrendingDown,
      sparkline: (
        <svg viewBox="0 0 100 24" className="w-full h-5 stroke-[#32ADE6] fill-none stroke-[2]">
          <path d="M0,6 L20,8 L40,12 L60,16 L80,19 L100,21" />
        </svg>
      ),
    },
    {
      label: "Faster MTTR",
      value: "35%",
      subtext: "Automated Health Rollbacks",
      color: "#BF5AF2", // System Purple
      icon: Clock,
      sparkline: (
        <svg viewBox="0 0 100 24" className="w-full h-5 stroke-[#BF5AF2] fill-none stroke-[2]">
          <path d="M0,20 L25,18 L50,14 L75,9 L100,4" />
        </svg>
      ),
    },
    {
      label: "Microservices",
      value: "20+",
      subtext: "FastAPI / Docker / Cloud Run",
      color: "#FF9F0A", // System Amber
      icon: Zap,
      sparkline: (
        <svg viewBox="0 0 100 24" className="w-full h-5 stroke-[#FF9F0A] fill-none stroke-[2]">
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
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/[0.08]">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#32ADE6] animate-ping" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#F5F5F7]">
              Production Telemetry
            </span>
          </div>
          <span className="text-[10px] font-mono text-[#86868B]">Activity Monitor</span>
        </div>

        {/* 2x2 Gauges Grid */}
        <div className="grid grid-cols-2 gap-3.5">
          {telemetryData.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-3.5 sm:p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-white/15 transition-all flex flex-col justify-between space-y-2 group/card"
              >
                <div className="flex items-center justify-between text-[11px] font-mono text-[#86868B]">
                  <span className="truncate">{item.label}</span>
                  <Icon className="w-3.5 h-3.5 text-[#86868B] group-hover/card:text-[#F5F5F7] transition-colors" />
                </div>

                <div className="space-y-1">
                  <div
                    className="text-2xl sm:text-3xl font-extrabold tracking-tight font-mono tabular-nums"
                    style={{ color: item.color }}
                  >
                    {item.value}
                  </div>
                  <div className="text-[10px] font-mono text-[#86868B] truncate">
                    {item.subtext}
                  </div>
                </div>

                <div className="pt-1 opacity-70 group-hover/card:opacity-100 transition-opacity">
                  {item.sparkline}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="pt-4 mt-4 border-t border-white/[0.08] flex items-center justify-between text-[11px] font-mono text-[#86868B]">
        <span className="flex items-center gap-1.5 text-[#30D158]">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Continuous Health Audits</span>
        </span>
        <span className="text-zinc-500">Prometheus &amp; Grafana</span>
      </div>
    </BentoSpotlightTile>
  );
}
