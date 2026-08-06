import { Link, useParams } from "react-router-dom";
import { Footer } from "../components/Footer/Footer";
import { Header } from "../components/Header/Header";
import { footerContent, headerContent } from "../data/content";
import { properties } from "../data/properties";
import type { PropertyCategory } from "../types";
import "./PropertyCategoryPage.css";

const categoryNames: Record<PropertyCategory, string> = {
  sales: "Sales",
  rent: "Rent",
  shortlet: "Shortlet",
  "joint-venture": "Joint Venture",
};

function isPropertyCategory(value?: string): value is PropertyCategory {
  return Boolean(value && value in categoryNames);
}

export function PropertyCategoryPage() {
  const { category } = useParams();
  const validCategory = isPropertyCategory(category);
  const listings = validCategory ? properties.filter((property) => property.category === category) : [];
  const title = validCategory ? categoryNames[category] : "Properties";

  return (
    <div className="catalogue-page">
      <Header content={headerContent} />
      <main className="catalogue-main">
        <div className="holder">
          <Link className="catalogue-back" to="/#properties">← Back to Properties</Link>
          <header className="catalogue-heading">
            <span>The Sheltery Properties</span>
            <h1>{title}</h1>
            <p>{validCategory ? `A considered collection of ${title.toLowerCase()} opportunities.` : "Choose a property category to begin."}</p>
          </header>

          {!validCategory ? (
            <section className="catalogue-empty"><h2>That category is not available.</h2><Link className="button" to="/#properties">View properties</Link></section>
          ) : listings.length === 0 ? (
            <section className="catalogue-empty"><h2>Listings coming soon.</h2><p>We are preparing the next considered collection for this category.</p><Link className="button" to="/#properties">Explore properties</Link></section>
          ) : (
            <section className="listing-grid" aria-label={`${title} listings`}>
              {listings.map((property) => (
                <Link className="listing-card" key={property.id} to={`/properties/${property.category}/${property.slug}`}>
                  <div className="listing-image"><img src={property.heroImage} alt={`${property.name} estate view`} /><span>{property.status}</span></div>
                  <div className="listing-copy"><p>{property.location}</p><h2>{property.name}</h2><strong>{property.priceRange}</strong><span className="listing-link">Explore property ↗</span></div>
                </Link>
              ))}
            </section>
          )}
        </div>
      </main>
      <Footer content={footerContent} />
    </div>
  );
}
