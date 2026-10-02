"use client";

import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/918107644857?text=Hello,%20I%20would%20like%20to%20inquire%20about%20a%20booking%20at%20Desert%20Horizon."
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:scale-110 hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
      aria-label="Contact us on WhatsApp"
    >
      <MessageCircle size={32} />
      <span className="absolute right-full mr-4 bg-white text-charcoal px-4 py-2 rounded-lg text-sm font-semibold opacity-0 translate-x-4 scale-95 group-hover:opacity-100 group-hover:translate-x-0 group-hover:scale-100 transition-all duration-300 ease-out whitespace-nowrap shadow-[0_10px_25px_-5px_rgba(0,0,0,0.1)] pointer-events-none origin-right flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
        Chat with us
        <span className="absolute -right-2 top-1/2 -translate-y-1/2 border-[6px] border-transparent border-l-white" />
      </span>
    </a>
  );
}
