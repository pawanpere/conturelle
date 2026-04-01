export interface Product {
  slug: string;
  name: string;
  subtitle: string;
  price: number;
  originalPrice?: number;
  badge?: "bestseller" | "new" | "sale";
  rating: number;
  reviewCount: number;
  colors: { name: string; hex: string }[];
  bandSizes: number[];
  cupSizes: string[];
  category: string;
  material: string;
  description: string;
  details: string[];
  images: string[];
  pcClass: string;
}

export const products: Product[] = [
  {
    slug: "silhouette-spacer-bra",
    name: "Silhouette Spacer Bra",
    subtitle: "Spacer Foam \u00b7 Microfiber",
    price: 89,
    badge: "bestseller",
    rating: 4.8,
    reviewCount: 124,
    colors: [
      { name: "Champagne", hex: "#D4BFB0" },
      { name: "Black", hex: "#1a0f0d" },
      { name: "Rose", hex: "#c9a89a" },
    ],
    bandSizes: [70, 75, 80, 85, 90, 95],
    cupSizes: ["B", "C", "D", "E", "F"],
    category: "Spacer Bras",
    material: "Premium spacer foam with breathable microfiber",
    description:
      "Our bestselling spacer bra delivers an invisible silhouette under any outfit. The breathable spacer cups adapt to your body temperature while providing a natural, rounded shape. Assembled from 80 individual pieces by skilled European artisans.",
    details: [
      "Breathable spacer foam cups",
      "Adjustable straps with cushioned edges",
      "3-column, 2-row hook-and-eye closure",
      "OEKO-TEX\u00ae Standard 100 certified",
      "Made in Europe",
    ],
    images: [
      "https://conturelle.com/wp-content/uploads/2016/09/206210_531_F.jpg",
      "https://conturelle.com/wp-content/uploads/2016/09/206210_213210_528_7293-1024x683.jpg",
      "https://conturelle.com/wp-content/uploads/2016/09/Rhapsody_1_249_NudeHintergrund-1024x768.jpg",
    ],
    pcClass: "pc1",
  },
  {
    slug: "provence-lace-bra",
    name: "Provence Lace Bra",
    subtitle: "Embroidered Lace \u00b7 Tulle",
    price: 79,
    badge: "new",
    rating: 4.7,
    reviewCount: 89,
    colors: [
      { name: "Porcelain Rose", hex: "#d4a8a0" },
      { name: "Black", hex: "#1a0f0d" },
      { name: "Vanilla", hex: "#F3E5D0" },
    ],
    bandSizes: [70, 75, 80, 85, 90, 95, 100],
    cupSizes: ["B", "C", "D", "E", "F", "G"],
    category: "Lace Bras",
    material: "Expressive embroidery with soft tulle lining",
    description:
      "Bestseller Provence: expressive embroidery meets perfect fit. The modern lace design shows your curves at their best while the soft tulle lining ensures all-day comfort. A perfect balance of beauty and support.",
    details: [
      "Expressive floral embroidery",
      "Soft tulle lining for comfort",
      "Underwired for optimal support",
      "Available up to G cup",
      "Made in Europe since 1885",
    ],
    images: [
      "https://conturelle.com/wp-content/uploads/2019/07/80505_004_F-e1637667019877.jpg",
      "https://conturelle.com/wp-content/uploads/2016/03/80505_81305_545_2711-1024x683.jpg",
      "https://conturelle.com/wp-content/uploads/2021/08/80505_81005_528_3354-1024x768.jpg",
    ],
    pcClass: "pc2",
  },
  {
    slug: "essential-tshirt-bra",
    name: "Essential T-Shirt Bra",
    subtitle: "Molded Cups \u00b7 Smooth Finish",
    price: 69,
    rating: 4.9,
    reviewCount: 203,
    colors: [
      { name: "Light Taupe", hex: "#C4A882" },
      { name: "Black", hex: "#1a0f0d" },
    ],
    bandSizes: [70, 75, 80, 85, 90, 95],
    cupSizes: ["B", "C", "D", "E", "F"],
    category: "T-Shirt Bras",
    material: "Seamless molded microfiber cups",
    description:
      "The everyday essential you'll reach for again and again. Seamless molded cups create a smooth silhouette under any top, while the premium microfiber feels like a second skin. Vision Deluxe offers the finest quality for invisible wear.",
    details: [
      "Seamless molded cups \u2014 invisible under clothing",
      "Refined leaf embroidery detail",
      "Premium microfiber \u2014 second-skin feel",
      "Convertible straps",
      "OEKO-TEX\u00ae certified",
    ],
    images: [
      "https://conturelle.com/wp-content/uploads/2023/10/202289_721_F1.jpg",
      "https://conturelle.com/wp-content/uploads/2023/10/206289_213289_721_30955.jpg",
      "https://conturelle.com/wp-content/uploads/2023/10/202289_213289_528_20264.jpg",
    ],
    pcClass: "pc3",
  },
  {
    slug: "jardin-lace-set",
    name: "Jardin Lace Set",
    subtitle: "Bra + Brief \u00b7 Matching Set",
    price: 129,
    originalPrice: 148,
    badge: "sale",
    rating: 4.6,
    reviewCount: 67,
    colors: [
      { name: "Milkshake", hex: "#F0D5CC" },
      { name: "Black", hex: "#1a0f0d" },
    ],
    bandSizes: [70, 75, 80, 85, 90, 95],
    cupSizes: ["B", "C", "D", "E", "F", "G"],
    category: "Complete Sets",
    material: "Delicate floral lace with stretch tulle",
    description:
      "The Blossom collection inspires sun-kissed days with fresh bloomy prints and delicate lace details. This complete set pairs our bestselling bralette with a matching boy short for a coordinated, luxurious look.",
    details: [
      "Bralette + boy short set",
      "Delicate bloomy print design",
      "Stretch lace for flexible fit",
      "Save 15% vs. buying separately",
      "Gift-ready packaging available",
    ],
    images: [
      "https://conturelle.com/wp-content/uploads/2025/07/805837_732_F.jpg",
      "https://conturelle.com/wp-content/uploads/2025/07/803837_814837_732_2526-683x1024.jpg",
      "https://conturelle.com/wp-content/uploads/2025/07/803837_732_F.jpg",
    ],
    pcClass: "pc4",
  },
  {
    slug: "daily-comfort-brief",
    name: "Daily Comfort Brief",
    subtitle: "Microfiber \u00b7 Seamless",
    price: 39,
    rating: 4.7,
    reviewCount: 156,
    colors: [
      { name: "Sand", hex: "#C4A882" },
      { name: "Black", hex: "#1a0f0d" },
      { name: "White", hex: "#F5F0E8" },
    ],
    bandSizes: [],
    cupSizes: [],
    category: "Briefs",
    material: "Ultra-soft microfiber with cotton-lined gusset",
    description:
      "Soft Touch stands for highly effective shaping properties. This brief contours an even and firm body shape while offering exceptional comfort. The seamless edges ensure invisible wear under any clothing.",
    details: [
      "Seamless bonded edges",
      "Cotton-lined gusset",
      "Shaping properties for smooth silhouette",
      "Stays in place all day",
      "Machine washable",
    ],
    images: [
      "https://conturelle.com/wp-content/uploads/2019/01/88322_004_F.jpg",
      "https://conturelle.com/wp-content/uploads/2021/08/80622_88022_004_26540-1024x768.jpg",
      "https://conturelle.com/wp-content/uploads/2021/08/80622_88222_034_28902-1024x768.jpg",
    ],
    pcClass: "pc5",
  },
  {
    slug: "luxe-full-cup-bra",
    name: "Luxe Full Cup Bra",
    subtitle: "Full Cup \u00b7 Maximum Support",
    price: 95,
    rating: 4.8,
    reviewCount: 91,
    colors: [
      { name: "Deep Grey", hex: "#4a4a4a" },
      { name: "Porcelain Rose", hex: "#d4a8a0" },
      { name: "Black", hex: "#1a0f0d" },
    ],
    bandSizes: [75, 80, 85, 90, 95, 100],
    cupSizes: ["C", "D", "E", "F", "G", "H"],
    category: "Full Cup Bras",
    material: "Embroidered microfiber with reinforced side panels",
    description:
      "Rhapsody stands for pure harmony with subtle contrasting embroidery and richly decorated straps. This full cup bra offers maximum support and coverage with our signature European craftsmanship. Available up to H cup.",
    details: [
      "Full cup design for maximum coverage",
      "Reinforced side panels for support",
      "Richly decorated adjustable straps",
      "3-piece cup construction",
      "Available up to H cup",
    ],
    images: [
      "https://conturelle.com/wp-content/uploads/2016/09/205210_531_F.jpg",
      "https://conturelle.com/wp-content/uploads/2016/09/206210_213210_528_7293-1024x683.jpg",
      "https://conturelle.com/wp-content/uploads/2016/09/Rhapsody_1_249_NudeHintergrund-1024x768.jpg",
    ],
    pcClass: "pc6",
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}
