"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Check, ChevronRight } from "lucide-react";

interface FlavourTier {
  id: string;
  name: string;
  tier: string;
  description: string;
  sponge: string;
  filling: string;
  frosting: string;
  tastingNotes: string[];
  color: string;
  accent: string;
}

const flavours: FlavourTier[] = [
  {
    id: "tier-1",
    tier: "Top Tier (6 Inch)",
    name: "Madagascar Vanilla & Rosewater Ganache",
    description:
      "A tender, slow-churned bourbon vanilla sponge infused with organic Damask rosewater and layered with white velvet ganache.",
    sponge: "Bourbon Vanilla Bean Sponge",
    filling: "Damask Rosewater & White Chocolate Ganache",
    frosting: "Blush-tinted Swiss Meringue Buttercream",
    tastingNotes: ["Floral Sweetness", "Creamy Bourbon Vanilla", "Airy Texture"],
    color: "#F6ECEA",
    accent: "#E8B4B8",
  },
  {
    id: "tier-2",
    tier: "Middle Tier (8 Inch)",
    name: "Wild Raspberry & Champagne Velvet",
    description:
      "Hand-crushed alpine raspberries cooked into a sharp coulis, paired with brut champagne-soaked genoise for exquisite brightness.",
    sponge: "Brut Champagne Infused Genoise",
    filling: "Alpine Raspberry Reduction & French Custard",
    frosting: "Ivory Horizontal-Textured Buttercream",
    tastingNotes: ["Crisp Champagne Acidity", "Tart Summer Berries", "Velvety Crumb"],
    color: "#F9F0F1",
    accent: "#C98A93",
  },
  {
    id: "tier-3",
    tier: "Base Tier (10 Inch)",
    name: "Salted Caramel & Sicilian Pistachio Crunch",
    description:
      "A sturdy, melt-in-mouth golden sponge enveloped with fleur de sel caramel and roasted bronte pistachio praline.",
    sponge: "Brown Butter & Sicilian Pistachio Cake",
    filling: "Fleur de Sel Caramel & Praline Feuilletine",
    frosting: "Dual-tone Blush Ombré Buttercream",
    tastingNotes: ["Rich Brown Butter", "Roasted Nut Crunch", "Sea Salt Caramel"],
    color: "#F1EEE9",
    accent: "#C9A66B",
  },
];

interface FlavourShowcaseProps {
  onOpenReserve: () => void;
}

export const FlavourShowcase: React.FC<FlavourShowcaseProps> = ({ onOpenReserve }) => {
  const [activeTier, setActiveTier] = useState<string>("tier-1");

  const selectedTier = flavours.find((f) => f.id === activeTier) || flavours[0];

  return (
    <section id="flavours" className="py-28 sm:py-36 px-6 sm:px-12 bg-studio-bg border-t border-champagne/20 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-blush-light/50 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-studio-surface border border-champagne/30 mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-champagne" />
            <span className="text-[11px] uppercase tracking-[0.25em] text-charcoal/80 font-medium">
              Bespoke Taste Architecture
            </span>
          </div>

          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl tracking-tight leading-[1.08] mb-4 luxury-headline font-normal">
            Refined flavours for unforgettable moments.
          </h2>
          <p className="text-charcoal-muted text-sm sm:text-base md:text-lg font-light leading-relaxed">
            Each tier can be individually tailored with our signature recipes, baked from scratch using single-origin botanicals and French dairy.
          </p>
        </div>

        {/* Tier Selector Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-12">
          {flavours.map((tier) => (
            <button
              key={tier.id}
              onClick={() => setActiveTier(tier.id)}
              className={`px-5 py-3 rounded-full text-xs sm:text-sm tracking-wide transition-all duration-300 font-medium flex items-center space-x-2 border ${
                activeTier === tier.id
                  ? "bg-charcoal text-white border-charcoal shadow-md scale-105"
                  : "bg-white/80 text-charcoal/70 border-champagne/30 hover:border-champagne hover:bg-white"
              }`}
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: tier.accent }}
              />
              <span>{tier.tier}</span>
            </button>
          ))}
        </div>

        {/* Active Flavour Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedTier.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="bg-white/90 backdrop-blur-xl rounded-3xl border border-champagne/35 p-8 sm:p-12 md:p-14 shadow-luxe max-w-4xl mx-auto"
          >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
              {/* Left Column: Tasting Notes & Description */}
              <div className="md:col-span-7 space-y-6">
                <div>
                  <span className="text-xs uppercase tracking-[0.25em] text-champagne font-semibold block mb-2">
                    {selectedTier.tier}
                  </span>
                  <h3 className="font-serif text-2xl sm:text-4xl text-charcoal font-normal tracking-tight leading-snug">
                    {selectedTier.name}
                  </h3>
                </div>

                <p className="text-charcoal-muted text-sm sm:text-base leading-relaxed font-light">
                  {selectedTier.description}
                </p>

                {/* Recipe Architecture */}
                <div className="space-y-3 pt-4 border-t border-charcoal/5">
                  <div className="flex items-start space-x-3 text-xs sm:text-sm">
                    <span className="font-medium text-charcoal w-24 flex-shrink-0">Crumb:</span>
                    <span className="text-charcoal-muted font-light">{selectedTier.sponge}</span>
                  </div>
                  <div className="flex items-start space-x-3 text-xs sm:text-sm">
                    <span className="font-medium text-charcoal w-24 flex-shrink-0">Interlayer:</span>
                    <span className="text-charcoal-muted font-light">{selectedTier.filling}</span>
                  </div>
                  <div className="flex items-start space-x-3 text-xs sm:text-sm">
                    <span className="font-medium text-charcoal w-24 flex-shrink-0">Finish:</span>
                    <span className="text-charcoal-muted font-light">{selectedTier.frosting}</span>
                  </div>
                </div>

                {/* Notes pills */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {selectedTier.tastingNotes.map((note) => (
                    <span
                      key={note}
                      className="px-3 py-1 rounded-full bg-studio-surface border border-champagne/25 text-[11px] font-medium text-charcoal/80 flex items-center space-x-1.5"
                    >
                      <Check className="w-3 h-3 text-blush-deep" />
                      <span>{note}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Right Column: Visual Tier Display Card */}
              <div className="md:col-span-5 flex flex-col items-center justify-center p-8 rounded-2xl bg-studio-soft border border-champagne/20 text-center relative overflow-hidden">
                <div
                  className="w-32 h-32 rounded-full mb-6 flex items-center justify-center shadow-inner relative"
                  style={{ backgroundColor: selectedTier.color }}
                >
                  <div
                    className="w-24 h-24 rounded-full border border-dashed flex items-center justify-center"
                    style={{ borderColor: selectedTier.accent }}
                  >
                    <span className="font-serif text-3xl font-medium text-charcoal">
                      {selectedTier.id === "tier-1" ? "6″" : selectedTier.id === "tier-2" ? "8″" : "10″"}
                    </span>
                  </div>
                </div>

                <span className="text-xs uppercase tracking-[0.2em] text-charcoal/60 mb-1">
                  Estimated Portions
                </span>
                <span className="font-serif text-xl text-charcoal font-medium mb-4">
                  {selectedTier.id === "tier-1"
                    ? "12 – 16 Slices"
                    : selectedTier.id === "tier-2"
                    ? "24 – 30 Slices"
                    : "40 – 48 Slices"}
                </span>

                <button
                  onClick={onOpenReserve}
                  className="luxury-btn px-6 py-2.5 rounded-full text-white text-xs font-medium tracking-wide flex items-center space-x-2 group shadow-sm"
                >
                  <span>Request Custom Tier</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Serving Summary Bar */}
        <div className="mt-16 p-6 rounded-2xl bg-white/70 border border-champagne/25 flex flex-col md:flex-row items-center justify-between gap-4 max-w-4xl mx-auto shadow-sm">
          <div className="text-center md:text-left">
            <h4 className="font-serif text-lg text-charcoal font-medium">
              Three-Tier Total Capacity: 75 – 95 Celebration Servings
            </h4>
            <p className="text-xs text-charcoal-muted font-light mt-0.5">
              Includes acrylic diamond ring topper, dowel support structure, and protective presentation box.
            </p>
          </div>
          <button
            onClick={onOpenReserve}
            className="text-xs uppercase tracking-[0.2em] font-medium text-blush-deep hover:text-charcoal transition-colors border-b border-blush-deep pb-0.5 flex-shrink-0"
          >
            Download Cake Cut Guide
          </button>
        </div>
      </div>
    </section>
  );
};

