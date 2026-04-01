export type CollectionKey =
  | "provence"
  | "soft-touch"
  | "pure-feeling"
  | "swing"
  | "mille-fleurs"
  | "joy"
  | "moments"
  | "melina"
  | "emotions"
  | "weftloc"
  | "pure-balance"
  | "rhapsody"
  | "divine-vision"
  | "beyond-basic"
  | "lovely-lotus"
  | "flora"
  | "elementary"
  | "secret-delight"
  | "serenada";

export type ProductType =
  | "wired-bra"
  | "wireless-bra"
  | "spacer-bra"
  | "molded-bra"
  | "minimizer-bra"
  | "body"
  | "brief"
  | "mini-brief"
  | "high-leg-brief"
  | "panty"
  | "long-panty"
  | "highwaist-panty"
  | "maxi-brief"
  | "maxi-long-pant";

export type StyleCategory =
  | "embroidery"
  | "lace"
  | "shape"
  | "daily"
  | "corsetry";

export interface ProductColor {
  name: string;
  hex: string;
  code: string;
}

export interface Product {
  slug: string;
  name: string;
  subtitle: string;
  articleNumber: string;
  collection: CollectionKey;
  collectionNumber: string;
  productType: ProductType;
  styleCategory: StyleCategory;
  price: number;
  originalPrice?: number;
  badge?: "bestseller" | "new";
  rating: number;
  reviewCount: number;
  colors: ProductColor[];
  euSizes: string[];
  materialComposition: string;
  description: string;
  details: string[];
  images: string[];
  secondaryImage: string;
}

export interface CollectionMeta {
  key: CollectionKey;
  name: string;
  number: string;
  brand: "conturelle" | "felina";
  styleCategory: StyleCategory;
  description: string;
  heroImage: string;
  slug: string;
}
