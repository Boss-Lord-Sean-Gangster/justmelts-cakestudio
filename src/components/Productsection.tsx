import type { ReactNode } from "react";
import type { CatalogSection, Product } from "../constants/catalog";
import ProductCard from "./Productcard";
// import { serif } from "./fonts";
import styles from "../styles/Productspage.module.css";

function Grid({ products }: { products: Product[] }) {
  return (
    <ul className={styles.grid}>
      {products.map((pr) => (
        <ProductCard key={pr.id} product={pr} />
      ))}
    </ul>
  );
}

type Props = {
  section: CatalogSection;
  /** Extra content shown at the bottom of the section (e.g. a CTA banner) */
  after?: ReactNode;
};

export default function ProductSection({ section, after }: Props) {
  const { id, eyebrow, title, subtitle, tone, products, subsections } = section;

  return (
    <section
      id={id}
      className={`${styles.section} ${styles[tone]} ${after ? styles.hasAfter : ""}`}
    >
      <div className={styles.inner}>
        <p className={styles.eyebrow}>{eyebrow}</p>

        <div className={styles.headRow}>
          <div>
            <h2 className={`${styles.title} `}>{title}</h2>
            <p className={styles.subtitle}>{subtitle}</p>
          </div>
          <a href="#products-top" className={styles.backTop}>
            Back to top
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M8 13.500v-11M3.500 7 8 2.500 12.500 7" />
            </svg>
          </a>
        </div>

        {/* Quick links to subsections */}
        {subsections && (
          <nav className={styles.subNav} aria-label={`${title} categories`}>
            {subsections.map((sub) => (
              <a key={sub.id} href={`#${sub.id}`} className={styles.subChip}>
                {sub.title}
              </a>
            ))}
          </nav>
        )}

        {products && <Grid products={products} />}

        {subsections?.map((sub) => (
          <div key={sub.id} id={sub.id} className={styles.sub}>
            <h3 className={`${styles.subTitle} `}>{sub.title}</h3>
            <Grid products={sub.products} />
          </div>
        ))}
      </div>

      {after}
    </section>
  );
}