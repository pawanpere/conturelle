"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import CartDrawer from "./CartDrawer";

interface MegaMenuCategory {
  title: string;
  links: { label: string; href: string }[];
}

interface MegaMenuImage {
  src: string;
  alt: string;
  label: string;
  href: string;
}

interface NavItem {
  label: string;
  href: string;
  megaMenu?: {
    categories: MegaMenuCategory[];
    images: MegaMenuImage[];
  };
}

const navItems: NavItem[] = [
  {
    label: "Shop",
    href: "/shop",
    megaMenu: {
      categories: [
        {
          title: "By Style",
          links: [
            { label: "All Products", href: "/shop" },
            { label: "Embroidery", href: "/shop?style=embroidery" },
            { label: "Lace", href: "/shop?style=lace" },
            { label: "Daily Essentials", href: "/shop?style=daily" },
            { label: "Shape & Contour", href: "/shop?style=shape" },
            { label: "Corsetry", href: "/shop?style=corsetry" },
          ],
        },
        {
          title: "Featured",
          links: [
            { label: "New Arrivals", href: "/shop?filter=new" },
            { label: "Bestsellers", href: "/shop?filter=bestseller" },
            { label: "TENCEL™ Collection", href: "/collections/beyond-basic" },
          ],
        },
      ],
      images: [
        { src: "/images/205225_280225_722_22719.jpg", alt: "Lovely Lotus Collection", label: "Lovely Lotus", href: "/collections/lovely-lotus" },
        { src: "/images/202223_213223_004_4869-1-1024x683.jpg", alt: "Beyond Basic TENCEL™", label: "Beyond Basic", href: "/collections/beyond-basic" },
        { src: "/images/80505_81005_528_3354-1024x768.jpg", alt: "Provence Embroidery", label: "Provence", href: "/collections/provence" },
      ],
    },
  },
  {
    label: "Bras",
    href: "/shop?type=bra",
    megaMenu: {
      categories: [
        {
          title: "All Bras",
          links: [
            { label: "All Bras", href: "/shop?type=bra" },
            { label: "Wired Bras", href: "/shop?type=wired-bra" },
            { label: "Wireless Bras", href: "/shop?type=wireless-bra" },
            { label: "Spacer Bras", href: "/shop?type=spacer-bra" },
            { label: "Molded Bras", href: "/shop?type=molded-bra" },
            { label: "Minimizer Bras", href: "/shop?type=minimizer-bra" },
          ],
        },
        {
          title: "Top Collections",
          links: [
            { label: "Provence", href: "/collections/provence" },
            { label: "Moments", href: "/collections/moments" },
            { label: "Lovely Lotus", href: "/collections/lovely-lotus" },
            { label: "Joy", href: "/collections/joy" },
          ],
        },
      ],
      images: [
        { src: "/images/206210_531_F.jpg", alt: "Rhapsody Spacer Bra", label: "Spacer Bras", href: "/shop?type=spacer-bra" },
        { src: "/images/501_003_1301_003_070_1200x800px-1024x683.jpg", alt: "Joy Molded Bra", label: "Molded Bras", href: "/shop?type=molded-bra" },
        { src: "/images/805838_813838_535_16175.jpg", alt: "Swing Wired Bra", label: "Wired Bras", href: "/shop?type=wired-bra" },
      ],
    },
  },
  {
    label: "Briefs & Panties",
    href: "/shop?type=bottom",
    megaMenu: {
      categories: [
        {
          title: "All Bottoms",
          links: [
            { label: "All Briefs & Panties", href: "/shop?type=bottom" },
            { label: "Briefs", href: "/shop?type=brief" },
            { label: "Mini Briefs", href: "/shop?type=mini-brief" },
            { label: "Panties", href: "/shop?type=panty" },
            { label: "Long Panties", href: "/shop?type=long-panty" },
            { label: "Highwaist Panties", href: "/shop?type=highwaist-panty" },
            { label: "Maxi Briefs", href: "/shop?type=maxi-brief" },
          ],
        },
      ],
      images: [
        { src: "/images/203225_213225__235225_213225_722_22623.jpg", alt: "Lovely Lotus Brief", label: "Lace Briefs", href: "/shop?type=brief" },
        { src: "/images/80622_88022_004_26540_1200x800px-1024x683.jpg", alt: "Soft Touch Shaping", label: "Shaping", href: "/shop?style=shape" },
        { src: "/images/206225_210225_722_25965.jpg", alt: "Lovely Lotus Mini Brief", label: "Mini Briefs", href: "/shop?type=mini-brief" },
      ],
    },
  },
  {
    label: "Bodies",
    href: "/shop?type=body",
    megaMenu: {
      categories: [
        {
          title: "Bodies",
          links: [
            { label: "All Bodies", href: "/shop?type=body" },
            { label: "Moments Body", href: "/product/moments-wireless-body" },
            { label: "Weftloc Body", href: "/product/weftloc-wireless-body" },
          ],
        },
      ],
      images: [
        { src: "/images/Gruppebild_Moments__1_031-1024x682.jpg", alt: "Moments Wireless Body", label: "Moments", href: "/product/moments-wireless-body" },
        { src: "/images/5076_004_023_1200x800px-1024x683.jpg", alt: "Weftloc Wireless Body", label: "Weftloc", href: "/product/weftloc-wireless-body" },
      ],
    },
  },
  {
    label: "Collections",
    href: "/collections",
    megaMenu: {
      categories: [
        {
          title: "Conturelle",
          links: [
            { label: "Provence — Embroidery", href: "/collections/provence" },
            { label: "Swing — Lace", href: "/collections/swing" },
            { label: "Mille Fleurs — Embroidery", href: "/collections/mille-fleurs" },
            { label: "Pure Feeling — Daily", href: "/collections/pure-feeling" },
            { label: "Soft Touch — Shape", href: "/collections/soft-touch" },
          ],
        },
        {
          title: "Felina",
          links: [
            { label: "Lovely Lotus — Lace", href: "/collections/lovely-lotus" },
            { label: "Beyond Basic — TENCEL™", href: "/collections/beyond-basic" },
            { label: "Moments — Embroidery", href: "/collections/moments" },
            { label: "Rhapsody — Embroidery", href: "/collections/rhapsody" },
            { label: "Joy — Embroidery", href: "/collections/joy" },
            { label: "View All Collections", href: "/collections" },
          ],
        },
      ],
      images: [
        { src: "/images/805840_813840_710_19168.jpg", alt: "Mille Fleurs", label: "Mille Fleurs", href: "/collections/mille-fleurs" },
        { src: "/images/206208_213208_48_20728.jpg", alt: "Flora", label: "Flora", href: "/collections/flora" },
        { src: "/images/205292_213292_596_55733.jpg", alt: "Secret Delight", label: "Secret Delight", href: "/collections/secret-delight" },
      ],
    },
  },
  { label: "Our Story", href: "/our-story" },
  { label: "Fit Finder", href: "/fit-quiz" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [expandedMobile, setExpandedMobile] = useState<string | null>(null);
  const { count, setIsOpen } = useCart();
  const menuTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const handleMouseEnter = (label: string) => {
    if (menuTimeout.current) clearTimeout(menuTimeout.current);
    setActiveMenu(label);
  };

  const handleMouseLeave = () => {
    menuTimeout.current = setTimeout(() => setActiveMenu(null), 120);
  };

  const activeItem = navItems.find((i) => i.label === activeMenu);

  const navText = scrolled ? "text-[var(--text)]" : "text-white";
  const navTextMuted = scrolled ? "text-[var(--text-muted)]" : "text-white/70";
  const navTextHover = scrolled ? "hover:text-[var(--text)]" : "hover:text-white";

  return (
    <>
      <header
        className={`fixed left-0 right-0 z-[100] transition-all duration-300 ${
          scrolled
            ? "bg-[var(--bg)]/95 backdrop-blur-md shadow-[0_1px_0_var(--border)]"
            : "bg-transparent"
        }`}
        style={{ top: "var(--announcement-height, 36px)" }}
      >
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Mobile hamburger */}
            <button
              className="lg:hidden flex flex-col gap-[5px] w-8 p-1"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <span className={`block w-full h-[1.5px] ${scrolled ? "bg-[var(--text)]" : "bg-white"} transition-colors`} />
              <span className={`block w-full h-[1.5px] ${scrolled ? "bg-[var(--text)]" : "bg-white"} transition-colors`} />
              <span className={`block w-3/4 h-[1.5px] ${scrolled ? "bg-[var(--text)]" : "bg-white"} transition-colors`} />
            </button>

            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <span className={`font-[family-name:var(--font-cormorant)] text-2xl lg:text-3xl font-light italic tracking-[0.02em] ${navText} transition-colors`}>
                Conturelle
              </span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-7 xl:gap-9" onMouseLeave={handleMouseLeave}>
              {navItems.map((item) => (
                <div
                  key={item.label}
                  onMouseEnter={() => item.megaMenu ? handleMouseEnter(item.label) : setActiveMenu(null)}
                >
                  <Link
                    href={item.href}
                    className={`text-[13px] tracking-[0.04em] uppercase transition-colors whitespace-nowrap ${
                      activeMenu === item.label
                        ? navText
                        : `${navTextMuted} ${navTextHover}`
                    }`}
                  >
                    {item.label}
                  </Link>
                </div>
              ))}
            </nav>

            {/* Right icons */}
            <div className="flex items-center gap-4">
              <Link href="/search" className="hidden lg:block" aria-label="Search">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={`${navText} transition-colors`}>
                  <circle cx="11" cy="11" r="8" />
                  <path d="M21 21l-4.35-4.35" />
                </svg>
              </Link>
              <Link href="/wishlist" className="hidden lg:block" aria-label="Wishlist">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={`${navText} transition-colors`}>
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </Link>
              <button
                onClick={() => setIsOpen(true)}
                className="relative"
                aria-label="Cart"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={`${navText} transition-colors`}>
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 01-8 0" />
                </svg>
                {count > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-[var(--text)] text-[var(--bg)] text-[10px] flex items-center justify-center rounded-full">
                    {count}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mega Menu Desktop Dropdown */}
        {activeItem?.megaMenu && (
          <div
            className="absolute left-0 right-0 bg-[var(--bg)] border-t border-[var(--border)] animate-fade-in"
            onMouseEnter={() => { if (menuTimeout.current) clearTimeout(menuTimeout.current); }}
            onMouseLeave={handleMouseLeave}
          >
            <div className="max-w-[1400px] mx-auto px-8 py-10">
              <div className="flex gap-12">
                {/* Category links */}
                <div className="flex gap-12 min-w-[320px]">
                  {activeItem.megaMenu.categories.map((cat) => (
                    <div key={cat.title}>
                      <h3 className="text-[11px] uppercase tracking-[0.06em] text-[var(--text-faint)] mb-4 font-medium">
                        {cat.title}
                      </h3>
                      <ul className="space-y-2.5">
                        {cat.links.map((link) => (
                          <li key={link.href + link.label}>
                            <Link
                              href={link.href}
                              className="text-sm text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
                              onClick={() => setActiveMenu(null)}
                            >
                              {link.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {/* Featured images */}
                <div className="flex-1 flex gap-5">
                  {activeItem.megaMenu.images.map((img) => (
                    <Link
                      key={img.href + img.label}
                      href={img.href}
                      className="flex-1 group"
                      onClick={() => setActiveMenu(null)}
                    >
                      <div className="aspect-[3/4] overflow-hidden bg-[var(--bg-subtle)] mb-2.5">
                        <img
                          src={img.src}
                          alt={img.alt}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                      </div>
                      <span className="text-xs tracking-[0.04em] text-[var(--text-muted)] group-hover:text-[var(--text)] transition-colors">
                        {img.label}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Mobile menu overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[200] lg:hidden">
          <div className="absolute inset-0 bg-black/30" onClick={() => setMobileOpen(false)} />
          <div className="absolute top-0 right-0 bottom-0 w-[85%] max-w-[380px] bg-[var(--bg)] overflow-y-auto animate-fade-in">
            <div className="flex justify-between items-center p-5 border-b border-[var(--border)]">
              <span className="font-[family-name:var(--font-cormorant)] text-xl italic text-[var(--text)]">
                Conturelle
              </span>
              <button onClick={() => setMobileOpen(false)} className="text-[var(--text)] p-1" aria-label="Close menu">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <nav className="py-4">
              {navItems.map((item) => (
                <div key={item.label} className="border-b border-[var(--border-faint)]">
                  {item.megaMenu ? (
                    <>
                      <button
                        className="w-full flex items-center justify-between px-5 py-3.5 text-[var(--text)] text-sm tracking-[0.04em]"
                        onClick={() => setExpandedMobile(expandedMobile === item.label ? null : item.label)}
                      >
                        <span>{item.label}</span>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
                          className={`transition-transform ${expandedMobile === item.label ? "rotate-180" : ""}`}
                        >
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </button>
                      {expandedMobile === item.label && (
                        <div className="bg-[var(--bg-subtle)] pb-3">
                          {item.megaMenu.categories.map((cat) => (
                            <div key={cat.title} className="px-5 pt-3">
                              <span className="text-[10px] uppercase tracking-[0.06em] text-[var(--text-faint)] font-medium">
                                {cat.title}
                              </span>
                              {cat.links.map((link) => (
                                <Link
                                  key={link.href + link.label}
                                  href={link.href}
                                  className="block py-2 text-sm text-[var(--text-muted)]"
                                  onClick={() => setMobileOpen(false)}
                                >
                                  {link.label}
                                </Link>
                              ))}
                            </div>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className="block px-5 py-3.5 text-[var(--text)] text-sm tracking-[0.04em]"
                      onClick={() => setMobileOpen(false)}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
            </nav>

            <div className="px-5 pt-4 pb-8 space-y-3">
              <Link href="/size-guide" className="block text-sm text-[var(--text-muted)]" onClick={() => setMobileOpen(false)}>
                Size Guide
              </Link>
              <Link href="/search" className="block text-sm text-[var(--text-muted)]" onClick={() => setMobileOpen(false)}>
                Search
              </Link>
            </div>
          </div>
        </div>
      )}

      <CartDrawer />
    </>
  );
}
