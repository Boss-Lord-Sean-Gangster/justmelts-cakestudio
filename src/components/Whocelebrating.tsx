import Image from "next/image";
import Link from "next/link";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import styles from "../styles/Whocelebrating.module.css";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500"],
  display: "swap",
});

const sans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export type Recipient = {
  label: string;
  /** Path inside /public, e.g. /celebrating/her.jpg */
  image: string;
  href: string;
  /** Optional small line under the label */
  caption?: string;
};

/* Drop your photos into /public/celebrating/ with these names (or change the paths). */
const DEFAULT_RECIPIENTS: Recipient[] = [
  { label: "For Her",       image: "images/celebrating/her.jpg",       href: "/products#who-her" },
  { label: "For Him",       image: "images/celebrating/him.jpg",       href: "/products#who-him" },
  { label: "For Kids",      image: "images/celebrating/kids.jpg",      href: "/products#who-kids" },
  { label: "For Parents",   image: "images/celebrating/parents.jpg",   href: "/products#who-parents" },
  { label: "For Friends",   image: "images/celebrating/friends.jpg",   href: "/products#who-friends" },
  { label: "For Colleagues", image: "images/celebrating/colleagues.jpg", href: "/products#who-colleagues" },
];

type Props = {
  title?: string;
  recipients?: Recipient[];
  /** Line shown under every label unless a recipient sets its own caption */
  defaultCaption?: string;
  className?: string;
};

export default function WhoCelebrating({
  title = "Who are you celebrating?",
  recipients = DEFAULT_RECIPIENTS,
  defaultCaption = "Find the perfect gift",
  className = "",
}: Props) {
  return (
    <section className={`${styles.section} ${sans.className} ${className}`}>
      <div className={styles.inner}>
        <h2 className={`${styles.title} ${serif.className}`}>{title}</h2>

        <ul className={styles.grid}>
          {recipients.map((r) => (
            <li key={r.label}>
              <Link href={r.href} className={styles.card}>
                <span className={styles.ring}>
                  <span className={styles.photo}>
                    <Image
                      src={r.image}
                      alt=""
                      fill
                      sizes="(max-width: 520px) 40vw, 170px"
                      className={styles.img}
                    />
                  </span>
                </span>
                <span className={`${styles.label} ${serif.className}`}>{r.label}</span>
                <span className={styles.caption}>{r.caption ?? defaultCaption}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}