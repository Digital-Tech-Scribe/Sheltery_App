import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Footer } from "../components/Footer/Footer";
import { Header } from "../components/Header/Header";
import { PropertyMedia } from "../components/property-media/PropertyMedia";
import { footerContent, headerContent } from "../data/content";
import { properties } from "../data/properties";
import "./PropertyDetailPage.css";

function WhatsAppIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor">
      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-5.805 1.554zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
    </svg>
  );
}

export function PropertyDetailPage() {
  const { category, slug } = useParams();
  const property = properties.find(
    (item) => item.category === category && item.slug === slug,
  );

  useEffect(() => {
    if (!property) return;
    document.title = `${property.name} | The Sheltery`;
    let description = document.querySelector('meta[name="description"]');
    if (!description) {
      description = document.createElement("meta");
      description.setAttribute("name", "description");
      document.head.appendChild(description);
    }
    description.setAttribute("content", property.summary);
  }, [property]);

  if (!property) {
    return (
      <div className="detail-page">
        <Header content={headerContent} />
        <main className="detail-not-found holder">
          <h1>Property not found.</h1>
          <p>This listing is not currently available.</p>
          <Link className="button" to="/#properties">
            View properties
          </Link>
        </main>
        <Footer content={footerContent} />
      </div>
    );
  }

  const overview = [
    ["Type", property.propertyType],
    ["Category", property.propertyOverview.category],
    ["Title", property.title],
    ["Location", property.location],
    ["Status", property.status],
    ["Size", property.propertyOverview.propertySize],
    ["Delivery", property.propertyOverview.deliveryDate],
    ["Construction", property.propertyOverview.constructionStatus],
  ].filter((item): item is [string, string] => Boolean(item[1]));

  const summarySpecs = [
    property.propertyOverview.propertySize,
    property.propertyType,
    property.title,
  ].filter((item): item is string => Boolean(item));

  return (
    <div className="detail-page">
      <Header content={headerContent} />
      <main className="detail-main">
        <div className="holder">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span>›</span>
            <Link to="/#properties">Properties</Link>
            <span>›</span>
            <Link to={`/properties/${property.category}`}>
              {property.category === "sales" ? "Sales" : property.category}
            </Link>
            <span>›</span>
            <span>{property.name}</span>
          </nav>

          <PropertyMedia
            propertyName={property.name}
            status={property.status}
            heroImage={property.heroImage}
            galleryImages={property.galleryImages}
            videoUrl={property.videoUrl}
            location={property.location}
            map={property.map}
          />

          <section className="property-header-info" aria-labelledby="property-title">
            <div className="property-title-group">
              <span className="property-eyebrow">{property.status}</span>
              <h1 id="property-title" className="property-main-title">
                {property.name}
              </h1>
              <p className="property-summary">{property.summary}</p>
              <p className="property-location-line">{property.location}</p>
            </div>

            {property.priceRange && (
              <p className="property-price-headline">{property.priceRange}</p>
            )}

            <div className="property-specs-action-bar">
              <div className="property-specs" aria-label="Property highlights">
                {summarySpecs.map((spec) => (
                  <span key={spec}>{spec}</span>
                ))}
              </div>
              {property.whatsappLink && (
                <a
                  className="property-whatsapp-cta"
                  href={property.whatsappLink}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Chat on WhatsApp"
                >
                  <WhatsAppIcon />
                  <span>Chat on WhatsApp</span>
                </a>
              )}
            </div>
          </section>

          <section className="detail-split">
            <div>
              <span className="detail-eyebrow">Property description</span>
              <h2>Designed for you to live, play and relax.</h2>
            </div>
            <div className="detail-description">
              {property.description.split("\n\n").map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </section>

          <section className="detail-section">
            <span className="detail-eyebrow">Property overview</span>
            <dl className="overview-grid">
              {overview.map(([label, value]) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section className="detail-section">
            <span className="detail-eyebrow">Pricing</span>
            <h2>Choose your phase.</h2>
            <div className="pricing-grid">
              {property.pricingTables.map((table) => (
                <article className="pricing-card" key={table.title}>
                  <h3>{table.title}</h3>
                  {table.status ? (
                    <p className="pricing-status">{table.status}</p>
                  ) : (
                    <div className="pricing-rows">
                      {table.items.map((item) => (
                        <div key={item.size}>
                          <span>{item.size}</span>
                          <strong>{item.price}</strong>
                        </div>
                      ))}
                    </div>
                  )}
                  {table.paymentPlan && (
                    <p className="pricing-plan">{table.paymentPlan}</p>
                  )}
                </article>
              ))}
            </div>
          </section>

          {property.paymentPlan && (
            <section className="detail-section detail-payment">
              <span className="detail-eyebrow">Payment plan</span>
              <p>{property.paymentPlan}</p>
            </section>
          )}

          <section className="detail-section">
            <span className="detail-eyebrow">Features &amp; amenities</span>
            <h2>A complete estate life.</h2>
            <ul className="feature-grid">
              {property.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </section>

          {property.whatsappLink && (
            <section className="detail-inquiry">
              <span className="detail-eyebrow">Interested in this property?</span>
              <h2>Let’s discuss your next move.</h2>
              <a href={property.whatsappLink} target="_blank" rel="noreferrer">
                Chat on WhatsApp
              </a>
            </section>
          )}
        </div>
      </main>
      <Footer content={footerContent} />
    </div>
  );
}
