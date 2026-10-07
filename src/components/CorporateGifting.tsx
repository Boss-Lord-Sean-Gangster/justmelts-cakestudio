"use client";

import React from "react";
import { ArrowRight, Briefcase, Gift, Heart, Sparkles } from "lucide-react";

export const CorporateGifting: React.FC = () => {
  const categories = [
    {
      icon: Briefcase,
      title: "Corporate Events",
      desc: "Branded dessert boxes for team milestones, client appreciation and launch celebrations.",
    },
    {
      icon: Sparkles,
      title: "Festive Hampers",
      desc: "Diwali, Eid, Christmas & New Year artisanal sweet hampers with custom branding.",
    },
    {
      icon: Heart,
      title: "Wedding Favours",
      desc: "Elegant individually-boxed treats for your guests — chocolates, cookies or mini cakes.",
    },
    {
      icon: Gift,
      title: "Return Gifts",
      desc: "Beautifully wrapped sweet boxes for birthdays, baby showers and intimate gatherings.",
    },
  ];

  return (
    <section id="corporate" className="py-24 sm:py-32 px-6 sm:px-12 bg-white border-t border-champagne/20 relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-start">
          {/* Left Header (2/5 width) */}
          <div className="lg:col-span-2 space-y-6 lg:sticky lg:top-32">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-studio-surface border border-champagne/30 mb-2 shadow-sm">
              <Gift className="w-3.5 h-3.5 text-champagne" />
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-charcoal/80 font-medium">
                Bulk Orders & Gifting
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl tracking-tight leading-[1.08] text-charcoal font-normal">
              MAKE IT PERSONAL.<br />MAKE IT MEMORABLE.
            </h2>

            <p className="text-charcoal-muted text-sm sm:text-base font-light leading-relaxed">
              From thoughtful return gifts to beautifully branded boxes and corporate celebrations, we&apos;ll make every order feel personal.
            </p>

            <div className="pt-2">
              <a
                href="https://wa.me/9217055099?text=Hi%20JustMelts,%20I'd%20like%20to%20discuss%20corporate%20gifting."
                target="_blank"
                rel="noopener noreferrer"
                className="luxury-btn inline-flex px-6 py-3 rounded-full text-white text-sm font-medium tracking-wide items-center space-x-2 shadow-btn group"
              >
                <span>Plan Your Gifting</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            <p className="text-[11px] text-charcoal/50 font-light pt-2">
              Minimum order: 25 units &nbsp;•&nbsp; Custom branding available &nbsp;•&nbsp; Pan-India shipping
            </p>
          </div>

          {/* Right: Category Cards (3/5 width) */}
          <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <div
                  key={cat.title}
                  className="p-7 sm:p-8 rounded-3xl bg-studio-bg border border-charcoal/8 shadow-card hover:shadow-luxe hover:border-champagne/40 transition-all duration-400 group flex flex-col justify-between min-h-[220px]"
                >
                  <div>
                    <div className="w-11 h-11 rounded-2xl bg-white border border-champagne/30 flex items-center justify-center text-blush-deep mb-5 group-hover:scale-105 group-hover:bg-blush-light transition-all duration-300">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-serif text-xl sm:text-2xl text-charcoal font-normal mb-2 leading-snug">
                      {cat.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-charcoal-muted font-light leading-relaxed">
                      {cat.desc}
                    </p>
                  </div>
                  <div className="pt-5 border-t border-charcoal/5 mt-5 flex items-center space-x-2 text-xs uppercase tracking-wider text-champagne font-medium group-hover:text-blush-deep transition-colors">
                    <span>Enquire</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

