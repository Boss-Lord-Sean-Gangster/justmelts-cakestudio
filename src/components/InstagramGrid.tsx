"use client";

import React from "react";
import { ArrowUpRight } from "lucide-react";

export const InstagramGrid: React.FC = () => {
  const images = [
    "https://images.unsplash.com/photo-1535141192574-5d4897c13136?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1587668178277-295251f900ce?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1563245372-f21724e3856d?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=600&auto=format&fit=crop",
  ];

  return (
    <section className="py-24 sm:py-32 px-6 sm:px-12 bg-[#F1EEE9]/50 border-t border-champagne/20 relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 sm:mb-16 gap-4">
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-champagne font-semibold block mb-2">
              @justmelts
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl tracking-tight leading-[1.08] text-charcoal font-normal">
              FRESH FROM OUR STUDIO.
            </h2>
          </div>
          <a
            href="https://instagram.com/justmelts"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-xs uppercase tracking-wider text-charcoal/70 font-medium hover:text-blush-deep transition-colors group"
          >
            <span>Follow @justmelts</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

        {/* Editorial Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {images.map((src, idx) => (
            <a
              key={idx}
              href="https://instagram.com/justmelts"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square rounded-2xl overflow-hidden border border-charcoal/8 shadow-sm hover:shadow-luxe transition-shadow duration-300"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={`JustMelts Studio ${idx + 1}`}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/30 transition-colors duration-300 flex items-center justify-center">
                <svg
                  className="w-7 h-7 fill-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

