"use client";

import React from "react";
import { motion } from "framer-motion";
import { Layers, ArrowRight, ExternalLink, Zap, ShieldCheck } from "lucide-react";
import { BentoSpotlightTile } from "./BentoSpotlightTile";

interface Tile3SyncRivoProps {
  onOpenModal: (projectId: string) => void;
}

export function Tile3SyncRivo({ onOpenModal }: Tile3SyncRivoProps) {
  const platforms = ["Slack", "Microsoft Teams", "Google Chat", "Zoom Chat", "Cisco Webex"];

  return (
    <BentoSpotlightTile
      id="tile-syncrivo"
      className="lg:col-span-7 col-span-12 flex flex-col justify-between"
    >
      <div>
        {/* Category & Status */}
        <div className="flex items-center justify-between pb-3 mb-5 border-b border-white/[0.08]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#32ADE6]" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#32ADE6]">
              Flagship Case Study 01
            </span>
          </div>
          <span className="text-xs font-mono text-[#86868B] px-2.5 py-0.5 rounded-full bg-white/[0.04] border border-white/10">
            Enterprise Messaging Bridge
          </span>
        </div>

        {/* Title & Headline */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#F5F5F7] tracking-tight">
              SyncRivo.ai
            </h2>
            <a
              href="https://syncrivo.ai/en/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-mono text-[#86868B] hover:text-[#32ADE6] transition-colors"
            >
              <span>syncrivo.ai</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <p className="text-sm sm:text-base text-[#F5F5F7] font-medium leading-snug">
            Enterprise real-time messaging bridge syncing 5 ecosystems with zero loop duplication.
          </p>

          <p className="text-xs sm:text-sm text-[#86868B] font-light leading-relaxed">
            Contributed as Backend Developer to the multi-service distributed architecture syncing messages, threads, and attachments across Slack, Microsoft Teams, Google Chat, Zoom, and Webex. Built FastAPI webhook ingress, Redis Pub/Sub decoupling, and bidirectional schema translation.
          </p>
        </div>

        {/* Platform Ecosystem Pills */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {platforms.map((p, idx) => (
            <span
              key={idx}
              className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-zinc-300"
            >
              {p}
            </span>
          ))}
        </div>

        {/* Architectural Highlights Matrix */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-1">
            <div className="text-[11px] font-mono text-[#86868B] uppercase">Bridge Latency</div>
            <div className="text-lg font-bold text-[#F5F5F7] font-mono tabular-nums">&lt; 95ms Transit</div>
            <div className="text-[10px] text-zinc-400">FastAPI async webhook ingress</div>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-1">
            <div className="text-[11px] font-mono text-[#86868B] uppercase">Loop Protection</div>
            <div className="text-lg font-bold text-[#30D158] font-mono">0% Duplication</div>
            <div className="text-[10px] text-zinc-400">Redis SETNX + SHA-256 echo guards</div>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-1">
            <div className="text-[11px] font-mono text-[#86868B] uppercase">Schema Translation</div>
            <div className="text-sm font-bold text-[#F5F5F7]">Universal AST</div>
            <div className="text-[10px] text-zinc-400">mrkdwn ⇄ Teams HTML ⇄ Google ⇄ Webex</div>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-1">
            <div className="text-[11px] font-mono text-[#86868B] uppercase">Verified Listings</div>
            <div className="text-sm font-bold text-[#F5F5F7]">4 App Stores</div>
            <div className="text-[10px] text-zinc-400">Microsoft, Google, Zoom &amp; Webex</div>
          </div>
        </div>
      </div>

      {/* Trigger Modal CTA */}
      <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between">
        <motion.button
          onClick={() => onOpenModal("syncrivo")}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-5 py-2.5 rounded-full bg-white text-black font-semibold text-xs hover:bg-zinc-200 transition-colors shadow-md flex items-center gap-2 cursor-pointer"
        >
          <span>Inspect Architecture &amp; Safeguards</span>
          <ArrowRight className="w-4 h-4" />
        </motion.button>

        <span className="text-[11px] font-mono text-[#86868B] hidden sm:flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-[#30D158]" />
          <span>Reliability Champion Awarded</span>
        </span>
      </div>
    </BentoSpotlightTile>
  );
}
