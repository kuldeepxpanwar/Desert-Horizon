"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isMounted, setIsMounted] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isHidden, setIsHidden] = useState(true); // Hidden until mouse moves

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Smooth springs for the cursor follow effect
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    setIsMounted(true);

    // Hide on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (isHidden) setIsHidden(false);
    };

    const handleMouseLeave = () => setIsHidden(true);
    const handleMouseEnter = () => setIsHidden(false);

    window.addEventListener("mousemove", moveCursor);
    document.body.addEventListener("mouseleave", handleMouseLeave);
    document.body.addEventListener("mouseenter", handleMouseEnter);

    // Track hovered elements (a, button, input)
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check if it's an interactive element or inside one
      const isInteractive = target.closest("a, button, input, select, textarea, [role='button'], label");
      setIsHovering(!!isInteractive);
    };

    window.addEventListener("mouseover", handleMouseOver);

    // Hide default cursor site-wide on non-touch
    document.body.style.cursor = "none";
    
    // Make sure we apply cursor: none to interactive elements too, otherwise they show the hand pointer
    const style = document.createElement("style");
    style.innerHTML = `
      @media (hover: hover) and (pointer: fine) {
        * { cursor: none !important; }
      }
    `;
    document.head.appendChild(style);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
      document.body.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("mouseover", handleMouseOver);
      document.body.style.cursor = "auto";
      document.head.removeChild(style);
    };
  }, [cursorX, cursorY, isHidden]);

  if (!isMounted) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 z-[9999] pointer-events-none rounded-full flex items-center justify-center mix-blend-difference hidden md:flex"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        translateX: "-50%",
        translateY: "-50%",
      }}
    >
      {/* Outer Ring */}
      <motion.div
        animate={{
          width: isHovering ? 64 : 40,
          height: isHovering ? 64 : 40,
          opacity: isHidden ? 0 : 1,
          borderWidth: isHovering ? "2px" : "1px",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="absolute rounded-full border-[#FDFBF7]"
      />
      
      {/* Inner Dot */}
      <motion.div
        animate={{
          width: isHovering ? 8 : 4,
          height: isHovering ? 8 : 4,
          opacity: isHidden ? 0 : isHovering ? 0 : 1, // Inner dot disappears on hover
        }}
        transition={{ duration: 0.15 }}
        className="absolute rounded-full bg-[#FDFBF7]"
      />
    </motion.div>
  );
}
