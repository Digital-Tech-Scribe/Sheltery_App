# Sheltery Properties Catalogue Design

## Purpose

Turn the existing single-page Sheltery site into a luxury property discovery experience without changing its established brand character. The homepage remains the brand and advisory story; a new Properties section routes visitors into a scalable catalogue, beginning with the Hutu Exclusive sales listing.

## Scope

- Replace the text logo with the supplied Sheltery image logo in the header, footer, and loader.
- Replace the forest-green theme with deep wine `#4F0227`, retaining champagne `#DCCBB3` and off-white `#F2F1ED`.
- Rename Investments and investment anchors/calls-to-action to Properties and property equivalents.
- Replace the homepage Info section with a four-category Properties section: Sales, Rent, Shortlet, and Joint Venture.
- Add category and property-detail routes, initially populated by Hutu Exclusive in Sales.
- Download the public Google Drive image folders into `public/assets/properties/hutu-exclusive/`; do not include the 213 MB animation because the supplied YouTube embed is the project video source.

## Architecture

`BrowserRouter` wraps the app using the Vite deployment base. `App` owns route selection:

- `/` renders the existing loader, header, hero, About, Slogan, Properties, Contact, and Footer sequence.
- `/properties/:category` renders `PropertyCategoryPage` with the global header and footer.
- `/properties/:category/:slug` renders `PropertyDetailPage` with the global header and footer.

Property data lives in `src/data/properties.ts` and conforms to new `PropertyCategory`, `PropertyListing`, and `PricingTable` types. Pages filter and resolve this source by URL parameters; no listing content is duplicated in components. Unknown categories or slugs receive a clear, styled not-found state.

## Experience Design

The wine palette carries through the new pages. The homepage category grid is a calm, editorial 2 by 2 field rather than a dashboard: each card is a direct path to one property intent, with an image/gradient layer, a category label, count/status detail, and a restrained reveal on hover. It becomes a one-column stack on small screens.

The Hutu Exclusive detail page leads with its strongest estate imagery and concise property facts. Its reading order follows a buyer's decision process: visual orientation, summary and availability, description, overview, phase pricing, payment plan, amenities, film, then a clear WhatsApp/contact action. Pricing phases remain individually legible rather than forcing conversion calculations.

Existing typography, gold accents, image floats, scroll reveals, and the 1023px responsive threshold are retained. New interactions honour keyboard focus and `prefers-reduced-motion`.

## Asset and Content Handling

The accessible Drive folder contains seven plot-size folders plus Facilities and Site Pictures. Downloaded images will be named consistently by source grouping and selected for the hero and gallery. `properties.ts` references only local public paths. The supplied YouTube video appears as a responsive embed. The detail route updates document title and meta description from listing data.

## Failure and Empty States

- Rent, Shortlet, and Joint Venture show a purposeful “Listings coming soon” category state and a link back to the Properties section.
- Invalid category/slug routes explain that the listing could not be found and give visitors clear navigation choices.
- Missing optional gallery/video data does not prevent a listing page from rendering.

## Verification

- Type-check and production-build the application.
- Run the site locally and verify desktop/mobile homepage navigation, category routes, Hutu Exclusive gallery/detail content, back links, and empty category states.
- Confirm the asset paths resolve in the Vite base deployment.
- Inspect the key routes visually for responsive overflow, contrast, and unintended animation regressions.
