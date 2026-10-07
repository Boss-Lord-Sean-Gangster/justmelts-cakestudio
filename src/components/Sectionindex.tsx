"use client";

import { useEffect, useRef, useState } from "react";
import styles from "../styles/Productspage.module.css";

export type IndexItem = { id: string; label: string };

/** Sticky row of jump links. Highlights the section you are currently reading. */
export default function SectionIndex({ items }: { items: IndexItem[] }) {
  const [active, setActive] = useState(items[0]?.id ?? "");
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    // A subsection hash (e.g. #bestsellers-bento) highlights its parent section
    const parentOf = (hash: string) =>
      items.find((i) => hash === i.id || hash.startsWith(`${i.id}-`))?.id;

    const sync = () => {
      const id = parentOf(window.location.hash.slice(1));
      if (id) setActive(id);
    };
    sync();
    window.addEventListener("hashchange", sync);

    const els = items
      .map((i) => document.getElementById(i.id))
      .filter((el): el is HTMLElement => !!el);

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-28% 0px -62% 0px" }
    );
    els.forEach((el) => io.observe(el));

    return () => {
      window.removeEventListener("hashchange", sync);
      io.disconnect();
    };
  }, [items]);

  // Keep the active pill visible on small screens
  useEffect(() => {
    const list = listRef.current;
    const el = list?.querySelector<HTMLElement>(`[data-id="${active}"]`);
    if (list && el) {
      list.scrollTo({
        left: el.offsetLeft - list.clientWidth / 2 + el.clientWidth / 2,
        behavior: "smooth",
      });
    }
  }, [active]);

  return (
    <div className={styles.indexBar}>
      <nav className={styles.indexNav} aria-label="Menu sections">
        <ul ref={listRef} className={styles.indexList}>
          {items.map((i) => (
            <li key={i.id}>
              <a
                href={`#${i.id}`}
                data-id={i.id}
                aria-current={active === i.id ? "true" : undefined}
                className={`${styles.indexLink} ${active === i.id ? styles.indexActive : ""}`}
              >
                {i.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}