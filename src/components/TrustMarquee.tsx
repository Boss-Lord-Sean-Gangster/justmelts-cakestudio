import { Courier_Prime } from "next/font/google";
import type { ReactNode } from "react";
import styles from "../styles/Trustmarquee.module.css";

const courier = Courier_Prime({
  subsets: ["latin"],
  weight: "700",
  style: "italic",
  display: "swap",
});

/* ---------- Line icons (inherit colour via currentColor) ---------- */
const svgProps = {
  width: 30,
  height: 30,
  viewBox: "0 0 32 32",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

const EggIcon = () => (
  <svg {...svgProps}>
    <path d="M16 4c-5 0-9 8-9 14a9 9 0 0 0 18 0c0-6-4-14-9-14Z" />
    <path d="M10.5 19.5c.6 2.4 2.4 4 4.5 4.4" />
    <path d="M5 5l22 22" />
  </svg>
);

const BowlIcon = () => (
  <svg {...svgProps}>
    <path d="M4 15h24c0 6-5 11-12 11S4 21 4 15Z" />
    <path d="M10 20c2 1.5 4 2 6 2" />
    <path d="M13 15l9-10" />
    <path d="M17 15l7-9" />
    <path d="M22 5l3 3" />
  </svg>
);

const TruckIcon = () => (
  <svg {...svgProps}>
    <path d="M3 8h15v14H3z" />
    <path d="M18 13h5l4 4v5h-9" />
    <circle cx="9" cy="23" r="2.6" fill="#fff" />
    <circle cx="22" cy="23" r="2.6" fill="#fff" />
  </svg>
);

const StarIcon = () => (
  <svg {...svgProps}>
    <path d="m16 4 3.6 7.6 8.4 1-6.2 5.7 1.7 8.2L16 22.3 8.5 26.5l1.7-8.2L4 12.6l8.4-1L16 4Z" />
  </svg>
);

/* ---------- Content ---------- */
export type TrustItem = { icon: ReactNode; text: string };

const DEFAULT_ITEMS: TrustItem[] = [
  { icon: <EggIcon />, text: "100% Eggless, Always" },
  { icon: <BowlIcon />, text: "Freshly Baked to Order" },
  { icon: <TruckIcon />, text: "Same-Day & Midnight Delivery" },
  { icon: <StarIcon />, text: "4.9 from 2,000+ Happy Celebrations" },
];

type Props = {
  items?: TrustItem[];
  /** Seconds for one full loop. Higher = slower. */
  duration?: number;
  /** Pause when the pointer is over the strip. */
  pauseOnHover?: boolean;
  className?: string;
};

export default function TrustMarquee({
  items = DEFAULT_ITEMS,
  duration = 30,
  pauseOnHover = true,
  className = "",
}: Props) {
  // Two identical groups: the track slides by exactly one group's width, so the loop is seamless.
  const group = (hidden: boolean) => (
    <ul className={styles.group} aria-hidden={hidden || undefined}>
      {items.map((item, i) => (
        <li className={styles.item} key={i}>
          <span className={styles.icon}>{item.icon}</span>
          <span>{item.text}</span>
        </li>
      ))}
    </ul>
  );

  return (
    <section
      className={`${styles.wrap} ${className}`}
      aria-label="Why customers choose us"
    >
      <div
        className={`${styles.strip} ${courier.className} ${
          pauseOnHover ? styles.pausable : ""
        }`}
        style={{ ["--duration" as string]: `${duration}s` }}
      >
        <div className={styles.track}>
          {group(false)}
          {group(true)}
          {/* Extra copies so very wide screens never show a gap */}
          {group(true)}
          {group(true)}
        </div>
      </div>
    </section>
  );
}