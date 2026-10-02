"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import HorizonLine from "@/components/ui/HorizonLine";

export default function AboutClient() {
  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const heroScale = useTransform(heroScroll, [0, 1], [1, 1.1]);
  const heroOpacity = useTransform(heroScroll, [0, 1], [1, 0]);
  const heroY = useTransform(heroScroll, [0, 1], [0, 100]);

  return (
    <div className="flex flex-col w-full overflow-hidden bg-canvas-parchment">
      
      {/* 1. Cinematic Hero */}
      <section ref={heroRef} className="relative h-[60vh] w-full flex items-center justify-center overflow-hidden bg-charcoal">
        <motion.div 
          style={{ scale: heroScale, y: heroY }} 
          className="absolute inset-0 w-full h-full"
        >
          <Image
            src="/images/home-hero.webp"
            alt="Our Story"
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
          <span className="text-sm uppercase tracking-[0.3em] mb-6 block text-gold">Heritage & Hospitality</span>
          <h1 className="text-5xl md:text-7xl font-serif leading-tight">
            Our Story
          </h1>
        </motion.div>
      </section>

      <HorizonLine />

      {/* 2. The Legacy Quote */}
      <section className="py-32 px-6 text-center max-w-4xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-serif text-brown leading-relaxed mb-12"
        >
          "We didn't just build a camp in the desert; we curated an experience that honors the ancient sands of Rajasthan."
        </motion.h2>
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 1 }}
          className="flex justify-center"
        >
          <div className="w-16 h-px bg-gold" />
        </motion.div>
      </section>

      {/* 3. Story Content */}
      <section className="py-24 px-6 bg-white/50">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <h3 className="text-3xl font-serif text-brown">Rooted in Tradition</h3>
              <p className="text-brown/80 text-lg leading-relaxed">
                Desert Horizon was born from a deep love for the Thar Desert. Our founders, native to Jaisalmer, envisioned a sanctuary where global travelers could experience authentic Rajputana hospitality without sacrificing modern luxury.
              </p>
              <p className="text-brown/80 text-lg leading-relaxed">
                Every tent, every meal, and every safari is carefully designed to immerse you in the local culture while ensuring your utmost comfort and safety.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1 }}
              className="relative h-[600px] w-full rounded-sm overflow-hidden shadow-2xl"
            >
              <Image 
                src="/images/home-hero.webp" 
                alt="Hospitality" 
                fill 
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      <HorizonLine />
      
      {/* 4. Values */}
      <section className="py-32 px-6 bg-charcoal text-warm-white text-center">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-serif text-gold mb-16">Our Promise</h2>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { title: "Authenticity", desc: "True Rajasthani culture in every detail." },
              { title: "Sustainability", desc: "Eco-conscious practices to protect the dunes." },
              { title: "Luxury", desc: "Uncompromising comfort in the wild." }
            ].map((value, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="space-y-4"
              >
                <div className="w-12 h-12 border border-gold rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-gold font-serif text-xl">{idx + 1}</span>
                </div>
                <h4 className="uppercase tracking-widest text-sm font-semibold">{value.title}</h4>
                <p className="text-white/60 text-sm leading-relaxed">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
