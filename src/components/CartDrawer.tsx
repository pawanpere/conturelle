"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { products } from "@/lib/products";

export default function CartDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { items, removeItem, updateQuantity, addItem, total, count } = useCart();
  const [discountCode, setDiscountCode] = useState("");
  const [discountApplied, setDiscountApplied] = useState(false);
  const [showDiscount, setShowDiscount] = useState(false);

  const FREE_SHIPPING_THRESHOLD = 75;
  const shippingProgress = Math.min(total / FREE_SHIPPING_THRESHOLD, 1);
  const amountToFreeShipping = Math.max(FREE_SHIPPING_THRESHOLD - total, 0);
  const discountAmount = discountApplied ? total * 0.1 : 0;
  const finalTotal = total - discountAmount;

  const handleApplyDiscount = () => {
    if (discountCode.toUpperCase() === "WELCOME10" || discountCode.toUpperCase() === "FIRST10") {
      setDiscountApplied(true);
    }
  };

  // Upsell logic: find matching items not already in cart
  const cartSlugs = items.map((i) => i.slug);
  const getUpsellItems = () => {
    const hasBra = items.some((i) => i.slug.includes("bra") || i.slug.includes("set"));
    const hasBrief = items.some((i) => i.slug.includes("brief"));

    if (hasBra && !hasBrief) {
      const brief = products.find((p) => p.slug === "daily-comfort-brief" && !cartSlugs.includes(p.slug));
      if (brief) return [{ ...brief, upsellLabel: "Complete your set", upsellOffer: "Save 10% \u2014 add the match" }];
    }
    if (hasBrief && !hasBra) {
      const bra = products.find((p) => p.slug === "silhouette-spacer-bra" && !cartSlugs.includes(p.slug));
      if (bra) return [{ ...bra, upsellLabel: "Complete the set", upsellOffer: "Save 15% on the bra" }];
    }
    // Default: show bestseller not in cart
    const bestseller = products.find((p) => p.badge === "bestseller" && !cartSlugs.includes(p.slug));
    if (bestseller) return [{ ...bestseller, upsellLabel: "Bestseller pick", upsellOffer: "" }];
    return [];
  };

  // Free shipping suggestion
  const getFreeShippingItem = () => {
    if (total >= FREE_SHIPPING_THRESHOLD) return null;
    const cheapItems = products
      .filter((p) => !cartSlugs.includes(p.slug) && p.price + total >= FREE_SHIPPING_THRESHOLD)
      .sort((a, b) => a.price - b.price);
    return cheapItems[0] || null;
  };

  const upsellItems = getUpsellItems();
  const freeShipItem = total < FREE_SHIPPING_THRESHOLD ? getFreeShippingItem() : null;

  return (
    <>
      {open && <div className="fixed inset-0 bg-black/60 z-[300]" onClick={onClose} />}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-[var(--dark)] border-l border-[rgba(201,169,110,0.15)] z-[301] transform transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        } flex flex-col`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[rgba(201,169,110,0.1)]">
          <h2 className="font-[family-name:var(--font-cormorant)] text-2xl font-light text-[var(--cream)]">
            Your Cart ({count})
          </h2>
          <button onClick={onClose} className="bg-transparent border-none text-[var(--cream)] text-xl cursor-pointer">
            &times;
          </button>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <p className="text-center text-sm text-[rgba(245,239,232,0.4)] mt-20">Your cart is empty</p>
          ) : (
            <>
              {/* Free shipping progress bar */}
              <div className="mx-6 mt-4 p-3 border border-[rgba(201,169,110,0.15)] bg-[rgba(201,169,110,0.05)]">
                <p className={`text-[10px] tracking-[0.15em] uppercase text-center mb-2 ${
                  shippingProgress >= 1 ? "text-[var(--success)]" : "text-[var(--gold)]"
                }`}>
                  {shippingProgress >= 1
                    ? "You\u2019ve unlocked FREE SHIPPING!"
                    : `You\u2019re \u20ac${amountToFreeShipping.toFixed(0)} away from FREE SHIPPING!`}
                </p>
                <div className="h-1 bg-[rgba(245,239,232,0.1)] rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      shippingProgress >= 1 ? "bg-[var(--success)]" : "bg-[var(--gold)]"
                    }`}
                    style={{ width: `${shippingProgress * 100}%` }}
                  />
                </div>
                <p className="text-[8px] text-[rgba(245,239,232,0.3)] text-center mt-1.5">
                  &euro;{total.toFixed(0)} / &euro;{FREE_SHIPPING_THRESHOLD}
                </p>
              </div>

              {/* Cart items */}
              <div className="flex flex-col gap-4 px-6 py-4">
                {items.map((item, i) => (
                  <div key={i} className="flex gap-4 border-b border-[rgba(201,169,110,0.08)] pb-4">
                    <div className="w-16 h-20 bg-[var(--mid)] rounded-sm overflow-hidden flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-[family-name:var(--font-cormorant)] text-base text-[var(--cream)] truncate">
                        {item.name}
                      </p>
                      <p className="text-[9px] tracking-[0.15em] uppercase text-[rgba(245,239,232,0.35)] mt-0.5">
                        {item.color}
                        {item.bandSize ? ` \u00b7 ${item.bandSize}${item.cupSize}` : ""}
                        {item.size ? ` \u00b7 ${item.size}` : ""}
                      </p>
                      <div className="flex items-center gap-3 mt-2">
                        <button
                          onClick={() => updateQuantity(i, item.quantity - 1)}
                          className="w-6 h-6 border border-[rgba(201,169,110,0.2)] bg-transparent text-[var(--cream)] text-xs cursor-pointer"
                        >-</button>
                        <span className="text-xs text-[var(--cream)]">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(i, item.quantity + 1)}
                          className="w-6 h-6 border border-[rgba(201,169,110,0.2)] bg-transparent text-[var(--cream)] text-xs cursor-pointer"
                        >+</button>
                        <button
                          onClick={() => removeItem(i)}
                          className="ml-auto text-[9px] tracking-[0.15em] uppercase text-[rgba(245,239,232,0.3)] bg-transparent border-none cursor-pointer hover:text-[var(--sale-red)]"
                        >Remove</button>
                      </div>
                    </div>
                    <p className="font-[family-name:var(--font-cormorant)] text-lg text-[var(--gold)] flex-shrink-0">
                      &euro;{(item.price * item.quantity).toFixed(0)}
                    </p>
                  </div>
                ))}
              </div>

              {/* Cart upsell section */}
              {upsellItems.length > 0 && (
                <div className="px-6 mb-4">
                  <p className="text-[9px] tracking-[0.25em] uppercase text-[rgba(245,239,232,0.5)] mb-3">
                    Complete Your Order
                  </p>
                  {upsellItems.map((item) => (
                    <div key={item.slug} className="border border-[rgba(201,169,110,0.12)] bg-[rgba(201,169,110,0.04)] p-3 mb-2">
                      {item.upsellOffer && (
                        <p className="text-[8px] tracking-[0.2em] uppercase text-[var(--gold)] mb-2">
                          {item.upsellOffer}
                        </p>
                      )}
                      <div className="flex gap-3 items-center">
                        <div className="w-12 h-14 bg-[var(--mid)] rounded-sm overflow-hidden flex-shrink-0">
                          <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-[var(--cream)] truncate">{item.name}</p>
                          <p className="text-[9px] text-[rgba(245,239,232,0.4)]">{item.colors[0].name}</p>
                          <p className="font-[family-name:var(--font-cormorant)] text-sm text-[var(--gold)]">
                            &euro;{item.price}
                          </p>
                        </div>
                        <button
                          onClick={() => {
                            addItem({
                              slug: item.slug,
                              name: item.name,
                              price: item.price,
                              color: item.colors[0].name,
                              quantity: 1,
                              image: item.images[0],
                            });
                          }}
                          className="text-[8px] tracking-[0.2em] uppercase py-2 px-3 border border-[var(--gold)] text-[var(--gold)] bg-transparent cursor-pointer hover:bg-[var(--gold)] hover:text-[var(--dark)] transition-all whitespace-nowrap"
                        >
                          + Add
                        </button>
                      </div>
                    </div>
                  ))}

                  {freeShipItem && !upsellItems.some((u) => u.slug === freeShipItem.slug) && (
                    <div className="border border-[rgba(201,169,110,0.12)] bg-[rgba(74,24,37,0.15)] p-3 mt-2">
                      <p className="text-[8px] tracking-[0.2em] uppercase text-[var(--terracotta)] mb-2">
                        Add &euro;{amountToFreeShipping.toFixed(0)} more for FREE shipping
                      </p>
                      <div className="flex gap-3 items-center">
                        <div className="w-10 h-12 bg-[var(--mid)] rounded-sm overflow-hidden flex-shrink-0">
                          <img src={freeShipItem.images[0]} alt={freeShipItem.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-[var(--cream)] truncate">{freeShipItem.name}</p>
                          <p className="font-[family-name:var(--font-cormorant)] text-sm text-[var(--gold)]">&euro;{freeShipItem.price}</p>
                        </div>
                        <Link
                          href={`/product/${freeShipItem.slug}`}
                          className="text-[8px] tracking-[0.15em] uppercase text-[var(--gold)] no-underline hover:text-[var(--cream)]"
                        >
                          View &rarr;
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer / checkout section */}
        {items.length > 0 && (
          <div className="px-6 py-5 border-t border-[rgba(201,169,110,0.1)]">
            {/* Discount code */}
            <div className="mb-4">
              {!showDiscount ? (
                <button
                  onClick={() => setShowDiscount(true)}
                  className="text-[9px] tracking-[0.15em] uppercase text-[rgba(245,239,232,0.4)] bg-transparent border-none cursor-pointer hover:text-[var(--gold)] underline"
                >
                  Got a discount code?
                </button>
              ) : (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={discountCode}
                    onChange={(e) => setDiscountCode(e.target.value)}
                    placeholder="Enter code"
                    className="flex-1 py-2 px-3 bg-[rgba(21,8,16,0.6)] border border-[rgba(201,169,110,0.15)] text-[var(--cream)] text-xs tracking-[0.05em] outline-none placeholder:text-[rgba(245,239,232,0.3)] focus:border-[var(--gold)]"
                  />
                  <button
                    onClick={handleApplyDiscount}
                    className="py-2 px-4 bg-[var(--burgundy)] border border-[var(--burgundy)] text-[8px] tracking-[0.2em] uppercase text-[var(--cream)] cursor-pointer hover:bg-transparent hover:border-[var(--rose)] transition-all"
                  >
                    Apply
                  </button>
                </div>
              )}
              {discountApplied && (
                <p className="text-[9px] text-[var(--success)] mt-1.5 tracking-[0.1em]">
                  WELCOME10 applied \u2014 10% off!
                </p>
              )}
            </div>

            {/* Order summary */}
            <div className="flex flex-col gap-1.5 mb-4">
              <div className="flex justify-between text-[10px] text-[rgba(245,239,232,0.5)]">
                <span>Subtotal</span>
                <span>&euro;{total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[10px] text-[rgba(245,239,232,0.5)]">
                <span>Shipping</span>
                <span className={total >= FREE_SHIPPING_THRESHOLD ? "text-[var(--success)]" : ""}>
                  {total >= FREE_SHIPPING_THRESHOLD ? "Free" : "Calculated at checkout"}
                </span>
              </div>
              {discountApplied && (
                <div className="flex justify-between text-[10px] text-[var(--success)]">
                  <span>Discount (10%)</span>
                  <span>-&euro;{discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="border-t border-[rgba(201,169,110,0.06)] pt-2 mt-1 flex justify-between items-center">
                <span className="text-[10px] tracking-[0.25em] uppercase text-[var(--cream)]">Total</span>
                <span className="font-[family-name:var(--font-cormorant)] text-xl text-[var(--gold)]">&euro;{finalTotal.toFixed(2)}</span>
              </div>
              <p className="text-[9px] text-[rgba(245,239,232,0.3)] text-right">
                or 4 &times; &euro;{(finalTotal / 4).toFixed(2)} with Klarna
              </p>
            </div>

            {/* Checkout button */}
            <Link
              href="/checkout"
              onClick={onClose}
              className="block w-full py-4 bg-[var(--gold)] text-center text-[9px] tracking-[0.35em] uppercase text-[var(--dark)] font-medium no-underline transition-all hover:bg-[var(--cream)]"
            >
              Checkout &mdash; &euro;{finalTotal.toFixed(2)}
            </Link>

            <button
              onClick={onClose}
              className="block w-full mt-2 py-2 text-center text-[9px] tracking-[0.2em] uppercase text-[rgba(245,239,232,0.4)] bg-transparent border-none cursor-pointer hover:text-[var(--cream)]"
            >
              Continue Shopping
            </button>

            {/* Trust signals */}
            <div className="flex flex-col items-center gap-1.5 mt-3 text-[8px] tracking-[0.15em] uppercase text-[rgba(245,239,232,0.25)]">
              <span>&#10003; Free returns &middot; &#128274; Secure checkout</span>
              <span>&#10003; Crafted in Europe since 1885</span>
            </div>

            {/* Express checkout */}
            <div className="mt-4 pt-3 border-t border-[rgba(201,169,110,0.06)]">
              <p className="text-[8px] tracking-[0.15em] uppercase text-[rgba(245,239,232,0.3)] text-center mb-2">
                Express Checkout
              </p>
              <div className="flex gap-2">
                {[
                  { name: "PayPal", bg: "#FFC439", color: "#003087" },
                  { name: "Klarna", bg: "#FFB3C7", color: "#0A0B09" },
                  { name: "G Pay", bg: "#fff", color: "#3C4043" },
                ].map((m) => (
                  <button
                    key={m.name}
                    className="flex-1 py-2.5 text-[9px] font-medium cursor-pointer border-none rounded-sm transition-opacity hover:opacity-80"
                    style={{ background: m.bg, color: m.color }}
                  >
                    {m.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
