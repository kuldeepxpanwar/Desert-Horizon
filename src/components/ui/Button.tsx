"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
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
  
  const baseClasses = "relative overflow-hidden inline-flex items-center gap-3 px-8 py-4 uppercase tracking-widest text-sm font-semibold transition-all duration-300 group";
  
  const variants = {
    primary: "bg-gold text-charcoal hover:bg-warm-white hover:[filter:url(#sand-ripple)]",
    secondary: "bg-brown text-warm-white hover:bg-gold hover:[filter:url(#sand-ripple)]",
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
      onClick={handleClick}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className={buttonClasses}
    >
      <span className="relative z-10 flex items-center gap-3">{children}</span>
    </motion.button>
  );
}
