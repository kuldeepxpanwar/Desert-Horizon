"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import HorizonLine from "@/components/ui/HorizonLine";
import Button from "@/components/ui/Button";
import BookingModal from "@/components/ui/BookingModal";
import { CarFront, MapPin, Users, Luggage, CheckCircle2 } from "lucide-react";

export default function TaxiClient() {
  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const heroScale = useTransform(heroScroll, [0, 1], [1, 1.1]);
  const heroOpacity = useTransform(heroScroll, [0, 1], [1, 0]);
  const heroY = useTransform(heroScroll, [0, 1], [0, 100]);

  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedTaxi, setSelectedTaxi] = useState("");

  const handleBook = (taxiService: string) => {
    setSelectedTaxi(taxiService);
    setIsBookingOpen(true);
  };

  const routes = [
    {
      title: "Jaisalmer Local Sightseeing",
      desc: "Full day local sightseeing covering Jaisalmer Fort, Patwon ki Haveli, Gadisar Lake, and Vyas Chhatri.",
      sedanPrice: "₹1,800+",
      suvPrice: "₹2,500+"
    },
    {
      title: "Jaisalmer to Sam Sand Dunes (Drop/Return)",
      desc: "Half day trip to Sam Sand Dunes for desert safari, sunset view, and return to the city.",
      sedanPrice: "₹1,500+",
      suvPrice: "₹2,200+"
    },
    {
      title: "Jodhpur to Jaisalmer (One Way Drop)",
      desc: "Comfortable intercity transfer from Jodhpur Airport/Railway Station to Jaisalmer City/Camp.",
      sedanPrice: "₹4,000+",
      suvPrice: "₹5,500+"
    },
    {
      title: "Jaisalmer to Longewala & Tanot Mata",
      desc: "Full day excursion to the India-Pakistan border, Longewala war memorial, and Tanot Mata temple.",
      sedanPrice: "₹3,000+",
      suvPrice: "₹4,500+"
    }
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
            src="/images/home-hero.webp"
            alt="Taxi Services"
            fill
            priority
            className="object-cover object-center opacity-70 mix-blend-overlay grayscale hover:grayscale-0 transition-all duration-1000"
          />
        </motion.div>
        
        <motion.div 
          style={{ opacity: heroOpacity }}
          className="relative z-10 text-center px-4 flex flex-col items-center mt-20"
        >
          <p className="text-gold tracking-[0.3em] uppercase text-xs sm:text-sm font-semibold mb-6 flex items-center gap-4">
            <span className="w-12 h-px bg-gold"></span>
            Premium Fleet
            <span className="w-12 h-px bg-gold"></span>
          </p>
          <motion.h1 
            className="text-5xl md:text-7xl font-serif text-warm-white mb-6 flex justify-center gap-x-3 flex-wrap"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 1 },
              visible: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } }
            }}
          >
            {"Taxi Services".split(" ").map((word, wordIndex) => (
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
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-warm-white/70 max-w-lg mx-auto text-lg md:text-xl font-light"
          >
            Reliable, air-conditioned cabs with experienced drivers for your Rajasthan journey.
          </motion.p>
        </motion.div>
      </section>

      <HorizonLine />

      {/* 2. Routes & Rates Table */}
      <section className="py-24 px-6 md:px-12 bg-white text-charcoal relative">
        <div className="container mx-auto max-w-5xl">
          
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif text-charcoal mb-4">Popular Routes & Fares</h2>
            <p className="text-brown/70 max-w-2xl mx-auto">Transparent pricing. No hidden costs. Includes toll, parking, and driver allowance.</p>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {routes.map((route, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="relative overflow-hidden rounded-xl p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 border border-white/20 shadow-lg group hover:-translate-y-1 transition-transform duration-500"
              >
                {/* Ember Sunset Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#f97316] via-[#f59e0b] to-[#ef4444] opacity-90 transition-opacity duration-500 group-hover:opacity-100 -z-10" />
                <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-20 mix-blend-overlay -z-10" />

                <div className="flex-1 relative z-10">
                  <h3 className="text-2xl font-serif text-white mb-2 drop-shadow-sm">{route.title}</h3>
                  <p className="text-white/90 text-sm drop-shadow-sm">{route.desc}</p>
                </div>
                
                <div className="flex gap-6 w-full md:w-auto relative z-10">
                  <div className="flex-1 md:flex-none flex flex-col items-center justify-center bg-white/20 backdrop-blur-md border border-white/30 p-4 rounded-lg shadow-sm min-w-[120px]">
                    <span className="text-xs uppercase tracking-widest text-white/80 font-bold mb-1 drop-shadow-sm">Sedan</span>
                    <span className="text-xl font-bold text-white drop-shadow-sm">{route.sedanPrice}</span>
                  </div>
                  <div className="flex-1 md:flex-none flex flex-col items-center justify-center bg-white/20 backdrop-blur-md border border-white/30 p-4 rounded-lg shadow-sm min-w-[120px] relative overflow-hidden">
                    <div className="absolute top-0 right-0 bg-white text-orange-600 text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-bl-lg shadow-sm">SUV</div>
                    <span className="text-xs uppercase tracking-widest text-white/80 font-bold mb-1 mt-1 drop-shadow-sm">Innova</span>
                    <span className="text-xl font-bold text-white drop-shadow-sm">{route.suvPrice}</span>
                  </div>
                </div>

                <div className="w-full md:w-auto relative z-10">
                  <Button onClick={() => handleBook(`Taxi: ${route.title}`)} variant="primary" className="w-full md:w-auto justify-center bg-white text-orange-600 hover:bg-orange-50 border-none shadow-md hover:shadow-lg">
                    Book Cab
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      <HorizonLine />
      
      <BookingModal 
        isOpen={isBookingOpen} 
        onClose={() => setIsBookingOpen(false)} 
        defaultPackage={selectedTaxi}
      />
    </div>
  );
}
