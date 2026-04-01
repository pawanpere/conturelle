export type {
  Product,
  ProductColor,
  CollectionMeta,
  CollectionKey,
  ProductType,
  StyleCategory,
} from "./types";

export { collections, getCollection } from "./collections";

import { conturelleProducts } from "./conturelle-products";
import { felinaProducts } from "./felina-products";

export const products = [...conturelleProducts, ...felinaProducts];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCollection(collection: string) {
  return products.filter((p) => p.collection === collection);
}

export function getProductsByType(type: string) {
  return products.filter((p) => p.productType === type);
}

export function getProductsByStyle(style: string) {
  return products.filter((p) => p.styleCategory === style);
}

export function getProductsByColor(colorName: string) {
  return products.filter((p) =>
    p.colors.some((c) => c.name.toLowerCase() === colorName.toLowerCase())
  );
}

export function searchProducts(query: string) {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.collection.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.productType.toLowerCase().replace(/-/g, " ").includes(q) ||
      p.styleCategory.toLowerCase().includes(q) ||
      p.colors.some((c) => c.name.toLowerCase().includes(q)) ||
      p.articleNumber.includes(q)
  );
}

export function getBestsellers() {
  return products.filter((p) => p.badge === "bestseller");
}

export function getNewArrivals() {
  return products.filter((p) => p.badge === "new");
}

export function getAllColors() {
  const colorMap = new Map<string, string>();
  for (const p of products) {
    for (const c of p.colors) {
      if (!colorMap.has(c.name)) colorMap.set(c.name, c.hex);
    }
  }
  return Array.from(colorMap.entries()).map(([name, hex]) => ({ name, hex }));
}

export function getAllProductTypes() {
  return [...new Set(products.map((p) => p.productType))];
}
