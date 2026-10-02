"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function DuneParallax() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Different speeds for parallax
  const yBack = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const yMid = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const yFront = useTransform(scrollYProgress, [0, 1], [0, -20]);

  return (
    <div ref={containerRef} className="absolute bottom-0 left-0 w-full h-[40vh] pointer-events-none overflow-hidden z-20">
      
      {/* Back Dune */}
      <motion.div style={{ y: yBack }} className="absolute bottom-0 left-0 w-[150%] h-[30vh]">
        <svg viewBox="0 0 1440 320" preserveAspectRatio="none" className="w-full h-full fill-[#cf885a]/40">
          <path d="M0,256L80,240C160,224,320,192,480,186.7C640,181,800,203,960,197.3C1120,192,1280,160,1360,144L1440,128L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z" />
        </svg>
      </motion.div>

      {/* Mid Dune */}
      <motion.div style={{ y: yMid }} className="absolute -bottom-10 -left-10 w-[120%] h-[35vh]">
        <svg viewBox="0 0 1440 320" preserveAspectRatio="none" className="w-full h-full fill-[#b06f47]/60">
          <path d="M0,192L60,181.3C120,171,240,149,360,160C480,171,600,213,720,218.7C840,224,960,192,1080,170.7C1200,149,1320,139,1380,133.3L1440,128L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z" />
        </svg>
      </motion.div>

      {/* Front Dune */}
      <motion.div style={{ y: yFront }} className="absolute -bottom-20 left-0 w-[110%] h-[40vh]">
        <svg viewBox="0 0 1440 320" preserveAspectRatio="none" className="w-full h-full fill-[#8f5736]">
          <path d="M0,128L120,144C240,160,480,192,720,186.7C960,181,1200,139,1320,117.3L1440,96L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z" />
        </svg>
      </motion.div>

    </div>
  );
}
