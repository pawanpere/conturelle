"use client";

import { useState } from "react";
import Link from "next/link";
import { Product } from "@/lib/products";
import { useCart } from "@/context/CartContext";
import ProductCard from "@/components/ProductCard";

const reviews = [
  { stars: 5, title: "Perfect fit!", text: "I've tried so many brands and this is the first one that truly fits. The spacer cups are a game changer.", author: "Sarah M.", size: "80D", verified: true },
  { stars: 5, title: "Best everyday bra", text: "Comfortable enough to wear all day. The quality is outstanding for the price.", author: "Anna K.", size: "75C", verified: true },
  { stars: 4, title: "Beautiful lace", text: "The embroidery is even more beautiful in person. Runs slightly small in the band.", author: "Maria L.", size: "85E", verified: true },
  { stars: 5, title: "Converted for life", text: "My third Conturelle purchase. The European craftsmanship really shows.", author: "Julia W.", size: "90D", verified: true },
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

  const isBra = product.bandSizes.length > 0;

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
  };

  const canAdd = isBra ? selectedBand && selectedCup : true;

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
          <div className="flex-1 aspect-[3/4] overflow-hidden bg-[var(--mid)] rounded-sm">
            <img src={product.images[selectedImage]} alt={product.name} className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Buy box */}
        <div className="flex flex-col">
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

          <div className="flex items-center gap-2 mt-4">
            <span className="text-[var(--star-gold)] text-sm">&#9733;&#9733;&#9733;&#9733;&#9733;</span>
            <span className="text-xs text-[rgba(245,239,232,0.5)]">{product.rating}/5</span>
            <span className="text-xs text-[rgba(245,239,232,0.3)]">({product.reviewCount} reviews)</span>
          </div>

          <div className="flex items-center gap-3 mt-6">
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
                    className={`w-12 h-10 text-xs cursor-pointer border transition-all rounded-sm ${
                      selectedBand === s
                        ? "bg-[var(--burgundy)] text-[var(--cream)] border-[var(--burgundy)]"
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
                    className={`w-12 h-10 text-xs cursor-pointer border transition-all rounded-sm ${
                      selectedCup === s
                        ? "bg-[var(--burgundy)] text-[var(--cream)] border-[var(--burgundy)]"
                        : "bg-transparent text-[var(--cream)] border-[rgba(201,169,110,0.2)] hover:border-[var(--gold)]"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="mt-6">
              <p className="text-[9px] tracking-[0.25em] uppercase text-[rgba(245,239,232,0.5)] mb-3">Size (EU):</p>
              <div className="flex gap-2 flex-wrap">
                {[36, 38, 40, 42, 44, 46, 48].map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(String(s))}
                    className={`w-12 h-10 text-xs cursor-pointer border transition-all rounded-sm ${
                      selectedSize === String(s)
                        ? "bg-[var(--burgundy)] text-[var(--cream)] border-[var(--burgundy)]"
                        : "bg-transparent text-[var(--cream)] border-[rgba(201,169,110,0.2)] hover:border-[var(--gold)]"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={handleAddToCart}
            disabled={!canAdd}
            className="mt-8 w-full py-4 bg-[var(--burgundy)] border border-[var(--burgundy)] text-[9px] tracking-[0.35em] uppercase text-[var(--cream)] cursor-pointer transition-all hover:bg-transparent hover:border-[var(--rose)] hover:text-[var(--rose)] disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {canAdd ? "Add to Cart" : isBra ? "Select Band & Cup Size" : "Add to Cart"}
          </button>

          <div className="flex flex-wrap gap-4 mt-4 text-[8px] tracking-[0.15em] uppercase text-[rgba(245,239,232,0.3)]">
            <span>Free Shipping Over &euro;75</span>
            <span>&middot;</span>
            <span>30-Day Returns</span>
            <span>&middot;</span>
            <span>Secure Checkout</span>
          </div>

          <div className="w-full h-px bg-[rgba(201,169,110,0.1)] my-6" />

          {/* Accordions */}
          {[
            { id: "benefits", title: "Key Benefits", content: (
              <ul className="list-none flex flex-col gap-2">
                {product.details.map((d, i) => (
                  <li key={i} className="text-[11px] text-[rgba(245,239,232,0.5)] leading-relaxed flex gap-2">
                    <span className="text-[var(--success)]">&#10003;</span> {d}
                  </li>
                ))}
              </ul>
            )},
            { id: "description", title: "Description", content: (
              <p className="text-[11px] text-[rgba(245,239,232,0.5)] leading-loose">{product.description}</p>
            )},
            { id: "materials", title: "Materials & Care", content: (
              <div className="text-[11px] text-[rgba(245,239,232,0.5)] leading-loose">
                <p><strong className="text-[var(--cream)]">Material:</strong> {product.material}</p>
                <p className="mt-2"><strong className="text-[var(--cream)]">Care:</strong> Hand wash recommended. Do not bleach. Lay flat to dry.</p>
                <p className="mt-2"><strong className="text-[var(--cream)]">Certification:</strong> OEKO-TEX&reg; Standard 100</p>
              </div>
            )},
            { id: "shipping", title: "Shipping & Returns", content: (
              <div className="text-[11px] text-[rgba(245,239,232,0.5)] leading-loose">
                <p>Free shipping on orders over &euro;75. Standard delivery 3-5 business days.</p>
                <p className="mt-2">30-day hassle-free returns. Items must be unworn with tags attached.</p>
                <p className="mt-2">We ship across Europe from our warehouse in Germany.</p>
              </div>
            )},
          ].map((acc) => (
            <div key={acc.id} className="border-b border-[rgba(201,169,110,0.06)]">
              <button
                onClick={() => setOpenAccordion(openAccordion === acc.id ? null : acc.id)}
                className="w-full py-4 flex justify-between items-center bg-transparent border-none cursor-pointer text-left"
              >
                <span className="text-[10px] tracking-[0.25em] uppercase text-[var(--cream)]">{acc.title}</span>
                <span className="text-[var(--gold)] text-lg">{openAccordion === acc.id ? "\u2212" : "+"}</span>
              </button>
              {openAccordion === acc.id && <div className="pb-4">{acc.content}</div>}
            </div>
          ))}
        </div>
      </div>

      {/* Cross-sell */}
      {isBra && (
        <div className="px-6 md:px-12 max-w-[1400px] mx-auto mb-16">
          <div className="bg-[var(--mid)] border border-[rgba(201,169,110,0.1)] p-6 md:p-8 text-center rounded-sm">
            <p className="text-[9px] tracking-[0.3em] uppercase text-[var(--gold)] mb-2">
              Save 15% &mdash; Buy the Set
            </p>
            <p className="font-[family-name:var(--font-cormorant)] text-xl text-[var(--cream)]">
              Bra + Brief: <span className="line-through text-[rgba(245,239,232,0.3)]">&euro;{product.price + 39}</span>{" "}
              <span className="text-[var(--gold)]">&euro;{Math.round((product.price + 39) * 0.85)}</span>
            </p>
            <button
              onClick={() => {
                addItem({
                  slug: product.slug + "-set",
                  name: product.name + " + Brief Set",
                  price: Math.round((product.price + 39) * 0.85),
                  color: product.colors[selectedColor]?.name || product.colors[0].name,
                  bandSize: selectedBand ?? undefined,
                  cupSize: selectedCup ?? undefined,
                  quantity: 1,
                  image: product.images[0],
                });
              }}
              className="mt-4 py-3 px-10 bg-[var(--burgundy)] border border-[var(--burgundy)] text-[9px] tracking-[0.35em] uppercase text-[var(--cream)] cursor-pointer transition-all hover:bg-transparent hover:border-[var(--rose)] hover:text-[var(--rose)]"
            >
              Add Set to Cart
            </button>
          </div>
        </div>
      )}

      {/* Reviews */}
      <section className="px-6 md:px-12 max-w-[1400px] mx-auto mb-20">
        <div className="flex items-end gap-6 mb-10">
          <h2 className="font-[family-name:var(--font-cormorant)] text-[36px] font-light text-[var(--cream)]">
            Customer <em className="italic text-[var(--terracotta)]">Reviews</em>
          </h2>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[var(--star-gold)] text-sm">&#9733;&#9733;&#9733;&#9733;&#9733;</span>
            <span className="text-xs text-[rgba(245,239,232,0.5)]">{product.rating}/5 ({product.reviewCount} reviews)</span>
          </div>
        </div>

        <div className="mb-8 flex items-center gap-4">
          <span className="text-[9px] tracking-[0.2em] uppercase text-[rgba(245,239,232,0.5)]">Fit:</span>
          <div className="flex-1 max-w-[300px] h-1 bg-[rgba(201,169,110,0.1)] relative rounded-full">
            <div className="absolute left-[48%] top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[var(--gold)]" />
          </div>
          <div className="flex gap-8 text-[8px] tracking-[0.15em] uppercase text-[rgba(245,239,232,0.3)]">
            <span>Runs Small</span>
            <span className="text-[var(--cream)]">True to Size</span>
            <span>Runs Large</span>
          </div>
        </div>

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
              <p className="text-[9px] tracking-[0.15em] uppercase text-[rgba(245,239,232,0.3)]">
                {review.author} &middot; Size {review.size}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* You May Also Love */}
      <section className="px-6 md:px-12 max-w-[1400px] mx-auto pb-20">
        <h2 className="font-[family-name:var(--font-cormorant)] text-[36px] font-light text-[var(--cream)] mb-10">
          You May Also <em className="italic text-[var(--terracotta)]">Love</em>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {relatedProducts.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>

      {/* Sticky mobile ATC */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-[50] bg-[var(--dark)] border-t border-[rgba(201,169,110,0.1)] px-4 py-3 flex items-center justify-between gap-4 shadow-lg">
        <div>
          <p className="font-[family-name:var(--font-cormorant)] text-lg text-[var(--cream)]">{product.name}</p>
          <p className={`font-[family-name:var(--font-cormorant)] text-xl ${product.originalPrice ? "text-[var(--sale-red)]" : "text-[var(--gold)]"}`}>
            &euro;{product.price}
          </p>
        </div>
        <button
          onClick={handleAddToCart}
          disabled={!canAdd}
          className="py-3 px-6 bg-[var(--burgundy)] border border-[var(--burgundy)] text-[9px] tracking-[0.3em] uppercase text-[var(--cream)] cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap"
        >
          Add to Cart
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
            <a href="#" className="line-link mt-4 inline-block text-[9px] tracking-[0.3em] uppercase text-[var(--gold)] no-underline">
              Take the Fit Quiz &rarr;
            </a>
          </div>
        </>
      )}
    </div>
  );
}
