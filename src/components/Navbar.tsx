"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import CartDrawer from "./CartDrawer";

export default function Navbar() {
  const { count, isOpen, setIsOpen } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-9 left-0 right-0 z-[100] px-6 md:px-12 py-5 flex items-start justify-between">
        <Link href="/" className="no-underline">
          <div className="font-[family-name:var(--font-cormorant)] text-[var(--cream)]">
            <span className="block text-[28px] md:text-[32px] tracking-[0.05em] italic font-light leading-none">
              Conturelle
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 gap-10 list-none">
          {[
            { href: "/#collection", label: "Shop All" },
            { href: "/#categories", label: "Categories" },
            { href: "/#heritage", label: "Our Story" },
            { href: "/#fit-finder", label: "Fit Finder" },
          ].map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-[10px] tracking-[0.25em] uppercase text-[rgba(245,239,232,0.55)] no-underline transition-colors hover:text-[var(--gold)]"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsOpen(true)}
            className="relative bg-transparent border-none cursor-pointer text-[var(--cream)]"
            aria-label="Shopping Cart"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>
            {count > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-[var(--gold)] text-[var(--dark)] text-[8px] font-medium rounded-full flex items-center justify-center">
                {count}
              </span>
            )}
          </button>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden bg-transparent border-none cursor-pointer flex flex-col gap-1.5"
            aria-label="Menu"
          >
            <span className={`block w-5 h-px bg-[var(--cream)] transition-transform ${mobileOpen ? "rotate-45 translate-y-[3px]" : ""}`} />
            <span className={`block w-5 h-px bg-[var(--cream)] transition-opacity ${mobileOpen ? "opacity-0" : ""}`} />
            <span className={`block w-5 h-px bg-[var(--cream)] transition-transform ${mobileOpen ? "-rotate-45 -translate-y-[3px]" : ""}`} />
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="fixed inset-0 z-[99] bg-[var(--dark)] pt-32 px-8 flex flex-col gap-8 md:hidden">
          {[
            { href: "/#collection", label: "Shop All" },
            { href: "/#categories", label: "Categories" },
            { href: "/#heritage", label: "Our Story" },
            { href: "/#fit-finder", label: "Fit Finder" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="font-[family-name:var(--font-cormorant)] text-3xl text-[var(--cream)] no-underline"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}

      <CartDrawer open={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
