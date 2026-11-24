"use client";

import React from "react";
import { motion } from "framer-motion";

interface VibeMarqueeProps {
  items?: string[];
  direction?: "left" | "right";
  color?: string;
  rotate?: string;
}

const defaultItems = [
  "PYTHON FASTAPI ⚡",
  "REDIS ECHO GUARDS 🛡️",
  "KUBERNETES FLEET 🐳",
  "ZERO-DOWNTIME DEPLOYS ⚡",
  "NO CAP 99.98% SLA 🧢❌",
  "LET HIM COOK (IN PROD) 🍳",
  "CHRONICALLY ONLINE BACKEND 🌐",
  "1,000+ CONNECTORS 🔌",
  "MAIN CHARACTER MICROSERVICES ⚡",
  "DELULU-FREE INFRA 🧘",
  "BUILT WITH TEAM 🤝",
  "GITOPS CERTIFIED 🚀",
];

export function VibeMarquee({
  items = defaultItems,
  direction = "left",
  color = "#C6FF00",
  rotate = "-rotate-1",
}: VibeMarqueeProps) {
  return (
    <div
      className={`py-3.5 my-10 overflow-hidden border-y-2 border-[#0A0A0A] bg-white select-none relative ${rotate} hover:rotate-0 transition-transform shadow-[0_4px_0px_#0A0A0A] z-10`}
    >
      <motion.div
        animate={{
          x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"],
        }}
        transition={{
          duration: 24,
          repeat: Infinity,
          ease: "linear",
        }}
        className="flex whitespace-nowrap gap-6 font-mono text-xs sm:text-sm font-black uppercase text-[#0A0A0A]"
      >
        {[...items, ...items, ...items, ...items].map((item, idx) => (
          <span key={idx} className="flex items-center gap-3">
            <span
              className="px-3.5 py-1 rounded-full border-2 border-[#0A0A0A] shadow-[2px_2px_0px_#0A0A0A] text-[#0A0A0A] tracking-wider"
              style={{ backgroundColor: color }}
            >
              {item}
            </span>
            <span className="text-[#0A0A0A] font-black text-xs">★</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
