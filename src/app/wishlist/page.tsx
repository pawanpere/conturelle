"use client";

import Link from "next/link";
import { useWishlist } from "@/context/WishlistContext";
import { getProduct } from "@/lib/products";
import ProductCard from "@/components/ProductCard";

export default function WishlistPage() {
  const { items } = useWishlist();

  const products = items
    .map((slug) => getProduct(slug))
    .filter(Boolean);

  return (
    <main
      className="min-h-screen"
      style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}
    >
      <section className="px-6 py-20 text-center">
        <h1
          className="text-4xl md:text-5xl font-light tracking-wide mb-3"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          Wishlist
        </h1>
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>
          {products.length > 0
            ? `${products.length} saved piece${products.length !== 1 ? "s" : ""}`
            : "Your wishlist is empty"}
        </p>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-24">
        {products.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map(
              (product) =>
                product && (
                  <ProductCard key={product.slug} product={product} />
                )
            )}
          </div>
        ) : (
          <div className="text-center py-16">
            <div
              className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "var(--bg-subtle)" }}
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ color: "var(--text-faint)" }}
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </div>
            <p
              className="text-xl font-light mb-3"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              Nothing saved yet
            </p>
            <p
              className="text-sm max-w-sm mx-auto mb-8"
              style={{ color: "var(--text-muted)" }}
            >
              Tap the heart icon on any piece to save it here. Your wishlist
              makes it easy to find your favourites later.
            </p>
            <Link
              href="/shop"
              className="inline-block px-10 py-3 rounded-full text-sm font-medium tracking-wide text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: "var(--accent)" }}
            >
              Explore the Collection
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}
