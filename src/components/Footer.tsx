import Image from "next/image";
import Link from "next/link";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import styles from "../styles/Footer.module.css";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500"],
  display: "swap",
});

const sans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export type FooterLink = { label: string; href: string };
export type FooterColumn = { title: string; links: FooterLink[] };

const l = (label: string, href: string): FooterLink => ({ label, href });

const DEFAULT_COLUMNS: FooterColumn[] = [
  {
    title: "Shop",
    links: [
      l("Cakes", "/products#cakes"),
      l("Bento Cakes", "/products#bento"),
      l("Desserts", "/products#desserts"),
      l("Savouries", "/products#savouries"),
      l("Party Box", "/products#party-box"),
      l("Flowers & Gifts", "/products#flowers"),
    ],
  },
  {
    title: "Occasions",
    links: [
      l("Birthday", "/products#occasions-birthday"),
      l("Anniversary", "/products#occasions-anniversary"),
      l("Baby Shower", "/products#occasions-baby-shower"),
      l("Congratulations", "/products#occasions-congratulations"),
      l("Festive Gifting", "/products#occasions-festive"),
    ],
  },
  {
    title: "Help",
    links: [
      l("Track Order", "/track"),
      l("Delivery Areas", "/delivery-areas"),
      l("FAQs", "/faqs"),
      l("Contact Us", "/contact"),
      l("Custom Cakes", "/custom-cakes"),
    ],
  },
  {
    title: "Company",
    links: [
      l("Our Story", "/about"),
      l("Kitchen & Hygiene", "/kitchen"),
      l("Baking Classes", "/classes"),
      l("Careers", "/careers"),
      l("Bulk Gifting", "/bulk"),
    ],
  },
];

const DEFAULT_PAYMENTS = ["UPI", "VISA", "RuPay", "Cards"];

type Props = {
  /** Path inside /public */
  logoSrc?: string;
  tagline?: string;
  columns?: FooterColumn[];
  instagramUrl?: string;
  /** e.g. https://wa.me/919999999999 */
  whatsappUrl?: string;
  payments?: string[];
  fssai?: string;
  /** Text after the year, e.g. "JustMelts Eggless Cake Studio, Delhi NCR" */
  copyright?: string;
  className?: string;
};

export default function Footer({
  logoSrc = "/images/justmelts-logo-white.png",
  tagline = "Everything for the celebration, from one place.",
  columns = DEFAULT_COLUMNS,
  instagramUrl = "https://www.instagram.com/JUSTMELTS_CAKESTUDIO/",
  whatsappUrl = "https://wa.me/9217055099",
  // payments = DEFAULT_PAYMENTS,
  fssai = "FSSAI Lic. No. XXXXXXXXXXXXXX",
  copyright = "JustMelts Eggless Cake Studio, Delhi NCR",
  className = "",
}: Props) {
  return (
    <footer className={`${styles.footer} ${sans.className} ${className}`}>
      <div className={styles.inner}>
        <div className={styles.top}>
          {/* ---------- Brand ---------- */}
          <div className={styles.brand}>
            <Link href="/" aria-label="JustMelts home" className={styles.logo}>
              <Image
                src={logoSrc}
                alt="JustMelts"
                width={145}
                height={117}
                className={styles.logoImg}
              />
            </Link>

            <p className={`${styles.tagline} ${serif.className}`}>{tagline}</p>

            <div className={styles.social}>
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className={styles.socialLink}
              >
                <InstagramIcon />
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className={styles.socialLink}
              >
                <WhatsAppIcon />
              </a>
            </div>
          </div>

          {/* ---------- Link columns ---------- */}
          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title} className={styles.col}>
              <h3 className={styles.colTitle}>{col.title}</h3>
              <ul className={styles.links}>
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* ---------- Bottom bar ---------- */}
        <div className={styles.bottom}>
          {/* <ul className={styles.payments} aria-label="Accepted payments">
            {payments.map((p) => (
              <li key={p} className={styles.pay}>
                {p}
              </li>
            ))}
          </ul> */}

          <p className={styles.fssai}>{fssai}</p>

          <p className={styles.copy}>
            &copy; {new Date().getFullYear()} {copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}

function InstagramIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
      <rect x="3" y="3" width="22" height="22" rx="6.500" />
      <circle cx="14" cy="14" r="5.300" />
      <circle cx="20.200" cy="7.800" r="1.100" fill="currentColor" stroke="none" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3.500 20.500 5 15.800A8.500 8.500 0 1 1 8.400 19L3.500 20.500Z" />
      <path d="M9 8.800c-.3 1.600 1.200 4 3.200 5.200 1.300.8 2.300.6 2.800-.3l.1-.5-1.800-1-.7.800c-.9-.4-1.800-1.300-2.200-2.200l.7-.8-.9-1.800-.5.100c-.4.100-.6.200-.7.500Z" />
    </svg>
  );
}