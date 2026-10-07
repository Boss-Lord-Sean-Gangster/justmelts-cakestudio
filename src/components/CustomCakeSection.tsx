"use client";

import React from "react";
import { ArrowRight, Sparkles, Palette } from "lucide-react";

export const CustomCakeSection: React.FC = () => {
  return (
    <section id="custom-cake" className="py-24 sm:py-32 px-6 sm:px-12 bg-[#F1EEE9]/50 border-t border-champagne/20 relative overflow-hidden">
      {/* Subtle ambient glow */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] bg-blush-light/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Copy & CTA */}
          <div className="space-y-8 order-2 lg:order-1">
            <div>
              <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-white border border-champagne/30 mb-5 shadow-sm">
                <Palette className="w-3.5 h-3.5 text-champagne" />
                <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-charcoal/80 font-medium">
                  Bespoke Commissions
                </span>
              </div>

              <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl tracking-tight leading-[1.06] text-charcoal font-normal mb-5">
                YOUR IDEA.<br />OUR CRAFT.
              </h2>

              <p className="text-charcoal-muted text-base sm:text-lg font-light leading-relaxed max-w-lg">
                Have something special in mind? Share your inspiration — a Pinterest board, a sketch, a photo — and let our bakers bring it to life with premium eggless ingredients.
              </p>
            </div>

            {/* Process Steps */}
            <div className="space-y-4 pt-2">
              {[
                { step: "01", title: "Share Your Vision", desc: "Send us your reference images, theme, and flavour preferences via WhatsApp." },
                { step: "02", title: "Design Consultation", desc: "Our lead pâtissier will sketch a design and suggest the perfect flavour architecture." },
                { step: "03", title: "Handcrafted & Delivered", desc: "Baked fresh the morning of your event and delivered with white-glove care." },
              ].map((s) => (
                <div key={s.step} className="flex items-start space-x-4 p-4 rounded-2xl bg-white/80 border border-charcoal/8 shadow-sm hover:shadow-card transition-shadow duration-300">
                  <span className="font-mono text-xs text-champagne font-bold mt-1 w-8 flex-shrink-0">{s.step}</span>
                  <div>
                    <h4 className="font-serif text-base sm:text-lg text-charcoal font-medium">{s.title}</h4>
                    <p className="text-xs text-charcoal-muted font-light mt-0.5 leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="pt-2">
              <a
                href="https://wa.me/9217055099?text=Hi%20JustMelts,%20I'd%20like%20to%20create%20a%20custom%20cake."
                target="_blank"
                rel="noopener noreferrer"
                className="luxury-btn inline-flex px-7 py-3.5 rounded-full text-white text-sm font-medium tracking-wide items-center space-x-2 shadow-btn group"
              >
                <Sparkles className="w-4 h-4" />
                <span>Create Your Cake</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>

          {/* Right: Reveal Image */}
          <div className="relative h-[500px] sm:h-[600px] rounded-3xl overflow-hidden shadow-luxe border border-champagne/25 order-1 lg:order-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1535141192574-5d4897c13136?q=80&w=1200&auto=format&fit=crop"
              alt="Custom Cake by JustMelts"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-charcoal/10" />

            {/* Floating Trust Badge */}
            <div className="absolute top-6 right-6 px-4 py-2 rounded-full bg-white/95 backdrop-blur-md border border-champagne/30 shadow-sm text-[11px] uppercase tracking-wider font-semibold text-charcoal flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>2,000+ Custom Cakes Delivered</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

