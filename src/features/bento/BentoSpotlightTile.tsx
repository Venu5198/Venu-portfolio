"use client";

import React, { useRef, useState } from "react";

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
      className={`group relative overflow-hidden rounded-3xl bg-[#1C1C1E]/65 backdrop-blur-2xl border border-white/10 p-6 sm:p-8 transition-colors duration-200 hover:border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.6)] ${className}`}
    >
      {/* Radial Cursor-Tracking Spotlight */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(600px circle at var(--x) var(--y), rgba(50, 173, 230, 0.09), transparent 40%)`,
        }}
      />
      <div className="relative z-10 h-full flex flex-col justify-between">{children}</div>
    </div>
  );
}
