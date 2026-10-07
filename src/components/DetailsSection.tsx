"use client";

import React from "react";
import { Sparkles, Eye, Gem, CircleDot, Flower2 } from "lucide-react";

export const DetailsSection: React.FC = () => {
  const specs = [
    {
      icon: Gem,
      tag: "Crowning Keepsake",
      title: "Gold Acrylic 'Engaged' Topper",
      detail:
        "Laser-cut in 3mm mirror-finish champagne acrylic, the diamond ring silhouette stands tall above the floral crown, designed to be treasured long after the final toast.",
    },
    {
      icon: CircleDot,
      tag: "Foundation Trim",
      title: "Hand-Strung Sugar Pearls",
      detail:
        "Over 400 miniature ivory confectionery pearls individually positioned at the base of every tier, creating a sharp, radiant boundary against the golden pedestal.",
    },
    {
      icon: Flower2,
      tag: "Botanical Embellishment",
      title: "Sweet Avalanche Roses",
      detail:
        "Sourced exclusively from sustainable English glasshouses, hand-selected for uniform petal petal opening, layered with gypsophila clouds.",
    },
    {
      icon: Sparkles,
      tag: "Surface Finish",
      title: "Artisan Horizontal Ribbing",
      detail:
        "Sculpted on a precision spinning turntable with stainless palette blades, forming delicate undulating striations that catch soft candle and studio light.",
    },
  ];

  return (
    <section id="details" className="py-28 sm:py-36 px-6 sm:px-12 bg-studio-bg border-t border-champagne/20 relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-studio-surface border border-champagne/30 mb-4 shadow-sm">
            <Eye className="w-3.5 h-3.5 text-champagne" />
            <span className="text-[11px] uppercase tracking-[0.25em] text-charcoal/80 font-medium">
              Magnified Nuance
            </span>
          </div>

          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl tracking-tight leading-[1.08] mb-4 luxury-headline font-normal">
            Every curve and contour,<br />deliberately composed.
          </h2>

          <p className="text-charcoal-muted text-sm sm:text-base md:text-lg font-light leading-relaxed">
            A luxury wedding cake should reward inspection from ten feet away across the ballroom, and from six inches away during the couple&apos;s cake cutting.
          </p>
        </div>

        {/* Spec Breakdown Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {specs.map((spec) => {
            const Icon = spec.icon;
            return (
              <div
                key={spec.title}
                className="bg-white/85 backdrop-blur-md p-8 sm:p-10 rounded-3xl border border-champagne/30 shadow-card hover:shadow-luxe hover:border-champagne/60 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-[11px] uppercase tracking-[0.25em] text-champagne font-semibold">
                      {spec.tag}
                    </span>
                    <div className="w-9 h-9 rounded-full bg-blush-soft border border-champagne/30 flex items-center justify-center text-blush-deep">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="font-serif text-2xl sm:text-3xl text-charcoal font-normal mb-3">
                    {spec.title}
                  </h3>

                  <p className="text-sm sm:text-base text-charcoal-muted font-light leading-relaxed">
                    {spec.detail}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

