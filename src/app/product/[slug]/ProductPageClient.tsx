"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Product, products } from "@/lib/products";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import ProductCard from "@/components/ProductCard";
import RecentlyViewed from "@/components/RecentlyViewed";

const pageReviews = [
  { stars: 5, title: "Perfect fit!", text: "I've tried so many brands and this is the first one that truly fits. The spacer cups are a game changer.", author: "Sarah M.", size: "80D", verified: true, helpful: 12 },
  { stars: 5, title: "Best everyday bra", text: "Comfortable enough to wear all day. The quality is outstanding for the price.", author: "Anna K.", size: "75C", verified: true, helpful: 8 },
  { stars: 4, title: "Beautiful lace", text: "The embroidery is even more beautiful in person. Runs slightly small in the band.", author: "Maria L.", size: "85E", verified: true, helpful: 5 },
  { stars: 5, title: "Converted for life", text: "My third Conturelle purchase. The European craftsmanship really shows.", author: "Julia W.", size: "90D", verified: true, helpful: 15 },
];

const ratingBreakdown = [
  { stars: 5, pct: 89 },
  { stars: 4, pct: 8 },
  { stars: 3, pct: 2 },
  { stars: 2, pct: 1 },
  { stars: 1, pct: 0 },
];

export default function ProductPageClient({
  product,
  relatedProducts,
}: {
  product: Product;
  relatedProducts: Product[];
}) {
  const { addItem } = useCart();
  const wishlist = useWishlist();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [openAccordion, setOpenAccordion] = useState<string | null>("benefits");
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [stickyVisible, setStickyVisible] = useState(false);
  const atcRef = useRef<HTMLButtonElement>(null);

  const isBra = product.productType.includes("bra");
  const isWishlisted = wishlist.has(product.slug);

  useEffect(() => {
    const btn = atcRef.current;
    if (!btn) return;
    const observer = new IntersectionObserver(
      ([entry]) => setStickyVisible(!entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(btn);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    try {
      const viewed = JSON.parse(localStorage.getItem("conturelle_viewed") || "[]");
      const filtered = viewed.filter((s: string) => s !== product.slug);
      filtered.unshift(product.slug);
      localStorage.setItem("conturelle_viewed", JSON.stringify(filtered.slice(0, 8)));
    } catch {}
  }, [product.slug]);

  const handleAddToCart = () => {
    if (product.euSizes.length > 1 && !selectedSize) return;
    addItem({
      slug: product.slug,
      name: product.name,
      price: product.price,
      color: product.colors[selectedColor].name,
      size: selectedSize || product.euSizes[0] || "One Size",
      quantity: 1,
      image: product.images[0],
    });
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const canAdd = product.euSizes.length <= 1 || !!selectedSize;

  const matchingProducts = products
    .filter((p) => p.slug !== product.slug && p.collection === product.collection)
    .slice(0, 2);

  const stockWarning = selectedSize && isBra && (selectedSize.includes("80") || selectedSize.includes("85")) && selectedSize.includes("D");

  return (
    <div className="relative z-[2] pt-28 md:pt-36">
      {/* Breadcrumb */}
      <div className="px-6 md:px-12 max-w-[1400px] mx-auto mb-8">
        <div className="flex items-center gap-2 text-[10px] tracking-[0.04em] text-[var(--text-faint)]">
          <Link href="/" className="no-underline text-[var(--text-faint)] hover:text-[var(--text)] transition-colors">Home</Link>
          <span>&rsaquo;</span>
          <Link href="/shop" className="no-underline text-[var(--text-faint)] hover:text-[var(--text)] transition-colors">Shop</Link>
          <span>&rsaquo;</span>
          <span className="text-[var(--text)]">{product.name}</span>
        </div>
      </div>

      {/* Main product section */}
      <div className="px-6 md:px-12 max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-20">
        {/* Gallery */}
        <div className="flex flex-col-reverse md:flex-row gap-4">
          <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-x-visible">
            {product.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setSelectedImage(i)}
                className={`w-16 h-20 md:w-20 md:h-24 flex-shrink-0 border overflow-hidden cursor-pointer ${
                  selectedImage === i ? "border-[var(--text)]" : "border-[var(--border)]"
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
          <div className="flex-1 aspect-[3/4] overflow-hidden bg-[var(--bg-card)] relative">
            <img src={product.images[selectedImage]} alt={product.name} className="w-full h-full object-cover" />
            {product.badge && (
              <div className={`absolute top-4 left-4 text-[9px] tracking-[0.06em] uppercase px-2.5 py-1 z-[3] rounded-full ${
                product.badge === "bestseller"
                  ? "bg-[var(--accent)]/15 text-[var(--accent)] border border-[var(--accent)]/30"
                  : "bg-[var(--rose)]/15 text-[var(--rose)] border border-[var(--rose)]/30"
              }`}>
                {product.badge}
              </div>
            )}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 md:hidden">
              {product.images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`w-2 h-2 rounded-full border-none cursor-pointer ${
                    selectedImage === i ? "bg-[var(--text)]" : "bg-[var(--text-faint)]"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Buy box */}
        <div className="flex flex-col">
          <p className="text-[10px] tracking-[0.06em] uppercase text-[var(--text-faint)] mb-1">
            Conturelle by Felina
          </p>

          {product.badge && (
            <span className={`self-start text-[9px] tracking-[0.06em] uppercase px-2.5 py-1 mb-4 rounded-full ${
              product.badge === "bestseller"
                ? "bg-[var(--accent)]/15 text-[var(--accent)] border border-[var(--accent)]/30"
                : "bg-[var(--rose)]/15 text-[var(--rose)] border border-[var(--rose)]/30"
            }`}>
              {product.badge}
            </span>
          )}

          <h1 className="font-[family-name:var(--font-cormorant)] text-[36px] md:text-[48px] font-light text-[var(--text)] leading-tight">
            {product.name}
          </h1>
          <p className="text-[10px] tracking-[0.04em] uppercase text-[var(--text-muted)] mt-2">
            {product.subtitle}
          </p>

          <a href="#reviews-section" className="flex items-center gap-2 mt-4 no-underline">
            <span className="text-[var(--accent)] text-sm">&#9733;&#9733;&#9733;&#9733;&#9733;</span>
            <span className="text-xs text-[var(--text-muted)]">{product.rating}</span>
            <span className="text-xs text-[var(--text-faint)] underline">({product.reviewCount} reviews)</span>
          </a>

          {/* Price */}
          <div className="mt-6">
            <div className="flex items-center gap-3">
              {product.originalPrice && (
                <span className="font-[family-name:var(--font-cormorant)] text-xl text-[var(--text-faint)] line-through">
                  ${product.originalPrice}
                </span>
              )}
              <span className={`font-[family-name:var(--font-cormorant)] text-3xl font-light ${product.originalPrice ? "text-[var(--sale-red)]" : "text-[var(--text)]"}`}>
                ${product.price}
              </span>
              {product.originalPrice && (
                <span className="text-[8px] bg-[var(--sale-red)] text-white px-2 py-1 rounded-sm">
                  SAVE ${product.originalPrice - product.price}
                </span>
              )}
            </div>
            <p className="text-[10px] text-[var(--text-faint)] mt-1.5">
              or 4 &times; ${(product.price / 4).toFixed(2)} with <span className="text-[#FFB3C7]">Klarna</span>
            </p>
          </div>

          <div className="w-full h-px bg-[var(--border)] my-6" />

          {/* Color swatches */}
          <div>
            <p className="text-[10px] tracking-[0.06em] uppercase text-[var(--text-muted)] mb-3">
              Color: <span className="text-[var(--text)]">{product.colors[selectedColor].name}</span>
            </p>
            <div className="flex gap-3">
              {product.colors.map((c, i) => (
                <button
                  key={c.name}
                  onClick={() => setSelectedColor(i)}
                  className={`w-8 h-8 rounded-full border-2 cursor-pointer transition-all ${
                    selectedColor === i
                      ? "border-[var(--text)] ring-1 ring-[var(--text)] ring-offset-2 ring-offset-[var(--bg)]"
                      : "border-[var(--border)]"
                  }`}
                  style={{ background: c.hex }}
                  title={c.name}
                />
              ))}
            </div>
          </div>

          {/* Size selector */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-3">
              <p className="text-[10px] tracking-[0.06em] uppercase text-[var(--text-muted)]">
                Size (EU): {selectedSize && <span className="text-[var(--text)]">{selectedSize}</span>}
              </p>
              <button
                onClick={() => setSizeGuideOpen(true)}
                className="text-[10px] tracking-[0.04em] uppercase text-[var(--accent)] bg-transparent border-none cursor-pointer underline"
              >
                Size Guide
              </button>
            </div>
            <div className="flex gap-2 flex-wrap">
              {product.euSizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedSize(s)}
                  className={`min-w-[48px] h-11 px-2 text-xs cursor-pointer border transition-all ${
                    selectedSize === s
                      ? "bg-[var(--text)] text-[var(--bg)] border-[var(--text)]"
                      : "bg-transparent text-[var(--text)] border-[var(--border)] hover:border-[var(--text)]"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
            <Link href="/fit-quiz" className="flex items-center gap-2 mt-3 text-[10px] tracking-[0.04em] text-[var(--accent)] no-underline hover:text-[var(--text)] transition-colors">
              <span className="text-sm">&#9432;</span>
              Find Your Size &mdash; Take the 60-Second Fit Quiz
            </Link>
          </div>

          {stockWarning && (
            <p className="mt-3 text-[10px] text-[var(--rose)] flex items-center gap-1.5">
              Only 3 left in {selectedSize}
            </p>
          )}

          {/* Add to cart + wishlist */}
          <div className="mt-6 flex gap-3">
            <button
              ref={atcRef}
              onClick={handleAddToCart}
              disabled={!canAdd}
              className={`flex-1 py-4 text-[10px] tracking-[0.08em] uppercase cursor-pointer transition-all border-none min-h-[52px] ${
                addedToCart
                  ? "bg-[var(--success)] text-white"
                  : canAdd
                  ? "bg-[var(--text)] text-[var(--bg)] font-medium hover:opacity-90"
                  : "bg-[var(--text)]/20 text-[var(--text-faint)] cursor-not-allowed"
              }`}
            >
              {addedToCart
                ? "\u2713 Added to Cart!"
                : canAdd
                ? `Add to Cart — $${product.price}`
                : "Select a Size"}
            </button>
            <button
              onClick={() => wishlist.toggle(product.slug)}
              className={`w-[52px] h-[52px] border flex items-center justify-center cursor-pointer transition-all ${
                isWishlisted
                  ? "border-[var(--rose)] bg-[var(--rose)]/10"
                  : "border-[var(--border)] bg-transparent hover:border-[var(--text)]"
              }`}
              aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill={isWishlisted ? "var(--rose)" : "none"} stroke={isWishlisted ? "var(--rose)" : "var(--text-muted)"} strokeWidth="1.5">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </button>
          </div>

          {/* Trust signals */}
          <div className="flex flex-col gap-1.5 mt-4 text-[10px] tracking-[0.04em] text-[var(--text-faint)]">
            <span>&#10003; Free shipping over $75</span>
            <span>&#10003; 30-day hassle-free returns</span>
            <span>&#128274; Secure checkout</span>
          </div>

          <div className="w-full h-px bg-[var(--border)] my-6" />

          {/* Quick benefits */}
          <div className="mb-6">
            <ul className="list-none flex flex-col gap-2.5">
              {product.details.map((d, i) => (
                <li key={i} className="text-[11px] text-[var(--text-muted)] leading-relaxed flex gap-2.5">
                  <span className="text-[var(--success)] flex-shrink-0">&#10003;</span> {d}
                </li>
              ))}
            </ul>
          </div>

          {/* Accordions */}
          {[
            { id: "description", title: "Details", content: (
              <div className="text-[11px] text-[var(--text-muted)] leading-loose">
                <p>{product.description}</p>
              </div>
            )},
            { id: "materials", title: "Materials & Care", content: (
              <div className="text-[11px] text-[var(--text-muted)] leading-loose">
                <p><strong className="text-[var(--text)]">Composition:</strong> {product.materialComposition}</p>
                <div className="mt-3">
                  <p className="text-[var(--text)] text-[10px] tracking-[0.06em] uppercase mb-1.5">Care:</p>
                  <ul className="list-none flex flex-col gap-1">
                    <li>&bull; Hand wash at 30&deg;C or use lingerie bag</li>
                    <li>&bull; Do not tumble dry</li>
                    <li>&bull; Air dry flat, reshape cups while damp</li>
                    <li>&bull; Do not iron or bleach</li>
                  </ul>
                </div>
              </div>
            )},
            { id: "shipping", title: "Shipping & Returns", content: (
              <div className="text-[11px] text-[var(--text-muted)] leading-loose">
                <div className="mb-3">
                  <p className="text-[var(--text)] text-[10px] tracking-[0.06em] uppercase mb-1.5">Shipping:</p>
                  <ul className="list-none flex flex-col gap-1">
                    <li>&bull; Free standard shipping on orders over $75</li>
                    <li>&bull; Standard delivery: 3-5 business days</li>
                    <li>&bull; Express delivery: 1-2 business days (+$9.95)</li>
                    <li>&bull; International shipping available</li>
                  </ul>
                </div>
                <div>
                  <p className="text-[var(--text)] text-[10px] tracking-[0.06em] uppercase mb-1.5">Returns:</p>
                  <ul className="list-none flex flex-col gap-1">
                    <li>&bull; 30-day hassle-free returns</li>
                    <li>&bull; Free return shipping</li>
                    <li>&bull; Items must be unworn with tags attached</li>
                    <li>&bull; Refund processed within 5 business days</li>
                  </ul>
                </div>
              </div>
            )},
            { id: "craft", title: "The Craft Behind This Piece", content: (
              <div className="text-[11px] text-[var(--text-muted)] leading-loose">
                <p>
                  This piece is assembled from up to 80 individual components &mdash; each one precision-cut, sewn, and finished by skilled artisans at our European production facilities.
                </p>
                <p className="mt-2">
                  From the yarn selection to the final quality inspection, we control every step of the supply chain. This is how we&rsquo;ve been guaranteeing perfect fit for 140 years.
                </p>
                <Link href="/our-story" className="inline-block mt-3 text-[10px] tracking-[0.06em] uppercase text-[var(--accent)] no-underline hover:text-[var(--text)] transition-colors">
                  Discover Our Heritage &rarr;
                </Link>
              </div>
            )},
          ].map((acc) => (
            <div key={acc.id} className="border-b border-[var(--border)]">
              <button
                onClick={() => setOpenAccordion(openAccordion === acc.id ? null : acc.id)}
                className="w-full py-4 flex justify-between items-center bg-transparent border-none cursor-pointer text-left min-h-[44px]"
              >
                <span className="text-[10px] tracking-[0.06em] uppercase text-[var(--text)]">{acc.title}</span>
                <span className="text-[var(--accent)] text-lg">{openAccordion === acc.id ? "\u2212" : "+"}</span>
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${
                openAccordion === acc.id ? "max-h-[500px] pb-4" : "max-h-0"
              }`}>
                {acc.content}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Complete the Look */}
      {matchingProducts.length > 0 && (
        <section className="px-6 md:px-12 max-w-[1400px] mx-auto mb-16">
          <h2 className="font-[family-name:var(--font-cormorant)] text-[28px] font-light text-[var(--text)] mb-2">
            Complete the <em className="italic text-[var(--accent)]">Look</em>
          </h2>
          <p className="text-[10px] text-[var(--text-muted)] mb-6">
            More from the {product.collection.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())} collection
          </p>
          <div className="grid grid-cols-2 gap-4">
            {matchingProducts.map((mp) => (
              <ProductCard key={mp.slug} product={mp} />
            ))}
          </div>
        </section>
      )}

      {/* You May Also Love */}
      <section className="px-6 md:px-12 max-w-[1400px] mx-auto mb-20">
        <h2 className="font-[family-name:var(--font-cormorant)] text-[36px] font-light text-[var(--text)] mb-10">
          You May Also <em className="italic text-[var(--accent)]">Love</em>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {relatedProducts.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>

      {/* Customer Reviews */}
      <section id="reviews-section" className="px-6 md:px-12 max-w-[1400px] mx-auto mb-20">
        <div className="flex items-end gap-6 mb-10">
          <h2 className="font-[family-name:var(--font-cormorant)] text-[36px] font-light text-[var(--text)]">
            Customer <em className="italic text-[var(--accent)]">Reviews</em>
          </h2>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[var(--accent)] text-sm">&#9733;&#9733;&#9733;&#9733;&#9733;</span>
            <span className="text-xs text-[var(--text-muted)]">{product.rating}/5 ({product.reviewCount} reviews)</span>
          </div>
        </div>

        <div className="bg-[var(--bg-card)] border border-[var(--border)] p-6 mb-8 max-w-md">
          {ratingBreakdown.map((r) => (
            <div key={r.stars} className="flex items-center gap-3 mb-2 last:mb-0">
              <span className="text-[10px] text-[var(--text-muted)] w-6">{r.stars}&#9733;</span>
              <div className="flex-1 h-2 bg-[var(--border)] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[var(--accent)] rounded-full transition-all duration-700"
                  style={{ width: `${r.pct}%` }}
                />
              </div>
              <span className="text-[9px] text-[var(--text-faint)] w-8 text-right">{r.pct}%</span>
            </div>
          ))}
        </div>

        <div className="mb-8 flex items-center gap-4">
          <span className="text-[10px] tracking-[0.04em] uppercase text-[var(--text-muted)]">Fit:</span>
          <div className="flex gap-2">
            {["Runs Small", "True to Size", "Runs Large"].map((label, i) => (
              <span
                key={label}
                className={`text-[10px] tracking-[0.04em] uppercase px-3 py-1.5 border ${
                  i === 1
                    ? "border-[var(--text)] bg-[var(--text)]/5 text-[var(--text)]"
                    : "border-[var(--border)] text-[var(--text-faint)]"
                }`}
              >
                {label}
              </span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {pageReviews.map((review, i) => (
            <div key={i} className="bg-[var(--bg-card)] p-6 border border-[var(--border)]">
              <div className="flex items-center justify-between mb-3">
                <div className="text-[var(--accent)] text-xs">
                  {"★".repeat(review.stars)}
                </div>
                {review.verified && (
                  <span className="text-[8px] tracking-[0.06em] uppercase text-[var(--success)]">Verified Purchase</span>
                )}
              </div>
              <p className="text-xs text-[var(--text)] font-medium mb-2">{review.title}</p>
              <p className="text-[11px] text-[var(--text-muted)] leading-relaxed mb-3">{review.text}</p>
              <div className="flex items-center justify-between">
                <p className="text-[10px] tracking-[0.04em] text-[var(--text-faint)]">
                  {review.author} &middot; Size {review.size}
                </p>
                <span className="text-[9px] text-[var(--text-faint)]">
                  Helpful? &#128077; {review.helpful}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-4 mt-6">
          <button className="py-3 px-8 border border-[var(--border)] bg-transparent text-[10px] tracking-[0.06em] uppercase text-[var(--text-muted)] cursor-pointer hover:border-[var(--text)] transition-colors">
            Load More Reviews
          </button>
          <button className="py-3 px-8 border border-[var(--text)] bg-transparent text-[10px] tracking-[0.06em] uppercase text-[var(--text)] cursor-pointer hover:bg-[var(--text)] hover:text-[var(--bg)] transition-all">
            Write a Review
          </button>
        </div>
      </section>

      {/* Recently Viewed */}
      <RecentlyViewed currentSlug={product.slug} />

      {/* Sticky mobile ATC */}
      <div className={`lg:hidden fixed bottom-0 left-0 right-0 z-[50] bg-[var(--bg)] border-t border-[var(--border)] px-4 py-3 flex items-center justify-between gap-4 shadow-lg transition-transform duration-300 ${
        stickyVisible ? "translate-y-0" : "translate-y-full"
      }`}>
        <div className="flex-1 min-w-0">
          <p className="font-[family-name:var(--font-cormorant)] text-base text-[var(--text)] truncate">{product.name}</p>
          <div className="flex items-center gap-2">
            {selectedSize && (
              <span className="text-[10px] text-[var(--text-faint)]">{selectedSize} &middot; {product.colors[selectedColor].name}</span>
            )}
            <span className={`font-[family-name:var(--font-cormorant)] text-lg ${product.originalPrice ? "text-[var(--sale-red)]" : "text-[var(--text)]"}`}>
              ${product.price}
            </span>
          </div>
        </div>
        <button
          onClick={canAdd ? handleAddToCart : () => window.scrollTo({ top: 0, behavior: "smooth" })}
          className={`py-3 px-6 text-[10px] tracking-[0.06em] uppercase border-none cursor-pointer whitespace-nowrap min-h-[44px] ${
            canAdd
              ? "bg-[var(--text)] text-[var(--bg)] font-medium"
              : "bg-[var(--text)]/30 text-[var(--text-muted)]"
          }`}
        >
          {canAdd ? `Add — $${product.price}` : "Select Size \u2191"}
        </button>
      </div>

      {/* Size Guide Modal */}
      {sizeGuideOpen && (
        <>
          <div className="fixed inset-0 bg-black/30 z-[400]" onClick={() => setSizeGuideOpen(false)} />
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[401] bg-[var(--bg)] border border-[var(--border)] p-8 max-w-lg w-[90%] max-h-[80vh] overflow-y-auto shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-[family-name:var(--font-cormorant)] text-2xl text-[var(--text)]">Size Guide</h3>
              <button onClick={() => setSizeGuideOpen(false)} className="bg-transparent border-none text-[var(--text)] text-xl cursor-pointer">&times;</button>
            </div>
            <table className="w-full text-[10px] tracking-[0.04em] text-[var(--text-muted)]">
              <thead>
                <tr className="text-[9px] tracking-[0.06em] uppercase text-[var(--accent)]">
                  <th className="py-2 text-left">EU Band</th>
                  <th className="py-2 text-left">UK</th>
                  <th className="py-2 text-left">Underbust (cm)</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["65", "30", "63-67"], ["70", "32", "68-72"], ["75", "34", "73-77"],
                  ["80", "36", "78-82"], ["85", "38", "83-87"], ["90", "40", "88-92"],
                  ["95", "42", "93-97"], ["100", "44", "98-102"], ["105", "46", "103-107"],
                  ["110", "48", "108-112"], ["115", "50", "113-117"],
                ].map(([eu, uk, cm]) => (
                  <tr key={eu} className="border-t border-[var(--border)]">
                    <td className="py-2">{eu}</td>
                    <td className="py-2">{uk}</td>
                    <td className="py-2">{cm}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-6 text-[11px] text-[var(--text-muted)] leading-relaxed">
              <strong className="text-[var(--text)]">How to measure:</strong> Wrap a measuring tape snugly around your ribcage, just under your bust. Round to the nearest cm.
            </p>
            <div className="flex gap-4 mt-4">
              <Link href="/size-guide" onClick={() => setSizeGuideOpen(false)} className="text-[10px] tracking-[0.06em] uppercase text-[var(--accent)] no-underline hover:text-[var(--text)] transition-colors">
                Full Size Guide &rarr;
              </Link>
              <Link href="/fit-quiz" onClick={() => setSizeGuideOpen(false)} className="text-[10px] tracking-[0.06em] uppercase text-[var(--accent)] no-underline hover:text-[var(--text)] transition-colors">
                Take the Fit Quiz &rarr;
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
