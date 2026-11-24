"use client";

import React, { useState } from "react";
import { Search, Sparkles } from "lucide-react";
import { skillDomainsData } from "@/shared/data/skills";
import { SkillDomain, SkillItem } from "@/shared/types/skill";

const pastelColors = ["#bef264", "#fda4af", "#d8b4fe", "#bae6fd", "#fde047"];

export function VibeArsenalSection() {
  const [query, setQuery] = useState("");
  const [selectedDomain, setSelectedDomain] = useState<string>("all");

  const domainOptions = ["all", ...skillDomainsData.map((d: SkillDomain) => d.id)];

  const filteredDomains = skillDomainsData
    .map((domain: SkillDomain) => ({
      ...domain,
      matchingSkills: domain.skills.filter(
        (s: SkillItem) =>
          (selectedDomain === "all" || domain.id === selectedDomain) &&
          (query === "" ||
            s.name.toLowerCase().includes(query.toLowerCase()) ||
            s.tag.toLowerCase().includes(query.toLowerCase()))
      ),
    }))
    .filter((domain) => domain.matchingSkills.length > 0);

  return (
    <section id="arsenal" className="py-24 relative scroll-mt-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="space-y-3 mb-12 pb-6 border-b-2 border-black/10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#fda4af] text-black text-xs font-mono font-bold border-2 border-black shadow-[2px_2px_0px_#000]">
            <Sparkles className="w-3.5 h-3.5" />
            DEVELOPER STICKER SHEET
          </div>
          <h2 className="text-4xl sm:text-6xl font-black text-black tracking-tight leading-[0.95]">
            Tech Arsenal &amp; Tooling
          </h2>
          <p className="text-zinc-600 max-w-xl text-base sm:text-lg font-normal">
            Battle-tested libraries, distributed runtimes, and cloud-native tools I use to ship resilient
            backend systems.
          </p>
        </div>

        {/* Search Bar & Category Filter Pills */}
        <div className="space-y-4 mb-12">
          {/* Doodle Search Input */}
          <div className="relative max-w-md">
            <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-black" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search competencies, runtimes, stacks..."
              className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white border-2 border-black shadow-[4px_4px_0px_#000] text-sm font-mono font-bold text-black placeholder:text-zinc-400 focus:outline-none focus:translate-x-[-1px] focus:translate-y-[-1px] focus:shadow-[5px_5px_0px_#000] transition-all"
            />
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {domainOptions.map((opt) => {
              const isSelected = selectedDomain === opt;
              const domainObj = skillDomainsData.find((d) => d.id === opt);
              const label = opt === "all" ? "⭐ All Tools" : domainObj ? domainObj.title : opt;
              return (
                <button
                  key={opt}
                  onClick={() => setSelectedDomain(opt)}
                  className={`px-3.5 py-1.5 rounded-full font-mono text-xs font-bold border-2 border-black transition-all cursor-pointer ${
                    isSelected
                      ? "bg-black text-white shadow-[2px_2px_0px_#bef264] translate-x-[-1px] translate-y-[-1px]"
                      : "bg-white text-black hover:bg-zinc-100 shadow-[1.5px_1.5px_0px_#000]"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Sticker Sheet Grid */}
        <div className="space-y-10">
          {filteredDomains.map((group, groupIdx) => (
            <div key={group.id} className="space-y-4">
              <div className="font-mono text-xs font-black uppercase text-black flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-black" />
                {group.title}
              </div>

              <div className="flex flex-wrap gap-3">
                {group.matchingSkills.map((sk: SkillItem, idx: number) => {
                  const color = pastelColors[(groupIdx + idx) % pastelColors.length];
                  return (
                    <div
                      key={sk.name}
                      className="px-4 py-2.5 rounded-2xl border-2 border-black text-black font-mono text-xs font-bold shadow-[3px_3px_0px_#000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[5px_5px_0px_#000] transition-all cursor-default flex items-center gap-2"
                      style={{ backgroundColor: color }}
                    >
                      <span>{sk.name}</span>
                      {sk.tag && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-black/10 border border-black/20 text-black">
                          {sk.tag}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
