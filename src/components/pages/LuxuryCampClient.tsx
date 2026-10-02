"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import HorizonLine from "@/components/ui/HorizonLine";
import Button from "@/components/ui/Button";
import { ArrowRight, Wifi, Coffee, Wind, Bath, BedDouble, Shield } from "lucide-react";

export default function LuxuryCampClient() {
  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const heroScale = useTransform(heroScroll, [0, 1], [1, 1.1]);
  const heroOpacity = useTransform(heroScroll, [0, 1], [1, 0]);
  const heroY = useTransform(heroScroll, [0, 1], [0, 100]);

  const tents = [
    {
      name: "The Classic Tent",
      desc: "Our signature canvas tent offering rustic charm without compromising on comfort. Features a plush queen bed and private en-suite bathroom.",
      img: "/images/home-hero.webp",
      features: ["Queen Size Bed", "En-suite Bathroom", "Desert View"]
    },
    {
      name: "Premium Swiss Tent",
      desc: "Elevated luxury with a spacious private veranda, king-size bed, premium linens, and a traditional Rajasthani aesthetic.",
      img: "/images/home-hero.webp",
      features: ["King Size Bed", "Private Veranda", "Air Conditioning"]
    },
    {
      name: "The Royal Suite",
      desc: "The ultimate desert sanctuary. A sprawling two-room tent featuring a private dining area, opulent bathtub, and butler service.",
      img: "/images/home-hero.webp",
      features: ["Two Rooms", "Bathtub", "Private Butler"]
    }
  ];

  const amenities = [
    { icon: <BedDouble size={24}/>, label: "Premium Bedding" },
    { icon: <Bath size={24}/>, label: "Hot Water 24/7" },
    { icon: <Wind size={24}/>, label: "Air Conditioning" },
    { icon: <Wifi size={24}/>, label: "Wi-Fi (Lounge)" },
    { icon: <Coffee size={24}/>, label: "Morning Tea" },
    { icon: <Shield size={24}/>, label: "24/7 Security" }
  ];

  return (
    <div className="flex flex-col w-full overflow-hidden bg-canvas-parchment">
      
      {/* 1. Cinematic Hero */}
      <section ref={heroRef} className="relative h-[70vh] w-full flex items-center justify-center overflow-hidden bg-charcoal">
        <motion.div 
          style={{ scale: heroScale, y: heroY }} 
          className="absolute inset-0 w-full h-full"
        >
          <Image
            src="/images/home-hero.webp"
            alt="Luxury Desert Tents"
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
          <span className="text-sm uppercase tracking-[0.3em] mb-6 block text-gold">The Sanctuary</span>
          <motion.h1 
            className="text-5xl md:text-7xl font-serif leading-tight flex justify-center gap-x-3 flex-wrap"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 1 },
              visible: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } }
            }}
          >
            {"Our Luxury Camp".split(" ").map((word, wordIndex) => (
              <span key={wordIndex} className="flex">
                {word.split("").map((letter, letterIndex) => (
                  <motion.span
                    key={letterIndex}
                    variants={{
                      hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
                      visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 1.0, ease: [0.22, 1, 0.36, 1] } }
                    }}
                  >
                    {letter}
                  </motion.span>
                ))}
              </span>
            ))}
          </motion.h1>
        </motion.div>
      </section>

      <HorizonLine />

      {/* 2. Tents Showcase */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-20 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-serif text-brown mb-6">Accommodations</h2>
            <p className="text-brown/70 text-lg">Where the untamed desert meets absolute refinement. Every tent is a private oasis.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {tents.map((tent, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: idx * 0.2 }}
                whileHover={{ y: -10 }}
                className="bg-white p-6 shadow-lg rounded-sm group flex flex-col h-full border border-transparent hover:border-gold/30 transition-colors duration-500"
              >
                <div className="relative h-64 w-full overflow-hidden mb-8 rounded-sm">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.8 }}
                    className="w-full h-full relative"
                  >
                    <Image src={tent.img} alt={tent.name} fill className="object-cover" />
                  </motion.div>
                </div>
                <h3 className="text-2xl font-serif text-brown mb-4">{tent.name}</h3>
                <p className="text-brown/70 mb-6 flex-grow">{tent.desc}</p>
                <div className="space-y-2 mb-8">
                  {tent.features.map((feat, i) => (
                    <div key={i} className="text-sm uppercase tracking-widest text-gold font-semibold flex items-center gap-2">
                      <div className="w-1 h-1 bg-gold rounded-full" /> {feat}
                    </div>
                  ))}
                </div>
                <Button variant="ghost" className="w-full justify-center">
                  View Details
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <HorizonLine />

      {/* 3. Amenities */}
      <section className="py-24 px-6 bg-charcoal text-warm-white">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-4xl font-serif text-gold mb-16 text-center">Camp Amenities</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-y-12 gap-x-8">
            {amenities.map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="flex flex-col items-center text-center space-y-4"
              >
                <div className="text-gold p-4 rounded-full bg-white/5 border border-white/10">
                  {item.icon}
                </div>
                <h4 className="uppercase tracking-widest text-sm font-semibold">{item.label}</h4>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
