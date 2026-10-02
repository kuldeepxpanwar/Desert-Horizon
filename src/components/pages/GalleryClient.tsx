"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import HorizonLine from "@/components/ui/HorizonLine";
import Button from "@/components/ui/Button";

export default function GalleryClient() {
  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const heroScale = useTransform(heroScroll, [0, 1], [1, 1.1]);
  const heroOpacity = useTransform(heroScroll, [0, 1], [1, 0]);
  const heroY = useTransform(heroScroll, [0, 1], [0, 100]);

  const images = [
    "/images/gallery-mix.webp",
    "/images/gallery-mix.webp",
    "/images/gallery-mix.webp",
    "/images/gallery-mix.webp",
    "/images/gallery-mix.webp",
    "/images/gallery-mix.webp"
  ];

  return (
    <div className="flex flex-col w-full overflow-hidden bg-canvas-parchment">
      
      {/* 1. Cinematic Hero */}
      <section ref={heroRef} className="relative h-[60vh] w-full flex items-center justify-center overflow-hidden bg-charcoal">
        <motion.div 
          style={{ scale: heroScale, y: heroY }} 
          className="absolute inset-0 w-full h-full"
        >
          <Image
            src="/images/gallery-mix.webp"
            alt="Gallery"
            fill
            priority
            className="object-cover object-center"
          />
        </motion.div>
        <div className="absolute inset-0 bg-black/50" />
        <motion.div 
          style={{ opacity: heroOpacity }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 text-center text-warm-white px-6 mt-20"
        >
          <span className="text-sm uppercase tracking-[0.3em] mb-6 block text-gold">Visual Journey</span>
          <h1 className="text-5xl md:text-7xl font-serif leading-tight">
            The Gallery
          </h1>
        </motion.div>
      </section>

      <HorizonLine />

      {/* 2. Masonry Gallery */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {images.map((src, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: (idx % 3) * 0.2 }}
                className="relative overflow-hidden group cursor-pointer rounded-sm shadow-lg break-inside-avoid"
              >
                <motion.div
                  whileHover={{ scale: 1.05, rotate: idx % 2 === 0 ? 1 : -1 }}
                  transition={{ duration: 0.6 }}
                  className="relative"
                >
                  {/* Using standard img here for auto-height in masonry, Next/Image requires fixed height/aspect ratio unless we use specific layout hacks */}
                  <img src={src} alt="Desert Horizon" className="w-full h-auto object-cover block" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
                </motion.div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-20 text-center">
            <Button variant="ghost">Load More</Button>
          </div>
        </div>
      </section>

    </div>
  );
}
