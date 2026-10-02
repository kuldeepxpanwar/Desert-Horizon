"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { X, Calendar, Users, Package, ChevronRight, Check } from "lucide-react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { format } from "date-fns";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultPackage?: string;
}

export default function BookingModal({ isOpen, onClose, defaultPackage = "" }: BookingModalProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState<Date>();
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [guests, setGuests] = useState("2");
  const [selectedPackage, setSelectedPackage] = useState(defaultPackage || "The Luxury Oasis");
  
  const [activities, setActivities] = useState({
    jeepSafari: false,
    quadBiking: false,
    parasailing: false,
  });

  useEffect(() => {
    if (isOpen && defaultPackage) {
      setSelectedPackage(defaultPackage);
    }
  }, [isOpen, defaultPackage]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => { document.body.style.overflow = "auto"; };
  }, [isOpen]);

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    
    const activityList = Object.entries(activities)
      .filter(([_, isSelected]) => isSelected)
      .map(([key]) => {
        if (key === "jeepSafari") return "Jeep Safari";
        if (key === "quadBiking") return "Quad Biking";
        if (key === "parasailing") return "Parasailing";
        return key;
      })
      .join(", ");

    const message = `Hello Desert Horizon!\nI would like to make a booking inquiry:\n\n*Name:* ${name}\n*Phone:* ${phone}\n*Date:* ${date ? format(date, 'PPP') : 'Not selected'}\n*Guests:* ${guests}\n*Package:* ${selectedPackage}\n${activityList ? `*Extra Activities:* ${activityList}\n` : ""}
Please confirm availability and total cost.`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/918107644857?text=${encodedMessage}`;
    
    window.open(whatsappUrl, "_blank");
    onClose();
  };

  const backdropVariants: Variants = {
    hidden: { opacity: 0, backdropFilter: "blur(0px)" },
    visible: { opacity: 1, backdropFilter: "blur(12px)" },
  };

  const modalVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95, y: 30 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 30 }
    },
    exit: { opacity: 0, scale: 0.95, y: 20 }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Glassmorphism Backdrop */}
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={onClose}
            className="fixed inset-0 z-50 bg-charcoal/60"
          />
          
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 pointer-events-none">
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="bg-gradient-to-br from-[#FDFBF7] to-[#F5F2EA] w-full max-w-2xl max-h-[90vh] flex flex-col shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] border border-white/50 pointer-events-auto rounded-xl relative overflow-hidden"
            >
              {/* Refined Header */}
              <div className="shrink-0 bg-transparent z-10 px-8 py-6 flex justify-between items-center relative">
                <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-brown/5 via-brown/20 to-brown/5" />
                <div>
                  <h3 className="font-serif text-3xl tracking-wide text-brown">Book Your Stay</h3>
                  <p className="text-brown/50 text-sm mt-1 font-medium">Verify availability via our concierge</p>
                </div>
                <button 
                  onClick={onClose}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-white/50 hover:bg-white shadow-sm border border-brown/5 text-brown/70 hover:text-brown hover:scale-105 transition-all"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Form Body */}
              <form onSubmit={handleBooking} className="flex-1 min-h-0 px-8 py-6 space-y-8 overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                
                {/* Personal Info */}
                <div className="space-y-5">
                  <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-gold flex items-center gap-4">
                    Guest Details
                    <div className="flex-1 h-px bg-brown/10" />
                  </h4>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2 group">
                      <label className="text-xs font-semibold uppercase tracking-wider text-brown/70 group-focus-within:text-gold transition-colors">Full Name</label>
                      <input 
                        required 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        onKeyDown={(e) => { if (e.key === 'Enter') e.preventDefault(); }}
                        type="text" 
                        placeholder="e.g. Rahul Sharma"
                        className="w-full bg-white/60 backdrop-blur-sm border border-brown/10 px-4 py-3.5 outline-none focus:border-gold focus:ring-4 focus:ring-gold/10 focus:bg-white hover:bg-white transition-all rounded-lg text-brown placeholder:text-brown/30 shadow-sm" 
                      />
                    </div>
                    <div className="space-y-2 group">
                      <label className="text-xs font-semibold uppercase tracking-wider text-brown/70 group-focus-within:text-gold transition-colors">Mobile Number</label>
                      <input 
                        required 
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        onKeyDown={(e) => { if (e.key === 'Enter') e.preventDefault(); }}
                        type="tel"
                        inputMode="numeric"
                        pattern="[0-9]*" 
                        placeholder="+91"
                        className="w-full bg-white/60 backdrop-blur-sm border border-brown/10 px-4 py-3.5 outline-none focus:border-gold focus:ring-4 focus:ring-gold/10 focus:bg-white hover:bg-white transition-all rounded-lg text-brown placeholder:text-brown/30 shadow-sm" 
                      />
                    </div>
                  </div>
                </div>

                {/* Stay Info */}
                <div className="space-y-5">
                  <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-gold flex items-center gap-4">
                    Stay Requirements
                    <div className="flex-1 h-px bg-brown/10" />
                  </h4>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2 group relative">
                      <label className="text-xs font-semibold uppercase tracking-wider text-brown/70 group-focus-within:text-gold transition-colors">Check-in Date</label>
                      <div className="relative">
                        <div 
                          onClick={() => setIsCalendarOpen(!isCalendarOpen)}
                          className="w-full bg-white/60 backdrop-blur-sm border border-brown/10 pl-12 pr-4 py-3.5 outline-none focus:border-gold focus:ring-4 focus:ring-gold/10 hover:bg-white transition-all rounded-lg text-brown shadow-sm relative cursor-pointer flex items-center h-[52px]"
                        >
                          <Calendar size={18} className={`absolute left-4 ${isCalendarOpen ? 'text-gold' : 'text-brown/40'} transition-colors z-10`} />
                          <span className={date ? "text-brown" : "text-brown/30"}>
                            {date ? format(date, "PPP") : "Select a date"}
                          </span>
                        </div>
                        <AnimatePresence>
                          {isCalendarOpen && (
                            <motion.div 
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              className="absolute top-full left-0 mt-2 p-3 bg-white rounded-xl shadow-2xl border border-brown/10 z-50"
                            >
                              <DayPicker
                                mode="single"
                                selected={date}
                                onSelect={(newDate) => { setDate(newDate); setIsCalendarOpen(false); }}
                                disabled={{ before: new Date() }}
                                classNames={{
                                  day_selected: "bg-gold text-white hover:bg-gold/90",
                                  day_today: "font-bold text-gold",
                                }}
                              />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                    <div className="space-y-2 group">
                      <label className="text-xs font-semibold uppercase tracking-wider text-brown/70 group-focus-within:text-gold transition-colors">Guests</label>
                      <div className="relative">
                        <Users size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-brown/40 group-focus-within:text-gold transition-colors z-10" />
                        <select 
                          value={guests}
                          onChange={(e) => setGuests(e.target.value)}
                          className="w-full bg-white/60 backdrop-blur-sm border border-brown/10 pl-12 pr-4 py-3.5 outline-none focus:border-gold focus:ring-4 focus:ring-gold/10 focus:bg-white hover:bg-white transition-all appearance-none rounded-lg text-brown shadow-sm cursor-pointer"
                        >
                          <option value="1">1 Person</option>
                          <option value="2">2 People (Couple Privilege)</option>
                          <option value="3">3 People</option>
                          <option value="4">4 People</option>
                          <option value="5+">5+ People (Group)</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 group pt-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-brown/70 group-focus-within:text-gold transition-colors">Select Package</label>
                    <div className="relative">
                      <Package size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-brown/40 group-focus-within:text-gold transition-colors z-10" />
                      <select 
                        value={selectedPackage}
                        onChange={(e) => setSelectedPackage(e.target.value)}
                        className="w-full bg-white/60 backdrop-blur-sm border border-brown/10 pl-12 pr-4 py-3.5 outline-none focus:border-gold focus:ring-4 focus:ring-gold/10 focus:bg-white hover:bg-white transition-all appearance-none rounded-lg text-brown shadow-sm font-medium cursor-pointer"
                      >
                        <option value="The Luxury Oasis">The Luxury Oasis (Most Popular)</option>
                        <option value="The Classic Safari">The Classic Safari</option>
                        <option value="The Royal Romance">The Royal Romance</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Add-ons */}
                <div className="space-y-5">
                  <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-gold flex items-center gap-4">
                    Curate Your Experience
                    <div className="flex-1 h-px bg-brown/10" />
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {/* Jeep Safari */}
                    <motion.label 
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className={`flex items-center gap-3 cursor-pointer group bg-white/80 backdrop-blur-sm border p-4 rounded-xl transition-all shadow-sm ${activities.jeepSafari ? 'border-gold ring-1 ring-gold/20' : 'border-brown/10 hover:border-gold/50 hover:shadow-md'}`}
                    >
                      <div className={`w-6 h-6 rounded-md flex items-center justify-center transition-colors border ${activities.jeepSafari ? 'bg-gold border-gold' : 'bg-white border-brown/20 group-hover:border-gold/50'}`}>
                        <AnimatePresence>
                          {activities.jeepSafari && (
                            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                              <Check size={14} className="text-white" strokeWidth={3} />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                      <span className={`text-sm font-semibold transition-colors ${activities.jeepSafari ? 'text-brown' : 'text-brown/70 group-hover:text-brown'}`}>Jeep Safari</span>
                      <input type="checkbox" className="hidden" checked={activities.jeepSafari} onChange={(e) => setActivities({...activities, jeepSafari: e.target.checked})} />
                    </motion.label>

                    {/* Quad Biking */}
                    <motion.label 
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className={`flex items-center gap-3 cursor-pointer group bg-white/80 backdrop-blur-sm border p-4 rounded-xl transition-all shadow-sm ${activities.quadBiking ? 'border-gold ring-1 ring-gold/20' : 'border-brown/10 hover:border-gold/50 hover:shadow-md'}`}
                    >
                      <div className={`w-6 h-6 rounded-md flex items-center justify-center transition-colors border ${activities.quadBiking ? 'bg-gold border-gold' : 'bg-white border-brown/20 group-hover:border-gold/50'}`}>
                        <AnimatePresence>
                          {activities.quadBiking && (
                            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                              <Check size={14} className="text-white" strokeWidth={3} />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                      <span className={`text-sm font-semibold transition-colors ${activities.quadBiking ? 'text-brown' : 'text-brown/70 group-hover:text-brown'}`}>Quad Biking</span>
                      <input type="checkbox" className="hidden" checked={activities.quadBiking} onChange={(e) => setActivities({...activities, quadBiking: e.target.checked})} />
                    </motion.label>

                    {/* Parasailing */}
                    <motion.label 
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className={`flex items-center gap-3 cursor-pointer group bg-white/80 backdrop-blur-sm border p-4 rounded-xl transition-all shadow-sm ${activities.parasailing ? 'border-gold ring-1 ring-gold/20' : 'border-brown/10 hover:border-gold/50 hover:shadow-md'}`}
                    >
                      <div className={`w-6 h-6 rounded-md flex items-center justify-center transition-colors border ${activities.parasailing ? 'bg-gold border-gold' : 'bg-white border-brown/20 group-hover:border-gold/50'}`}>
                        <AnimatePresence>
                          {activities.parasailing && (
                            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                              <Check size={14} className="text-white" strokeWidth={3} />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                      <span className={`text-sm font-semibold transition-colors ${activities.parasailing ? 'text-brown' : 'text-brown/70 group-hover:text-brown'}`}>Parasailing</span>
                      <input type="checkbox" className="hidden" checked={activities.parasailing} onChange={(e) => setActivities({...activities, parasailing: e.target.checked})} />
                    </motion.label>
                  </div>
                </div>

                {/* Submit Action */}
                <div className="pt-8 mt-4 relative">
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-brown/5 via-brown/20 to-brown/5" />
                  <motion.button 
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    type="submit"
                    className="w-full bg-charcoal text-gold hover:text-white hover:bg-brown transition-all duration-300 py-4 px-8 flex items-center justify-center gap-3 uppercase tracking-[0.2em] text-sm font-bold shadow-[0_10px_20px_-10px_rgba(20,20,20,0.5)] hover:shadow-[0_15px_25px_-10px_rgba(20,20,20,0.6)] rounded-lg group overflow-hidden relative"
                  >
                    <span className="relative z-10 py-1 flex items-center gap-3">
                      Confirm via WhatsApp
                      <motion.span
                        animate={{ x: [0, 5, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                      >
                        <ChevronRight size={18} />
                      </motion.span>
                    </span>
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                  </motion.button>
                  <p className="text-center text-xs font-medium text-brown/40 mt-5 flex items-center justify-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    Instant confirmation via our team
                  </p>
                </div>
              </form>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
