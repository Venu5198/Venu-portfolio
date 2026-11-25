"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

interface LiquidGlassPillProps {
  children: React.ReactNode;
  theme?: "light" | "dark";
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
  as?: "div" | "button" | "a";
  href?: string;
  target?: string;
  rel?: string;
  "data-cursor"?: string;
  title?: string;
}

export function LiquidGlassPill({
  children,
  theme = "light",
  className = "",
  onClick,
  as = "div",
  href,
  target,
  rel,
  "data-cursor": dataCursor,
  title,
}: LiquidGlassPillProps) {
  const containerRef = useRef<HTMLElement | null>(null);
  const [glintPos, setGlintPos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setGlintPos({ x, y });
  };

  const isLight = theme === "light";

  const Component = motion[as] as any;

  return (
    <Component
      ref={containerRef}
      href={href}
      target={target}
      rel={rel}
      onClick={onClick}
      title={title}
      data-cursor={dataCursor}
      onPointerMove={handlePointerMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.02, transition: { type: "spring", stiffness: 450, damping: 25 } }}
      whileTap={{ scale: 0.97 }}
      className={`relative inline-flex items-center justify-center overflow-hidden rounded-full transition-all ${
        isLight
          ? "bg-white/80 text-[#0A0A0A] border-2 border-[#0A0A0A] shadow-[3px_3px_0px_#0A0A0A]"
          : "bg-[#121217]/70 text-zinc-100 border border-white/15 shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
      } backdrop-blur-2xl backdrop-saturate-150 ${className}`}
      style={{
        boxShadow: isLight
          ? isHovered
            ? "-2px 0 0 #00F0FF, 2px 0 0 #FF0055, 3.5px 3.5px 0 #0A0A0A"
            : "inset 0 1.5px 1px 0 rgba(255,255,255,0.9), 3px 3px 0px #0A0A0A"
          : isHovered
          ? "0 0 25px rgba(6,182,212,0.35), inset 0 1px 1px 0 rgba(255,255,255,0.25)"
          : "inset 0 1px 1px 0 rgba(255,255,255,0.12), 0 8px 32px rgba(0,0,0,0.45)",
      }}
    >
      {/* Specular Glint Refraction Layer (dashersw/liquid-glass-js inspired) */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          opacity: isHovered ? 0.85 : 0.35,
          background: `radial-gradient(circle 80px at ${glintPos.x}% ${glintPos.y}%, ${
            isLight ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.25)"
          }, transparent 70%)`,
        }}
      />

      {/* Iridescent Edge Flare */}
      <div
        className="pointer-events-none absolute -inset-px rounded-full opacity-40 transition-opacity duration-300"
        style={{
          opacity: isHovered ? 0.7 : 0.2,
          background: isLight
            ? `linear-gradient(${glintPos.x * 3.6}deg, rgba(0,240,255,0.4), rgba(255,0,85,0.4))`
            : `linear-gradient(${glintPos.x * 3.6}deg, rgba(6,182,212,0.3), rgba(168,85,247,0.3))`,
        }}
      />

      <span className="relative z-10 flex items-center gap-1.5">{children}</span>
    </Component>
  );
}
