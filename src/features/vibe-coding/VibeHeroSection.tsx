"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import confetti from "canvas-confetti";
import { Terminal, Copy, Check, ArrowRight, Sparkles, Coffee, Heart, Zap } from "lucide-react";
import { profileData } from "@/shared/data/profile";
import { ComicBurst, ComicBurstItem } from "./ComicBurst";
import { ShaderGradientCanvas } from "@/shared/components/webgl/ShaderGradientCanvas";
import { LiquidLogo } from "@/shared/components/webgl/LiquidLogo";
import { LiquidGlassPill } from "@/shared/components/ui/LiquidGlassPill";

// Spider-Verse "Animating on Twos" Stepped Spring Physics
const steppedSpring = {
  type: "spring" as const,
  stiffness: 500,
  damping: 24,
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
  const [imageSrc, setImageSrc] = useState("/images/venu-studio.jpg");
  const [imageError, setImageError] = useState(false);
  const [moodIdx, setMoodIdx] = useState(0);
  const [bursts, setBursts] = useState<ComicBurstItem[]>([]);

  // Scroll-Linked Parallax Physics
  const { scrollY } = useScroll();
  const bgParallaxY = useTransform(scrollY, [0, 800], [0, 140]);
  const floatParallaxY = useTransform(scrollY, [0, 800], [0, -90]);

  const triggerBurst = (text: string, e?: React.MouseEvent, color = "#FDE047") => {
    const id = Date.now() + Math.random();
    const newBurst: ComicBurstItem = {
      id,
      text,
      x: e ? e.clientX : typeof window !== "undefined" ? window.innerWidth * 0.5 : 500,
      y: e ? e.clientY : typeof window !== "undefined" ? window.innerHeight * 0.4 : 300,
      color,
      rotate: Math.floor(Math.random() * 18) - 9,
    };
    setBursts((prev) => [...prev, newBurst]);
    setTimeout(() => {
      setBursts((prev) => prev.filter((b) => b.id !== id));
    }, 950);
  };

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
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
        navigator.clipboard.writeText("npx venu-k").catch(() => {});
      }
    } catch {}
    setCopied(true);
    fireConfetti(e);
    triggerBurst("*COPIED!*", e, "#C6FF00");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="hero"
      className="relative pt-36 pb-20 md:pt-44 md:pb-28 overflow-hidden scroll-mt-36"
    >
      {/* Onomatopoeia Comic Burst Layer */}
      <ComicBurst bursts={bursts} />

      {/* Animated WebGL ShaderGradient Fluid Backdrop (ruucm/shadergradient inspired) */}
      <ShaderGradientCanvas theme="light" opacity={0.36} speed={0.85} />

      {/* Spider-Verse Parallax Halftone Print & Crosshatch Layers */}
      <motion.div
        style={{ y: bgParallaxY }}
        className="absolute inset-0 spider-halftone opacity-35 pointer-events-none -z-10"
      />
      <div className="absolute top-20 right-0 w-80 h-80 spider-crosshatch opacity-30 pointer-events-none -z-10" />

      {/* High-Contrast Ambient Accent Blooms */}
      <div className="absolute top-12 left-8 w-72 h-72 rounded-full bg-[#C6FF00]/25 blur-3xl pointer-events-none -z-10 animate-pulse" />
      <div className="absolute top-36 right-10 w-80 h-80 rounded-full bg-[#FF4D00]/20 blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-1/3 w-96 h-96 rounded-full bg-[#00F0FF]/20 blur-3xl pointer-events-none -z-10" />

      {/* Floating Streetwear Icons Drifting with Stepped Parallax */}
      <motion.button
        type="button"
        style={{ y: floatParallaxY }}
        onClick={(e) => {
          fireConfetti(e);
          triggerBurst("*POW!*", e, "#00F0FF");
        }}
        whileHover={{ scale: 1.25, rotate: 12 }}
        whileTap={{ scale: 0.9 }}
        className="absolute top-24 left-[8%] text-3xl select-none cursor-pointer filter drop-shadow hover:scale-125 transition-transform hidden sm:block z-10"
        title="Click for vibes!"
      >
        🚀
      </motion.button>

      <motion.button
        type="button"
        style={{ y: floatParallaxY }}
        onClick={(e) => {
          fireConfetti(e);
          triggerBurst("*ZAP!*", e, "#FF0055");
        }}
        whileHover={{ scale: 1.25, rotate: -12 }}
        whileTap={{ scale: 0.9 }}
        className="absolute top-32 right-[12%] text-3xl select-none cursor-pointer filter drop-shadow hover:scale-125 transition-transform hidden sm:block z-10"
        title="Click for vibes!"
      >
        ⚡
      </motion.button>

      <motion.button
        type="button"
        onClick={(e) => {
          fireConfetti(e);
          triggerBurst("*DOCKER!*", e, "#00F0FF");
        }}
        whileHover={{ scale: 1.25, rotate: 10 }}
        whileTap={{ scale: 0.9 }}
        className="absolute bottom-16 left-[5%] text-3xl select-none cursor-pointer filter drop-shadow hover:scale-125 transition-transform hidden md:block z-10"
        title="Click for vibes!"
      >
        🐳
      </motion.button>

      <motion.button
        type="button"
        onClick={(e) => {
          fireConfetti(e);
          triggerBurst("*BUILD!*", e, "#FDE047");
        }}
        whileHover={{ scale: 1.25, rotate: -10 }}
        whileTap={{ scale: 0.9 }}
        className="absolute bottom-28 right-[6%] text-3xl select-none cursor-pointer filter drop-shadow hover:scale-125 transition-transform hidden md:block z-10"
        title="Click for vibes!"
      >
        🛠️
      </motion.button>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Streetwear Builder Sticker Cluster Banner */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={steppedSpring}
          className="flex flex-wrap items-center gap-2 sm:gap-3 pb-6 sm:pb-8 mb-6 sm:mb-8 border-b-[2.5px] border-[#0A0A0A]/20"
        >
          <motion.button
            type="button"
            onClick={(e) => {
              fireConfetti(e);
              triggerBurst("*STUDIO!*", e, "#C6FF00");
            }}
            animate={{ y: [0, -4, 0], rotate: [-2, 1, -2] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            whileHover={{ scale: 1.08, rotate: 0 }}
            className="inline-flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-[#C6FF00] text-[#0A0A0A] text-[11px] sm:text-xs font-mono font-black border-[2.5px] border-[#0A0A0A] shadow-[2.5px_2.5px_0px_#0A0A0A] sm:shadow-[3px_3px_0px_#0A0A0A] spider-rgb-hover cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#0A0A0A] animate-spin" />
            // STUDIO MODE ⚡
          </motion.button>

          <motion.button
            type="button"
            onClick={(e) => {
              fireConfetti(e);
              triggerBurst("*ARCHITECT!*", e, "#FFFFFF");
            }}
            animate={{ y: [0, 4, 0], rotate: [2, -1, 2] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            whileHover={{ scale: 1.08, rotate: 0 }}
            className="inline-flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-[#FFFFFF] text-[#0A0A0A] text-[11px] sm:text-xs font-mono font-black border-[2.5px] border-[#0A0A0A] shadow-[2.5px_2.5px_0px_#0A0A0A] sm:shadow-[3px_3px_0px_#0A0A0A] spider-rgb-hover cursor-pointer"
          >
            BACKEND ARCHITECT 🏗️
          </motion.button>

          <motion.button
            type="button"
            onClick={(e) => {
              fireConfetti(e);
              triggerBurst("*K8S FLEET!*", e, "#00F0FF");
            }}
            animate={{ y: [0, -3, 0], rotate: [-1, 2, -1] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            whileHover={{ scale: 1.08, rotate: 0 }}
            className="inline-flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-[#2563EB] text-white text-[11px] sm:text-xs font-mono font-black border-[2.5px] border-[#0A0A0A] shadow-[2.5px_2.5px_0px_#0A0A0A] sm:shadow-[3px_3px_0px_#0A0A0A] spider-rgb-hover cursor-pointer"
          >
            PYTHON • REDIS • K8S ⚡
          </motion.button>

          <motion.button
            type="button"
            onClick={(e) => {
              fireConfetti(e);
              triggerBurst("*99.98% SLA!*", e, "#FDE047");
            }}
            animate={{ y: [0, 3, 0], rotate: [1, -2, 1] }}
            transition={{ duration: 6.2, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
            whileHover={{ scale: 1.08, rotate: 0 }}
            className="inline-flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-[#FDE047] text-[#0A0A0A] text-[11px] sm:text-xs font-mono font-black border-[2.5px] border-[#0A0A0A] shadow-[2.5px_2.5px_0px_#0A0A0A] sm:shadow-[3px_3px_0px_#0A0A0A] spider-rgb-hover cursor-pointer"
          >
            NO CAP 99.98% SLA 🧢❌
          </motion.button>

          <motion.button
            type="button"
            onClick={(e) => {
              fireConfetti(e);
              triggerBurst("*BUILT WITH TEAM!*", e, "#FF0055");
            }}
            animate={{ y: [0, -4, 0], rotate: [-2, 2, -2] }}
            transition={{ duration: 5.8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            whileHover={{ scale: 1.08, rotate: 0 }}
            className="inline-flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-[#FF4D00] text-white text-[11px] sm:text-xs font-mono font-black border-[2.5px] border-[#0A0A0A] shadow-[2.5px_2.5px_0px_#0A0A0A] sm:shadow-[3px_3px_0px_#0A0A0A] spider-rgb-hover cursor-pointer"
          >
            BUILT WITH TEAM 🤝
          </motion.button>

          <span className="text-[11px] sm:text-xs font-mono text-zinc-800 font-bold sm:ml-auto w-full sm:w-auto text-left sm:text-right pt-1 sm:pt-0">
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
              transition={{ ...steppedSpring, delay: 0.1 }}
              className="space-y-3"
            >
              <div className="flex flex-wrap items-center gap-3">
                <LiquidGlassPill
                  theme="light"
                  className="px-3.5 py-1.5 rounded-xl text-xs font-mono font-black uppercase"
                >
                  Backend Developer — Python, DevOps &amp; AI
                </LiquidGlassPill>
                <div className="hidden sm:inline-flex items-center">
                  <LiquidLogo
                    text="VENU.K"
                    subtext="SYSTEMS ⚡"
                    theme="light"
                    fontSize={15}
                    className="w-28 h-8 rounded-xl border-2 border-[#0A0A0A] bg-white/70 shadow-[2px_2px_0px_#0A0A0A]"
                  />
                </div>
              </div>

              <h1 className="font-comic text-7xl sm:text-9xl lg:text-[10rem] font-black tracking-tight text-[#09090B] uppercase leading-[0.82] rotate-[-1.5deg] spider-rgb-headline select-none">
                VENU <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] via-[#FF0055] to-[#C6FF00]">K</span>
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...steppedSpring, delay: 0.2 }}
              className="text-lg sm:text-xl text-zinc-900 font-bold leading-relaxed max-w-2xl bg-white/80 p-3 rounded-2xl border-2 border-[#09090B] shadow-[3px_3px_0px_#09090B]"
            >
              Hey there! I build high-throughput Python backends, untangle async event pipelines, and deploy
              resilient Kubernetes &amp; GCP cloud infrastructure alongside engineering teams. Fast shipping,
              zero-panic deployments, and reliable systems that just work.
            </motion.p>

            {/* Interactive Studio Moods / Live Status Cycler */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...steppedSpring, delay: 0.25 }}
              data-cursor="SYNC!"
              onClick={(e) => {
                setMoodIdx((prev) => (prev + 1) % studioMoods.length);
                fireConfetti(e);
                triggerBurst("*STATUS SYNC!*", e, "#00F0FF");
              }}
              whileHover={{ scale: 1.02, rotate: -0.5, transition: { type: "spring", stiffness: 450, damping: 20 } }}
              whileTap={{ scale: 0.97 }}
              className="p-3.5 sm:p-4 rounded-2xl border-[3px] border-[#09090B] shadow-[5px_5px_0px_#09090B] spider-spring-btn cursor-pointer flex flex-wrap items-center justify-between gap-3 transition-all select-none"
              style={{
                backgroundColor: studioMoods[moodIdx].color,
                color: studioMoods[moodIdx].text,
              }}
              title="Click to cycle Studio status!"
            >
              <div className="flex items-center gap-3">
                <span className="text-xl sm:text-2xl">{studioMoods[moodIdx].icon}</span>
                <div>
                  <div className="font-comic text-base sm:text-lg font-black tracking-wider spider-text-hover">
                    STATUS // {studioMoods[moodIdx].status}
                  </div>
                  <div className="text-xs font-mono font-bold opacity-90">
                    // {studioMoods[moodIdx].note}
                  </div>
                </div>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border-2 border-[#09090B] font-mono text-[10px] font-black text-[#09090B] shadow-[2.5px_2.5px_0px_#09090B] spider-rgb-hover">
                <span>CYCLE STATUS 🎲</span>
              </div>
            </motion.div>

            {/* Action Bar: Terminal Sticker & Let's Build CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...steppedSpring, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <button
                onClick={copyCommand}
                data-cursor="COPY"
                className="inline-flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-[#FFF] text-[#0A0A0A] border-[2.5px] border-[#0A0A0A] shadow-[3.5px_3.5px_0px_#0A0A0A] spider-rgb-hover font-mono text-xs font-black transition-all cursor-pointer"
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
                data-cursor="EXPLORE"
                onClick={(e) => triggerBurst("*DEPLOYED!*", e, "#FF0055")}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#FF4D00] text-white font-black text-xs border-[2.5px] border-[#0A0A0A] shadow-[3.5px_3.5px_0px_#0A0A0A] spider-rgb-hover transition-all cursor-pointer"
              >
                <span>Explore Shipped Systems</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#contact"
                data-cursor="SAY HELLO"
                onClick={(e) => triggerBurst("*PING!*", e, "#FDE047")}
                className="inline-flex items-center gap-1.5 px-5 py-3 rounded-2xl bg-[#C6FF00] text-[#0A0A0A] font-black text-xs border-[2.5px] border-[#0A0A0A] shadow-[3.5px_3.5px_0px_#0A0A0A] spider-rgb-hover transition-all cursor-pointer"
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
              transition={{ ...steppedSpring, delay: 0.25 }}
              whileHover={{ rotate: -1.5, scale: 1.04, transition: { type: "spring", stiffness: 400, damping: 20 } }}
              whileTap={{ scale: 0.97 }}
              data-cursor="PASS ⚡"
              onClick={(e) => {
                fireConfetti(e);
                triggerBurst("*STUDIO PASS!*", e, "#C6FF00");
              }}
              className="relative p-4 pb-5 rounded-3xl bg-white border-[3px] border-[#09090B] shadow-[10px_10px_0px_#09090B] max-w-[320px] w-full cursor-pointer select-none overflow-hidden"
              title="Click Studio Pass for vibes!"
            >
              {/* Spider-Verse Ben-Day Halftone Texture inside Studio Pass */}
              <div className="absolute inset-0 spider-halftone opacity-35 pointer-events-none rounded-3xl" />

              {/* Top Studio Lanyard Clip Pill (Liquid Glass) */}
              <LiquidGlassPill
                theme="light"
                className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 text-[#0A0A0A] font-mono text-[10px] font-black rotate-[-1deg] z-20 whitespace-nowrap"
              >
                STUDIO PASS // PROD-ENV ⚡
              </LiquidGlassPill>

              {/* Pass Header Row */}
              <div className="flex items-center justify-between pb-2 mb-2 pt-2.5 border-b border-[#0A0A0A]/15 font-mono text-[11px] font-bold text-zinc-800">
                <span>ID: VENU-K // 0x2A</span>
                <span className="px-2 py-0.5 rounded-full bg-[#C6FF00] text-[#0A0A0A] border border-[#0A0A0A] text-[10px] font-black">
                  STATUS: IN PROD ⚡
                </span>
              </div>

              {/* Photo Area with Technical Frame */}
              <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden border-2 border-[#0A0A0A] bg-zinc-100">
                {!imageError ? (
                  <Image
                    src={imageSrc}
                    alt={profileData.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 300px"
                    className="object-cover"
                    onError={() => {
                      if (imageSrc !== profileData.photoUrl) {
                        setImageSrc(profileData.photoUrl);
                      } else {
                        setImageError(true);
                      }
                    }}
                  />
                ) : (
                  <div className="h-full w-full flex flex-col items-center justify-center p-6 text-center space-y-2 bg-[#FDE047]">
                    <Terminal className="w-8 h-8 text-[#0A0A0A]" />
                    <div className="font-mono text-sm font-black text-[#0A0A0A] uppercase">VENU K</div>
                    <div className="font-mono text-xs text-zinc-800 font-bold">Backend Developer</div>
                  </div>
                )}

                {/* Technical HUD Crosshair Overlay */}
                <div className="absolute top-2 left-2 font-mono text-[9px] font-black text-white/90 bg-[#0A0A0A]/70 px-1.5 py-0.5 rounded backdrop-blur-sm z-10">
                  + 13.6288° N
                </div>
                <div className="absolute bottom-2 right-2 font-mono text-[9px] font-black text-white/90 bg-[#0A0A0A]/70 px-1.5 py-0.5 rounded backdrop-blur-sm z-10">
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
          transition={{ ...steppedSpring, delay: 0.4 }}
          className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-4"
        >
          <motion.div
            onClick={(e) => fireConfetti(e)}
            whileHover={{ scale: 1.05, rotate: -1.5 }}
            whileTap={{ scale: 0.96 }}
            className="p-5 rounded-2xl bg-[#C6FF00] border-2 border-[#0A0A0A] shadow-[4px_4px_0px_#0A0A0A] spider-rgb-hover space-y-1 transition-all cursor-pointer select-none"
          >
            <div className="font-mono text-[11px] uppercase font-black text-[#0A0A0A]">PRODUCTION SLA</div>
            <div className="text-2xl sm:text-3xl font-black text-[#0A0A0A] tracking-tight">99.98%</div>
            <div className="text-xs text-zinc-900 font-bold">Uptime Across Microservices ✨</div>
          </motion.div>

          <motion.div
            onClick={(e) => fireConfetti(e)}
            whileHover={{ scale: 1.05, rotate: 1.5 }}
            whileTap={{ scale: 0.96 }}
            className="p-5 rounded-2xl bg-[#FFFFFF] border-2 border-[#0A0A0A] shadow-[4px_4px_0px_#0A0A0A] spider-rgb-hover space-y-1 transition-all cursor-pointer select-none"
          >
            <div className="font-mono text-[11px] uppercase font-black text-[#FF4D00]">CLOUD FINOPS</div>
            <div className="text-2xl sm:text-3xl font-black text-[#0A0A0A] tracking-tight">20–25%</div>
            <div className="text-xs text-zinc-800 font-bold">Monthly Spend Reduced 💰</div>
          </motion.div>

          <motion.div
            onClick={(e) => fireConfetti(e)}
            whileHover={{ scale: 1.05, rotate: -1.5 }}
            whileTap={{ scale: 0.96 }}
            className="p-5 rounded-2xl bg-[#2563EB] text-white border-2 border-[#0A0A0A] shadow-[4px_4px_0px_#0A0A0A] spider-rgb-hover space-y-1 transition-all cursor-pointer select-none"
          >
            <div className="font-mono text-[11px] uppercase font-black text-[#C6FF00]">CONTAINER FLEET</div>
            <div className="text-2xl sm:text-3xl font-black text-white tracking-tight">20+ Services</div>
            <div className="text-xs text-white/90 font-bold">Kubernetes &amp; Cloud Run 🐳</div>
          </motion.div>

          <motion.div
            onClick={(e) => fireConfetti(e)}
            whileHover={{ scale: 1.05, rotate: 1.5 }}
            whileTap={{ scale: 0.96 }}
            className="p-5 rounded-2xl bg-[#FDE047] border-2 border-[#0A0A0A] shadow-[4px_4px_0px_#0A0A0A] spider-rgb-hover space-y-1 transition-all cursor-pointer select-none"
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
