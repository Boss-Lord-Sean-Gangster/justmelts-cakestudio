"use client";

import React from "react";
import { ArrowUpRight, Sparkles } from "lucide-react";

interface Category {
  id: string;
  name: string;
  count: string;
  description: string;
  image: string;
  tag?: string;
  size: "large" | "medium" | "tall";
}

export const DiscoverCategories: React.FC = () => {
  const categories: Category[] = [
    {
      id: "cakes",
      name: "Celebration Cakes",
      count: "32 Creations",
      description: "Layered sponge with velvety Swiss buttercream & hand-placed botanicals.",
      image: "https://images.unsplash.com/photo-1535141192574-5d4897c13136?q=80&w=1000&auto=format&fit=crop",
      tag: "Bestseller",
      size: "large",
    },
    {
      id: "bento",
      name: "Bento Cakes",
      count: "18 Designs",
      description: "Petite 4-inch cakes crafted for intimate toasts & quiet confessions.",
      image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=1000&auto=format&fit=crop",
      tag: "Trending",
      size: "medium",
    },
    {
      id: "desserts",
      name: "Artisanal Desserts",
      count: "14 Items",
      description: "French mousse verrines, Belgian choux pastry & salted caramel tarts.",
      image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=1000&auto=format&fit=crop",
      size: "medium",
    },
    {
      id: "party-boxes",
      name: "Party Boxes",
      count: "All-in-one",
      description: "Cake, savouries, celebratory decor & candles delivered together.",
      image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?q=80&w=1000&auto=format&fit=crop",
      tag: "Signature",
      size: "tall",
    },
    {
      id: "cupcakes",
      name: "Gourmet Cupcakes",
      count: "Box of 6 or 12",
      description: "Whipped ganache rosettes with golden edible flakes.",
      image: "https://images.unsplash.com/photo-1587668178277-295251f900ce?q=80&w=1000&auto=format&fit=crop",
      size: "medium",
    },
    {
      id: "brownies",
      name: "Fudgy Brownies",
      count: "8 Flavours",
      description: "Triple Belgian chocolate with molten pockets and sea salt.",
      image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=1000&auto=format&fit=crop",
      size: "medium",
    },
    {
      id: "cookies",
      name: "Soft-Baked Cookies",
      count: "Fresh Daily",
      description: "Crisp golden rim with a warm, gooey chocolate heart.",
      image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?q=80&w=1000&auto=format&fit=crop",
      size: "medium",
    },
    {
      id: "chocolates",
      name: "Handcrafted Chocolates",
      count: "Truffle Boxes",
      description: "Single-origin cacao infused with roasted nuts and floral notes.",
      image: "https://images.unsplash.com/photo-1548907040-4baa42d10919?q=80&w=1000&auto=format&fit=crop",
      size: "medium",
    },
    {
      id: "flowers",
      name: "Flowers & Gift Hampers",
      count: "Curated Sets",
      description: "Freshly cut pastel roses paired with bespoke sweet hampers.",
      image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?q=80&w=1000&auto=format&fit=crop",
      tag: "Celebration",
      size: "large",
    },
  ];

  return (
    <section id="categories" className="py-24 sm:py-32 px-6 sm:px-12 bg-studio-bg relative">
      <div className="max-w-7xl mx-auto">
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 sm:mb-20 gap-6 border-b border-charcoal/10 pb-8">
          <div>
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-studio-surface border border-champagne/30 mb-4 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-champagne" />
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-charcoal/80 font-medium">
                The Atelier Collections
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl tracking-tight leading-[1.08] text-charcoal font-normal">
              A LITTLE SOMETHING<br />FOR EVERY MOMENT.
            </h2>
          </div>
          <p className="text-charcoal-muted text-sm sm:text-base max-w-md font-light leading-relaxed">
            From celebration cakes to little treats, discover something made for exactly what you&apos;re feeling.
          </p>
        </div>

        {/* Large Visual Editorial Tiles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {categories.map((cat) => (
            <a
              key={cat.id}
              href="#bestsellers"
              className="group relative h-[380px] sm:h-[420px] rounded-3xl overflow-hidden border border-charcoal/10 bg-white shadow-card hover:shadow-luxe transition-all duration-500 flex flex-col justify-end p-7 sm:p-8"
            >
              {/* Background Image with gentle zoom */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={cat.image}
                alt={cat.name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
              />

              {/* Gradient Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/30 to-transparent group-hover:from-charcoal/90 transition-colors duration-300" />

              {/* Top Tag */}
              {cat.tag && (
                <div className="absolute top-5 left-5 z-10">
                  <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-[10px] uppercase tracking-wider font-semibold text-charcoal shadow-sm">
                    {cat.tag}
                  </span>
                </div>
              )}

              {/* Arrow Pill */}
              <div className="absolute top-5 right-5 z-10 w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-charcoal group-hover:bg-blush-deep group-hover:text-white transition-all duration-300 shadow-sm">
                <ArrowUpRight className="w-4 h-4" />
              </div>

              {/* Content */}
              <div className="relative z-10 text-white space-y-2">
                <span className="text-[11px] uppercase tracking-[0.2em] text-champagne-light font-medium block">
                  {cat.count}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-normal leading-snug tracking-wide group-hover:text-blush-light transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs sm:text-sm text-white/80 font-light line-clamp-2 leading-relaxed">
                  {cat.description}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

