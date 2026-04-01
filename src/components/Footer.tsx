import Link from "next/link";

const socialLinks = [
  { name: "Instagram", href: "#", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg> },
  { name: "Pinterest", href: "#", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M8 21c1-3 1.5-5.5 2-7.5.5-2-.5-3.5 1-5s4-1 4.5 1-.5 4-1 5.5 0 3 2 3"/></svg> },
  { name: "TikTok", href: "#", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 12a4 4 0 104 4V4c1 2.5 3.5 4 6 4"/></svg> },
  { name: "Facebook", href: "#", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg> },
];

const paymentIcons = [
  { name: "Visa", icon: <svg width="32" height="20" viewBox="0 0 32 20"><rect width="32" height="20" rx="3" fill="rgba(245,239,232,0.08)"/><text x="16" y="13" textAnchor="middle" fill="rgba(245,239,232,0.5)" fontSize="8" fontWeight="600" fontFamily="sans-serif">VISA</text></svg> },
  { name: "Mastercard", icon: <svg width="32" height="20" viewBox="0 0 32 20"><rect width="32" height="20" rx="3" fill="rgba(245,239,232,0.08)"/><circle cx="13" cy="10" r="5" fill="rgba(181,72,74,0.5)"/><circle cx="19" cy="10" r="5" fill="rgba(201,169,110,0.5)"/></svg> },
  { name: "Amex", icon: <svg width="32" height="20" viewBox="0 0 32 20"><rect width="32" height="20" rx="3" fill="rgba(245,239,232,0.08)"/><text x="16" y="13" textAnchor="middle" fill="rgba(245,239,232,0.5)" fontSize="6" fontWeight="600" fontFamily="sans-serif">AMEX</text></svg> },
  { name: "PayPal", icon: <svg width="32" height="20" viewBox="0 0 32 20"><rect width="32" height="20" rx="3" fill="rgba(245,239,232,0.08)"/><text x="16" y="13" textAnchor="middle" fill="rgba(245,239,232,0.5)" fontSize="6" fontWeight="500" fontFamily="sans-serif">PayPal</text></svg> },
  { name: "Klarna", icon: <svg width="32" height="20" viewBox="0 0 32 20"><rect width="32" height="20" rx="3" fill="rgba(245,239,232,0.08)"/><text x="16" y="13" textAnchor="middle" fill="rgba(245,239,232,0.5)" fontSize="6" fontWeight="500" fontFamily="sans-serif">Klarna</text></svg> },
  { name: "Apple Pay", icon: <svg width="32" height="20" viewBox="0 0 32 20"><rect width="32" height="20" rx="3" fill="rgba(245,239,232,0.08)"/><text x="16" y="13" textAnchor="middle" fill="rgba(245,239,232,0.5)" fontSize="5.5" fontWeight="500" fontFamily="sans-serif">Pay</text></svg> },
];

export default function Footer() {
  return (
    <>
      <footer className="relative z-[2] border-t border-[rgba(201,169,110,0.1)] pt-16 pb-12 px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-12 max-w-[1400px] mx-auto">
        <div>
          <span className="font-[family-name:var(--font-cormorant)] block text-[28px] tracking-[0.03em] italic font-light text-[var(--cream)] leading-none mb-6">
            Conturelle
          </span>
          <p className="text-[12px] text-[rgba(245,239,232,0.35)] leading-relaxed mb-6">
            Premium European lingerie.<br />Crafted since 1885.
          </p>
          <div className="flex gap-4">
            {socialLinks.map((s) => (
              <a key={s.name} href={s.href} className="text-[rgba(245,239,232,0.35)] no-underline hover:text-[var(--gold)] transition-colors" aria-label={s.name}>
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        <div>
          <p className="text-[10px] tracking-[0.15em] uppercase text-[var(--gold)] mb-6">Shop</p>
          <ul className="list-none flex flex-col gap-3.5">
            {["Spacer Bras", "Lace Bras", "T-Shirt Bras", "Briefs", "Complete Sets", "Sale"].map((item) => (
              <li key={item}>
                <Link href="/#collection" className="text-[12px] text-[rgba(245,239,232,0.4)] no-underline hover:text-[var(--cream)] transition-colors">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-[10px] tracking-[0.15em] uppercase text-[var(--gold)] mb-6">Help</p>
          <ul className="list-none flex flex-col gap-3.5">
            {[
              { label: "Size Guide", href: "#" },
              { label: "Fit Finder Quiz", href: "/fit-quiz" },
              { label: "Shipping", href: "#" },
              { label: "Returns", href: "#" },
              { label: "Contact Us", href: "#" },
              { label: "FAQs", href: "#" },
            ].map((item) => (
              <li key={item.label}>
                <a href={item.href} className="text-[12px] text-[rgba(245,239,232,0.4)] no-underline hover:text-[var(--cream)] transition-colors">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-[10px] tracking-[0.15em] uppercase text-[var(--gold)] mb-6">About</p>
          <ul className="list-none flex flex-col gap-3.5">
            {["Our Story", "Heritage", "Sustainability", "Press"].map((item) => (
              <li key={item}>
                <a href="#" className="text-[12px] text-[rgba(245,239,232,0.4)] no-underline hover:text-[var(--cream)] transition-colors">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </footer>

      <div className="relative z-[2] border-t border-[rgba(201,169,110,0.06)] px-6 md:px-12 py-6 max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex gap-2">
          {paymentIcons.map((p) => (
            <span key={p.name} title={p.name}>{p.icon}</span>
          ))}
        </div>
        <div className="flex gap-3 text-[10px] text-[rgba(245,239,232,0.25)]">
          <a href="#" className="no-underline text-[rgba(245,239,232,0.25)] hover:text-[var(--cream)]">Privacy</a>
          <span>&middot;</span>
          <a href="#" className="no-underline text-[rgba(245,239,232,0.25)] hover:text-[var(--cream)]">Terms</a>
          <span>&middot;</span>
          <a href="#" className="no-underline text-[rgba(245,239,232,0.25)] hover:text-[var(--cream)]">Imprint</a>
        </div>
        <p className="text-[10px] text-[rgba(245,239,232,0.2)]">
          &copy; 2026 Conturelle by Felina
        </p>
      </div>
    </>
  );
}
