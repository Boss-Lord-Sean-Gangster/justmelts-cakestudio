import Image from "next/image";
import Link from "next/link";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import styles from "../styles/Categoryshowcase.module.css";

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

export type Category = {
  label: string;
  /** Path inside /public, e.g. /categories/cakes.jpg */
  image: string;
  href: string;
};

/* Drop your photos into /public/categories/ using these file names (or change the paths). */
const DEFAULT_CATEGORIES: Category[] = [
  { label: "Cakes", image: "/images/cake.jpeg", href: "/products#categories-cakes" },
  { label: "Bento", image: "/images/bento.jpeg", href: "/products#categories-bento" },
  { label: "Cupcakes", image: "/images/cupcake.jpeg", href: "/products#categories-cupcakes" },
  { label: "Cake Jars", image: "/images/cakejars.jpeg", href: "/products#categories-cakejars" },
  { label: "Brownies", image: "/images/brownie.jpeg", href: "/products#categories-brownies" },
  { label: "Cookies", image: "/images/cookies.jpeg", href: "/products#categories-cookies" },
  { label: "Chocolates", image: "/images/chocolate.jpeg", href: "/products#categories-chocolates" },
  { label: "Savouries", image: "/images/savoury.jpeg", href: "/products#categories-savouries" },
  { label: "Party Add-ons", image: "/images/partyaddon.jpeg", href: "/products#categories-partyadd-ons" },
  { label: "Flowers", image: "/images/flowers.jpeg", href: "/products#categories-flowers" },
  { label: "Return Gifts", image: "/images/returngifts.jpeg", href: "/products#categories-returngifts" },
];

type Props = {
  eyebrow?: string;
  title?: string;
  categories?: Category[];
  /** Where "View all" goes. Dummy for now; change when your page is ready. */
  viewAllHref?: string;
  className?: string;
};

export default function CategoryShowcase({
  eyebrow = "Find your favourite",
  title = "A little something for every craving",
  categories = DEFAULT_CATEGORIES,
  viewAllHref = "/products",
  className = "",
}: Props) {
  return (
    <section className={`${styles.section} ${sans.className} ${className}`}>
      <div className={styles.inner}>
        <p className={styles.eyebrow}>{eyebrow}</p>

        <div className={styles.headRow}>
          <h2 className={`${styles.title} ${serif.className}`}>{title}</h2>

          <Link href={viewAllHref} className={styles.viewAll}>
            <span>View all</span>
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
          </Link>
        </div>

        <ul className={styles.list}>
          {categories.map((c) => (
            <li key={c.label} className={styles.cell}>
              <Link href={c.href} className={styles.card}>
                <span className={styles.ring}>
                  <span className={styles.photo}>
                    <Image
                      src={c.image}
                      alt={c.label}
                      fill
                      sizes="96px"
                      className={styles.img}
                    />
                  </span>
                </span>
                <span className={styles.label}>{c.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}