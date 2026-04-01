"use client";

import Link from "next/link";
import { Product } from "@/lib/products";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useState } from "react";

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const wishlist = useWishlist();
  const [quickAdd, setQuickAdd] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColorIdx, setSelectedColorIdx] = useState(0);

  const isBra = product.productType.includes("bra");

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (product.euSizes.length <= 1) {
      addItem({
        slug: product.slug,
        name: product.name,
        price: product.price,
        color: product.colors[selectedColorIdx].name,
        size: product.euSizes[0] || "One Size",
        quantity: 1,
        image: product.images[0],
      });
    } else {
      setQuickAdd(!quickAdd);
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (selectedSize) {
      addItem({
        slug: product.slug,
        name: product.name,
        price: product.price,
        color: product.colors[selectedColorIdx].name,
        size: selectedSize,
        quantity: 1,
        image: product.images[0],
      });
      setQuickAdd(false);
      setSelectedSize(null);
    }
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    wishlist.toggle(product.slug);
  };

  const isWishlisted = wishlist.has(product.slug);

  return (
    <div className="group relative overflow-hidden bg-[var(--bg-card)]">
      <Link href={`/product/${product.slug}`} className="no-underline">
        {/* Image area */}
        <div className="relative aspect-[3/4] overflow-hidden cursor-pointer">
          <img
            src={product.images[0]}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0"
            loading="lazy"
          />
          <img
            src={product.secondaryImage || product.images[1] || product.images[0]}
            alt={`${product.name} alternate view`}
            className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            loading="lazy"
          />

          {product.badge && (
            <div
              className={`absolute top-3 left-3 text-[9px] tracking-[0.06em] uppercase px-2.5 py-1 z-[3] rounded-full ${
                product.badge === "bestseller"
                  ? "bg-[var(--accent)]/15 text-[var(--accent)] border border-[var(--accent)]/30"
                  : "bg-[var(--rose)]/15 text-[var(--rose)] border border-[var(--rose)]/30"
              }`}
            >
              {product.badge}
            </div>
          )}

          {/* Wishlist heart */}
          <button
            onClick={handleWishlistToggle}
            className="absolute top-3 right-3 z-[3] w-8 h-8 flex items-center justify-center rounded-full bg-[var(--bg)]/80 backdrop-blur-sm transition-all hover:bg-[var(--bg)]"
            aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill={isWishlisted ? "var(--rose)" : "none"} stroke={isWishlisted ? "var(--rose)" : "var(--text-muted)"} strokeWidth="1.5">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </button>

          <button
            onClick={handleQuickAdd}
            className="absolute bottom-4 left-1/2 -translate-x-1/2 translate-y-2 text-[10px] tracking-[0.06em] uppercase text-[var(--bg)] bg-[var(--text)] whitespace-nowrap opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 py-2.5 px-6 cursor-pointer"
          >
            {product.euSizes.length > 1 ? "Select Size" : "Add to Cart"}
          </button>
        </div>

        {/* Quick-add size panel */}
        {quickAdd && (
          <div
            className="bg-[var(--bg-subtle)] p-3 px-4 border-t border-[var(--border)]"
            onClick={(e) => e.preventDefault()}
          >
            <div className="flex flex-wrap items-center gap-1 mb-2">
              {product.euSizes.slice(0, isBra ? 12 : 8).map((s) => (
                <button
                  key={s}
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); setSelectedSize(s); }}
                  className={`min-w-[36px] h-8 px-1.5 text-[10px] cursor-pointer border transition-all ${
                    selectedSize === s
                      ? "bg-[var(--text)] text-[var(--bg)] border-[var(--text)]"
                      : "bg-transparent text-[var(--text)] border-[var(--border)] hover:border-[var(--text)]"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
            <button
              onClick={handleAddToCart}
              disabled={!selectedSize}
              className="w-full py-2.5 bg-[var(--text)] text-[var(--bg)] text-[10px] tracking-[0.06em] uppercase cursor-pointer transition-all hover:opacity-90 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Add to Cart
            </button>
          </div>
        )}

        {/* Product info */}
        <div className="py-4 px-3 flex justify-between items-start">
          <div className="flex-1 min-w-0">
            <div className="font-[family-name:var(--font-cormorant)] text-lg font-light text-[var(--text)] leading-tight">
              {product.name}
            </div>
            <div className="text-[10px] text-[var(--text-faint)] mt-0.5 truncate">
              {product.subtitle}
            </div>
            <div className="flex items-center gap-1.5 mt-1.5">
              <span className="text-[var(--accent)] text-[10px]">&#9733;&#9733;&#9733;&#9733;&#9733;</span>
              <span className="text-[10px] text-[var(--text-faint)]">({product.reviewCount})</span>
            </div>
            {/* Color swatches */}
            <div className="flex gap-2 mt-2">
              {product.colors.map((c, i) => (
                <button
                  key={c.name}
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); setSelectedColorIdx(i); }}
                  className={`w-6 h-6 rounded-full border-2 transition-all cursor-pointer ${
                    selectedColorIdx === i
                      ? "border-[var(--text)] ring-1 ring-[var(--text)] ring-offset-1 ring-offset-[var(--bg-card)]"
                      : "border-[var(--border)] hover:border-[var(--text-muted)]"
                  }`}
                  style={{ background: c.hex }}
                  title={c.name}
                />
              ))}
            </div>
          </div>
          <div className="text-right flex-shrink-0 ml-3">
            {product.originalPrice && (
              <div className="text-[13px] text-[var(--text-faint)] line-through">
                ${product.originalPrice}
              </div>
            )}
            <div className={`font-[family-name:var(--font-cormorant)] text-lg font-light ${product.originalPrice ? "text-[var(--sale-red)]" : "text-[var(--text)]"}`}>
              ${product.price}
            </div>
            {product.originalPrice && (
              <span className="text-[8px] bg-[var(--sale-red)] text-white px-1.5 py-0.5 rounded-sm">
                -{Math.round((1 - product.price / product.originalPrice) * 100)}%
              </span>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}
