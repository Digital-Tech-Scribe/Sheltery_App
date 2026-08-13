# MASTER TASK SPECIFICATION & PROMPT: INTERACTIVE PROPERTY GALLERY REDESIGN

> **Instructions for AI Agent**: You are acting as a senior principal front-end engineer working on **The Sheltery** real estate web application (`Digital-Tech-Scribe/Sheltery_App`). Your goal is to execute the complete interactive property detail gallery redesign based on the client's video feedback (`WhatsApp Video 2026-08-10 at 07.38.26.mp4`). Follow this specification strictly and implement all code modifications, data structures, and styling rules detailed below.

---

## 0. Sub-Agent Work Splitting & Skill Directives

To execute this task with maximum efficiency, decompose the implementation across specialized roles:

- **Sub-Agent 1: Data Architect (`src/data/properties.ts`)**: Responsible for mapping all 7 property images into the dataset with clean import paths and array deduplication.
- **Sub-Agent 2: Component Engineer (`src/pages/PropertyDetailPage.tsx`)**: Responsible for state management (`isGalleryExpanded`), preview grid layout (1 main + 2 thumbnails), overlay badge (`+N photos`), and smooth scroll collapse toggle.
- **Sub-Agent 3: CSS Styling Specialist (`src/pages/PropertyDetailPage.css`)**: Responsible for CSS grid rules, backdrop-filter blur overlays, deep wine hover transitions, and mobile/tablet responsive breakpoints.
- **Sub-Agent 4: QA & Build Engineer**: Responsible for executing `npm run build` (`tsc --noEmit && vite build`), testing responsive viewports, and committing/pushing cleanly to git.

---

## 1. Project Background & Objective

### Client Request & Video Breakdown (`WhatsApp Video 2026-08-10 at 07.38.26.mp4`)
The client reviewed the live property page (`/properties/sales/hutu-exclusive`) and highlighted that:
1. The property detail page previously displayed 4 static images where the 4th image (amusement park render) was stretched vertically out of proportion.
2. The asset folder contains 7+ photos that must all be included in the property listing dataset.
3. The gallery must be upgraded to match the reference listing site (`cornerstone-dev.6787878.com/listing-details/1861`) shown in the recording:
   - **Preview Grid State**: 1 large featured photo on the left + 2 stacked thumbnail photos on the right (`1.6fr : 1fr` ratio).
   - **`+N photos` Badge Overlay**: The bottom-right preview slot must show a semi-transparent dark overlay displaying **`+5 photos`** (or the remaining image count `N`).
   - **Expandable Grid State**: Clicking `+N photos` or any image expands the view into a full 3-column gallery grid displaying all property photos.
   - **`Collapse gallery` Toggle**: At the bottom of the expanded gallery, a stylized button with an up-arrow icon allows users to smoothly collapse back to the preview layout and auto-scroll to the top of the gallery (`scrollIntoView({ behavior: "smooth" })`).

---

## 2. Technical Architecture & File Changes

### File 1: Data Model (`src/data/properties.ts`)

Ensure the `Hutu Exclusive` entry in `properties` has all 7 downloaded property images included in its `galleryImages` array:

```typescript
// src/data/properties.ts
import type { PropertyListing } from "../types";

const propertyAsset = (file: string) =>
  `${import.meta.env.BASE_URL}assets/properties/hutu-exclusive/${file}`;

export const properties: PropertyListing[] = [
  {
    id: "hutu-exclusive",
    slug: "hutu-exclusive",
    category: "sales",
    name: "Hutu Exclusive",
    // ... basic details ...
    heroImage: propertyAsset("hero.jpg"),
    galleryImages: [
      propertyAsset("gallery-01.jpg"),
      propertyAsset("gallery-02.jpg"),
      propertyAsset("gallery-03.jpg"),
      propertyAsset("floor-plan-01.jpg"),
      propertyAsset("floor-plan-02.jpg"),
      propertyAsset("facilities-01.png"),
      propertyAsset("hero.jpg"),
    ],
    // ... features & pricing ...
  }
];
```

---

### File 2: Component Implementation (`src/pages/PropertyDetailPage.tsx`)

Replace static gallery sections with an interactive, stateful gallery component:

```tsx
// src/pages/PropertyDetailPage.tsx
import { useEffect, useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { Footer } from "../components/Footer/Footer";
import { Header } from "../components/Header/Header";
import { footerContent, headerContent } from "../data/content";
import { properties } from "../data/properties";
import "./PropertyDetailPage.css";

export function PropertyDetailPage() {
  const { category, slug } = useParams();
  const [isGalleryExpanded, setIsGalleryExpanded] = useState(false);
  const galleryRef = useRef<HTMLElement>(null);
  
  const property = properties.find(
    (item) => item.category === category && item.slug === slug
  );

  useEffect(() => {
    if (!property) return;
    document.title = `${property.name} | The Sheltery`;
  }, [property]);

  if (!property) {
    return (
      <div className="detail-page">
        <Header content={headerContent} />
        <main className="detail-not-found holder">
          <h1>Property not found.</h1>
          <Link className="button" to="/#properties">View properties</Link>
        </main>
        <Footer content={footerContent} />
      </div>
    );
  }

  // Deduplicate images for unified gallery display
  const allImages = Array.from(
    new Set([property.heroImage, ...property.galleryImages])
  );
  
  // Preview configuration: 1 featured main + 2 stacked thumbnails
  const featuredImage = allImages[0];
  const secondaryImages = allImages.slice(1, 3);
  const remainingCount = Math.max(0, allImages.length - 3);

  const toggleGallery = () => {
    setIsGalleryExpanded((prev) => {
      const nextState = !prev;
      if (!nextState && galleryRef.current) {
        galleryRef.current.scrollIntoView({ behavior: "smooth" });
      }
      return nextState;
    });
  };

  return (
    <div className="detail-page">
      <Header content={headerContent} />
      <main className="detail-main">
        <div className="holder">
          {/* Breadcrumb Navigation */}
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <Link to="/">Home</Link><span>›</span>
            <Link to="/#properties">Properties</Link><span>›</span>
            <Link to={`/properties/${property.category}`}>
              {property.category === "sales" ? "Sales" : property.category}
            </Link><span>›</span>
            <span>{property.name}</span>
          </nav>

          {/* Property Hero */}
          <section className="detail-hero">
            <div className="detail-hero-copy">
              <span className="detail-eyebrow">{property.status} · {property.title}</span>
              <h1>{property.name}</h1>
              <p>{property.summary}</p>
              <a className="button" href={property.whatsappLink} target="_blank" rel="noreferrer">
                Inquire on WhatsApp
              </a>
            </div>
            <img src={property.heroImage} alt={`${property.name} hero`} />
          </section>

          {/* Interactive Property Gallery */}
          <section
            ref={galleryRef}
            className={`detail-gallery-container ${isGalleryExpanded ? "expanded" : "collapsed"}`}
            aria-label={`${property.name} gallery`}
          >
            {!isGalleryExpanded ? (
              /* Collapsed Preview Grid Layout */
              <div className="gallery-preview-grid">
                <div
                  className="gallery-featured-item"
                  onClick={toggleGallery}
                  role="button"
                  tabIndex={0}
                >
                  <img src={featuredImage} alt={`${property.name} main preview`} />
                </div>
                <div className="gallery-stacked-items">
                  {secondaryImages.map((img, idx) => {
                    const isLastSlot = idx === secondaryImages.length - 1;
                    return (
                      <div
                        key={img}
                        className="gallery-stacked-item"
                        onClick={toggleGallery}
                        role="button"
                        tabIndex={0}
                      >
                        <img src={img} alt={`${property.name} thumbnail ${idx + 2}`} />
                        {isLastSlot && remainingCount > 0 && (
                          <div className="gallery-more-overlay">
                            <span>+{remainingCount} photos</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              /* Expanded 3-Column Grid Layout */
              <div className="gallery-expanded-view">
                <div className="gallery-full-grid">
                  {allImages.map((image, index) => (
                    <div key={image} className="gallery-grid-item">
                      <img src={image} alt={`${property.name} photo ${index + 1}`} />
                    </div>
                  ))}
                </div>
                <div className="gallery-controls">
                  <button
                    className="gallery-collapse-btn"
                    onClick={toggleGallery}
                    type="button"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="18 15 12 9 6 15"></polyline>
                    </svg>
                    <span>Collapse gallery</span>
                  </button>
                </div>
              </div>
            )}
          </section>

          {/* Property Overview, Pricing, Features */}
          {/* ... standard sections ... */}
        </div>
      </main>
      <Footer content={footerContent} />
    </div>
  );
}
```

---

### File 3: Stylesheet Definitions (`src/pages/PropertyDetailPage.css`)

Apply CSS rules supporting deep wine themes, overlays, grid layouts, and hover transitions:

```css
/* src/pages/PropertyDetailPage.css */
.detail-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--c4);
}

.detail-main {
  flex: 1;
  padding: 170rem 0 140rem;
}

/* Gallery Container & Layouts */
.detail-gallery-container {
  margin: 20rem 0 100rem;
  transition: all 0.4s ease;
}

/* Collapsed Preview State */
.gallery-preview-grid {
  display: grid;
  grid-template-columns: 1.6fr 1fr;
  gap: 16rem;
  min-height: 480rem;
}

.gallery-featured-item {
  position: relative;
  overflow: hidden;
  border-radius: 4px;
  cursor: pointer;
}

.gallery-featured-item img {
  width: 100%;
  height: 100%;
  min-height: 480rem;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.gallery-featured-item:hover img {
  transform: scale(1.03);
}

.gallery-stacked-items {
  display: flex;
  flex-direction: column;
  gap: 16rem;
}

.gallery-stacked-item {
  position: relative;
  flex: 1;
  overflow: hidden;
  border-radius: 4px;
  cursor: pointer;
}

.gallery-stacked-item img {
  width: 100%;
  height: 100%;
  min-height: 232rem;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.gallery-stacked-item:hover img {
  transform: scale(1.04);
}

/* Overlay Badge for +N photos */
.gallery-more-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.65);
  backdrop-filter: blur(3px);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s ease;
}

.gallery-stacked-item:hover .gallery-more-overlay {
  background: rgba(79, 2, 39, 0.75);
}

.gallery-more-overlay span {
  color: #ffffff;
  font-family: 'NanumMyeongjo', serif;
  font-size: max(20px, 26rem);
  font-weight: 600;
  letter-spacing: 1px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
}

/* Expanded Full View State */
.gallery-expanded-view {
  animation: fadeIn 0.4s ease-out forwards;
}

.gallery-full-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16rem;
  margin-bottom: 24rem;
}

.gallery-grid-item {
  overflow: hidden;
  border-radius: 4px;
  height: 320rem;
}

.gallery-grid-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.gallery-grid-item:hover img {
  transform: scale(1.04);
}

.gallery-controls {
  display: flex;
  justify-content: flex-start;
  padding-top: 12rem;
}

.gallery-collapse-btn {
  display: inline-flex;
  align-items: center;
  gap: 10rem;
  padding: 14rem 28rem;
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(242, 241, 237, 0.3);
  border-radius: 4px;
  color: var(--c1);
  font-family: 'Montserrat', sans-serif;
  font-size: max(12px, 14rem);
  font-weight: 500;
  letter-spacing: 0.8px;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s ease;
}

.gallery-collapse-btn:hover {
  background: var(--c4);
  border-color: var(--c2);
  transform: translateY(-2px);
}

/* Responsive Rules */
@media screen and (max-width: 1023px) {
  .gallery-preview-grid {
    grid-template-columns: 1fr;
  }
  .gallery-featured-item img {
    min-height: 280px;
  }
  .gallery-stacked-items {
    flex-direction: row;
  }
  .gallery-stacked-item img {
    min-height: 160px;
  }
  .gallery-full-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media screen and (max-width: 639px) {
  .gallery-full-grid {
    grid-template-columns: 1fr;
  }
  .gallery-grid-item {
    height: 220px;
  }
}
```

---

## 3. Verification & Definition of Done

1. **Verify Build**:
   ```bash
   npm run build
   ```
   Must pass `tsc --noEmit && vite build` with 0 errors.

2. **Commit & Push**:
   ```bash
   git add src/data/properties.ts src/pages/PropertyDetailPage.tsx src/pages/PropertyDetailPage.css
   git commit -m "feat: implement interactive property gallery with +N photos overlay badge and collapse gallery toggle"
   git push origin main
   ```
