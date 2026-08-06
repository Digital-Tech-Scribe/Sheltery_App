# The Sheltery App — Comprehensive Change Request Prompt

> **Context**: This prompt describes ALL changes requested by the project manager for the Sheltery App, a React + Vite + TypeScript luxury real estate website located at `/Users/mac/Desktop/DESK/dev_folder/Dev_project/Sheltery_App`. The app currently uses GSAP for animations, has no router, and is a single-page site with sections: Header → Hero → About → Slogan → Info (Investments) → Contact → Footer.

---

## Overview of Changes Required

There are **5 major change areas**, listed in dependency order:

1. **Logo Replacement** — Swap text-based logo for the official Sheltery image logo
2. **Colour Scheme Overhaul** — Replace the dark green (`#152621`) theme with a deep wine colour (`R79 G2 B39` → `#4F0227`)
3. **Rename "Investments" → "Properties"** — All navigation, headings, content, and anchor references
4. **Properties Section Redesign** — The "Properties" nav item leads to a section with 4 category cards: Sales, Rent, Shortlet, Joint Venture. Each card links to its own dedicated listing page.
5. **First Property Listing (Hutu Exclusive)** — Populate the Sales category page with the first real property listing using provided content and media.

---

## CHANGE 1 — Logo Replacement

### What
Replace the current text-based logo (`"SHELTERY"` with kicker `"The"`) with the official Sheltery image logo.

### Logo File
- **Path**: `/Users/mac/Desktop/DESK/dev_folder/Dev_project/Sheltery_App/public/THE_SHELTERY_RED.png`
- **Description**: A red horizontal logo reading "THE SHELTERY" with a house/roof icon integrated into the "H" of "SHELTERY"

### Files to Modify

#### `src/components/Header/Header.tsx`
- Replace the text `<a href="/">{content.logo}</a>` inside `.header-logo` with an `<img>` tag pointing to `/THE_SHELTERY_RED.png` (or using `import.meta.env.BASE_URL + "THE_SHELTERY_RED.png"`)
- The image should be appropriately sized (~120–150px wide on desktop, ~90–100px on mobile) and vertically centred in the header bar
- Remove/ignore the `logoKicker` and `logoSub` text fields since the logo image already contains "THE"

#### `src/components/Header/Header.css`
- Update `.header-logo` styles:
  - Remove text-specific styling (`font-size`, `letter-spacing`, `text-transform`)
  - Add `display: flex; align-items: center;` for vertical centering
  - Set the `<img>` within `.header-logo` to `height: auto; max-height: 40rem;` (desktop) and `max-height: 28px;` (mobile)
  - Ensure the logo remains centred with `left: 50%; transform: translateX(-50%)`

#### `src/components/Footer/Footer.tsx`
- Replace `<div className="footer-logo">{content.logo}</div>` with an `<img>` tag of the same logo file
- Size it slightly smaller than the header (~100px wide)

#### `src/components/Footer/Footer.css`
- Update `.footer-logo` to accommodate the image instead of text

#### `src/components/Loader/Loader.tsx`
- Consider showing the logo image in the loader as well (centred, fading in before the key animation)

#### `src/data/content.ts`
- Update `headerContent.logo` and `footerContent.logo` to either hold the image path or mark as deprecated if the components now use the image path directly

---

## CHANGE 2 — Colour Scheme: Dark Green → Deep Wine

### What
The current colour scheme uses a dark forest green (`#152621`) as the primary dark/background colour. Replace it with a deep wine/burgundy colour.

### Exact Colour
The project manager specified: **R79 G2 B39** which converts to hex **`#4F0227`**.

### Files to Modify

#### `src/styles/variables.css`
```css
/* BEFORE */
--c4: #152621;
--g1: linear-gradient(180deg, #152621 0%, #000 99.48%);
--g2: linear-gradient(180deg, #152621 18.75%, #000 99.48%);

/* AFTER */
--c4: #4F0227;
--g1: linear-gradient(180deg, #4F0227 0%, #000 99.48%);
--g2: linear-gradient(180deg, #4F0227 18.75%, #000 99.48%);
```

#### `src/styles/reset.css`
- `html { background: var(--c4); }` — this will automatically pick up the new value, no change needed here

#### `src/App.css`
- `::selection { background-color: #8A7960; }` — Consider updating the selection colour to complement the wine palette. A suggestion: `#7A3B5E` (muted wine/mauve) or `#8B4367` (rose-tinted)

#### `src/data/content.ts`
- Update `heroContent.floatingCardCopy` — change the text `"Dark green atmospherics"` to `"Deep wine atmospherics"` (or remove the reference to the specific colour entirely)

#### General Audit
- Search all CSS and TSX files for any hardcoded `#152621` occurrences and replace with either `var(--c4)` or `#4F0227`
- Check hover states, gradients, and overlay colours that may reference the old green
- The accent colour `--c2: #DCCBB3` (gold/champagne) should remain — it pairs well with wine
- The body text colour `--c1: #F2F1ED` (off-white) should remain

---

## CHANGE 3 — Rename "Investments" → "Properties"

### What
Every occurrence of "Investments" or "Investment" in navigation, headings, button labels, and anchor IDs must change to "Properties" / "Property".

### Files to Modify

#### `src/data/content.ts`
```diff
 leftNav: [
   { label: "Home", target: "home" },
   { label: "About", target: "about" },
-  { label: "Investments", target: "investments" }
+  { label: "Properties", target: "properties" }
 ],
```
```diff
- primaryCta: "Investment Inquiry",
+ primaryCta: "Property Inquiry",
```
```diff
 nav: [
   { label: "Home", target: "home" },
   { label: "About", target: "about" },
-  { label: "Investments", target: "investments" },
+  { label: "Properties", target: "properties" },
   { label: "Team", target: "team" },
   { label: "Contact", target: "contact" }
 ],
```

#### `src/components/Hero/Hero.tsx`
```diff
- <a href="#contact" className="button banner-cta-top">Investment Inquiry</a>
+ <a href="#contact" className="button banner-cta-top">Property Inquiry</a>
```
```diff
- <a href="#contact" className="button banner-cta-mob">Investment Inquiry</a>
+ <a href="#contact" className="button banner-cta-mob">Property Inquiry</a>
```

#### `src/components/Info/Info.tsx`
```diff
- <div className="text-inner">The Sheltery Investments</div>
+ <div className="text-inner">The Sheltery Properties</div>
```
```diff
- <div className="text-inner">The Sheltery Investment Approach</div>
+ <div className="text-inner">The Sheltery Property Approach</div>
```
```diff
- <a href="#contact" className="link-flash">The Sheltery Investments</a>
+ <a href="#contact" className="link-flash">The Sheltery Properties</a>
```
```diff
- <a href="#contact" className="link-flash">The Sheltery Investments</a>
+ <a href="#contact" className="link-flash">The Sheltery Properties</a>
```

#### `src/components/Contact/Contact.tsx`
```diff
- <button className="button" type="submit">Send Investment Inquiry</button>
+ <button className="button" type="submit">Send Property Inquiry</button>
```

#### Anchor/ID References
- Any `id="investments"` or `href="#investments"` should become `id="properties"` / `href="#properties"`

---

## CHANGE 4 — Properties Section Redesign (Category Cards + Sub-Pages)

### What
The "Properties" navigation item now leads to a section on the homepage that displays **4 category cards**:
1. **Sales**
2. **Rent**
3. **Shortlet**
4. **Joint Venture**

Each card, when clicked, navigates to a **dedicated listing page** that shows all property listings under that category.

### Architecture Changes Required

#### Install React Router
```bash
npm install react-router-dom
```
Update `src/main.tsx` to wrap `<App />` in `<BrowserRouter>` (with `basename="/Sheltery_App/"` matching `vite.config.ts` base).

#### Create New Types in `src/types/index.ts`

```typescript
export type PropertyCategory = "sales" | "rent" | "shortlet" | "joint-venture";

export interface PropertyListing {
  id: string;
  slug: string;
  category: PropertyCategory;
  name: string;
  propertyType: string;       // e.g., "Residential", "Commercial", "Land"
  location: string;
  status: string;             // e.g., "Available", "Sold Out"
  title: string;              // e.g., "C of O"
  priceRange?: string;        // Display summary, e.g., "₦9.3M – ₦136M"
  currency: "NGN" | "USD" | "GBP";
  heroImage: string;
  galleryImages: string[];
  videoUrl?: string;          // YouTube embed URL
  summary: string;            // Short tagline
  description: string;        // Full HTML/rich text description
  propertyOverview: {
    propertyName: string;
    propertySize?: string;
    category: string;         // "Sale", "Rent", etc.
    deliveryDate?: string;
    constructionStatus?: string;
  };
  pricingTables: PricingTable[];
  features: string[];
  paymentPlan?: string;
  whatsappLink?: string;
}

export interface PricingTable {
  title: string;               // e.g., "Phase I Land Prices"
  status?: string;             // e.g., "SOLD OUT"
  items: { size: string; price: string }[];
  paymentPlan?: string;
}
```

#### Create New Components

1. **`src/components/Properties/Properties.tsx`** + `Properties.css`
   - A section on the homepage (replaces or sits alongside the current `Info` component)
   - Displays 4 visually rich cards in a 2×2 grid (or row on desktop)
   - Each card has:
     - A category title (Sales, Rent, Shortlet, Joint Venture)
     - A subtle background image or gradient in the wine colour scheme
     - A hover animation (scale, glow, or reveal effect)
     - A `<Link to="/properties/sales">` (etc.) using React Router
   - Give the section `id="properties"` so the nav anchor `#properties` scrolls to it
   - Maintain the existing GSAP scroll-reveal animation style (`.reveal`, `.text-wrap`, `.text-inner`)

2. **`src/pages/PropertyCategoryPage.tsx`** + `PropertyCategoryPage.css`
   - A full-page view that receives a `category` param from the URL
   - Uses React Router: `<Route path="/properties/:category" element={<PropertyCategoryPage />} />`
   - Fetches/filters listings from a data file by category
   - Displays a grid of property listing cards
   - Each property card shows: hero image, name, location, price range, status badge
   - Clicking a card goes to the individual property detail page
   - Include header and footer on this page
   - Add a "Back to Properties" link

3. **`src/pages/PropertyDetailPage.tsx`** + `PropertyDetailPage.css`
   - Individual property detail page
   - Route: `/properties/:category/:slug`
   - Layout based on the **Universal Property Template** document:
     - **Gallery section** — Image carousel/grid with hero image and gallery images
     - **Quick Highlights** — Property summary, location, price range, status
     - **Property Description** — Full rich text description
     - **Property Overview** — Table/card showing name, type, category, title, location, status, size
     - **Pricing Tables** — Tabbed or accordion sections for each pricing phase (with currency toggle NGN/USD/GBP if desired)
     - **Payment Plan** — Formatted display of deposit and instalment info
     - **Features & Amenities** — Grid of feature items with icons
     - **Video Section** — Embedded YouTube player
     - **Inquiry Section** — WhatsApp link button + contact form or link
   - Header and footer included
   - Breadcrumb: Home > Properties > Sales > Hutu Exclusive

4. **`src/data/properties.ts`** — New data file
   - Array of `PropertyListing` objects
   - Initially contains 1 listing: **Hutu Exclusive** (see Change 5 below)

#### Modify `src/App.tsx`
- Import `Routes`, `Route` from `react-router-dom`
- The homepage becomes a route (`path="/"`) that renders the current layout
- Add routes:
  - `/properties/:category` → `PropertyCategoryPage`
  - `/properties/:category/:slug` → `PropertyDetailPage`
- The `<Info />` component on the homepage should be replaced (or refactored) with the new `<Properties />` section

#### Modify `src/components/Info/Info.tsx`
- Either **remove** this component entirely and replace with `<Properties />`, or **refactor** it to become the new Properties section
- Keep the existing heading/animation structure but change content to show the 4 category cards

---

## CHANGE 5 — First Property Listing: Hutu Exclusive (Sales Category)

### What
Populate the Sales category with the first real property listing using data from:
- **Document**: `/Users/mac/Desktop/DESK/dev_folder/Dev_project/Sheltery_App/UNIVERSAL PROPERTY TEMPLATE - HUTU  EXCLUSIVE LAND & HOUSES WEBSITE INFO.docx`
- **YouTube Video**: `https://youtu.be/GSzd-O9Cj3E`
- **Google Drive Images**: `https://drive.google.com/drive/folders/1PTWwK1sFD3i3G_mj3VKD1dDC-f_r6k0c` *(images need to be downloaded and placed in `public/assets/properties/hutu-exclusive/`)*

### Property Data (from Document)

```typescript
// In src/data/properties.ts
export const properties: PropertyListing[] = [
  {
    id: "hutu-exclusive",
    slug: "hutu-exclusive",
    category: "sales",
    name: "Hutu Exclusive",
    propertyType: "Residential",
    location: "Before Centenary City, Airport Road, F.C.T Abuja",
    status: "Available",
    title: "C of O",
    priceRange: "₦9,351,562 – ₦136,080,000 (Land) | ₦65,100,470 – ₦1,103,758,650 (Residential)",
    currency: "NGN",
    heroImage: "/assets/properties/hutu-exclusive/hero.jpg",   // needs downloaded image
    galleryImages: [
      // populate with downloaded Google Drive images
    ],
    videoUrl: "https://www.youtube.com/embed/GSzd-O9Cj3E",
    summary: "Spacious plots of land (150sqm – 1000sqm) ideal for custom builds. Exquisitely designed residences from 1-Bedroom Apartments to expansive 7-Bedroom Maisonettes.",
    description: `Hutu Exclusive: An Estate designed for You to Live, Play and Relax

Invest in a Lifestyle: Mshel Hutu Exclusive, Abuja's premier Golf Resort Estate, offering an unparalleled lifestyle with world-class amenities and resort-style facilities nestled along Airport Road before Centenary City. This strategic location and robust infrastructure not only support a comfortable and luxurious lifestyle but also promise strong rental demand and sustainable, long-term wealth creation. This expansive 118.21-hectare development provides a serene escape with exceptional recreational and wellness opportunities right at your doorstep. Timeless amenities converge with modern infrastructure to create an environment of comfort, luxury, and well-being.

Picture this: A golf course right at your doorstep, tranquil artificial lakes, beautiful amusement parks, exquisite residential and commercial spaces, safety and healthcare facilities — all set beside stunning resorts and peaceful retreat spots. It feels like the cherry on top of a never ending vacation.

This estate offers a range of residential options from 1-bedroom apartments to 7-bedroom maisonettes and 150sqm to 1000sqm plots of land. Infrastructures include well-paved internal road, solar streetlights, and underground drainage and wiring, ensuring modern convenience and sustainability. With a world-class clubhouse, an amusement park, lush green landscapes, five-star hotel facilities, worship centers, and schools within the estate, every need is catered for.

Hutu Exclusive is truly the epitome of extraordinary living!`,
    propertyOverview: {
      propertyName: "Hutu Exclusive",
      propertySize: "150SQM – 1000SQM",
      category: "Sale",
      deliveryDate: "18 months / 24 months plan",
      constructionStatus: "In progress",
    },
    pricingTables: [
      {
        title: "Residential Plots – Phase I Land Prices",
        items: [
          { size: "150sqm", price: "₦20,412,000" },
          { size: "250sqm", price: "₦34,020,000" },
          { size: "350sqm", price: "₦47,628,000" },
          { size: "450sqm", price: "₦61,236,000" },
          { size: "750sqm", price: "₦102,060,000" },
          { size: "1000sqm", price: "₦136,080,000" },
        ],
        paymentPlan: "20% deposit – 4 months | 30% deposit – 8 months. Infrastructure fees payable separately.",
      },
      {
        title: "Residential Plots – Phase II",
        status: "SOLD OUT",
        items: [],
      },
      {
        title: "Residential Plots – Phase III Land Prices",
        items: [
          { size: "150sqm", price: "₦9,351,562" },
          { size: "250sqm", price: "₦15,585,937" },
          { size: "350sqm", price: "₦18,701,171" },
          { size: "450sqm", price: "₦28,050,781" },
          { size: "500sqm", price: "₦31,171,875" },
          { size: "750sqm", price: "₦46,750,000" },
          { size: "1000sqm", price: "₦62,333,984" },
        ],
        paymentPlan: "20% deposit. Balance spread over 18 months. Infrastructure fees payable separately.",
      },
      {
        title: "Residential Buildings – Phase I House Prices",
        items: [
          { size: "1 Bedroom Apartment", price: "₦65.1M" },
          { size: "2 Bedroom Apartment", price: "₦100.3M" },
          { size: "3 Bedroom Apartment", price: "₦127.7M" },
          { size: "3 Bedroom Terrace Duplex", price: "₦181.7M" },
          { size: "4 Bedroom Semi-Detached Duplex", price: "₦260.1M" },
          { size: "4 Bedroom Fully Detached Duplex", price: "₦333.658M" },
          { size: "7 Bedroom Fully Detached Duplex", price: "₦596.195M" },
          { size: "1 Bedroom Block of Apartment (6 units)", price: "₦390.602M" },
          { size: "2 Bedroom Block of Apartment (6 units)", price: "₦600.157M" },
          { size: "3 Bedroom Block of Apartment (6 units)", price: "₦766.499M" },
        ],
        paymentPlan: "20% – 30% deposit. Balance spread over 18 months.",
      },
    ],
    features: [
      "World-Class Clubhouse",
      "Well-paved Internal Road Network",
      "Tennis Court",
      "Basketball Court",
      "Underground Wiring",
      "9-Hole Golf Course",
      "Olympic-Size Swimming Pool",
      "Fitness Center",
      "Badminton Court",
      "Two Football Pitches",
      "Volleyball Court",
      "Centralized Water System",
      "Cable Cars",
      "Mountain Hiking Trails",
      "Clinic",
      "Amusement Park",
      "Science Museum",
      "Solar Streetlights",
      "Artificial Lakes",
      "Police Station",
      "Family Aqua Park",
      "Shopping Mall",
      "Church",
      "Mosque",
      "School",
      "Gas Station",
      "Grand Chess Square",
      "Flower Garden",
    ],
    paymentPlan: "20% – 30% deposit. Balance spread over 18 months.",
    whatsappLink: "https://wa.me/2348092799692?text=I%20am%20interested%20in%20Hutu%20Exclusive",
  },
];
```

### Image Assets
- **Action Required**: Download images from the Google Drive link (`https://drive.google.com/drive/folders/1PTWwK1sFD3i3G_mj3VKD1dDC-f_r6k0c`) and place them in `public/assets/properties/hutu-exclusive/`
- Name them descriptively: `hero.jpg`, `gallery-01.jpg`, `gallery-02.jpg`, `drone-01.jpg`, `floor-plan-01.jpg`, `site-plan.jpg`, `render-01.jpg`, etc.
- Update the `galleryImages` array in the data file with their paths

### YouTube Video Embed
- Convert `https://youtu.be/GSzd-O9Cj3E` to embed format: `https://www.youtube.com/embed/GSzd-O9Cj3E`
- Display in an `<iframe>` with 16:9 aspect ratio, responsive width

---

## Design & Style Guidelines

1. **Maintain the existing luxury aesthetic** — serif headings (NanumMyeongjo), body font (Jost), golden accents (`--c2: #DCCBB3`), off-white text (`--c1: #F2F1ED`)
2. **Wine colour replaces green everywhere** — backgrounds, gradients, overlays, loaders
3. **Keep all existing GSAP animations** — scroll-triggered reveals, parallax image floats, slogan text animation, loader sequence
4. **New pages (category, detail) should feel part of the same site** — use the same header, footer, typography, animation patterns
5. **Property cards** should have a premium feel — subtle shadows, hover scaling, image overlays
6. **Pricing tables** should be clean, readable, with possible tab switching between land/residential
7. **Mobile responsive** — all new pages must work at 320px minimum, breakpoint at 1023px matching existing patterns
8. **SEO** — Each property detail page needs its own `<title>` and `<meta description>`

---

## File Structure After Changes

```
src/
├── App.tsx                          (modified: add React Router)
├── App.css
├── main.tsx                         (modified: wrap in BrowserRouter)
├── components/
│   ├── Header/                      (modified: image logo)
│   ├── Hero/                        (modified: rename Investment → Property)
│   ├── About/
│   ├── Slogan/
│   ├── Properties/                  ★ NEW — homepage category cards section
│   │   ├── Properties.tsx
│   │   └── Properties.css
│   ├── Contact/                     (modified: rename Investment → Property)
│   ├── Footer/                      (modified: image logo)
│   ├── Loader/
│   └── Info/                        (removed or heavily refactored)
├── pages/                           ★ NEW directory
│   ├── PropertyCategoryPage.tsx
│   ├── PropertyCategoryPage.css
│   ├── PropertyDetailPage.tsx
│   └── PropertyDetailPage.css
├── data/
│   ├── content.ts                   (modified: rename Investments → Properties)
│   └── properties.ts               ★ NEW — property listing data
├── hooks/
├── styles/
│   ├── variables.css                (modified: wine colour)
│   ├── reset.css
│   ├── typography.css
│   └── animations.css
└── types/
    └── index.ts                     (modified: add Property types)

public/
├── THE_SHELTERY_RED.png             (already exists — use as logo)
├── assets/
│   ├── (existing assets)
│   └── properties/                  ★ NEW directory
│       └── hutu-exclusive/
│           ├── hero.jpg
│           ├── gallery-01.jpg
│           └── ...
```

---

## Execution Order

1. Install `react-router-dom`
2. Update `variables.css` (colour change)
3. Update all "Investment" → "Property" text across files
4. Modify Header/Footer for image logo
5. Add new types to `types/index.ts`
6. Create `data/properties.ts` with Hutu Exclusive data
7. Create `Properties` homepage section component
8. Create `PropertyCategoryPage` page
9. Create `PropertyDetailPage` page (using the Universal Property Template layout)
10. Set up routing in `main.tsx` and `App.tsx`
11. Remove/refactor old `Info` component
12. Download and place property images from Google Drive
13. Test all routes, responsive layouts, and animations
14. Build and verify

---

> [!IMPORTANT]
> **Images from Google Drive**: The property images need to be manually downloaded from `https://drive.google.com/drive/folders/1PTWwK1sFD3i3G_mj3VKD1dDC-f_r6k0c` and placed into `public/assets/properties/hutu-exclusive/`. Until this is done, use placeholder paths in the data file and note them for the developer to fill in. If image generation is available, generate placeholder property images to use in the interim.

> [!NOTE]
> **Rent, Shortlet, and Joint Venture categories** will initially have no listings. The category pages should gracefully handle empty states with a message like "Listings coming soon" and maintain the premium design aesthetic.
