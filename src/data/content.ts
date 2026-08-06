import type {
  AboutContent,
  ContactContent,
  FooterContent,
  HeaderContent,
  HeroContent
} from "../types";

export const headerContent: HeaderContent = {
  logo: "SHELTERY",
  logoKicker: "The",
  logoSub: "Lagos, Nigeria",
  phoneLabel: "+234 809 279 9692",
  phoneHref: "tel:+2348092799692",
  leftNav: [
    { label: "Home", target: "home" },
    { label: "About", target: "about" },
    { label: "Properties", target: "properties" }
  ],
  rightNav: [
    { label: "Team", target: "team" },
    { label: "Contact", target: "contact" }
  ]
};

export const heroContent: HeroContent = {
  title: "The Sheltery\nExpert Approach",
  subtitle:
    "Unlock the true potential of your\nLagos real estate investment",
  primaryCta: "Property Inquiry",
  secondaryCta: "Explore Our Story",
  backgroundImage: import.meta.env.BASE_URL + "assets/hero-lagos.jpg",
  slides: [
    import.meta.env.BASE_URL + "assets/hero-lagos.jpg",
    import.meta.env.BASE_URL + "assets/luxury-walkway.jpg",
    import.meta.env.BASE_URL + "assets/founder-portrait.jpg"
  ],
  highlights: [
    "Trusted advisory for local and diaspora buyers",
    "Curated listings, launches, and investment guidance",
    "A relationship-led approach built on clarity and follow-through"
  ],
  floatingCardTitle: "A TREF-inspired luxury presence",
  floatingCardCopy:
    "Deep wine atmospherics, refined serif type, cinematic imagery, and elegant motion reframe The Sheltery in a sharper premium lane."
};


export const aboutContent: AboutContent = {
  eyebrow: "About Us",
  title: "The Sheltery brings trust, taste, and strategy to every property decision.",
  paragraphs: [
    "Founded by Azzizzat Oduwole, The Sheltery grew from a simple instinct to help people move property with confidence into a fast-rising Lagos real estate brand known for responsiveness, clarity, and follow-through.",
    "The brand serves buyers, investors, and families who want more than listings. They want context, honest guidance, and a partner who understands the emotional and financial weight behind every move.",
    "Today, The Sheltery combines market knowledge, negotiation skill, and a highly personal client experience to make complex transactions feel measured, seamless, and secure."
  ],
  ctaLabel: "Learn More",
  image: import.meta.env.BASE_URL + "assets/founder-portrait.jpg",
  metrics: [
    { value: "5+", label: "Years of momentum" },
    { value: "5K+", label: "Realtors trained and reached" },
    { value: "Lagos", label: "Market rooted, globally minded" }
  ]
};


export const contactContent: ContactContent = {
  eyebrow: "Get In Touch",
  title: "Tell us what you're looking for and we'll shape the next step with you.",
  copy:
    "Whether you're buying, investing, relocating, or just looking for informed direction, The Sheltery responds with practical guidance and a tailored plan.",
  submitLabel: "Send Inquiry",
  helperText:
    "The form opens your email client with the inquiry prefilled so you can send immediately.",
  email: "hello@azzizzat.com",
  phone: "+234 809 279 9692",
  phoneHref: "tel:+2348092799692",
  location: "Lekki Peninsula II, Lagos, Nigeria"
};

export const footerContent: FooterContent = {
  logo: "THE SHELTERY",
  nav: [
    { label: "Home", target: "home" },
    { label: "About", target: "about" },
    { label: "Properties", target: "properties" },
    { label: "Team", target: "team" },
    { label: "Contact", target: "contact" }
  ],
  socials: [
    {
      label: "Instagram",
      href: "https://www.instagram.com/azzizzat/"
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/azzizzat-oluwafunke-oduwole-429bb7156/"
    },
    {
      label: "YouTube",
      href: "https://www.youtube.com/@TheSheltery"
    }
  ],
  location: "Lekki Peninsula II, Lagos, Nigeria",
  phoneLabel: "+234 809 279 9692",
  phoneHref: "tel:+2348092799692",
  email: "hello@azzizzat.com",
  channelHref: "https://www.youtube.com/@TheSheltery"
};
