"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { products } from "@/lib/products";

export default function CartDrawer() {
  const { items, removeItem, updateQuantity, addItem, total, count, isOpen, setIsOpen } = useCart();
  const [discountCode, setDiscountCode] = useState("");
  const [discountApplied, setDiscountApplied] = useState(false);
  const [showDiscount, setShowDiscount] = useState(false);

  const onClose = () => setIsOpen(false);

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

  const cartSlugs = items.map((i) => i.slug);
  const getUpsellItems = () => {
    const hasBra = items.some((i) => i.slug.includes("bra"));
    const hasBrief = items.some((i) => i.slug.includes("brief") || i.slug.includes("panty"));

    if (hasBra && !hasBrief) {
      const brief = products.find((p) => p.productType === "brief" && !cartSlugs.includes(p.slug));
      if (brief) return [{ ...brief, upsellLabel: "Complete your set", upsellOffer: "Add the matching brief" }];
    }
    if (hasBrief && !hasBra) {
      const bra = products.find((p) => p.badge === "bestseller" && p.productType.includes("bra") && !cartSlugs.includes(p.slug));
      if (bra) return [{ ...bra, upsellLabel: "Complete the set", upsellOffer: "Pair with a bestselling bra" }];
    }
    const bestseller = products.find((p) => p.badge === "bestseller" && !cartSlugs.includes(p.slug));
    if (bestseller) return [{ ...bestseller, upsellLabel: "Bestseller pick", upsellOffer: "" }];
    return [];
  };

  const upsellItems = getUpsellItems();

  return (
    <>
      {isOpen && <div className="fixed inset-0 bg-black/30 z-[300]" onClick={onClose} />}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-[var(--bg)] border-l border-[var(--border)] z-[301] transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } flex flex-col`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[var(--border)]">
          <h2 className="font-[family-name:var(--font-cormorant)] text-2xl font-light text-[var(--text)]">
            Your Cart ({count})
          </h2>
          <button onClick={onClose} className="text-[var(--text-muted)] hover:text-[var(--text)] transition-colors" aria-label="Close cart">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 px-6">
              <p className="text-sm text-[var(--text-muted)]">Your cart is empty</p>
              <Link
                href="/shop"
                onClick={onClose}
                className="text-xs tracking-[0.06em] uppercase text-[var(--text)] border-b border-[var(--text)]"
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <>
              {/* Free shipping progress bar */}
              <div className="mx-6 mt-4 p-3 border border-[var(--border)] bg-[var(--bg-card)]">
                <p className={`text-[10px] tracking-[0.06em] uppercase text-center mb-2 ${
                  shippingProgress >= 1 ? "text-[var(--success)]" : "text-[var(--accent)]"
                }`}>
                  {shippingProgress >= 1
                    ? "You\u2019ve unlocked FREE SHIPPING!"
                    : `$${amountToFreeShipping.toFixed(0)} away from FREE SHIPPING`}
                </p>
                <div className="h-1 bg-[var(--border)] rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      shippingProgress >= 1 ? "bg-[var(--success)]" : "bg-[var(--accent)]"
                    }`}
                    style={{ width: `${shippingProgress * 100}%` }}
                  />
                </div>
              </div>

              {/* Cart items */}
              <div className="flex flex-col gap-4 px-6 py-4">
                {items.map((item, i) => (
                  <div key={i} className="flex gap-4 border-b border-[var(--border-faint)] pb-4">
                    <div className="w-16 h-20 bg-[var(--bg-subtle)] overflow-hidden flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-[family-name:var(--font-cormorant)] text-base text-[var(--text)] truncate">
                        {item.name}
                      </p>
                      <p className="text-[10px] tracking-[0.04em] text-[var(--text-faint)] mt-0.5">
                        {item.color}
                        {item.size ? ` · ${item.size}` : ""}
                        {item.bandSize ? ` · ${item.bandSize}${item.cupSize}` : ""}
                      </p>
                      <div className="flex items-center gap-3 mt-2">
                        <button
                          onClick={() => updateQuantity(i, item.quantity - 1)}
                          className="w-6 h-6 border border-[var(--border)] text-[var(--text)] text-xs"
                        >-</button>
                        <span className="text-xs text-[var(--text)]">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(i, item.quantity + 1)}
                          className="w-6 h-6 border border-[var(--border)] text-[var(--text)] text-xs"
                        >+</button>
                        <button
                          onClick={() => removeItem(i)}
                          className="ml-auto text-[10px] tracking-[0.04em] text-[var(--text-faint)] hover:text-[var(--sale-red)] transition-colors"
                        >Remove</button>
                      </div>
                    </div>
                    <p className="font-[family-name:var(--font-cormorant)] text-lg text-[var(--text)] flex-shrink-0">
                      ${(item.price * item.quantity).toFixed(0)}
                    </p>
                  </div>
                ))}
              </div>

              {/* Cart upsell */}
              {upsellItems.length > 0 && (
                <div className="px-6 mb-4">
                  <p className="text-[10px] tracking-[0.06em] uppercase text-[var(--text-muted)] mb-3">
                    Complete Your Order
                  </p>
                  {upsellItems.map((item) => (
                    <div key={item.slug} className="border border-[var(--border)] bg-[var(--bg-card)] p-3 mb-2">
                      {item.upsellOffer && (
                        <p className="text-[10px] tracking-[0.04em] text-[var(--accent)] mb-2">{item.upsellOffer}</p>
                      )}
                      <div className="flex gap-3 items-center">
                        <div className="w-12 h-14 bg-[var(--bg-subtle)] overflow-hidden flex-shrink-0">
                          <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-[var(--text)] truncate">{item.name}</p>
                          <p className="font-[family-name:var(--font-cormorant)] text-sm text-[var(--text)]">${item.price}</p>
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
                          className="text-[10px] tracking-[0.04em] uppercase py-2 px-3 border border-[var(--text)] text-[var(--text)] bg-transparent hover:bg-[var(--text)] hover:text-[var(--bg)] transition-all whitespace-nowrap"
                        >
                          + Add
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer / checkout section */}
        {items.length > 0 && (
          <div className="px-6 py-5 border-t border-[var(--border)]">
            {/* Discount code */}
            <div className="mb-4">
              {!showDiscount ? (
                <button
                  onClick={() => setShowDiscount(true)}
                  className="text-[10px] tracking-[0.04em] text-[var(--text-faint)] hover:text-[var(--text)] transition-colors underline"
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
                    className="flex-1 py-2 px-3 bg-[var(--bg-card)] border border-[var(--border)] text-[var(--text)] text-xs outline-none placeholder:text-[var(--text-faint)] focus:border-[var(--accent)]"
                  />
                  <button
                    onClick={handleApplyDiscount}
                    className="py-2 px-4 bg-[var(--text)] text-[10px] tracking-[0.04em] uppercase text-[var(--bg)] hover:opacity-90 transition-opacity"
                  >
                    Apply
                  </button>
                </div>
              )}
              {discountApplied && (
                <p className="text-[10px] text-[var(--success)] mt-1.5">WELCOME10 applied — 10% off!</p>
              )}
            </div>

            {/* Order summary */}
            <div className="flex flex-col gap-1.5 mb-4">
              <div className="flex justify-between text-[11px] text-[var(--text-muted)]">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[11px] text-[var(--text-muted)]">
                <span>Shipping</span>
                <span className={total >= FREE_SHIPPING_THRESHOLD ? "text-[var(--success)]" : ""}>
                  {total >= FREE_SHIPPING_THRESHOLD ? "Free" : "Calculated at checkout"}
                </span>
              </div>
              {discountApplied && (
                <div className="flex justify-between text-[11px] text-[var(--success)]">
                  <span>Discount (10%)</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="border-t border-[var(--border)] pt-2 mt-1 flex justify-between items-center">
                <span className="text-[11px] tracking-[0.06em] uppercase text-[var(--text)]">Total</span>
                <span className="font-[family-name:var(--font-cormorant)] text-xl text-[var(--text)]">${finalTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Checkout button */}
            <Link
              href="/checkout"
              onClick={onClose}
              className="block w-full py-4 bg-[var(--text)] text-center text-[11px] tracking-[0.08em] uppercase text-[var(--bg)] font-medium transition-opacity hover:opacity-90"
            >
              Checkout — ${finalTotal.toFixed(2)}
            </Link>

            <button
              onClick={onClose}
              className="block w-full mt-2 py-2 text-center text-[11px] tracking-[0.04em] text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
            >
              Continue Shopping
            </button>

            <div className="flex flex-col items-center gap-1 mt-3 text-[10px] text-[var(--text-faint)]">
              <span>Free returns · Secure checkout</span>
              <span>Crafted in Europe since 1885</span>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
