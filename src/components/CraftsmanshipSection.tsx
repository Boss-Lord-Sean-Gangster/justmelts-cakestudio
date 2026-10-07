"use client";

import React from "react";
import { Sparkles, Shield, HeartHandshake, Truck, Feather } from "lucide-react";

export const CraftsmanshipSection: React.FC = () => {
  const pillars = [
    {
      icon: Feather,
      title: "Artisanal Crumb Maturation",
      subtitle: "36-Hour Rested Structure",
      description:
        "Every sponge undergoes an unhurried 36-hour slow maturation, locking in natural botanical aromatics and ensuring seamless vertical slice integrity.",
    },
    {
      icon: Sparkles,
      title: "Hand-Spun Buttercream",
      subtitle: "Pure Cultured Butter",
      description:
        "Wipped for 45 minutes until silky and ethereal, our Swiss meringue buttercream achieves a warm-white porcelain sheen without artificial food coloring.",
    },
    {
      icon: HeartHandshake,
      title: "Floral Floristry Placement",
      subtitle: "Stem-Wrapped Botanicals",
      description:
        "Organically grown spray roses and baby's-breath are water-sealed and placed one bloom at a time, creating the signature weightless halo.",
    },
    {
      icon: Truck,
      title: "White Glove Chilled Courier",
      subtitle: "Temperature-Controlled Transit",
      description:
        "Delivered in our bespoke shock-absorbing acrylic presentation showcase, kept at a steady 12°C until moment of table reveal.",
    },
  ];

  return (
    <section id="craftsmanship" className="py-28 sm:py-36 px-6 sm:px-12 bg-[#F1EEE9]/60 border-t border-champagne/20 relative">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white border border-champagne/30 mb-4 shadow-sm">
            <Shield className="w-3.5 h-3.5 text-champagne" />
            <span className="text-[11px] uppercase tracking-[0.25em] text-charcoal/80 font-medium">
              Atelier Standards
            </span>
          </div>

          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl tracking-tight leading-[1.08] mb-4 luxury-headline font-normal">
            Precision engineering.<br />Confectionery poetry.
          </h2>

          <p className="text-charcoal-muted text-sm sm:text-base md:text-lg font-light leading-relaxed">
            Behind the effortless blush silhouette lies rigorous culinary architecture. Every angle, tier height, and floral distance is calibrated to perfection.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="bg-white/80 backdrop-blur-md p-8 rounded-3xl border border-champagne/25 shadow-card hover:shadow-luxe hover:border-champagne/60 transition-all duration-400 group flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-blush-soft border border-champagne/30 flex items-center justify-center text-blush-deep mb-6 group-hover:scale-110 group-hover:bg-blush-light transition-all duration-300">
                    <Icon className="w-5 h-5 text-blush-deep" />
                  </div>

                  <span className="text-[11px] uppercase tracking-[0.2em] text-champagne font-semibold block mb-1">
                    {pillar.subtitle}
                  </span>

                  <h3 className="font-serif text-xl sm:text-2xl text-charcoal font-medium mb-3 leading-snug">
                    {pillar.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-charcoal-muted font-light leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-charcoal/5 flex items-center justify-between">
                  <span className="font-mono text-[10px] text-charcoal/40 tracking-wider">
                    0{i + 1} // SPEC
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-champagne/60 group-hover:bg-blush-deep transition-colors" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

