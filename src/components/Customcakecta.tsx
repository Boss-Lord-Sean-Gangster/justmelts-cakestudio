import Image from "next/image";
import Link from "next/link";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import styles from "../styles/Customcakecta.module.css";

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

/* Drop your photos into /public/custom-cake/ with these names (or pass your own list). */
const DEFAULT_IMAGES = [
  "images/custom-cake/1.jpg",
  "images/custom-cake/2.jpg",
  "images/custom-cake/3.jpg",
  "images/custom-cake/4.jpg",
];

type Props = {
  eyebrow?: string;
  title?: string;
  description?: string;
  ctaLabel?: string;
  /** Where the button goes. Dummy for now. */
  ctaHref?: string;
  /** Four photos, shown as staggered arches */
  images?: string[];
  className?: string;
};

export default function CustomCakeCta({
  eyebrow = "Your idea, our craft",
  title = "Have a design in mind?",
  description = "Upload your reference and tell us your occasion. We\u2019ll get back with a quote within 2 hours.",
  ctaLabel = "Start a custom cake",
  ctaHref = "/products#custom-cake",
  images = DEFAULT_IMAGES,
  className = "",
}: Props) {
  return (
    <section className={`${styles.section} ${sans.className} ${className}`}>
      <div className={styles.inner}>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>{eyebrow}</p>
          <h2 className={`${styles.title} ${serif.className}`}>{title}</h2>
          <p className={styles.desc}>{description}</p>

          <Link href={ctaHref} className={styles.cta}>
            <span>{ctaLabel}</span>
            <svg
              width="18"
              height="18"
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

        <ul className={styles.gallery}>
          {images.slice(0, 4).map((src, i) => (
            <li key={src + i} className={styles.arch}>
              <Image
                src={src}
                alt=""
                fill
                sizes="(max-width: 720px) 45vw, 18vw"
                className={styles.img}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}