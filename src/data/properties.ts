import type { PropertyListing } from "../types";

const propertyAsset = (file: string) =>
  `${import.meta.env.BASE_URL}assets/properties/hutu-exclusive/${file}`;

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
    priceRange:
      "₦9,351,562.5 – ₦136,080,000 (Land) | ₦65,100,470 – ₦1,103,758,650 (Residential)",
    currency: "NGN",
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
    videoUrl: "https://www.youtube.com/embed/GSzd-O9Cj3E",
    summary:
      "Spacious plots of land (150sqm – 1000sqm) ideal for custom builds. Exquisitely designed residences from 1-Bedroom Apartments to expansive 7-Bedroom Maisonettes.",
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
        paymentPlan:
          "20% deposit – 4 months | 30% deposit – 8 months. Infrastructure fees payable separately.",
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
        paymentPlan:
          "20% deposit. Balance spread over 18 months. Infrastructure fees payable separately.",
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
    whatsappLink:
      "https://wa.me/2348092799692?text=I%20am%20interested%20in%20Hutu%20Exclusive",
  },
];
