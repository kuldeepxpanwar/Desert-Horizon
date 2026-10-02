import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-[#0a0a0f] text-warm-white py-24 overflow-hidden border-t border-gold/10">
      {/* Night Sky Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Moonlight Glow */}
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-900/20 rounded-[100%] blur-[120px]" />
        
        {/* Static Stars (CSS approach) */}
        <div className="absolute top-10 left-[10%] w-1 h-1 bg-white rounded-full opacity-50" />
        <div className="absolute top-32 left-[25%] w-1.5 h-1.5 bg-white rounded-full opacity-70 blur-[1px]" />
        <div className="absolute top-16 left-[80%] w-1 h-1 bg-white rounded-full opacity-40" />
        <div className="absolute top-48 left-[70%] w-2 h-2 bg-white rounded-full opacity-80 blur-[2px]" />
        <div className="absolute top-20 left-[50%] w-1 h-1 bg-white rounded-full opacity-30" />
      </div>

      <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 relative z-10">
        <div className="md:col-span-2">
          <h2 className="text-3xl font-serif mb-6 text-gold">Desert Horizon</h2>
          <p className="text-warm-white/70 max-w-sm mb-8 leading-relaxed">
            Experience the ultimate luxury in the heart of the Thar Desert. Unforgettable nights beneath the stars of Jaisalmer.
          </p>
          <div className="flex gap-6 text-sm uppercase tracking-widest font-semibold">
            <a href="#" className="hover:text-gold transition-colors">Instagram</a>
            <a href="#" className="hover:text-gold transition-colors">Facebook</a>
            <a href="#" className="hover:text-gold transition-colors">X</a>
          </div>
        </div>

        <div>
          <h3 className="text-sm uppercase tracking-widest font-semibold text-gold mb-6">Explore</h3>
          <ul className="space-y-4">
            <li><Link href="/packages" className="text-warm-white/70 hover:text-gold transition-colors">Tour Packages</Link></li>
            <li><Link href="/taxi" className="text-warm-white/70 hover:text-gold transition-colors">Taxi Services</Link></li>
            <li><Link href="/experiences" className="text-warm-white/70 hover:text-gold transition-colors">Experiences</Link></li>
            <li><Link href="/luxury-camp" className="text-warm-white/70 hover:text-gold transition-colors">Luxury Camp</Link></li>
            <li><Link href="/gallery" className="text-warm-white/70 hover:text-gold transition-colors">Gallery</Link></li>
            <li><Link href="/about" className="text-warm-white/70 hover:text-gold transition-colors">Our Story</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm uppercase tracking-widest font-semibold text-gold mb-6">Contact</h3>
          <ul className="space-y-4 text-warm-white/70">
            <li className="flex items-center gap-3">
              <MapPin size={18} className="text-gold" /> Sam Sand Dunes, Jaisalmer
            </li>
            <li className="flex items-center gap-3">
              <Phone size={18} className="text-gold" /> +91 98765 43210
            </li>
            <li className="flex items-center gap-3">
              <Mail size={18} className="text-gold" /> hello@deserthorizon.com
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
