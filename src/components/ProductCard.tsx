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

  // Size range string
  const sizeRange = product.bandSizes.length > 0 && product.cupSizes.length > 0
    ? `${product.bandSizes[0]}${product.cupSizes[0]}–${product.bandSizes[product.bandSizes.length - 1]}${product.cupSizes[product.cupSizes.length - 1]}`
    : null;

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

          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[rgba(21,8,16,0.7)] opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

          {product.badge && (
            <div
              className={`absolute top-3 left-3 text-[9px] tracking-[0.1em] uppercase px-2 py-0.5 z-[3] ${
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

          <button
            onClick={handleQuickAdd}
            className="absolute bottom-5 left-1/2 -translate-x-1/2 translate-y-3 text-[9px] tracking-[0.12em] uppercase text-[var(--cream)] whitespace-nowrap opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 border-b border-[rgba(245,239,232,0.5)] pb-1 bg-transparent cursor-pointer"
          >
            {product.bandSizes.length > 0 ? "Select Size" : "Add to Cart"}
          </button>
        </div>

        {/* Quick-add size panel */}
        {quickAdd && (
          <div
            className="bg-[rgba(43,16,33,0.8)] p-3 px-4 border-t border-[rgba(201,169,110,0.1)]"
            onClick={(e) => e.preventDefault()}
          >
            {product.bandSizes.length > 0 && (
              <div className="flex items-center gap-1 mb-2">
                <span className="text-[9px] tracking-[0.1em] uppercase text-[rgba(245,239,232,0.4)] w-9">Band:</span>
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
                <span className="text-[9px] tracking-[0.1em] uppercase text-[rgba(245,239,232,0.4)] w-9">Cup:</span>
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
              className="w-full py-2.5 bg-[var(--burgundy)] border border-[var(--burgundy)] text-[var(--cream)] text-[9px] tracking-[0.12em] uppercase cursor-pointer transition-all hover:bg-transparent hover:border-[var(--rose)] hover:text-[var(--rose)] disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Add to Cart
            </button>
          </div>
        )}

        {/* Product info */}
        <div className="py-4 px-3 flex justify-between items-end">
          <div>
            <div className="font-[family-name:var(--font-cormorant)] text-lg font-light text-[var(--cream)] leading-tight">
              {product.name}
            </div>
            <div className="text-[10px] text-[rgba(245,239,232,0.3)] mt-0.5">
              {product.subtitle}
            </div>
            <div className="flex items-center gap-1.5 mt-1.5">
              <span className="text-[var(--star-gold)] text-[10px]">&#9733;&#9733;&#9733;&#9733;&#9733;</span>
              <span className="text-[10px] text-[rgba(245,239,232,0.3)]">({product.reviewCount})</span>
            </div>
            {/* Color swatches — larger, with tooltips */}
            <div className="flex gap-2 mt-2">
              {product.colors.map((c) => (
                <span
                  key={c.name}
                  className="w-5 h-5 rounded-full border-2 border-[rgba(201,169,110,0.15)] hover:border-[var(--gold)] transition-colors cursor-pointer"
                  style={{ background: c.hex }}
                  title={c.name}
                />
              ))}
            </div>
            {/* Size availability */}
            {sizeRange && (
              <p className="text-[10px] text-[rgba(245,239,232,0.3)] mt-1.5">
                Sizes {sizeRange}
              </p>
            )}
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
