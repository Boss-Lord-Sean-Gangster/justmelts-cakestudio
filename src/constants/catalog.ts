/* =====================================================================
   One catalog, one page. Every section and subsection has an id, and
   that id is the anchor on the /products page:

     /products#cakes
     /products#bestsellers-bento
     /products#themes-unicorn

   Use sectionHref("bestsellers-bento") for any button or CTA, or
   productHref("brownie") to land on the section a product lives in.
   ===================================================================== */

/** Your WhatsApp number with country code, no "+" (the "Order" buttons open a chat). */
export const WHATSAPP_NUMBER = "9217055099";

export const PRODUCTS_PATH = "/products";

export type Tone = "light" | "cream" | "lavender";

export type Product = {
  id: string;
  name: string;
  /** Path inside /public. Defaults to /images/products/<id>.jpg */
  image: string;
  rating: number;
  reviews: number;
  /** Price in rupees */
  price: number;
  /** Delivery chip text */
  delivery: string;
  eggless?: boolean;
};

export type Subsection = {
  id: string;
  title: string;
  /** Optional cover photo (used by the occasions grid), path inside /public */
  image?: string;
  products: Product[];
};

export type CatalogSection = {
  id: string;
  /** Short label for the sticky index bar */
  navLabel: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  tone: Tone;
  products?: Product[];
  subsections?: Subsection[];
};

/* ---------- Helpers ---------- */
const slug = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

/** `image` is optional; pass a full path to override the default. */
const p = (
  id: string,
  name: string,
  price: number,
  rating: number,
  reviews: number,
  delivery: string,
  image: string = `/images/products/${id}.jpg`
): Product => ({
  id,
  name,
  image,
  price,
  rating,
  reviews,
  delivery,
  eggless: true,
});

/** Bestseller photos live in /public/images/bestsellers/<id>.jpg */
const bs = (
  id: string,
  name: string,
  price: number,
  rating: number,
  reviews: number,
  delivery: string
) => p(id, name, price, rating, reviews, delivery, `/images/bestsellers/${id}.jpg`);

/** Custom cake photos live in /public/images/custom-cake/<n>.jpg */
const cc = (
  id: string,
  name: string,
  price: number,
  rating: number,
  reviews: number,
  delivery: string,
  n: number
) => p(id, name, price, rating, reviews, delivery, `/images/custom-cake/${n}.jpg`);

/* ---------- Ids you can link to ---------- */
export const SECTION_IDS = {
  cakes: "cakes",
  bento: "bento",
  desserts: "desserts",
  savouries: "savouries",
  occasions: "occasions",
  themes: "themes",
  bestsellers: "bestsellers",
  customCake: "custom-cake",
} as const;

/* ---------- Dummy data (replace with your own products) ---------- */
// Order matches the OccasionGrid component
const OCCASIONS = ["Birthday", "Anniversary", "Congratulations", "Baby Shower", "Festive", "Just Because"];
// Order matches the ThemePicker component
const THEMES = ["Superhero", "Princess", "Unicorn", "Cartoon", "Sports", "Cars", "Jungle", "Floral"];

export const CATALOG: CatalogSection[] = [
  {
    id: "cakes",
    navLabel: "Cakes",
    eyebrow: "Freshly baked",
    title: "Cakes",
    subtitle: "Soft, fresh and 100% eggless, made to order.",
    tone: "light",
    products: [
      p("classic-vanilla-cake", "Classic Vanilla Cake", 699, 4.8, 210, "Today"),
      p("dark-chocolate-ganache-cake", "Dark Chocolate Ganache Cake", 899, 4.9, 188, "Midnight"),
      p("red-velvet-cake", "Red Velvet Cream Cheese Cake", 949, 4.9, 156, "Today"),
      p("butterscotch-crunch-cake", "Butterscotch Crunch Cake", 799, 4.7, 134, "Today"),
      p("fresh-fruit-cake", "Fresh Fruit Cake", 899, 4.8, 97, "2 hrs"),
      p("pineapple-cream-cake", "Pineapple Cream Cake", 749, 4.7, 122, "Today"),
    ],
  },
  {
    id: "bento",
    navLabel: "Bento",
    eyebrow: "Small but special",
    title: "Bento cakes",
    subtitle: "Little cakes for big feelings. Perfect for one or two.",
    tone: "cream",
    products: [
      p("mini-bento-vanilla", "Vanilla Message Bento", 399, 4.8, 176, "2 hrs"),
      p("mini-bento-chocolate", "Chocolate Heart Bento", 449, 4.9, 203, "Today"),
      p("mini-bento-red-velvet", "Red Velvet Bento", 449, 4.8, 119, "Today"),
      p("mini-bento-butterscotch", "Butterscotch Bento", 429, 4.7, 88, "Midnight"),
    ],
  },
  {
    id: "desserts",
    navLabel: "Desserts",
    eyebrow: "Sweet little extras",
    title: "Desserts",
    subtitle: "Brownies, cupcakes, jars and cookies for every craving.",
    tone: "light",
    products: [
      p("classic-fudge-brownie", "Classic Fudge Brownies (6)", 549, 4.9, 264, "Today"),
      p("walnut-brownie", "Walnut Brownies (6)", 599, 4.8, 141, "Today"),
      p("oreo-cake-jar", "Oreo Cake Jar", 229, 4.7, 167, "2 hrs"),
      p("belgian-chocolate-cupcakes", "Belgian Chocolate Cupcakes (4)", 399, 4.8, 129, "Today"),
      p("choco-chip-cookies", "Choco Chip Cookies Box", 449, 4.9, 215, "Midnight"),
      p("blueberry-cheesecake-jar", "Blueberry Cheesecake Jar", 259, 4.8, 92, "Today"),
    ],
  },
  {
    id: "savouries",
    navLabel: "Savouries",
    eyebrow: "Fresh from the oven",
    title: "Savouries",
    subtitle: "Breads, puffs and quiches, baked the same day.",
    tone: "cream",
    products: [
      p("garlic-bread-loaf", "Garlic Bread Loaf", 249, 4.7, 83, "Today"),
      p("paneer-puffs-box", "Paneer Puffs (4)", 299, 4.8, 74, "2 hrs"),
      p("mushroom-quiche", "Mushroom Quiche", 449, 4.8, 51, "Today"),
      p("cheese-croissant", "Cheese Croissants (3)", 349, 4.9, 66, "Today"),
    ],
  },
  {
    id: "occasions",
    navLabel: "Occasions",
    eyebrow: "Celebrate every story",
    title: "Shop by occasion",
    subtitle: "Handcrafted for life\u2019s sweetest milestones \u2014 and all the little moments between.",
    tone: "lavender",
    subsections: OCCASIONS.map((name, i) => {
      const s = slug(name);
      return {
        id: `occasions-${s}`,
        title: name,
        // /images/birthday.jpg, /images/babyshower.jpg, /images/justbecause.jpg ...
        image: `/images/${s.replace(/-/g, "")}.jpg`,
        products: [
          p(`${s}-cake`, `${name} Cake`, 899, 4.9, 120 + i * 13, "Today"),
          p(`${s}-bento`, `${name} Bento Cake`, 499, 4.8, 90 + i * 11, "2 hrs"),
          p(`${s}-gift-box`, `${name} Gift Box`, 1299, 4.8, 60 + i * 7, "Midnight"),
        ],
      };
    }),
  },
  {
    id: "themes",
    navLabel: "Themes",
    eyebrow: "Made for their world",
    title: "Pick a theme, make their day",
    subtitle: "Theme cakes and treats for every little fan.",
    tone: "cream",
    subsections: THEMES.map((name, i) => {
      const s = slug(name);
      return {
        id: `themes-${s}`,
        title: name,
        products: [
          p(`${s}-theme-cake`, `${name} Theme Cake`, 1499, 4.9, 80 + i * 9, "Today"),
          p(`${s}-cupcake-set`, `${name} Cupcake Set`, 899, 4.8, 55 + i * 6, "Today"),
        ],
      };
    }),
  },
  {
    id: "bestsellers",
    navLabel: "Bestsellers",
    eyebrow: "Most-loved",
    title: "Bestsellers, for good reason",
    subtitle: "The ones people order again and again.",
    tone: "light",
    subsections: [
      {
        id: "bestsellers-cakes",
        title: "Cakes",
        products: [
          bs("velvet-berry-celebration-cake", "Velvet Berry Celebration Cake", 1249, 4.9, 164, "Today"),
          bs("classic-chocolate-truffle", "Classic Chocolate Truffle", 849, 4.8, 312, "Midnight"),
          bs("blush-garden-floral-cake", "Blush Garden Floral Cake", 1499, 5.0, 87, "Today"),
          bs("minimal-cherry-bento-cake", "Minimal Cherry Bento Cake", 499, 4.9, 206, "2 hrs"),
        ],
      },
      {
        id: "bestsellers-bento",
        title: "Bento",
        products: [
          bs("vanilla-heart-bento", "Vanilla Heart Bento", 449, 4.8, 142, "2 hrs"),
          bs("lotus-biscoff-bento", "Lotus Biscoff Bento", 549, 4.9, 98, "Today"),
          bs("choco-drip-bento", "Choco Drip Bento", 479, 4.7, 175, "Today"),
          bs("strawberry-cream-bento", "Strawberry Cream Bento", 499, 4.8, 120, "Midnight"),
        ],
      },
      {
        id: "bestsellers-desserts",
        title: "Desserts",
        products: [
          bs("brownie", "Fudge Brownie Box of 6", 599, 4.9, 260, "Today"),
          bs("cakejars", "Tiramisu Cake Jar", 249, 4.8, 134, "2 hrs"),
          bs("cupcake", "Red Velvet Cupcakes (4)", 399, 4.7, 189, "Today"),
          bs("cookies", "Nutella Cookie Box", 549, 4.9, 221, "Midnight"),
        ],
      },
      {
        id: "bestsellers-savouries",
        title: "Savouries",
        products: [
          bs("paneer-puff", "Paneer Puff", 299, 4.8, 76, "Today"),
          bs("potato-puff", "Potato Puff", 349, 4.9, 64, "Today"),
          bs("chowmein-puff", "Chowmein Puff", 399, 4.7, 91, "2 hrs"),
          bs("paneer-kulcha", "Paneer Kulcha", 449, 4.8, 58, "Today"),
        ],
      },
    ],
  },
  {
    id: "custom-cake",
    navLabel: "Custom Cake",
    eyebrow: "Your idea, our craft",
    title: "Have a design in mind?",
    subtitle: "Upload your reference and tell us your occasion. We\u2019ll get back with a quote within 2 hours.",
    tone: "cream",
    products: [
      cc("custom-photo-cake", "Photo Cake", 1299, 4.9, 72, "2 days", 1),
      cc("custom-theme-cake", "Custom Theme Cake", 1999, 5.0, 64, "2 days", 2),
      cc("custom-tiered-cake", "Tiered Celebration Cake", 3499, 4.9, 41, "3 days", 3),
    ],
  },
];

/* ---------- Links ---------- */

/** Link to any section or subsection on the products page, e.g. sectionHref("bestsellers-bento") */
export const sectionHref = (id: string) => `${PRODUCTS_PATH}#${id}`;

const PRODUCT_ANCHORS: Record<string, string> = {};
for (const s of CATALOG) {
  s.products?.forEach((pr) => (PRODUCT_ANCHORS[pr.id] = s.id));
  s.subsections?.forEach((sub) =>
    sub.products.forEach((pr) => (PRODUCT_ANCHORS[pr.id] = sub.id))
  );
}

/** Link that lands on the section (or subsection) where this product is listed. */
export const productHref = (productId: string) => {
  const anchor = PRODUCT_ANCHORS[productId];
  return anchor ? sectionHref(anchor) : PRODUCTS_PATH;
};

/** Opens a WhatsApp chat with the product name pre-filled. */
export const whatsappLink = (what: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Hi JustMelts, I\u2019d like to order: ${what}`
  )}`;

export const INDEX_ITEMS = CATALOG.map((s) => ({ id: s.id, label: s.navLabel }));