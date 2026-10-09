/* =====================================================================
   One catalog, one page. Every section and subsection has an id, and
   that id is the anchor on the /products page:

     /products#cakes
     /products#bestsellers-bento
     /products#themes-unicorn

   Use sectionHref("bestsellers-bento") for any button or CTA, or
   productHref("brownie") to land on the section a product lives in.

   IMAGES: every product photo is /public/images/<folder>/<product id>.jpg
   See IMAGES.md for the full folder layout and every file name.
   ===================================================================== */

/** Your WhatsApp number with country code (91 for India), no "+" and no spaces. */
export const WHATSAPP_NUMBER = "919217055099";

export const PRODUCTS_PATH = "/products";

/* ---------- Pricing (breakdown is never shown to customers) ---------- */

/** Sizes offered on weighted cakes, in kg. */
export const SIZES = [0.5, 1, 2, 3] as const;
export type Size = (typeof SIZES)[number];

/** Price of a plain half-kg cake. 1 kg = 940, 2 kg = 1880, 3 kg = 2820. */
const BASE_HALF_KG = 470;

/** Basic customisation (labour + material). Flat, added once, hidden inside the shown price. */
const CUSTOMISATION_FEE = 300;

export const sizeLabel = (s: Size) => (s === 0.5 ? "\u00BD kg" : `${s} kg`);

export type Tone = "light" | "cream" | "lavender";

export type Product = {
  id: string;
  name: string;
  /** Path inside /public */
  image: string;
  rating: number;
  reviews: number;
  /** Half-kg price for weighted cakes, fixed price for everything else (rupees) */
  price: number;
  eggless?: boolean;
  /** Shows the 1/2, 1, 2, 3 kg selector and scales the price */
  weighted?: boolean;
  /** Adds the basic customisation fee into the displayed price */
  customisable?: boolean;
};

/** The one formula that decides what the customer sees. */
export const priceFor = (p: Product, size: Size = 0.5) => {
  const base = p.weighted ? Math.round((p.price * size) / 0.5) : p.price;
  return base + (p.customisable ? CUSTOMISATION_FEE : 0);
};

export type Subsection = {
  id: string;
  title: string;
  /** Optional cover photo (used by the occasions grid), path inside /public */
  image?: string;
  /** Shows the "customise to your needs" card at the end of the grid */
  customise?: boolean;
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

type Opts = { weighted?: boolean; customisable?: boolean };

/**
 * Makes a product builder for one image folder.
 * The photo is always /images/<folder>/<id>.jpg
 */
const inFolder =
  (folder: string, defaults: Opts = {}) =>
  (
    id: string,
    name: string,
    price: number,
    rating: number,
    reviews: number,
    opts: Opts = {}
  ): Product => ({
    id,
    name,
    image: `/images/${folder}/${id}.jpg`,
    price,
    rating,
    reviews,
    eggless: true,
    ...defaults,
    ...opts,
  });

const cake = inFolder("products/cakes", { weighted: true });
const bento = inFolder("products/bento");
const dessert = inFolder("products/desserts");
const savoury = inFolder("products/savouries");
const occasionCake = inFolder("products/occasions", { weighted: true, customisable: true });
const occasionBento = inFolder("products/occasions");
const themeCake = inFolder("products/themes", { weighted: true, customisable: true });
const bs = inFolder("bestsellers"); // bestseller photos

/** Custom cake photos are numbered: /images/custom-cake/1.jpg, 2.jpg, 3.jpg */
const cc = (
  id: string,
  name: string,
  price: number,
  rating: number,
  reviews: number,
  n: number
): Product => ({
  ...inFolder("custom-cake")(id, name, price, rating, reviews),
  image: `/images/custom-cake/${n}.jpg`,
});

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

/* ---------- Data ---------- */
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
      cake("classic-vanilla-cake", "Classic Vanilla Cake", BASE_HALF_KG, 4.8, 210),
      cake("dark-chocolate-ganache-cake", "Dark Chocolate Ganache Cake", BASE_HALF_KG, 4.9, 188),
      cake("red-velvet-cake", "Red Velvet Cream Cheese Cake", BASE_HALF_KG, 4.9, 156),
      cake("butterscotch-crunch-cake", "Butterscotch Crunch Cake", BASE_HALF_KG, 4.7, 134),
      cake("fresh-fruit-cake", "Fresh Fruit Cake", BASE_HALF_KG, 4.8, 97),
      cake("pineapple-cream-cake", "Pineapple Cream Cake", BASE_HALF_KG, 4.7, 122),
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
      bento("mini-bento-vanilla", "Vanilla Message Bento", 399, 4.8, 176),
      bento("mini-bento-chocolate", "Chocolate Heart Bento", 449, 4.9, 203),
      bento("mini-bento-red-velvet", "Red Velvet Bento", 449, 4.8, 119),
      bento("mini-bento-butterscotch", "Butterscotch Bento", 429, 4.7, 88),
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
      dessert("classic-fudge-brownie", "Classic Fudge Brownies (6)", 549, 4.9, 264),
      // dessert("walnut-brownie", "Walnut Brownies (6)", 599, 4.8, 141),
      dessert("oreo-cake-jar", "Oreo Cake Jar", 229, 4.7, 167),
      dessert("belgian-chocolate-cupcakes", "Belgian Chocolate Cupcakes (4)", 399, 4.8, 129),
      dessert("choco-chip-cookies", "Choco Chip Cookies Box", 449, 4.9, 215),
      // dessert("blueberry-cheesecake-jar", "Blueberry Cheesecake Jar", 259, 4.8, 92),
    ],
  },
  {
    id: "savouries",
    navLabel: "Savouries",
    eyebrow: "Fresh from the oven",
    title: "Savouries",
    subtitle: "Puffs, kulchas and buns, baked the same day.",
    tone: "cream",
    products: [
      savoury("potato-puff", "Potato Puff", 349, 4.9, 64),
      savoury("paneer-puff", "Paneer Puff", 299, 4.8, 76),
      savoury("chowmein-puff", "Chowmein Puff", 399, 4.7, 91),
      savoury("paneer-kulcha", "Paneer Kulcha", 449, 4.8, 58),
      savoury("korean-cheese-bun", "Korean Cheese Bun", 349, 4.9, 48),
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
        customise: true,
        products: [
          occasionCake(`${s}-cake`, `${name} Cake`, BASE_HALF_KG, 4.9, 120 + i * 13),
          occasionBento(`${s}-bento`, `${name} Bento Cake`, 499, 4.8, 90 + i * 11),
        ],
      };
    }),
  },
  {
    id: "themes",
    navLabel: "Themes",
    eyebrow: "Made for their world",
    title: "Pick a theme, make their day",
    subtitle: "Theme cakes for every little fan.",
    tone: "cream",
    subsections: THEMES.map((name, i) => {
      const s = slug(name);
      return {
        id: `themes-${s}`,
        title: name,
        customise: true,
        products: [
          themeCake(`${s}-theme-cake`, `${name} Theme Cake`, BASE_HALF_KG, 4.9, 80 + i * 9),
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
          bs("velvet-berry-celebration-cake", "Velvet Berry Celebration Cake", BASE_HALF_KG, 4.9, 164, { weighted: true }),
          bs("classic-chocolate-truffle", "Classic Chocolate Truffle", BASE_HALF_KG, 4.8, 312, { weighted: true }),
          bs("blush-garden-floral-cake", "Blush Garden Floral Cake", BASE_HALF_KG, 5.0, 87, { weighted: true, customisable: true }),
          bs("minimal-cherry-bento-cake", "Minimal Cherry Bento Cake", 499, 4.9, 206),
        ],
      },
      {
        id: "bestsellers-bento",
        title: "Bento",
        products: [
          bs("vanilla-heart-bento", "Vanilla Heart Bento", 449, 4.8, 142),
          bs("lotus-biscoff-bento", "Lotus Biscoff Bento", 549, 4.9, 98),
          bs("choco-drip-bento", "Choco Drip Bento", 479, 4.7, 175),
          bs("strawberry-cream-bento", "Strawberry Cream Bento", 499, 4.8, 120),
        ],
      },
      {
        id: "bestsellers-desserts",
        title: "Desserts",
        products: [
          bs("brownie", "Fudge Brownie Box of 6", 599, 4.9, 260),
          bs("cakejars", "Tiramisu Cake Jar", 249, 4.8, 134),
          bs("cupcake", "Red Velvet Cupcakes (4)", 399, 4.7, 189),
          bs("cookies", "Nutella Cookie Box", 549, 4.9, 221),
        ],
      },
      {
        id: "bestsellers-savouries",
        title: "Savouries",
        products: [
          bs("paneer-puff", "Paneer Puff", 299, 4.8, 76),
          bs("potato-puff", "Potato Puff", 349, 4.9, 64),
          bs("chowmein-puff", "Chowmein Puff", 399, 4.7, 91),
          bs("paneer-kulcha", "Paneer Kulcha", 449, 4.8, 58),
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
      cc("custom-photo-cake", "Photo Cake", 1299, 4.9, 72, 1),
      cc("custom-theme-cake", "Custom Theme Cake", 1999, 5.0, 64, 2),
      cc("custom-tiered-cake", "Tiered Celebration Cake", 3499, 4.9, 41, 3),
    ],
  },
];

/* ---------- Links ---------- */

/** Link to any section or subsection on the products page, e.g. sectionHref("bestsellers-bento") */
export const sectionHref = (id: string) => `${PRODUCTS_PATH}#${id}`;

// Later sections win, so a product that is also a bestseller links to the Bestsellers block.
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

/** Opens a WhatsApp chat with the message pre-filled. */
export const whatsappLink = (what: string, intro = "I\u2019d like to order") =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Hi JustMelts, ${intro}: ${what}`
  )}`;

export const INDEX_ITEMS = CATALOG.map((s) => ({ id: s.id, label: s.navLabel }));