"use client";

import React from "react";
import { ArrowRight, Package, Sparkles } from "lucide-react";

interface Occasion {
  title: string;
  subtitle: string;
  tagline: string;
  image: string;
  accent: string;
}

/** Where the bulk box button goes. Change this when your page is ready. */
const BULK_HREF = "/bulk";

/** Placeholder photo for the bulk box. Replace with your own. */
const BULK_IMAGE =
  "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?q=80&w=1600&auto=format&fit=crop";

export const CelebrateOccasions: React.FC = () => {
  const occasions: Occasion[] = [
    {
      title: "Birthday",
      subtitle: "The centerpiece of another beautiful year",
      tagline: "Sparklers, layered cakes & wish-making",
      image: "https://images.unsplash.com/photo-1558636508-e0db3814bd1d?q=80&w=1000&auto=format&fit=crop",
      accent: "#E8B4B8",
    },
    {
      title: "Anniversary",
      subtitle: "Made for love that grows sweeter with time",
      tagline: "Blush buttercream, champagne & fresh roses",
      image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=1000&auto=format&fit=crop",
      accent: "#C98A93",
    },
    {
      title: "Congratulations",
      subtitle: "For promotions, graduations & triumphant milestones",
      tagline: "Gold leaf, rich chocolate & celebratory toasts",
      image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=1000&auto=format&fit=crop",
      accent: "#C9A66B",
    },
    {
      title: "Baby Shower",
      subtitle: "Welcoming little miracles with gentle joy",
      tagline: "Soft pastels, cloud meringues & floral halos",
      image: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1000&auto=format&fit=crop",
      accent: "#E8B4B8",
    },
    {
      title: "Festive & Diwali",
      subtitle: "Curated artisanal sweet hampers & golden treats",
      tagline: "Cardamom pistachios, saffron velvet & dry fruit rochers",
      image: "https://images.unsplash.com/photo-1514517521153-1be72277b32f?q=80&w=1000&auto=format&fit=crop",
      accent: "#DFCA9E",
    },
    {
      title: "Just Because",
      subtitle: "Because Tuesday deserves chocolate too",
      tagline: "Spontaneous treats, bento duos & afternoon comfort",
      image: "https://images.unsplash.com/photo-1506459225024-1428097a7e18?q=80&w=1000&auto=format&fit=crop",
      accent: "#A78349",
    },
  ];

  return (
    <section id="occasions" className="py-24 sm:py-32 px-6 sm:px-12 bg-[#F1EEE9]/50 border-t border-champagne/20 relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-white border border-champagne/30 mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-champagne" />
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-charcoal/80 font-medium">
              Celebrate Every Story
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl tracking-tight leading-[1.08] text-charcoal font-normal mb-4">
            MADE FOR THE MOMENTS<br />THAT MATTER.
          </h2>
          <p className="text-charcoal-muted text-sm sm:text-base font-light leading-relaxed">
            Handcrafted for life&apos;s sweetest milestones — and all the little moments between.
          </p>
        </div>

        {/* Visual Story Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {occasions.map((occ) => (
            <div
              key={occ.title}
              className="group relative h-[440px] rounded-3xl overflow-hidden border border-champagne/25 shadow-card hover:shadow-luxe transition-all duration-500 bg-white flex flex-col justify-end p-8"
            >
              {/* Photo Background */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={occ.image}
                alt={occ.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
              />

              {/* Gradient Dark/Warm Tint */}
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/35 to-transparent group-hover:from-charcoal/95 transition-colors duration-300" />

              {/* Floating Pill Tag */}
              <div className="absolute top-6 left-6 z-10">
                <span className="px-3.5 py-1 rounded-full bg-white/95 backdrop-blur-md text-[10px] uppercase tracking-[0.2em] font-semibold text-charcoal shadow-sm">
                  {occ.title}
                </span>
              </div>

              {/* Text Layer */}
              <div className="relative z-10 text-white space-y-2">
                <h3 className="font-serif text-3xl sm:text-4xl font-normal leading-snug tracking-tight text-white group-hover:text-blush-light transition-colors">
                  {occ.title}
                </h3>
                <p className="text-sm text-white/90 font-light leading-relaxed">
                  {occ.subtitle}
                </p>
                <p className="text-xs text-champagne-light font-light pt-1">
                  {occ.tagline}
                </p>

                <div className="pt-4 flex items-center space-x-2 text-xs uppercase tracking-wider text-white font-medium group-hover:text-blush transition-colors">
                  <span>Explore Collection</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}

          {/* Bulk orders box: spans the remaining space of the last row */}
          <div
            id="bulk-orders"
            className="group relative md:col-span-2 lg:col-span-3 h-[440px] rounded-3xl overflow-hidden border border-champagne/25 shadow-card hover:shadow-luxe transition-all duration-500 bg-charcoal flex flex-col justify-end p-8 sm:p-12"
          >
            {/* Photo Background */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={BULK_IMAGE}
              alt="Bulk celebration orders"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              loading="lazy"
            />

            {/* Gradient: bottom-up on mobile, left-to-right on wider screens */}
            <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-charcoal/95 via-charcoal/65 to-charcoal/10" />

            {/* Floating Pill Tag */}
            <div className="absolute top-6 left-6 sm:top-8 sm:left-8 z-10">
              <span className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-white/95 backdrop-blur-md text-[10px] uppercase tracking-[0.2em] font-semibold text-charcoal shadow-sm">
                <Package className="w-3.5 h-3.5 text-champagne" />
                <span>Bulk &amp; Corporate</span>
              </span>
            </div>

            {/* Text Layer */}
            <div className="relative z-10 text-white space-y-2 max-w-xl">
              <h3 className="font-serif text-3xl sm:text-5xl font-normal leading-[1.08] tracking-tight text-white">
                Shop for your occasion in bulk
              </h3>
              <p className="text-sm sm:text-base text-white/90 font-light leading-relaxed">
                Weddings, corporate gifting, festive hampers and big celebrations,
                baked fresh and delivered together.
              </p>
              <p className="text-xs text-champagne-light font-light pt-1">
                Custom boxes &middot; Branded packaging &middot; Dedicated order manager
              </p>

              <div className="pt-5">
                <a
                  href={BULK_HREF}
                  className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-white text-charcoal text-xs uppercase tracking-wider font-medium shadow-sm hover:bg-blush-light transition-colors"
                >
                  <span>Get a bulk quote</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};