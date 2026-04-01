import Link from "next/link";

export default function HeritageSection() {
  return (
    <section className="py-20 md:py-28 px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-[1200px] mx-auto">
      <div className="relative aspect-[3/4] overflow-hidden">
        <img
          src="/images/80505_81005_528_3354-1024x768.jpg"
          alt="Conturelle heritage craftsmanship"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex flex-col gap-6">
        <p className="text-[10px] tracking-[0.06em] uppercase text-[var(--accent)]">
          European Craft Since 1885
        </p>
        <h2 className="font-[family-name:var(--font-cormorant)] text-[36px] md:text-[42px] font-light leading-[1.1] text-[var(--text)]">
          140 Years in the Making
        </h2>
        <div className="w-12 h-px bg-[var(--accent)]" />
        <p className="text-[13px] leading-[1.9] text-[var(--text-muted)]">
          Every Conturelle bra is assembled from up to 80 individual pieces
          &mdash; each one cut, sewn, and finished by skilled artisans in Europe.
          From the first thread of yarn to the finished product, we control every
          step.
        </p>
        <div className="flex gap-10 mt-2">
          <div>
            <div className="font-[family-name:var(--font-cormorant)] text-[36px] font-light text-[var(--accent)] leading-none">
              80
            </div>
            <div className="text-[10px] tracking-[0.04em] text-[var(--text-faint)] mt-1">
              Pieces per bra
            </div>
          </div>
          <div>
            <div className="font-[family-name:var(--font-cormorant)] text-[36px] font-light text-[var(--accent)] leading-none">
              100%
            </div>
            <div className="text-[10px] tracking-[0.04em] text-[var(--text-faint)] mt-1">
              European made
            </div>
          </div>
        </div>
        <Link
          href="/our-story"
          className="text-[10px] tracking-[0.06em] uppercase text-[var(--accent)] no-underline self-start mt-2 border-b border-[var(--accent)] pb-[2px] hover:text-[var(--text)] hover:border-[var(--text)] transition-colors"
        >
          Our Story &rarr;
        </Link>
      </div>
    </section>
  );
}
