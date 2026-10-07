"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import styles from "../styles/Bestseller.module.css";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500"],
  display: "swap",
});

const sans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export type Product = {
  id: string;
  name: string;
  /** Path inside /public, e.g. /bestsellers/velvet-berry.jpg */
  image: string;
  rating: number;
  reviews: number;
  /** Price in rupees */
  price: number;
  /** Delivery chip text, e.g. "Today", "Midnight", "2 hrs" */
  delivery: string;
  eggless?: boolean;
//   href: string;
};

export type Tab = { label: string; products: Product[] };

const p = (
  id: string,
  name: string,
  rating: number,
  reviews: number,
  price: number,
  delivery: string
): Product => ({
  id,
  name,
  image: `/images/bestsellers/${id}.jpg`,
  rating,
  reviews,
  price,
  delivery,
  eggless: true,
//   href: `/products#bestsellers`,
});

/* Dummy data. Drop photos into /public/bestsellers/<id>.jpg or replace with your own. */
const DEFAULT_TABS: Tab[] = [
  {
    label: "Cakes",
    products: [
      p("velvet-berry-celebration-cake", "Velvet Berry Celebration Cake", 4.9, 164, 1249, "Today"),
      p("classic-chocolate-truffle", "Classic Chocolate Truffle", 4.8, 312, 849, "Midnight"),
      p("blush-garden-floral-cake", "Blush Garden Floral Cake", 5.0, 87, 1499, "Today"),
      p("minimal-cherry-bento-cake", "Minimal Cherry Bento Cake", 4.9, 206, 499, "2 hrs"),
    ],
  },
  {
    label: "Bento",
    products: [
      p("vanilla-heart-bento", "Vanilla Heart Bento", 4.8, 142, 449, "2 hrs"),
      p("lotus-biscoff-bento", "Lotus Biscoff Bento", 4.9, 98, 549, "Today"),
      p("choco-drip-bento", "Choco Drip Bento", 4.7, 175, 479, "Today"),
      p("strawberry-cream-bento", "Strawberry Cream Bento", 4.8, 120, 499, "Midnight"),
    ],
  },
  {
    label: "Desserts",
    products: [
      p("brownie", "Fudge Brownie Box of 6", 4.9, 260, 599, "Today"),
      p("cakejars", "Tiramisu Cake Jar", 4.8, 134, 249, "2 hrs"),
      p("cupcake", "Red Velvet Cupcakes (4)", 4.7, 189, 399, "Today"),
      p("cookies", "Nutella Cookie Box", 4.9, 221, 549, "Midnight"),
    ],
  },
  {
    label: "Savouries",
    products: [
      p("paneer-puff", "Paneer Puff", 4.8, 76, 299, "Today"),
      p("potato-puff", "Potato Puff", 4.9, 64, 349, "Today"),
      p("chowmein-puff", "Chowmein Puff", 4.7, 91, 399, "2 hrs"),
      p("paneer-kulcha", "Paneer Kulcha", 4.8, 58, 449, "Today"),
    ],
  },
];

const inr = (n: number) => `\u20B9${n.toLocaleString("en-IN")}`;

type Props = {
  eyebrow?: string;
  title?: string;
  tabs?: Tab[];
  viewAllHref?: string;
  className?: string;
};

export default function Bestsellers({
  eyebrow = "Most-loved",
  title = "Bestsellers, for good reason",
  tabs = DEFAULT_TABS,
  viewAllHref = "/products#bestsellers",
  className = "",
}: Props) {
  const [active, setActive] = useState(0);
  const [liked, setLiked] = useState<Set<string>>(new Set());

  const toggleLike = (id: string) =>
    setLiked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const products = tabs[active]?.products ?? [];

  return (
    <section className={`${styles.section} ${sans.className} ${className}`}>
      <div className={styles.inner}>
        <p className={styles.eyebrow}>{eyebrow}</p>

        <div className={styles.headRow}>
          <h2 className={`${styles.title} ${serif.className}`}>{title}</h2>
          <Link href={viewAllHref} className={styles.viewAll}>
            <span>View all products</span>
            <ArrowIcon />
          </Link>
        </div>

        <div className={styles.tabsWrap}>
          <div className={styles.tabs} role="tablist" aria-label="Product categories">
            {tabs.map((t, i) => (
              <button
                key={t.label}
                role="tab"
                type="button"
                aria-selected={i === active}
                className={`${styles.tab} ${i === active ? styles.tabActive : ""}`}
                onClick={() => setActive(i)}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <ul className={styles.grid} role="tabpanel">
          {products.map((item) => {
            const isLiked = liked.has(item.id);
            return (
              <li key={item.id} className={styles.card}>
                <div className={styles.media}>
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="(max-width: 560px) 90vw, (max-width: 1024px) 45vw, 22vw"
                    className={styles.img}
                  />

                  <button
                    type="button"
                    className={`${styles.heart} ${isLiked ? styles.heartOn : ""}`}
                    aria-pressed={isLiked}
                    aria-label={isLiked ? `Remove ${item.name} from wishlist` : `Add ${item.name} to wishlist`}
                    onClick={() => toggleLike(item.id)}
                  >
                    <HeartIcon filled={isLiked} />
                  </button>

                  <div className={styles.badges}>
                    {item.eggless ? (
                      <span className={styles.chip}>
                        <span className={styles.dot} />
                        Eggless
                      </span>
                    ) : (
                      <span />
                    )}
                    <span className={styles.chip}>
                      <ClockIcon />
                      {item.delivery}
                    </span>
                  </div>
                </div>

                <div className={styles.body}>
                  <h3 className={styles.name}>{item.name}</h3>

                  <p className={styles.rating}>
                    <StarIcon />
                    <strong>{item.rating.toFixed(1)}</strong>
                    <span>({item.reviews})</span>
                  </p>

                  <div className={styles.foot}>
                    <div>
                      <span className={styles.from}>From</span>
                      <span className={styles.price}>{inr(item.price)}</span>
                    </div>
                    <Link href={`/products#bestsellers-${tabs[active].label.toLowerCase()}`} className={styles.view}>
                      View
                    </Link>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/* ---------- Icons ---------- */
function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" />
    </svg>
  );
}

function HeartIcon({ filled }: { filled: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 20.5s-8-4.9-8-11A4.5 4.5 0 0 1 12 6.8 4.5 4.5 0 0 1 20 9.5c0 6.1-8 11-8 11Z" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="8" cy="8" r="6.2" />
      <path d="M8 4.6V8l2.2 1.4" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="#c8962e" aria-hidden="true">
      <path d="m12 2.8 2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.2 6.3 20.3l1.2-6.4L2.8 9.5l6.4-.8L12 2.8Z" />
    </svg>
  );
}