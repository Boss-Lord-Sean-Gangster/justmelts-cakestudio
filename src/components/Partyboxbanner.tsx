import Image from "next/image";
import Link from "next/link";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import styles from "../styles/Partyboxbanner.module.css";

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

export type PartyPackage = {
  name: string;
  /** Price in rupees, shown as "From ₹1,499" */
  from: number;
  href: string;
};

const DEFAULT_PACKAGES: PartyPackage[] = [
  { name: "Mini Celebration",   from: 1499, href: "/products#party-box-mini" },
  { name: "Birthday Party Box", from: 3999, href: "/products#party-box-birthday" },
  { name: "Kids\u2019 Theme Party", from: 6499, href: "/products#party-box-kids-theme" },
];

const inr = (n: number) => `\u20B9${n.toLocaleString("en-IN")}`;

type Props = {
  eyebrow?: string;
  title?: string;
  description?: string;
  /** Path inside /public, e.g. /party-box/hero.jpg */
  image?: string;
  imageAlt?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  packages?: PartyPackage[];
  className?: string;
};

export default function PartyBoxBanner({
  eyebrow = "JustMelts Party Box",
  title = "Planning a party? We\u2019ve got the whole thing.",
  description = "Cake, savouries, decor and little extras \u2014 beautifully packed and delivered together.",
  image = "/images/cake.jpeg",
  imageAlt = "",
  primaryCta = { label: "Shop party boxes", href: "/products#party-box" },
  secondaryCta = { label: "Build your own", href: "/products#party-box-build" },
  packages = DEFAULT_PACKAGES,
  className = "",
}: Props) {
  return (
    <section className={`${styles.section} ${sans.className} ${className}`}>
      <div className={styles.inner}>
        <div className={styles.banner}>
          <span className={styles.outline} aria-hidden="true" />

          <div className={styles.content}>
            <p className={styles.eyebrow}>{eyebrow}</p>
            <h2 className={`${styles.title} ${serif.className}`}>{title}</h2>
            <p className={styles.desc}>{description}</p>

            <div className={styles.ctas}>
              <Link href={primaryCta.href} className={styles.primary}>
                {primaryCta.label}
              </Link>
              <Link href={secondaryCta.href} className={styles.secondary}>
                {secondaryCta.label}
              </Link>
            </div>

            <ul className={styles.packages}>
              {packages.map((p, i) => (
                <li key={p.name}>
                  <Link href={p.href} className={styles.pkg}>
                    <span className={styles.num}>{String(i + 1).padStart(2, "0")}</span>
                    <span className={styles.pkgName}>{p.name}</span>
                    <span className={styles.pkgPrice}>From {inr(p.from)}</span>
                    <svg
                      className={styles.arrow}
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
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.media}>
            <Image
              src={image}
              alt={imageAlt}
              fill
              sizes="(max-width: 900px) 100vw, 45vw"
              className={styles.img}
            />
          </div>
        </div>
      </div>
    </section>
  );
}