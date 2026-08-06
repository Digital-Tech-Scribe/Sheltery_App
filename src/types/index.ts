export interface NavItem {
  label: string;
  target?: string;
  href?: string;
  external?: boolean;
}

export interface HeaderContent {
  logo: string;
  logoKicker?: string;
  logoSub?: string;
  phoneLabel: string;
  phoneHref: string;
  leftNav: NavItem[];
  rightNav: NavItem[];
}

export interface HeroContent {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  primaryCta?: string;
  secondaryCta?: string;
  backgroundImage?: string;
  slides?: string[];
  highlights?: string[];
  floatingCardTitle?: string;
  floatingCardCopy?: string;
  quoteAttribution?: string;
  body?: string;
  secondaryImage?: string;
}

export interface AboutContent {
  eyebrow: string;
  title: string;
  paragraphs: string[];
  ctaLabel: string;
  image: string;
  metrics: Array<{
    value: string;
    label: string;
  }>;
}

export interface ContactContent {
  eyebrow: string;
  title: string;
  copy: string;
  submitLabel: string;
  helperText: string;
  email: string;
  phone: string;
  phoneHref: string;
  location: string;
}

export interface SocialLink {
  label: string;
  href: string;
}

export interface FooterContent {
  logo: string;
  nav: NavItem[];
  socials: SocialLink[];
  location: string;
  phoneLabel: string;
  phoneHref: string;
  email: string;
  channelHref: string;
}

export type PropertyCategory = "sales" | "rent" | "shortlet" | "joint-venture";

export interface PricingTable {
  title: string;
  status?: string;
  items: { size: string; price: string }[];
  paymentPlan?: string;
}

export interface PropertyListing {
  id: string;
  slug: string;
  category: PropertyCategory;
  name: string;
  propertyType: string;
  location: string;
  status: string;
  title: string;
  priceRange?: string;
  currency: "NGN" | "USD" | "GBP";
  heroImage: string;
  galleryImages: string[];
  videoUrl?: string;
  summary: string;
  description: string;
  propertyOverview: {
    propertyName: string;
    propertySize?: string;
    category: string;
    deliveryDate?: string;
    constructionStatus?: string;
  };
  pricingTables: PricingTable[];
  features: string[];
  paymentPlan?: string;
  whatsappLink?: string;
}
