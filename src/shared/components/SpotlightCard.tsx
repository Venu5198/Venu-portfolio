"use client";

import React, { useRef, useState } from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "../utils/cn";

interface SpotlightCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
}

export function SpotlightCard({
  children,
  className,
  spotlightColor = "rgba(6, 182, 212, 0.15)",
  ...props
}: SpotlightCardProps) {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseEnter = () => setOpacity(1);
  const handleMouseLeave = () => setOpacity(0);

  return (
    <motion.div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "relative rounded-3xl bg-[#0f0f15]/80 backdrop-blur-2xl border border-white/[0.08] overflow-hidden transition-all duration-300",
        className
      )}
      {...props}
    >
      {/* Mouse-Tracking Radial Spotlight */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 45%)`,
        }}
      />

      {/* Subtle Architectural Corner Ticks */}
      <div className="pointer-events-none absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-white/20" />
      <div className="pointer-events-none absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-white/20" />
      <div className="pointer-events-none absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-white/20" />
      <div className="pointer-events-none absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-white/20" />

      {/* Card Content */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
