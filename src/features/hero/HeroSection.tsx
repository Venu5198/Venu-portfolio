"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Terminal,
  ArrowRight,
  Copy,
  Check,
  MapPin,
  Calendar,
  Layers,
  ArrowUpRight,
} from "lucide-react";
import Image from "next/image";
import { profileData } from "@/shared/data/profile";
import { TelemetryBadge } from "@/shared/components/TelemetryBadge";
import { Magnetic } from "@/shared/components/Magnetic";

const transitionEase = [0.22, 1, 0.36, 1] as const;

export function HeroSection() {
  const [copied, setCopied] = useState(false);
  const [imageError, setImageError] = useState(false);

  const command = "npx venu-k";

  const handleCopy = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="hero"
      className="relative pt-36 pb-20 md:pt-48 md:pb-28 overflow-hidden scroll-mt-28"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Overhead Metadata Hairline Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: transitionEase }}
          className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-12 border-b border-hairline font-mono text-xs text-zinc-400"
        >
          <div className="flex flex-wrap items-center gap-4">
            <TelemetryBadge
              status="online"
              label="SYSTEM: OPERATIONAL"
              subLabel="99.98% SLA"
            />
            <div className="flex items-center gap-1.5 text-zinc-400">
              <MapPin className="w-3.5 h-3.5 text-cyan-400" />
              <span>Tirupati, Andhra Pradesh, India</span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-3 text-zinc-500 font-mono text-xs">
            <span className="text-zinc-400 font-semibold">SYSTEMS ENGINEERING DOSSIER</span>
            <span className="text-zinc-700">/</span>
            <span>PYTHON · FASTAPI · KUBERNETES · GCP · AI</span>
          </div>
        </motion.div>

        {/* Hero Main Editorial Grid: Asymmetric Typography + Floating Headshot */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left: Massive Typographic Impact */}
          <div className="lg:col-span-8 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.1, ease: transitionEase }}
              className="space-y-4"
            >
              <div className="font-mono text-xs uppercase tracking-[0.28em] text-cyan-400 font-bold flex items-center gap-2">
                <span className="w-8 h-px bg-cyan-400" />
                Backend Developer — Python, DevOps &amp; AI
              </div>

              {/* Commanding Display Name */}
              <h1 className="text-7xl sm:text-9xl lg:text-[9.5rem] font-black tracking-tighter text-white uppercase leading-[0.82] select-none">
                VENU <span className="text-zinc-600 font-extralight">K</span>
              </h1>
            </motion.div>

            {/* Narrative Editorial Statement */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.25, ease: transitionEase }}
              className="text-lg sm:text-xl text-zinc-300 font-light leading-relaxed max-w-2xl"
            >
              {profileData.heroBio}
            </motion.p>

            {/* Scannable Engineering Core Competencies Strip */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.35, ease: transitionEase }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 max-w-2xl"
            >
              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-hairline space-y-1">
                <div className="font-mono text-[10px] text-cyan-400 font-bold uppercase tracking-wider">
                  EVENT INGESTION &amp; SYNC
                </div>
                <div className="text-xs text-zinc-400 font-light leading-snug">
                  Sub-95ms bridge transit across 5 platforms with zero echo duplication.
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-hairline space-y-1">
                <div className="font-mono text-[10px] text-emerald-400 font-bold uppercase tracking-wider">
                  CLOUD PLATFORM &amp; FINOPS
                </div>
                <div className="text-xs text-zinc-400 font-light leading-snug">
                  20–25% monthly GCP spend cut across 20+ Kubernetes &amp; Cloud Run services.
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-hairline space-y-1">
                <div className="font-mono text-[10px] text-amber-400 font-bold uppercase tracking-wider">
                  AI WORKFLOW RUNTIMES
                </div>
                <div className="text-xs text-zinc-400 font-light leading-snug">
                  Autonomous Git worktree coding runners with LLM budget circuit breakers.
                </div>
              </div>
            </motion.div>

            {/* Interactive Terminal Snippet & CTAs (Clean, Unboxed) */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.45, ease: transitionEase }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              {/* Terminal CLI Snippet */}
              <div className="inline-flex items-center gap-3 px-4 py-2.5 rounded-full bg-white/[0.03] border border-hairline font-mono text-xs text-zinc-300 hover:border-white/20 transition-all duration-300">
                <Terminal className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span className="text-zinc-500">$</span>
                <span className="text-cyan-300 font-bold">{command}</span>
                <button
                  onClick={handleCopy}
                  className="ml-2 pl-3 border-l border-white/10 text-zinc-500 hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
                  title="Copy command"
                >
                  {copied ? (
                    <Check className="w-3 h-3 text-emerald-400" />
                  ) : (
                    <Copy className="w-3 h-3" />
                  )}
                  <span className="text-[10px] uppercase font-mono">
                    {copied ? "Copied" : "Copy"}
                  </span>
                </button>
              </div>

              {/* Direct GitHub Profile Link */}
              <a
                href="https://github.com/Venu5198"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white/[0.03] border border-hairline text-zinc-300 hover:text-white hover:border-white/20 text-xs font-mono transition-all duration-300"
              >
                <span>github.com/Venu5198</span>
                <ArrowUpRight className="w-3 h-3 text-zinc-500" />
              </a>

              {/* Direct LinkedIn Profile Link */}
              <a
                href="https://www.linkedin.com/in/venu-k-2a4460383"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white/[0.03] border border-hairline text-zinc-300 hover:text-white hover:border-white/20 text-xs font-mono transition-all duration-300"
              >
                <span>linkedin.com/in/venu-k</span>
                <ArrowUpRight className="w-3 h-3 text-zinc-500" />
              </a>

              {/* Primary Action Button */}
              <Magnetic strength={16}>
                <a
                  href="#projects"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-cyan-400 text-black font-bold text-xs hover:bg-cyan-300 transition-all duration-300 shadow-[0_0_30px_rgba(6,182,212,0.45)]"
                >
                  <span>Explore Systems Dossier</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </Magnetic>
            </motion.div>
          </div>

          {/* Right: Clean, Open Headshot Presentation with Slow Breathing Glow */}
          <div className="lg:col-span-4 flex justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.2, ease: transitionEase }}
              className="relative w-full max-w-[290px] aspect-[4/5]"
            >
              {/* Slow-Breathing Ambient Radial Spotlight Glow */}
              <motion.div
                animate={{
                  opacity: [0.45, 0.8, 0.45],
                  scale: [0.98, 1.05, 0.98],
                }}
                transition={{
                  duration: 6.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -inset-8 bg-gradient-to-tr from-cyan-500/25 via-emerald-500/18 to-transparent rounded-full blur-3xl pointer-events-none"
              />

              {/* Clean Editorial Portrait Container with 1px Hairline Rim */}
              <div className="relative h-full w-full rounded-3xl overflow-hidden border border-white/10 bg-[#101016] shadow-2xl">
                {!imageError ? (
                  <Image
                    src={profileData.photoUrl}
                    alt={profileData.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 290px"
                    className="object-cover transition-transform duration-1000 ease-out hover:scale-105"
                    onError={() => setImageError(true)}
                  />
                ) : null}

                {imageError && (
                  <div className="h-full w-full flex flex-col items-center justify-center p-6 text-center space-y-3 bg-gradient-to-b from-[#181824] to-[#0d0d12]">
                    <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                      <Terminal className="w-7 h-7" />
                    </div>
                    <div>
                      <div className="font-mono text-sm font-bold text-white uppercase tracking-wider">
                        VENU K
                      </div>
                      <div className="font-mono text-xs text-zinc-400 mt-1">
                        Backend Developer
                      </div>
                    </div>
                    <div className="font-mono text-[10px] text-cyan-400/80 bg-cyan-950/40 border border-cyan-500/20 px-2.5 py-1 rounded-full">
                      public/images/venu-profile.jpg
                    </div>
                  </div>
                )}

                {/* Subtle Bottom Attribution Pill */}
                <div className="absolute bottom-3 left-3 right-3 py-1.5 px-3 rounded-full bg-black/70 backdrop-blur-md border border-white/10 flex items-center justify-between font-mono text-[10px] text-zinc-300">
                  <span className="text-zinc-500">EXPERIENCE</span>
                  <span className="text-emerald-400 font-bold">3.6+ YRS PROD</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Completely Borderless Editorial Telemetry Ledger (Clean Hairline Rules) */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.5, ease: transitionEase }}
          className="mt-20 pt-10 border-t border-hairline grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6 items-baseline"
        >
          <div className="space-y-1">
            <div className="text-4xl sm:text-5xl font-extrabold text-white font-mono tracking-tight">
              {profileData.metrics.availability}
            </div>
            <div className="font-mono text-xs text-emerald-400 font-semibold uppercase tracking-wider">
              Service Availability
            </div>
            <div className="text-xs text-zinc-500 font-light">
              Maintained across production microservices
            </div>
          </div>

          <div className="space-y-1 md:border-l md:border-hairline md:pl-6">
            <div className="text-4xl sm:text-5xl font-extrabold text-white font-mono tracking-tight">
              {profileData.metrics.costReduction}
            </div>
            <div className="font-mono text-xs text-cyan-400 font-semibold uppercase tracking-wider">
              FinOps Spend Cut
            </div>
            <div className="text-xs text-zinc-500 font-light">
              Automated resource &amp; disk rightsizing
            </div>
          </div>

          <div className="space-y-1 md:border-l md:border-hairline md:pl-6">
            <div className="text-4xl sm:text-5xl font-extrabold text-white font-mono tracking-tight">
              {profileData.metrics.microservices}
            </div>
            <div className="font-mono text-xs text-amber-400 font-semibold uppercase tracking-wider">
              Containerized Fleet
            </div>
            <div className="text-xs text-zinc-500 font-light">
              Distributed workloads in live prod
            </div>
          </div>

          <div className="space-y-1 md:border-l md:border-hairline md:pl-6">
            <div className="text-4xl sm:text-5xl font-extrabold text-white font-mono tracking-tight">
              {profileData.metrics.incidentRecovery}
            </div>
            <div className="font-mono text-xs text-purple-400 font-semibold uppercase tracking-wider">
              Incident Turnaround
            </div>
            <div className="text-xs text-zinc-500 font-light">
              Correlation via Prometheus topology
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
