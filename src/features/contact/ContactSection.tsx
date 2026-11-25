"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, Copy, Check, Send, ArrowUpRight, Shield } from "lucide-react";
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

export function ContactSection() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const copyEmail = () => {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
        navigator.clipboard
          .writeText(profileData.contact.email)
          .then(() => {
            setCopiedEmail(true);
            setTimeout(() => setCopiedEmail(false), 2000);
          })
          .catch(() => {
            setCopiedEmail(true);
            setTimeout(() => setCopiedEmail(false), 2000);
          });
      } else {
        setCopiedEmail(true);
        setTimeout(() => setCopiedEmail(false), 2000);
      }
    } catch {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    }
  };

  const copyPhone = () => {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
        navigator.clipboard
          .writeText(profileData.contact.phone)
          .then(() => {
            setCopiedPhone(true);
            setTimeout(() => setCopiedPhone(false), 2000);
          })
          .catch(() => {
            setCopiedPhone(true);
            setTimeout(() => setCopiedPhone(false), 2000);
          });
      } else {
        setCopiedPhone(true);
        setTimeout(() => setCopiedPhone(false), 2000);
      }
    } catch {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  return (
    <footer className="py-28 sm:py-36 relative border-t border-white/[0.08] bg-[#000000]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Contact Container */}
        <div id="contact" className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start scroll-mt-32">
          {/* Left: Direct Outreach */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-medium text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Available for Backend Developer &amp; DevOps Roles
              </div>
              <h2 className="text-4xl sm:text-6xl font-black text-white tracking-[-0.035em] leading-[0.95]">
                Let&apos;s build resilient systems together.
              </h2>
              <p className="text-zinc-400 text-base sm:text-lg font-light leading-relaxed max-w-xl">
                Looking for a Backend Developer who can architect high-throughput microservices, optimize Redis event pipelines, scale Kubernetes workloads, and deploy autonomous AI agents with zero drama? Let&apos;s talk!
              </p>
            </div>

            {/* Direct Contact Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-6 rounded-[2rem] bg-[#0B0B0F]/80 backdrop-blur-xl border border-white/[0.10] flex items-center justify-between gap-3">
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">DIRECT EMAIL</div>
                    <a
                      href={`mailto:${profileData.contact.email}`}
                      className="text-xs font-mono text-zinc-200 hover:text-cyan-300 transition-colors truncate block"
                    >
                      {profileData.contact.email}
                    </a>
                  </div>
                </div>
                <motion.button
                  onClick={copyEmail}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-3 py-1.5 rounded-xl font-mono text-xs font-semibold flex items-center gap-1.5 transition-all shrink-0 cursor-pointer ${
                    copiedEmail
                      ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                      : "text-zinc-300 hover:text-white bg-white/[0.05] hover:bg-white/10 border border-white/10"
                  }`}
                  title="Copy email address"
                  aria-label="Copy email address"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </motion.button>
              </div>

              <div className="p-6 rounded-[2rem] bg-[#0B0B0F]/80 backdrop-blur-xl border border-white/[0.10] flex items-center justify-between gap-3">
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">PHONE</div>
                    <a
                      href={`tel:${profileData.contact.phone}`}
                      className="text-xs font-mono text-zinc-200 hover:text-emerald-300 transition-colors truncate block"
                    >
                      {profileData.contact.phone}
                    </a>
                  </div>
                </div>
                <motion.button
                  onClick={copyPhone}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-3 py-1.5 rounded-xl font-mono text-xs font-semibold flex items-center gap-1.5 transition-all shrink-0 cursor-pointer ${
                    copiedPhone
                      ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                      : "text-zinc-300 hover:text-white bg-white/[0.05] hover:bg-white/10 border border-white/10"
                  }`}
                  title="Copy phone number"
                  aria-label="Copy phone number"
                >
                  {copiedPhone ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </motion.button>
              </div>
            </div>

            {/* Direct Outreach Action */}
            <div className="pt-2">
              <motion.a
                href={`mailto:${profileData.contact.email}?subject=Backend%20Developer%20Opportunity%20-%20Venu%20K`}
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-white text-black font-semibold text-xs hover:bg-zinc-200 transition-shadow shadow-[0_4px_24px_rgba(255,255,255,0.25)]"
              >
                <span>Get In Touch Directly</span>
                <Send className="w-4 h-4" />
              </motion.a>
            </div>
          </div>

          {/* Right: Restrained Apple Engineering Profile Card & Verified Socials */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-[2.25rem] bg-[#0B0B0F]/80 backdrop-blur-xl border border-white/[0.10] space-y-4">
              <div className="flex items-center justify-between pb-3.5 border-b border-white/[0.08]">
                <span className="text-xs font-mono uppercase tracking-wider text-zinc-400">Engineering Profile</span>
                <span className="text-emerald-400 text-xs font-mono font-semibold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Verified
                </span>
              </div>

              <div className="space-y-3 text-xs leading-relaxed">
                <div className="flex items-start justify-between gap-4">
                  <span className="text-zinc-500 font-mono">Specialization:</span>
                  <span className="text-white font-medium text-right">Python, FastAPI, Kubernetes &amp; AI</span>
                </div>
                <div className="flex items-start justify-between gap-4">
                  <span className="text-zinc-500 font-mono">Core Focus:</span>
                  <span className="text-zinc-300 text-right font-light">Event Streaming, Redis, Cloud FinOps</span>
                </div>
                <div className="flex items-start justify-between gap-4">
                  <span className="text-zinc-500 font-mono">Key Systems:</span>
                  <span className="text-zinc-300 text-right font-light">SyncRivo.ai &amp; OCNORA.ai</span>
                </div>
                <div className="flex items-start justify-between gap-4">
                  <span className="text-zinc-500 font-mono">Location:</span>
                  <span className="text-zinc-300 text-right font-light">{profileData.location}</span>
                </div>
              </div>
            </div>

            {/* Social Buttons */}
            <div className="grid grid-cols-3 gap-3">
              <motion.a
                href={profileData.contact.github}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="py-3 px-3 rounded-2xl bg-[#0B0B0F]/80 backdrop-blur-xl border border-white/10 hover:border-white/25 hover:bg-white/[0.05] transition-all flex items-center justify-center gap-2 text-xs font-mono text-white group"
              >
                <GitHubIcon className="w-4 h-4 text-white shrink-0" />
                <span>GitHub</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-white" />
              </motion.a>

              <motion.a
                href={profileData.contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="py-3 px-3 rounded-2xl bg-[#0B0B0F]/80 backdrop-blur-xl border border-white/10 hover:border-blue-500/30 hover:bg-blue-500/10 transition-all flex items-center justify-center gap-2 text-xs font-mono text-white group"
              >
                <LinkedInIcon className="w-4 h-4 text-blue-400 shrink-0" />
                <span>LinkedIn</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-white" />
              </motion.a>

              <motion.a
                href={profileData.contact.credly}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="py-3 px-3 rounded-2xl bg-[#0B0B0F]/80 backdrop-blur-xl border border-white/10 hover:border-amber-500/30 hover:bg-amber-500/10 transition-all flex items-center justify-center gap-2 text-xs font-mono text-white group"
              >
                <Shield className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Credly</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-white" />
              </motion.a>
            </div>
          </div>
        </div>

        {/* Footer Bottom Line */}
        <div className="mt-20 pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-zinc-500">
          <div>
            © 2026 Venu K. Backend Developer — Python, DevOps &amp; AI.
          </div>
          <div className="flex items-center gap-4">
            <span className="text-emerald-400 font-semibold">● ALL SYSTEMS OPERATIONAL</span>
            <span>Tirupati, AP · India</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
