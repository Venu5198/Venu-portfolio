"use client";

import React from "react";
import { cn } from "../utils/cn";
import { motion, HTMLMotionProps } from "framer-motion";

interface GlassCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
  glow?: "cyan" | "emerald" | "amber" | "purple" | "none";
  interactive?: boolean;
}

export function GlassCard({
  children,
  className,
  glow = "none",
  interactive = false,
  ...props
}: GlassCardProps) {
  const glowStyles = {
    cyan: "hover:border-cyan-500/40 hover:shadow-[0_0_30px_-5px_rgba(6,182,212,0.18)]",
    emerald: "hover:border-emerald-500/40 hover:shadow-[0_0_30px_-5px_rgba(16,185,129,0.18)]",
    amber: "hover:border-amber-500/40 hover:shadow-[0_0_30px_-5px_rgba(245,158,11,0.18)]",
    purple: "hover:border-purple-500/40 hover:shadow-[0_0_30px_-5px_rgba(168,85,247,0.18)]",
    none: "hover:border-white/20",
  };

  return (
    <motion.div
      className={cn(
        "relative rounded-2xl bg-[#121217]/70 backdrop-blur-xl border border-white/[0.08] p-6 transition-all duration-300",
        interactive && "cursor-pointer",
        glowStyles[glow],
        className
      )}
      {...props}
    >
      {/* Corner architectural ticks */}
      <div className="pointer-events-none absolute top-0 left-0 w-2 h-2 border-t border-l border-white/20" />
      <div className="pointer-events-none absolute top-0 right-0 w-2 h-2 border-t border-r border-white/20" />
      <div className="pointer-events-none absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/20" />
      <div className="pointer-events-none absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/20" />
      {children}
    </motion.div>
  );
}
