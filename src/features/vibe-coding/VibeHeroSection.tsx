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

const studioMoods = [
  { status: "99.98% PROD UPTIME", note: "zero unhandled outages across distributed services", color: "#C6FF00", text: "#0A0A0A", icon: "⚡" },
  { status: "REDIS SLIDING LOCKS", note: "cryptographic loop guard dropping echo cascades", color: "#FFFFFF", text: "#0A0A0A", icon: "🛡️" },
  { status: "GITOPS PIPELINE STABLE", note: "ArgoCD & Kubernetes fleet synced to main", color: "#2563EB", text: "#FFFFFF", icon: "🚀" },
  { status: "ASYNC EVENT INGRESS OK", note: "FastAPI microservices processing webhooks < 10ms", color: "#FF4D00", text: "#FFFFFF", icon: "🔥" },
  { status: "ZERO DRIFT K8S CLUSTER", note: "all container pods passing health probes", color: "#FDE047", text: "#0A0A0A", icon: "🐳" },
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
        colors: ["#C6FF00", "#FF4D00", "#2563EB", "#FDE047", "#0A0A0A"],
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
      {/* High-Contrast Ambient Accent Blooms */}
      <div className="absolute top-12 left-8 w-72 h-72 rounded-full bg-[#C6FF00]/20 blur-3xl pointer-events-none -z-10 animate-pulse" />
      <div className="absolute top-36 right-10 w-80 h-80 rounded-full bg-[#FF4D00]/15 blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-1/3 w-96 h-96 rounded-full bg-[#2563EB]/15 blur-3xl pointer-events-none -z-10" />

      {/* Floating Streetwear Icons Drifting in Slow Motion */}
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
        🛠️
      </motion.button>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Streetwear Builder Sticker Cluster Banner */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={slowSpring}
          className="flex flex-wrap items-center gap-3 pb-8 mb-8 border-b-2 border-[#0A0A0A]/10"
        >
          <motion.button
            type="button"
            onClick={(e) => fireConfetti(e)}
            animate={{ y: [0, -4, 0], rotate: [-2, 1, -2] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            whileHover={{ scale: 1.08, rotate: 0 }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#C6FF00] text-[#0A0A0A] text-xs font-mono font-black border-2 border-[#0A0A0A] shadow-[2px_2px_0px_#0A0A0A] cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#0A0A0A] animate-spin" />
            // STUDIO MODE ⚡
          </motion.button>

          <motion.button
            type="button"
            onClick={(e) => fireConfetti(e)}
            animate={{ y: [0, 4, 0], rotate: [2, -1, 2] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            whileHover={{ scale: 1.08, rotate: 0 }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#FFFFFF] text-[#0A0A0A] text-xs font-mono font-black border-2 border-[#0A0A0A] shadow-[2px_2px_0px_#0A0A0A] cursor-pointer"
          >
            BACKEND ARCHITECT 🏗️
          </motion.button>

          <motion.button
            type="button"
            onClick={(e) => fireConfetti(e)}
            animate={{ y: [0, -3, 0], rotate: [-1, 2, -1] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            whileHover={{ scale: 1.08, rotate: 0 }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#2563EB] text-white text-xs font-mono font-black border-2 border-[#0A0A0A] shadow-[2px_2px_0px_#0A0A0A] cursor-pointer"
          >
            PYTHON • REDIS • K8S ⚡
          </motion.button>

          <motion.button
            type="button"
            onClick={(e) => fireConfetti(e)}
            animate={{ y: [0, 3, 0], rotate: [1, -2, 1] }}
            transition={{ duration: 6.2, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
            whileHover={{ scale: 1.08, rotate: 0 }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#FDE047] text-[#0A0A0A] text-xs font-mono font-black border-2 border-[#0A0A0A] shadow-[2px_2px_0px_#0A0A0A] cursor-pointer"
          >
            NO CAP 99.98% SLA 🧢❌
          </motion.button>

          <motion.button
            type="button"
            onClick={(e) => fireConfetti(e)}
            animate={{ y: [0, -4, 0], rotate: [-2, 2, -2] }}
            transition={{ duration: 5.8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            whileHover={{ scale: 1.08, rotate: 0 }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#FF4D00] text-white text-xs font-mono font-black border-2 border-[#0A0A0A] shadow-[2px_2px_0px_#0A0A0A] cursor-pointer"
          >
            BUILT WITH TEAM 🤝
          </motion.button>

          <span className="ml-auto text-xs font-mono text-zinc-700 font-bold">
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
              <div className="inline-block px-3 py-1 rounded-md bg-[#C6FF00] border-2 border-[#0A0A0A] shadow-[2px_2px_0px_#0A0A0A] text-xs font-mono font-black uppercase text-[#0A0A0A]">
                Backend Developer — Python, DevOps &amp; AI
              </div>

              <h1 className="text-6xl sm:text-8xl lg:text-9xl font-black tracking-tight text-[#0A0A0A] uppercase leading-[0.88]">
                VENU <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563EB] via-[#FF4D00] to-[#C6FF00]">K</span>
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...slowSpring, delay: 0.2 }}
              className="text-lg sm:text-xl text-zinc-800 font-medium leading-relaxed max-w-2xl"
            >
              Hey there! I build high-throughput Python backends, untangle async event pipelines, and deploy
              resilient Kubernetes &amp; GCP cloud infrastructure alongside engineering teams. Fast shipping,
              zero-panic deployments, and reliable systems that just work.
            </motion.p>

            {/* Interactive Studio Moods / Live Status Cycler */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...slowSpring, delay: 0.25 }}
              onClick={(e) => {
                setMoodIdx((prev) => (prev + 1) % studioMoods.length);
                fireConfetti(e);
              }}
              whileHover={{ scale: 1.02, rotate: -0.5, transition: { type: "spring", stiffness: 350, damping: 18 } }}
              whileTap={{ scale: 0.97 }}
              className="p-3.5 sm:p-4 rounded-2xl border-2 border-[#0A0A0A] shadow-[4px_4px_0px_#0A0A0A] cursor-pointer flex flex-wrap items-center justify-between gap-3 transition-all select-none"
              style={{
                backgroundColor: studioMoods[moodIdx].color,
                color: studioMoods[moodIdx].text,
              }}
              title="Click to cycle Studio status!"
            >
              <div className="flex items-center gap-3">
                <span className="text-xl sm:text-2xl">{studioMoods[moodIdx].icon}</span>
                <div>
                  <div className="font-mono text-xs sm:text-sm font-black tracking-tight">
                    STUDIO STATUS: {studioMoods[moodIdx].status}
                  </div>
                  <div className="text-xs font-mono font-bold opacity-90">
                    // {studioMoods[moodIdx].note}
                  </div>
                </div>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border-2 border-[#0A0A0A] font-mono text-[10px] font-black text-[#0A0A0A] shadow-[2px_2px_0px_#0A0A0A]">
                <span>CYCLE STATUS 🎲</span>
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
                className="inline-flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-[#FFF] text-[#0A0A0A] border-2 border-[#0A0A0A] shadow-[3px_3px_0px_#0A0A0A] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[5px_5px_0px_#0A0A0A] font-mono text-xs font-black transition-all cursor-pointer"
                title="Copy terminal command"
              >
                <Terminal className="w-4 h-4 text-emerald-600" />
                <span>npx venu-k</span>
                <span className="text-zinc-400">|</span>
                {copied ? (
                  <span className="text-emerald-600 flex items-center gap-1 font-black">
                    <Check className="w-3.5 h-3.5" /> Copied!
                  </span>
                ) : (
                  <span className="text-zinc-600 hover:text-black flex items-center gap-1 font-bold">
                    <Copy className="w-3.5 h-3.5" /> click to copy
                  </span>
                )}
              </button>

              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#FF4D00] text-white font-black text-xs border-2 border-[#0A0A0A] shadow-[3px_3px_0px_#0A0A0A] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[5px_5px_0px_#0A0A0A] transition-all cursor-pointer"
              >
                <span>Explore Shipped Systems</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-1.5 px-5 py-3 rounded-2xl bg-[#C6FF00] text-[#0A0A0A] font-black text-xs border-2 border-[#0A0A0A] shadow-[3px_3px_0px_#0A0A0A] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[5px_5px_0px_#0A0A0A] transition-all cursor-pointer"
              >
                <span>Let&apos;s Chat</span>
                <Coffee className="w-3.5 h-3.5" />
              </a>
            </motion.div>
          </div>

          {/* Right Column: Technical Studio Pass Card */}
          <div className="lg:col-span-4 flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: 3 }}
              animate={{ opacity: 1, scale: 1, rotate: 1.5 }}
              transition={{ ...slowSpring, delay: 0.25 }}
              whileHover={{ rotate: -1, scale: 1.03, transition: { type: "spring", stiffness: 300, damping: 15 } }}
              whileTap={{ scale: 0.97 }}
              onClick={(e) => fireConfetti(e)}
              className="relative p-4 pb-5 rounded-3xl bg-white border-2 border-[#0A0A0A] shadow-[8px_8px_0px_#0A0A0A] max-w-[320px] w-full cursor-pointer select-none"
              title="Click Studio Pass for vibes!"
            >
              {/* Top Studio Lanyard Clip Pill */}
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded bg-[#0A0A0A] text-[#C6FF00] font-mono text-[10px] font-black border-2 border-[#0A0A0A] shadow-[2px_2px_0px_#C6FF00] rotate-[-1deg] z-20 whitespace-nowrap">
                STUDIO PASS // PROD-ENV ⚡
              </div>

              {/* Pass Header Row */}
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#0A0A0A]/15 font-mono text-[11px] font-bold text-zinc-800">
                <span>ID: VENU-K // 0x2A</span>
                <span className="px-2 py-0.5 rounded-full bg-[#C6FF00] text-[#0A0A0A] border border-[#0A0A0A] text-[10px] font-black">
                  STATUS: IN PROD ⚡
                </span>
              </div>

              {/* Photo Area with Technical Frame */}
              <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden border-2 border-[#0A0A0A] bg-zinc-100">
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
                  <div className="h-full w-full flex flex-col items-center justify-center p-6 text-center space-y-2 bg-[#FDE047]">
                    <Terminal className="w-8 h-8 text-[#0A0A0A]" />
                    <div className="font-mono text-sm font-black text-[#0A0A0A] uppercase">VENU K</div>
                    <div className="font-mono text-xs text-zinc-800 font-bold">Backend Developer</div>
                  </div>
                )}

                {/* Technical HUD Crosshair Overlay */}
                <div className="absolute top-2 left-2 font-mono text-[9px] font-black text-white/90 bg-[#0A0A0A]/60 px-1.5 py-0.5 rounded backdrop-blur-sm">
                  + 13.6288° N
                </div>
                <div className="absolute bottom-2 right-2 font-mono text-[9px] font-black text-white/90 bg-[#0A0A0A]/60 px-1.5 py-0.5 rounded backdrop-blur-sm">
                  79.4192° E +
                </div>
              </div>

              {/* Technical Matrix Strip & Spec Strip */}
              <div className="mt-3.5 space-y-2">
                <div className="flex items-center justify-between font-mono text-[11px] text-[#0A0A0A]">
                  <span className="font-black uppercase tracking-tight">VENU K // BACKEND DEV</span>
                  <span className="px-2 py-0.5 rounded bg-[#0A0A0A] text-[#C6FF00] font-black text-[10px]">
                    3.6+ YRS PROD
                  </span>
                </div>

                {/* Technical Barcode Line Representation */}
                <div className="pt-1 border-t border-[#0A0A0A]/10 flex items-center justify-between font-mono text-[10px] text-zinc-600 font-bold">
                  <div className="flex gap-1 h-3 items-end">
                    {[3, 8, 2, 6, 12, 4, 9, 3, 7, 2, 10, 5, 8, 3, 11, 4, 7].map((h, idx) => (
                      <span key={idx} className="w-[2px] bg-[#0A0A0A]" style={{ height: `${h}px` }} />
                    ))}
                  </div>
                  <span className="tracking-widest">SYS_PROD_OK</span>
                </div>
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
            className="p-5 rounded-2xl bg-[#C6FF00] border-2 border-[#0A0A0A] shadow-[4px_4px_0px_#0A0A0A] space-y-1 transition-all cursor-pointer select-none"
          >
            <div className="font-mono text-[11px] uppercase font-black text-[#0A0A0A]">PRODUCTION SLA</div>
            <div className="text-2xl sm:text-3xl font-black text-[#0A0A0A] tracking-tight">99.98%</div>
            <div className="text-xs text-zinc-900 font-bold">Uptime Across Microservices ✨</div>
          </motion.div>

          <motion.div
            onClick={(e) => fireConfetti(e)}
            whileHover={{ scale: 1.05, rotate: 1.5 }}
            whileTap={{ scale: 0.96 }}
            className="p-5 rounded-2xl bg-[#FFFFFF] border-2 border-[#0A0A0A] shadow-[4px_4px_0px_#0A0A0A] space-y-1 transition-all cursor-pointer select-none"
          >
            <div className="font-mono text-[11px] uppercase font-black text-[#FF4D00]">CLOUD FINOPS</div>
            <div className="text-2xl sm:text-3xl font-black text-[#0A0A0A] tracking-tight">20–25%</div>
            <div className="text-xs text-zinc-800 font-bold">Monthly Spend Reduced 💰</div>
          </motion.div>

          <motion.div
            onClick={(e) => fireConfetti(e)}
            whileHover={{ scale: 1.05, rotate: -1.5 }}
            whileTap={{ scale: 0.96 }}
            className="p-5 rounded-2xl bg-[#2563EB] text-white border-2 border-[#0A0A0A] shadow-[4px_4px_0px_#0A0A0A] space-y-1 transition-all cursor-pointer select-none"
          >
            <div className="font-mono text-[11px] uppercase font-black text-[#C6FF00]">CONTAINER FLEET</div>
            <div className="text-2xl sm:text-3xl font-black text-white tracking-tight">20+ Services</div>
            <div className="text-xs text-white/90 font-bold">Kubernetes &amp; Cloud Run 🐳</div>
          </motion.div>

          <motion.div
            onClick={(e) => fireConfetti(e)}
            whileHover={{ scale: 1.05, rotate: 1.5 }}
            whileTap={{ scale: 0.96 }}
            className="p-5 rounded-2xl bg-[#FDE047] border-2 border-[#0A0A0A] shadow-[4px_4px_0px_#0A0A0A] space-y-1 transition-all cursor-pointer select-none"
          >
            <div className="font-mono text-[11px] uppercase font-black text-[#0A0A0A]">INCIDENT MTTR</div>
            <div className="text-2xl sm:text-3xl font-black text-[#0A0A0A] tracking-tight">35% Faster</div>
            <div className="text-xs text-zinc-900 font-bold">Prometheus &amp; Argo Alerts ⚡</div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
