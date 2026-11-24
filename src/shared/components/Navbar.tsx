"use client";

import React, { useState, useEffect } from "react";
import { Terminal, Shield, Cpu, Briefcase, Award, ArrowUpRight, Moon, Sparkles } from "lucide-react";
import { TelemetryBadge } from "./TelemetryBadge";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);

    // Read stored theme preference or default to dark console
    const savedTheme = localStorage.getItem("portfolio-theme") as "dark" | "light" | null;
    const activeTheme = savedTheme || "dark";
    setTheme(activeTheme);
    document.documentElement.setAttribute("data-theme", activeTheme);
    document.documentElement.classList.toggle("dark", activeTheme === "dark");
    document.documentElement.classList.toggle("light", activeTheme === "light");

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
    document.documentElement.classList.toggle("dark", nextTheme === "dark");
    document.documentElement.classList.toggle("light", nextTheme === "light");
    localStorage.setItem("portfolio-theme", nextTheme);
  };

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
            <span className="text-[10px] font-mono text-zinc-500">BACKEND_DEV</span>
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

        {/* Theme Switcher, Live Status & CTA */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Dual-Theme Switcher Toggle */}
          <button
            onClick={toggleTheme}
            className={`px-3 py-1.5 rounded-full text-[11px] font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              theme === "light"
                ? "bg-[#bef264] text-black border-2 border-black shadow-[2px_2px_0px_#000] hover:translate-x-[-1px] hover:translate-y-[-1px]"
                : "bg-white/[0.06] text-zinc-300 border border-white/10 hover:text-white hover:bg-white/10"
            }`}
            title={theme === "light" ? "Switch to Dark Console mode" : "Switch to Gen-Z Vibe Coding mode"}
            aria-label="Toggle theme"
          >
            {theme === "light" ? (
              <>
                <Sparkles className="w-3.5 h-3.5 text-black" />
                <span className="hidden xs:inline">VIBE MODE</span>
              </>
            ) : (
              <>
                <Moon className="w-3.5 h-3.5 text-cyan-400" />
                <span className="hidden xs:inline">CONSOLE</span>
              </>
            )}
          </button>

          <TelemetryBadge
            status="online"
            label="SYS: HEALTHY"
            className="hidden lg:inline-flex text-[11px] py-0.5 px-2.5"
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
