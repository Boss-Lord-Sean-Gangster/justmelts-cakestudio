"use client";

import React, { useState } from "react";
import Navbar  from "./Navbar";
import { CakeCanvasScroller } from "./CakeCanvasScroller";
import { FlavourShowcase } from "./FlavourShowcase";
import { CraftsmanshipSection } from "./CraftsmanshipSection";
import { DetailsSection } from "./DetailsSection";
import { ReserveModal } from "./ReserveModal";
import  Footer  from "./Footer";
import TrustMarquee from "@/components/TrustMarquee";
import CategoryShowcase from "@/components/Categoryshowcase";
import OccasionGrid from "@/components/OcassionGrid";
import { BestsellersSection } from "@/components/BestsellersSection";
import Bestsellers from "@/components/Bestseller";
import ThemePicker from "@/components/Themepicker";
import WhoCelebrating from "@/components/Whocelebrating";
import PartyBoxBanner from "@/components/Partyboxbanner";
import CustomCakeCta from "@/components/Customcakecta";
import Testimonials from "@/components/Testimonials";
import InstagramStrip from "@/components/Instagramtrip";
import OurStory from "@/components/Ourstory";
import WhatsAppJoin from "@/components/Whatsappjoin";

export default function HomeClient() {
  const [isReserveOpen, setIsReserveOpen] = useState(false);

  const scrollToFlavours = () => {
    const el = document.getElementById("flavours");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main className="min-h-screen bg-studio-bg text-charcoal relative">
      {/* Apple-style Slim Floating Navigation */}
      <Navbar />

      {/* Hero & Core Scrollytelling Sequence (120 Frames pinned across 400vh) */}
      <CakeCanvasScroller
        onOpenReserve={() => setIsReserveOpen(true)}
        onScrollToFlavours={scrollToFlavours}
      />
      <TrustMarquee/>

      <CategoryShowcase/>

      <Bestsellers/>


      <OccasionGrid/>

      {/* <BestsellersSection/> */}


      <ThemePicker/>

      <WhoCelebrating/>

      <PartyBoxBanner/>

      <CustomCakeCta/>

      <Testimonials/>

      <InstagramStrip/>

      <OurStory/>

      <WhatsAppJoin/>

      {/* Section 2: Craftsmanship & Culinary Architecture */}
      {/* <CraftsmanshipSection /> */}

      {/* Section 3: Fine Nuance & Macrophotography Specs */}
      {/* <DetailsSection /> */}

      {/* Section 4: Interactive Bespoke Flavour Atelier */}
      {/* <FlavourShowcase onOpenReserve={() => setIsReserveOpen(true)} /> */}

      {/* Atelier Footer */}
      <Footer />

      {/* Bespoke Reservation Modal with Confetti */}
      <ReserveModal
        isOpen={isReserveOpen}
        onClose={() => setIsReserveOpen(false)}
      />
    </main>
  );
}
