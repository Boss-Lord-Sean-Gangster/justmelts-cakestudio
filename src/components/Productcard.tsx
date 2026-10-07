import Image from "next/image";
import { type Product, whatsappLink } from "../constants/catalog";
import styles from "../styles/Productspage.module.css";

const inr = (n: number) => `\u20B9${n.toLocaleString("en-IN")}`;

export default function ProductCard({ product }: { product: Product }) {
  return (
    <li className={styles.card}>
      <div className={styles.media}>
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 560px) 90vw, (max-width: 1024px) 45vw, 22vw"
          className={styles.img}
        />

        <div className={styles.badges}>
          {product.eggless ? (
            <span className={styles.chip}>
              <span className={styles.dot} />
              Eggless
            </span>
          ) : (
            <span />
          )}
          <span className={styles.chip}>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="8" cy="8" r="6.2" />
              <path d="M8 4.6V8l2.2 1.4" />
            </svg>
            {product.delivery}
          </span>
        </div>
      </div>

      <div className={styles.body}>
        <h4 className={styles.name}>{product.name}</h4>

        <p className={styles.rating}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="#c8962e" aria-hidden="true">
            <path d="m12 2.8 2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.2 6.3 20.3l1.2-6.4L2.8 9.5l6.4-.8L12 2.8Z" />
          </svg>
          <strong>{product.rating.toFixed(1)}</strong>
          <span>({product.reviews})</span>
        </p>

        <div className={styles.foot}>
          <div>
            <span className={styles.from}>From</span>
            <span className={styles.price}>{inr(product.price)}</span>
          </div>
          <a
            href={whatsappLink(product.name)}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.order}
            aria-label={`Order ${product.name} on WhatsApp`}
          >
            Order
          </a>
        </div>
      </div>
    </li>
  );
}