"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import HorizonLine from "@/components/ui/HorizonLine";
import Button from "@/components/ui/Button";
import BookingModal from "@/components/ui/BookingModal";
import { ArrowRight, Compass, Sun, Moon, Wind, Flame } from "lucide-react";

export default function ExperiencesClient() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const heroScale = useTransform(heroScroll, [0, 1], [1, 1.1]);
  const heroOpacity = useTransform(heroScroll, [0, 1], [1, 0]);
  const heroY = useTransform(heroScroll, [0, 1], [0, 100]);

  const experiences = [
    {
      title: "Dune Bashing & Jeep Safari",
      desc: "Feel the adrenaline rush as our expert drivers navigate the steep golden sand dunes in a powerful 4x4 SUV.",
      icon: <Compass className="text-gold mb-4" size={32} />,
      img: "/images/jeep-safari.webp",
      reverse: false
    },
    {
      title: "The Classic Camel Trek",
      desc: "Experience the desert exactly as it has been traversed for millennia. A slow, peaceful journey atop the 'ships of the desert' to our secluded sunset viewing point.",
      icon: <Sun className="text-gold mb-4" size={32} />,
      img: "/images/safari-card.webp",
      reverse: true
    },
    {
      title: "Kalbelia Cultural Evening & Fire Show",
      desc: "End your day with a mesmerizing traditional folk dance, fire shows, and a lavish Rajasthani buffet under the stars.",
      icon: <Flame className="text-gold mb-4" size={32} />,
      img: "/images/fire-show.webp",
      reverse: false
    },
    {
      title: "Quad Biking & Parasailing",
      desc: "Take control of a powerful ATV across the desert or soar high above the dunes for a breathtaking aerial view.",
      icon: <Wind className="text-gold mb-4" size={32} />,
      img: "/images/quad-biking.webp",
      reverse: true
    }
  ];

  return (
    <div className="flex flex-col w-full overflow-hidden bg-warm-white relative">
      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
      
      {/* Engineered Architectural Grid Lines */}
      <div className="fixed inset-0 pointer-events-none z-0 flex justify-center opacity-[0.03]">
        <div className="w-full max-w-7xl h-full border-x border-charcoal grid grid-cols-4 md:grid-cols-12 gap-4 px-6">
          <div className="hidden md:block col-start-4 col-end-5 border-l border-charcoal h-full" />
          <div className="hidden md:block col-start-7 col-end-8 border-l border-charcoal h-full" />
          <div className="hidden md:block col-start-10 col-end-11 border-l border-charcoal h-full" />
        </div>
      </div>

      {/* 1. Cinematic Hero */}
      <section ref={heroRef} className="relative h-[80vh] w-full flex items-center justify-center overflow-hidden bg-charcoal">
        <motion.div style={{ scale: heroScale, y: heroY }} className="absolute inset-0 w-full h-full">
          <Image src="/images/safari-card.webp" alt="Desert Safari Experiences" fill priority className="object-cover object-center opacity-70" />
        </motion.div>
        
        <motion.div 
          style={{ opacity: heroOpacity }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 text-center text-warm-white px-6 mt-20"
        >
          <span className="text-xs uppercase tracking-[0.4em] mb-6 block text-gold">Immersive Journeys</span>
          <h1 className="text-5xl md:text-8xl font-serif leading-tight">
            Curated<br/>Experiences
          </h1>
        </motion.div>
      </section>

      {/* 2. Intro Text */}
      <section className="py-32 px-6 text-center max-w-4xl mx-auto relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-5xl font-serif text-charcoal leading-snug"
        >
          Whether you seek the thrill of the dunes or the quiet magic of a starlit night, our experiences awaken your senses.
        </motion.h2>
      </section>

      {/* 3. Editorial Experiences List (Magazine Style) */}
      <section className="px-6 pb-32 relative z-10">
        <div className="container mx-auto max-w-7xl">
          {experiences.map((exp, idx) => (
            <div key={idx} className="border-t border-charcoal/10 py-16 md:py-24 flex flex-col md:flex-row gap-12 md:gap-8 group">
              
              {/* Index Number */}
              <div className="w-full md:w-1/12">
                <span className="text-xl md:text-2xl font-serif text-charcoal/30 block">0{idx + 1}</span>
              </div>

              {/* Portrait Image */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1 }}
                className="w-full md:w-5/12"
              >
                <div className="relative aspect-[3/4] w-full overflow-hidden shadow-2xl">
                  <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.8, ease: "easeOut" }} className="w-full h-full relative">
                    <Image src={exp.img} alt={exp.title} fill className="object-cover" />
                  </motion.div>
                </div>
              </motion.div>
              
              {/* Content & Typography */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="w-full md:w-6/12 md:pl-16 flex flex-col justify-center"
              >
                <div className="mb-6 opacity-70 scale-90 origin-left">{exp.icon}</div>
                <h2 className="text-4xl md:text-6xl font-serif text-charcoal mb-8 leading-tight">{exp.title}</h2>
                <div className="w-12 h-[1px] bg-gold mb-8" />
                <p className="text-charcoal/70 text-lg md:text-xl leading-relaxed mb-12 max-w-lg">
                  {exp.desc}
                </p>
                <div>
                  <Button variant="outline" onClick={() => setIsBookingOpen(true)}>
                    Inquire Now <ArrowRight size={18} />
                  </Button>
                </div>
              </motion.div>
              
            </div>
          ))}
        </div>
      </section>

      {/* 4. Bottom CTA */}
      <section className="py-32 bg-[#1C1C1C] px-6 text-center border-t border-white/10 relative z-10">
        <h2 className="text-4xl md:text-5xl font-serif text-warm-white mb-10">Ready to explore?</h2>
        <Button variant="primary" className="px-12 py-5 text-lg" onClick={() => setIsBookingOpen(true)}>
          Book Your Safari
        </Button>
      </section>

    </div>
  );
}
