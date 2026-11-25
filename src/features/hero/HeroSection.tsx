"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Server,
  TrendingDown,
  Layers,
  Zap,
} from "lucide-react";
import Image from "next/image";
import { profileData } from "@/shared/data/profile";
import { ShaderGradientCanvas } from "@/shared/components/webgl/ShaderGradientCanvas";

const springTransition = {
  type: "spring" as const,
  stiffness: 240,
  damping: 26,
  mass: 0.8,
};

export function HeroSection() {
  const [imageError, setImageError] = useState(false);

  return (
    <section
      id="hero"
      className="relative pt-36 pb-24 md:pt-48 md:pb-32 overflow-hidden scroll-mt-24"
    >
      {/* Calm, Atmospheric WebGL Shader Backdrop */}
      <div className="absolute inset-0 -z-10 pointer-events-none opacity-40">
        <ShaderGradientCanvas theme="dark" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#000000]/65 to-[#000000]" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Main Hero Spatial Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Headlines, Narrative, Action Pills */}
          <div className="lg:col-span-8 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={springTransition}
              className="space-y-5"
            >
              {/* Role Badge (Apple Subtle Frosted Pill) */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-white/[0.1] text-xs font-medium text-zinc-300">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                <span>Backend Developer — Python, DevOps &amp; AI</span>
              </div>

              {/* Commanding Display Headline */}
              <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-[-0.035em] text-white leading-[0.94]">
                Engineering resilient backends &amp; cloud scale.
              </h1>

              {/* Restrained Editorial Narrative */}
              <p className="text-lg sm:text-xl text-zinc-300 font-light leading-relaxed max-w-2xl pt-1">
                3.6+ years architecting high-throughput microservices, low-latency event pipelines, and autonomous AI agents. Core contributions to the SyncRivo 5-platform enterprise bridge and the OCNORA DAG workflow engine with verified 99.98% production uptime.
              </p>
            </motion.div>

            {/* Apple Tactile Action Pills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...springTransition, delay: 0.15 }}
              className="flex flex-wrap items-center gap-3.5 pt-2"
            >
              <motion.a
                href="#projects"
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-semibold text-xs transition-shadow shadow-[0_4px_24px_rgba(255,255,255,0.2)] hover:shadow-[0_6px_32px_rgba(255,255,255,0.3)] cursor-pointer"
              >
                <span>Explore Systems</span>
                <ArrowRight className="w-4 h-4" />
              </motion.a>

              <motion.a
                href="#contact"
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="inline-flex items-center gap-1.5 px-5 py-3 rounded-full bg-white/[0.05] border border-white/[0.1] hover:bg-white/[0.08] hover:border-white/[0.2] text-white font-medium text-xs transition-colors cursor-pointer"
              >
                <span>Get in Touch</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400" />
              </motion.a>

              <div className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/[0.03] border border-white/[0.08] text-xs font-mono text-zinc-400">
                <span>Tirupati, AP, India</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Framed Apple Portrait with Quiet Specular Rim */}
          <div className="lg:col-span-4 flex justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ ...springTransition, delay: 0.1 }}
              className="relative w-full max-w-[280px] aspect-[4/5]"
            >
              {/* Subtle Ambient Glow */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-cyan-500/15 via-blue-500/15 to-purple-500/10 rounded-[3rem] blur-2xl pointer-events-none opacity-60" />

              {/* Framed Apple Spatial Glass Container */}
              <div className="relative h-full w-full rounded-[2.5rem] overflow-hidden border border-white/[0.12] bg-[#0E0E14] shadow-[0_24px_60px_rgba(0,0,0,0.85)]">
                {!imageError ? (
                  <Image
                    src={profileData.photoUrl}
                    alt={profileData.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 280px"
                    className="object-cover transition-transform duration-700 ease-out hover:scale-105"
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <div className="h-full w-full flex flex-col items-center justify-center p-6 text-center space-y-2 bg-[#121218]">
                    <div className="font-bold text-white text-lg tracking-tight">VENU K</div>
                    <div className="text-xs text-zinc-400 font-mono">Backend Developer</div>
                  </div>
                )}

                {/* Bottom Attribution Pill */}
                <div className="absolute bottom-3 left-3 right-3 py-1.5 px-3.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-between font-mono text-[10px] text-zinc-300">
                  <span className="text-zinc-400">EXPERIENCE</span>
                  <span className="text-emerald-400 font-bold">3.6+ YRS PROD</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* 4-Tile iOS Bento Metrics Grid (Fluid, Spacious, Restrained) */}
        <div className="mt-24 pt-12 border-t border-hairline grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Tile 1: Uptime */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ ...springTransition, delay: 0.05 }}
            whileHover={{ y: -3 }}
            className="p-7 rounded-[2rem] bg-[#0B0B0F] border border-white/[0.08] hover:border-white/20 transition-all space-y-3"
          >
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Server className="w-5 h-5" />
            </div>
            <div>
              <div className="text-4xl font-extrabold text-white tracking-tight font-mono">
                99.98%
              </div>
              <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mt-1.5">
                Production Uptime
              </div>
              <p className="text-xs text-zinc-400 font-light mt-1 leading-relaxed">
                Maintained across live distributed event bridge microservices.
              </p>
            </div>
          </motion.div>

          {/* Tile 2: FinOps */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ ...springTransition, delay: 0.1 }}
            whileHover={{ y: -3 }}
            className="p-7 rounded-[2rem] bg-[#0B0B0F] border border-white/[0.08] hover:border-white/20 transition-all space-y-3"
          >
            <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
              <TrendingDown className="w-5 h-5" />
            </div>
            <div>
              <div className="text-4xl font-extrabold text-white tracking-tight font-mono">
                20–25%
              </div>
              <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mt-1.5">
                Cloud FinOps Cut
              </div>
              <p className="text-xs text-zinc-400 font-light mt-1 leading-relaxed">
                Automated container rightsizing and disk reclamation in GCP.
              </p>
            </div>
          </motion.div>

          {/* Tile 3: Microservices */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ ...springTransition, delay: 0.15 }}
            whileHover={{ y: -3 }}
            className="p-7 rounded-[2rem] bg-[#0B0B0F] border border-white/[0.08] hover:border-white/20 transition-all space-y-3"
          >
            <div className="w-10 h-10 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <div className="text-4xl font-extrabold text-white tracking-tight font-mono">
                20+
              </div>
              <div className="text-xs font-semibold text-blue-400 uppercase tracking-wider mt-1.5">
                Services Architected
              </div>
              <p className="text-xs text-zinc-400 font-light mt-1 leading-relaxed">
                Kubernetes &amp; Cloud Run event-driven microservices fleet.
              </p>
            </div>
          </motion.div>

          {/* Tile 4: MTTR */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ ...springTransition, delay: 0.2 }}
            whileHover={{ y: -3 }}
            className="p-7 rounded-[2rem] bg-[#0B0B0F] border border-white/[0.08] hover:border-white/20 transition-all space-y-3"
          >
            <div className="w-10 h-10 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <div className="text-4xl font-extrabold text-white tracking-tight font-mono">
                35%
              </div>
              <div className="text-xs font-semibold text-purple-400 uppercase tracking-wider mt-1.5">
                Faster Incident MTTR
              </div>
              <p className="text-xs text-zinc-400 font-light mt-1 leading-relaxed">
                Automated Prometheus correlation and root-cause observability.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
