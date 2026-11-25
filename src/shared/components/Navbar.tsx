"use client";

import React, { useState, useEffect } from "react";
import { Terminal, ArrowUpRight } from "lucide-react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let lastScrollY = typeof window !== "undefined" ? window.scrollY : 0;
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          setScrolled(currentScrollY > 20);

          if (currentScrollY < 60) {
            setVisible(true);
          } else if (currentScrollY > lastScrollY && currentScrollY - lastScrollY > 8) {
            // Scrolling down smoothly
            setVisible(false);
          } else if (lastScrollY - currentScrollY > 6) {
            // Scrolling up smoothly
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

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-3 sm:pt-4 pointer-events-none transition-all duration-300 ${
        visible ? "translate-y-0 opacity-100" : "-translate-y-20 opacity-0"
      }`}
    >
      <nav
        className={`pointer-events-auto flex items-center justify-between w-full max-w-5xl px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full transition-all duration-300 liquid-glass ${
          scrolled ? "shadow-[0_20px_50px_rgba(0,0,0,0.8)] border-white/[0.16]" : "border-white/[0.12]"
        }`}
      >
        {/* Brand Hardware Emblem */}
        <a
          href="#hero"
          className="flex items-center gap-2.5 group text-sm font-semibold tracking-tight shrink-0"
        >
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-b from-white/20 to-white/5 border border-white/20 flex items-center justify-center text-white shadow-inner group-hover:scale-105 transition-transform">
            <span className="font-mono text-[11px] font-black tracking-tighter text-cyan-400">VK</span>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-xs sm:text-sm font-bold tracking-tight text-white flex items-center gap-1.5">
              VENU K
            </span>
            <span className="text-[9px] sm:text-[10px] font-mono tracking-wider text-zinc-400 uppercase leading-none">
              Backend Developer
            </span>
          </div>
        </a>

        {/* Apple Segmented Nav Pill Links */}
        <div className="hidden md:flex items-center gap-1 text-xs font-medium text-zinc-300">
          <a
            href="#projects"
            className="px-3.5 py-1.5 rounded-full hover:text-white hover:bg-white/[0.08] transition-all"
          >
            Projects
          </a>
          <a
            href="#architecture"
            className="px-3.5 py-1.5 rounded-full hover:text-white hover:bg-white/[0.08] transition-all"
          >
            Architecture
          </a>
          <a
            href="#arsenal"
            className="px-3.5 py-1.5 rounded-full hover:text-white hover:bg-white/[0.08] transition-all"
          >
            Arsenal
          </a>
          <a
            href="#certifications"
            className="px-3.5 py-1.5 rounded-full hover:text-white hover:bg-white/[0.08] transition-all"
          >
            Credentials
          </a>
        </div>

        {/* Action Button: Apple Frosted Pill */}
        <div className="flex items-center gap-2">
          <a
            href="#contact"
            className="inline-flex items-center gap-1.5 px-4 py-1.5 sm:px-4.5 sm:py-2 rounded-full text-xs font-semibold bg-white text-black hover:bg-zinc-200 transition-all shadow-[0_4px_16px_rgba(255,255,255,0.2)]"
          >
            <span>Get in Touch</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </nav>
    </header>
  );
}
