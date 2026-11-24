"use client";

import React from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { Award, Shield, CheckCircle2, ExternalLink, Sparkles } from "lucide-react";
import { certificationsData, awardsData } from "@/shared/data/certifications";

export function VibeCertificationsSection() {
  const award = awardsData[0];

  const fireConfetti = (e?: React.MouseEvent) => {
    try {
      confetti({
        particleCount: 35,
        spread: 55,
        origin: e
          ? { x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight }
          : { y: 0.6 },
        colors: ["#C6FF00", "#FF4D00", "#2563EB", "#FDE047", "#0A0A0A"],
      });
    } catch {}
  };

  return (
    <section id="certifications" className="py-24 relative scroll-mt-36 sm:scroll-mt-44 pt-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="space-y-3 mb-12 pb-6 border-b-2 border-[#0A0A0A]/10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C6FF00] text-[#0A0A0A] text-xs font-mono font-black border-2 border-[#0A0A0A] shadow-[2px_2px_0px_#0A0A0A]">
            <Sparkles className="w-3.5 h-3.5" />
            OFFICIAL STAMPS &amp; BADGES
          </div>
          <h2 className="text-4xl sm:text-6xl font-black text-[#0A0A0A] tracking-tight leading-[0.95]">
            Credentials &amp; Honors
          </h2>
          <p className="text-zinc-800 max-w-xl text-base sm:text-lg font-medium">
            Certified cloud and container admin credentials independently verified via Credly.
          </p>
        </div>

        {/* Award Trophy Plaque (Streetwear Style) */}
        {award && (
          <motion.div
            onClick={(e) => fireConfetti(e)}
            whileHover={{ scale: 1.015, rotate: -0.5, transition: { type: "spring", stiffness: 350, damping: 20 } }}
            whileTap={{ scale: 0.98 }}
            className="relative mb-12 p-8 rounded-3xl bg-[#C6FF00] border-2 border-[#0A0A0A] shadow-[8px_8px_0px_#0A0A0A] space-y-4 cursor-pointer select-none overflow-hidden"
            title="Click trophy for vibes!"
          >
            {/* Subtle Spider-Verse Halftone Watermark */}
            <div className="absolute top-0 right-0 w-48 h-48 spider-halftone opacity-20 pointer-events-none rounded-tr-3xl" />

            <div className="relative flex flex-wrap items-center justify-between gap-3">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#0A0A0A] text-[#C6FF00] text-xs font-mono font-black border border-[#0A0A0A] spider-text-hover spider-rgb-hover">
                🏆 {award.issuer} · {award.date}
              </span>
              <span className="px-3 py-1 rounded-full bg-white text-[#0A0A0A] font-mono text-xs font-black border border-[#0A0A0A] shadow-[1.5px_1.5px_0px_#0A0A0A] spider-rgb-hover">
                99.98% PRODUCTION SLA ✨
              </span>
            </div>

            <div className="space-y-2">
              <h3 className="text-3xl sm:text-4xl font-black text-[#0A0A0A]">{award.title}</h3>
              <p className="text-sm sm:text-base text-zinc-900 font-bold leading-relaxed max-w-3xl">
                {award.description}
              </p>
            </div>

            <div className="pt-2 flex items-center gap-2 font-mono text-xs font-black text-[#0A0A0A]">
              <span>★ Recognition:</span>
              <span className="underline">{award.impact}</span>
            </div>
          </motion.div>
        )}

        {/* Credential Stamps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {certificationsData.map((c, i) => {
            const cardBg = i === 0 ? "#FFFFFF" : i === 1 ? "#C6FF00" : "#FF4D00";
            const isDark = i === 2;
            return (
              <motion.div
                key={c.id}
                onClick={(e) => fireConfetti(e)}
                whileHover={{ scale: 1.03, rotate: i % 2 === 0 ? -1 : 1, transition: { type: "spring", stiffness: 350, damping: 20 } }}
                whileTap={{ scale: 0.97 }}
                className={`p-6 rounded-3xl border-2 border-[#0A0A0A] shadow-[6px_6px_0px_#0A0A0A] transition-all flex flex-col justify-between space-y-4 cursor-pointer select-none ${
                  isDark ? "text-white" : "text-[#0A0A0A]"
                }`}
                style={{ backgroundColor: cardBg }}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-[10px] font-mono font-black uppercase px-2 py-0.5 rounded border ${
                        isDark
                          ? "bg-white/20 border-white/40 text-white"
                          : "bg-[#0A0A0A] text-[#C6FF00] border-[#0A0A0A]"
                      }`}
                    >
                      {c.category}
                    </span>
                    <span className={`font-mono text-xs font-black ${isDark ? "text-white/90" : "text-[#0A0A0A]"}`}>
                      {c.issueDate}
                    </span>
                  </div>

                  <h4 className={`text-lg font-black leading-snug ${isDark ? "text-white" : "text-[#0A0A0A]"}`}>
                    {c.title}
                  </h4>
                  <div className={`text-xs font-mono font-bold ${isDark ? "text-white/80" : "text-zinc-800"}`}>
                    {c.issuer}
                  </div>
                </div>

                <div className="pt-4 border-t border-[#0A0A0A]/20 flex items-center justify-between">
                  <span className={`flex items-center gap-1.5 text-xs font-mono font-black ${isDark ? "text-white" : "text-[#0A0A0A]"}`}>
                    <CheckCircle2 className={`w-4 h-4 ${isDark ? "text-[#C6FF00]" : "text-emerald-700"}`} />
                    Verified
                  </span>

                  <a
                    href={c.credlyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="VERIFY ↗"
                    className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border-2 border-[#0A0A0A] text-xs font-mono font-black transition-colors ${
                      isDark
                        ? "bg-white text-[#0A0A0A] hover:bg-[#C6FF00]"
                        : "bg-white text-[#0A0A0A] hover:bg-[#0A0A0A] hover:text-white"
                    }`}
                  >
                    <span>Credly</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
