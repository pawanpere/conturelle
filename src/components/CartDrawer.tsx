"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function CartDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { items, removeItem, updateQuantity, total, count } = useCart();

  return (
    <>
      {open && <div className="fixed inset-0 bg-black/60 z-[300]" onClick={onClose} />}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-[var(--dark)] border-l border-[rgba(201,169,110,0.15)] z-[301] transform transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        } flex flex-col`}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-[rgba(201,169,110,0.1)]">
          <h2 className="font-[family-name:var(--font-cormorant)] text-2xl font-light text-[var(--cream)]">
            Your Cart ({count})
          </h2>
          <button onClick={onClose} className="bg-transparent border-none text-[var(--cream)] text-xl cursor-pointer">
            &times;
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <p className="text-center text-sm text-[rgba(245,239,232,0.4)] mt-20">Your cart is empty</p>
          ) : (
            <div className="flex flex-col gap-4">
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
          )}
        </div>

        {items.length > 0 && (
          <div className="px-6 py-5 border-t border-[rgba(201,169,110,0.1)]">
            {total < 75 && (
              <p className="text-[9px] tracking-[0.15em] uppercase text-[var(--terracotta)] text-center mb-3">
                Add &euro;{(75 - total).toFixed(0)} more for free shipping
              </p>
            )}
            {total >= 75 && (
              <p className="text-[9px] tracking-[0.15em] uppercase text-[var(--success)] text-center mb-3">
                You qualify for free shipping!
              </p>
            )}
            <div className="flex justify-between items-center mb-4">
              <span className="text-[10px] tracking-[0.25em] uppercase text-[rgba(245,239,232,0.5)]">Subtotal</span>
              <span className="font-[family-name:var(--font-cormorant)] text-xl text-[var(--gold)]">&euro;{total.toFixed(2)}</span>
            </div>
            <Link
              href="/checkout"
              onClick={onClose}
              className="block w-full py-4 bg-[var(--burgundy)] border border-[var(--burgundy)] text-center text-[9px] tracking-[0.35em] uppercase text-[var(--cream)] no-underline transition-all hover:bg-transparent hover:border-[var(--rose)] hover:text-[var(--rose)]"
            >
              Proceed to Checkout
            </Link>
            <p className="text-center mt-3 text-[8px] tracking-[0.15em] text-[rgba(245,239,232,0.25)]">
              Secure Checkout &middot; OEKO-TEX&reg; Certified &middot; Made in Europe
            </p>
          </div>
        )}
      </div>
    </>
  );
}
