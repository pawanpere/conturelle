import Link from "next/link";

export default function HeroSection() {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{
        marginTop: "calc(-1 * var(--header-height))",
        height: "100svh",
        minHeight: "600px",
      }}
    >
      {/* Full-bleed background image */}
      <img
        src="/images/80505_81305_004_21342.jpg"
        alt="Conturelle lingerie campaign"
        className="absolute inset-0 w-full h-full object-cover object-center"
        loading="eager"
      />

      {/* Very subtle gradient overlay at bottom for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

      {/* Content — bottom-left aligned like Skims */}
      <div className="absolute inset-0 flex flex-col justify-end px-8 md:px-16 pb-24 md:pb-20 z-[2]">
        <p className="text-[11px] md:text-[12px] tracking-[0.15em] uppercase text-white/70 mb-4">
          Premium European Lingerie
        </p>
        <h1 className="font-[family-name:var(--font-cormorant)] text-[clamp(40px,8vw,96px)] font-light leading-[1] tracking-[-0.02em] text-white max-w-[800px]">
          Back in Stock:
          <br />
          <span className="font-normal">Provence Collection</span>
        </h1>
        <p className="text-[13px] md:text-[14px] text-white/70 mt-4 max-w-[440px] leading-relaxed">
          Our signature embroidered lace, crafted in Europe since 1885 — don&apos;t miss out.
        </p>

        <div className="mt-8 flex flex-row items-center gap-4">
          <Link
            href="/shop"
            className="inline-block py-3 px-8 bg-white text-[11px] tracking-[0.1em] uppercase text-[#2D2926] no-underline font-medium hover:bg-white/90 transition-colors"
          >
            Shop Now
          </Link>
          <Link
            href="/fit-quiz"
            className="text-[11px] tracking-[0.08em] uppercase text-white/80 no-underline border-b border-white/40 pb-[2px] hover:text-white hover:border-white transition-colors"
          >
            Find Your Fit
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[2] hidden md:flex flex-col items-center gap-2">
        <div className="w-[1px] h-8 bg-white/30 animate-pulse" />
      </div>
    </section>
  );
}
