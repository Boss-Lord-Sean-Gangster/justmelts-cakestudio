// Place at: app/products/page.tsx
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ProductsPageView from "@/components/Productspageview";
import type { Metadata } from "next";
// import Navbar from "@/components/Navbar/Navbar";
// import Footer from "@/components/Footer/Footer";
// import ProductsPageView from "@/components/ProductsPage/ProductsPageView";

export const metadata: Metadata = {
  title: "Shop eggless cakes, bento, desserts & savouries | JustMelts",
  description:
    "Browse 100% eggless cakes, bento cakes, desserts, savouries, theme cakes and custom cakes delivered across Delhi NCR.",
};

export default function ProductsPage() {
  return (
    <>
      <Navbar />
      <main>
        <ProductsPageView />
      </main>
      <Footer />
    </>
  );
}