"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Quote, MapPin, Sparkles } from "lucide-react";

interface Testimonial {
  quote: string;
  name: string;
  location: string;
  occasion: string;
}

export const CustomerStories: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const stories: Testimonial[] = [
    {
      quote: "My daughter's birthday cake was nothing short of a masterpiece. The buttercream roses looked hand-painted and the sponge was impossibly moist. JustMelts completely reimagined what an eggless cake could be.",
      name: "Priya Malhotra",
      location: "Noida, Sector 62",
      occasion: "Birthday Celebration",
    },
    {
      quote: "We ordered the three-tier blush engagement cake and it arrived at midnight, perfectly chilled, with every sugar pearl intact. Our guests thought it was from a five-star hotel. It was JustMelts.",
      name: "Arjun & Meera",
      location: "Greater Noida West",
      occasion: "Engagement Party",
    },
    {
      quote: "For our Diwali corporate gifting, JustMelts created 200 custom-branded boxes with chocolate truffles and brownies. The packaging was luxurious and every piece tasted freshly made. Our clients loved it.",
      name: "Rashi Enterprises",
      location: "Gurgaon",
      occasion: "Diwali Corporate Gifting",
    },
    {
      quote: "The bento cake I ordered for our anniversary was the prettiest thing I've ever eaten. It came in a beautiful box with a handwritten note. Such a personal touch — this is why we keep coming back.",
      name: "Kavita Sharma",
      location: "Delhi, South Extension",
      occasion: "Anniversary",
    },
    {
      quote: "As someone with egg allergies, I've never had a cake this good. The salted caramel layer was unreal. My kids couldn't believe it was eggless. JustMelts has changed how we celebrate forever.",
      name: "Deepak Gupta",
      location: "Indirapuram, Ghaziabad",
      occasion: "Family Celebration",
    },
  ];

  return (
    <section className="py-24 sm:py-32 px-6 sm:px-12 bg-studio-bg border-t border-champagne/20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-studio-surface border border-champagne/30 mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-champagne" />
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-charcoal/80 font-medium">
              Customer Stories
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl tracking-tight leading-[1.08] text-charcoal font-normal mb-3">
            LOVED ACROSS DELHI NCR.
          </h2>
          <p className="text-charcoal-muted text-sm sm:text-base font-light leading-relaxed">
            Over 2,000 celebrations and counting. Here&apos;s what our guests say.
          </p>
        </div>

        {/* Horizontal Scroll Testimonial Strip */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide -mx-6 px-6"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {stories.map((story, idx) => (
            <div
              key={idx}
              className="min-w-[340px] sm:min-w-[420px] max-w-[500px] flex-shrink-0 snap-center bg-white p-8 sm:p-10 rounded-3xl border border-charcoal/8 shadow-card hover:shadow-luxe transition-shadow duration-400 flex flex-col justify-between"
            >
              <div>
                <Quote className="w-8 h-8 text-blush/40 mb-5 rotate-180" />
                <p className="font-serif text-base sm:text-lg text-charcoal leading-relaxed font-light italic">
                  &ldquo;{story.quote}&rdquo;
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-charcoal/5 space-y-1">
                <h4 className="font-serif text-base text-charcoal font-medium">{story.name}</h4>
                <div className="flex items-center space-x-1.5 text-xs text-charcoal-muted">
                  <MapPin className="w-3 h-3 text-champagne" />
                  <span>{story.location}</span>
                </div>
                <span className="inline-block mt-2 px-3 py-0.5 rounded-full bg-studio-surface border border-champagne/25 text-[10px] uppercase tracking-wider font-semibold text-charcoal/70">
                  {story.occasion}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Scroll Hint Dots */}
        <div className="flex items-center justify-center space-x-2 mt-8">
          {stories.map((_, idx) => (
            <span key={idx} className="w-1.5 h-1.5 rounded-full bg-champagne/40" />
          ))}
        </div>
      </div>
    </section>
  );
};

