"use client";

import React, { useState } from "react";
import { Star, Plus, Check, Sparkles, Clock } from "lucide-react";

export interface ProductItem {
  id: string;
  name: string;
  category: "cakes" | "bento" | "desserts" | "savouries";
  descriptor: string;
  rating: number;
  reviews: number;
  price: number;
  delivery: string;
  image: string;
  isEggless: boolean;
  bestseller?: boolean;
}

interface BestsellersProps {
  onAddToCart?: (item: ProductItem) => void;
}

export const BestsellersSection: React.FC<BestsellersProps> = ({ onAddToCart }) => {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [addedIds, setAddedIds] = useState<{ [key: string]: boolean }>({});

  const products: ProductItem[] = [
    {
      id: "prod-1",
      name: "Velvet Berry Celebration Cake",
      category: "cakes",
      descriptor: "Slow-reduced alpine raspberry coulis layered in vanilla bean sponge with blush buttercream.",
      rating: 4.9,
      reviews: 164,
      price: 1249,
      delivery: "Today",
      image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?q=80&w=1000&auto=format&fit=crop",
      isEggless: true,
      bestseller: true,
    },
    {
      id: "prod-2",
      name: "Classic Belgian Chocolate Truffle",
      category: "cakes",
      descriptor: "Decadent 54% dark couverture ganache with moist cocoa crumb and gold luster dust.",
      rating: 4.8,
      reviews: 312,
      price: 849,
      delivery: "Midnight",
      image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=1000&auto=format&fit=crop",
      isEggless: true,
      bestseller: true,
    },
    {
      id: "prod-3",
      name: "Blush Garden Floral Cake",
      category: "cakes",
      descriptor: "Hand-piped horizontal buttercream with fresh English spray roses and baby's-breath halo.",
      rating: 5.0,
      reviews: 87,
      price: 1499,
      delivery: "Today",
      image: "https://images.unsplash.com/photo-1535141192574-5d4897c13136?q=80&w=1000&auto=format&fit=crop",
      isEggless: true,
      bestseller: true,
    },
    {
      id: "prod-4",
      name: "Minimal Cherry Bento Cake",
      category: "bento",
      descriptor: "Korean-style 4-inch pastel sponge with whipped chantilly cream and a single candied cherry.",
      rating: 4.9,
      reviews: 206,
      price: 499,
      delivery: "2 hrs",
      image: "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?q=80&w=1000&auto=format&fit=crop",
      isEggless: true,
      bestseller: true,
    },
    {
      id: "prod-5",
      name: "Rose Pistachio Celebration Cake",
      category: "cakes",
      descriptor: "Ground Bronte pistachios, organic rosewater cream, and dried Damascus rose petals.",
      rating: 4.9,
      reviews: 189,
      price: 1249,
      delivery: "Today",
      image: "https://images.unsplash.com/photo-1519869325930-281384150729?q=80&w=1000&auto=format&fit=crop",
      isEggless: true,
    },
    {
      id: "prod-6",
      name: "Biscoff Belgian Bento Duo",
      category: "bento",
      descriptor: "Two complementary petite cakes: caramelized Lotus spread and white velvet ganache.",
      rating: 5.0,
      reviews: 114,
      price: 549,
      delivery: "Today",
      image: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?q=80&w=1000&auto=format&fit=crop",
      isEggless: true,
    },
    {
      id: "prod-7",
      name: "Chocolate Celebration Hamper",
      category: "desserts",
      descriptor: "Six signature chocolate rochers, salted caramel jar, and artisan hazelnut brownies.",
      rating: 4.9,
      reviews: 142,
      price: 899,
      delivery: "2 hrs",
      image: "https://images.unsplash.com/photo-1548907040-4baa42d10919?q=80&w=1000&auto=format&fit=crop",
      isEggless: true,
    },
    {
      id: "prod-8",
      name: "Truffled Mushroom Brioche Buns",
      category: "savouries",
      descriptor: "Flaky golden brioche puffs with wild forest mushrooms, thyme, and roasted garlic cream.",
      rating: 4.8,
      reviews: 95,
      price: 649,
      delivery: "Today",
      image: "https://images.unsplash.com/photo-1608198093002-ad4e005484ec?q=80&w=1000&auto=format&fit=crop",
      isEggless: true,
    },
  ];

  const filtered =
    activeTab === "all"
      ? products
      : products.filter((p) => p.category === activeTab);

  const handleAdd = (item: ProductItem) => {
    onAddToCart?.(item);
    setAddedIds((prev) => ({ ...prev, [item.id]: true }));
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [item.id]: false }));
    }, 1800);
  };

  const tabs = [
    { id: "all", label: "All Bestsellers" },
    { id: "cakes", label: "Cakes" },
    { id: "bento", label: "Bento Cakes" },
    { id: "desserts", label: "Desserts & Hampers" },
    { id: "savouries", label: "Savouries" },
  ];

  return (
    <section id="bestsellers" className="py-24 sm:py-32 px-6 sm:px-12 bg-studio-bg relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div>
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-studio-surface border border-champagne/30 mb-4 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-champagne" />
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-charcoal/80 font-medium">
                Most Loved
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl tracking-tight leading-[1.08] text-charcoal font-normal">
              THE ONES YOU KEEP<br />COMING BACK TO.
            </h2>
          </div>
          <p className="font-serif italic text-xl sm:text-2xl text-charcoal/70 font-light">
            Loved for a reason.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 mb-12 pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2 rounded-full text-xs tracking-wider uppercase font-medium transition-all duration-300 border ${
                activeTab === tab.id
                  ? "bg-charcoal text-white border-charcoal shadow-sm"
                  : "bg-white text-charcoal/70 border-charcoal/10 hover:border-champagne hover:text-charcoal"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="group bg-white rounded-3xl overflow-hidden border border-charcoal/10 shadow-card hover:shadow-luxe hover:border-champagne/50 transition-all duration-400 flex flex-col justify-between"
            >
              <div>
                {/* Product Image Area */}
                <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-studio-surface">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />

                  {/* Delivery Badge */}
                  <div className="absolute top-4 left-4 flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-champagne/30 text-[10px] uppercase tracking-wider font-semibold text-charcoal shadow-sm">
                    <Clock className="w-3 h-3 text-champagne" />
                    <span>{item.delivery}</span>
                  </div>

                  {/* 100% Eggless Pill */}
                  <div className="absolute top-4 right-4 px-2.5 py-1 rounded-full bg-[#EFEFEA]/90 backdrop-blur-md text-[9px] uppercase tracking-wider font-semibold text-emerald-800 border border-emerald-700/20">
                    100% Eggless
                  </div>
                </div>

                {/* Details */}
                <div className="p-6">
                  {/* Rating */}
                  <div className="flex items-center space-x-1.5 mb-2">
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    <span className="text-xs font-semibold text-charcoal">{item.rating}</span>
                    <span className="text-[11px] text-charcoal-muted">({item.reviews})</span>
                  </div>

                  {/* Name */}
                  <h3 className="font-serif text-xl sm:text-2xl text-charcoal font-normal leading-snug group-hover:text-blush-deep transition-colors mb-2">
                    {item.name}
                  </h3>

                  {/* Descriptor */}
                  <p className="text-xs text-charcoal-muted font-light line-clamp-2 leading-relaxed">
                    {item.descriptor}
                  </p>
                </div>
              </div>

              {/* Bottom Price & Add CTA */}
              <div className="p-6 pt-0 flex items-center justify-between border-t border-charcoal/5 mt-4">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-charcoal/50 block">From</span>
                  <span className="font-serif text-xl font-semibold text-charcoal">
                    ₹{item.price.toLocaleString("en-IN")}
                  </span>
                </div>

                <button
                  onClick={() => handleAdd(item)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 flex items-center space-x-1.5 ${
                    addedIds[item.id]
                      ? "bg-emerald-600 text-white shadow-sm"
                      : "luxury-btn text-white shadow-sm"
                  }`}
                  aria-label={`Add ${item.name} to cart`}
                >
                  {addedIds[item.id] ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-white" />
                      <span>Added</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

