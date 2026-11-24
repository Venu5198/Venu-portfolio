"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { Terminal, Copy, Check, ArrowRight, Sparkles, Coffee, Heart, Zap } from "lucide-react";
import { profileData } from "@/shared/data/profile";

const slowSpring = {
  duration: 1.1,
  ease: [0.22, 1, 0.36, 1] as const,
};

const chaosMoods = [
  { status: "99.98% PROD UPTIME", note: "no cap, zero unhandled outages sustained", color: "#bef264", icon: "🟢" },
  { status: "REDIS LOCKS HOLDING STRONG", note: "sliding window loop guard dropping echoes", color: "#fde047", icon: "🛡️" },
  { status: "PR APPROVED, DON'T TOUCH IT", note: "it runs on my machine and in staging", color: "#d8b4fe", icon: "🚀" },
  { status: "0 SLEEP, PURE CAFFEINE", note: "let him cook the event microservices", color: "#fda4af", icon: "☕" },
  { status: "ALL PODS HEALTHY (MIRACULOUSLY)", note: "kubernetes fleet at absolute peace", color: "#bae6fd", icon: "🐳" },
  { status: "CHAOS LEVEL: MAXIMUM OVERDRIVE", note: "main character backend engineering energy", color: "#bef264", icon: "⚡" },
];

export function VibeHeroSection() {
  const [copied, setCopied] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [moodIdx, setMoodIdx] = useState(0);

  const fireConfetti = (e?: React.MouseEvent) => {
    try {
      confetti({
        particleCount: 45,
        spread: 65,
        origin: e
          ? { x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight }
          : { y: 0.6 },
        colors: ["#bef264", "#fda4af", "#d8b4fe", "#bae6fd", "#fde047"],
      });
    } catch {
      // fallback safe
    }
  };

  const copyCommand = (e: React.MouseEvent) => {
    navigator.clipboard.writeText("npx venu-k");
    setCopied(true);
    fireConfetti(e);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="hero"
      className="relative pt-36 pb-20 md:pt-44 md:pb-28 overflow-hidden scroll-mt-36"
    >
      {/* Soft Ambient Floating Pastel Gradient Blobs */}
      <div className="absolute top-12 left-8 w-72 h-72 rounded-full bg-[#ECFCCB]/60 blur-3xl pointer-events-none -z-10 animate-pulse" />
      <div className="absolute top-36 right-10 w-80 h-80 rounded-full bg-[#FFF1F2]/70 blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-1/3 w-96 h-96 rounded-full bg-[#EDE9FE]/50 blur-3xl pointer-events-none -z-10" />

      {/* Floating Emojis Drifting in Slow Motion */}
      <motion.button
        type="button"
        onClick={(e) => fireConfetti(e)}
        animate={{ y: [0, -14, 0], rotate: [-8, 8, -8] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-24 left-[8%] text-3xl select-none cursor-pointer filter drop-shadow hover:scale-125 transition-transform hidden sm:block"
        title="Click for vibes!"
      >
        🚀
      </motion.button>

      <motion.button
        type="button"
        onClick={(e) => fireConfetti(e)}
        animate={{ y: [0, 16, 0], rotate: [6, -6, 6] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-32 right-[12%] text-3xl select-none cursor-pointer filter drop-shadow hover:scale-125 transition-transform hidden sm:block"
        title="Click for vibes!"
      >
        ⚡
      </motion.button>

      <motion.button
        type="button"
        onClick={(e) => fireConfetti(e)}
        animate={{ y: [0, -12, 0], x: [0, 8, 0], rotate: [-5, 5, -5] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-16 left-[5%] text-3xl select-none cursor-pointer filter drop-shadow hover:scale-125 transition-transform hidden md:block"
        title="Click for vibes!"
      >
        🐳
      </motion.button>

      <motion.button
        type="button"
        onClick={(e) => fireConfetti(e)}
        animate={{ y: [0, -18, 0], rotate: [10, -10, 10] }}
        transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="absolute bottom-28 right-[6%] text-3xl select-none cursor-pointer filter drop-shadow hover:scale-125 transition-transform hidden md:block"
        title="Click for vibes!"
      >
        💅
      </motion.button>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Playful Quirky Sticker Cluster Banner */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={slowSpring}
          className="flex flex-wrap items-center gap-3 pb-8 mb-8 border-b-2 border-black/10"
        >
          <motion.button
            type="button"
            onClick={(e) => fireConfetti(e)}
            animate={{ y: [0, -4, 0], rotate: [-2, 1, -2] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            whileHover={{ scale: 1.08, rotate: 0 }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#bef264] text-black text-xs font-mono font-bold border-2 border-black shadow-[2px_2px_0px_#000] cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-black animate-spin" />
            // CHAOS MODE ⚡
          </motion.button>

          <motion.button
            type="button"
            onClick={(e) => fireConfetti(e)}
            animate={{ y: [0, 4, 0], rotate: [2, -1, 2] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            whileHover={{ scale: 1.08, rotate: 0 }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#fde047] text-black text-xs font-mono font-bold border-2 border-black shadow-[2px_2px_0px_#000] cursor-pointer"
          >
            delulu-free infra 🧘
          </motion.button>

          <motion.button
            type="button"
            onClick={(e) => fireConfetti(e)}
            animate={{ y: [0, -3, 0], rotate: [-1, 2, -1] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            whileHover={{ scale: 1.08, rotate: 0 }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#d8b4fe] text-black text-xs font-mono font-bold border-2 border-black shadow-[2px_2px_0px_#000] cursor-pointer"
          >
            chronically online backend 🌐
          </motion.button>

          <motion.button
            type="button"
            onClick={(e) => fireConfetti(e)}
            animate={{ y: [0, 3, 0], rotate: [1, -2, 1] }}
            transition={{ duration: 6.2, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
            whileHover={{ scale: 1.08, rotate: 0 }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#bae6fd] text-black text-xs font-mono font-bold border-2 border-black shadow-[2px_2px_0px_#000] cursor-pointer"
          >
            no cap 99.98% SLA 🧢❌
          </motion.button>

          <motion.button
            type="button"
            onClick={(e) => fireConfetti(e)}
            animate={{ y: [0, -4, 0], rotate: [-2, 2, -2] }}
            transition={{ duration: 5.8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            whileHover={{ scale: 1.08, rotate: 0 }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#fda4af] text-black text-xs font-mono font-bold border-2 border-black shadow-[2px_2px_0px_#000] cursor-pointer"
          >
            let him cook (in prod) 🍳
          </motion.button>

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

            {/* Interactive Chaos Meter / Live Status Mood Toggle */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...slowSpring, delay: 0.25 }}
              onClick={(e) => {
                setMoodIdx((prev) => (prev + 1) % chaosMoods.length);
                fireConfetti(e);
              }}
              whileHover={{ scale: 1.02, rotate: -0.5, transition: { type: "spring", stiffness: 350, damping: 18 } }}
              whileTap={{ scale: 0.97 }}
              className="p-3.5 sm:p-4 rounded-2xl border-2 border-black shadow-[4px_4px_0px_#000] cursor-pointer flex flex-wrap items-center justify-between gap-3 transition-all select-none"
              style={{ backgroundColor: chaosMoods[moodIdx].color }}
              title="Click to cycle Chaos Meter status!"
            >
              <div className="flex items-center gap-3">
                <span className="text-xl sm:text-2xl">{chaosMoods[moodIdx].icon}</span>
                <div>
                  <div className="font-mono text-xs sm:text-sm font-black text-black tracking-tight">
                    CHAOS METER: {chaosMoods[moodIdx].status}
                  </div>
                  <div className="text-xs text-zinc-900 font-medium">
                    // {chaosMoods[moodIdx].note}
                  </div>
                </div>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border-2 border-black font-mono text-[10px] font-black text-black shadow-[2px_2px_0px_#000]">
                <span>CYCLE MOOD 🎲</span>
              </div>
            </motion.div>

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
              whileHover={{ rotate: -1.5, scale: 1.04, transition: { type: "spring", stiffness: 300, damping: 15 } }}
              whileTap={{ scale: 0.97 }}
              onClick={(e) => fireConfetti(e)}
              className="relative p-4 pb-12 rounded-3xl bg-white border-2 border-black shadow-[8px_8px_0px_#000] max-w-[310px] w-full cursor-pointer select-none"
              title="Click photo for vibes!"
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
          <motion.div
            onClick={(e) => fireConfetti(e)}
            whileHover={{ scale: 1.05, rotate: -1.5 }}
            whileTap={{ scale: 0.96 }}
            className="p-5 rounded-2xl bg-[#d9f99d] border-2 border-black shadow-[4px_4px_0px_#000] space-y-1 transition-all cursor-pointer"
          >
            <div className="font-mono text-[11px] uppercase font-bold text-zinc-800">PRODUCTION SLA</div>
            <div className="text-2xl sm:text-3xl font-black text-black tracking-tight">99.98%</div>
            <div className="text-xs text-zinc-800 font-medium">Uptime Across Microservices ✨</div>
          </motion.div>

          <motion.div
            onClick={(e) => fireConfetti(e)}
            whileHover={{ scale: 1.05, rotate: 1.5 }}
            whileTap={{ scale: 0.96 }}
            className="p-5 rounded-2xl bg-[#fecdd3] border-2 border-black shadow-[4px_4px_0px_#000] space-y-1 transition-all cursor-pointer"
          >
            <div className="font-mono text-[11px] uppercase font-bold text-zinc-800">CLOUD FINOPS</div>
            <div className="text-2xl sm:text-3xl font-black text-black tracking-tight">20–25%</div>
            <div className="text-xs text-zinc-800 font-medium">Monthly Spend Reduced 💰</div>
          </motion.div>

          <motion.div
            onClick={(e) => fireConfetti(e)}
            whileHover={{ scale: 1.05, rotate: -1.5 }}
            whileTap={{ scale: 0.96 }}
            className="p-5 rounded-2xl bg-[#bae6fd] border-2 border-black shadow-[4px_4px_0px_#000] space-y-1 transition-all cursor-pointer"
          >
            <div className="font-mono text-[11px] uppercase font-bold text-zinc-800">CONTAINER FLEET</div>
            <div className="text-2xl sm:text-3xl font-black text-black tracking-tight">20+ Services</div>
            <div className="text-xs text-zinc-800 font-medium">Kubernetes &amp; Cloud Run 🐳</div>
          </motion.div>

          <motion.div
            onClick={(e) => fireConfetti(e)}
            whileHover={{ scale: 1.05, rotate: 1.5 }}
            whileTap={{ scale: 0.96 }}
            className="p-5 rounded-2xl bg-[#e9d5ff] border-2 border-black shadow-[4px_4px_0px_#000] space-y-1 transition-all cursor-pointer"
          >
            <div className="font-mono text-[11px] uppercase font-bold text-zinc-800">INCIDENT MTTR</div>
            <div className="text-2xl sm:text-3xl font-black text-black tracking-tight">35% Faster</div>
            <div className="text-xs text-zinc-800 font-medium">Prometheus &amp; Argo Alerts ⚡</div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
