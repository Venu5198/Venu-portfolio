"use client";

import React, { useRef, useState } from "react";
import { useTheme } from "@/shared/context/ThemeContext";

interface BentoSpotlightTileProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export function BentoSpotlightTile({
  children,
  className = "",
  id,
}: BentoSpotlightTileProps) {
  const { theme } = useTheme();
  const tileRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!tileRef.current) return;
    const rect = tileRef.current.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const isDark = theme === "dark";

  return (
    <div
      id={id}
      ref={tileRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={
        {
          "--x": `${coords.x}px`,
          "--y": `${coords.y}px`,
        } as React.CSSProperties
      }
      className={`group relative overflow-hidden rounded-[2rem] transition-all duration-300 p-6 sm:p-8 ${
        isDark
          ? "bg-[#121216]/85 backdrop-blur-2xl border border-white/10 hover:border-white/20 shadow-[0_12px_36px_-8px_rgba(0,0,0,0.8)]"
          : "bg-white/95 backdrop-blur-2xl border border-black/[0.08] hover:border-black/[0.16] shadow-[0_8px_30px_rgba(0,0,0,0.06)]"
      } ${className}`}
    >
      {/* Radial Cursor-Tracking Spotlight */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: isDark
            ? `radial-gradient(600px circle at var(--x) var(--y), rgba(50, 173, 230, 0.09), transparent 40%)`
            : `radial-gradient(600px circle at var(--x) var(--y), rgba(0, 122, 255, 0.06), transparent 40%)`,
        }}
      />
      <div className="relative z-10 h-full flex flex-col justify-between">{children}</div>
    </div>
  );
}
