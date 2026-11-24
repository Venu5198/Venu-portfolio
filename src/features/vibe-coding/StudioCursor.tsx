"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function StudioCursor() {
  const [enabled, setEnabled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [cursorText, setCursorText] = useState("");
  const [isClicked, setIsClicked] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth spring physics for outer ring lag
  const springConfig = { stiffness: 450, damping: 28, mass: 0.5 };
  const ringX = useSpring(mouseX, springConfig);
  const ringY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Only enable on desktop devices with a fine pointer (mouse/trackpad)
    if (typeof window === "undefined") return;
    const mediaQuery = window.matchMedia("(pointer: fine)");
    if (!mediaQuery.matches) return;

    setEnabled(true);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      // If hovering over input, textarea, or contenteditable, hide custom cursor to keep native text caret
      if (target.closest("input, textarea, select, [contenteditable='true']")) {
        setIsVisible(false);
        return;
      } else {
        setIsVisible(true);
      }

      // Check for custom cursor action text
      const cursorTarget = target.closest("[data-cursor]") as HTMLElement | null;
      if (cursorTarget) {
        setIsHovering(true);
        setCursorText(cursorTarget.getAttribute("data-cursor") || "CLICK ⚡");
      } else if (target.closest("button, a, [role='button']")) {
        setIsHovering(true);
        setCursorText("");
      } else {
        setIsHovering(false);
        setCursorText("");
      }
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [isVisible, mouseX, mouseY]);

  if (!enabled || !isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[999999] overflow-hidden">
      {/* 1. Instant Ink Crosshair / Dot at exact mouse position */}
      <motion.div
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        className="fixed w-2 h-2 rounded-full bg-[#0A0A0A] pointer-events-none"
      />

      {/* 2. Spring-Lagged Outer Ring / Comic Action Pill with Chromatic Offset */}
      <motion.div
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isClicked ? 0.85 : isHovering ? 1.08 : 1,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 25 }}
        className="fixed pointer-events-none flex items-center justify-center"
      >
        {isHovering && cursorText ? (
          /* Comic Action Pill */
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="px-3 py-1 rounded-full bg-[#C6FF00] border-2 border-[#0A0A0A] shadow-[2.5px_2.5px_0px_#0A0A0A] rotate-[-4deg] flex items-center gap-1.5"
            style={{
              boxShadow: "-1.5px 0 0 #00F0FF, 1.5px 0 0 #FF0055, 3px 3px 0 #0A0A0A",
            }}
          >
            <span className="font-mono text-[10px] font-black text-[#0A0A0A] tracking-wider uppercase whitespace-nowrap">
              {cursorText}
            </span>
          </motion.div>
        ) : (
          /* Spring-Lagged Outer Ring with Cyan / Magenta Chromatic Aberration */
          <div
            className={`rounded-full border-2 border-[#0A0A0A] transition-all duration-150 ${
              isHovering ? "w-10 h-10 bg-[#C6FF00]/25" : "w-8 h-8 bg-transparent"
            }`}
            style={{
              boxShadow: "-2px 0 0 #00F0FF, 2px 0 0 #FF0055, 2.5px 2.5px 0 #0A0A0A",
            }}
          />
        )}
      </motion.div>
    </div>
  );
}
