"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { scrollY } = useScroll();

  // 3-Stage Apple Style Scroll Transition
  // 1. Background color - Maintain glassmorphism (translucency)
  const bg = useTransform(
    scrollY,
    [0, 50, 150],
    ["rgba(253, 251, 247, 0)", "rgba(253, 251, 247, 0.5)", "rgba(253, 251, 247, 0.8)"] // Using warm-white off-white
  );
  
  // 2. Backdrop blur - Stronger blur for luxury feel
  const blur = useTransform(
    scrollY,
    [0, 50, 150],
    ["blur(0px)", "blur(12px)", "blur(24px)"]
  );

  // 3. Text color (White when at top, Charcoal when scrolling down)
  const textColor = useTransform(
    scrollY,
    [0, 50],
    ["rgb(255, 255, 255)", "rgb(43, 33, 24)"] // white to brown
  );

  const borderBottom = useTransform(
    scrollY,
    [0, 150],
    ["rgba(43, 33, 24, 0)", "rgba(43, 33, 24, 0.05)"]
  );

  // 4. Height (Compact on scroll)
  const py = useTransform(
    scrollY,
    [0, 150],
    ["1.5rem", "1rem"] // py-6 to py-4
  );

  const links = [
    { name: "Packages", href: "/packages" },
    { name: "Experiences", href: "/experiences" },
    { name: "Luxury Camp", href: "/luxury-camp" },
    { name: "Taxi", href: "/taxi" },
    { name: "Gallery", href: "/gallery" },
    { name: "Our Story", href: "/about" },
  ];

  return (
    <>
      <motion.nav
        style={{ backgroundColor: bg, backdropFilter: blur, paddingBottom: py, paddingTop: py, borderBottomColor: borderBottom }}
        className="fixed top-0 left-0 right-0 z-50 transition-colors duration-200 border-b"
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          <Link href="/">
            <motion.div 
              style={{ color: textColor }} 
              className="text-2xl md:text-3xl font-serif tracking-wide font-semibold flex gap-x-2"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 1 },
                visible: {
                  transition: { staggerChildren: 0.05, delayChildren: 2.0 } // delayed to wait for LoadingScreen
                }
              }}
            >
              {"Desert Horizon".split(" ").map((word, wordIndex) => (
                <span key={wordIndex} className="flex">
                  {word.split("").map((letter, letterIndex) => (
                    <motion.span
                      key={letterIndex}
                      variants={{
                        hidden: { opacity: 0, y: -10 },
                        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
                      }}
                    >
                      {letter}
                    </motion.span>
                  ))}
                </span>
              ))}
            </motion.div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <Link key={link.name} href={link.href}>
                <motion.span style={{ color: textColor }} className="text-sm uppercase tracking-widest font-semibold hover:text-gold transition-colors">
                  {link.name}
                </motion.span>
              </Link>
            ))}
            <Link href="/contact" className="ml-4 px-6 py-2 bg-gold text-charcoal uppercase tracking-widest text-xs font-bold hover:bg-brown hover:text-white transition-colors duration-300 rounded-sm">
              Book Now
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <motion.button 
            style={{ color: textColor }}
            className="md:hidden p-2" 
            aria-label="Open Menu"
            onClick={() => setIsOpen(true)}
          >
            <Menu size={24} />
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(24px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="fixed inset-0 z-[60] bg-charcoal/90 text-warm-white flex flex-col justify-center items-center"
          >
            <button aria-label="Close Menu" className="absolute top-8 right-6 p-2 text-gold hover:text-white transition-colors" onClick={() => setIsOpen(false)}>
              <X size={32} />
            </button>
            <div className="flex flex-col gap-8 text-center">
              {links.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                >
                  <Link href={link.href} onClick={() => setIsOpen(false)} className="text-3xl font-serif uppercase tracking-widest hover:text-gold transition-colors">
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: links.length * 0.1, duration: 0.4 }}
              >
                <Link href="/contact" onClick={() => setIsOpen(false)} className="mt-8 px-10 py-4 border border-gold text-gold hover:bg-gold hover:text-charcoal transition-colors uppercase tracking-widest text-sm font-bold rounded-sm inline-block">
                  Book Now
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
