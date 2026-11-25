"use client";

import React, { useState, useEffect } from "react";
import { Command, MapPin } from "lucide-react";

interface TopStatusStripProps {
  onOpenCommandPalette: () => void;
}

export function TopStatusStrip({ onOpenCommandPalette }: TopStatusStripProps) {
  const [timeStr, setTimeStr] = useState<string>("IST");

  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date();
        const formatted = now.toLocaleTimeString("en-US", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        });
        setTimeStr(`${formatted} IST`);
      } catch {
        setTimeStr("IST");
      }
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="w-full max-w-[1140px] mx-auto px-4 py-6 flex items-center justify-between text-xs font-mono text-[#86868B] select-none">
      {/* Left: Branding & Status */}
      <div className="flex items-center gap-3">
        <div className="w-7 h-7 rounded-xl bg-white/[0.08] border border-white/10 flex items-center justify-center font-bold text-[#F5F5F7] text-xs tracking-tight shadow-sm">
          VK
        </div>
        <div className="hidden sm:flex items-center gap-2">
          <span className="text-[#F5F5F7] font-semibold">Venu K</span>
          <span className="text-white/20">/</span>
          <span className="text-[#86868B]">Backend Developer — Python, DevOps &amp; AI</span>
        </div>
        <div className="sm:hidden text-[#F5F5F7] font-medium">
          Venu K
        </div>
      </div>

      {/* Right: Clock & Command Palette Trigger */}
      <div className="flex items-center gap-3 sm:gap-4">
        <div className="hidden md:flex items-center gap-1.5 text-[11px] text-[#86868B]">
          <MapPin className="w-3 h-3 text-[#32ADE6]" />
          <span>Tirupati, India</span>
          <span className="text-white/20">·</span>
          <span className="tabular-nums text-zinc-300">{timeStr}</span>
        </div>

        <button
          onClick={onOpenCommandPalette}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-[#F5F5F7] text-xs transition-all shadow-sm cursor-pointer group"
          title="Open Command Palette (⌘K)"
          aria-label="Open Command Palette (⌘K)"
        >
          <Command className="w-3 h-3 text-[#32ADE6] group-hover:scale-110 transition-transform" />
          <span className="text-[11px] font-medium hidden sm:inline">Search</span>
          <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-[10px] font-mono text-zinc-300">
            ⌘K
          </kbd>
        </button>
      </div>
    </header>
  );
}
