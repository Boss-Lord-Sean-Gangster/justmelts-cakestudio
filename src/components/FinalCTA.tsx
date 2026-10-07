"use client";

import React from "react";
import { ArrowRight, Sparkles, Heart } from "lucide-react";

export const FinalCTA: React.FC = () => {
  return (
    <section className="py-28 sm:py-36 px-6 sm:px-12 bg-studio-bg border-t border-champagne/20 relative overflow-hidden text-center">
      {/* Large ambient blush glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="w-[600px] h-[600px] rounded-full blur-3xl opacity-60"
          style={{
            background:
              "radial-gradient(circle, rgba(232, 180, 184, 0.35) 0%, rgba(247, 247, 245, 0) 70%)",
          }}
        />
      </div>

      <div className="max-w-3xl mx-auto relative z-10 space-y-8">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-blush-soft border border-champagne/40 shadow-sm mx-auto">
          <Heart className="w-3.5 h-3.5 text-blush-deep fill-blush-deep/20" />
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-blush-deep font-semibold">
            Made For You
          </span>
        </div>

        <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl tracking-tight leading-[1.04] text-charcoal font-normal">
          SOMETHING SWEET<br />IS ALWAYS A GOOD IDEA.
        </h2>

        <p className="text-charcoal-muted text-base sm:text-lg font-light leading-relaxed max-w-xl mx-auto">
          Find your next favourite. Make someone&apos;s day. Celebrate something beautiful.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <a
            href="#bestsellers"
            className="luxury-btn px-8 py-4 rounded-full text-white text-sm sm:text-base font-medium tracking-wide flex items-center space-x-2.5 shadow-btn group"
          >
            <Sparkles className="w-4 h-4" />
            <span>Explore JustMelts</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#custom-cake"
            className="px-8 py-4 rounded-full bg-white text-charcoal text-sm sm:text-base font-medium tracking-wide border border-champagne/40 hover:border-champagne hover:bg-[#FAF8F5] transition-all flex items-center space-x-2 shadow-card group"
          >
            <span>Create a Custom Cake</span>
            <ArrowRight className="w-4 h-4 text-champagne group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
};

