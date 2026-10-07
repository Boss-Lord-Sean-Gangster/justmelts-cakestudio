"use client";

import React from "react";
import { ArrowRight, Package, Sparkles, Gift, Music, Cake } from "lucide-react";

export const PartyBoxSection: React.FC = () => {
  const includes = [
    { icon: Cake, label: "Signature Cake", detail: "Your choice of flavour & size" },
    { icon: Package, label: "Savoury Platters", detail: "Puffs, sliders & bruschetta" },
    { icon: Gift, label: "Décor & Candles", detail: "Balloons, banners & sparklers" },
    { icon: Music, label: "Party Extras", detail: "Plates, napkins & party poppers" },
  ];

  return (
    <section id="party-box" className="py-24 sm:py-32 px-6 sm:px-12 bg-studio-bg border-t border-champagne/20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Large Editorial Image */}
          <div className="relative h-[500px] sm:h-[600px] rounded-3xl overflow-hidden shadow-luxe border border-champagne/25">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1530103862676-de8c9debad1d?q=80&w=1200&auto=format&fit=crop"
              alt="JustMelts Party Box"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent" />

            {/* Floating Badge */}
            <div className="absolute bottom-8 left-8 right-8 p-5 rounded-2xl bg-white/95 backdrop-blur-xl border border-champagne/30 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-champagne font-semibold block">Starting From</span>
                  <span className="font-serif text-3xl font-semibold text-charcoal">₹2,499</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase tracking-widest text-charcoal/50 block">Serves</span>
                  <span className="font-serif text-lg text-charcoal font-medium">8 – 25 guests</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Copy & CTA */}
          <div className="space-y-8">
            <div>
              <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-studio-surface border border-champagne/30 mb-5 shadow-sm">
                <Package className="w-3.5 h-3.5 text-champagne" />
                <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-charcoal/80 font-medium">
                  All-In-One Celebrations
                </span>
              </div>

              <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl tracking-tight leading-[1.06] text-charcoal font-normal mb-5">
                YOUR PARTY,<br />ALL IN ONE BOX.
              </h2>

              <p className="text-charcoal-muted text-base sm:text-lg font-light leading-relaxed max-w-lg">
                Cake, savouries, décor and all the little extras — beautifully packed and delivered together. No running around. Just celebrate.
              </p>
            </div>

            {/* What's Inside */}
            <div className="grid grid-cols-2 gap-4">
              {includes.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.label}
                    className="p-4 rounded-2xl bg-white border border-charcoal/8 shadow-card hover:shadow-luxe hover:border-champagne/40 transition-all duration-300 group"
                  >
                    <div className="w-9 h-9 rounded-xl bg-studio-surface border border-champagne/25 flex items-center justify-center text-blush-deep mb-3 group-hover:scale-105 transition-transform">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h4 className="font-serif text-base text-charcoal font-medium">{item.label}</h4>
                    <p className="text-[11px] text-charcoal-muted font-light mt-0.5">{item.detail}</p>
                  </div>
                );
              })}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a
                href="#bestsellers"
                className="luxury-btn px-7 py-3.5 rounded-full text-white text-sm font-medium tracking-wide flex items-center justify-center space-x-2 shadow-btn group"
              >
                <span>Explore Party Boxes</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#custom-cake"
                className="px-7 py-3.5 rounded-full bg-white text-charcoal text-sm font-medium tracking-wide border border-champagne/40 hover:border-champagne hover:bg-[#FAF8F5] transition-all flex items-center justify-center space-x-2"
              >
                <Sparkles className="w-3.5 h-3.5 text-champagne" />
                <span>Build Your Own</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

