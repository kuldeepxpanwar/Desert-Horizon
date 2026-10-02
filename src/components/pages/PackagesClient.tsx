"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import HorizonLine from "@/components/ui/HorizonLine";
import Button from "@/components/ui/Button";
import BookingModal from "@/components/ui/BookingModal";
import { Clock, MapPin, CheckCircle2 } from "lucide-react";

const CipherButton = ({ text, onClick }: { text: string, onClick: () => void }) => {
  const [displayText, setDisplayText] = useState(text);
  const [isHovered, setIsHovered] = useState(false);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$&*";

  useEffect(() => {
    if (!isHovered) {
      setDisplayText(text);
      return;
    }
    
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(text.split("").map((letter, index) => {
        if (letter === " ") return " ";
        if (index < iteration) return text[index];
        return chars[Math.floor(Math.random() * chars.length)];
      }).join(""));
      
      if (iteration >= text.length) clearInterval(interval);
      iteration += 1 / 2;
    }, 30);
    
    return () => clearInterval(interval);
  }, [isHovered, text]);

  return (
      <div className="w-full" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <Button 
        variant="ghost" 
        className="w-full justify-center bg-[#4A1E14] text-white hover:bg-gold border-none shadow-lg transition-colors duration-300 uppercase tracking-widest"
        onClick={onClick}
      >
        <span className="inline-block text-center">{displayText}</span>
      </Button>
    </div>
  );
};

export default function PackagesClient() {
  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const heroScale = useTransform(heroScroll, [0, 1], [1, 1.1]);
  const heroOpacity = useTransform(heroScroll, [0, 1], [1, 0]);
  const heroY = useTransform(heroScroll, [0, 1], [0, 100]);

  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedPkg, setSelectedPkg] = useState("");

  const handleBook = (pkgName: string) => {
    setSelectedPkg(pkgName);
    setIsBookingOpen(true);
  };

  const packages = [
    {
      title: "1N / 2D Desert Experience",
      price: "₹3,500",
      duration: "1 Night / 2 Days",
      location: "Sam Sand Dunes",
      image: "/images/home-hero.webp",
      theme: "bg-gradient-to-br from-[#0ea5e9] to-[#2563eb]", // Petal Theme
      highlights: [
        "Welcome drink on arrival",
        "Camel Safari & Jeep Safari",
        "Rajasthani Cultural Folk Dance",
        "Gala Dinner & Buffet Breakfast",
        "Luxury Swiss Tent Accommodation"
      ]
    },
    {
      title: "2N / 3D Royal Jaisalmer",
      price: "₹6,500",
      duration: "2 Nights / 3 Days",
      location: "Jaisalmer City & Desert",
      image: "/images/home-experiences.webp",
      theme: "bg-gradient-to-br from-[#f97316] via-[#f59e0b] to-[#ef4444]", // Ember Theme
      highlights: [
        "1N Hotel Stay & 1N Desert Camp",
        "Jaisalmer Fort & Patwon Ki Haveli",
        "Gadisar Lake Sunset",
        "Camel & Jeep Safari in Dunes",
        "Pick & Drop from Railway Station"
      ]
    },
    {
      title: "3N / 4D Jodhpur & Jaisalmer",
      price: "₹12,500",
      duration: "3 Nights / 4 Days",
      location: "Jodhpur to Jaisalmer",
      image: "/images/home-camp.webp",
      theme: "bg-gradient-to-br from-[#06b6d4] via-[#8b5cf6] to-[#ec4899]", // Horizon Theme
      highlights: [
        "Mehrangarh Fort & Umaid Bhawan",
        "Private AC Cab Transfer",
        "Jaisalmer City Sightseeing",
        "Desert Camp & Evening Safari",
        "All Tolls, Parking & Driver Allowance"
      ]
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
            src="/images/home-experiences.webp"
            alt="Tour Packages"
            fill
            priority
            className="object-cover object-center opacity-70 mix-blend-overlay"
          />
        </motion.div>
        
        <motion.div 
          style={{ opacity: heroOpacity }}
          className="relative z-10 text-center px-4 flex flex-col items-center mt-20"
        >
          <p className="text-gold tracking-[0.3em] uppercase text-xs sm:text-sm font-semibold mb-6 flex items-center gap-4">
            <span className="w-12 h-px bg-gold"></span>
            Curated Itineraries
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
            {"Tour Packages".split(" ").map((word, wordIndex) => (
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
            Discover the magic of the Thar desert with our exclusive royal travel plans.
          </motion.p>
        </motion.div>
      </section>

      <HorizonLine />

      {/* 2. Packages Grid */}
      <section className="py-32 px-6 md:px-12 bg-canvas-parchment text-charcoal relative">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-14">
            {packages.map((pkg, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: idx * 0.2 }}
                className="group flex flex-col bg-white rounded-xl shadow-[0_20px_50px_-15px_rgba(0,0,0,0.05)] border border-brown/5 overflow-hidden hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] transition-all duration-500"
              >
                <div className="relative h-64 w-full overflow-hidden bg-charcoal">
                  <Image 
                    src={pkg.image} 
                    alt={pkg.title} 
                    fill 
                    className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/20 to-transparent" />
                  <div className="absolute bottom-4 left-6 right-6 flex justify-between items-end">
                    <div className="text-white relative z-10">
                      <p className="text-xs uppercase tracking-widest text-gold font-bold mb-1 drop-shadow-sm">{pkg.location}</p>
                      <h3 className="text-2xl font-serif drop-shadow-sm">{pkg.title}</h3>
                    </div>
                  </div>
                </div>

                <div className={`p-8 flex flex-col flex-1 relative ${pkg.theme}`}>
                  <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-20 mix-blend-overlay pointer-events-none" />
                  <div className="flex items-center justify-between mb-6 pb-6 border-b border-white/20 relative z-10">
                    <div className="flex items-center text-white/90 text-sm font-medium gap-2">
                      <Clock size={16} className="text-white" />
                      {pkg.duration}
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-white/70 uppercase tracking-widest">Starting From</p>
                      <p className="text-xl font-bold text-white">{pkg.price} <span className="text-xs font-normal text-white/70">/pax</span></p>
                    </div>
                  </div>

                  <div className="flex-1 relative z-10">
                    <div className="flex flex-col mb-8 w-full border-t border-white/20 mt-2">
                      {pkg.highlights.map((item, i) => (
                        <div key={i} className="py-3.5 border-b border-white/20 text-sm text-white/95 font-medium flex items-center justify-between gap-3">
                          <span>{item}</span>
                          <CheckCircle2 size={16} className="text-white shrink-0 opacity-80" />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="relative z-10 mt-auto">
                    <CipherButton text="Enquire Now" onClick={() => handleBook(pkg.title)} />
                  </div>
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
        defaultPackage={selectedPkg}
      />
    </div>
  );
}
