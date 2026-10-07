"use client";

import { useId, useState, type ReactElement } from "react";
import Image from "next/image";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import styles from "../styles/Ourstory.module.css";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500"],
  style: ["normal", "italic"],
  display: "swap",
});

const sans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export type IconName = "cake" | "sparkles" | "check";

export type Feature = {
  icon: IconName;
  title: string;
  text: string;
};

const DEFAULT_FEATURES: Feature[] = [
  {
    icon: "cake",
    title: "Eggless by design",
    text: "Not an afterthought. Every recipe is developed to be beautifully eggless.",
  },
  {
    icon: "sparkles",
    title: "Premium ingredients",
    text: "Real couverture, seasonal fruit and flavours selected with care.",
  },
  {
    icon: "check",
    title: "A spotless studio",
    text: "Prepared in our hygienic, professionally managed Noida kitchen.",
  },
];

const DEFAULT_MORE = [
  "JustMelts is an eggless cake studio in Noida, delivering freshly baked cakes, bento cakes, cupcakes, brownies, cake jars and party boxes across Delhi NCR \u2014 including Noida, Greater Noida, Delhi, Gurgaon and Ghaziabad.",
  "Every order is made to order and delivered same-day, with midnight delivery available for birthdays, anniversaries and surprises. Can\u2019t find the design you have in mind? Share a reference and we\u2019ll craft a custom cake for you.",
];

type Props = {
  eyebrow?: string;
  title?: string;
  body?: string;
  signature?: string;
  /** Path inside /public, e.g. /story/team.jpg */
  image?: string;
  imageAlt?: string;
  features?: Feature[];
  seoTitle?: string;
  seoSummary?: string;
  /** Paragraphs revealed by "Read more" */
  seoMore?: string[];
  className?: string;
};

export default function OurStory({
  eyebrow = "Our story",
  title = "Made with care, right here in Noida.",
  body = "JustMelts began with a simple belief: an eggless cake should never feel like a compromise. Every recipe, detail and delivery still carries that same care.",
  signature = "\u2014 Team JustMelts",
  image = "/images/ourstory.jpg",
  imageAlt = "The JustMelts team baking in the studio kitchen",
  features = DEFAULT_FEATURES,
  seoTitle = "Order eggless cakes online in Delhi NCR",
  seoSummary = "Discover freshly baked, 100% eggless cakes, bento cakes, desserts and complete party solutions delivered across Noida, Delhi, Gurgaon, Ghaziabad and Greater Noida.",
  seoMore = DEFAULT_MORE,
  className = "",
}: Props) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <section className={`${styles.section} ${sans.className} ${className}`}>
      <div className={styles.inner}>
        <div className={styles.top}>
          {/* ---------- Story card ---------- */}
          <div className={styles.card}>
            <div className={styles.photo}>
              <Image
                src={image}
                alt={imageAlt}
                fill
                sizes="(max-width: 900px) 80vw, 22vw"
                className={styles.img}
              />
            </div>

            <div className={styles.copy}>
              <p className={styles.eyebrow}>{eyebrow}</p>
              <h2 className={`${styles.title} ${serif.className}`}>{title}</h2>
              <p className={styles.body}>{body}</p>
              <p className={`${styles.signature} ${serif.className}`}>{signature}</p>
            </div>
          </div>

          {/* ---------- Feature list ---------- */}
          <ul className={styles.features}>
            {features.map((f) => (
              <li key={f.title} className={styles.feature}>
                <span className={styles.iconWrap}>{ICONS[f.icon]}</span>
                <span className={styles.featureText}>
                  <span className={styles.featureTitle}>{f.title}</span>
                  <span className={styles.featureDesc}>{f.text}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* ---------- SEO read-more ---------- */}
        <div className={styles.seo}>
          <div className={styles.seoRow}>
            <div className={styles.seoText}>
              <h3 className={`${styles.seoTitle} ${serif.className}`}>{seoTitle}</h3>
              <p className={styles.seoSummary}>{seoSummary}</p>
            </div>

            <button
              type="button"
              className={styles.more}
              aria-expanded={open}
              aria-controls={panelId}
              onClick={() => setOpen((v) => !v)}
            >
              <span>{open ? "Read less" : "Read more"}</span>
              <svg
                className={`${styles.chev} ${open ? styles.chevOpen : ""}`}
                width="14"
                height="14"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="m4 6 4 4 4-4" />
              </svg>
            </button>
          </div>

          <div
            id={panelId}
            className={`${styles.panel} ${open ? styles.panelOpen : ""}`}
            role="region"
            aria-hidden={!open}
          >
            <div className={styles.panelInner}>
              {seoMore.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Icons ---------- */
const common = {
  width: 22,
  height: 22,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

const ICONS: Record<IconName, ReactElement> = {
  cake: (
    <svg {...common}>
      <path d="M12 4v3" />
      <path d="M12 3.200c.9.8.9 1.500 0 2.200-.9-.7-.9-1.400 0-2.200Z" />
      <rect x="5" y="10" width="14" height="4" rx="1" />
      <path d="M6 14v5h12v-5" />
      <path d="M8.500 10V8.500h7V10" />
    </svg>
  ),
  sparkles: (
    <svg {...common}>
      <path d="M10 4c.6 3.800 2.200 5.400 6 6-3.800.6-5.400 2.200-6 6-.6-3.800-2.200-5.400-6-6 3.800-.6 5.400-2.200 6-6Z" />
      <path d="M18 15c.3 1.800 1 2.500 2.800 2.800-1.800.3-2.500 1-2.800 2.800-.3-1.800-1-2.500-2.800-2.800 1.800-.3 2.500-1 2.800-2.800Z" />
    </svg>
  ),
  check: (
    <svg {...common}>
      <path d="m6 12.500 4 4 8-9" />
    </svg>
  ),
};