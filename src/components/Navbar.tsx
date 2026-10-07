"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { DM_Sans } from "next/font/google";
import styles from "../styles/Navbar.module.css";

const sans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export type NavChild = { label: string; href: string };
export type NavItem = {
  label: string;
  href: string;
  /** Dropdown links. Leave out for a plain link. */
  children?: NavChild[];
  /** Shows the lavender pill with a green dot (e.g. a seasonal collection) */
  highlight?: boolean;
};

const DEFAULT_ANNOUNCEMENTS = [
  "100% Eggless",
  "Same-day delivery across Delhi NCR",
  "Free delivery above \u20B9999",
  "Midnight delivery available",
];

const link = (label: string, href: string): NavChild => ({ label, href });

const DEFAULT_NAV: NavItem[] = [
  // Custom Cake is the speciality, so it leads the nav as the highlighted pill
  { label: "Custom Cake", href: "/products#custom-cake", highlight: true },
  {
    label: "Cakes",
    href: "/products#cakes",
    children: [
      link("Birthday Cakes", "/products#occasions-birthday"),
      link("Anniversary Cakes", "/products#occasions-anniversary"),
      link("Photo Cakes", "/products#custom-cake"),
      link("Custom Cake", "/products#custom-cake"),
      link("All Cakes", "/products"),
    ],
  },
  {
    label: "Bento",
    href: "/products#bento",
    children: [
      link("Bento Cakes", "/products#bento"),
      link("Bento Combos", "/products#bento"),
    ],
  },
  {
    label: "Desserts",
    href: "/products#desserts",
    children: [
      link("Brownies", "/products#desserts"),
      link("Cupcakes", "/products#desserts"),
      link("Cake Jars", "/products#desserts"),
      link("Cookies", "/products#desserts"),
    ],
  },
  {
    label: "Savouries",
    href: "/products#savouries",
    children: [
      link("Breads", "/products#savouries"),
      link("Puffs & Quiches", "/products#savouries"),
    ],
  },
  {
    label: "Party Box",
    href: "/products#party-box",
    children: [
      link("Mini Celebration", "/products#party-box"),
      link("Birthday Party Box", "/products#party-box"),
      link("Kids\u2019 Theme Party", "/products#party-box"),
    ],
  },
  {
    label: "Add-ons & Flowers",
    href: "/products",
    children: [
      link("Balloons & Decor", "/products"),
      link("Flowers", "/products#flowers"),
      link("Return Gifts", "/products#return-gifts"),
    ],
  },
];

type Props = {
  /** Path inside /public */
  logoSrc?: string;
  announcements?: string[];
  nav?: NavItem[];
  /** e.g. "Noida 201301" */
  location?: string;
  /** Called when the delivery location is clicked (open your pincode modal here) */
  onLocationClick?: () => void;
  cartCount?: number;
  searchPlaceholder?: string;
  /** Keep the header stuck to the top while scrolling */
  sticky?: boolean;
  className?: string;
};

export default function Navbar({
  logoSrc = "/images/justmelts-logo.png",
  announcements = DEFAULT_ANNOUNCEMENTS,
  nav = DEFAULT_NAV,
  location = "Noida 201301",
  onLocationClick,
  cartCount = 0,
  searchPlaceholder = "Search cakes, themes, occasions\u2026",
  sticky = true,
  className = "",
}: Props) {
  const router = useRouter();
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navRef = useRef<HTMLUListElement>(null);

  // Close dropdown on outside click or Escape
  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpenIdx(null);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenIdx(null);
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const onSearch = (e: FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    if (q) router.push(`/search?q=${encodeURIComponent(q)}`);
  };

  const closeAll = () => {
    setOpenIdx(null);
    setMenuOpen(false);
  };

  const locationButton = (extra: string) => (
    <button type="button" className={`${styles.location} ${extra}`} onClick={onLocationClick}>
      <PinIcon />
      <span className={styles.locText}>
        <span className={styles.locSmall}>Delivering to</span>
        <span className={styles.locMain}>{location}</span>
      </span>
      <ChevronIcon />
    </button>
  );

  return (
    <div className={`${sans.className} ${className}`}>
      {/* ---------- Announcement bar ---------- */}
      <div className={styles.announce}>
        <ul className={styles.announceList}>
          {announcements.map((a) => (
            <li key={a}>{a}</li>
          ))}
        </ul>
      </div>

      {/* ---------- Header ---------- */}
      <header className={`${styles.header} ${sticky ? styles.sticky : ""}`}>
        <div className={styles.inner}>
          <div className={styles.topRow}>
            <button
              type="button"
              className={styles.burger}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
            >
              {menuOpen ? <CloseIcon /> : <BurgerIcon />}
            </button>

            <Link href="/" className={styles.logo} aria-label="Home">
              <Image src={logoSrc} alt="JustMelts" width={133} height={82} priority className={styles.logoImg} />
            </Link>

            {locationButton(styles.locDesktop)}

            <form className={styles.search} onSubmit={onSearch} role="search">
              <SearchIcon />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={searchPlaceholder}
                aria-label="Search"
                className={styles.searchInput}
              />
            </form>

            <div className={styles.actions}>
              <Link href="/track" className={`${styles.action} ${styles.hideSmall}`}>
                <TruckIcon />
                <span>Track</span>
              </Link>
              <Link href="/wishlist" className={styles.action}>
                <HeartIcon />
                <span>Wishlist</span>
              </Link>
              <Link href="/account" className={`${styles.action} ${styles.hideSmall}`}>
                <UserIcon />
                <span>Account</span>
              </Link>
              <Link href="/cart" className={styles.action} aria-label={`Cart, ${cartCount} items`}>
                <span className={styles.cartIcon}>
                  <CartIcon />
                  {cartCount > 0 && <span className={styles.badge}>{cartCount}</span>}
                </span>
                <span>Cart</span>
              </Link>
            </div>

            <Link href="/bulk" className={styles.bulk}>
              Bulk &amp; Corporate
            </Link>
          </div>

          {/* Mobile-only rows */}
          <div className={styles.mobileRows}>
            {locationButton(styles.locMobile)}
          </div>

          {/* ---------- Desktop category nav ---------- */}
          <nav className={styles.navRow} aria-label="Main">
            <ul className={styles.navList} ref={navRef}>
              {nav.map((item, i) => {
                const open = openIdx === i;
                return (
                  <li
                    key={item.label}
                    className={styles.navItem}
                    onMouseEnter={() => item.children && setOpenIdx(i)}
                    onMouseLeave={() => setOpenIdx(null)}
                  >
                    {item.children ? (
                      <>
                        <button
                          type="button"
                          className={`${styles.navLink} ${open ? styles.navLinkOpen : ""}`}
                          aria-expanded={open}
                          aria-haspopup="true"
                          onClick={() => setOpenIdx(open ? null : i)}
                        >
                          {item.label}
                          <ChevronIcon small />
                        </button>
                        {open && (
                          <ul className={styles.dropdown}>
                            {item.children.map((c) => (
                              <li key={c.label}>
                                <Link href={c.href} onClick={closeAll}>
                                  {c.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </>
                    ) : (
                      <Link
                        href={item.href}
                        className={`${styles.navLink} ${item.highlight ? styles.pill : ""}`}
                      >
                        {item.highlight && <span className={styles.greenDot} />}
                        {item.label}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        {/* ---------- Mobile menu ---------- */}
        {menuOpen && (
          <nav className={styles.mobileMenu} aria-label="Mobile">
            <form className={styles.mobileSearch} onSubmit={onSearch} role="search">
              <SearchIcon />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={searchPlaceholder}
                aria-label="Search"
                className={styles.searchInput}
              />
            </form>

            <ul className={styles.mobileList}>
              {nav.map((item) => (
                <li key={item.label}>
                  {item.children ? (
                    <details className={styles.details}>
                      <summary>
                        {item.label}
                        <ChevronIcon small />
                      </summary>
                      <ul>
                        {item.children.map((c) => (
                          <li key={c.label}>
                            <Link href={c.href} onClick={closeAll}>
                              {c.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </details>
                  ) : (
                    <Link href={item.href} className={styles.mobileLink} onClick={closeAll}>
                      {item.highlight && <span className={styles.greenDot} />}
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
              <li>
                <Link href="/track" className={styles.mobileLink} onClick={closeAll}>Track order</Link>
              </li>
              <li>
                <Link href="/account" className={styles.mobileLink} onClick={closeAll}>Account</Link>
              </li>
              <li>
                <Link href="/bulk" className={styles.mobileLink} onClick={closeAll}>Bulk &amp; Corporate</Link>
              </li>
            </ul>
          </nav>
        )}
      </header>
    </div>
  );
}

/* ---------- Icons ---------- */
const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

function SearchIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" {...base} className={styles.searchIcon}>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.800-3.800" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" {...base}>
      <path d="M12 21s-6.500-5.800-6.500-11a6.500 6.500 0 0 1 13 0c0 5.200-6.500 11-6.500 11Z" />
      <circle cx="12" cy="10" r="2.400" />
    </svg>
  );
}

function ChevronIcon({ small }: { small?: boolean }) {
  const s = small ? 12 : 14;
  return (
    <svg width={s} height={s} viewBox="0 0 16 16" {...base} strokeWidth={1.8} className={styles.chevron}>
      <path d="m4 6 4 4 4-4" />
    </svg>
  );
}

function TruckIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" {...base}>
      <path d="M2.500 6h11v10h-11z" />
      <path d="M13.500 9.500h4l3 3V16h-7" />
      <circle cx="7" cy="17.500" r="1.800" fill="#fff" />
      <circle cx="17" cy="17.500" r="1.800" fill="#fff" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" {...base}>
      <path d="M12 20.500s-8-4.900-8-11A4.500 4.500 0 0 1 12 6.800 4.500 4.500 0 0 1 20 9.500c0 6.100-8 11-8 11Z" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" {...base}>
      <circle cx="12" cy="8" r="3.800" />
      <path d="M4.500 20.500c.8-4 3.700-6 7.500-6s6.700 2 7.500 6" />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" {...base}>
      <path d="M2.500 3.500h3l2.200 11h10.300l2-8H6.500" />
      <circle cx="9" cy="19.500" r="1.400" />
      <circle cx="17" cy="19.500" r="1.400" />
    </svg>
  );
}

function BurgerIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" {...base} strokeWidth={1.9}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" {...base} strokeWidth={1.9}>
      <path d="m6 6 12 12M18 6 6 18" />
    </svg>
  );
}