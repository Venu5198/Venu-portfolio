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

  // Snappy spring physics for outer ring: responsive follow with organic kinetic spring
  const springConfig = { stiffness: 650, damping: 32, mass: 0.18 };
  const ringX = useSpring(mouseX, springConfig);
  const ringY = useSpring(mouseY, springConfig);

  const isFirstMove = useRef(true);
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

    // 2. Explicit custom action text detection via data-cursor
    const cursorTarget = target.closest("[data-cursor]") as HTMLElement | null;
    if (cursorTarget) {
      const explicitText = cursorTarget.getAttribute("data-cursor");
      if (explicitText) {
        setIsHovering(true);
        setCursorText(explicitText);
        return;
      }
    }

    // 3. Links default to "OPEN ↗"
    if (target.closest("a")) {
      setIsHovering(true);
      setCursorText("OPEN ↗");
      return;
    }

    // 4. Buttons default to "CLICK ⚡"
    if (target.closest("button, [role='button'], summary")) {
      setIsHovering(true);
      setCursorText("CLICK ⚡");
      return;
    }

    // 5. Interactive clickable cards / pills with .cursor-pointer default to "VIEW ⚡"
    if (target.closest(".cursor-pointer")) {
      setIsHovering(true);
      setCursorText("VIEW ⚡");
      return;
    }

    // Default resting state: classic Spider-Verse ring + ink crosshair dot
    setIsHovering(false);
    setCursorText("");
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Support desktop mouse/trackpad even on hybrid Windows touchscreen devices
    const isPureMobile =
      window.matchMedia("(pointer: coarse)").matches &&
      !window.matchMedia("(any-pointer: fine)").matches &&
      window.innerWidth < 768;

    if (isPureMobile) return;

    setEnabled(true);
    document.documentElement.classList.add("has-custom-cursor");

    const handlePointerMove = (e: PointerEvent | MouseEvent) => {
      const { clientX, clientY } = e;

      // On first move, jump spring directly to avoid trailing from (-100, -100)
      if (isFirstMove.current) {
        mouseX.set(clientX);
        mouseY.set(clientY);
        ringX.jump(clientX);
        ringY.jump(clientY);
        isFirstMove.current = false;
      } else {
        mouseX.set(clientX);
        mouseY.set(clientY);
      }

      lastPosRef.current = { x: clientX, y: clientY };
      setIsVisible(true);

      const target = (e.target as Element | null) || document.elementFromPoint(clientX, clientY);
      updateTargetState(target);
    };

    const handlePointerDown = () => setIsClicked(true);
    const handlePointerUp = (e: PointerEvent | MouseEvent) => {
      setIsClicked(false);
      const target = document.elementFromPoint(e.clientX, e.clientY);
      updateTargetState(target);
    };

    const handleScroll = () => {
      if (lastPosRef.current.x >= 0 && lastPosRef.current.y >= 0) {
        const target = document.elementFromPoint(lastPosRef.current.x, lastPosRef.current.y);
        updateTargetState(target);
      }
    };

    const handleMouseLeave = (e: MouseEvent) => {
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

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("mousemove", handlePointerMove, { passive: true });
    window.addEventListener("pointerdown", handlePointerDown, { passive: true });
    window.addEventListener("pointerup", handlePointerUp, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true, capture: true });
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);
    document.documentElement.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("scroll", handleScroll, { capture: true });
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
      document.documentElement.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [mouseX, mouseY, ringX, ringY, updateTargetState]);

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
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-[#0A0A0A] pointer-events-none select-none"
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
        className="fixed top-0 left-0 pointer-events-none select-none flex items-center justify-center"
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
