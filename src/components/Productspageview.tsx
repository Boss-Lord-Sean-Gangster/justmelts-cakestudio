// import CustomCakeCta from "@/components/CustomCakeCta/CustomCakeCta";
import { CATALOG, INDEX_ITEMS, whatsappLink } from "../constants/catalog";
import ProductSection from "./Productsection";
import SectionIndex from "./Sectionindex";
// import { sans, serif } from "./fonts";
import styles from "../styles/Productspage.module.css";
import CustomCakeCta from "./Customcakecta";

export default function ProductsPageView() {
  return (
    <div className={`${styles.page} `}>
      <header id="products-top" className={styles.pageHeader}>
        <div className={styles.inner}>
          <p className={styles.eyebrow}>Our menu</p>
          <h1 className={`${styles.pageTitle} `}>
            Everything for the celebration
          </h1>
          <p className={styles.pageSub}>
            Cakes, bento, desserts and savouries, all 100% eggless. Pick a
            section below or jump straight to what you need.
          </p>
        </div>
      </header>

      {/* <SectionIndex items={INDEX_ITEMS} /> */}

      {CATALOG.map((section) => (
        <ProductSection
          key={section.id}
          section={section}
          after={
            section.id === "custom-cake" ? (
              <CustomCakeCta
                ctaHref={whatsappLink("a custom cake (I have a design in mind)")}
              />
            ) : undefined
          }
        />
      ))}
    </div>
  );
}