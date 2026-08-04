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

## Exact Change Contract

### Brand and colour

- `Header` and `Footer` use `/THE_SHELTERY_RED.png` rather than text content. The centred header logo remains horizontally centred at `left: 50%` and `translateX(-50%)`; it is roughly 120–150px wide on desktop and 90–100px on mobile, with a 40px maximum desktop height and 28px maximum mobile height. The footer logo is roughly 100px wide.
- `Loader` uses the same logo as part of its existing entrance sequence.
- Update `--c4`, `--g1`, and `--g2` from `#152621` to `#4F0227`; replace every remaining hard-coded old-green occurrence in CSS and TSX. Preserve `--c1` and `--c2`. Update the selection colour to `#7A3B5E`.
- Update content records to remove the text-logo kicker/subtitle reliance and change “Dark green atmospherics” to “Deep wine atmospherics”.

### Vocabulary and navigation

- Replace every visitor-facing and anchor reference to Investments/Investment with Properties/Property, including header and footer navigation, `#properties`, hero CTAs, Info-derived content, and the contact submit label.
- Header and footer links must navigate correctly from routed pages as well as the homepage. Homepage section links resolve to the home route plus hash when necessary; property-page links use router navigation.

### Required source files

- Create `src/components/Properties/Properties.tsx` and `Properties.css` for the homepage category grid, using React Router `Link` controls and the established `reveal`, `text-wrap`, and `text-inner` animation hooks.
- Create `src/pages/PropertyCategoryPage.tsx`, `PropertyCategoryPage.css`, `PropertyDetailPage.tsx`, and `PropertyDetailPage.css`.
- Create `src/data/properties.ts`; update `src/types/index.ts`, `src/main.tsx`, `src/App.tsx`, existing Header/Footer/Loader/Hero/Contact/content/style files, and remove `Info` from the homepage composition.
- `PropertyCategory` is exactly `sales | rent | shortlet | joint-venture`. `PropertyListing` includes identifier, slug, category, name, property type, location, status, title, optional price range, currency, hero and gallery images, optional embed URL, summary, description, property overview, pricing tables, features, optional payment plan, and optional WhatsApp link. `PricingTable` contains title, optional status, size/price rows, and optional payment plan.

## Architecture

`BrowserRouter` wraps the app using the Vite deployment base. `App` owns route selection:

- `/` renders the existing loader, header, hero, About, Slogan, Properties, Contact, and Footer sequence.
- `/properties/:category` renders `PropertyCategoryPage` with the global header and footer.
- `/properties/:category/:slug` renders `PropertyDetailPage` with the global header and footer.

Property data lives in `src/data/properties.ts` and conforms to new `PropertyCategory`, `PropertyListing`, and `PricingTable` types. Pages filter and resolve this source by URL parameters; no listing content is duplicated in components. Unknown categories or slugs receive a clear, styled not-found state.

`main.tsx` wraps the app in `BrowserRouter` with the Vite base (`/Sheltery_App/`). `App.tsx` registers the three required routes. The app continues to register GSAP/ScrollTrigger and refresh scroll triggers after the loader completes; page-specific animation setup is cleaned up on unmount.

## Experience Design

The wine palette carries through the new pages. The homepage category grid is a calm, editorial 2 by 2 field rather than a dashboard: each card is a direct path to one property intent, with an image/gradient layer, a category label, count/status detail, and a restrained reveal on hover. It becomes a one-column stack on small screens.

The Hutu Exclusive detail page leads with its strongest estate imagery and concise property facts. Its reading order follows a buyer's decision process: visual orientation, summary and availability, description, overview, phase pricing, payment plan, amenities, film, then a clear WhatsApp/contact action. Pricing phases remain individually legible rather than forcing conversion calculations.

Existing typography, gold accents, image floats, scroll reveals, and the 1023px responsive threshold are retained. New interactions honour keyboard focus and `prefers-reduced-motion`.

All new layouts must remain usable from 320px upward. Category cards use premium image overlays, subtle shadows, and a restrained scale/reveal rather than decorative animation. The category page card displays image, name, location, price range, and status, links to its detail route, and includes a “Back to Properties” action.

## Asset and Content Handling

The accessible Drive folder contains seven plot-size folders plus Facilities and Site Pictures. Downloaded images will be named consistently by source grouping and selected for the hero and gallery. `properties.ts` references only local public paths. The supplied YouTube video appears as a responsive embed. The detail route updates document title and meta description from listing data.

The initial `properties` array contains exactly one `sales` listing, Hutu Exclusive, from the supplied Word document: its published description, Abuja location, C of O title, availability, 150sqm–1000sqm size range, supplied NGN price range, 18/24-month delivery plan, in-progress construction status, 28 listed amenities, supplied WhatsApp inquiry URL, and `https://www.youtube.com/embed/GSzd-O9Cj3E`. Its pricing section contains all four supplied phases: Phase I land prices, sold-out Phase II, Phase III land prices, and Phase I house prices, retaining their supplied deposits, instalment timing, infrastructure-fee notes, sizes, and prices.

The Hutu detail view includes all specified decision-making sections: breadcrumb (`Home > Properties > Sales > Hutu Exclusive`), gallery, quick highlights, description, overview, pricing tables, payment plan, amenities, video, and inquiry. Pricing groups may use an accessible accordion or tabs; no currency conversion is implied.

## Failure and Empty States

- Rent, Shortlet, and Joint Venture show a purposeful “Listings coming soon” category state and a link back to the Properties section.
- Invalid category/slug routes explain that the listing could not be found and give visitors clear navigation choices.
- Missing optional gallery/video data does not prevent a listing page from rendering.

## Verification

- Type-check and production-build the application.
- Run the site locally and verify desktop/mobile homepage navigation, category routes, Hutu Exclusive gallery/detail content, back links, and empty category states.
- Confirm the asset paths resolve in the Vite base deployment.
- Inspect the key routes visually at desktop, 1023px, and 320px for responsive overflow, contrast, logo scale, focus visibility, and unintended animation regressions.
- Confirm title and meta-description updates for the Hutu route, local Drive assets render, and the direct YouTube embed is responsive.
