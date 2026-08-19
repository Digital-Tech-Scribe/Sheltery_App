import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Footer } from "../components/Footer/Footer";
import { Header } from "../components/Header/Header";
import { footerContent, headerContent } from "../data/content";
import { properties } from "../data/properties";
import "./PropertyDetailPage.css";

export function PropertyDetailPage() {
  const { category, slug } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTab, setModalTab] = useState<"photos" | "map">("photos");
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [isPlayingInlineVideo, setIsPlayingInlineVideo] = useState(false);
  const [copiedToast, setCopiedToast] = useState(false);

  const autoPlayTimerRef = useRef<number | null>(null);

  const property = properties.find(
    (item) => item.category === category && item.slug === slug
  );

  // Derived from an optional property so every hook stays above the early return
  // (otherwise navigating between a valid and an invalid slug changes hook order).
  const allImages = Array.from(
    new Set(
      [property?.heroImage, ...(property?.galleryImages ?? [])].filter(
        (img): img is string => Boolean(img)
      )
    )
  );

  const nextPhoto = useCallback(() => {
    if (!allImages.length) return;
    setActivePhotoIndex((prev) => (prev + 1) % allImages.length);
  }, [allImages.length]);

  const prevPhoto = useCallback(() => {
    if (!allImages.length) return;
    setActivePhotoIndex(
      (prev) => (prev - 1 + allImages.length) % allImages.length
    );
  }, [allImages.length]);

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

  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = isModalOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isModalOpen]);

  // Keyboard navigation for modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isModalOpen) return;
      if (e.key === "Escape") {
        setIsModalOpen(false);
      } else if (e.key === "ArrowLeft") {
        prevPhoto();
      } else if (e.key === "ArrowRight") {
        nextPhoto();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen, nextPhoto, prevPhoto]);

  // 5-second Auto-slide logic for modal. The timer restarts after each advance
  // because activePhotoIndex is a dependency, giving every photo a fresh 5s.
  useEffect(() => {
    if (isModalOpen && modalTab === "photos") {
      autoPlayTimerRef.current = window.setInterval(() => {
        nextPhoto();
      }, 5000);
    }
    return () => {
      if (autoPlayTimerRef.current) {
        window.clearInterval(autoPlayTimerRef.current);
        autoPlayTimerRef.current = null;
      }
    };
  }, [isModalOpen, modalTab, nextPhoto, activePhotoIndex]);

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

  const featuredImage = allImages[0];
  const sideThumbnails = allImages.slice(1, 5); // 4 images for 2x2 grid

  const openLightbox = (index = 0, tab: "photos" | "map" = "photos") => {
    setActivePhotoIndex(index);
    setModalTab(tab);
    setIsModalOpen(true);
  };

  const resetAutoPlay = () => {
    if (autoPlayTimerRef.current) {
      window.clearInterval(autoPlayTimerRef.current);
      autoPlayTimerRef.current = null;
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${property.name} | The Sheltery`,
          text: property.summary,
          url: window.location.href,
        });
      } catch {
        // Fallback to clipboard
      }
    } else {
      await navigator.clipboard.writeText(window.location.href);
      setCopiedToast(true);
      setTimeout(() => setCopiedToast(false), 2500);
    }
  };

  const overview = [
    ["Property name", property.propertyOverview.propertyName],
    ["Type", property.propertyType],
    ["Category", property.propertyOverview.category],
    ["Title", property.title],
    ["Location", property.location],
    ["Status", property.status],
    ["Size", property.propertyOverview.propertySize],
    ["Delivery", property.propertyOverview.deliveryDate],
    ["Construction", property.propertyOverview.constructionStatus],
  ].filter((item): item is [string, string] => Boolean(item[1]));

  const mapEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(
    property.location
  )}&t=&z=14&ie=UTF8&iwloc=&output=embed`;

  return (
    <div className="detail-page serhant-theme">
      <Header content={headerContent} />
      <main className="detail-main">
        <div className="holder">
          {/* Breadcrumb Navigation */}
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

          {/* 5-Image Serhant Bento Hero Gallery */}
          <section className="bento-gallery-hero" aria-label="Property Media Preview">
            {/* Featured Slot */}
            <div className="bento-featured-slot">
              {isPlayingInlineVideo && property.videoUrl ? (
                <div className="inline-video-wrapper">
                  <iframe
                    src={`${property.videoUrl}?autoplay=1`}
                    title={`${property.name} Video`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                  <button
                    type="button"
                    className="inline-video-close"
                    onClick={() => setIsPlayingInlineVideo(false)}
                    aria-label="Close video and show photo"
                  >
                    ✕ Close Video
                  </button>
                </div>
              ) : (
                <div
                  className="bento-image-card"
                  onClick={() => openLightbox(0, "photos")}
                  role="button"
                  tabIndex={0}
                >
                  <img src={featuredImage} alt={`${property.name} featured exterior`} />

                  {/* Top Badges */}
                  <div className="bento-badge-top-left">
                    <span>THE SHELTERY · Signature</span>
                  </div>
                  <div className="bento-badge-top-right">
                    <span>{property.status.toUpperCase()}</span>
                  </div>

                  {/* Centered Liquid Glass Play Button */}
                  {property.videoUrl && (
                    <button
                      type="button"
                      className="liquid-glass-play-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsPlayingInlineVideo(true);
                      }}
                      aria-label="Play property video in place"
                    >
                      <span className="liquid-play-icon">▶</span>
                      <span className="liquid-play-text">Play</span>
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* 2x2 Thumbnail Grid */}
            <div className="bento-grid-2x2">
              {sideThumbnails.map((img, idx) => {
                const isLastThumb = idx === sideThumbnails.length - 1;
                return (
                  <div
                    key={img}
                    className="bento-thumb-card"
                    onClick={() => openLightbox(idx + 1, "photos")}
                    role="button"
                    tabIndex={0}
                  >
                    <img src={img} alt={`${property.name} thumbnail ${idx + 1}`} />
                    {isLastThumb && (
                      <div className="bento-view-all-pill">
                        <span>View All Photos</span>
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          {/* Serhant-Style Property Header & Info Row */}
          <section className="property-header-info">
            <div className="property-title-group">
              <span className="property-eyebrow-badge">
                {property.status} · {property.title}
              </span>
              <h1 className="property-main-title">{property.name}</h1>
              <p className="property-location-line">{property.location}</p>
            </div>
            {property.priceRange && (
              <div className="property-price-headline">
                {property.priceRange}
              </div>
            )}

            {/* Horizontal Specs & WhatsApp Inquiry Bar */}
            <div className="property-specs-action-bar">
              <div className="property-specs-pills">
                <span>{property.propertyOverview.propertySize || "150SQM – 1000SQM"}</span>
                <span className="spec-dot">•</span>
                <span>1 – 7 BEDS</span>
                <span className="spec-dot">•</span>
                <span>{property.propertyType.toUpperCase()}</span>
                <span className="spec-dot">•</span>
                <span>{property.title.toUpperCase()}</span>
              </div>

              {/* Serhant Pill-Style WhatsApp Action Button */}
              <a
                className="serhant-whatsapp-pill"
                href={property.whatsappLink}
                target="_blank"
                rel="noreferrer"
                aria-label="Inquire on WhatsApp"
              >
                <svg
                  className="whatsapp-svg-icon"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-5.805 1.554zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                </svg>
                <span>Inquire on WhatsApp</span>
              </a>
            </div>
          </section>

          {/* Property Description Split Section */}
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

          {/* Property Overview Grid */}
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

          {/* Pricing Tables */}
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

          {/* Payment Plan */}
          <section className="detail-section detail-payment">
            <span className="detail-eyebrow">Payment plan</span>
            <p>{property.paymentPlan}</p>
          </section>

          {/* Features & Amenities */}
          <section className="detail-section">
            <span className="detail-eyebrow">Features & amenities</span>
            <h2>A complete estate life.</h2>
            <ul className="feature-grid">
              {property.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </section>

          {/* Inquiry Call to Action */}
          <section className="detail-inquiry">
            <span className="detail-eyebrow">Interested in this property?</span>
            <h2>Let’s discuss your next move.</h2>
            <a
              className="button"
              href={property.whatsappLink}
              target="_blank"
              rel="noreferrer"
            >
              Speak to a representative
            </a>
          </section>
        </div>
      </main>

      {/* Fullscreen Photos & Map Lightbox Modal */}
      {isModalOpen && (
        <div className="lightbox-modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="lightbox-modal-window" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header Bar */}
            <header className="lightbox-modal-header">
              {/* Segmented Tab Pill */}
              <div className="lightbox-tab-switcher">
                <button
                  type="button"
                  className={`lightbox-tab-btn ${modalTab === "photos" ? "active" : ""}`}
                  onClick={() => setModalTab("photos")}
                >
                  Photos
                </button>
                <button
                  type="button"
                  className={`lightbox-tab-btn ${modalTab === "map" ? "active" : ""}`}
                  onClick={() => setModalTab("map")}
                >
                  Map
                </button>
              </div>

              {/* Right Action Icons */}
              <div className="lightbox-header-actions">
                <button
                  type="button"
                  className="lightbox-circle-btn"
                  onClick={handleShare}
                  aria-label="Share property link"
                  title="Share property"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="18" cy="5" r="3"></circle>
                    <circle cx="6" cy="12" r="3"></circle>
                    <circle cx="18" cy="19" r="3"></circle>
                    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                  </svg>
                </button>
                <button
                  type="button"
                  className="lightbox-circle-btn close-btn"
                  onClick={() => setIsModalOpen(false)}
                  aria-label="Close modal"
                >
                  ✕
                </button>
              </div>
            </header>

            {/* Modal Body */}
            <div className="lightbox-modal-content">
              {modalTab === "photos" ? (
                <div className="lightbox-carousel-container">
                  <button
                    type="button"
                    className="carousel-arrow-btn prev"
                    onClick={() => {
                      resetAutoPlay();
                      prevPhoto();
                    }}
                    aria-label="Previous photo"
                  >
                    ‹
                  </button>
                  <div className="carousel-image-stage">
                    <img
                      src={allImages[activePhotoIndex]}
                      alt={`${property.name} slide ${activePhotoIndex + 1}`}
                      className="carousel-main-img"
                    />
                  </div>
                  <button
                    type="button"
                    className="carousel-arrow-btn next"
                    onClick={() => {
                      resetAutoPlay();
                      nextPhoto();
                    }}
                    aria-label="Next photo"
                  >
                    ›
                  </button>
                  <div className="carousel-counter-badge">
                    <span>{activePhotoIndex + 1} / {allImages.length}</span>
                  </div>
                </div>
              ) : (
                <div className="lightbox-map-container">
                  <iframe
                    src={mapEmbedUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0, borderRadius: "12px" }}
                    allowFullScreen={false}
                    loading="lazy"
                    title={`${property.name} Location Map`}
                  />
                </div>
              )}
            </div>

            {copiedToast && (
              <div className="copied-toast-banner">
                Link copied to clipboard!
              </div>
            )}
          </div>
        </div>
      )}
      <Footer content={footerContent} />
    </div>
  );
}
