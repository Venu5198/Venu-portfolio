"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, Copy, Check, Send, ArrowUpRight, Shield } from "lucide-react";
import { BentoSpotlightTile } from "./BentoSpotlightTile";
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

export function Tile8Outreach() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const copyEmail = () => {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
        navigator.clipboard.writeText(profileData.contact.email);
      }
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } catch {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    }
  };

  const copyPhone = () => {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
        navigator.clipboard.writeText(profileData.contact.phone);
      }
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    } catch {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  return (
    <BentoSpotlightTile
      id="tile-outreach"
      className="lg:col-span-4 col-span-12 flex flex-col justify-between"
    >
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/[0.08]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#30D158] animate-pulse" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#F5F5F7]">
              Direct Outreach
            </span>
          </div>
          <span className="text-[10px] font-mono text-emerald-400">Available</span>
        </div>

        <p className="text-xs text-[#86868B] font-light leading-relaxed mb-4">
          Open to full-time Backend Developer and DevOps roles architecting microservices, Kubernetes platforms, and AI engines.
        </p>

        {/* Contact Action Pills */}
        <div className="space-y-2.5 mb-5">
          {/* Email Copy Card */}
          <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-between gap-2">
            <div className="flex items-center gap-2.5 min-w-0">
              <Mail className="w-4 h-4 text-[#32ADE6] shrink-0" />
              <div className="min-w-0">
                <div className="text-[9px] font-mono text-[#86868B] uppercase">EMAIL</div>
                <div className="text-xs font-mono text-zinc-200 truncate">
                  {profileData.contact.email}
                </div>
              </div>
            </div>
            <button
              onClick={copyEmail}
              className="px-2.5 py-1 rounded-lg bg-white/[0.06] hover:bg-white/10 text-xs font-mono text-zinc-300 transition-colors shrink-0 cursor-pointer"
              title="Copy email address"
            >
              {copiedEmail ? (
                <span className="text-[#30D158] flex items-center gap-1">
                  <Check className="w-3 h-3" /> Copied
                </span>
              ) : (
                <span className="flex items-center gap-1">
                  <Copy className="w-3 h-3" /> Copy
                </span>
              )}
            </button>
          </div>

          {/* Phone Copy Card */}
          <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-between gap-2">
            <div className="flex items-center gap-2.5 min-w-0">
              <Phone className="w-4 h-4 text-[#30D158] shrink-0" />
              <div className="min-w-0">
                <div className="text-[9px] font-mono text-[#86868B] uppercase">PHONE</div>
                <div className="text-xs font-mono text-zinc-200 truncate">
                  {profileData.contact.phone}
                </div>
              </div>
            </div>
            <button
              onClick={copyPhone}
              className="px-2.5 py-1 rounded-lg bg-white/[0.06] hover:bg-white/10 text-xs font-mono text-zinc-300 transition-colors shrink-0 cursor-pointer"
              title="Copy phone number"
            >
              {copiedPhone ? (
                <span className="text-[#30D158] flex items-center gap-1">
                  <Check className="w-3 h-3" /> Copied
                </span>
              ) : (
                <span className="flex items-center gap-1">
                  <Copy className="w-3 h-3" /> Copy
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Social Link Pills */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          <a
            href={profileData.contact.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-zinc-300 hover:text-white transition-all flex flex-col items-center justify-center gap-1 text-[11px] font-mono group"
          >
            <GitHubIcon className="w-4 h-4 text-white" />
            <span className="flex items-center gap-0.5">
              GitHub <ArrowUpRight className="w-2.5 h-2.5 text-zinc-500 group-hover:text-white" />
            </span>
          </a>

          <a
            href={profileData.contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl bg-white/[0.04] hover:bg-blue-500/10 border border-white/10 hover:border-blue-500/30 text-zinc-300 hover:text-blue-300 transition-all flex flex-col items-center justify-center gap-1 text-[11px] font-mono group"
          >
            <LinkedInIcon className="w-4 h-4 text-blue-400" />
            <span className="flex items-center gap-0.5">
              LinkedIn <ArrowUpRight className="w-2.5 h-2.5 text-zinc-500 group-hover:text-blue-300" />
            </span>
          </a>

          <a
            href={profileData.contact.credly}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl bg-white/[0.04] hover:bg-amber-500/10 border border-white/10 hover:border-amber-500/30 text-zinc-300 hover:text-amber-300 transition-all flex flex-col items-center justify-center gap-1 text-[11px] font-mono group"
          >
            <Shield className="w-4 h-4 text-amber-400" />
            <span className="flex items-center gap-0.5">
              Credly <ArrowUpRight className="w-2.5 h-2.5 text-zinc-500 group-hover:text-amber-300" />
            </span>
          </a>
        </div>
      </div>

      {/* Primary Mailto Action */}
      <div className="pt-3 border-t border-white/[0.08]">
        <motion.a
          href={`mailto:${profileData.contact.email}?subject=Backend%20Developer%20Opportunity%20-%20Venu%20K`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-2.5 px-4 rounded-full bg-white text-black font-semibold text-xs hover:bg-zinc-200 transition-colors shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <span>Send Direct Email</span>
          <Send className="w-3.5 h-3.5" />
        </motion.a>
      </div>
    </BentoSpotlightTile>
  );
}
