"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, ExternalLink, ShieldCheck } from "lucide-react";
import { BentoSpotlightTile } from "./BentoSpotlightTile";
import { useTheme } from "@/shared/context/ThemeContext";

interface Tile3SyncRivoProps {
  onOpenModal: (projectId: string) => void;
}

export function Tile3SyncRivo({ onOpenModal }: Tile3SyncRivoProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const platforms = ["Slack", "Microsoft Teams", "Google Chat", "Zoom Chat", "Cisco Webex"];

  return (
    <BentoSpotlightTile
      id="tile-syncrivo"
      className="lg:col-span-7 col-span-12 flex flex-col justify-between"
    >
      <div>
        {/* Category & Status */}
        <div
          className={`flex items-center justify-between pb-3 mb-5 border-b ${
            isDark ? "border-white/[0.08]" : "border-black/[0.08]"
          }`}
        >
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${isDark ? "bg-[#32ADE6]" : "bg-[#007AFF]"}`} />
            <span
              className={`text-xs font-mono font-bold uppercase tracking-wider ${
                isDark ? "text-[#32ADE6]" : "text-[#007AFF]"
              }`}
            >
              Flagship Case Study 01
            </span>
          </div>
          <span
            className={`text-xs font-mono px-2.5 py-0.5 rounded-full border ${
              isDark
                ? "text-[#A1A1AA] bg-white/[0.04] border-white/10"
                : "text-[#52525B] bg-black/[0.04] border-black/10"
            }`}
          >
            Enterprise Messaging Bridge
          </span>
        </div>

        {/* Title & Headline */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center justify-between">
            <h2
              className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${
                isDark ? "text-[#F5F5F7]" : "text-[#1D1D1F]"
              }`}
            >
              SyncRivo.ai
            </h2>
            <a
              href="https://syncrivo.ai/en/"
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-1 text-xs font-mono transition-colors ${
                isDark ? "text-[#86868B] hover:text-[#32ADE6]" : "text-[#52525B] hover:text-[#007AFF]"
              }`}
            >
              <span>syncrivo.ai</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <p
            className={`text-sm sm:text-base font-medium leading-snug ${
              isDark ? "text-[#F5F5F7]" : "text-[#1D1D1F]"
            }`}
          >
            Enterprise real-time messaging bridge syncing 5 ecosystems with zero loop duplication.
          </p>

          <p
            className={`text-xs sm:text-sm font-light leading-relaxed ${
              isDark ? "text-[#A1A1AA]" : "text-[#52525B]"
            }`}
          >
            Contributed as Backend Developer to the multi-service distributed architecture syncing messages, threads, and attachments across Slack, Microsoft Teams, Google Chat, Zoom, and Webex. Built FastAPI webhook ingress, Redis Pub/Sub decoupling, and bidirectional schema translation.
          </p>
        </div>

        {/* Platform Ecosystem Pills */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {platforms.map((p, idx) => (
            <span
              key={idx}
              className={`text-[11px] font-mono px-2.5 py-1 rounded-full border ${
                isDark
                  ? "bg-white/[0.04] border-white/10 text-zinc-300"
                  : "bg-black/[0.04] border-black/10 text-zinc-800"
              }`}
            >
              {p}
            </span>
          ))}
        </div>

        {/* Architectural Highlights Matrix (iOS Grouped Inset) */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div
            className={`p-3.5 rounded-2xl border space-y-1 ${
              isDark
                ? "bg-white/[0.02] border-white/[0.06]"
                : "bg-[#F2F2F7] border-black/[0.04]"
            }`}
          >
            <div className={`text-[11px] font-mono uppercase ${isDark ? "text-[#86868B]" : "text-[#52525B]"}`}>
              Bridge Latency
            </div>
            <div
              className={`text-lg font-bold font-mono tabular-nums ${
                isDark ? "text-[#F5F5F7]" : "text-[#1D1D1F]"
              }`}
            >
              &lt; 95ms Transit
            </div>
            <div className={`text-[10px] ${isDark ? "text-zinc-400" : "text-zinc-500"}`}>
              FastAPI async webhook ingress
            </div>
          </div>

          <div
            className={`p-3.5 rounded-2xl border space-y-1 ${
              isDark
                ? "bg-white/[0.02] border-white/[0.06]"
                : "bg-[#F2F2F7] border-black/[0.04]"
            }`}
          >
            <div className={`text-[11px] font-mono uppercase ${isDark ? "text-[#86868B]" : "text-[#52525B]"}`}>
              Loop Protection
            </div>
            <div
              className={`text-lg font-bold font-mono ${
                isDark ? "text-[#30D158]" : "text-[#34C759]"
              }`}
            >
              0% Duplication
            </div>
            <div className={`text-[10px] ${isDark ? "text-zinc-400" : "text-zinc-500"}`}>
              Redis SETNX + SHA-256 echo guards
            </div>
          </div>

          <div
            className={`p-3.5 rounded-2xl border space-y-1 ${
              isDark
                ? "bg-white/[0.02] border-white/[0.06]"
                : "bg-[#F2F2F7] border-black/[0.04]"
            }`}
          >
            <div className={`text-[11px] font-mono uppercase ${isDark ? "text-[#86868B]" : "text-[#52525B]"}`}>
              Schema Translation
            </div>
            <div
              className={`text-sm font-bold ${
                isDark ? "text-[#F5F5F7]" : "text-[#1D1D1F]"
              }`}
            >
              Universal AST
            </div>
            <div className={`text-[10px] ${isDark ? "text-zinc-400" : "text-zinc-500"}`}>
              mrkdwn ⇄ Teams HTML ⇄ Google ⇄ Webex
            </div>
          </div>

          <div
            className={`p-3.5 rounded-2xl border space-y-1 ${
              isDark
                ? "bg-white/[0.02] border-white/[0.06]"
                : "bg-[#F2F2F7] border-black/[0.04]"
            }`}
          >
            <div className={`text-[11px] font-mono uppercase ${isDark ? "text-[#86868B]" : "text-[#52525B]"}`}>
              Verified Listings
            </div>
            <div
              className={`text-sm font-bold ${
                isDark ? "text-[#F5F5F7]" : "text-[#1D1D1F]"
              }`}
            >
              4 App Stores
            </div>
            <div className={`text-[10px] ${isDark ? "text-zinc-400" : "text-zinc-500"}`}>
              Microsoft, Google, Zoom &amp; Webex
            </div>
          </div>
        </div>
      </div>

      {/* Trigger Modal CTA */}
      <div
        className={`pt-4 border-t flex items-center justify-between ${
          isDark ? "border-white/[0.08]" : "border-black/[0.08]"
        }`}
      >
        <motion.button
          onClick={() => onOpenModal("syncrivo")}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`px-5 py-2.5 rounded-full font-semibold text-xs transition-colors shadow-md flex items-center gap-2 cursor-pointer ${
            isDark
              ? "bg-white text-black hover:bg-zinc-200"
              : "bg-[#007AFF] text-white hover:bg-blue-600"
          }`}
        >
          <span>Inspect Architecture &amp; Safeguards</span>
          <ArrowRight className="w-4 h-4" />
        </motion.button>

        <span
          className={`text-[11px] font-mono hidden sm:flex items-center gap-1.5 ${
            isDark ? "text-[#86868B]" : "text-[#52525B]"
          }`}
        >
          <ShieldCheck className={`w-3.5 h-3.5 ${isDark ? "text-[#30D158]" : "text-[#34C759]"}`} />
          <span>Reliability Champion Awarded</span>
        </span>
      </div>
    </BentoSpotlightTile>
  );
}
