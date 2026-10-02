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
    <div className="flex flex-col w-full overflow-hidden bg-canvas-parchment">
      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
      
      {/* 1. Cinematic Hero (Slightly shorter - 70vh) */}
      <section ref={heroRef} className="relative h-[70vh] w-full flex items-center justify-center overflow-hidden bg-charcoal">
        <motion.div 
          style={{ scale: heroScale, y: heroY }} 
          className="absolute inset-0 w-full h-full"
        >
          <Image
            src="/images/safari-card.webp"
            alt="Desert Safari Experiences"
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
          <span className="text-sm uppercase tracking-[0.3em] mb-6 block text-gold">Immersive Journeys</span>
          <motion.h1 
            className="text-5xl md:text-7xl font-serif leading-tight flex justify-center gap-x-3 flex-wrap"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 1 },
              visible: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } }
            }}
          >
            {"Curated Experiences".split(" ").map((word, wordIndex) => (
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

      {/* 2. Intro Text */}
      <section className="py-24 px-6 text-center max-w-3xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-4xl font-serif text-brown leading-relaxed"
        >
          Whether you seek the thrill of the dunes or the quiet magic of a starlit night, our curated experiences are designed to awaken your senses.
        </motion.h2>
      </section>

      <HorizonLine />

      {/* 3. Alternating Experiences List */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-7xl space-y-32">
          {experiences.map((exp, idx) => (
            <div key={idx} className={`flex flex-col md:flex-row gap-16 items-center ${exp.reverse ? 'md:flex-row-reverse' : ''}`}>
              <motion.div 
                initial={{ opacity: 0, x: exp.reverse ? 30 : -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="flex-1 space-y-6"
              >
                {exp.icon}
                <h2 className="text-4xl font-serif text-brown">{exp.title}</h2>
                <p className="text-brown/70 text-lg leading-relaxed pb-4">
                  {exp.desc}
                </p>
                <Button variant="ghost" onClick={() => setIsBookingOpen(true)}>
                  Inquire Now <ArrowRight size={18} />
                </Button>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1 }}
                className="flex-1 w-full"
              >
                <div className="relative h-[500px] w-full overflow-hidden group rounded-sm shadow-xl">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="w-full h-full relative"
                  >
                    <Image src={exp.img} alt={exp.title} fill className="object-cover" />
                  </motion.div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </section>

      <HorizonLine />

      {/* 4. Bottom CTA */}
      <section className="py-32 bg-charcoal px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-serif text-gold mb-8">Ready to explore?</h2>
        <Button variant="primary" className="px-12 py-5 text-lg" onClick={() => setIsBookingOpen(true)}>
          Book Your Safari
        </Button>
      </section>

    </div>
  );
}
