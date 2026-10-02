"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ReactNode, useRef, MouseEvent } from "react";
import { useRouter } from "next/navigation";

interface ButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  variant?: "primary" | "secondary" | "ghost" | "outline";
}

export default function Button({ children, href, onClick, className = "", variant = "primary" }: ButtonProps) {
  const router = useRouter();
  const ref = useRef<HTMLButtonElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: MouseEvent<HTMLButtonElement>) => {
    const node = ref.current;
    if (!node) return;
    const { left, top, width, height } = node.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;
    x.set(distanceX * 0.2); // 20% pull towards cursor
    y.set(distanceY * 0.2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };
  
  const baseClasses = "relative inline-flex items-center gap-3 px-8 py-4 uppercase tracking-widest text-sm font-semibold transition-colors duration-300 group";
  
  const variants = {
    primary: "bg-gold text-charcoal hover:bg-warm-white shadow-lg",
    secondary: "bg-brown text-warm-white hover:bg-gold shadow-lg",
    ghost: "border border-brown text-brown hover:bg-brown hover:text-warm-white",
    outline: "border border-charcoal/20 bg-transparent text-charcoal hover:bg-charcoal hover:text-white"
  };

  const buttonClasses = `${baseClasses} ${variants[variant]} ${className}`;

  const handleClick = (e: React.MouseEvent) => {
    if (onClick) onClick();
    if (href) {
      e.preventDefault();
      if (href.startsWith("#")) {
        document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
      } else {
        router.push(href);
      }
    }
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      style={{ x: springX, y: springY }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={buttonClasses}
    >
      <motion.span 
        style={{ x: useTransform(springX, (v) => v * 0.5), y: useTransform(springY, (v) => v * 0.5) }}
        className="relative z-10 flex items-center gap-3 w-full justify-center"
      >
        {children}
      </motion.span>
    </motion.button>
  );
}
