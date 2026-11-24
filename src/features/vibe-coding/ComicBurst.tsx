"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface ComicBurstItem {
  id: number;
  text: string;
  x?: number;
  y?: number;
  color?: string;
  rotate?: number;
}

interface ComicBurstProps {
  bursts: ComicBurstItem[];
}

export function ComicBurst({ bursts }: ComicBurstProps) {
  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      <AnimatePresence>
        {bursts.map((b) => (
          <motion.div
            key={b.id}
            initial={{ opacity: 0, scale: 0.2, rotate: (b.rotate ?? -8) - 15 }}
            animate={{
              opacity: [0, 1, 1, 1, 0],
              scale: [0.2, 1.3, 1, 1.05, 0.8],
              rotate: [b.rotate ?? -8, (b.rotate ?? -8) + 8, (b.rotate ?? -8) - 4, (b.rotate ?? -8)],
              y: [0, -10, -25],
            }}
            transition={{
              duration: 0.9,
              times: [0, 0.2, 0.6, 0.85, 1],
              ease: (t: number) => Math.floor(t * 5) / 5,
            }}
            style={{
              left: b.x ? `${b.x}px` : "50%",
              top: b.y ? `${b.y}px` : "40%",
              transform: "translate(-50%, -50%)",
            }}
            className="fixed select-none z-50"
          >
            <div
              className="px-5 py-2.5 rounded-xl border-[3px] border-[#09090B] shadow-[-3px_0_0_#00F0FF,3px_0_0_#FF0055,6px_6px_0px_#09090B] font-comic text-xl sm:text-2xl font-black uppercase tracking-wider text-[#09090B]"
              style={{ backgroundColor: b.color || "#FDE047" }}
            >
              <span className="spider-rgb-headline-sm">{b.text}</span>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
