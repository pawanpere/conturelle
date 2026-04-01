"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

export default function MobileBottomNav() {
  const { count, setIsOpen } = useCart();
  const wishlist = useWishlist();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-[150] bg-[var(--bg)] border-t border-[var(--border)] lg:hidden" style={{ padding: "8px 0 calc(8px + env(safe-area-inset-bottom))" }}>
      <div className="flex items-center justify-around h-14">
        <Link href="/" className="flex flex-col items-center gap-0.5 text-[var(--text-muted)]">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
          <span className="text-[10px] tracking-[0.04em]">Home</span>
        </Link>

        <Link href="/search" className="flex flex-col items-center gap-0.5 text-[var(--text-muted)]">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
          <span className="text-[10px] tracking-[0.04em]">Search</span>
        </Link>

        <Link href="/wishlist" className="flex flex-col items-center gap-0.5 text-[var(--text-muted)] relative">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
          {wishlist.count > 0 && (
            <span className="absolute -top-0.5 right-2 w-3.5 h-3.5 bg-[var(--text)] text-[var(--bg)] text-[9px] flex items-center justify-center rounded-full">
              {wishlist.count}
            </span>
          )}
          <span className="text-[10px] tracking-[0.04em]">Wishlist</span>
        </Link>

        <button
          onClick={() => setIsOpen(true)}
          className="flex flex-col items-center gap-0.5 text-[var(--text-muted)] relative"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 01-8 0" />
          </svg>
          {count > 0 && (
            <span className="absolute -top-0.5 right-2 w-3.5 h-3.5 bg-[var(--text)] text-[var(--bg)] text-[9px] flex items-center justify-center rounded-full">
              {count}
            </span>
          )}
          <span className="text-[10px] tracking-[0.04em]">Cart</span>
        </button>
      </div>
    </nav>
  );
}
