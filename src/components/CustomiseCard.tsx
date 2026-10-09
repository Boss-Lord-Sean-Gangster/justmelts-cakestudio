import { whatsappLink } from "../constants/catalog";
import styles from "../styles/Productspage.module.css";

export default function CustomiseCard({ tag }: { tag: string }) {
  return (
    <li className={`${styles.card} ${styles.customCard}`}>
      <div className={styles.customInner}>
        <span className={styles.customEyebrow}>{tag}</span>
        <h4 className={styles.customTitle}>Want it customised to your needs?</h4>
        <p className={styles.customText}>
          Tell us your idea, colours, name or message and we&rsquo;ll make it
          exactly how you imagine it.
        </p>
        <a
          href={whatsappLink(`a customised ${tag} cake`, "I\u2019d like to customise")}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.order}
        >
          Contact now
        </a>
      </div>
    </li>
  );
}