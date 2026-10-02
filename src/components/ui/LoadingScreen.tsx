"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 2 second loading screen
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.8, delay: 1.8, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-charcoal text-warm-white pointer-events-none"
    >
      <motion.h1 
        className="text-4xl md:text-5xl font-serif mb-6 tracking-wide flex justify-center gap-x-2"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 1 },
          visible: {
            transition: { staggerChildren: 0.08, delayChildren: 0.2 }
          }
        }}
      >
        {"Desert Horizon".split(" ").map((word, wordIndex) => (
          <span key={wordIndex} className="flex">
            {word.split("").map((letter, letterIndex) => (
              <motion.span
                key={letterIndex}
                variants={{
                  hidden: { opacity: 0, y: 15, filter: "blur(5px)" },
                  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: "easeOut" } }
                }}
              >
                {letter}
              </motion.span>
            ))}
          </span>
        ))}
      </motion.h1>
      
      {/* The golden line drawing effect */}
      <div className="w-48 md:w-64 h-[1px] bg-white/10 relative overflow-hidden">
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: "0%" }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.76, 0, 0.24, 1] }}
          className="absolute inset-0 bg-gold"
        />
      </div>
    </motion.div>
  );
}
