"use client";

import React, { useState, useEffect } from "react";
import { Terminal, Shield, Cpu, Briefcase, Award, ArrowUpRight, Moon, Sparkles } from "lucide-react";
import { useTheme } from "@/shared/context/ThemeContext";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isLight = theme === "light";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4 pointer-events-none">
      <nav
        className={`pointer-events-auto flex items-center justify-between w-full max-w-6xl px-4 py-2.5 rounded-full transition-all duration-300 ${
          isLight
            ? "bg-[#FAF8F5]/90 backdrop-blur-xl border-2 border-black shadow-[3px_3px_0px_#000]"
            : scrolled
            ? "bg-[#09090B]/85 backdrop-blur-xl border border-white/[0.12] shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
            : "bg-[#121217]/50 backdrop-blur-md border border-white/[0.06]"
        }`}
      >
        {/* Brand / Logo */}
        <a href="#hero" className="flex items-center gap-2 group text-sm font-semibold tracking-tight">
          <div
            className={`w-8 h-8 rounded-lg flex items-center justify-center transition-transform group-hover:scale-105 ${
              isLight
                ? "bg-[#bef264] border-2 border-black text-black shadow-[1.5px_1.5px_0px_#000]"
                : "bg-white/[0.05] border border-white/10 text-cyan-400 group-hover:border-cyan-500/50"
            }`}
          >
            <Terminal className="w-4 h-4" />
          </div>
          <div className="flex flex-col">
            <span
              className={`font-mono text-xs font-bold flex items-center gap-1.5 ${
                isLight ? "text-black" : "text-zinc-100"
              }`}
            >
              VENU.K
              <span
                className={`text-[10px] font-normal ${
                  isLight ? "text-pink-600 font-semibold" : "text-cyan-400"
                }`}
              >
                {isLight ? "vibe" : "v2.5"}
              </span>
            </span>
            <span
              className={`text-[10px] font-mono ${
                isLight ? "text-zinc-600 font-semibold" : "text-zinc-500"
              }`}
            >
              BACKEND_DEV
            </span>
          </div>
        </a>

        {/* Navigation Links */}
        <div
          className={`hidden md:flex items-center gap-1 text-xs font-mono ${
            isLight ? "text-zinc-700 font-medium" : "text-zinc-400"
          }`}
        >
          <a
            href="#projects"
            className={`px-3 py-1.5 rounded-full transition-colors flex items-center gap-1.5 ${
              isLight ? "hover:bg-[#bef264] hover:text-black" : "hover:text-white hover:bg-white/[0.06]"
            }`}
          >
            <Briefcase className={`w-3.5 h-3.5 ${isLight ? "text-black" : "text-cyan-400"}`} />
            Projects
          </a>
          <a
            href="#architecture"
            className={`px-3 py-1.5 rounded-full transition-colors flex items-center gap-1.5 ${
              isLight ? "hover:bg-[#d8b4fe] hover:text-black" : "hover:text-white hover:bg-white/[0.06]"
            }`}
          >
            <Cpu className={`w-3.5 h-3.5 ${isLight ? "text-black" : "text-emerald-400"}`} />
            Architecture
          </a>
          <a
            href="#arsenal"
            className={`px-3 py-1.5 rounded-full transition-colors flex items-center gap-1.5 ${
              isLight ? "hover:bg-[#fde047] hover:text-black" : "hover:text-white hover:bg-white/[0.06]"
            }`}
          >
            <Shield className={`w-3.5 h-3.5 ${isLight ? "text-black" : "text-amber-400"}`} />
            Arsenal
          </a>
          <a
            href="#certifications"
            className={`px-3 py-1.5 rounded-full transition-colors flex items-center gap-1.5 ${
              isLight ? "hover:bg-[#fda4af] hover:text-black" : "hover:text-white hover:bg-white/[0.06]"
            }`}
          >
            <Award className={`w-3.5 h-3.5 ${isLight ? "text-black" : "text-purple-400"}`} />
            Credentials
          </a>
        </div>

        {/* Theme Switcher & Action CTA */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Dual-Theme Switcher Toggle */}
          <button
            onClick={toggleTheme}
            className={`px-3 py-1.5 rounded-full text-[11px] font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              isLight
                ? "bg-[#bef264] text-black border-2 border-black shadow-[2px_2px_0px_#000] hover:translate-x-[-1px] hover:translate-y-[-1px]"
                : "bg-white/[0.06] text-zinc-300 border border-white/10 hover:text-white hover:bg-white/10"
            }`}
            title={isLight ? "Switch to Dark Console mode" : "Switch to Gen-Z Chaos mode"}
            aria-label="Toggle theme"
          >
            {isLight ? (
              <>
                <Sparkles className="w-3.5 h-3.5 text-black animate-spin" />
                <span>CHAOS MODE ⚡</span>
              </>
            ) : (
              <>
                <Moon className="w-3.5 h-3.5 text-cyan-400" />
                <span>CONSOLE</span>
              </>
            )}
          </button>

          <a
            href="#contact"
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-bold text-xs transition-all ${
              isLight
                ? "bg-[#fda4af] text-black border-2 border-black shadow-[2px_2px_0px_#000] hover:translate-x-[-1px] hover:translate-y-[-1px]"
                : "bg-cyan-500 text-black hover:bg-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.35)]"
            }`}
          >
            <span>Let&apos;s Build</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </nav>
    </header>
  );
}
