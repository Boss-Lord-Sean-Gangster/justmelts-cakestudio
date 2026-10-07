"use client";

import React from "react";
import { Leaf, Sparkles, ShieldCheck, Heart, Beaker } from "lucide-react";

export const BrandStory: React.FC = () => {
  const principles = [
    {
      icon: Leaf,
      title: "100% Eggless by Design",
      desc: "We began with the belief that an eggless cake should never feel like a compromise. Every recipe is engineered from scratch without egg — not adapted from one.",
    },
    {
      icon: Sparkles,
      title: "Premium Ingredients Only",
      desc: "French cultured butter, single-origin couverture chocolate, Madagascar bourbon vanilla, and organically grown edible botanicals.",
    },
    {
      icon: Heart,
      title: "Freshly Made, Never Stored",
      desc: "Every order is baked the morning of delivery in our FSSAI-certified professional kitchen. No cold storage, no day-old sponge, no shortcuts.",
    },
    {
      icon: ShieldCheck,
      title: "Hygienic Professional Kitchen",
      desc: "Temperature-controlled, stainless-steel certified workspace with documented daily sanitation protocols.",
    },
    {
      icon: Beaker,
      title: "Thoughtful Craftsmanship",
      desc: "Every tier is hand-levelled, every rosette is piped to order, every pearl is placed by our lead pâtissier. We don't mass-produce. We make.",
    },
  ];

  return (
    <section id="story" className="py-24 sm:py-32 px-6 sm:px-12 bg-white border-t border-champagne/20 relative overflow-hidden">
      {/* Ambient warm glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-blush-light/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-[10px] uppercase tracking-[0.3em] text-champagne font-semibold block mb-3">
            The JustMelts Philosophy
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl tracking-tight leading-[1.06] text-charcoal font-normal mb-5">
            MADE WITH CARE.<br />MADE TO MELT INTO<br />YOUR MOMENTS.
          </h2>
          <p className="text-charcoal-muted text-sm sm:text-base md:text-lg font-light leading-relaxed max-w-xl mx-auto">
            We started with a simple conviction: that an eggless cake should taste extraordinary, not ordinary. That fresh ingredients and patient hands can turn flour and butter into something that makes people close their eyes and smile.
          </p>
        </div>

        {/* Principles Masonry / Stacked Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {principles.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className={`p-8 sm:p-10 rounded-3xl border shadow-card hover:shadow-luxe transition-all duration-400 group flex flex-col ${
                  idx === 0
                    ? "bg-studio-bg border-champagne/30 md:col-span-2 lg:col-span-1"
                    : "bg-studio-bg border-charcoal/8"
                }`}
              >
                <div className="w-11 h-11 rounded-2xl bg-white border border-champagne/30 flex items-center justify-center text-blush-deep mb-6 group-hover:scale-110 group-hover:bg-blush-light transition-all duration-300">
                  <Icon className="w-5 h-5" />
                </div>

                <h3 className="font-serif text-xl sm:text-2xl text-charcoal font-normal mb-3 leading-snug">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-charcoal-muted font-light leading-relaxed flex-grow">
                  {item.desc}
                </p>

                <div className="pt-5 mt-5 border-t border-charcoal/5">
                  <span className="font-mono text-[10px] text-charcoal/35 tracking-wider">
                    PRINCIPLE 0{idx + 1}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

