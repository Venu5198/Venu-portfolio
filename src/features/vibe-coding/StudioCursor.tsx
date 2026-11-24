"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function StudioCursor() {
  const [enabled, setEnabled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [cursorText, setCursorText] = useState("");
  const [isClicked, setIsClicked] = useState(false);
  const [isOverInput, setIsOverInput] = useState(false);

  // Exact pointer coordinates for instant 0ms inner dot tracking
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Ultra-snappy spring physics for outer ring: high stiffness, low mass = zero lag
  const springConfig = { stiffness: 800, damping: 38, mass: 0.12 };
  const ringX = useSpring(mouseX, springConfig);
  const ringY = useSpring(mouseY, springConfig);

  // Persistent reference to the last known pointer position for scroll updates
  const lastPosRef = useRef({ x: -100, y: -100 });

  // Target evaluation helper
  const updateTargetState = useCallback((target: Element | null) => {
    if (!target) {
      setIsHovering(false);
      setCursorText("");
      setIsOverInput(false);
      return;
    }

    // 1. Text input detection: cleanly hide custom cursor so native text caret is 100% visible
    const isInput = !!target.closest("input, textarea, select, [contenteditable='true']");
    setIsOverInput(isInput);

    if (isInput) {
      setIsHovering(false);
      setCursorText("");
      return;
    }

    // 2. Custom action text detection
    const cursorTarget = target.closest("[data-cursor]") as HTMLElement | null;
    if (cursorTarget) {
      setIsHovering(true);
      setCursorText(cursorTarget.getAttribute("data-cursor") || "CLICK ⚡");
      return;
    }

    // 3. Standard clickable targets
    const isClickable = !!target.closest("a, button, [role='button'], summary");
    if (isClickable) {
      setIsHovering(true);
      setCursorText("");
      return;
    }

    // Default resting state
    setIsHovering(false);
    setCursorText("");
  }, []);

  useEffect(() => {
    // Only activate on desktop devices with a fine pointer (mouse/trackpad)
    if (typeof window === "undefined") return;
    const mediaQuery = window.matchMedia("(pointer: fine)");
    if (!mediaQuery.matches) return;

    setEnabled(true);

    const handlePointerMove = (e: PointerEvent | MouseEvent) => {
      const { clientX, clientY } = e;
      mouseX.set(clientX);
      mouseY.set(clientY);
      lastPosRef.current = { x: clientX, y: clientY };

      setIsVisible(true);

      const target = (e.target as Element | null) || document.elementFromPoint(clientX, clientY);
      updateTargetState(target);
    };

    const handlePointerDown = () => setIsClicked(true);
    const handlePointerUp = (e: PointerEvent | MouseEvent) => {
      setIsClicked(false);
      // Re-evaluate target on pointerup in case modal opened or DOM changed
      const target = document.elementFromPoint(e.clientX, e.clientY);
      updateTargetState(target);
    };

    const handleScroll = () => {
      // Keep hover states in sync while scrolling without needing mousemove
      if (lastPosRef.current.x >= 0 && lastPosRef.current.y >= 0) {
        const target = document.elementFromPoint(lastPosRef.current.x, lastPosRef.current.y);
        updateTargetState(target);
      }
    };

    const handleMouseLeave = (e: MouseEvent) => {
      // Only hide if the cursor actually exited the browser viewport window
      if (
        e.clientY <= 0 ||
        e.clientX <= 0 ||
        e.clientX >= window.innerWidth ||
        e.clientY >= window.innerHeight
      ) {
        setIsVisible(false);
        setIsHovering(false);
        setCursorText("");
      }
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Global listeners on window and document
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("mousemove", handlePointerMove, { passive: true });
    window.addEventListener("pointerdown", handlePointerDown, { passive: true });
    window.addEventListener("pointerup", handlePointerUp, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true, capture: true });
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);
    document.documentElement.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("scroll", handleScroll, { capture: true });
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
      document.documentElement.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [mouseX, mouseY, updateTargetState]);

  if (!enabled || !isVisible) return null;

  return (
    <div
      data-cursor-layer="true"
      className="fixed inset-0 z-[9999] pointer-events-none select-none overflow-hidden"
      style={{
        opacity: isOverInput ? 0 : 1,
        transition: "opacity 0.15s ease",
      }}
    >
      {/* 1. Instant Ink Crosshair / Dot at exact mouse position */}
      <motion.div
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        className="fixed w-2 h-2 rounded-full bg-[#0A0A0A] pointer-events-none select-none"
      />

      {/* 2. Spring-Lagged Outer Ring / Comic Action Pill with Chromatic Aberration */}
      <motion.div
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isClicked ? 0.82 : isHovering ? 1.05 : 1,
        }}
        transition={{ type: "spring", stiffness: 600, damping: 30 }}
        className="fixed pointer-events-none select-none flex items-center justify-center"
      >
        {isHovering && cursorText ? (
          /* Comic Action Pill */
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="px-3 py-1 rounded-full bg-[#C6FF00] border-2 border-[#0A0A0A] shadow-[2.5px_2.5px_0px_#0A0A0A] rotate-[-4deg] flex items-center gap-1.5 pointer-events-none select-none"
            style={{
              boxShadow: "-1.5px 0 0 #00F0FF, 1.5px 0 0 #FF0055, 3px 3px 0 #0A0A0A",
            }}
          >
            <span className="font-mono text-[10px] font-black text-[#0A0A0A] tracking-wider uppercase whitespace-nowrap pointer-events-none select-none">
              {cursorText}
            </span>
          </motion.div>
        ) : (
          /* Spring-Lagged Outer Ring with Cyan / Magenta Chromatic Aberration */
          <div
            className={`rounded-full border-2 border-[#0A0A0A] pointer-events-none select-none transition-all duration-150 ${
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
