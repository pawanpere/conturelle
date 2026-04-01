"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function MobileBottomNav() {
  const { count, setIsOpen } = useCart();

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-[150] bg-[var(--dark)] border-t border-[rgba(201,169,110,0.15)] flex justify-around" style={{ padding: "8px 0 calc(8px + env(safe-area-inset-bottom))" }}>
      <Link href="/" className="flex flex-col items-center gap-0.5 text-[9px] tracking-[0.1em] uppercase text-[rgba(245,239,232,0.4)] no-underline min-w-[60px] min-h-[44px] justify-center">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
        Home
      </Link>
      <Link href="/#categories" className="flex flex-col items-center gap-0.5 text-[9px] tracking-[0.1em] uppercase text-[rgba(245,239,232,0.4)] no-underline min-w-[60px] min-h-[44px] justify-center">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        Search
      </Link>
      <Link href="/#collection" className="flex flex-col items-center gap-0.5 text-[9px] tracking-[0.1em] uppercase text-[rgba(245,239,232,0.4)] no-underline min-w-[60px] min-h-[44px] justify-center">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
        </svg>
        Wishlist
      </Link>
      <button
        onClick={() => setIsOpen(true)}
        className="relative flex flex-col items-center gap-0.5 text-[9px] tracking-[0.1em] uppercase text-[rgba(245,239,232,0.4)] bg-transparent border-none cursor-pointer min-w-[60px] min-h-[44px] justify-center"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <path d="M16 10a4 4 0 01-8 0" />
        </svg>
        Cart
        {count > 0 && (
          <span className="absolute top-0 right-2 w-4 h-4 bg-[var(--sale-red)] text-white text-[7px] rounded-full flex items-center justify-center">
            {count}
          </span>
        )}
      </button>
    </div>
  );
}
