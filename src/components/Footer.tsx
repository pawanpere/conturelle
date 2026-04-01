import Link from "next/link";

export default function Footer() {
  return (
    <>
      <footer className="border-t border-[var(--border)] pt-16 pb-12 px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-12 max-w-[1400px] mx-auto">
        <div>
          <span className="font-[family-name:var(--font-cormorant)] block text-[28px] tracking-[0.02em] italic font-light text-[var(--text)] leading-none mb-6">
            Conturelle
          </span>
          <p className="text-[12px] text-[var(--text-faint)] leading-relaxed mb-6">
            Premium European lingerie.<br />Crafted since 1885.
          </p>
          <div className="flex gap-4">
            {/* Instagram */}
            <a href="#" className="text-[var(--text-faint)] hover:text-[var(--text)] transition-colors" aria-label="Instagram">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="5" />
                <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
              </svg>
            </a>
            {/* Pinterest */}
            <a href="#" className="text-[var(--text-faint)] hover:text-[var(--text)] transition-colors" aria-label="Pinterest">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="10" />
                <path d="M8 21c1-3 1.5-5.5 2-7.5.5-2-.5-3.5 1-5s4-1 4.5 1-.5 4-1 5.5 0 3 2 3" />
              </svg>
            </a>
            {/* TikTok */}
            <a href="#" className="text-[var(--text-faint)] hover:text-[var(--text)] transition-colors" aria-label="TikTok">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M9 12a4 4 0 104 4V4c1 2.5 3.5 4 6 4" />
              </svg>
            </a>
            {/* Facebook */}
            <a href="#" className="text-[var(--text-faint)] hover:text-[var(--text)] transition-colors" aria-label="Facebook">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
              </svg>
            </a>
          </div>
        </div>

        <div>
          <p className="text-[11px] tracking-[0.06em] uppercase text-[var(--accent)] mb-6 font-medium">Shop</p>
          <ul className="list-none flex flex-col gap-3.5">
            {[
              { label: "All Products", href: "/shop" },
              { label: "Bras", href: "/shop?type=bra" },
              { label: "Briefs & Panties", href: "/shop?type=bottom" },
              { label: "Bodies", href: "/shop?type=body" },
              { label: "Collections", href: "/collections" },
              { label: "New Arrivals", href: "/shop?filter=new" },
            ].map((item) => (
              <li key={item.label}>
                <Link href={item.href} className="text-[12px] text-[var(--text-muted)] hover:text-[var(--text)] transition-colors">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-[11px] tracking-[0.06em] uppercase text-[var(--accent)] mb-6 font-medium">Help</p>
          <ul className="list-none flex flex-col gap-3.5">
            {[
              { label: "Size Guide", href: "/size-guide" },
              { label: "Fit Finder Quiz", href: "/fit-quiz" },
              { label: "Shipping", href: "#" },
              { label: "Returns", href: "#" },
              { label: "Contact Us", href: "#" },
              { label: "FAQs", href: "#" },
            ].map((item) => (
              <li key={item.label}>
                <Link href={item.href} className="text-[12px] text-[var(--text-muted)] hover:text-[var(--text)] transition-colors">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-[11px] tracking-[0.06em] uppercase text-[var(--accent)] mb-6 font-medium">About</p>
          <ul className="list-none flex flex-col gap-3.5">
            {[
              { label: "Our Story", href: "/our-story" },
              { label: "Heritage", href: "/our-story" },
              { label: "Sustainability", href: "#" },
              { label: "Press", href: "#" },
            ].map((item) => (
              <li key={item.label}>
                <Link href={item.href} className="text-[12px] text-[var(--text-muted)] hover:text-[var(--text)] transition-colors">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </footer>

      <div className="border-t border-[var(--border-faint)] px-6 md:px-12 py-6 max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Payment icons - real SVGs */}
        <div className="flex gap-2">
          {/* Visa */}
          <span title="Visa" className="flex items-center justify-center w-10 h-6 rounded border border-[var(--border)] bg-[var(--bg-card)]">
            <svg width="24" height="8" viewBox="0 0 24 8" fill="none">
              <path d="M9.5 0.5L8 7.5H6L7.5 0.5H9.5ZM16.5 5L17.5 2L18 5H16.5ZM19 7.5H21L19.5 0.5H17.5C17.1 0.5 16.8 0.7 16.6 1.1L13.5 7.5H15.5L16 6H18.5L19 7.5ZM14 5.2C14 3 10.5 2.9 10.5 1.9C10.5 1.6 10.8 1.2 11.5 1.1C12.2 1 13.5 1.2 14 1.5L14.5 0.2C14 0 13 0 12.5 0C10.5 0 9 1 9 2.5C9 4 10.5 4.3 11.5 4.8C12 5 12.5 5.3 12.5 5.7C12.5 6.3 11.8 6.5 11.2 6.5C10.3 6.5 9.5 6.3 9 6L8.5 7.3C9 7.6 10 7.8 11 7.8C13.2 7.8 14 6.5 14 5.2ZM6 0.5L3.5 7.5H1.5L0.3 1.5C0.2 1.1 0.1 1 0 0.8V0.5H3C3.4 0.5 3.8 0.8 3.9 1.3L4.5 4.5L6.5 0.5H6Z" fill="var(--text-muted)" />
            </svg>
          </span>
          {/* Mastercard */}
          <span title="Mastercard" className="flex items-center justify-center w-10 h-6 rounded border border-[var(--border)] bg-[var(--bg-card)]">
            <svg width="20" height="12" viewBox="0 0 20 12" fill="none">
              <circle cx="7" cy="6" r="5.5" fill="var(--rose)" fillOpacity="0.5" />
              <circle cx="13" cy="6" r="5.5" fill="var(--accent)" fillOpacity="0.5" />
            </svg>
          </span>
          {/* Amex */}
          <span title="American Express" className="flex items-center justify-center w-10 h-6 rounded border border-[var(--border)] bg-[var(--bg-card)]">
            <span className="text-[7px] font-semibold tracking-wide text-[var(--text-muted)]">AMEX</span>
          </span>
          {/* PayPal */}
          <span title="PayPal" className="flex items-center justify-center w-10 h-6 rounded border border-[var(--border)] bg-[var(--bg-card)]">
            <svg width="14" height="16" viewBox="0 0 14 16" fill="none">
              <path d="M11.5 2C10.8 1 9.5 0.5 7.5 0.5H3C2.6 0.5 2.3 0.8 2.2 1.2L0.5 12.2C0.5 12.5 0.7 12.7 0.9 12.7H3.5L4.2 8.2L4.2 8.5C4.3 8.1 4.6 7.8 5 7.8H6.5C9 7.8 11 6.8 11.5 3.8C11.5 3.5 11.5 3.3 11.5 3.1V2Z" fill="var(--text-muted)" fillOpacity="0.6" />
              <path d="M5 4C5.1 3.8 5.3 3.5 5.7 3.5H9C9.5 3.5 10 3.5 10.3 3.6C10.8 3.7 11.2 3.8 11.5 4C11.5 3.5 11.5 3 11.5 2.5C10.8 1.5 9.5 1 7.5 1H3.5C3.1 1 2.8 1.3 2.7 1.7L1 12.5H3.5L4.5 6L5 4Z" fill="var(--text-muted)" fillOpacity="0.4" />
            </svg>
          </span>
          {/* Klarna */}
          <span title="Klarna" className="flex items-center justify-center w-10 h-6 rounded border border-[var(--border)] bg-[var(--bg-card)]">
            <span className="text-[7px] font-semibold tracking-wide text-[var(--text-muted)]">Klarna</span>
          </span>
          {/* Apple Pay */}
          <span title="Apple Pay" className="flex items-center justify-center w-10 h-6 rounded border border-[var(--border)] bg-[var(--bg-card)]">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M10.5 4.5C10 4 9.2 3.8 8.5 3.8C7.5 3.8 7 4.5 6.5 4.5C6 4.5 5.3 3.8 4.5 3.8C3.5 3.8 2 4.8 2 7C2 9.5 4 12.5 5 12.5C5.5 12.5 6 12 6.5 12C7 12 7.5 12.5 8 12.5C9 12.5 11 9.5 11 7C11 6 10.5 5 10.5 4.5Z" fill="var(--text-muted)" fillOpacity="0.6" />
              <path d="M8.5 1.5C9 1 9 0.5 9 0C8.5 0 7.5 0.5 7 1C6.5 1.5 6.5 2 6.5 2.5C7 2.5 8 2 8.5 1.5Z" fill="var(--text-muted)" fillOpacity="0.6" />
            </svg>
          </span>
        </div>

        <div className="flex gap-3 text-[10px] text-[var(--text-faint)]">
          <a href="#" className="hover:text-[var(--text)] transition-colors">Privacy</a>
          <span>·</span>
          <a href="#" className="hover:text-[var(--text)] transition-colors">Terms</a>
          <span>·</span>
          <a href="#" className="hover:text-[var(--text)] transition-colors">Imprint</a>
        </div>
        <p className="text-[10px] text-[var(--text-faint)]">
          © 2026 Conturelle by Felina. All prices in USD.
        </p>
      </div>
    </>
  );
}
