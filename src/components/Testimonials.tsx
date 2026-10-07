import Image from "next/image";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import styles from "../styles/Testimonials.module.css";

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

export type Review = {
  quote: string;
  name: string;
  /** e.g. "Noida" */
  location: string;
  /** e.g. "Birthday" */
  occasion: string;
  /** Path inside /public, e.g. /reviews/1.jpg */
  image: string;
  /** 1 to 5 */
  rating?: number;
  /** Optional: send this card somewhere else instead of the shared Google link */
  href?: string;
};

/* Dummy reviews. Replace with your own whenever you like. */
const DEFAULT_REVIEWS: Review[] = [
  {
    quote:
      "The cake looked even better than the reference, and tasted incredibly fresh. Everyone asked where it was from.",
    name: "Rhea Malhotra",
    location: "Noida",
    occasion: "Birthday",
    image: "/images/birthday.jpg",
  },
  {
    quote:
      "From ordering to midnight delivery, everything was effortless. The bento cake was almost too pretty to cut.",
    name: "Aditi Sharma",
    location: "Gurgaon",
    occasion: "Anniversary",
    image: "/images/anniversary.jpg",
  },
  {
    quote:
      "They handled 120 gift boxes for our team beautifully. Premium packaging, thoughtful details, zero stress.",
    name: "Karan Mehta",
    location: "Delhi",
    occasion: "Corporate",
    image: "/images/cake.jpeg",
  },
];

type Props = {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  reviews?: Review[];
  /** Your Google reviews link. Every card opens this in a new tab. */
  googleReviewsUrl?: string;
  className?: string;
};

export default function Testimonials({
  eyebrow = "Real celebrations",
  title = "Loved across Delhi NCR",
  subtitle = "More than 2,000 sweet moments, and counting.",
  reviews = DEFAULT_REVIEWS,
  googleReviewsUrl = "https://g.page/r/YOUR_GOOGLE_REVIEW_LINK",
  className = "",
}: Props) {
  return (
    <section className={`${styles.section} ${sans.className} ${className}`}>
      <div className={styles.inner}>
        <p className={styles.eyebrow}>{eyebrow}</p>
        <h2 className={`${styles.title} ${serif.className}`}>{title}</h2>
        <p className={styles.subtitle}>{subtitle}</p>

        <ul className={styles.grid}>
          {reviews.map((r) => (
            <li key={r.name} className={styles.item}>
              <a
                href={r.href ?? googleReviewsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.card}
                aria-label={`Read reviews on Google. Review by ${r.name}`}
              >
                <span
                  className={styles.stars}
                  role="img"
                  aria-label={`${r.rating ?? 5} out of 5 stars`}
                >
                  {Array.from({ length: r.rating ?? 5 }).map((_, i) => (
                    <StarIcon key={i} />
                  ))}
                </span>

                <blockquote className={`${styles.quote} ${serif.className}`}>
                  &ldquo;{r.quote}&rdquo;
                </blockquote>

                <span className={styles.footer}>
                  <span className={styles.avatar} aria-hidden="true">
                    {initials(r.name)}
                  </span>

                  <span className={styles.who}>
                    <span className={styles.nameRow}>
                      <span className={styles.name}>{r.name}</span>
                      <CheckIcon />
                    </span>
                    <span className={styles.meta}>
                      {r.location} &middot; {r.occasion}
                    </span>
                  </span>

                  <span className={styles.thumb}>
                    <Image
                      src={r.image}
                      alt=""
                      fill
                      sizes="58px"
                      className={styles.img}
                    />
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");
}

function StarIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="#c8962e" aria-hidden="true">
      <path d="m12 2.8 2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.2 6.3 20.3l1.2-6.4L2.8 9.5l6.4-.8L12 2.8Z" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="19" height="19" viewBox="0 0 20 20" aria-hidden="true">
      <circle cx="10" cy="10" r="10" fill="#4cae4f" />
      <path d="m5.6 10.4 3 3 5.8-6.2" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}