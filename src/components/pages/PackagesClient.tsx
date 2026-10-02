"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import HorizonLine from "@/components/ui/HorizonLine";
import Button from "@/components/ui/Button";
import BookingModal from "@/components/ui/BookingModal";
import { Clock, MapPin, CheckCircle2 } from "lucide-react";

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
          <h1 className="text-5xl md:text-7xl font-serif text-warm-white mb-6">
            {"Tour Packages".split(" ").map((word, i) => (
              <span key={i} className="inline-block mr-4 overflow-hidden">
                <motion.span
                  initial={{ y: "100%", filter: "blur(8px)" }}
                  animate={{ y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 1, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="inline-block"
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h1>
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
      <section className="py-24 px-6 md:px-12 bg-canvas-parchment text-charcoal relative">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {packages.map((pkg, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: idx * 0.2 }}
                className="group flex flex-col bg-white rounded-xl shadow-[0_20px_50px_-15px_rgba(0,0,0,0.05)] border border-brown/5 overflow-hidden hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] transition-all duration-500"
              >
                <div className="relative h-64 w-full overflow-hidden">
                  <Image 
                    src={pkg.image} 
                    alt={pkg.title} 
                    fill 
                    className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/20 to-transparent" />
                  <div className="absolute bottom-4 left-6 right-6 flex justify-between items-end">
                    <div className="text-white">
                      <p className="text-xs uppercase tracking-widest text-gold font-bold mb-1">{pkg.location}</p>
                      <h3 className="text-2xl font-serif">{pkg.title}</h3>
                    </div>
                  </div>
                </div>

                <div className="p-8 flex flex-col flex-1">
                  <div className="flex items-center justify-between mb-6 pb-6 border-b border-brown/10">
                    <div className="flex items-center text-brown/70 text-sm font-medium gap-2">
                      <Clock size={16} className="text-gold" />
                      {pkg.duration}
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-brown/50 uppercase tracking-widest">Starting From</p>
                      <p className="text-xl font-bold text-charcoal">{pkg.price} <span className="text-xs font-normal text-brown/50">/pax</span></p>
                    </div>
                  </div>

                  <div className="flex-1 mb-8">
                    <ul className="space-y-3">
                      {pkg.highlights.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-brown/80 text-sm">
                          <CheckCircle2 size={18} className="text-gold shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button 
                    variant="ghost" 
                    className="w-full justify-center group-hover:bg-gold group-hover:text-white group-hover:border-gold transition-colors duration-300"
                    onClick={() => handleBook(pkg.title)}
                  >
                    Enquire Now
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
        defaultPackage={selectedPkg}
      />
    </div>
  );
}
