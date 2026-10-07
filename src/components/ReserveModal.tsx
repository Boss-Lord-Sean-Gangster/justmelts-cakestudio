"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, Calendar, Users, Heart, CheckCircle2, MessageSquare } from "lucide-react";
import confetti from "canvas-confetti";

interface ReserveModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReserveModal: React.FC<ReserveModalProps> = ({ isOpen, onClose }) => {
  const [names, setNames] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [guests, setGuests] = useState(85);
  const [topperText, setTopperText] = useState("Engaged");
  const [flavourSet, setFlavourSet] = useState("signature");
  const [submitted, setSubmitted] = useState(false);
  const [bookingRef, setBookingRef] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Trigger champagne and rose gold confetti burst
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#C9A66B", "#E8B4B8", "#C98A93", "#FFFFFF", "#F6ECEA"],
    });

    const ref = `JM-${Math.floor(100000 + Math.random() * 900000)}`;
    setBookingRef(ref);
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-charcoal/40 backdrop-blur-md transition-opacity"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-2xl bg-[#ECEDE7] rounded-3xl border border-champagne/40 shadow-2xl p-6 sm:p-10 my-8 z-10 overflow-hidden"
          >
            {/* Top Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-full text-charcoal/50 hover:text-charcoal hover:bg-studio-surface transition-colors focus:outline-none"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {!submitted ? (
              <div>
                {/* Modal Header */}
                <div className="text-center max-w-md mx-auto mb-8">
                  <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blush-soft border border-champagne/30 mb-3">
                    <Sparkles className="w-3.5 h-3.5 text-champagne" />
                    <span className="text-[10px] uppercase tracking-[0.25em] text-blush-deep font-semibold">
                      Bespoke Reservation
                    </span>
                  </div>

                  <h3 className="font-serif text-3xl sm:text-4xl text-charcoal font-normal tracking-tight luxury-headline">
                    Reserve Your Cake
                  </h3>
                  <p className="text-xs sm:text-sm text-charcoal-muted font-light mt-2">
                    Due to our handcrafted technique, we accept only 4 commissions per calendar week.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Couple Names */}
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-charcoal/70 mb-1.5 font-medium">
                        Couple / Honoree Names *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Julian & Vivienne"
                        value={names}
                        onChange={(e) => setNames(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-white border border-champagne/30 text-charcoal text-sm focus:outline-none focus:border-champagne focus:ring-1 focus:ring-champagne transition-all"
                      />
                    </div>

                    {/* Celebration Date */}
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-charcoal/70 mb-1.5 font-medium">
                        Celebration Date *
                      </label>
                      <div className="relative">
                        <input
                          type="date"
                          required
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl bg-white border border-champagne/30 text-charcoal text-sm focus:outline-none focus:border-champagne focus:ring-1 focus:ring-champagne transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Email */}
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-charcoal/70 mb-1.5 font-medium">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="vivienne@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-white border border-champagne/30 text-charcoal text-sm focus:outline-none focus:border-champagne focus:ring-1 focus:ring-champagne transition-all"
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-charcoal/70 mb-1.5 font-medium">
                        Contact Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+1 (555) 019-2834"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-white border border-champagne/30 text-charcoal text-sm focus:outline-none focus:border-champagne focus:ring-1 focus:ring-champagne transition-all"
                      />
                    </div>
                  </div>

                  {/* Guest Count Slider */}
                  <div className="p-4 rounded-2xl bg-white/70 border border-champagne/25">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs uppercase tracking-wider text-charcoal/70 font-medium">
                        Estimated Guest Count
                      </span>
                      <span className="font-serif text-base font-semibold text-charcoal">
                        {guests} Guests ({Math.ceil(guests * 1.1)} Slices)
                      </span>
                    </div>
                    <input
                      type="range"
                      min="40"
                      max="140"
                      step="5"
                      value={guests}
                      onChange={(e) => setGuests(Number(e.target.value))}
                      className="w-full accent-blush-deep cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-charcoal/40 font-mono mt-1">
                      <span>40 Servings (2 Tiers)</span>
                      <span>85 Servings (Signature 3 Tiers)</span>
                      <span>140 Servings (Grand Tiered)</span>
                    </div>
                  </div>

                  {/* Custom Topper Monogram */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-charcoal/70 mb-1.5 font-medium">
                      Diamond Ring Topper Inscription
                    </label>
                    <input
                      type="text"
                      maxLength={18}
                      placeholder="Default: 'Engaged' (or couple initials)"
                      value={topperText}
                      onChange={(e) => setTopperText(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-white border border-champagne/30 text-charcoal text-sm focus:outline-none focus:border-champagne focus:ring-1 focus:ring-champagne transition-all"
                    />
                    <span className="text-[10px] text-charcoal-muted mt-1 block">
                      Laser-engraved in champagne mirror acrylic with 24k gold tint.
                    </span>
                  </div>

                  {/* Flavour Preference */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-charcoal/70 mb-1.5 font-medium">
                      Flavour Architecture
                    </label>
                    <select
                      value={flavourSet}
                      onChange={(e) => setFlavourSet(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-white border border-champagne/30 text-charcoal text-sm focus:outline-none focus:border-champagne focus:ring-1 focus:ring-champagne transition-all"
                    >
                      <option value="signature">
                        Signature Trio: Vanilla Rosewater + Wild Raspberry + Salted Caramel Pistachio
                      </option>
                      <option value="floral">
                        Botanical Garden: Tahitian Vanilla + Elderflower Peach + Pistachio Rose
                      </option>
                      <option value="chocolate">
                        Luxe Cocoa: Belgian Dark Chocolate + Espresso Ganache + Salted Caramel
                      </option>
                      <option value="custom">
                        Bespoke Tasting Consultation (Design your own tiers)
                      </option>
                    </select>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="luxury-btn w-full py-4 rounded-full text-white text-sm sm:text-base font-medium tracking-wide flex items-center justify-center space-x-2 shadow-btn group"
                    >
                      <span>Request Date Availability</span>
                      <Sparkles className="w-4 h-4 text-white group-hover:rotate-45 transition-transform" />
                    </button>
                    <p className="text-[11px] text-center text-charcoal/45 mt-2.5">
                      No deposit required for initial consultation and date hold.
                    </p>
                  </div>
                </form>
              </div>
            ) : (
              /* Success Confirmation */
              <div className="text-center py-8 space-y-6">
                <div className="w-16 h-16 rounded-full bg-blush-soft border border-champagne/40 flex items-center justify-center mx-auto text-blush-deep">
                  <CheckCircle2 className="w-8 h-8 text-blush-deep" />
                </div>

                <div>
                  <span className="text-xs uppercase tracking-[0.25em] text-champagne font-semibold block mb-2">
                    Booking Request Received
                  </span>
                  <h3 className="font-serif text-3xl sm:text-4xl text-charcoal font-normal">
                    We&apos;ve reserved your date consultation.
                  </h3>
                  <p className="text-charcoal-muted text-sm sm:text-base font-light mt-3 max-w-md mx-auto leading-relaxed">
                    Thank you, <span className="font-medium text-charcoal">{names || "valued guest"}</span>. Our lead pâtissier will review your event details and reach out within 24 hours.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-champagne/30 max-w-sm mx-auto text-left space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-charcoal/50">Reference ID:</span>
                    <span className="font-mono font-semibold text-charcoal">{bookingRef}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-charcoal/50">Requested Date:</span>
                    <span className="text-charcoal font-medium">{date || "To be confirmed"}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-charcoal/50">Topper Inscription:</span>
                    <span className="text-charcoal font-medium">&ldquo;{topperText}&rdquo;</span>
                  </div>
                </div>

                <button
                  onClick={handleReset}
                  className="luxury-btn px-8 py-3 rounded-full text-white text-xs sm:text-sm font-medium tracking-wide"
                >
                  Return to Exploration
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

