"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const navItems = [
  { id: "projects", label: "Projects" },
  { id: "architecture", label: "Architecture" },
  { id: "arsenal", label: "Arsenal" },
  { id: "certifications", label: "Credentials" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [activeSection, setActiveSection] = useState<string>("hero");

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
          } else if (currentScrollY > lastScrollY && currentScrollY - lastScrollY > 10) {
            setVisible(false);
          } else if (lastScrollY - currentScrollY > 8) {
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

  // Track active section for fluid nav pill indicator
  useEffect(() => {
    const sectionIds = ["hero", "projects", "architecture", "arsenal", "certifications", "contact"];
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(id);
            }
          });
        },
        { rootMargin: "-30% 0px -50% 0px" }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-3 sm:pt-4 pointer-events-none transition-all duration-300 ${
        visible ? "translate-y-0 opacity-100" : "-translate-y-20 opacity-0"
      }`}
    >
      <nav
        className={`pointer-events-auto flex items-center justify-between w-full max-w-4xl px-3 sm:px-4 py-2 rounded-full transition-all duration-300 liquid-glass ${
          scrolled ? "shadow-[0_20px_50px_rgba(0,0,0,0.85)] border-white/[0.16]" : "border-white/[0.12]"
        }`}
      >
        {/* Brand Hardware Emblem */}
        <a
          href="#hero"
          className="flex items-center gap-2.5 group px-1 text-sm font-semibold tracking-tight shrink-0"
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

        {/* Apple Segmented Nav Pill Links with Fluid Spring Slider */}
        <div className="hidden md:flex items-center gap-1 text-xs font-medium text-zinc-300 relative">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`relative px-3.5 py-1.5 rounded-full transition-colors ${
                  isActive ? "text-white font-semibold" : "text-zinc-400 hover:text-white"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavPill"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    className="absolute inset-0 rounded-full bg-white/[0.1] border border-white/[0.15] -z-10"
                  />
                )}
                <span>{item.label}</span>
              </a>
            );
          })}
        </div>

        {/* Action Button: Apple Frosted Pill */}
        <div className="flex items-center gap-2">
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs font-semibold bg-white text-black hover:bg-zinc-200 transition-colors shadow-[0_4px_16px_rgba(255,255,255,0.2)]"
          >
            <span>Get in Touch</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </motion.a>
        </div>
      </nav>
    </header>
  );
}
