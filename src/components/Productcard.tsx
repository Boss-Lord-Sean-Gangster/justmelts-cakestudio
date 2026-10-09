"use client";

import { useState } from "react";
import Image from "next/image";
import {
  type Product,
  type Size,
  SIZES,
  sizeLabel,
  priceFor,
  whatsappLink,
} from "../constants/catalog";
import styles from "../styles/Productspage.module.css";

const inr = (n: number) => `\u20B9${n.toLocaleString("en-IN")}`;

export default function ProductCard({ product }: { product: Product }) {
  const [size, setSize] = useState<Size>(0.5);

  const price = priceFor(product, product.weighted ? size : 0.5);
  const orderText = product.weighted
    ? `${product.name} (${sizeLabel(size)}) - ${inr(price)}`
    : product.name;

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

        {product.eggless && (
          <div className={styles.badges}>
            <span className={styles.chip}>
              <span className={styles.dot} />
              Eggless
            </span>
          </div>
        )}
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

        {product.weighted && (
          <div className={styles.sizes} role="radiogroup" aria-label="Cake size">
            {SIZES.map((s) => (
              <button
                key={s}
                type="button"
                role="radio"
                aria-checked={size === s}
                onClick={() => setSize(s)}
                className={`${styles.sizeBtn} ${size === s ? styles.sizeActive : ""}`}
              >
                {sizeLabel(s)}
              </button>
            ))}
          </div>
        )}

        <div className={styles.foot}>
          <div>
            {!product.weighted && <span className={styles.from}>From</span>}
            <span className={styles.price}>{inr(price)}</span>
          </div>
          <a
            href={whatsappLink(orderText)}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.order}
            aria-label={`Order ${orderText} on WhatsApp`}
          >
            Order
          </a>
        </div>
      </div>
    </li>
  );
}