"use client";

import React, { useState } from "react";
import {
  Award,
  ExternalLink,
  GraduationCap,
  Calendar,
  CheckCircle2,
  Trophy,
  Copy,
  Check,
} from "lucide-react";
import {
  certificationsData,
  awardsData,
  educationData,
} from "@/shared/data/certifications";

export function CertificationsSection() {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const award = awardsData[0];

  const handleCopy = (id: string, text: string) => {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
        navigator.clipboard
          .writeText(text)
          .then(() => {
            setCopiedId(id);
            setTimeout(() => setCopiedId(null), 2000);
          })
          .catch(() => {
            setCopiedId(id);
            setTimeout(() => setCopiedId(null), 2000);
          });
      } else {
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
      }
    } catch {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  return (
    <section id="credentials" className="py-28 sm:py-36 relative scroll-mt-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="space-y-4 mb-14 pb-8 border-b border-white/[0.08]">
          <div className="apple-badge inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-white/10 text-xs font-mono text-cyan-400 font-semibold uppercase tracking-wider">
            <Award className="w-3.5 h-3.5" />
            <span>Cloud &amp; Platform Credentials</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-black text-white tracking-[-0.035em]">
            Certifications &amp; Honors
          </h2>
          <p className="text-zinc-400 max-w-2xl text-base sm:text-lg font-light leading-relaxed">
            Formal engineering verifications across Kubernetes cluster administration, enterprise AWS DevOps architecture, and Terraform automation.
          </p>
        </div>

        {/* Reliability Champion Recognition Plaque */}
        <div className="p-8 sm:p-10 mb-12 rounded-[2.25rem] bg-[#0B0B0F]/90 backdrop-blur-xl border border-amber-500/25 shadow-[0_20px_50px_rgba(245,158,11,0.06)] space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-mono text-amber-400 font-bold uppercase tracking-wider">
                <Trophy className="w-4 h-4" />
                Operational Excellence Citation
              </div>
              <h3 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
                {award.title} — {award.issuer}
              </h3>
              <p className="text-base text-zinc-300 font-light leading-relaxed">
                {award.description}
              </p>
            </div>

            <div className="lg:col-span-4 lg:border-l lg:border-white/[0.08] lg:pl-8 space-y-2 font-mono">
              <div className="text-xs uppercase text-zinc-500">OPERATIONAL RECORD</div>
              <div className="text-2xl font-bold text-amber-400 leading-snug">
                {award.impact}
              </div>
              <div className="text-xs text-zinc-400 pt-2 border-t border-white/[0.08] flex items-center justify-between">
                <span>Conferred: <strong className="text-white">{award.date}</strong></span>
                <span className="text-emerald-400 font-bold">100% Zero Loss</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Verified Cloud Credentials Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {certificationsData.map((cert) => (
            <div
              key={cert.id}
              className="apple-card p-8 rounded-[2.25rem] bg-[#0B0B0F]/80 backdrop-blur-xl border border-white/[0.10] hover:border-white/20 transition-all flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-semibold text-[11px]">
                    {cert.category}
                  </span>
                  <div className="flex items-center gap-1.5 text-zinc-400">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{cert.issueDate}</span>
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-lg text-white leading-snug">
                    {cert.title}
                  </h4>
                  <span className="text-xs font-mono text-zinc-400 block mt-1">
                    Issuer: {cert.issuer}
                  </span>
                </div>
              </div>

              <div className="pt-5 border-t border-white/[0.08] flex items-center justify-between font-mono text-xs">
                <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                  <CheckCircle2 className="w-4 h-4" />
                  Active
                </span>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleCopy(cert.id, `${cert.title} — ${cert.issuer} (${cert.credlyUrl})`)}
                    className="text-zinc-400 hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
                    title="Copy credential details"
                  >
                    {copiedId === cert.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                  {cert.credlyUrl && (
                    <a
                      href={cert.credlyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-cyan-400 hover:text-cyan-300 transition-colors"
                    >
                      <span>Credly</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Academic Degree Section */}
        <div className="mt-8 p-6 sm:p-8 rounded-[2rem] bg-[#0B0B0F]/80 backdrop-blur-xl border border-white/[0.10] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-xs">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center shrink-0">
              <GraduationCap className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <div className="font-bold text-sm text-white">
                {educationData.degree} in {educationData.field}
              </div>
              <div className="text-zinc-400 text-xs">
                {educationData.institution}, {educationData.location}
              </div>
            </div>
          </div>
          <span className="px-3.5 py-1 rounded-full bg-white/[0.05] text-purple-300 font-semibold">
            ENGINEERING GRADUATE · COMPUTER SCIENCE
          </span>
        </div>
      </div>
    </section>
  );
}
