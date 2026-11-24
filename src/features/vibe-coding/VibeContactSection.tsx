"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { Mail, Phone, Copy, Check, Send, ArrowUpRight, Coffee, Heart, Sparkles } from "lucide-react";
import { profileData } from "@/shared/data/profile";

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg role="img" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg role="img" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  );
}

export function VibeContactSection() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const fireConfetti = (e?: React.MouseEvent) => {
    try {
      confetti({
        particleCount: 45,
        spread: 60,
        origin: e
          ? { x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight }
          : { y: 0.6 },
        colors: ["#bef264", "#fda4af", "#d8b4fe", "#bae6fd", "#fde047"],
      });
    } catch {}
  };

  const copyEmail = (e?: React.MouseEvent) => {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
        navigator.clipboard.writeText(profileData.contact.email).catch(() => {});
      }
    } catch {}
    setCopiedEmail(true);
    fireConfetti(e);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const copyPhone = (e?: React.MouseEvent) => {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
        navigator.clipboard.writeText(profileData.contact.phone).catch(() => {});
      }
    } catch {}
    setCopiedPhone(true);
    fireConfetti(e);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  return (
    <footer id="contact" className="py-24 relative border-t-2 border-[#0A0A0A]/10 scroll-mt-36 sm:scroll-mt-44 pt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Streetwear Spec Banner: Engineering Philosophy */}
        <motion.div
          whileHover={{ scale: 1.01, rotate: 0, transition: { type: "spring", stiffness: 350, damping: 20 } }}
          className="relative mb-16 p-8 rounded-3xl bg-[#FDE047] border-2 border-[#0A0A0A] shadow-[6px_6px_0px_#0A0A0A] rotate-[-0.8deg] space-y-4 overflow-hidden"
        >
          {/* Subtle Spider-Verse Halftone Pattern */}
          <div className="absolute top-0 right-0 w-36 h-36 spider-halftone opacity-15 pointer-events-none rounded-tr-3xl" />

          <div className="relative flex items-center gap-2 font-mono text-xs font-black uppercase text-[#0A0A0A]">
            <Sparkles className="w-3.5 h-3.5 text-[#0A0A0A] animate-spin" />
            ENGINEERING PHILOSOPHY // PROD DIRECTIVES
          </div>
          <blockquote className="text-2xl sm:text-3xl font-black text-[#0A0A0A] leading-snug">
            &ldquo;{profileData.philosophy.quote}&rdquo;
          </blockquote>
          <div className="flex flex-wrap gap-2 pt-2">
            {profileData.philosophy.points.map((pt, i) => (
              <span
                key={i}
                onClick={(e) => fireConfetti(e)}
                className="px-3 py-1 rounded-full bg-white border-2 border-[#0A0A0A] font-mono text-xs font-black text-[#0A0A0A] shadow-[1.5px_1.5px_0px_#0A0A0A] cursor-pointer hover:bg-[#0A0A0A] hover:text-[#C6FF00] transition-colors"
              >
                ✓ {pt}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Contact Spread: Chat Invite & Channels */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Direct Action */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-3">
              <div className="inline-block px-3 py-1 rounded-full bg-[#C6FF00] text-[#0A0A0A] text-xs font-mono font-black border-2 border-[#0A0A0A]">
                OPEN FOR OPPORTUNITIES
              </div>
              <h2 className="text-4xl sm:text-6xl font-black text-[#0A0A0A] tracking-tight leading-[0.95]">
                Let&apos;s Build Resilient Systems Together
              </h2>
              <p className="text-zinc-800 text-base sm:text-lg font-medium leading-relaxed">
                Looking for a Backend Developer who can architect high-throughput microservices, optimize
                Redis event pipelines, and deploy autonomous AI agents with zero drama? Let&apos;s talk!
              </p>
            </div>

            {/* Direct Channel Cards - High-Contrast Quad Spread */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Direct Email Card with Feedback */}
              <motion.div
                whileHover={{ scale: 1.02, rotate: -0.5, transition: { type: "spring", stiffness: 350, damping: 20 } }}
                className="p-4 rounded-2xl bg-white border-2 border-[#0A0A0A] shadow-[4px_4px_0px_#0A0A0A] flex items-center justify-between gap-3"
              >
                <div className="min-w-0">
                  <div className="text-[10px] font-mono text-zinc-600 font-black uppercase flex items-center gap-1.5">
                    <Mail className="w-3 h-3 text-[#FF4D00]" />
                    <span>DIRECT EMAIL</span>
                  </div>
                  <a
                    href={`mailto:${profileData.contact.email}`}
                    className="text-xs font-mono font-black text-[#0A0A0A] hover:text-[#2563EB] transition-colors truncate block"
                    title={profileData.contact.email}
                  >
                    {profileData.contact.email}
                  </a>
                </div>
                <button
                  onClick={copyEmail}
                  className="px-3 py-1.5 rounded-xl font-mono text-xs font-black border-2 border-[#0A0A0A] bg-[#C6FF00] text-[#0A0A0A] shadow-[2px_2px_0px_#0A0A0A] spider-rgb-hover transition-all cursor-pointer shrink-0"
                >
                  {copiedEmail ? "Copied! ✨" : "Copy"}
                </button>
              </motion.div>

              {/* Prominent GitHub Card */}
              <motion.div
                whileHover={{ scale: 1.02, rotate: 0.5, transition: { type: "spring", stiffness: 350, damping: 20 } }}
                className="p-4 rounded-2xl bg-[#0A0A0A] text-white border-2 border-[#0A0A0A] shadow-[4px_4px_0px_#C6FF00] flex items-center justify-between gap-3"
              >
                <div className="min-w-0">
                  <div className="text-[10px] font-mono text-[#C6FF00] font-black uppercase flex items-center gap-1.5">
                    <GitHubIcon className="w-3 h-3 text-[#C6FF00]" />
                    <span>GITHUB // CODE & REPOS</span>
                  </div>
                  <a
                    href={profileData.contact.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono font-black text-white hover:text-[#C6FF00] transition-colors truncate block"
                  >
                    github.com/Venu5198
                  </a>
                </div>
                <a
                  href={profileData.contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-xl font-mono text-xs font-black border-2 border-[#C6FF00] bg-[#C6FF00] text-[#0A0A0A] shadow-[2px_2px_0px_#FFFFFF] spider-rgb-hover transition-all cursor-pointer shrink-0 flex items-center gap-1"
                >
                  <span>Open</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </motion.div>

              {/* Prominent LinkedIn Card */}
              <motion.div
                whileHover={{ scale: 1.02, rotate: -0.5, transition: { type: "spring", stiffness: 350, damping: 20 } }}
                className="p-4 rounded-2xl bg-white border-2 border-[#0A0A0A] shadow-[4px_4px_0px_#0A0A0A] flex items-center justify-between gap-3"
              >
                <div className="min-w-0">
                  <div className="text-[10px] font-mono text-zinc-600 font-black uppercase flex items-center gap-1.5">
                    <LinkedInIcon className="w-3 h-3 text-[#2563EB]" />
                    <span>LINKEDIN // NETWORK</span>
                  </div>
                  <a
                    href={profileData.contact.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono font-black text-[#0A0A0A] hover:text-[#2563EB] transition-colors truncate block"
                  >
                    linkedin.com/in/venu-k-2a4460383
                  </a>
                </div>
                <a
                  href={profileData.contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-xl font-mono text-xs font-black border-2 border-[#0A0A0A] bg-[#2563EB] text-white shadow-[2px_2px_0px_#0A0A0A] spider-rgb-hover transition-all cursor-pointer shrink-0 flex items-center gap-1"
                >
                  <span>Connect</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </motion.div>

              {/* Direct Phone Card with Feedback */}
              <motion.div
                whileHover={{ scale: 1.02, rotate: 0.5, transition: { type: "spring", stiffness: 350, damping: 20 } }}
                className="p-4 rounded-2xl bg-white border-2 border-[#0A0A0A] shadow-[4px_4px_0px_#0A0A0A] flex items-center justify-between gap-3"
              >
                <div className="min-w-0">
                  <div className="text-[10px] font-mono text-zinc-600 font-black uppercase flex items-center gap-1.5">
                    <Phone className="w-3 h-3 text-[#FF4D00]" />
                    <span>PHONE // SIGNAL</span>
                  </div>
                  <a
                    href={`tel:${profileData.contact.phone}`}
                    className="text-xs font-mono font-black text-[#0A0A0A] hover:text-[#2563EB] transition-colors truncate block"
                  >
                    {profileData.contact.phone}
                  </a>
                </div>
                <button
                  onClick={copyPhone}
                  className="px-3 py-1.5 rounded-xl font-mono text-xs font-black border-2 border-[#0A0A0A] bg-[#FF4D00] text-white shadow-[2px_2px_0px_#0A0A0A] spider-rgb-hover transition-all cursor-pointer shrink-0"
                >
                  {copiedPhone ? "Copied! ✨" : "Copy"}
                </button>
              </motion.div>
            </div>

            {/* Main Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href={`mailto:${profileData.contact.email}?subject=Backend%20Developer%20Opportunity%20-%20Venu%20K`}
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-2xl bg-[#C6FF00] text-[#0A0A0A] font-black text-sm border-2 border-[#0A0A0A] shadow-[4px_4px_0px_#0A0A0A] spider-spring-btn spider-rgb-hover transition-all cursor-pointer"
              >
                <span>Say Hello / Initiate Transmission 🚀</span>
                <Send className="w-4 h-4" />
              </a>

              <a
                href={profileData.contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-[#0A0A0A] text-white font-black text-sm border-2 border-[#0A0A0A] shadow-[4px_4px_0px_#C6FF00] spider-spring-btn spider-rgb-hover transition-all cursor-pointer"
              >
                <GitHubIcon className="w-4 h-4 text-[#C6FF00]" />
                <span>GitHub @Venu5198</span>
                <ArrowUpRight className="w-4 h-4 text-[#C6FF00]" />
              </a>
            </div>
          </div>

          {/* Right Column: Mini Notebook Spec & Social Stamps */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-3xl bg-white border-2 border-[#0A0A0A] shadow-[6px_6px_0px_#0A0A0A] font-mono text-xs space-y-3">
              <div className="flex items-center justify-between pb-3 border-b-2 border-[#0A0A0A]/10 font-bold">
                <span className="flex items-center gap-2 font-black text-[#0A0A0A]">
                  <Coffee className="w-4 h-4 text-[#FF4D00]" />
                  IDENTITY_SPEC.json
                </span>
                <span className="px-2 py-0.5 rounded-full bg-[#C6FF00] text-[#0A0A0A] border border-[#0A0A0A] text-[10px] font-black">
                  ● ACTIVE
                </span>
              </div>
              <pre className="text-zinc-900 text-xs leading-relaxed overflow-x-auto font-bold">
{`{
  "engineer": "${profileData.name}",
  "role": "Backend Developer",
  "location": "${profileData.location}",
  "platforms": ["SyncRivo.ai", "OCNORA.ai"],
  "focus": ["Python", "FastAPI", "Kubernetes", "AI"],
  "open_to": "Backend Developer & DevOps Roles"
}`}
              </pre>
            </div>

            {/* Social Stamp Buttons */}
            <div className="flex items-center gap-3">
              <a
                href={profileData.contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 px-4 rounded-2xl bg-[#0A0A0A] text-white border-2 border-[#0A0A0A] shadow-[3px_3px_0px_#C6FF00] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all flex items-center justify-center gap-2 text-xs font-mono font-black"
              >
                <GitHubIcon className="w-4 h-4" />
                <span>GitHub</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>

              <a
                href={profileData.contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 px-4 rounded-2xl bg-[#2563EB] text-white border-2 border-[#0A0A0A] shadow-[3px_3px_0px_#0A0A0A] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all flex items-center justify-center gap-2 text-xs font-mono font-black"
              >
                <LinkedInIcon className="w-4 h-4" />
                <span>LinkedIn</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>

              <a
                href={profileData.contact.credly}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 px-4 rounded-2xl bg-[#FDE047] text-[#0A0A0A] border-2 border-[#0A0A0A] shadow-[3px_3px_0px_#0A0A0A] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all flex items-center justify-center gap-2 text-xs font-mono font-black"
              >
                <span>Credly</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom Strip */}
        <div className="mt-16 pt-8 border-t-2 border-[#0A0A0A]/10 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs font-bold text-zinc-700">
          <div className="flex items-center gap-2">
            <span>© 2026 Venu K.</span>
            <span className="text-[#0A0A0A] font-black">Backend Developer — Python, DevOps &amp; AI.</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded-full bg-[#C6FF00] text-[#0A0A0A] border border-[#0A0A0A] font-black text-[10px]">
              ● ALL SYSTEMS NOMINAL
            </span>
            <span>Tirupati, AP · India ☕</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
