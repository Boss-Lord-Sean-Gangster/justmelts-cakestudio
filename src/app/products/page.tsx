import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ProductsPageView from "@/components/Productspageview";
import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd, BRAND, OG_IMAGE } from "@/lib/seo";
import { PRODUCTS_PATH } from "@/constants/catalog";
import type { Metadata } from "next";

const TITLE = "Eggless Cakes, Bento Cakes, Desserts & Savouries";
const DESCRIPTION =
  "Browse the Just Melts menu: 100% eggless cakes, bento cakes, brownies, cupcakes, cake jars, savouries, theme cakes and custom cakes, delivered across Delhi NCR.";

export const metadata: Metadata = {
  // The root layout's title template appends " | Just Melts".
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PRODUCTS_PATH },
  // Next.js does not merge nested openGraph fields, so this page states its own.
  openGraph: {
    title: `${TITLE} | ${BRAND}`,
    description: DESCRIPTION,
    url: PRODUCTS_PATH,
    siteName: BRAND,
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Just Melts logo beside a red velvet cake",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${TITLE} | ${BRAND}`,
    description: DESCRIPTION,
    images: [OG_IMAGE],
  },
};

export default function ProductsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Menu", path: PRODUCTS_PATH },
        ])}
      />
      <Navbar />
      <main>
        <ProductsPageView />
      </main>
      <Footer />
    </>
  );
}
