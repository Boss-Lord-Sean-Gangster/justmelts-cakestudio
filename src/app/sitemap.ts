import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { CATALOG, PRODUCTS_PATH } from "@/constants/catalog";

/**
 * Next.js App Router sitemap.
 * Generates /sitemap.xml automatically.
 *
 * Includes:
 *  - Homepage
 *  - Products page
 *  - Products page anchored to each catalog section & subsection
 *    (search engines may not honour fragment-only URLs, but they're
 *     harmless and act as hints for crawlers that do)
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}${PRODUCTS_PATH}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  /* Optional: catalog section deep-links (/products#cakes, etc.)
     Some crawlers follow fragment URLs; worst case they're ignored. */
  const sectionPages: MetadataRoute.Sitemap = CATALOG.flatMap((section) => {
    const entries: MetadataRoute.Sitemap = [
      {
        url: `${SITE_URL}${PRODUCTS_PATH}#${section.id}`,
        lastModified: now,
        changeFrequency: "weekly" as const,
        priority: 0.7,
      },
    ];

    // Add subsection anchors (occasions-birthday, themes-unicorn, etc.)
    if (section.subsections) {
      for (const sub of section.subsections) {
        entries.push({
          url: `${SITE_URL}${PRODUCTS_PATH}#${sub.id}`,
          lastModified: now,
          changeFrequency: "weekly" as const,
          priority: 0.6,
        });
      }
    }

    return entries;
  });

  return [...staticPages, ...sectionPages];
}

