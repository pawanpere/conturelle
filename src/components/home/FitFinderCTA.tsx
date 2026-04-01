import Link from "next/link";

export default function FitFinderCTA() {
  return (
    <section className="relative overflow-hidden bg-[var(--blush)]/20">
      <div className="relative z-[2] text-center py-20 md:py-28 px-6 md:px-12">
        <p className="text-[10px] tracking-[0.06em] uppercase text-[var(--accent)] mb-6">
          No measuring tape needed
        </p>
        <h2 className="font-[family-name:var(--font-cormorant)] text-[clamp(36px,8vw,80px)] font-light leading-[0.95] text-[var(--text)]">
          Find Your Perfect Fit
        </h2>
        <p className="mt-6 text-[12px] text-[var(--text-muted)] max-w-[400px] mx-auto leading-relaxed">
          Answer 4 quick questions and we&rsquo;ll match you to your ideal size
          and style. Sizes EU 65&ndash;115, cups A&ndash;K.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 sm:gap-8 justify-center items-center">
          <Link
            href="/fit-quiz"
            className="inline-block py-4 px-12 bg-[var(--text)] text-[10px] tracking-[0.08em] uppercase text-[var(--bg)] no-underline hover:opacity-90 transition-opacity"
          >
            Start the Fit Quiz
          </Link>
          <Link
            href="/size-guide"
            className="text-[10px] tracking-[0.06em] uppercase text-[var(--text-muted)] no-underline border-b border-[var(--text-muted)] pb-[3px] hover:text-[var(--text)] hover:border-[var(--text)] transition-colors"
          >
            View Size Guide
          </Link>
        </div>
      </div>
    </section>
  );
}
