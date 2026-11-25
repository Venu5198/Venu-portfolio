"use client";

import React from "react";
import { BentoGrid } from "@/features/bento/BentoGrid";

export function PortfolioShell() {
  return (
    <main className="relative min-h-screen w-full max-w-full bg-[#000000] text-[#F5F5F7] selection:bg-[#32ADE6]/25 selection:text-white">
      <BentoGrid />
    </main>
  );
}
