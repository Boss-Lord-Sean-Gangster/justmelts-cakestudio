import Image from "next/image";
import { DM_Sans } from "next/font/google";
import styles from "../styles/Instagramstrip.module.css";

const sans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export type InstaPost = {
  /** Path inside /public, e.g. /instagram/1.jpg */
  image: string;
  alt?: string;
  /** Optional link to the specific post. Falls back to your profile link. */
  href?: string;
};

/* Drop your photos into /public/instagram/ with these names (or pass your own list). */
const DEFAULT_POSTS: InstaPost[] = [1, 2, 3, 4, 5, 6].map((n) => ({
  image: `images/instagram/${n}.jpg`,
  alt: `Instagram post ${n}`,
}));

type Props = {
  handle?: string;
  tagline?: string;
  /** Your Instagram profile link. Used by the button and by posts without their own href. */
  instagramUrl?: string;
  buttonLabel?: string;
  posts?: InstaPost[];
  className?: string;
};

export default function InstagramStrip({
  handle = "@justmelts",
  tagline = "Fresh from our studio",
  instagramUrl = "https://www.instagram.com/JUSTMELTS_CAKESTUDIO/",
  buttonLabel = "Follow on Instagram",
  posts = DEFAULT_POSTS,
  className = "",
}: Props) {
  return (
    <section className={`${styles.section} ${sans.className} ${className}`}>
      <div className={styles.inner}>
        <div className={styles.head}>
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.profile}
          >
            <InstagramIcon />
            <span className={styles.text}>
              <span className={styles.handle}>{handle}</span>
              <span className={styles.tagline}>{tagline}</span>
            </span>
          </a>

          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.follow}
          >
            {buttonLabel}
          </a>
        </div>

        <ul className={styles.grid}>
          {posts.slice(0, 6).map((p, i) => (
            <li key={p.image + i} className={styles.cell}>
              <a
                href={p.href ?? instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.post}
                aria-label={p.alt ?? `View post ${i + 1} on Instagram`}
              >
                <Image
                  src={p.image}
                  alt={p.alt ?? ""}
                  fill
                  sizes="(max-width: 520px) 50vw, (max-width: 900px) 33vw, 16vw"
                  className={styles.img}
                />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function InstagramIcon() {
  return (
    <svg
      className={styles.icon}
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="22" height="22" rx="6.5" />
      <circle cx="14" cy="14" r="5.3" />
      <circle cx="20.2" cy="7.8" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}