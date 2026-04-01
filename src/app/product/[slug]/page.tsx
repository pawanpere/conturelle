import { products, getProduct } from "@/lib/products";
import { notFound } from "next/navigation";
import ProductPageClient from "./ProductPageClient";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const relatedProducts = products.filter((p) => p.slug !== slug).slice(0, 3);

  return <ProductPageClient product={product} relatedProducts={relatedProducts} />;
}
