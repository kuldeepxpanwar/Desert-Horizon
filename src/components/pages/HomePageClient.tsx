"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform, useMotionTemplate } from "framer-motion";
import { ArrowRight, Star, Check, Plus, Minus, CheckCircle2 } from "lucide-react";
import HorizonLine from "@/components/ui/HorizonLine";
import Button from "@/components/ui/Button";
import DuneParallax from "@/components/ui/DuneParallax";
import BookingModal from "@/components/ui/BookingModal";

export default function HomePageClient() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [defaultPkg, setDefaultPkg] = useState("");
  
  const mainRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: mainRef });

  // Day-to-Night Background Color Transition
  const bgColor = useTransform(
    scrollYProgress,
    [0, 0.5, 0.9],
    ["#fdfbf7", "#cf885a", "#0a0a0f"] // Canvas Parchment -> Sunset Orange -> Charcoal Night
  );
  
  // Transition text colors to stay readable on dark background
  const headingColor = useTransform(scrollYProgress, [0.4, 0.6], ["#4a3f35", "#fdfbf7"]);
  const textColor = useTransform(scrollYProgress, [0.4, 0.6], ["rgba(74, 63, 53, 0.8)", "rgba(253, 251, 247, 0.8)"]);

  // Parallax Setup for Hero
  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const heroScale = useTransform(heroScroll, [0, 1], [1, 1.1]);
  const heroOpacity = useTransform(heroScroll, [0, 1], [1, 0]);
  const heroY = useTransform(heroScroll, [0, 1], [0, 100]);

  const faqs = [
    { q: "What time is check-in and check-out?", a: "Check-in begins at 3:00 PM. Check-out is at 10:30 AM after breakfast." },
    { q: "Is the desert camp safe for families?", a: "Absolutely. Our camp is fully secure with 24/7 staff and family-friendly activities." },
    { q: "How cold does it get at night?", a: "During winter, desert nights can drop to 5-10°C. We provide premium warm bedding." },
    { q: "Are washrooms attached?", a: "Yes, all luxury tents feature premium en-suite bathrooms with hot water." }
  ];

  return (
    <motion.div ref={mainRef} style={{ backgroundColor: bgColor }} className="flex flex-col w-full overflow-hidden transition-colors duration-0">
      
      <BookingModal 
        isOpen={isBookingOpen} 
        onClose={() => setIsBookingOpen(false)} 
        defaultPackage={defaultPkg}
      />
      
      {/* 1. Cinematic Hero with Dune Parallax & Heat Haze */}
      <section ref={heroRef} className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-charcoal">
        <motion.div 
          style={{ scale: heroScale, y: heroY }} 
          className="absolute inset-0 w-full h-full [filter:url(#heat-haze)]" // Apply Heat Haze Filter
        >
          <Image
            src="/images/home-hero.webp"
            alt="Desert Horizon Jaisalmer"
            fill
            priority
            className="object-cover object-center scale-105" // slightly scaled up to hide filter edges
          />
        </motion.div>
        
        <div className="absolute inset-0 bg-black/30" />
        
        <motion.div 
          style={{ opacity: heroOpacity }}
          className="relative z-10 text-center text-warm-white px-6 max-w-4xl mt-20"
        >
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.5, duration: 1 }}
            className="text-sm md:text-base uppercase tracking-[0.3em] mb-6 block text-gold"
          >
            Jaisalmer, Rajasthan
          </motion.span>
          
          {/* Cal.com Style Typographic Reveal */}
          <motion.h1 
            className="text-5xl md:text-[5.5rem] mb-10 leading-[1.1] flex flex-wrap justify-center items-center gap-x-4 gap-y-2 drop-shadow-2xl"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 1 },
              visible: { transition: { staggerChildren: 0.15, delayChildren: 2.2 } }
            }}
          >
            {/* Word 1 */}
            <motion.span 
              variants={{
                hidden: { opacity: 0, y: 40, filter: "blur(15px)" },
                visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] } }
              }}
              className="font-sans font-semibold text-white tracking-tight"
            >
              Experience
            </motion.span>
            {/* Word 2 */}
            <motion.span 
              variants={{
                hidden: { opacity: 0, y: 40, filter: "blur(15px)" },
                visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] } }
              }}
              className="font-sans font-medium text-white/60 tracking-tight"
            >
              Beyond
            </motion.span>
            {/* Line Break for Mobile */}
            <div className="w-full h-0 md:hidden"></div>
            {/* Word 3 */}
            <motion.span 
              variants={{
                hidden: { opacity: 0, y: 40, filter: "blur(20px)", scale: 0.9 },
                visible: { opacity: 1, y: 0, filter: "blur(0px)", scale: 1, transition: { duration: 1.5, ease: [0.22, 1, 0.36, 1] } }
              }}
              className="font-serif italic text-gold text-6xl md:text-[7.5rem] md:ml-2 md:-mt-2"
            >
              the Horizon.
            </motion.span>
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.5, duration: 1 }}
          >
            <Button 
              onClick={() => { setDefaultPkg(""); setIsBookingOpen(true); }} 
              variant="primary"
            >
              Plan Your Journey <ArrowRight size={18} />
            </Button>
          </motion.div>
        </motion.div>

        {/* Dune Parallax Layers */}
        <DuneParallax />
      </section>

      <HorizonLine />

      {/* 2. Featured Experiences */}
      <section className="py-32 px-6 relative z-10">
        <div className="container mx-auto max-w-7xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <motion.h2 style={{ color: headingColor }} className="text-4xl md:text-6xl font-serif mb-6">Featured Experiences</motion.h2>
            <motion.p style={{ color: textColor }} className="max-w-2xl mx-auto text-lg">Immerse yourself in the magic of the dunes with tailored adventures.</motion.p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-16">
            {[
              { title: "Sunset Safari", img: "/images/safari-card.webp" },
              { title: "Luxury Tent Stay", img: "/images/tent-card.webp" }
            ].map((exp, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: idx * 0.2 }}
                className="group cursor-pointer relative"
              >
                <div className="relative h-[600px] w-full overflow-hidden rounded-sm">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="w-full h-full relative"
                  >
                    <Image src={exp.img} alt={exp.title} fill className="object-cover" />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />
                    <div className="absolute inset-4 border border-white/0 group-hover:border-gold/50 transition-colors duration-700 pointer-events-none" />
                  </motion.div>
                </div>
                <div className="absolute bottom-8 left-8 text-warm-white flex items-center gap-4">
                  <h3 className="text-3xl font-serif group-hover:text-gold transition-colors duration-300">{exp.title}</h3>
                  <motion.div 
                    initial={{ x: -10, opacity: 0 }}
                    whileHover={{ x: 0, opacity: 1 }}
                    className="text-gold"
                  >
                    <ArrowRight />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <HorizonLine />

      {/* 3. Packages */}
      <section className="py-32 px-6 relative z-10">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-20">
            <motion.h2 style={{ color: headingColor }} className="text-4xl md:text-6xl font-serif mb-6">Signature Packages</motion.h2>
          </div>

          <div className="grid md:grid-cols-3 gap-12 lg:gap-14">
            {[
              { name: "The Classic Safari", vibe: "Authentic Adventure", items: ["Welcome Drink on Arrival", "Camel Trekking Safari", "Kalbelia Folk Dance", "Traditional Veg Buffet"], bgColor: "bg-gradient-to-br from-[#ff6b9d] to-[#ff9a76]" },
              { name: "The Luxury Oasis", vibe: "The Signature Experience", items: ["Sunset Jeep Safari", "VIP Lounge Seating", "Premium Tent Stay", "Gala Dinner Setup"], bgColor: "bg-[#76cbe6]" },
              { name: "The Royal Romance", vibe: "Exclusive for Couples", items: ["Private Dune Dining", "Star-Gazing Setup", "Luxury Suite Tent", "Breakfast in Bed"], bgColor: "bg-gradient-to-br from-[#ff6b9d] to-[#ff9a76]" }
            ].map((pkg, idx) => (
              <motion.div 
                key={idx} 
                whileHover={{ y: -10 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className={`${pkg.bgColor} shadow-xl relative flex flex-col h-full rounded-sm overflow-hidden`}
              >
                {idx === 1 && <span className="absolute top-0 left-1/2 -translate-x-1/2 bg-white text-charcoal text-[10px] font-bold uppercase tracking-[0.2em] px-4 py-1.5 rounded-b-sm shadow-md whitespace-nowrap z-10">Most Popular</span>}
                
                <div className="p-8 flex-col flex flex-grow">
                  <h3 className="text-2xl font-serif text-white mb-2 mt-4">{pkg.name}</h3>
                  <p className="text-white/90 uppercase tracking-widest text-xs font-semibold mb-8">{pkg.vibe}</p>
                  <div className="flex flex-col mb-10 flex-grow border-t border-white/20 mt-4">
                    {pkg.items.map((item, i) => (
                      <div key={i} className="py-3.5 border-b border-white/20 text-[13px] uppercase tracking-widest text-white/95 font-medium flex items-center justify-between">
                        <span>{item}</span>
                        <CheckCircle2 size={16} className="text-white opacity-80" />
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Button acting as a white box on top of the gradient at the bottom */}
                <div className="px-8 pb-8 mt-auto w-full">
                  <Button 
                    onClick={() => { setDefaultPkg(pkg.name); setIsBookingOpen(true); }}
                    variant="outline" 
                    className="w-full justify-center bg-white text-charcoal hover:bg-charcoal hover:text-white border-none rounded-none shadow-md uppercase tracking-widest h-14 font-sans font-bold transition-all duration-300"
                  >
                    Book via WhatsApp
                  </Button>
                  {idx === 1 && <p className="text-center text-[11px] text-white/80 uppercase tracking-widest mt-4">Experiences from ₹3,000 / guest</p>}
                  {idx === 2 && <p className="text-center text-[11px] text-white/80 uppercase tracking-widest mt-4">Privilege rates for couples</p>}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <HorizonLine />

      {/* 4. Testimonials Auto Slider (Now mostly at Night) */}
      <section className="py-24 overflow-hidden relative z-10">
        <motion.h2 style={{ color: headingColor }} className="text-4xl md:text-5xl font-serif mb-16 text-center text-gold">Guest Experiences</motion.h2>
        <div className="relative w-full flex">
          <motion.div 
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 30, ease: "linear", repeat: Infinity }}
            className="flex gap-8 px-4 whitespace-nowrap"
          >
            {[1, 2].map((group) => (
              <div key={group} className="flex gap-8">
                {[
                  { name: "Sarah J.", text: "An absolute dream. The hospitality was unmatched." },
                  { name: "Rahul S.", text: "Best desert camp! The cultural program was authentic." },
                  { name: "Elena R.", text: "The jeep safari left us speechless. Impeccably clean." },
                  { name: "Mark T.", text: "A magical night under the stars. 5-star luxury." }
                ].map((review, i) => (
                  <div key={i} className="bg-white/10 p-8 border border-white/20 backdrop-blur-md w-[350px] md:w-[450px] whitespace-normal flex-shrink-0">
                    <div className="flex gap-1 text-gold mb-6">
                      {[...Array(5)].map((_, j) => <Star key={j} fill="currentColor" size={16} />)}
                    </div>
                    <p className="text-warm-white leading-relaxed mb-8 italic">"{review.text}"</p>
                    <p className="font-semibold uppercase tracking-widest text-xs text-warm-white/80">{review.name}</p>
                  </div>
                ))}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <HorizonLine />

      {/* 5. FAQ */}
      <section className="py-32 px-6 relative z-10">
        <div className="container mx-auto max-w-3xl">
          <motion.h2 style={{ color: headingColor }} className="text-3xl md:text-5xl font-serif mb-16 text-center">Questions?</motion.h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="border-b border-gold/30 pb-4">
                <button 
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex justify-between items-center py-4 text-left text-lg font-serif hover:text-gold transition-colors"
                >
                  <motion.span style={{ color: textColor }}>{faq.q}</motion.span>
                  <motion.div animate={{ rotate: openFaq === i ? 180 : 0 }}>
                    {openFaq === i ? <Minus size={20} className="text-gold" /> : <Plus size={20} className="text-gold/50" />}
                  </motion.div>
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <motion.p style={{ color: textColor }} className="pb-6 opacity-80">{faq.a}</motion.p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      <HorizonLine />

      {/* 6. Booking CTA */}
      <section id="booking" className="relative py-32 md:py-48 px-6 flex items-center justify-center relative z-10">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <Image src="/images/bottom-dining-section.webp" alt="Dining" fill className="object-cover" />
        </div>
        <div className="relative z-10 text-center max-w-2xl">
          <h2 className="text-4xl md:text-7xl font-serif text-gold mb-8">Begin Your Journey</h2>
          <p className="text-warm-white/80 mb-12 text-lg">Reserve your sanctuary in the dunes today.</p>
          <Button 
            onClick={() => { setDefaultPkg(""); setIsBookingOpen(true); }}
            variant="primary" 
            className="px-12 py-5 text-lg"
          >
            Request Booking
          </Button>
        </div>
      </section>
    </motion.div>
  );
}
