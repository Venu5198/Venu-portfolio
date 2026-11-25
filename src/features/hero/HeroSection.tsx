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
import { LiquidLogo } from "@/shared/components/webgl/LiquidLogo";

const appleSpring = {
  type: "spring" as const,
  mass: 0.9,
  stiffness: 220,
  damping: 28,
};

export function HeroSection() {
  const [imageError, setImageError] = useState(false);

  return (
    <section
      id="hero"
      className="relative pt-36 pb-28 md:pt-48 md:pb-36 overflow-hidden scroll-mt-32"
    >
      {/* Calm, Atmospheric WebGL Shader Aurora Backdrop */}
      <div className="absolute inset-0 -z-10 pointer-events-none opacity-35">
        <ShaderGradientCanvas theme="dark" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#000000]/60 to-[#000000]" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Main Apple Spatial Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Role, Display Headline, Narrative & Action Pills */}
          <div className="lg:col-span-8 space-y-8">
            <motion.div
              initial={{ opacity: 0.95, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-6"
            >
              {/* Subtle Apple Frosted Role Badge */}
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.05] border border-white/[0.10] text-xs font-medium text-zinc-300">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                <span>Backend Developer — Python, DevOps &amp; AI</span>
              </div>

              {/* Display Headline with SF-Style Tight Optical Tracking */}
              <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-[-0.035em] text-white leading-[0.93]">
                Engineering resilient backends &amp; cloud scale.
              </h1>

              {/* Restrained Editorial Narrative */}
              <p className="text-lg sm:text-xl text-[#E5E5EA] font-light leading-relaxed max-w-2xl">
                3.6+ years architecting high-throughput microservices, low-latency event pipelines, and autonomous AI agents. Core contributions to the SyncRivo 5-platform enterprise bridge and the OCNORA DAG workflow engine with verified 99.98% production uptime.
              </p>
            </motion.div>

            {/* Apple Tactile Action Pills */}
            <motion.div
              initial={{ opacity: 0.95, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <motion.a
                href="#projects"
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={appleSpring}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white text-black font-semibold text-xs transition-shadow shadow-[0_4px_24px_rgba(255,255,255,0.22)] hover:shadow-[0_6px_32px_rgba(255,255,255,0.32)] cursor-pointer"
              >
                <span>Explore Systems</span>
                <ArrowRight className="w-4 h-4" />
              </motion.a>

              <motion.a
                href="#contact"
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={appleSpring}
                className="inline-flex items-center gap-1.5 px-5 py-3.5 rounded-full bg-white/[0.05] border border-white/[0.12] hover:bg-white/[0.09] hover:border-white/[0.22] text-white font-medium text-xs transition-colors cursor-pointer"
              >
                <span>Get in Touch</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400" />
              </motion.a>

              <div className="hidden sm:inline-flex items-center gap-2 px-4 py-3 rounded-full bg-white/[0.03] border border-white/[0.08] text-xs font-mono text-[#8E8E93]">
                <span>Tirupati, AP, India</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Framed Apple Portrait with Specular Glass Frame */}
          <div className="lg:col-span-4 flex justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0.95, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.45, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-[280px] aspect-[4/5]"
            >
              {/* Subtle Ambient Depth Glow */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-cyan-500/15 via-blue-500/15 to-purple-500/10 rounded-[3rem] blur-2xl pointer-events-none opacity-50" />

              {/* Framed Apple Spatial Glass Container */}
              <div className="relative h-full w-full rounded-[2.5rem] overflow-hidden border border-white/[0.12] bg-[#0E0E14] shadow-[0_24px_60px_rgba(0,0,0,0.85)]">
                {!imageError ? (
                  <Image
                    src={profileData.photoUrl}
                    alt={profileData.name}
                    fill
                    priority
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
                <div className="absolute bottom-3 left-3 right-3 py-1.5 px-3.5 rounded-full bg-black/65 backdrop-blur-md border border-white/10 flex items-center justify-between font-mono text-[10px] text-zinc-300">
                  <span className="text-[#8E8E93]">EXPERIENCE</span>
                  <span className="text-emerald-400 font-bold">3.6+ YRS PROD</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* 4-Card iOS Bento Summary (Breathing Rhythm & Physical Weight) */}
        <div className="mt-28 pt-14 border-t border-hairline grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Tile 1: Uptime */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ ...appleSpring, delay: 0.05 }}
            whileHover={{ y: -3 }}
            className="p-8 apple-card space-y-3"
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
              <p className="text-xs text-[#8E8E93] font-light mt-1.5 leading-relaxed">
                Maintained across live distributed event bridge microservices.
              </p>
            </div>
          </motion.div>

          {/* Tile 2: FinOps */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ ...appleSpring, delay: 0.1 }}
            whileHover={{ y: -3 }}
            className="p-8 apple-card space-y-3"
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
              <p className="text-xs text-[#8E8E93] font-light mt-1.5 leading-relaxed">
                Automated container rightsizing and disk reclamation in GCP.
              </p>
            </div>
          </motion.div>

          {/* Tile 3: Microservices */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ ...appleSpring, delay: 0.15 }}
            whileHover={{ y: -3 }}
            className="p-8 apple-card space-y-3"
          >
            <div className="w-10 h-10 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <div className="text-4xl font-extrabold text-white tracking-tight font-mono">
                20+
              </div>
              <div className="text-xs font-semibold text-blue-400 uppercase tracking-wider mt-1.5">
                Microservices Fleet
              </div>
              <p className="text-xs text-[#8E8E93] font-light mt-1.5 leading-relaxed">
                Kubernetes &amp; Cloud Run event-driven microservices fleet.
              </p>
            </div>
          </motion.div>

          {/* Tile 4: MTTR */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ ...appleSpring, delay: 0.2 }}
            whileHover={{ y: -3 }}
            className="p-8 apple-card space-y-3"
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
              <p className="text-xs text-[#8E8E93] font-light mt-1.5 leading-relaxed">
                Automated Prometheus correlation and root-cause observability.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
