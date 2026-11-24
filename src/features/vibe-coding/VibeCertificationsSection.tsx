"use client";

import React from "react";
import { Award, Shield, CheckCircle2, ExternalLink, Sparkles } from "lucide-react";
import { certificationsData, awardsData } from "@/shared/data/certifications";

export function VibeCertificationsSection() {
  const award = awardsData[0];

  return (
    <section id="certifications" className="py-24 relative scroll-mt-36 pt-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="space-y-3 mb-12 pb-6 border-b-2 border-black/10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#d8b4fe] text-black text-xs font-mono font-bold border-2 border-black shadow-[2px_2px_0px_#000]">
            <Sparkles className="w-3.5 h-3.5" />
            OFFICIAL STAMPS &amp; BADGES
          </div>
          <h2 className="text-4xl sm:text-6xl font-black text-black tracking-tight leading-[0.95]">
            Credentials &amp; Honors
          </h2>
          <p className="text-zinc-600 max-w-xl text-base sm:text-lg font-normal">
            Certified cloud and container admin credentials independently verified via Credly.
          </p>
        </div>

        {/* Award Trophy Plaque (Gen-Z Style) */}
        {award && (
          <div className="mb-12 p-8 rounded-3xl bg-[#fde047] border-2 border-black shadow-[8px_8px_0px_#000] space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-black text-white text-xs font-mono font-bold">
                🏆 {award.issuer} · {award.date}
              </span>
              <span className="px-3 py-1 rounded-full bg-white text-black font-mono text-xs font-black border border-black">
                99.98% PRODUCTION SLA
              </span>
            </div>

            <div className="space-y-2">
              <h3 className="text-3xl sm:text-4xl font-black text-black">{award.title}</h3>
              <p className="text-sm sm:text-base text-zinc-800 font-medium leading-relaxed max-w-3xl">
                {award.description}
              </p>
            </div>

            <div className="pt-2 flex items-center gap-2 font-mono text-xs font-black text-black">
              <span>★ Recognition:</span>
              <span className="underline">{award.impact}</span>
            </div>
          </div>
        )}

        {/* Credential Stamps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {certificationsData.map((c, i) => {
            const cardBg = i === 0 ? "#bae6fd" : i === 1 ? "#bef264" : "#fda4af";
            return (
              <div
                key={c.id}
                className="p-6 rounded-3xl border-2 border-black shadow-[6px_6px_0px_#000] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all flex flex-col justify-between space-y-4"
                style={{ backgroundColor: cardBg }}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-black uppercase text-black px-2 py-0.5 rounded bg-white border border-black">
                      {c.category}
                    </span>
                    <span className="font-mono text-xs font-bold text-black">{c.issueDate}</span>
                  </div>

                  <h4 className="text-lg font-black text-black leading-snug">{c.title}</h4>
                  <div className="text-xs font-mono text-zinc-800 font-medium">{c.issuer}</div>
                </div>

                <div className="pt-4 border-t border-black/20 flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-xs font-mono font-bold text-black">
                    <CheckCircle2 className="w-4 h-4 text-emerald-800" />
                    Verified
                  </span>

                  <a
                    href={c.credlyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white border border-black text-xs font-mono font-bold text-black hover:bg-black hover:text-white transition-colors"
                  >
                    <span>Credly</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
