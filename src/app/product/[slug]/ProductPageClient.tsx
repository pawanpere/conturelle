"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Product, products } from "@/lib/products";
import { useCart } from "@/context/CartContext";
import ProductCard from "@/components/ProductCard";

const reviews = [
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
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedBand, setSelectedBand] = useState<number | null>(null);
  const [selectedCup, setSelectedCup] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [openAccordion, setOpenAccordion] = useState<string | null>("benefits");
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [stickyVisible, setStickyVisible] = useState(false);
  const atcRef = useRef<HTMLButtonElement>(null);

  const isBra = product.bandSizes.length > 0;

  // Intersection observer for sticky ATC
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

  // Track recently viewed
  useEffect(() => {
    try {
      const viewed = JSON.parse(localStorage.getItem("conturelle_viewed") || "[]");
      const filtered = viewed.filter((s: string) => s !== product.slug);
      filtered.unshift(product.slug);
      localStorage.setItem("conturelle_viewed", JSON.stringify(filtered.slice(0, 8)));
    } catch {}
  }, [product.slug]);

  const handleAddToCart = () => {
    if (isBra && (!selectedBand || !selectedCup)) return;
    addItem({
      slug: product.slug,
      name: product.name,
      price: product.price,
      color: product.colors[selectedColor].name,
      bandSize: selectedBand ?? undefined,
      cupSize: selectedCup ?? undefined,
      size: selectedSize ?? undefined,
      quantity: 1,
      image: product.images[0],
    });
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const canAdd = isBra ? selectedBand && selectedCup : true;

  // Find matching products for cross-sell
  const matchingBrief = products.find((p) => p.slug === "daily-comfort-brief" && p.slug !== product.slug);
  const matchingProducts = products.filter(
    (p) => p.slug !== product.slug && p.category !== product.category
  ).slice(0, 2);

  // Scarcity — show only for some sizes
  const stockWarning = selectedBand && selectedCup && (selectedBand === 80 || selectedBand === 85) && selectedCup === "D";

  return (
    <div className="relative z-[2] pt-28 md:pt-36">
      {/* Breadcrumb */}
      <div className="px-6 md:px-12 max-w-[1400px] mx-auto mb-8">
        <div className="flex items-center gap-2 text-[9px] tracking-[0.2em] uppercase text-[rgba(245,239,232,0.3)]">
          <Link href="/" className="no-underline text-[rgba(245,239,232,0.3)] hover:text-[var(--gold)] transition-colors">Home</Link>
          <span>&rsaquo;</span>
          <Link href="/#collection" className="no-underline text-[rgba(245,239,232,0.3)] hover:text-[var(--gold)] transition-colors">{product.category}</Link>
          <span>&rsaquo;</span>
          <span className="text-[var(--cream)]">{product.name}</span>
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
                className={`w-16 h-20 md:w-20 md:h-24 flex-shrink-0 border overflow-hidden cursor-pointer rounded-sm ${
                  selectedImage === i ? "border-[var(--gold)]" : "border-[rgba(201,169,110,0.15)]"
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
          <div className="flex-1 aspect-[3/4] overflow-hidden bg-[var(--mid)] rounded-sm relative">
            <img src={product.images[selectedImage]} alt={product.name} className="w-full h-full object-cover" />
            {product.badge && (
              <div className={`absolute top-4 left-4 text-[8px] tracking-[0.2em] uppercase px-2.5 py-1 z-[3] ${
                product.badge === "bestseller"
                  ? "bg-[rgba(201,169,110,0.15)] text-[var(--gold)] border border-[rgba(201,169,110,0.3)]"
                  : product.badge === "new"
                  ? "bg-[var(--burgundy)] text-[var(--cream)]"
                  : "bg-[var(--sale-red)] text-[var(--cream)]"
              }`}>
                {product.badge}
              </div>
            )}
            {/* Dot indicators for mobile */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 md:hidden">
              {product.images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`w-2 h-2 rounded-full border-none cursor-pointer ${
                    selectedImage === i ? "bg-[var(--gold)]" : "bg-[rgba(245,239,232,0.3)]"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Buy box */}
        <div className="flex flex-col">
          <p className="text-[9px] tracking-[0.25em] uppercase text-[rgba(245,239,232,0.4)] mb-1">Conturelle</p>

          {product.badge && (
            <span className={`self-start text-[8px] tracking-[0.2em] uppercase px-2.5 py-1 mb-4 ${
              product.badge === "bestseller" ? "bg-[rgba(201,169,110,0.15)] text-[var(--gold)] border border-[rgba(201,169,110,0.3)]"
              : product.badge === "new" ? "bg-[var(--burgundy)] text-[var(--cream)]"
              : "bg-[var(--sale-red)] text-[var(--cream)]"
            }`}>
              {product.badge}
            </span>
          )}

          <h1 className="font-[family-name:var(--font-cormorant)] text-[36px] md:text-[48px] font-light text-[var(--cream)] leading-tight">
            {product.name}
          </h1>
          <p className="text-[10px] tracking-[0.2em] uppercase text-[rgba(245,239,232,0.5)] mt-2">
            {product.subtitle}
          </p>

          {/* Rating - clickable to scroll to reviews */}
          <a href="#reviews-section" className="flex items-center gap-2 mt-4 no-underline">
            <span className="text-[var(--star-gold)] text-sm">&#9733;&#9733;&#9733;&#9733;&#9733;</span>
            <span className="text-xs text-[rgba(245,239,232,0.5)]">{product.rating}</span>
            <span className="text-xs text-[rgba(245,239,232,0.3)] underline">({product.reviewCount} reviews)</span>
          </a>

          {/* Price + BNPL */}
          <div className="mt-6">
            <div className="flex items-center gap-3">
              {product.originalPrice && (
                <span className="font-[family-name:var(--font-cormorant)] text-xl text-[rgba(245,239,232,0.3)] line-through">
                  &euro;{product.originalPrice}
                </span>
              )}
              <span className={`font-[family-name:var(--font-cormorant)] text-3xl font-light ${product.originalPrice ? "text-[var(--sale-red)]" : "text-[var(--gold)]"}`}>
                &euro;{product.price}
              </span>
              {product.originalPrice && (
                <span className="text-[8px] bg-[var(--sale-red)] text-[var(--cream)] px-2 py-1">
                  SAVE &euro;{product.originalPrice - product.price}
                </span>
              )}
            </div>
            <p className="text-[10px] text-[rgba(245,239,232,0.4)] mt-1.5">
              or 4 &times; &euro;{(product.price / 4).toFixed(2)} with <span className="text-[#FFB3C7]">Klarna</span>
            </p>
          </div>

          <div className="w-full h-px bg-[rgba(201,169,110,0.1)] my-6" />

          {/* Color swatches */}
          <div>
            <p className="text-[9px] tracking-[0.25em] uppercase text-[rgba(245,239,232,0.5)] mb-3">
              Color: <span className="text-[var(--cream)]">{product.colors[selectedColor].name}</span>
            </p>
            <div className="flex gap-3">
              {product.colors.map((c, i) => (
                <button
                  key={c.name}
                  onClick={() => setSelectedColor(i)}
                  className={`w-8 h-8 rounded-full border-2 cursor-pointer transition-all ${
                    selectedColor === i
                      ? "border-[var(--gold)] shadow-[0_0_0_2px_var(--dark),0_0_0_4px_var(--gold)]"
                      : "border-[rgba(201,169,110,0.2)]"
                  }`}
                  style={{ background: c.hex }}
                  title={c.name}
                />
              ))}
            </div>
          </div>

          {/* Size selector */}
          {isBra ? (
            <div className="mt-6">
              <div className="flex items-center justify-between mb-3">
                <p className="text-[9px] tracking-[0.25em] uppercase text-[rgba(245,239,232,0.5)]">
                  Band Size (EU): {selectedBand && <span className="text-[var(--cream)]">{selectedBand}</span>}
                </p>
                <button
                  onClick={() => setSizeGuideOpen(true)}
                  className="text-[9px] tracking-[0.2em] uppercase text-[var(--gold)] bg-transparent border-none cursor-pointer underline"
                >
                  Size Guide
                </button>
              </div>
              <div className="flex gap-2 flex-wrap">
                {product.bandSizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedBand(s)}
                    className={`min-w-[48px] h-11 text-xs cursor-pointer border transition-all rounded-sm ${
                      selectedBand === s
                        ? "bg-[var(--gold)] text-[var(--dark)] border-[var(--gold)]"
                        : "bg-transparent text-[var(--cream)] border-[rgba(201,169,110,0.2)] hover:border-[var(--gold)]"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>

              <p className="text-[9px] tracking-[0.25em] uppercase text-[rgba(245,239,232,0.5)] mt-4 mb-3">
                Cup Size: {selectedCup && <span className="text-[var(--cream)]">{selectedCup}</span>}
              </p>
              <div className="flex gap-2 flex-wrap">
                {product.cupSizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedCup(s)}
                    className={`min-w-[48px] h-11 text-xs cursor-pointer border transition-all rounded-sm ${
                      selectedCup === s
                        ? "bg-[var(--gold)] text-[var(--dark)] border-[var(--gold)]"
                        : "bg-transparent text-[var(--cream)] border-[rgba(201,169,110,0.2)] hover:border-[var(--gold)]"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>

              {/* Fit quiz link */}
              <a href="/fit-quiz" className="flex items-center gap-2 mt-3 text-[9px] tracking-[0.15em] text-[var(--gold)] no-underline hover:text-[var(--cream)] transition-colors">
                <span className="text-sm">&#9432;</span>
                Find Your Size &mdash; Take the 60-Second Fit Quiz
              </a>
            </div>
          ) : (
            <div className="mt-6">
              <p className="text-[9px] tracking-[0.25em] uppercase text-[rgba(245,239,232,0.5)] mb-3">Size (EU):</p>
              <div className="flex gap-2 flex-wrap">
                {[36, 38, 40, 42, 44, 46, 48].map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(String(s))}
                    className={`min-w-[48px] h-11 text-xs cursor-pointer border transition-all rounded-sm ${
                      selectedSize === String(s)
                        ? "bg-[var(--gold)] text-[var(--dark)] border-[var(--gold)]"
                        : "bg-transparent text-[var(--cream)] border-[rgba(201,169,110,0.2)] hover:border-[var(--gold)]"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Scarcity */}
          {stockWarning && (
            <p className="mt-3 text-[10px] text-[var(--terracotta)] flex items-center gap-1.5">
              <span>&#9888;&#65039;</span> Only 3 left in {selectedBand}{selectedCup}
            </p>
          )}

          {/* Add to cart button */}
          <button
            ref={atcRef}
            onClick={handleAddToCart}
            disabled={!canAdd}
            className={`mt-6 w-full py-4 text-[9px] tracking-[0.35em] uppercase cursor-pointer transition-all border-none min-h-[52px] ${
              addedToCart
                ? "bg-[var(--success)] text-white"
                : canAdd
                ? "bg-[var(--gold)] text-[var(--dark)] font-medium hover:bg-[var(--cream)]"
                : "bg-[rgba(201,169,110,0.2)] text-[rgba(245,239,232,0.4)] cursor-not-allowed"
            }`}
          >
            {addedToCart
              ? "\u2713 Added to Cart!"
              : canAdd
              ? `Add to Cart \u2014 \u20ac${product.price}`
              : isBra
              ? "Select Band & Cup Size"
              : "Add to Cart"}
          </button>

          {/* Trust signals */}
          <div className="flex flex-col gap-1.5 mt-4 text-[9px] tracking-[0.1em] text-[rgba(245,239,232,0.35)]">
            <span>&#10003; Free shipping over &euro;75</span>
            <span>&#10003; 30-day hassle-free returns</span>
            <span>&#128274; Secure checkout</span>
          </div>

          <div className="w-full h-px bg-[rgba(201,169,110,0.1)] my-6" />

          {/* Quick benefits */}
          <div className="mb-6">
            <ul className="list-none flex flex-col gap-2.5">
              {product.details.map((d, i) => (
                <li key={i} className="text-[11px] text-[rgba(245,239,232,0.5)] leading-relaxed flex gap-2.5">
                  <span className="text-[var(--success)] flex-shrink-0">&#10003;</span> {d}
                </li>
              ))}
            </ul>
          </div>

          {/* Accordions */}
          {[
            { id: "description", title: "Details", content: (
              <div className="text-[11px] text-[rgba(245,239,232,0.5)] leading-loose">
                <p className="mb-2"><strong className="text-[var(--cream)]">Style:</strong> {product.slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}</p>
                <p>{product.description}</p>
              </div>
            )},
            { id: "materials", title: "Materials & Care", content: (
              <div className="text-[11px] text-[rgba(245,239,232,0.5)] leading-loose">
                <p><strong className="text-[var(--cream)]">Composition:</strong> 78% Polyamide, 22% Elastane</p>
                <p className="mt-1"><strong className="text-[var(--cream)]">Cup lining:</strong> {product.material}</p>
                <div className="mt-3">
                  <p className="text-[var(--cream)] text-[10px] tracking-[0.15em] uppercase mb-1.5">Care:</p>
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
              <div className="text-[11px] text-[rgba(245,239,232,0.5)] leading-loose">
                <div className="mb-3">
                  <p className="text-[var(--cream)] text-[10px] tracking-[0.15em] uppercase mb-1.5">Shipping:</p>
                  <ul className="list-none flex flex-col gap-1">
                    <li>&bull; Free standard shipping on orders over &euro;75</li>
                    <li>&bull; Standard delivery: 3-5 business days (EU)</li>
                    <li>&bull; Express delivery: 1-2 business days (+&euro;9.95)</li>
                    <li>&bull; International shipping available</li>
                  </ul>
                </div>
                <div>
                  <p className="text-[var(--cream)] text-[10px] tracking-[0.15em] uppercase mb-1.5">Returns:</p>
                  <ul className="list-none flex flex-col gap-1">
                    <li>&bull; 30-day hassle-free returns</li>
                    <li>&bull; Free return shipping within EU</li>
                    <li>&bull; Items must be unworn with tags attached</li>
                    <li>&bull; Refund processed within 5 business days</li>
                  </ul>
                </div>
              </div>
            )},
            { id: "craft", title: "The Craft Behind This Piece", content: (
              <div className="text-[11px] text-[rgba(245,239,232,0.5)] leading-loose">
                <p>
                  This bra is assembled from 80 individual components &mdash; each one precision-cut, sewn, and finished by skilled artisans at our European production facilities.
                </p>
                <p className="mt-2">
                  From the yarn selection to the final quality inspection, we control every step of the supply chain. This is how we&rsquo;ve been guaranteeing perfect fit for 140 years.
                </p>
                <a href="/#heritage" className="inline-block mt-3 text-[9px] tracking-[0.25em] uppercase text-[var(--gold)] no-underline hover:text-[var(--cream)] transition-colors">
                  Discover Our Heritage &rarr;
                </a>
              </div>
            )},
          ].map((acc) => (
            <div key={acc.id} className="border-b border-[rgba(201,169,110,0.06)]">
              <button
                onClick={() => setOpenAccordion(openAccordion === acc.id ? null : acc.id)}
                className="w-full py-4 flex justify-between items-center bg-transparent border-none cursor-pointer text-left min-h-[44px]"
              >
                <span className="text-[10px] tracking-[0.25em] uppercase text-[var(--cream)]">{acc.title}</span>
                <span className="text-[var(--gold)] text-lg">{openAccordion === acc.id ? "\u2212" : "+"}</span>
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

      {/* Complete the Look — Cross-sell */}
      {isBra && matchingProducts.length > 0 && (
        <section className="px-6 md:px-12 max-w-[1400px] mx-auto mb-16">
          <h2 className="font-[family-name:var(--font-cormorant)] text-[28px] font-light text-[var(--cream)] mb-2">
            Complete the <em className="italic text-[var(--terracotta)]">Look</em>
          </h2>
          <p className="text-[10px] text-[rgba(245,239,232,0.5)] mb-6">
            Pair with the matching brief for a seamless set
          </p>

          <div className="grid grid-cols-2 gap-4 mb-4">
            {matchingProducts.map((mp) => (
              <div key={mp.slug} className="bg-[var(--mid)] border border-[rgba(201,169,110,0.08)] overflow-hidden rounded-sm">
                <div className="aspect-square overflow-hidden">
                  <img src={mp.images[0]} alt={mp.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-4">
                  <p className="font-[family-name:var(--font-cormorant)] text-base text-[var(--cream)]">{mp.name}</p>
                  <div className="flex gap-1.5 mt-2">
                    {mp.colors.map((c) => (
                      <span key={c.name} className="w-3 h-3 rounded-full border border-[rgba(201,169,110,0.2)]" style={{ background: c.hex }} />
                    ))}
                  </div>
                  <p className="font-[family-name:var(--font-cormorant)] text-lg text-[var(--gold)] mt-2">&euro;{mp.price}</p>
                  <button
                    onClick={() => {
                      addItem({
                        slug: mp.slug,
                        name: mp.name,
                        price: mp.price,
                        color: mp.colors[0].name,
                        quantity: 1,
                        image: mp.images[0],
                      });
                    }}
                    className="mt-3 w-full py-2.5 text-[8px] tracking-[0.25em] uppercase border border-[var(--gold)] text-[var(--gold)] bg-transparent cursor-pointer hover:bg-[var(--gold)] hover:text-[var(--dark)] transition-all"
                  >
                    + Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Bundle offer */}
          {matchingBrief && (
            <div className="bg-[rgba(74,24,37,0.2)] border border-[rgba(201,169,110,0.2)] p-6 rounded-sm">
              <p className="text-[9px] tracking-[0.25em] uppercase text-[var(--gold)] mb-2">
                &#127873; Bundle &amp; Save 15%
              </p>
              <p className="font-[family-name:var(--font-cormorant)] text-lg text-[var(--cream)]">
                {product.name} + {matchingBrief.name}
              </p>
              <div className="flex items-center gap-3 mt-2">
                <span className="font-[family-name:var(--font-cormorant)] text-base text-[rgba(245,239,232,0.3)] line-through">
                  &euro;{product.price + matchingBrief.price}
                </span>
                <span className="font-[family-name:var(--font-cormorant)] text-xl text-[var(--gold)]">
                  &euro;{Math.round((product.price + matchingBrief.price) * 0.85)}
                </span>
                <span className="text-[10px] text-[var(--success)]">
                  You save: &euro;{Math.round((product.price + matchingBrief.price) * 0.15)}
                </span>
              </div>
              <button
                onClick={() => {
                  addItem({
                    slug: product.slug + "-bundle",
                    name: product.name + " + " + matchingBrief.name,
                    price: Math.round((product.price + matchingBrief.price) * 0.85),
                    color: product.colors[selectedColor]?.name || product.colors[0].name,
                    bandSize: selectedBand ?? undefined,
                    cupSize: selectedCup ?? undefined,
                    quantity: 1,
                    image: product.images[0],
                  });
                }}
                className="mt-4 w-full py-3.5 bg-[var(--gold)] text-[var(--dark)] text-[9px] tracking-[0.3em] uppercase font-medium border-none cursor-pointer hover:bg-[var(--cream)] transition-all"
              >
                Add Set to Cart
              </button>
            </div>
          )}
        </section>
      )}

      {/* You May Also Love */}
      <section className="px-6 md:px-12 max-w-[1400px] mx-auto mb-20">
        <h2 className="font-[family-name:var(--font-cormorant)] text-[36px] font-light text-[var(--cream)] mb-10">
          You May Also <em className="italic text-[var(--terracotta)]">Love</em>
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
          <h2 className="font-[family-name:var(--font-cormorant)] text-[36px] font-light text-[var(--cream)]">
            Customer <em className="italic text-[var(--terracotta)]">Reviews</em>
          </h2>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[var(--star-gold)] text-sm">&#9733;&#9733;&#9733;&#9733;&#9733;</span>
            <span className="text-xs text-[rgba(245,239,232,0.5)]">{product.rating}/5 ({product.reviewCount} reviews)</span>
          </div>
        </div>

        {/* Rating breakdown bars */}
        <div className="bg-[var(--mid)] border border-[rgba(201,169,110,0.08)] p-6 mb-8 rounded-sm max-w-md">
          {ratingBreakdown.map((r) => (
            <div key={r.stars} className="flex items-center gap-3 mb-2 last:mb-0">
              <span className="text-[10px] text-[rgba(245,239,232,0.5)] w-6">{r.stars}&#9733;</span>
              <div className="flex-1 h-2 bg-[rgba(245,239,232,0.08)] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[var(--star-gold)] rounded-full transition-all duration-700"
                  style={{ width: `${r.pct}%` }}
                />
              </div>
              <span className="text-[9px] text-[rgba(245,239,232,0.3)] w-8 text-right">{r.pct}%</span>
            </div>
          ))}
        </div>

        {/* Fit feedback */}
        <div className="mb-8 flex items-center gap-4">
          <span className="text-[9px] tracking-[0.2em] uppercase text-[rgba(245,239,232,0.5)]">Fit:</span>
          <div className="flex gap-2">
            {["Runs Small", "True to Size", "Runs Large"].map((label, i) => (
              <span
                key={label}
                className={`text-[9px] tracking-[0.1em] uppercase px-3 py-1.5 border ${
                  i === 1
                    ? "border-[var(--gold)] bg-[rgba(201,169,110,0.1)] text-[var(--gold)]"
                    : "border-[rgba(201,169,110,0.1)] text-[rgba(245,239,232,0.3)]"
                }`}
              >
                {label}
              </span>
            ))}
          </div>
        </div>

        {/* Review cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {reviews.map((review, i) => (
            <div key={i} className="bg-[var(--mid)] p-6 border border-[rgba(201,169,110,0.06)] rounded-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="text-[var(--star-gold)] text-xs">
                  {Array.from({ length: review.stars }).map((_, j) => (
                    <span key={j}>&#9733;</span>
                  ))}
                </div>
                {review.verified && (
                  <span className="text-[8px] tracking-[0.15em] uppercase text-[var(--success)]">Verified Purchase</span>
                )}
              </div>
              <p className="text-xs text-[var(--cream)] font-medium mb-2">{review.title}</p>
              <p className="text-[11px] text-[rgba(245,239,232,0.5)] leading-relaxed mb-3">{review.text}</p>
              <div className="flex items-center justify-between">
                <p className="text-[9px] tracking-[0.15em] uppercase text-[rgba(245,239,232,0.3)]">
                  {review.author} &middot; Size {review.size}
                </p>
                <span className="text-[8px] text-[rgba(245,239,232,0.25)]">
                  Helpful? &#128077; {review.helpful}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-4 mt-6">
          <button className="py-3 px-8 border border-[rgba(201,169,110,0.2)] bg-transparent text-[9px] tracking-[0.2em] uppercase text-[rgba(245,239,232,0.5)] cursor-pointer hover:border-[var(--gold)] transition-colors">
            Load More Reviews
          </button>
          <button className="py-3 px-8 border border-[var(--gold)] bg-transparent text-[9px] tracking-[0.2em] uppercase text-[var(--gold)] cursor-pointer hover:bg-[var(--gold)] hover:text-[var(--dark)] transition-all">
            Write a Review
          </button>
        </div>
      </section>

      {/* Sticky mobile ATC */}
      <div className={`lg:hidden fixed bottom-0 left-0 right-0 z-[50] bg-[var(--dark)] border-t border-[rgba(201,169,110,0.2)] px-4 py-3 flex items-center justify-between gap-4 shadow-lg transition-transform duration-300 ${
        stickyVisible ? "translate-y-0" : "translate-y-full"
      }`}>
        <div className="flex-1 min-w-0">
          <p className="font-[family-name:var(--font-cormorant)] text-base text-[var(--cream)] truncate">{product.name}</p>
          <div className="flex items-center gap-2">
            {selectedBand && selectedCup && (
              <span className="text-[9px] text-[rgba(245,239,232,0.4)]">{selectedBand}{selectedCup} &middot; {product.colors[selectedColor].name}</span>
            )}
            <span className={`font-[family-name:var(--font-cormorant)] text-lg ${product.originalPrice ? "text-[var(--sale-red)]" : "text-[var(--gold)]"}`}>
              &euro;{product.price}
            </span>
          </div>
        </div>
        <button
          onClick={canAdd ? handleAddToCart : () => window.scrollTo({ top: 0, behavior: "smooth" })}
          className={`py-3 px-6 text-[9px] tracking-[0.2em] uppercase border-none cursor-pointer whitespace-nowrap min-h-[44px] ${
            canAdd
              ? "bg-[var(--gold)] text-[var(--dark)] font-medium"
              : "bg-[rgba(201,169,110,0.3)] text-[rgba(245,239,232,0.6)]"
          }`}
        >
          {canAdd ? `Add to Cart \u2014 \u20ac${product.price}` : "Select Size \u2191"}
        </button>
      </div>

      {/* Size Guide Modal */}
      {sizeGuideOpen && (
        <>
          <div className="fixed inset-0 bg-black/50 z-[400]" onClick={() => setSizeGuideOpen(false)} />
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[401] bg-[var(--dark)] border border-[rgba(201,169,110,0.15)] p-8 max-w-lg w-[90%] max-h-[80vh] overflow-y-auto rounded-sm shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-[family-name:var(--font-cormorant)] text-2xl text-[var(--cream)]">Size Guide</h3>
              <button onClick={() => setSizeGuideOpen(false)} className="bg-transparent border-none text-[var(--cream)] text-xl cursor-pointer">&times;</button>
            </div>
            <table className="w-full text-[10px] tracking-[0.1em] text-[rgba(245,239,232,0.5)]">
              <thead>
                <tr className="text-[8px] tracking-[0.2em] uppercase text-[var(--gold)]">
                  <th className="py-2 text-left">EU Band</th>
                  <th className="py-2 text-left">UK</th>
                  <th className="py-2 text-left">Underbust (cm)</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["70", "32", "68-72"], ["75", "34", "73-77"], ["80", "36", "78-82"],
                  ["85", "38", "83-87"], ["90", "40", "88-92"], ["95", "42", "93-97"],
                  ["100", "44", "98-102"],
                ].map(([eu, uk, cm]) => (
                  <tr key={eu} className="border-t border-[rgba(201,169,110,0.06)]">
                    <td className="py-2">{eu}</td>
                    <td className="py-2">{uk}</td>
                    <td className="py-2">{cm}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-6 text-[11px] text-[rgba(245,239,232,0.5)] leading-relaxed">
              <strong className="text-[var(--cream)]">How to measure:</strong> Wrap a measuring tape snugly around your ribcage, just under your bust. Round to the nearest cm.
            </p>
            <a href="/fit-quiz" className="line-link mt-4 inline-block text-[9px] tracking-[0.3em] uppercase text-[var(--gold)] no-underline">
              Take the Fit Quiz &rarr;
            </a>
          </div>
        </>
      )}
    </div>
  );
}
