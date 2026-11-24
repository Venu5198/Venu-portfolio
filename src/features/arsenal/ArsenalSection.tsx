"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Server,
  Cloud,
  Cpu,
  ShieldCheck,
  Search,
  Terminal,
} from "lucide-react";
import { skillDomainsData } from "@/shared/data/skills";

export function ArsenalSection() {
  const [selectedDomain, setSelectedDomain] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const iconMap: Record<string, React.ReactNode> = {
    Server: <Server className="w-5 h-5 text-cyan-400" />,
    Cloud: <Cloud className="w-5 h-5 text-emerald-400" />,
    Cpu: <Cpu className="w-5 h-5 text-amber-400" />,
    ShieldCheck: <ShieldCheck className="w-5 h-5 text-purple-400" />,
  };

  const filteredDomains = skillDomainsData.map((domain) => {
    const matchingSkills = domain.skills.filter(
      (s) =>
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.tag.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return { ...domain, matchingSkills };
  }).filter((d) => {
    if (selectedDomain !== "all" && d.id !== selectedDomain) return false;
    return d.matchingSkills.length > 0;
  });

  return (
    <section id="arsenal" className="py-28 relative scroll-mt-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="space-y-4 mb-16 pb-8 border-b border-hairline">
          <div className="font-mono text-xs text-amber-400 uppercase tracking-[0.25em] font-semibold flex items-center gap-2">
            <Terminal className="w-3.5 h-3.5" />
            Core Competencies &amp; Tooling
          </div>
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tighter uppercase leading-[0.9]">
            Engineering Arsenal
          </h2>
          <p className="text-zinc-400 max-w-2xl text-base sm:text-lg font-light leading-relaxed">
            Battle-tested technologies leveraged across multi-tenant distributed systems,
            low-latency event bridges, and cloud-native Kubernetes clusters.
          </p>
        </div>

        {/* Filter Bar & Search */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-14">
          <div className="flex flex-wrap items-center gap-2 p-1 rounded-full bg-white/[0.03] border border-hairline">
            <button
              onClick={() => setSelectedDomain("all")}
              className={`px-4 py-2 rounded-full text-xs font-mono font-bold transition-all ${
                selectedDomain === "all"
                  ? "bg-white text-black shadow-md"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              All Domains
            </button>
            {skillDomainsData.map((d) => (
              <button
                key={d.id}
                onClick={() => setSelectedDomain(d.id)}
                className={`px-4 py-2 rounded-full text-xs font-mono font-bold transition-all ${
                  selectedDomain === d.id
                    ? "bg-white text-black shadow-md"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                {d.title.split(" ")[0]}
              </button>
            ))}
          </div>

          <div className="relative">
            <Search className="w-4 h-4 text-zinc-500 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter technologies..."
              className="w-full sm:w-64 bg-white/[0.03] border border-hairline rounded-full pl-10 pr-4 py-2 text-xs font-mono text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-cyan-400 transition-colors"
            />
          </div>
        </div>

        {/* Typographic Groupings (Clean, Unboxed, Open Layout) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          {filteredDomains.map((domain) => (
            <div key={domain.id} className="space-y-6">
              {/* Category Header with Hairline Rule */}
              <div className="flex items-center gap-3 pb-4 border-b border-hairline">
                <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-hairline flex items-center justify-center shrink-0">
                  {iconMap[domain.icon]}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white tracking-tight">
                    {domain.title}
                  </h3>
                  <div className="text-xs text-zinc-400 font-light mt-0.5">
                    {domain.description}
                  </div>
                </div>
              </div>

              {/* Free-flowing Tactile Interactive Badges */}
              <div className="flex flex-wrap gap-2.5">
                {domain.matchingSkills.map((skill, idx) => (
                  <div
                    key={idx}
                    className="group inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/[0.03] hover:bg-white/[0.07] border border-hairline hover:border-cyan-400/50 transition-all duration-200 cursor-default"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/70 group-hover:bg-cyan-400 group-hover:scale-125 transition-all" />
                    <span className="font-mono text-xs font-semibold text-zinc-200 group-hover:text-white">
                      {skill.name}
                    </span>
                    <span className="font-mono text-[10px] text-zinc-500 group-hover:text-zinc-300">
                      {skill.tag}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
