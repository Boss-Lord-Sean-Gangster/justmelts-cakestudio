/**
 * Single source of truth for site-wide SEO facts.
 * Every value here is taken from copy already published on the site
 * (Ourstory.tsx, Footer.tsx, catalog.ts). Do not add facts that are not
 * true — e.g. a street address, opening hours or ratings — until they are
 * verified by the business owner.
 */
import { WHATSAPP_NUMBER } from "@/constants/catalog";

export const SITE_URL = "https://justmelts.in";
export const BRAND = "Just Melts";
/** The site copy, footer and Instagram handle also use this spelling. */
export const BRAND_ALT = "JustMelts";
export const INSTAGRAM_URL = "https://www.instagram.com/JUSTMELTS_CAKESTUDIO/";
export const OG_IMAGE = "/images/og-image.jpg";
export const LOGO = "/images/justmelts-logo.png";

/** Kitchen location + delivery coverage, as stated in Ourstory.tsx. */
export const KITCHEN_CITY = "Noida";
export const SERVICE_AREAS = [
  "Noida",
  "Greater Noida",
  "Delhi",
  "Gurgaon",
  "Ghaziabad",
] as const;

export const abs = (path: string) => new URL(path, SITE_URL).toString();

/** Business + website entities, emitted once from the root layout. */
export function siteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Bakery",
        "@id": `${SITE_URL}/#business`,
        name: BRAND,
        alternateName: BRAND_ALT,
        url: SITE_URL,
        logo: abs(LOGO),
        image: abs(OG_IMAGE),
        description:
          "Eggless cake studio in Noida making custom cakes, bento cakes, brownies, cupcakes, cake jars and savouries to order, delivered across Delhi NCR.",
        telephone: `+${WHATSAPP_NUMBER}`,
        address: {
          "@type": "PostalAddress",
          addressLocality: KITCHEN_CITY,
          addressRegion: "Uttar Pradesh",
          addressCountry: "IN",
        },
        areaServed: SERVICE_AREAS.map((name) => ({ "@type": "City", name })),
        sameAs: [INSTAGRAM_URL],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: BRAND,
        alternateName: BRAND_ALT,
        inLanguage: "en-IN",
        publisher: { "@id": `${SITE_URL}/#business` },
      },
    ],
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: abs(it.path),
    })),
  };
}
