"use client";

import { motion } from "framer-motion";

export default function HorizonLine() {
  return (
    <div className="w-full h-[1px] bg-transparent flex justify-center py-8">
      <div className="container mx-auto max-w-6xl px-6 relative h-[1px]">
        <div className="absolute inset-x-6 top-0 h-[1px] bg-charcoal/5" />
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-x-6 top-0 h-[1px] bg-gold origin-left"
        />
      </div>
    </div>
  );
}
