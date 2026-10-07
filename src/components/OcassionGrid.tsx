import Image from "next/image";
import Link from "next/link";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import styles from "../styles/Ocassiongrid.module.css";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500"],
  display: "swap",
});

const sans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export type Occasion = {
  title: string;
  /** Path inside /public, e.g. /occasions/birthday.jpg */
  image: string;
  href: string;
  /** tall = spans two rows, small = standard tile, wide = full-width-of-column landscape tile */
  variant: "tall" | "small" | "wide";
};

export type BulkBox = {
  tag: string;
  title: string;
  description: string;
  cta: string;
  /** Path inside /public */
  image: string;
  href: string;
};

/* Drop your photos into /public/occasions/ with these names (or change the paths). */
const DEFAULT_OCCASIONS: Occasion[] = [
  { title: "Birthday", image: "/images/birthday.jpg", href: "/products#occasions-birthday", variant: "tall" },
  { title: "Anniversary", image: "/images/anniversary.jpg", href: "/products#occasions-anniversary", variant: "small" },
  { title: "Congratulations", image: "/images/congratulations.jpg", href: "/products#occasions-congratulations", variant: "small" },
  { title: "Baby Shower", image: "/images/babyshower.jpg", href: "/products#occasions-baby-shower", variant: "small" },
  { title: "Festive", image: "/images/festive.jpg", href: "/products#occasions-festive", variant: "small" },
  { title: "Just Because", image: "/images/justbecause.jpg", href: "/products#occasions-just-because", variant: "wide" },
];

/* Sits next to "Just Because" and fills the rest of the last row. */
const DEFAULT_BULK: BulkBox = {
  tag: "Bulk & Corporate",
  title: "Shop for your occasion in bulk",
  description:
    "Weddings, corporate gifting, festive hampers and big celebrations, baked fresh and delivered together.",
  cta: "Get a bulk quote",
  image: "/images/bulk.jpg",
  href: "/bulk",
};

type Props = {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  occasions?: Occasion[];
  /** Pass null to hide the bulk box */
  bulk?: BulkBox | null;
  className?: string;
};

export default function OccasionGrid({
  eyebrow = "Celebrate every story",
  title = "Shop by occasion",
  subtitle = "Handcrafted for life\u2019s sweetest milestones \u2014 and all the little moments between.",
  occasions = DEFAULT_OCCASIONS,
  bulk = DEFAULT_BULK,
  className = "",
}: Props) {
  return (
    <section className={`${styles.section} ${sans.className} ${className}`}>
      <div className={styles.inner}>
        <p className={styles.eyebrow}>{eyebrow}</p>
        <h2 className={`${styles.title} ${serif.className}`}>{title}</h2>
        <p className={styles.subtitle}>{subtitle}</p>

        <div className={styles.grid}>
          {occasions.map((o, i) => (
            <Link
              key={o.title}
              href={o.href}
              className={`${styles.card} ${styles[o.variant]}`}
            >
              <Image
                src={o.image}
                alt=""
                fill
                sizes="(max-width: 720px) 100vw, 45vw"
                className={styles.img}
                priority={i === 0}
              />
              <span className={styles.shade} aria-hidden="true" />
              <span className={styles.caption}>
                <span className={`${styles.cardTitle} ${serif.className}`}>
                  {o.title}
                </span>
                <span className={styles.cta}>
                  Shop now
                  <ArrowIcon />
                </span>
              </span>
            </Link>
          ))}

          {/* Bulk box: fills the space next to the last tile */}
          {bulk && (
            <Link
              id="bulk-orders"
              href={bulk.href}
              className={`${styles.card} ${styles.bulk}`}
            >
              <Image
                src={bulk.image}
                alt=""
                fill
                sizes="(max-width: 720px) 100vw, 60vw"
                className={styles.img}
              />
              <span className={styles.shade} aria-hidden="true" />
              <span className={styles.caption}>
                <span className={styles.bulkTag}>{bulk.tag}</span>
                <span className={`${styles.cardTitle} ${styles.bulkTitle} ${serif.className}`}>
                  {bulk.title}
                </span>
                <span className={styles.bulkDesc}>{bulk.description}</span>
                <span className={styles.cta}>
                  {bulk.cta}
                  <ArrowIcon />
                </span>
              </span>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}

function ArrowIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" />
    </svg>
  );
}