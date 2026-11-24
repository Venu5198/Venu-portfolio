"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  Copy,
  Check,
  Send,
  ArrowUpRight,
  Shield,
  Terminal,
} from "lucide-react";
import { profileData } from "@/shared/data/profile";
import { Magnetic } from "@/shared/components/Magnetic";

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
    navigator.clipboard.writeText(profileData.contact.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const copyPhone = () => {
    navigator.clipboard.writeText(profileData.contact.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  return (
    <footer id="contact" className="py-28 relative border-t border-hairline scroll-mt-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Engineering Philosophy Banner (Open, Typographic Layout) */}
        <div className="mb-20 pb-16 border-b border-hairline space-y-6">
          <div className="font-mono text-xs text-cyan-400 uppercase tracking-[0.25em] font-semibold flex items-center gap-2">
            <Terminal className="w-3.5 h-3.5" />
            Engineering Philosophy
          </div>
          <blockquote className="text-2xl sm:text-4xl font-extralight text-zinc-100 italic leading-snug max-w-4xl">
            &ldquo;{profileData.philosophy.quote}&rdquo;
          </blockquote>
          <div className="flex flex-wrap gap-3 pt-2">
            {profileData.philosophy.points.map((p, idx) => (
              <span
                key={idx}
                className="px-4 py-1.5 rounded-full bg-white/[0.03] border border-hairline text-xs font-mono text-zinc-300"
              >
                ✓ {p}
              </span>
            ))}
          </div>
        </div>

        {/* Contact Transmission Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left: Call to Action & Direct Channels */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 font-mono text-xs text-emerald-400 uppercase tracking-widest font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                Available For Founding Roles &amp; Architectural Engagements
              </div>
              <h2 className="text-4xl sm:text-6xl font-black text-white tracking-tighter uppercase leading-[0.9]">
                Let&apos;s Build Resilient Systems
              </h2>
              <p className="text-zinc-400 text-base sm:text-lg font-light leading-relaxed">
                Looking for a Founding Engineer who can take your platform from 0 to 1,
                architect multi-tenant real-time bridges, scale Kubernetes workloads, or deploy
                autonomous AI agent fleets.
              </p>
            </div>

            {/* Direct Contact Buttons with Visual Feedback */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-hairline flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
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
                <button
                  onClick={copyEmail}
                  className={`px-3 py-1.5 rounded-lg font-mono text-[11px] font-semibold flex items-center gap-1.5 transition-all shrink-0 ${
                    copiedEmail
                      ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 shadow-[0_0_12px_rgba(16,185,129,0.2)]"
                      : "text-zinc-400 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06]"
                  }`}
                  title="Copy email address"
                  aria-label="Copy email address"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.02] border border-hairline flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
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
                <button
                  onClick={copyPhone}
                  className={`px-3 py-1.5 rounded-lg font-mono text-[11px] font-semibold flex items-center gap-1.5 transition-all shrink-0 ${
                    copiedPhone
                      ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 shadow-[0_0_12px_rgba(16,185,129,0.2)]"
                      : "text-zinc-400 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06]"
                  }`}
                  title="Copy phone number"
                  aria-label="Copy phone number"
                >
                  {copiedPhone ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Magnetic Transmission Button */}
            <div className="pt-2">
              <Magnetic strength={18}>
                <a
                  href={`mailto:${profileData.contact.email}?subject=Founding%20Engineer%20Opportunity%20-%20Venu%20K`}
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-cyan-400 text-black font-bold text-sm hover:bg-cyan-300 transition-all shadow-[0_0_35px_rgba(6,182,212,0.45)]"
                >
                  <span>Initiate Transmission</span>
                  <Send className="w-4 h-4" />
                </a>
              </Magnetic>
            </div>
          </div>

          {/* Right: Terminal Identity Spec & Verified Socials */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-3xl bg-[#0c0c11] border border-hairline font-mono text-xs space-y-3">
              <div className="flex items-center justify-between pb-3 border-b border-hairline text-zinc-500 text-[11px]">
                <span>IDENTITY_SPEC.json</span>
                <span className="text-emerald-400 font-bold">● ACTIVE</span>
              </div>
              <pre className="text-zinc-300 text-xs leading-relaxed overflow-x-auto">
{`{
  "engineer": "${profileData.name}",
  "role": "Founding Engineer",
  "location": "${profileData.location}",
  "platforms_built": ["SyncRivo.ai", "OCNORA.ai"],
  "certifications": [
    "AWS DevOps Professional",
    "Kubernetes CKA",
    "Terraform Associate"
  ],
  "open_to": "Founding Roles & Lead Architect"
}`}
              </pre>
            </div>

            {/* Verified External Links */}
            <div className="flex items-center gap-3">
              <a
                href={profileData.contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 px-4 rounded-2xl bg-white/[0.03] border border-hairline hover:border-white/20 hover:bg-white/[0.06] transition-all flex items-center justify-center gap-2 text-xs font-mono text-zinc-300 hover:text-white group"
              >
                <GitHubIcon className="w-4 h-4 text-zinc-300 group-hover:text-white transition-colors" />
                <span>GitHub</span>
                <ArrowUpRight className="w-3 h-3 text-zinc-500 group-hover:text-white transition-colors" />
              </a>

              <a
                href={profileData.contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 px-4 rounded-2xl bg-white/[0.03] border border-hairline hover:border-cyan-500/30 hover:bg-cyan-500/05 transition-all flex items-center justify-center gap-2 text-xs font-mono text-zinc-300 hover:text-cyan-300 group"
              >
                <LinkedInIcon className="w-4 h-4 text-cyan-400" />
                <span>LinkedIn</span>
                <ArrowUpRight className="w-3 h-3 text-zinc-500 group-hover:text-cyan-300 transition-colors" />
              </a>

              <a
                href={profileData.contact.credly}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 px-4 rounded-2xl bg-white/[0.03] border border-hairline hover:border-amber-500/30 hover:bg-amber-500/05 transition-all flex items-center justify-center gap-2 text-xs font-mono text-zinc-300 hover:text-amber-300 group"
              >
                <Shield className="w-4 h-4 text-amber-400" />
                <span>Credly</span>
                <ArrowUpRight className="w-3 h-3 text-zinc-500 group-hover:text-amber-300 transition-colors" />
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="mt-20 pt-8 border-t border-hairline flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-zinc-500">
          <div>
            © 2026 Venu K. Founding Engineer &amp; Systems Architect.
          </div>
          <div className="flex items-center gap-4">
            <span className="text-emerald-400 font-semibold">● ALL SYSTEMS OPERATIONAL</span>
            <span>TIRUPATI · AP · IN</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
