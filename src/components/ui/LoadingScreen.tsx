"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

// Deterministic scatter data for "Desert Horizon" (13 characters, excluding space)
const scatterData = [
  { x: -150, y: -200, rotate: -75, color: "#D4A64A" }, // D (Gold)
  { x: 200, y: -150, rotate: 45, color: "#E9D7B7" },   // e (Sand)
  { x: -100, y: 250, rotate: 120, color: "#4A1E14" },  // s (Mahogany)
  { x: 250, y: 150, rotate: -90, color: "#D4A64A" },   // e (Gold)
  { x: -250, y: -50, rotate: 60, color: "#E9D7B7" },   // r (Sand)
  { x: 150, y: 200, rotate: -120, color: "#4A1E14" },  // t (Mahogany)
  { x: 0, y: 0, rotate: 0, color: "#FAF9F6" },         // (space) - not rendered
  { x: -200, y: 150, rotate: 90, color: "#D4A64A" },   // H (Gold)
  { x: 150, y: -250, rotate: -45, color: "#E9D7B7" },  // o (Sand)
  { x: -150, y: -100, rotate: 180, color: "#4A1E14" }, // r (Mahogany)
  { x: 200, y: 100, rotate: -60, color: "#D4A64A" },   // i (Gold)
  { x: -200, y: 200, rotate: 45, color: "#E9D7B7" },   // z (Sand)
  { x: 100, y: -150, rotate: -135, color: "#4A1E14" }, // o (Mahogany)
  { x: 250, y: -50, rotate: 75, color: "#D4A64A" },    // n (Gold)
];

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const text = "Desert Horizon";
  const chars = text.split("");

  useEffect(() => {
    // Increase loading time slightly to allow the majestic animation to play
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2800);
    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 1.2, delay: 2.2, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-charcoal pointer-events-none"
    >
      <motion.h1 
        className="text-4xl md:text-[4rem] font-serif mb-10 tracking-widest flex justify-center"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 1 },
          visible: {
            transition: { staggerChildren: 0.05, delayChildren: 0.1 }
          }
        }}
      >
        {chars.map((char, index) => {
          if (char === " ") {
            return <span key={index} className="w-4 md:w-8 block"></span>;
          }

          const data = scatterData[index] || { x: 0, y: 0, rotate: 0, color: "#FAF9F6" };

          return (
            <motion.span
              key={index}
              className="inline-block drop-shadow-lg"
              variants={{
                hidden: { 
                  opacity: 0, 
                  x: data.x, 
                  y: data.y, 
                  rotate: data.rotate, 
                  scale: 0.2,
                  color: data.color,
                  filter: "blur(10px)"
                },
                visible: { 
                  opacity: 1, 
                  x: 0, 
                  y: 0, 
                  rotate: 0, 
                  scale: 1,
                  color: "#FAF9F6", // Final color is warm-white
                  filter: "blur(0px)",
                  transition: { 
                    duration: 1.5, 
                    ease: [0.16, 1, 0.3, 1] // Custom snappy spring-like ease
                  } 
                }
              }}
            >
              {char}
            </motion.span>
          );
        })}
      </motion.h1>
      
      {/* The golden line drawing effect */}
      <div className="w-48 md:w-80 h-[2px] bg-white/5 relative overflow-hidden rounded-full">
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: "0%" }}
          transition={{ duration: 1.8, delay: 0.4, ease: [0.76, 0, 0.24, 1] }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-gold to-gold"
        />
      </div>
    </motion.div>
  );
}
