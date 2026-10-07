"use client";

import React from "react";
import { Sparkles, Clock, ShieldCheck, Star } from "lucide-react";

export const BrandTrustStrip: React.FC = () => {
  const assurances = [
    {
      icon: ShieldCheck,
      title: "100% Eggless",
      subtitle: "Always, by design",
      detail: "Developed from scratch without egg or compromise",
    },
    {
      icon: Sparkles,
      title: "Freshly Baked",
      subtitle: "Made to order",
      detail: "Baked the very morning of your event",
    },
    {
      icon: Clock,
      title: "Same-Day & Midnight",
      subtitle: "Across Delhi NCR",
      detail: "Noida, Delhi, Gurgaon & Ghaziabad",
    },
    {
      icon: Star,
      title: "4.9★ Rating",
      subtitle: "From 2,000+ celebrations",
      detail: "Trusted for life's sweetest milestones",
    },
  ];

  return (
    <section className="bg-white border-y border-champagne/25 py-8 sm:py-10 px-6 sm:px-12 relative z-30">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {assurances.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left space-y-2.5 sm:space-y-0 sm:space-x-3.5 group"
              >
                <div className="w-10 h-10 rounded-2xl bg-studio-surface border border-champagne/30 flex items-center justify-center text-blush-deep flex-shrink-0 group-hover:scale-105 group-hover:bg-blush-light transition-transform duration-300">
                  <Icon className="w-5 h-5 text-blush-deep" />
                </div>
                <div>
                  <h4 className="font-serif text-base sm:text-lg text-charcoal font-medium leading-snug">
                    {item.title}
                  </h4>
                  <p className="text-xs uppercase tracking-wider text-champagne font-semibold mt-0.5">
                    {item.subtitle}
                  </p>
                  <p className="text-[11px] text-charcoal-muted font-light mt-1 hidden lg:block">
                    {item.detail}
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

