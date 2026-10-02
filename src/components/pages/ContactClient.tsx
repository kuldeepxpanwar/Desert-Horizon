"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import HorizonLine from "@/components/ui/HorizonLine";
import Button from "@/components/ui/Button";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function ContactClient() {
  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const heroScale = useTransform(heroScroll, [0, 1], [1, 1.1]);
  const heroOpacity = useTransform(heroScroll, [0, 1], [1, 0]);
  const heroY = useTransform(heroScroll, [0, 1], [0, 100]);

  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success">("idle");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    if (formData.get("botcheck")) {
      // Honeypot triggered, silently succeed for bots
      return setFormStatus("success");
    }
    
    setFormStatus("submitting");
    setTimeout(() => setFormStatus("success"), 1500);
  };

  return (
    <div className="flex flex-col w-full overflow-hidden bg-canvas-parchment">
      
      {/* 1. Cinematic Hero */}
      <section ref={heroRef} className="relative h-[50vh] w-full flex items-center justify-center overflow-hidden bg-charcoal">
        <motion.div 
          style={{ scale: heroScale, y: heroY }} 
          className="absolute inset-0 w-full h-full"
        >
          <Image
            src="/images/home-hero.webp"
            alt="Contact Us"
            fill
            priority
            className="object-cover object-center"
          />
        </motion.div>
        <div className="absolute inset-0 bg-black/60" />
        <motion.div 
          style={{ opacity: heroOpacity }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 text-center text-warm-white px-6 mt-20"
        >
          <span className="text-sm uppercase tracking-[0.3em] mb-6 block text-gold">Get in touch</span>
          <h1 className="text-5xl md:text-7xl font-serif leading-tight">
            Contact Us
          </h1>
        </motion.div>
      </section>

      <HorizonLine />

      {/* 2. Contact Grid */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-16">
            
            {/* Contact Info */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8 }}
              className="space-y-12"
            >
              <div>
                <h2 className="text-4xl font-serif text-brown mb-6">Reach the Desert</h2>
                <p className="text-brown/70 text-lg">Whether you have a question about our luxury tents, safaris, or custom events, our team is ready to assist you.</p>
              </div>

              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white flex items-center justify-center rounded-full text-gold shadow-sm shrink-0">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="text-sm uppercase tracking-widest font-semibold text-brown mb-1">Location</h4>
                    <p className="text-brown/70 leading-relaxed">Sam Sand Dunes, Desert National Park,<br/>Jaisalmer, Rajasthan 345001</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white flex items-center justify-center rounded-full text-gold shadow-sm shrink-0">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4 className="text-sm uppercase tracking-widest font-semibold text-brown mb-1">Phone</h4>
                    <p className="text-brown/70 leading-relaxed">+91 98765 43210<br/>+91 98765 43211</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white flex items-center justify-center rounded-full text-gold shadow-sm shrink-0">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h4 className="text-sm uppercase tracking-widest font-semibold text-brown mb-1">Email</h4>
                    <p className="text-brown/70 leading-relaxed">reservations@deserthorizon.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white flex items-center justify-center rounded-full text-gold shadow-sm shrink-0">
                    <Clock size={24} />
                  </div>
                  <div>
                    <h4 className="text-sm uppercase tracking-widest font-semibold text-brown mb-1">Reception Hours</h4>
                    <p className="text-brown/70 leading-relaxed">24 Hours / 7 Days</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8 }}
              className="bg-white p-10 shadow-xl rounded-sm"
            >
              <h3 className="text-3xl font-serif text-brown mb-8">Send an Inquiry</h3>
              
              {formStatus === "success" ? (
                <div className="h-full min-h-[300px] flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-16 h-16 bg-gold/10 text-gold rounded-full flex items-center justify-center mb-4">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h4 className="text-2xl font-serif text-brown">Message Received</h4>
                  <p className="text-brown/70">Thank you. Our reservation team will contact you shortly.</p>
                  <Button variant="ghost" onClick={() => setFormStatus("idle")} className="mt-8">Send Another</Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Honeypot field for bot protection */}
                  <div className="hidden" aria-hidden="true">
                    <label htmlFor="botcheck">Don't fill this out if you're human:</label>
                    <input type="text" id="botcheck" name="botcheck" tabIndex={-1} />
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="firstName" className="text-xs uppercase tracking-widest font-semibold text-brown/70">First Name</label>
                      <input id="firstName" name="firstName" required type="text" className="w-full bg-canvas-parchment border-none focus:ring-1 focus:ring-gold px-4 py-3 outline-none" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="lastName" className="text-xs uppercase tracking-widest font-semibold text-brown/70">Last Name</label>
                      <input id="lastName" name="lastName" required type="text" className="w-full bg-canvas-parchment border-none focus:ring-1 focus:ring-gold px-4 py-3 outline-none" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-xs uppercase tracking-widest font-semibold text-brown/70">Email Address</label>
                    <input id="email" name="email" required type="email" className="w-full bg-canvas-parchment border-none focus:ring-1 focus:ring-gold px-4 py-3 outline-none" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-xs uppercase tracking-widest font-semibold text-brown/70">Message</label>
                    <textarea id="message" name="message" required rows={4} className="w-full bg-canvas-parchment border-none focus:ring-1 focus:ring-gold px-4 py-3 outline-none resize-none"></textarea>
                  </div>
                  <Button variant="primary" className="w-full justify-center">
                    {formStatus === "submitting" ? "Sending..." : "Submit Inquiry"}
                  </Button>
                </form>
              )}
            </motion.div>

          </div>
        </div>
      </section>

      <HorizonLine />

      {/* 3. Map Placeholder */}
      <section className="h-[400px] w-full relative bg-charcoal/5 flex items-center justify-center">
        <div className="absolute inset-0 grayscale opacity-50">
          <Image src="/images/home-hero.webp" alt="Map" fill className="object-cover" />
        </div>
        <div className="relative z-10 bg-white p-6 shadow-xl text-center">
          <p className="font-serif text-2xl text-brown mb-2">Jaisalmer, Rajasthan</p>
          <p className="text-sm text-brown/60 uppercase tracking-widest">Interactive Map Placeholder</p>
        </div>
      </section>

    </div>
  );
}
