import Link from "next/link";

export default function Footer() {
  return (
    <>
      <footer className="relative z-[2] border-t border-[rgba(201,169,110,0.1)] pt-16 pb-12 px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-12 max-w-[1400px] mx-auto">
        <div>
          <div className="font-[family-name:var(--font-cormorant)] text-[var(--cream)] mb-6">
            <span className="block text-[32px] tracking-[0.05em] italic font-light leading-none">Conturelle</span>
          </div>
          <p className="font-[family-name:var(--font-cormorant)] text-sm italic text-[rgba(245,239,232,0.35)] leading-relaxed mb-8">
            &ldquo;Engineered for the Way You Move.<br />Since 1885.&rdquo;
          </p>
          <div className="flex gap-5">
            {["Instagram", "Pinterest", "TikTok", "Facebook"].map((s) => (
              <a key={s} href="#" className="text-[8px] tracking-[0.25em] uppercase text-[rgba(245,239,232,0.35)] no-underline hover:text-[var(--gold)] transition-colors">
                {s}
              </a>
            ))}
          </div>
        </div>

        <div>
          <p className="text-[8px] tracking-[0.35em] uppercase text-[var(--gold)] mb-6">Shop</p>
          <ul className="list-none flex flex-col gap-3.5">
            {["Spacer Bras", "Lace Bras", "T-Shirt Bras", "Briefs", "Complete Sets", "Sale"].map((item) => (
              <li key={item}>
                <Link href="/#collection" className="text-[11px] text-[rgba(245,239,232,0.4)] no-underline tracking-[0.05em] hover:text-[var(--cream)] transition-colors">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-[8px] tracking-[0.35em] uppercase text-[var(--gold)] mb-6">Help</p>
          <ul className="list-none flex flex-col gap-3.5">
            {["Size Guide", "Fit Finder Quiz", "Shipping", "Returns", "Contact Us", "FAQs"].map((item) => (
              <li key={item}>
                <a href="#" className="text-[11px] text-[rgba(245,239,232,0.4)] no-underline tracking-[0.05em] hover:text-[var(--cream)] transition-colors">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-[8px] tracking-[0.35em] uppercase text-[var(--gold)] mb-6">About</p>
          <ul className="list-none flex flex-col gap-3.5">
            {["Our Story", "140 Years of Heritage", "Sustainability", "Press"].map((item) => (
              <li key={item}>
                <a href="#" className="text-[11px] text-[rgba(245,239,232,0.4)] no-underline tracking-[0.05em] hover:text-[var(--cream)] transition-colors">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </footer>

      <div className="relative z-[2] border-t border-[rgba(201,169,110,0.06)] px-6 md:px-12 py-6 max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex gap-3 text-[9px] tracking-[0.1em] text-[rgba(245,239,232,0.3)]">
          {["Visa", "MC", "Amex", "PayPal", "Klarna", "Apple Pay"].map((p) => (
            <span key={p} className="border border-[rgba(201,169,110,0.15)] px-2 py-0.5 rounded-sm">{p}</span>
          ))}
        </div>
        <p className="text-[9px] tracking-[0.15em] text-[rgba(245,239,232,0.2)]">
          &copy; 2026 Conturelle by Felina &mdash; European Lingerie Group
        </p>
        <div className="flex gap-2 text-[9px] text-[rgba(245,239,232,0.2)]">
          <a href="#" className="no-underline text-[rgba(245,239,232,0.2)] hover:text-[var(--cream)]">Privacy Policy</a>
          <span>&middot;</span>
          <a href="#" className="no-underline text-[rgba(245,239,232,0.2)] hover:text-[var(--cream)]">Terms of Service</a>
          <span>&middot;</span>
          <a href="#" className="no-underline text-[rgba(245,239,232,0.2)] hover:text-[var(--cream)]">Imprint</a>
        </div>
        <p className="text-[8px] tracking-[0.1em] text-[rgba(245,239,232,0.2)]">
          Secure Checkout &middot; OEKO-TEX&reg; Certified &middot; Made in Europe
        </p>
        <div className="absolute right-12 bottom-3 font-[family-name:var(--font-cormorant)] text-[60px] font-light text-[rgba(245,239,232,0.04)] leading-none hidden md:block">
          C
        </div>
      </div>
    </>
  );
}
