"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Server, Cloud, Cpu, ShieldCheck, Search, Terminal } from "lucide-react";
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

  const filteredDomains = skillDomainsData
    .map((domain) => {
      const matchingSkills = domain.skills.filter(
        (s) =>
          s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.tag.toLowerCase().includes(searchQuery.toLowerCase())
      );
      return { ...domain, matchingSkills };
    })
    .filter((d) => {
      if (selectedDomain !== "all" && d.id !== selectedDomain) return false;
      return d.matchingSkills.length > 0;
    });

  return (
    <section id="arsenal" className="py-28 sm:py-36 relative scroll-mt-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="space-y-4 mb-14 pb-8 border-b border-white/[0.08]">
          <div className="apple-badge inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-white/10 text-xs font-mono text-cyan-400 font-semibold uppercase tracking-wider">
            <Terminal className="w-3.5 h-3.5" />
            <span>Technical Capabilities</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-black text-white tracking-[-0.035em]">
            Backend &amp; Platform Arsenal
          </h2>
          <p className="text-zinc-400 max-w-2xl text-base sm:text-lg font-light leading-relaxed">
            Battle-tested technologies leveraged across multi-tenant distributed backends, low-latency event bridges, and cloud-native Kubernetes clusters.
          </p>
        </div>

        {/* Filter Pills & Search */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-12">
          <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-full bg-white/[0.04] border border-white/10 relative">
            <button
              onClick={() => setSelectedDomain("all")}
              className={`relative px-4 py-1.5 rounded-full text-xs font-medium transition-colors cursor-pointer ${
                selectedDomain === "all" ? "text-black font-semibold" : "text-zinc-400 hover:text-white"
              }`}
            >
              {selectedDomain === "all" && (
                <motion.div
                  layoutId="activeDomainFilter"
                  transition={{ type: "spring" as const, stiffness: 380, damping: 30 }}
                  className="absolute inset-0 rounded-full bg-white -z-10 shadow-md"
                />
              )}
              <span>All Domains</span>
            </button>
            {skillDomainsData.map((d) => (
              <button
                key={d.id}
                onClick={() => setSelectedDomain(d.id)}
                className={`relative px-4 py-1.5 rounded-full text-xs font-medium transition-colors cursor-pointer ${
                  selectedDomain === d.id ? "text-black font-semibold" : "text-zinc-400 hover:text-white"
                }`}
              >
                {selectedDomain === d.id && (
                  <motion.div
                    layoutId="activeDomainFilter"
                    transition={{ type: "spring" as const, stiffness: 380, damping: 30 }}
                    className="absolute inset-0 rounded-full bg-white -z-10 shadow-md"
                  />
                )}
                <span>{d.title.split(" ")[0]}</span>
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
              className="w-full sm:w-64 bg-white/[0.04] border border-white/10 rounded-full pl-10 pr-4 py-2 text-xs font-mono text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-white/30 transition-colors"
            />
          </div>
        </div>

        {/* Grouped Apple Control Center Glass Panels */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredDomains.map((domain) => (
            <div
              key={domain.id}
              className="apple-card p-8 rounded-[2.25rem] bg-[#0B0B0F]/80 backdrop-blur-xl border border-white/[0.10] hover:border-white/20 transition-all space-y-6"
            >
              {/* Category Header */}
              <div className="flex items-center gap-3.5 pb-4 border-b border-white/[0.08]">
                <div className="w-10 h-10 rounded-2xl bg-white/[0.05] border border-white/10 flex items-center justify-center shrink-0">
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

              {/* Skill Pills */}
              <div className="flex flex-wrap gap-2.5">
                {domain.matchingSkills.map((skill, idx) => (
                  <div
                    key={idx}
                    className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] hover:border-white/20 transition-all cursor-default"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    <span className="font-mono text-xs font-medium text-zinc-200">
                      {skill.name}
                    </span>
                    <span className="font-mono text-[10px] text-zinc-500">
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
