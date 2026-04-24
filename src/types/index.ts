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

export interface VisionContent {
  eyebrow: string;
  statement: string;
}

export interface StatItem {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  description: string;
}

export interface StatsContent {
  eyebrow: string;
  title: string;
  copy: string;
  items: StatItem[];
}

export interface ValueItem {
  title: string;
  description: string;
}

export interface ValuesContent {
  eyebrow: string;
  title: string;
  copy: string;
  items: ValueItem[];
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
}

export interface StoriesContent {
  eyebrow: string;
  title: string;
  paragraphs: string[];
  ctaLabel: string;
  ctaHref: string;
  videoEmbedUrl: string;
  videoTitle: string;
  posterImage: string;
  testimonials: Testimonial[];
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
