"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { products, Product } from "@/lib/products";

export default function RecentlyViewed({ currentSlug }: { currentSlug?: string }) {
  const [viewedProducts, setViewedProducts] = useState<Product[]>([]);

  useEffect(() => {
    try {
      const slugs: string[] = JSON.parse(localStorage.getItem("conturelle_viewed") || "[]");
      const filtered = slugs
        .filter((s) => s !== currentSlug)
        .map((s) => products.find((p) => p.slug === s))
        .filter(Boolean) as Product[];
      if (filtered.length >= 2) {
        setViewedProducts(filtered.slice(0, 6));
      }
    } catch {}
  }, [currentSlug]);

  if (viewedProducts.length < 2) return null;

  return (
    <section className="px-6 md:px-12 max-w-[1400px] mx-auto mb-16">
      <h2 className="font-[family-name:var(--font-cormorant)] text-[24px] font-light text-[var(--cream)] mb-6">
        Recently <em className="italic text-[var(--terracotta)]">Viewed</em>
      </h2>
      <div className="flex gap-3 overflow-x-auto pb-4" style={{ scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch" }}>
        {viewedProducts.map((p) => (
          <Link
            key={p.slug}
            href={`/product/${p.slug}`}
            className="flex-shrink-0 w-[140px] no-underline group"
            style={{ scrollSnapAlign: "start" }}
          >
            <div className="aspect-[3/4] overflow-hidden bg-[var(--mid)] rounded-sm mb-2">
              <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500" loading="lazy" />
            </div>
            <p className="text-[11px] text-[var(--cream)] truncate">{p.name}</p>
            <p className="font-[family-name:var(--font-cormorant)] text-sm text-[var(--gold)]">&euro;{p.price}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
