"use client";

import React, { useState, useEffect } from "react";
import { Terminal, Shield, Cpu, Briefcase, Award, ArrowUpRight, Moon, Sparkles } from "lucide-react";
import { useTheme } from "@/shared/context/ThemeContext";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    let lastScrollY = typeof window !== "undefined" ? window.scrollY : 0;
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          setScrolled(currentScrollY > 30);

          // Always visible near top of page
          if (currentScrollY < 60) {
            setVisible(true);
          } else if (currentScrollY > lastScrollY && currentScrollY - lastScrollY > 8) {
            // Scrolling down -> gently hide floating navbar to prevent any content overlap
            setVisible(false);
          } else if (lastScrollY - currentScrollY > 8) {
            // Scrolling up -> immediately reveal navbar
            setVisible(true);
          }

          lastScrollY = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isLight = theme === "light";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4 pointer-events-none transition-all duration-300 ${
        visible ? "translate-y-0 opacity-100" : "-translate-y-20 opacity-0"
      }`}
    >
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
        <a href="#hero" className="flex items-center gap-2 group text-sm font-semibold tracking-tight shrink-0">
          <div
            className={`w-8 h-8 rounded-lg flex items-center justify-center transition-transform group-hover:scale-105 shrink-0 ${
              isLight
                ? "bg-[#C6FF00] border-2 border-[#0A0A0A] text-[#0A0A0A] shadow-[1.5px_1.5px_0px_#0A0A0A]"
                : "bg-white/[0.05] border border-white/10 text-cyan-400 group-hover:border-cyan-500/50"
            }`}
          >
            <Terminal className="w-4 h-4" />
          </div>
          <div className="flex flex-col min-w-0">
            <span
              className={`font-mono text-xs font-bold flex items-center gap-1.5 ${
                isLight ? "text-[#0A0A0A]" : "text-zinc-100"
              }`}
            >
              VENU.K
              <span
                className={`text-[10px] font-mono font-bold hidden sm:inline ${
                  isLight ? "text-[#FF4D00] spider-text-hover" : "text-cyan-400"
                }`}
              >
                {isLight ? "STUDIO ⚡" : "v2.5"}
              </span>
            </span>
            <span
              className={`text-[10px] font-mono leading-none ${
                isLight ? "text-zinc-800 font-bold" : "text-zinc-500"
              }`}
            >
              BACKEND_DEV
            </span>
          </div>
        </a>

        {/* Navigation Links */}
        <div
          className={`hidden md:flex items-center gap-1 text-xs font-mono ${
            isLight ? "text-zinc-800 font-bold" : "text-zinc-400"
          }`}
        >
          <a
            href="#projects"
            className={`px-3 py-1.5 rounded-full transition-colors flex items-center gap-1.5 ${
              isLight ? "hover:bg-[#C6FF00] hover:text-[#0A0A0A]" : "hover:text-white hover:bg-white/[0.06]"
            }`}
          >
            <Briefcase className={`w-3.5 h-3.5 ${isLight ? "text-[#0A0A0A]" : "text-cyan-400"}`} />
            Projects
          </a>
          <a
            href="#architecture"
            className={`px-3 py-1.5 rounded-full transition-colors flex items-center gap-1.5 ${
              isLight ? "hover:bg-[#2563EB] hover:text-white" : "hover:text-white hover:bg-white/[0.06]"
            }`}
          >
            <Cpu className={`w-3.5 h-3.5 ${isLight ? "text-[#0A0A0A]" : "text-emerald-400"}`} />
            Architecture
          </a>
          <a
            href="#arsenal"
            className={`px-3 py-1.5 rounded-full transition-colors flex items-center gap-1.5 ${
              isLight ? "hover:bg-[#FDE047] hover:text-[#0A0A0A]" : "hover:text-white hover:bg-white/[0.06]"
            }`}
          >
            <Shield className={`w-3.5 h-3.5 ${isLight ? "text-[#0A0A0A]" : "text-amber-400"}`} />
            Arsenal
          </a>
          <a
            href="#certifications"
            className={`px-3 py-1.5 rounded-full transition-colors flex items-center gap-1.5 ${
              isLight ? "hover:bg-[#FF4D00] hover:text-white" : "hover:text-white hover:bg-white/[0.06]"
            }`}
          >
            <Award className={`w-3.5 h-3.5 ${isLight ? "text-[#0A0A0A]" : "text-purple-400"}`} />
            Credentials
          </a>
        </div>

        {/* Theme Switcher & Action CTA */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Dual-Theme Switcher Toggle */}
          <button
            onClick={toggleTheme}
            className={`px-3 py-1.5 rounded-full text-[11px] font-mono font-black flex items-center gap-1.5 transition-all cursor-pointer ${
              isLight
                ? "bg-[#C6FF00] text-[#0A0A0A] border-2 border-[#0A0A0A] shadow-[2px_2px_0px_#0A0A0A] spider-rgb-hover"
                : "bg-white/[0.06] text-zinc-300 border border-white/10 hover:text-white hover:bg-white/10"
            }`}
            title={isLight ? "Switch to Systems Engineering Dossier (Dark)" : "Switch to Comic & Studio Mode (Light)"}
            aria-label="Toggle theme"
          >
            {isLight ? (
              <>
                <Sparkles className="w-3.5 h-3.5 text-[#0A0A0A] animate-spin" />
                <span>STUDIO MODE ⚡</span>
              </>
            ) : (
              <>
                <Moon className="w-3.5 h-3.5 text-cyan-400" />
                <span>DOSSIER</span>
              </>
            )}
          </button>

          <a
            href="#contact"
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-black text-xs transition-all ${
              isLight
                ? "bg-[#FF4D00] text-white border-2 border-[#0A0A0A] shadow-[2px_2px_0px_#0A0A0A] spider-rgb-hover"
                : "bg-cyan-500 text-black hover:bg-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.35)] font-semibold"
            }`}
          >
            <span>{isLight ? "Let's Build" : "Contact"}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </nav>
    </header>
  );
}
