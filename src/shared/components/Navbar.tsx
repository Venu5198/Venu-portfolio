"use client";

import React, { useState, useEffect } from "react";
import { Terminal, Shield, Cpu, Briefcase, Award, Mail, ArrowUpRight } from "lucide-react";
import { TelemetryBadge } from "./TelemetryBadge";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4 pointer-events-none">
      <nav
        className={`pointer-events-auto flex items-center justify-between w-full max-w-6xl px-4 py-2.5 rounded-full transition-all duration-300 border ${
          scrolled
            ? "bg-[#09090B]/85 backdrop-blur-xl border-white/[0.12] shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
            : "bg-[#121217]/50 backdrop-blur-md border-white/[0.06]"
        }`}
      >
        {/* Brand / Logo */}
        <a href="#hero" className="flex items-center gap-2 group text-sm font-semibold tracking-tight">
          <div className="w-8 h-8 rounded-lg bg-white/[0.05] border border-white/10 flex items-center justify-center group-hover:border-cyan-500/50 transition-colors">
            <Terminal className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="flex flex-col">
            <span className="font-mono text-xs font-bold text-zinc-100 flex items-center gap-1.5">
              VENU.K
              <span className="text-[10px] text-cyan-400 font-normal">v2.5</span>
            </span>
            <span className="text-[10px] font-mono text-zinc-500">FOUNDING_ENG</span>
          </div>
        </a>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-1 text-xs font-mono text-zinc-400">
          <a
            href="#projects"
            className="px-3 py-1.5 rounded-full hover:text-white hover:bg-white/[0.06] transition-colors flex items-center gap-1.5"
          >
            <Briefcase className="w-3.5 h-3.5 text-cyan-400" />
            Projects
          </a>
          <a
            href="#architecture"
            className="px-3 py-1.5 rounded-full hover:text-white hover:bg-white/[0.06] transition-colors flex items-center gap-1.5"
          >
            <Cpu className="w-3.5 h-3.5 text-emerald-400" />
            Architecture
          </a>
          <a
            href="#arsenal"
            className="px-3 py-1.5 rounded-full hover:text-white hover:bg-white/[0.06] transition-colors flex items-center gap-1.5"
          >
            <Shield className="w-3.5 h-3.5 text-amber-400" />
            Arsenal
          </a>
          <a
            href="#certifications"
            className="px-3 py-1.5 rounded-full hover:text-white hover:bg-white/[0.06] transition-colors flex items-center gap-1.5"
          >
            <Award className="w-3.5 h-3.5 text-purple-400" />
            Credentials
          </a>
        </div>

        {/* Live Status & CTA */}
        <div className="flex items-center gap-3">
          <TelemetryBadge
            status="online"
            label="SYS: HEALTHY"
            className="hidden sm:inline-flex text-[11px] py-0.5 px-2.5"
          />
          <a
            href="#contact"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-cyan-500 text-black font-semibold text-xs hover:bg-cyan-400 transition-colors shadow-[0_0_20px_rgba(6,182,212,0.35)]"
          >
            <span>Let&apos;s Build</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </nav>
    </header>
  );
}
