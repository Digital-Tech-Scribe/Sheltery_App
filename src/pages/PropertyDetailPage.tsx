import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Footer } from "../components/Footer/Footer";
import { Header } from "../components/Header/Header";
import { footerContent, headerContent } from "../data/content";
import { properties } from "../data/properties";
import "./PropertyDetailPage.css";

export function PropertyDetailPage() {
  const { category, slug } = useParams();
  const property = properties.find((item) => item.category === category && item.slug === slug);

  useEffect(() => {
    if (!property) return;
    document.title = `${property.name} | The Sheltery`;
    let description = document.querySelector('meta[name="description"]');
    if (!description) { description = document.createElement("meta"); description.setAttribute("name", "description"); document.head.appendChild(description); }
    description.setAttribute("content", property.summary);
  }, [property]);

  if (!property) {
    return <div className="detail-page"><Header content={headerContent} /><main className="detail-not-found holder"><h1>Property not found.</h1><p>This listing is not currently available.</p><Link className="button" to="/#properties">View properties</Link></main><Footer content={footerContent} /></div>;
  }

  const overview = [
    ["Property name", property.propertyOverview.propertyName], ["Type", property.propertyType], ["Category", property.propertyOverview.category], ["Title", property.title], ["Location", property.location], ["Status", property.status], ["Size", property.propertyOverview.propertySize], ["Delivery", property.propertyOverview.deliveryDate], ["Construction", property.propertyOverview.constructionStatus],
  ].filter((item): item is [string, string] => Boolean(item[1]));

  return (
    <div className="detail-page">
      <Header content={headerContent} />
      <main className="detail-main">
        <div className="holder">
          <nav className="breadcrumbs" aria-label="Breadcrumb"><Link to="/">Home</Link><span>›</span><Link to="/#properties">Properties</Link><span>›</span><Link to={`/properties/${property.category}`}>{property.category === "sales" ? "Sales" : property.category}</Link><span>›</span><span>{property.name}</span></nav>
          <section className="detail-hero"><div className="detail-hero-copy"><span className="detail-eyebrow">{property.status} · {property.title}</span><h1>{property.name}</h1><p>{property.summary}</p><a className="button" href={property.whatsappLink} target="_blank" rel="noreferrer">Inquire on WhatsApp</a></div><img src={property.heroImage} alt={`${property.name} property render`} /></section>
          <section className="detail-gallery" aria-label={`${property.name} gallery`}>{property.galleryImages.map((image, index) => <img key={image} src={image} alt={`${property.name} gallery image ${index + 1}`} />)}</section>
          <section className="detail-split"><div><span className="detail-eyebrow">Property description</span><h2>Designed for you to live, play and relax.</h2></div><div className="detail-description">{property.description.split("\n\n").map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div></section>
          <section className="detail-section"><span className="detail-eyebrow">Property overview</span><dl className="overview-grid">{overview.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl></section>
          <section className="detail-section"><span className="detail-eyebrow">Pricing</span><h2>Choose your phase.</h2><div className="pricing-grid">{property.pricingTables.map((table) => <article className="pricing-card" key={table.title}><h3>{table.title}</h3>{table.status ? <p className="pricing-status">{table.status}</p> : <div className="pricing-rows">{table.items.map((item) => <div key={item.size}><span>{item.size}</span><strong>{item.price}</strong></div>)}</div>}{table.paymentPlan && <p className="pricing-plan">{table.paymentPlan}</p>}</article>)}</div></section>
          <section className="detail-section detail-payment"><span className="detail-eyebrow">Payment plan</span><p>{property.paymentPlan}</p></section>
          <section className="detail-section"><span className="detail-eyebrow">Features & amenities</span><h2>A complete estate life.</h2><ul className="feature-grid">{property.features.map((feature) => <li key={feature}>{feature}</li>)}</ul></section>
          {property.videoUrl && <section className="detail-section"><span className="detail-eyebrow">Discover Hutu Exclusive</span><div className="video-frame"><iframe src={property.videoUrl} title={`${property.name} video`} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen /></div></section>}
          <section className="detail-inquiry"><span className="detail-eyebrow">Interested in this property?</span><h2>Let’s discuss your next move.</h2><a className="button" href={property.whatsappLink} target="_blank" rel="noreferrer">Speak to a representative</a></section>
        </div>
      </main>
      <Footer content={footerContent} />
    </div>
  );
}
