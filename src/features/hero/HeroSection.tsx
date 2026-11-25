"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Copy,
  Check,
  Terminal,
  ArrowUpRight,
  Server,
  TrendingDown,
  Layers,
  Zap,
} from "lucide-react";
import Image from "next/image";
import { profileData } from "@/shared/data/profile";
import { ShaderGradientCanvas } from "@/shared/components/webgl/ShaderGradientCanvas";
import { LiquidLogo } from "@/shared/components/webgl/LiquidLogo";

const transitionEase = [0.16, 1, 0.3, 1] as const;

export function HeroSection() {
  const [copied, setCopied] = useState(false);
  const [imageError, setImageError] = useState(false);

  const command = "npx venu-k";

  const handleCopy = () => {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
        navigator.clipboard
          .writeText(command)
          .then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          })
          .catch(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          });
      } else {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section
      id="hero"
      className="relative pt-32 pb-20 md:pt-44 md:pb-28 overflow-hidden scroll-mt-24"
    >
      {/* Ambient WebGL Shader Gradient Atmosphere */}
      <div className="absolute inset-0 -z-10 pointer-events-none opacity-45">
        <ShaderGradientCanvas theme="dark" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#000000]/60 to-[#000000]" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Overhead Metadata Pill */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: transitionEase }}
          className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-12 border-b border-hairline"
        >
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.05] border border-white/10 text-xs font-medium text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Available for Backend &amp; DevOps Roles
            </span>
            <span className="text-xs text-zinc-400 font-mono hidden sm:inline">
              Tirupati, AP, India
            </span>
          </div>

          <div className="hidden md:flex items-center gap-2 text-xs font-mono text-zinc-400">
            <span className="text-zinc-300 font-semibold">PYTHON</span>
            <span className="text-zinc-600">·</span>
            <span className="text-zinc-300 font-semibold">FASTAPI</span>
            <span className="text-zinc-600">·</span>
            <span className="text-zinc-300 font-semibold">KUBERNETES</span>
            <span className="text-zinc-600">·</span>
            <span className="text-zinc-300 font-semibold">GCP</span>
            <span className="text-zinc-600">·</span>
            <span className="text-zinc-300 font-semibold">AI RUNTIMES</span>
          </div>
        </motion.div>

        {/* Hero Spatial Card: Two-Column Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Headlines, Bio, Actions */}
          <div className="lg:col-span-8 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.1, ease: transitionEase }}
              className="space-y-4"
            >
              {/* Role Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-500/10 via-cyan-500/10 to-transparent border border-cyan-500/20 text-xs font-mono text-cyan-400 font-semibold">
                <span>Backend Developer — Python, DevOps &amp; AI</span>
              </div>

              {/* Display Headline */}
              <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-[-0.03em] text-white leading-[0.92]">
                VENU <span className="text-zinc-500 font-light">K</span>
              </h1>

              <p className="text-xl sm:text-2xl text-zinc-200 font-normal leading-snug max-w-2xl pt-2">
                Architecting high-throughput microservices, low-latency event pipelines, and autonomous AI agents with zero downtime.
              </p>
            </motion.div>

            {/* Concise Bio */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2, ease: transitionEase }}
              className="text-base sm:text-lg text-zinc-400 font-light leading-relaxed max-w-2xl"
            >
              3.6+ years engineering production systems. Core contributions to the SyncRivo 5-platform enterprise messaging bridge, the OCNORA stateful AI workflow DAG engine, and automated FinOps saving 20–25% cloud spend.
            </motion.p>

            {/* Apple Action Pills Strip */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.3, ease: transitionEase }}
              className="flex flex-wrap items-center gap-3.5 pt-2"
            >
              {/* Primary Explore CTA */}
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-semibold text-xs hover:bg-zinc-200 transition-all shadow-[0_4px_24px_rgba(255,255,255,0.25)]"
              >
                <span>Explore Systems</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              {/* Secondary Contact CTA */}
              <a
                href="#contact"
                className="inline-flex items-center gap-1.5 px-5 py-3 rounded-full bg-white/[0.05] border border-white/10 hover:bg-white/[0.08] hover:border-white/20 text-white font-medium text-xs transition-all"
              >
                <span>Get in Touch</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400" />
              </a>

              {/* CLI Command Pill */}
              <div className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-white/[0.04] border border-white/10 font-mono text-xs text-zinc-300">
                <Terminal className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span className="text-zinc-500">$</span>
                <span className="text-white font-semibold">{command}</span>
                <button
                  onClick={handleCopy}
                  className="ml-1 pl-2.5 border-l border-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                  title="Copy command"
                >
                  {copied ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Framed Apple Portrait with Specular Rim */}
          <div className="lg:col-span-4 flex justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.1, delay: 0.2, ease: transitionEase }}
              className="relative w-full max-w-[280px] aspect-[4/5]"
            >
              {/* Subtle Breathing Ambient Light behind Portrait */}
              <motion.div
                animate={{
                  opacity: [0.35, 0.65, 0.35],
                  scale: [0.98, 1.04, 0.98],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -inset-6 bg-gradient-to-tr from-cyan-500/20 via-blue-500/20 to-purple-500/20 rounded-full blur-3xl pointer-events-none"
              />

              {/* Framed Apple Spatial Glass Frame */}
              <div className="relative h-full w-full rounded-[2rem] overflow-hidden border border-white/[0.14] bg-[#121218] shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
                {!imageError ? (
                  <Image
                    src={profileData.photoUrl}
                    alt={profileData.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 280px"
                    className="object-cover transition-transform duration-700 hover:scale-105"
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <div className="h-full w-full flex flex-col items-center justify-center p-6 text-center space-y-3 bg-gradient-to-b from-[#181824] to-[#0c0c12]">
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
                  </div>
                )}

                {/* Bottom Experience Tag */}
                <div className="absolute bottom-3 left-3 right-3 py-1.5 px-3 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-between font-mono text-[10px] text-zinc-300">
                  <span className="text-zinc-400 font-medium">EXPERIENCE</span>
                  <span className="text-emerald-400 font-bold">3.6+ YRS PROD</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* 4-Tile iOS Bento Metrics Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: transitionEase }}
          className="mt-20 pt-10 border-t border-hairline grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {/* Tile 1: Uptime */}
          <div className="p-6 rounded-3xl bg-[#0e0e14] border border-white/[0.08] hover:border-white/20 transition-all space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Server className="w-5 h-5" />
            </div>
            <div>
              <div className="text-4xl font-extrabold text-white tracking-tight font-mono">
                99.98%
              </div>
              <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mt-1">
                Production Uptime
              </div>
              <p className="text-xs text-zinc-400 font-light mt-1.5 leading-relaxed">
                Maintained across live distributed event bridge microservices.
              </p>
            </div>
          </div>

          {/* Tile 2: FinOps */}
          <div className="p-6 rounded-3xl bg-[#0e0e14] border border-white/[0.08] hover:border-white/20 transition-all space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
              <TrendingDown className="w-5 h-5" />
            </div>
            <div>
              <div className="text-4xl font-extrabold text-white tracking-tight font-mono">
                20–25%
              </div>
              <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mt-1">
                Cloud FinOps Cut
              </div>
              <p className="text-xs text-zinc-400 font-light mt-1.5 leading-relaxed">
                Automated container rightsizing and disk reclamation in GCP.
              </p>
            </div>
          </div>

          {/* Tile 3: Microservices */}
          <div className="p-6 rounded-3xl bg-[#0e0e14] border border-white/[0.08] hover:border-white/20 transition-all space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <div className="text-4xl font-extrabold text-white tracking-tight font-mono">
                20+
              </div>
              <div className="text-xs font-semibold text-blue-400 uppercase tracking-wider mt-1">
                Services Architected
              </div>
              <p className="text-xs text-zinc-400 font-light mt-1.5 leading-relaxed">
                Kubernetes &amp; Cloud Run event-driven microservices fleet.
              </p>
            </div>
          </div>

          {/* Tile 4: MTTR */}
          <div className="p-6 rounded-3xl bg-[#0e0e14] border border-white/[0.08] hover:border-white/20 transition-all space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <div className="text-4xl font-extrabold text-white tracking-tight font-mono">
                35%
              </div>
              <div className="text-xs font-semibold text-purple-400 uppercase tracking-wider mt-1">
                Faster Incident MTTR
              </div>
              <p className="text-xs text-zinc-400 font-light mt-1.5 leading-relaxed">
                Automated Prometheus correlation and root-cause observability.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
