"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Command, ArrowUpRight, Sparkles, ShieldCheck } from "lucide-react";
import { BentoSpotlightTile } from "./BentoSpotlightTile";

interface Tile1IdentityProps {
  onOpenCommandPalette: () => void;
  onNavigateToOutreach: () => void;
}

export function Tile1Identity({
  onOpenCommandPalette,
  onNavigateToOutreach,
}: Tile1IdentityProps) {
  return (
    <BentoSpotlightTile
      id="tile-identity"
      className="lg:col-span-7 col-span-12 flex flex-col justify-between"
    >
      <div>
        {/* Top Header Pill & Status */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#30D158]/10 border border-[#30D158]/25 text-[#30D158] text-xs font-mono font-medium">
            <span className="w-2 h-2 rounded-full bg-[#30D158] animate-pulse" />
            <span>Open to Backend &amp; DevOps Roles</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-[#86868B]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#32ADE6]" />
            <span>3.6+ Years Prod Exp</span>
          </div>
        </div>

        {/* Identity & Portrait Row */}
        <div className="flex items-start gap-5 sm:gap-6 mb-6">
          <div className="relative shrink-0">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden ring-2 ring-white/15 shadow-2xl relative">
              <Image
                src="/images/venu-profile.jpg"
                alt="Venu K - Backend Developer — Python, DevOps & AI"
                fill
                priority
                sizes="(max-width: 640px) 80px, 96px"
                className="object-cover"
              />
            </div>
            <div
              className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#0B0B0F] border border-white/20 flex items-center justify-center text-[10px]"
              title="Verified Engineer"
            >
              ⚡
            </div>
          </div>

          <div className="space-y-1">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#F5F5F7] tracking-tight">
              Venu K
            </h1>
            <div className="text-sm sm:text-base font-semibold text-[#32ADE6] tracking-tight">
              Backend Developer — Python, DevOps &amp; AI
            </div>
            <p className="text-xs font-mono text-[#86868B]">
              Tirupati, AP, India · Distributed Systems &amp; GitOps
            </p>
          </div>
        </div>

        {/* Editorial Headline */}
        <p className="text-base sm:text-lg text-[#F5F5F7] font-light leading-relaxed tracking-[-0.015em] mb-4">
          Architecting resilient microservices, high-throughput event pipelines, and autonomous AI workflows.
        </p>
        <p className="text-xs sm:text-sm text-[#86868B] font-light leading-relaxed">
          Key contributor across engineering teams at SyncRivo (real-time messaging bridge syncing Slack, Microsoft Teams, Google Chat, Zoom, and Webex) and OCNORA (AI workflow automation platform)—scaling FastAPI services, Redis event queues, and Kubernetes workloads.
        </p>
      </div>

      {/* Action Footer */}
      <div className="pt-6 mt-6 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <motion.button
            onClick={onNavigateToOutreach}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-5 py-2.5 rounded-full bg-white text-black font-semibold text-xs hover:bg-zinc-200 transition-colors shadow-md flex items-center gap-1.5 cursor-pointer"
          >
            <span>Direct Outreach</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </motion.button>

          <motion.button
            onClick={onOpenCommandPalette}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-4 py-2.5 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-[#F5F5F7] text-xs font-mono flex items-center gap-2 cursor-pointer transition-colors"
          >
            <Command className="w-3.5 h-3.5 text-[#32ADE6]" />
            <span>Command Menu</span>
            <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-[10px]">⌘K</kbd>
          </motion.button>
        </div>

        <div className="text-[11px] font-mono text-[#86868B] flex items-center gap-1.5">
          <Sparkles className="w-3 h-3 text-[#32ADE6]" />
          <span>Zero Downtime Deployments</span>
        </div>
      </div>
    </BentoSpotlightTile>
  );
}
