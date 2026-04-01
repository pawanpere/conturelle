"use client";

import Link from "next/link";
import { getNewArrivals } from "@/lib/products";
import ProductCard from "@/components/ProductCard";

export default function NewArrivalsSection() {
  const newArrivals = getNewArrivals().slice(0, 4);

  if (newArrivals.length === 0) return null;

  return (
    <section className="py-20 px-6 md:px-12 max-w-[1400px] mx-auto">
      <div className="flex items-end justify-between mb-12">
        <div>
          <p className="text-[10px] tracking-[0.06em] uppercase text-[var(--accent)] mb-2">
            Just arrived
          </p>
          <h2 className="font-[family-name:var(--font-cormorant)] text-[36px] md:text-[48px] font-light text-[var(--text)]">
            New Arrivals
          </h2>
        </div>
        <Link
          href="/shop?filter=new"
          className="text-[10px] tracking-[0.06em] uppercase text-[var(--text-muted)] hover:text-[var(--text)] transition-colors no-underline hidden md:block"
        >
          See All New &rarr;
        </Link>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {newArrivals.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </section>
  );
}
