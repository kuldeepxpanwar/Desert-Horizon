"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import HorizonLine from "@/components/ui/HorizonLine";
import Button from "@/components/ui/Button";
import BookingModal from "@/components/ui/BookingModal";
import { ArrowRight, Compass, Sun, Wind, Flame, CheckCircle2 } from "lucide-react";

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
      icon: <Compass className="text-gold" size={24} />,
      img: "/images/jeep-safari.webp",
      highlights: ["45-Min High-Speed Ride", "Professional Drivers", "Sunset Viewpoint Stop", "Water & Snacks"]
    },
    {
      title: "The Classic Camel Trek",
      desc: "Experience the desert exactly as it has been traversed for millennia. A slow, peaceful journey atop the 'ships of the desert' to our secluded sunset viewing point.",
      icon: <Sun className="text-gold" size={24} />,
      img: "/images/safari-card.webp",
      highlights: ["90-Min Peaceful Ride", "Traditional Local Guide", "Private Dune Sunset", "Photo Opportunities"]
    },
    {
      title: "Kalbelia Cultural Evening & Fire Show",
      desc: "End your day with a mesmerizing traditional folk dance, fire shows, and a lavish Rajasthani buffet under the stars.",
      icon: <Flame className="text-gold" size={24} />,
      img: "/images/fire-show.webp",
      highlights: ["Live Folk Music & Dance", "Fire Dance Performance", "Authentic Rajasthani Buffet", "Premium Floor Seating"]
    },
    {
      title: "Quad Biking & Parasailing",
      desc: "Take control of a powerful ATV across the desert or soar high above the dunes for a breathtaking aerial view.",
      icon: <Wind className="text-gold" size={24} />,
      img: "/images/quad-biking.webp",
      highlights: ["Self-Drive ATV Available", "Full Safety Gear Provided", "Dune Navigation Course", "Parasailing Add-on"]
    }
  ];

  return (
    <div className="flex flex-col w-full overflow-hidden bg-warm-white relative">
      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
      
      {/* Engineered Architectural Grid Lines */}
      <div className="absolute inset-0 pointer-events-none z-0 flex justify-center opacity-[0.03]">
        <div className="w-full max-w-7xl h-full border-x border-charcoal grid grid-cols-4 md:grid-cols-12 gap-4 px-6">
          <div className="hidden md:block col-start-4 col-end-5 border-l border-charcoal h-full" />
          <div className="hidden md:block col-start-7 col-end-8 border-l border-charcoal h-full" />
          <div className="hidden md:block col-start-10 col-end-11 border-l border-charcoal h-full" />
        </div>
      </div>

      {/* 1. Cinematic Hero */}
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
            className="object-cover object-center opacity-80"
          />
        </motion.div>
        
        <div className="absolute inset-0 bg-black/40" />
        
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

      {/* 2. Intro Text */}
      <section className="py-24 px-6 text-center max-w-3xl mx-auto relative z-10 border-b border-charcoal/10">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-4xl font-serif text-charcoal leading-relaxed"
        >
          Whether you seek the thrill of the dunes or the quiet magic of a starlit night, our curated experiences are designed to awaken your senses.
        </motion.h2>
      </section>

      {/* 3. Structured Fintech Grid Experiences List */}
      <section className="py-24 px-6 relative z-10">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col gap-12 lg:gap-16">
            {experiences.map((exp, idx) => (
              <div key={idx} className="grid grid-cols-1 md:grid-cols-12 gap-0 border border-charcoal/10 shadow-md bg-white overflow-hidden group">
                
                {/* Left Side: Image */}
                <div className="md:col-span-5 relative h-[300px] md:h-auto border-b md:border-b-0 md:border-r border-charcoal/10">
                  <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.8, ease: "easeOut" }} className="w-full h-full relative">
                    <Image src={exp.img} alt={exp.title} fill className="object-cover" />
                  </motion.div>
                </div>

                {/* Right Side: Specs & Content */}
                <div className="md:col-span-7 flex flex-col bg-warm-white/30">
                  
                  {/* Header Area */}
                  <div className="p-8 md:p-10 lg:p-12 border-b border-charcoal/10">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="bg-charcoal/5 p-3 rounded-none border border-charcoal/10">
                        {exp.icon}
                      </div>
                      <span className="text-sm font-semibold tracking-widest uppercase text-charcoal/50">Experience 0{idx + 1}</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-serif text-charcoal mb-4">{exp.title}</h2>
                    <p className="text-charcoal/70 leading-relaxed text-lg">{exp.desc}</p>
                  </div>

                  {/* Spec Sheet Grid */}
                  <div className="p-8 md:p-10 lg:p-12 border-b border-charcoal/10">
                    <span className="text-xs font-bold tracking-[0.2em] uppercase text-charcoal/40 block mb-6">Highlights & Inclusions</span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-0">
                      {exp.highlights.map((highlight, hIdx) => (
                        <div key={hIdx} className="flex items-center gap-3 py-4 border-b border-charcoal/10 group-hover:border-charcoal/20 transition-colors">
                          <CheckCircle2 className="text-gold flex-shrink-0" size={18} />
                          <span className="text-sm font-medium text-charcoal/90 uppercase tracking-wide">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA Footer */}
                  <div className="p-8 md:p-10 lg:p-12 bg-white">
                    <Button variant="outline" className="w-full sm:w-auto" onClick={() => setIsBookingOpen(true)}>
                      Book this Experience
                    </Button>
                  </div>
                  
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Bottom CTA */}
      <section className="py-32 bg-charcoal px-6 text-center relative z-10 border-t border-white/10">
        <h2 className="text-4xl md:text-5xl font-serif text-gold mb-8">Ready to explore?</h2>
        <Button variant="primary" className="px-12 py-5 text-lg" onClick={() => setIsBookingOpen(true)}>
          Book Your Safari
        </Button>
      </section>

    </div>
  );
}
