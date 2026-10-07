import Link from "next/link";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import type { ReactElement } from "react";
import styles from "../styles/Themepicker.module.css";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500"],
  display: "swap",
});

const sans = DM_Sans({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

export type IconName = "popper" | "sparkles" | "gift";

export type Theme = {
  label: string;
  href: string;
  icon: IconName;
  /** Tile background colour */
  color: string;
};

const DEFAULT_THEMES: Theme[] = [
  { label: "Superhero", href: "/products#themes-superhero", icon: "popper",   color: "#e9ecfa" },
  { label: "Princess",  href: "/products#themes-princess",  icon: "sparkles", color: "#f6ecf2" },
  { label: "Unicorn",   href: "/products#themes-unicorn",   icon: "gift",     color: "#efeaf8" },
  { label: "Cartoon",   href: "/products#themes-cartoon",   icon: "popper",   color: "#edf5ef" },
  { label: "Sports",    href: "/products#themes-sports",    icon: "sparkles", color: "#eef2fb" },
  { label: "Cars",      href: "/products#themes-cars",      icon: "gift",     color: "#f8f0e4" },
  { label: "Jungle",    href: "/products#themes-jungle",    icon: "popper",   color: "#e8f1e8" },
  { label: "Floral",    href: "/products#themes-floral",    icon: "sparkles", color: "#f8eeee" },
];

type Props = {
  eyebrow?: string;
  title?: string;
  themes?: Theme[];
  /** Where "Explore all themes" goes. Dummy for now. */
  exploreHref?: string;
  /** Show the small green eggless leaf on each tile */
  showLeaf?: boolean;
  className?: string;
};

export default function ThemePicker({
  eyebrow = "Made for their world",
  title = "Pick a theme, make their day",
  themes = DEFAULT_THEMES,
  exploreHref = "/products#themes",
  showLeaf = true,
  className = "",
}: Props) {
  return (
    <section className={`${styles.section} ${sans.className} ${className}`}>
      <div className={styles.inner}>
        <p className={styles.eyebrow}>{eyebrow}</p>

        <div className={styles.headRow}>
          <h2 className={`${styles.title} ${serif.className}`}>{title}</h2>
          <Link href={exploreHref} className={styles.explore}>
            <span>Explore all themes</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" />
            </svg>
          </Link>
        </div>

        <ul className={styles.grid}>
          {themes.map((t) => (
            <li key={t.label}>
              <Link href={t.href} className={styles.card}>
                <span className={styles.tile} style={{ background: t.color }}>
                  {showLeaf && <LeafBadge />}
                  <span className={styles.icon}>{ICONS[t.icon]}</span>
                </span>
                <span className={styles.label}>{t.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------- Icons ---------- */
const common = {
  viewBox: "0 0 48 48",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 3,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

const ICONS: Record<IconName, ReactElement> = {
  popper: (
    <svg {...common}>
      <path d="M8 40 14 18l16 14L8 40Z" />
      <path d="M13 11.5 11 8.5" />
      <path d="M22 11V7" />
      <path d="m33 18 3-3" />
      <path d="M36 27h4" />
    </svg>
  ),
  sparkles: (
    <svg {...common} fill="currentColor" strokeWidth={2.6}>
      <path d="M19 6c1.2 7 4 10 11 11-7 1.2-9.800 4-11 11-1.200-7-4-9.800-11-11 7-1 9.800-4 11-11Z" fill="none" />
      <path d="M33 29c.7 4 2.200 5.500 6 6-3.800.6-5.300 2-6 6-.7-4-2.200-5.400-6-6 3.800-.5 5.300-2 6-6Z" />
    </svg>
  ),
  gift: (
    <svg {...common}>
      <rect x="6" y="16" width="36" height="8" />
      <path d="M9 24v18h30V24" />
      <path d="M24 16v26" />
      <path d="M24 16c-3-8-11-9-11-4 0 3 5 4 11 4Z" />
      <path d="M24 16c3-8 11-9 11-4 0 3-5 4-11 4Z" />
    </svg>
  ),
};

function LeafBadge() {
  return (
    <svg className={styles.leaf} width="22" height="28" viewBox="0 0 22 28" aria-hidden="true">
      <path d="M2 17C2 9 8 4 13 1c1 4 7 5 7 13 0 7-4.500 12-9 12S2 22.500 2 17Z" fill="#5db35b" />
    </svg>
  );
}