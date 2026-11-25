"use client";

import React, { useState } from "react";
import { Award, ExternalLink, Copy, Check, CheckCircle2 } from "lucide-react";
import { BentoSpotlightTile } from "./BentoSpotlightTile";
import { certificationsData, awardsData } from "@/shared/data/certifications";
import { useTheme } from "@/shared/context/ThemeContext";

export function Tile4Credentials() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (id: string, text: string) => {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
        navigator.clipboard.writeText(text);
      }
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const reliabilityAward = awardsData[0];

  return (
    <BentoSpotlightTile
      id="tile-credentials"
      className="lg:col-span-5 col-span-12 flex flex-col justify-between"
    >
      <div>
        {/* Header */}
        <div
          className={`flex items-center justify-between pb-3 mb-4 border-b ${
            isDark ? "border-white/[0.08]" : "border-black/[0.08]"
          }`}
        >
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-[#FF9500] dark:text-[#FF9F0A]" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#1D1D1F] dark:text-[#F5F5F7]">
              Credentials &amp; Honors
            </span>
          </div>
          <a
            href="https://www.credly.com/users/venu-krishnaya"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] font-mono text-[#007AFF] dark:text-[#32ADE6] hover:underline flex items-center gap-1"
          >
            <span>Credly Profile</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {/* Operational Excellence Citation Plaque */}
        <div
          className={`p-3.5 rounded-2xl mb-3.5 space-y-1.5 border ${
            isDark
              ? "bg-amber-500/[0.07] border-amber-500/25"
              : "bg-amber-500/[0.08] border-amber-500/30 shadow-sm"
          }`}
        >
          <div className="flex items-center justify-between text-[11px] font-mono">
            <span className="text-amber-500 dark:text-amber-400 font-bold uppercase tracking-wider">
              ★ {reliabilityAward.title}
            </span>
            <span className="text-amber-600 dark:text-amber-300 font-semibold">{reliabilityAward.date}</span>
          </div>
          <div className="text-xs text-[#1D1D1F] dark:text-[#F5F5F7] font-semibold leading-snug">
            {reliabilityAward.issuer} · {reliabilityAward.impact}
          </div>
          <div className="text-[10px] text-[#52525B] dark:text-zinc-400 font-light leading-relaxed">
            {reliabilityAward.description}
          </div>
        </div>

        {/* 3 Verified Cloud Badges */}
        <div className="space-y-2.5">
          {certificationsData.map((cert) => (
            <div
              key={cert.id}
              className={`p-3 rounded-2xl border transition-all flex items-center justify-between gap-3 text-xs ${
                isDark
                  ? "bg-white/[0.02] border-white/[0.06] hover:border-white/15"
                  : "bg-[#F2F2F7] border-black/[0.06] hover:border-black/15 shadow-sm"
              }`}
            >
              <div className="min-w-0 space-y-0.5">
                <div className="font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] truncate">{cert.title}</div>
                <div className="text-[10px] font-mono text-[#52525B] dark:text-[#86868B] flex items-center gap-2">
                  <span>{cert.issuer}</span>
                  <span className="opacity-30">·</span>
                  <span className="text-[#34C759] dark:text-emerald-400 flex items-center gap-1 font-medium">
                    <CheckCircle2 className="w-3 h-3" />
                    {cert.issueDate}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() =>
                    handleCopy(
                      cert.id,
                      `${cert.title} — ${cert.issuer} (Credly: ${cert.credlyUrl})`
                    )
                  }
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-mono transition-colors flex items-center gap-1 cursor-pointer ${
                    isDark
                      ? "bg-white/[0.05] hover:bg-white/10 text-zinc-300"
                      : "bg-white hover:bg-zinc-100 text-zinc-700 shadow-xs border border-black/5"
                  }`}
                  title="Copy verification link"
                >
                  {copiedId === cert.id ? (
                    <>
                      <Check className="w-3 h-3 text-[#30D158]" />
                      <span className="text-[#30D158]">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div
        className={`pt-3.5 mt-3.5 border-t text-[10px] font-mono flex items-center justify-between ${
          isDark ? "border-white/[0.08] text-[#86868B]" : "border-black/[0.08] text-[#52525B]"
        }`}
      >
        <span>Formal Third-Party Verification</span>
        <span className="text-[#34C759] dark:text-emerald-400 font-semibold">100% Certified</span>
      </div>
    </BentoSpotlightTile>
  );
}
