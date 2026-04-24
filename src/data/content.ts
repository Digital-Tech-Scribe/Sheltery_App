import type {
  AboutContent,
  ContactContent,
  FooterContent,
  HeaderContent,
  HeroContent,
  StatsContent,
  StoriesContent,
  ValuesContent,
  VisionContent
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
    { label: "Investments", target: "join" }
  ],
  rightNav: [
    { label: "Team", target: "stories" },
    { label: "Contact", target: "contact" }
  ]
};

export const heroContent: HeroContent = {
  title: "The Sheltery\nExpert Approach",
  subtitle:
    "Unlock the true potential of your\nLagos real estate investment",
  primaryCta: "Investment Inquiry",
  secondaryCta: "Explore Our Story",
  backgroundImage: "/assets/hero-lagos.jpg",
  highlights: [
    "Trusted advisory for local and diaspora buyers",
    "Curated listings, launches, and investment guidance",
    "A relationship-led approach built on clarity and follow-through"
  ],
  floatingCardTitle: "A TREF-inspired luxury presence",
  floatingCardCopy:
    "Dark green atmospherics, refined serif type, cinematic imagery, and elegant motion reframe The Sheltery in a sharper premium lane."
};

export const heroQuoteContent: HeroContent = {
  eyebrow: "Our Philosophy",
  title: "We don't just close deals. We curate confident moves.",
  subtitle: "",
  primaryCta: "",
  secondaryCta: "",
  backgroundImage: "/assets/hero-lagos.jpg",
  highlights: [],
  floatingCardTitle: "",
  floatingCardCopy: "",
  quoteAttribution: "— Azzizzat Oduwole, Founder"
};

export const heroInvestmentContent: HeroContent = {
  eyebrow: "Investment Approach",
  title: "Strategic property decisions backed by market insight.",
  body: "Our investment advisory helps you identify high-potential opportunities across Lagos-prime locations, with due diligence, rental yield projections, and exit strategy planning.",
  primaryCta: "Explore Our Story",
  secondaryCta: "",
  backgroundImage: "/assets/hero-lagos.jpg",
  highlights: [],
  floatingCardTitle: "",
  floatingCardCopy: "",
  secondaryImage: "/assets/investment-property.jpg"
};

export const heroJoinContent: HeroContent = {
  eyebrow: "Join The Club",
  title: "Get exclusive access to premium listings and market insights.",
  subtitle: "Join our community of discerning property buyers and investors.",
  highlights: [
    heroInvestmentContent.title,
    heroInvestmentContent.body ?? ""
  ],
  body: "We don't just close deals. We curate confident moves.",
  quoteAttribution: "— Azzizzat Oduwole, Founder",
  primaryCta: "Join Now",
  secondaryCta: "",
  backgroundImage: "/assets/hero-lagos.jpg",
  floatingCardTitle: "",
  floatingCardCopy: ""
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
  image: "/assets/founder-portrait.jpg",
  metrics: [
    { value: "5+", label: "Years of momentum" },
    { value: "5K+", label: "Realtors trained and reached" },
    { value: "Lagos", label: "Market rooted, globally minded" }
  ]
};

export const visionContent: VisionContent = {
  eyebrow: "Vision",
  statement:
    "To revolutionise the\nreal estate landscape\nand become the\nheartbeat of trust,\ndependability, and\ncompetence."
};

export const statsContent: StatsContent = {
  eyebrow: "Growth in Review",
  title: "Measured momentum with people at the center.",
  copy:
    "These headline figures translate The Sheltery's reach into the language of confidence, consistency, and meaningful client outcomes.",
  items: [
    {
      value: 500,
      suffix: "+",
      label: "Units Sold",
      description: "Curated residential opportunities closed with care and speed."
    },
    {
      value: 400,
      suffix: "+",
      label: "Clients Served",
      description: "Relationships built across Lagos, Nigeria, and the diaspora."
    },
    {
      value: 10,
      prefix: "₦",
      suffix: "B+",
      label: "Value Transacted",
      description: "Property volume moved through trusted advisory and negotiation."
    }
  ]
};

export const valuesContent: ValuesContent = {
  eyebrow: "What Makes Us Tick",
  title: "A service culture shaped by excellence, empathy, innovation, and integrity.",
  copy:
    "The Sheltery's differentiator is not just access to inventory. It is the way people are guided, informed, and protected from first contact to final keys.",
  items: [
    {
      title: "Excellence",
      description:
        "Every presentation, follow-up, inspection, and negotiation is handled with polish and precision."
    },
    {
      title: "Empathy",
      description:
        "Property decisions are emotional decisions. We make room for clarity, patience, and genuine listening."
    },
    {
      title: "Innovation",
      description:
        "From digital prospecting to smarter market positioning, we move with modern buyer behavior."
    },
    {
      title: "Integrity",
      description:
        "No deal is worth the brand's reputation. Transparency and accountability stay non-negotiable."
    }
  ]
};

export const storiesContent: StoriesContent = {
  eyebrow: "Success Stories",
  title: "A founder-led brand with a voice clients remember.",
  paragraphs: [
    "Sheltery's story is tied closely to Azzizzat's rise as a visible, trusted Lagos real estate voice. The brand pairs on-ground expertise with education, media visibility, and practical support that keeps clients informed instead of overwhelmed.",
    "That same energy carries into the channel and community around the business, where real estate insight, mentorship, and lived market experience reinforce the brand beyond transactions alone."
  ],
  ctaLabel: "Watch Our Channel",
  ctaHref: "https://www.youtube.com/@TheSheltery",
  videoEmbedUrl:
    "https://www.youtube.com/embed/gpZxniPDy4w?rel=0&modestbranding=1&playsinline=1",
  videoTitle:
    "Lekki Atlantic City: answering client questions and protecting their interests with the developer",
  posterImage: "/assets/luxury-walkway.jpg",
  testimonials: [
    {
      quote:
        "Sheltery made the process feel secure from consultation to close, with updates that built real confidence at every step.",
      author: "Chinaza Okafor",
      role: "Client"
    },
    {
      quote:
        "Azzizzat combines professionalism, detail, and follow-through in a way that stands out immediately once the process starts moving.",
      author: "Mr Yinka Olotu",
      role: "Client"
    },
    {
      quote:
        "The brand's market insight and clarity make complex real estate questions feel practical, grounded, and easy to act on.",
      author: "Eugenia Nwanyanwuji",
      role: "Realtor"
    }
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
    { label: "Vision", target: "vision" },
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
