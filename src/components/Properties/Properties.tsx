import { Link } from "react-router-dom";
import "./Properties.css";

const asset = (file: string) => `${import.meta.env.BASE_URL}assets/${file}`;

const categories = [
  {
    slug: "sales",
    title: "Sales",
    detail: "Homes and land selected for ownership.",
    image: asset("properties/hutu-exclusive/hero.jpg"),
  },
  {
    slug: "rent",
    title: "Rent",
    detail: "Longer stays, thoughtfully placed.",
    image: asset("luxury-walkway.jpg"),
  },
  {
    slug: "shortlet",
    title: "Shortlet",
    detail: "Refined temporary living.",
    image: asset("hero-lagos.jpg"),
  },
  {
    slug: "joint-venture",
    title: "Joint Venture",
    detail: "Opportunities shaped in partnership.",
    image: asset("founder-portrait.jpg"),
  },
] as const;

export function Properties() {
  return (
    <section className="properties" id="properties" aria-labelledby="properties-title">
      <div className="properties-heading reveal">
        <div className="properties-kicker">The Sheltery Properties</div>
        <h2 id="properties-title">
          <span className="text-wrap"><span className="text-inner">Find the place</span></span>
          <span className="text-wrap"><span className="text-inner">that fits your life.</span></span>
        </h2>
      </div>

      <div className="properties-grid">
        {categories.map((category) => (
          <Link className="property-category-card" key={category.slug} to={`/properties/${category.slug}`}>
            <img src={category.image} alt="" />
            <span className="property-category-shade" />
            <span className="property-category-content">
              <span className="property-category-label">Explore</span>
              <span className="property-category-title">{category.title}</span>
              <span className="property-category-detail">{category.detail}</span>
              <span className="property-category-arrow" aria-hidden="true">↗</span>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
