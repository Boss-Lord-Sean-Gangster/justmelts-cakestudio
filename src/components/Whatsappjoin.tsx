import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import styles from "../styles/Whatsappjoin.module.css";

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

type Props = {
  title?: string;
  subtitle?: string;
  /** Small line inside the white pill */
  hint?: string;
  buttonLabel?: string;
  /** Your WhatsApp group invite link */
  groupUrl?: string;
  className?: string;
};

export default function WhatsAppJoin({
  title = "Sweet news, straight to your WhatsApp",
  subtitle = "New launches, offers and celebration inspiration. No spam, promise.",
  hint = "Free to join. Leave any time.",
  buttonLabel = "Join group",
  groupUrl = "https://chat.whatsapp.com/GaJe7Oj2XqA2UoGtFwz22U",
  className = "",
}: Props) {
  return (
    <section className={`${styles.section} ${sans.className} ${className}`}>
      <div className={styles.inner}>
        <div className={styles.left}>
          <span className={styles.icon} aria-hidden="true">
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3.5 20.5 5 15.8A8.5 8.5 0 1 1 8.4 19L3.5 20.5Z" />
              <path d="M9 8.8c-.3 1.6 1.2 4 3.2 5.2 1.3.8 2.3.6 2.8-.3l.1-.5-1.8-1-.7.8c-.9-.4-1.8-1.3-2.2-2.2l.7-.8-.9-1.8-.5.1c-.4.1-.6.2-.7.5Z" />
            </svg>
          </span>

          <div className={styles.text}>
            <h2 className={`${styles.title} ${serif.className}`}>{title}</h2>
            <p className={styles.subtitle}>{subtitle}</p>
          </div>
        </div>

        {/* The whole pill is the link, so the tap target is big */}
        <a
          href={groupUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.pill}
          aria-label={`${buttonLabel} on WhatsApp`}
        >
          <span className={styles.hint}>{hint}</span>
          <span className={styles.button}>{buttonLabel}</span>
        </a>
      </div>
    </section>
  );
}