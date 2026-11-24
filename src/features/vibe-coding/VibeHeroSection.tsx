"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Terminal, Copy, Check, ArrowRight, Sparkles, Coffee, Heart } from "lucide-react";
import { profileData } from "@/shared/data/profile";

const slowSpring = {
  duration: 1.1,
  ease: [0.22, 1, 0.36, 1] as const,
};

export function VibeHeroSection() {
  const [copied, setCopied] = useState(false);
  const [imageError, setImageError] = useState(false);

  const copyCommand = () => {
    navigator.clipboard.writeText("npx venu-k");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="hero"
      className="relative pt-36 pb-20 md:pt-44 md:pb-28 overflow-hidden scroll-mt-28"
    >
      {/* Soft Ambient Floating Pastel Gradient Blobs */}
      <div className="absolute top-12 left-8 w-72 h-72 rounded-full bg-[#ECFCCB]/60 blur-3xl pointer-events-none -z-10 animate-pulse" />
      <div className="absolute top-36 right-10 w-80 h-80 rounded-full bg-[#FFF1F2]/70 blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-1/3 w-96 h-96 rounded-full bg-[#EDE9FE]/50 blur-3xl pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Playful Quirky Sticker Cluster Banner */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={slowSpring}
          className="flex flex-wrap items-center gap-3 pb-8 mb-8 border-b-2 border-black/10"
        >
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#bef264] text-black text-xs font-mono font-bold border-2 border-black shadow-[2px_2px_0px_#000] -rotate-2 hover:rotate-0 transition-transform">
            <Sparkles className="w-3.5 h-3.5" />
            // vibe-coding ☕
          </span>
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#d8b4fe] text-black text-xs font-mono font-bold border-2 border-black shadow-[2px_2px_0px_#000] rotate-2 hover:rotate-0 transition-transform">
            backend &amp; ai 🚀
          </span>
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#fda4af] text-black text-xs font-mono font-bold border-2 border-black shadow-[2px_2px_0px_#000] -rotate-1 hover:rotate-0 transition-transform">
            shipped with team 🤝
          </span>
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#fde047] text-black text-xs font-mono font-bold border-2 border-black shadow-[2px_2px_0px_#000] rotate-1 hover:rotate-0 transition-transform">
            no-drama infra 🧘
          </span>
          <span className="ml-auto text-xs font-mono text-zinc-500 font-medium">
            Tirupati, AP · India
          </span>
        </motion.div>

        {/* Main Hero Spread: Expressive Headline & Polaroid-Style Headshot */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Column: Bold Expressive Headline & Narrative */}
          <div className="lg:col-span-8 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...slowSpring, delay: 0.1 }}
              className="space-y-3"
            >
              <div className="inline-block px-3 py-1 rounded-md bg-[#bef264] border-2 border-black shadow-[2px_2px_0px_#000] text-xs font-mono font-black uppercase text-black">
                Backend Developer — Python, DevOps &amp; AI
              </div>

              <h1 className="text-6xl sm:text-8xl lg:text-9xl font-black tracking-tight text-black uppercase leading-[0.88]">
                VENU <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500">K</span>
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...slowSpring, delay: 0.2 }}
              className="text-lg sm:text-xl text-zinc-700 font-normal leading-relaxed max-w-2xl"
            >
              Hey there! I build high-throughput Python backends, untangle async event pipelines, and deploy
              resilient Kubernetes &amp; GCP cloud infrastructure alongside engineering teams. Fast shipping,
              zero-panic deployments, and reliable systems that just work.
            </motion.p>

            {/* Action Bar: Terminal Sticker & Let's Build CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...slowSpring, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <button
                onClick={copyCommand}
                className="inline-flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-[#FFF] text-black border-2 border-black shadow-[3px_3px_0px_#000] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[5px_5px_0px_#000] font-mono text-xs font-bold transition-all cursor-pointer"
                title="Copy terminal command"
              >
                <Terminal className="w-4 h-4 text-emerald-600" />
                <span>npx venu-k</span>
                <span className="text-zinc-400">|</span>
                {copied ? (
                  <span className="text-emerald-600 flex items-center gap-1 font-bold">
                    <Check className="w-3.5 h-3.5" /> Copied!
                  </span>
                ) : (
                  <span className="text-zinc-500 hover:text-black flex items-center gap-1">
                    <Copy className="w-3.5 h-3.5" /> click to copy
                  </span>
                )}
              </button>

              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#fda4af] text-black font-bold text-xs border-2 border-black shadow-[3px_3px_0px_#000] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[5px_5px_0px_#000] transition-all cursor-pointer"
              >
                <span>Explore Shipped Systems</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-1.5 px-5 py-3 rounded-2xl bg-[#d8b4fe] text-black font-bold text-xs border-2 border-black shadow-[3px_3px_0px_#000] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[5px_5px_0px_#000] transition-all cursor-pointer"
              >
                <span>Let&apos;s Chat</span>
                <Coffee className="w-3.5 h-3.5" />
              </a>
            </motion.div>
          </div>

          {/* Right Column: Studio Polaroid / Sticker Headshot */}
          <div className="lg:col-span-4 flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: 5 }}
              animate={{ opacity: 1, scale: 1, rotate: 2 }}
              transition={{ ...slowSpring, delay: 0.25 }}
              whileHover={{ rotate: 0, scale: 1.02 }}
              className="relative p-4 pb-12 rounded-3xl bg-white border-2 border-black shadow-[8px_8px_0px_#000] max-w-[310px] w-full"
            >
              {/* Yellow Washi-Tape Sticker */}
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded bg-[#fde047] text-black font-mono text-[10px] font-black border-2 border-black shadow-[2px_2px_0px_#000] rotate-[-2deg] z-20">
                📌 IN THE ZONE
              </div>

              {/* Photo Area */}
              <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden border-2 border-black bg-zinc-100">
                {!imageError ? (
                  <Image
                    src={profileData.photoUrl}
                    alt={profileData.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 300px"
                    className="object-cover"
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <div className="h-full w-full flex flex-col items-center justify-center p-6 text-center space-y-2 bg-[#fef08a]">
                    <Terminal className="w-8 h-8 text-black" />
                    <div className="font-mono text-sm font-black text-black uppercase">VENU K</div>
                    <div className="font-mono text-xs text-zinc-700">Backend Developer</div>
                  </div>
                )}
              </div>

              {/* Polaroid Bottom Note */}
              <div className="mt-3 px-1 flex items-center justify-between font-mono text-[11px] text-zinc-700">
                <span className="font-bold flex items-center gap-1 text-black">
                  <Heart className="w-3.5 h-3.5 text-pink-500 fill-pink-500" /> Venu K
                </span>
                <span className="px-2 py-0.5 rounded-full bg-[#bef264] border border-black font-bold text-[10px]">
                  3.6+ YRS PROD
                </span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* 4 Chunky Tactile Stat Stickers */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...slowSpring, delay: 0.4 }}
          className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-4"
        >
          <div className="p-5 rounded-2xl bg-[#d9f99d] border-2 border-black shadow-[4px_4px_0px_#000] space-y-1 hover:translate-x-[-2px] hover:translate-y-[-2px] transition-transform">
            <div className="font-mono text-[11px] uppercase font-bold text-zinc-800">PRODUCTION SLA</div>
            <div className="text-2xl sm:text-3xl font-black text-black tracking-tight">99.98%</div>
            <div className="text-xs text-zinc-800 font-medium">Uptime Across Microservices</div>
          </div>

          <div className="p-5 rounded-2xl bg-[#fecdd3] border-2 border-black shadow-[4px_4px_0px_#000] space-y-1 hover:translate-x-[-2px] hover:translate-y-[-2px] transition-transform">
            <div className="font-mono text-[11px] uppercase font-bold text-zinc-800">CLOUD FINOPS</div>
            <div className="text-2xl sm:text-3xl font-black text-black tracking-tight">20–25%</div>
            <div className="text-xs text-zinc-800 font-medium">Monthly Spend Reduced</div>
          </div>

          <div className="p-5 rounded-2xl bg-[#bae6fd] border-2 border-black shadow-[4px_4px_0px_#000] space-y-1 hover:translate-x-[-2px] hover:translate-y-[-2px] transition-transform">
            <div className="font-mono text-[11px] uppercase font-bold text-zinc-800">CONTAINER FLEET</div>
            <div className="text-2xl sm:text-3xl font-black text-black tracking-tight">20+ Services</div>
            <div className="text-xs text-zinc-800 font-medium">Kubernetes &amp; Cloud Run</div>
          </div>

          <div className="p-5 rounded-2xl bg-[#e9d5ff] border-2 border-black shadow-[4px_4px_0px_#000] space-y-1 hover:translate-x-[-2px] hover:translate-y-[-2px] transition-transform">
            <div className="font-mono text-[11px] uppercase font-bold text-zinc-800">INCIDENT MTTR</div>
            <div className="text-2xl sm:text-3xl font-black text-black tracking-tight">35% Faster</div>
            <div className="text-xs text-zinc-800 font-medium">Prometheus &amp; Argo Alerts</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
