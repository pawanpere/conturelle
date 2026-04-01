"use client";

import Link from "next/link";
import { getBestsellers } from "@/lib/products";
import ProductCard from "@/components/ProductCard";

export default function BestsellersSection() {
  const bestsellers = getBestsellers().slice(0, 6);

  return (
    <section className="py-14 md:py-16 px-6 md:px-12 max-w-[1400px] mx-auto">
      <div className="flex items-end justify-between mb-12">
        <h2 className="font-[family-name:var(--font-cormorant)] text-[36px] md:text-[48px] font-light text-[var(--text)]">
          Bestsellers
        </h2>
        <Link
          href="/shop?filter=bestseller"
          className="text-[10px] tracking-[0.06em] uppercase text-[var(--text-muted)] hover:text-[var(--text)] transition-colors no-underline hidden md:block"
        >
          The pieces our customers come back for &rarr;
        </Link>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {bestsellers.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </section>
  );
}
