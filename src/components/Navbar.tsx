"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import CartDrawer from "./CartDrawer";

export default function Navbar() {
  const { count, isOpen, setIsOpen } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav className={`fixed top-9 left-0 right-0 z-[100] px-6 md:px-12 py-4 flex items-center justify-between transition-all duration-300 ${scrolled ? "bg-[var(--dark)]/90 backdrop-blur-md shadow-[0_1px_0_rgba(201,169,110,0.1)]" : ""}`}>
        <Link href="/" className="no-underline shrink-0">
          <span className="font-[family-name:var(--font-cormorant)] text-[24px] md:text-[28px] tracking-[0.03em] italic font-light text-[var(--cream)] leading-none">
            Conturelle
          </span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden lg:flex items-center gap-8 list-none whitespace-nowrap ml-12">
          {[
            { href: "/#collection", label: "Shop" },
            { href: "/#categories", label: "Categories" },
            { href: "/#heritage", label: "Story" },
            { href: "/fit-quiz", label: "Fit Finder" },
          ].map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-[11px] tracking-[0.12em] uppercase text-[rgba(245,239,232,0.55)] no-underline transition-colors hover:text-[var(--gold)] whitespace-nowrap"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4 shrink-0 ml-auto">
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
            className="lg:hidden bg-transparent border-none cursor-pointer flex flex-col gap-1.5"
            aria-label="Menu"
          >
            <span className={`block w-5 h-px bg-[var(--cream)] transition-transform ${mobileOpen ? "rotate-45 translate-y-[3px]" : ""}`} />
            <span className={`block w-5 h-px bg-[var(--cream)] transition-opacity ${mobileOpen ? "opacity-0" : ""}`} />
            <span className={`block w-5 h-px bg-[var(--cream)] transition-transform ${mobileOpen ? "-rotate-45 -translate-y-[3px]" : ""}`} />
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="fixed inset-0 z-[99] bg-[var(--dark)] pt-32 px-8 flex flex-col gap-8 lg:hidden">
          {[
            { href: "/#collection", label: "Shop" },
            { href: "/#categories", label: "Categories" },
            { href: "/#heritage", label: "Story" },
            { href: "/fit-quiz", label: "Fit Finder" },
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
