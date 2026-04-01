"use client";

import Link from "next/link";
import { Product } from "@/lib/products";
import { useCart } from "@/context/CartContext";
import { useState } from "react";

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [quickAdd, setQuickAdd] = useState(false);
  const [selectedBand, setSelectedBand] = useState<number | null>(null);
  const [selectedCup, setSelectedCup] = useState<string | null>(null);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (product.bandSizes.length === 0) {
      addItem({
        slug: product.slug,
        name: product.name,
        price: product.price,
        color: product.colors[0].name,
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
    if (selectedBand && selectedCup) {
      addItem({
        slug: product.slug,
        name: product.name,
        price: product.price,
        color: product.colors[0].name,
        bandSize: selectedBand,
        cupSize: selectedCup,
        quantity: 1,
        image: product.images[0],
      });
      setQuickAdd(false);
      setSelectedBand(null);
      setSelectedCup(null);
    }
  };

  return (
    <div className="group relative overflow-hidden bg-[var(--mid)] rounded-sm">
      <Link href={`/product/${product.slug}`} className="no-underline">
        {/* Image area */}
        <div className="relative aspect-[3/4] overflow-hidden cursor-pointer">
          <div className={`w-full h-full ${product.pcClass} transition-transform duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-[1.04] flex items-center justify-center`}>
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[rgba(21,8,16,0.7)] opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

          {/* Badge */}
          {product.badge && (
            <div
              className={`absolute top-4 left-4 text-[8px] tracking-[0.2em] uppercase px-2.5 py-1 z-[3] ${
                product.badge === "bestseller"
                  ? "bg-[rgba(201,169,110,0.15)] text-[var(--gold)] border border-[rgba(201,169,110,0.3)]"
                  : product.badge === "new"
                  ? "bg-[var(--burgundy)] text-[var(--cream)]"
                  : "bg-[var(--sale-red)] text-[var(--cream)]"
              }`}
            >
              {product.badge}
            </div>
          )}

          {/* Quick add CTA */}
          <button
            onClick={handleQuickAdd}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 translate-y-3 text-[8px] tracking-[0.3em] uppercase text-[var(--cream)] whitespace-nowrap opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 border-b border-[rgba(245,239,232,0.5)] pb-1 bg-transparent cursor-pointer"
          >
            Quick Add +
          </button>
        </div>

        {/* Quick-add panel */}
        {quickAdd && (
          <div
            className="bg-[rgba(43,16,33,0.8)] p-3 px-4 border-t border-[rgba(201,169,110,0.1)]"
            onClick={(e) => e.preventDefault()}
          >
            {product.bandSizes.length > 0 && (
              <div className="flex items-center gap-1 mb-2">
                <span className="text-[8px] tracking-[0.2em] uppercase text-[rgba(245,239,232,0.4)] w-9">Band:</span>
                {product.bandSizes.map((s) => (
                  <button
                    key={s}
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); setSelectedBand(s); }}
                    className={`w-8 h-8 text-[10px] cursor-pointer border transition-all ${
                      selectedBand === s
                        ? "bg-[var(--burgundy)] text-[var(--cream)] border-[var(--burgundy)]"
                        : "bg-transparent text-[var(--cream)] border-[rgba(201,169,110,0.2)] hover:border-[var(--gold)]"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
            {product.cupSizes.length > 0 && (
              <div className="flex items-center gap-1 mb-2">
                <span className="text-[8px] tracking-[0.2em] uppercase text-[rgba(245,239,232,0.4)] w-9">Cup:</span>
                {product.cupSizes.map((s) => (
                  <button
                    key={s}
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); setSelectedCup(s); }}
                    className={`w-8 h-8 text-[10px] cursor-pointer border transition-all ${
                      selectedCup === s
                        ? "bg-[var(--burgundy)] text-[var(--cream)] border-[var(--burgundy)]"
                        : "bg-transparent text-[var(--cream)] border-[rgba(201,169,110,0.2)] hover:border-[var(--gold)]"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
            <button
              onClick={handleAddToCart}
              disabled={product.bandSizes.length > 0 && (!selectedBand || !selectedCup)}
              className="w-full py-2.5 bg-[var(--burgundy)] border border-[var(--burgundy)] text-[var(--cream)] text-[9px] tracking-[0.25em] uppercase cursor-pointer transition-all hover:bg-transparent hover:border-[var(--rose)] hover:text-[var(--rose)] disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Add to Cart
            </button>
          </div>
        )}

        {/* Product info */}
        <div className="py-5 px-3 flex justify-between items-end">
          <div>
            <div className="font-[family-name:var(--font-cormorant)] text-xl font-light text-[var(--cream)] leading-tight">
              <em className="italic text-[var(--terracotta)]">{product.name.split(" ")[0]}</em>{" "}
              {product.name.split(" ").slice(1).join(" ")}
            </div>
            <div className="text-[8px] tracking-[0.2em] text-[rgba(245,239,232,0.3)] uppercase mt-1">
              {product.subtitle}
            </div>
            <div className="flex items-center gap-1 mt-1.5">
              <span className="text-[var(--star-gold)] text-[10px]">&#9733;&#9733;&#9733;&#9733;&#9733;</span>
              <span className="text-[9px] text-[rgba(245,239,232,0.3)]">({product.reviewCount})</span>
            </div>
            <div className="flex gap-1.5 mt-2">
              {product.colors.map((c) => (
                <span
                  key={c.name}
                  className="w-3.5 h-3.5 rounded-full border border-[rgba(201,169,110,0.2)]"
                  style={{ background: c.hex }}
                  title={c.name}
                />
              ))}
            </div>
          </div>
          <div className="text-right">
            {product.originalPrice && (
              <div className="text-[13px] text-[rgba(245,239,232,0.3)] line-through">
                &euro;{product.originalPrice}
              </div>
            )}
            <div className={`font-[family-name:var(--font-cormorant)] text-lg font-light ${product.originalPrice ? "text-[var(--sale-red)]" : "text-[var(--gold)]"}`}>
              &euro;{product.price}
            </div>
            {product.originalPrice && (
              <span className="text-[8px] bg-[var(--sale-red)] text-[var(--cream)] px-1.5 py-0.5">
                -{Math.round((1 - product.price / product.originalPrice) * 100)}%
              </span>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}
