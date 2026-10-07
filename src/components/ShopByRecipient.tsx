"use client";

import React from "react";
import { ArrowRight, Sparkles } from "lucide-react";

interface Persona {
  title: string;
  subtitle: string;
  notes: string;
  image: string;
}

export const ShopByRecipient: React.FC = () => {
  const recipients: Persona[] = [
    {
      title: "For Her",
      subtitle: "Soft florals, berry infusions & delicate blush ribbons",
      notes: "Petal bento cakes, macaron pyramids & rose hampers",
      image: "https://images.unsplash.com/photo-1516054575922-f0b8eeadec1a?q=80&w=1000&auto=format&fit=crop",
    },
    {
      title: "For Him",
      subtitle: "Rich dark truffles, espresso crumbs & bold textures",
      notes: "Smoked sea salt caramel, hazelnut crunch & noir boxes",
      image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?q=80&w=1000&auto=format&fit=crop",
    },
    {
      title: "For Kids",
      subtitle: "Playful themes, rainbow layers & joyful confetti",
      notes: "Unicorns, superhero crests & fun bento surprise boxes",
      image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?q=80&w=1000&auto=format&fit=crop",
    },
    {
      title: "For Parents",
      subtitle: "Classic heritage flavours, saffron rose & balanced sweetness",
      notes: "Cardamom pistachio cakes & royal dry fruit hampers",
      image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=1000&auto=format&fit=crop",
    },
    {
      title: "For Friends",
      subtitle: "Bento duos, sharing boxes & midnight surprises",
      notes: "Biscoff duos, chunky brownies & party-ready treat kits",
      image: "https://images.unsplash.com/photo-1587668178277-295251f900ce?q=80&w=1000&auto=format&fit=crop",
    },
    {
      title: "For Colleagues",
      subtitle: "Refined treat hampers & celebratory desk drops",
      notes: "Artisanal brownie boxes, cookies & branded thank-you tins",
      image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=1000&auto=format&fit=crop",
    },
  ];

  return (
    <section className="py-24 sm:py-32 px-6 sm:px-12 bg-white border-t border-champagne/20 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-studio-surface border border-champagne/30 mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-champagne" />
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-charcoal/80 font-medium">
              Curated For Them
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl tracking-tight leading-[1.08] text-charcoal font-normal mb-3">
            WHO ARE YOU CELEBRATING?
          </h2>
          <p className="text-charcoal-muted text-sm sm:text-base font-light leading-relaxed">
            Every person has a sweetness all their own. Find a collection tuned to their world.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {recipients.map((rec) => (
            <div
              key={rec.title}
              className="group relative h-96 rounded-3xl overflow-hidden border border-charcoal/10 shadow-card hover:shadow-luxe transition-all duration-500 bg-studio-surface flex flex-col justify-end p-8"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={rec.image}
                alt={rec.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/40 to-transparent group-hover:from-charcoal/95 transition-colors duration-300" />

              <div className="relative z-10 text-white space-y-1.5">
                <h3 className="font-serif text-3xl font-normal leading-snug group-hover:text-blush-light transition-colors">
                  {rec.title}
                </h3>
                <p className="text-xs sm:text-sm text-white/85 font-light leading-relaxed">
                  {rec.subtitle}
                </p>
                <div className="pt-3 flex items-center space-x-2 text-xs uppercase tracking-wider text-champagne-light font-medium group-hover:text-white transition-colors">
                  <span>Explore Gift Edit</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

