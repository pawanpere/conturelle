import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Story | Conturelle",
  description:
    "Discover 140 years of European lingerie craftsmanship. Since 1885, Conturelle has blended heritage artistry with modern comfort.",
};

const stats = [
  { value: "80", label: "Pieces per bra" },
  { value: "140", label: "Years of heritage" },
  { value: "100%", label: "European made" },
];

const milestones = [
  {
    year: "1885",
    title: "The Beginning",
    text: "Founded in Germany with a singular vision: to create lingerie that honours the female form through meticulous craftsmanship and the finest European materials.",
  },
  {
    year: "1920s",
    title: "Pioneering Fit",
    text: "Introduced one of the first structured cup systems in Europe, setting a new standard for comfort and support that would influence the industry for decades.",
  },
  {
    year: "1960s",
    title: "Modern Elegance",
    text: "Embraced contemporary design while preserving artisanal techniques, blending hand-finished details with innovative stretch fabrics and new silhouettes.",
  },
  {
    year: "1990s",
    title: "Expanded Range",
    text: "Extended the size range to be truly inclusive, ensuring every woman could experience the Conturelle standard of fit, from cup A through K and band 65 through 115.",
  },
  {
    year: "2010s",
    title: "Sustainable Craft",
    text: "Committed to responsible production across every European atelier, investing in eco-conscious materials and reducing waste without compromising quality.",
  },
  {
    year: "Today",
    title: "Heritage Reimagined",
    text: "Every Conturelle piece still passes through dozens of skilled hands. We continue to honour our legacy while designing for the modern woman who values beauty, comfort, and integrity.",
  },
];

export default function OurStoryPage() {
  return (
    <main
      className="min-h-screen"
      style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}
    >
      {/* ── Hero ── */}
      <section className="relative px-6 py-28 md:py-40 text-center">
        <p
          className="text-sm tracking-[0.3em] uppercase mb-4"
          style={{ color: "var(--accent)" }}
        >
          Our Story
        </p>
        <h1
          className="text-5xl md:text-7xl font-light tracking-wide mb-6"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          Est. 1885
        </h1>
        <p
          className="max-w-lg mx-auto text-base leading-relaxed"
          style={{ color: "var(--text-muted)" }}
        >
          For over 140 years, Conturelle has crafted lingerie that celebrates
          femininity through European artisanship, exquisite materials, and an
          unwavering devotion to fit.
        </p>
      </section>

      {/* ── Editorial Image ── */}
      <section className="max-w-6xl mx-auto px-6">
        <div className="relative w-full aspect-[21/9] rounded-2xl overflow-hidden">
          <Image
            src="/images/Rhapsody_1_249_NudeHintergrund-1024x768.jpg"
            alt="Conturelle European atelier"
            fill
            className="object-cover"
            sizes="(max-width: 1200px) 100vw, 1200px"
            priority
          />
        </div>
      </section>

      {/* ── Brand Narrative ── */}
      <section className="max-w-3xl mx-auto px-6 py-20 md:py-28 text-center">
        <h2
          className="text-3xl md:text-4xl font-light mb-8"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          Crafted with Conviction
        </h2>
        <div
          className="space-y-6 text-sm md:text-base leading-relaxed"
          style={{ color: "var(--text-muted)" }}
        >
          <p>
            Every Conturelle bra is composed of up to 80 individual pieces, each
            cut, sewn, and finished by skilled artisans in our European
            workshops. This is not mass production — it is a labour of precision,
            passed down through generations.
          </p>
          <p>
            We source the finest laces from France, the softest microfibers from
            Italy, and the most resilient elastics from Switzerland. These
            materials are chosen not just for their beauty, but for the way they
            move, breathe, and endure.
          </p>
          <p>
            The result is lingerie that fits like a second skin — supportive yet
            effortless, luxurious yet understated. Pieces you reach for every
            day, not because you have to, but because they make you feel
            extraordinary.
          </p>
        </div>
      </section>

      {/* ── Stats ── */}
      <section
        className="py-16"
        style={{ backgroundColor: "var(--bg-subtle)" }}
      >
        <div className="max-w-4xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          {stats.map((s) => (
            <div key={s.label}>
              <p
                className="text-5xl md:text-6xl font-light mb-2"
                style={{
                  fontFamily: "var(--font-cormorant)",
                  color: "var(--accent)",
                }}
              >
                {s.value}
              </p>
              <p
                className="text-xs tracking-[0.2em] uppercase"
                style={{ color: "var(--text-muted)" }}
              >
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Editorial Grid ── */}
      <section className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-6">
        <div className="relative aspect-[3/4] rounded-2xl overflow-hidden">
          <Image
            src="/images/803837_814837_732_2526_1200x800px-1024x683.jpg"
            alt="Intricate Conturelle lace detail"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        <div className="relative aspect-[3/4] rounded-2xl overflow-hidden">
          <Image
            src="/images/805840_813840_1705_0219.jpg"
            alt="Conturelle artisan craftsmanship"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </section>

      {/* ── Timeline ── */}
      <section className="max-w-3xl mx-auto px-6 pb-24">
        <h2
          className="text-3xl md:text-4xl font-light text-center mb-16"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          Milestones
        </h2>
        <div className="relative">
          {/* Vertical line */}
          <div
            className="absolute left-[7px] md:left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
            style={{ backgroundColor: "var(--border)" }}
          />

          <div className="space-y-16">
            {milestones.map((m, i) => (
              <div
                key={m.year}
                className={`relative flex flex-col md:flex-row ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                } items-start md:items-center gap-6 md:gap-12`}
              >
                {/* Dot */}
                <div
                  className="absolute left-0 md:left-1/2 w-3.5 h-3.5 rounded-full -translate-x-1/2 z-10"
                  style={{ backgroundColor: "var(--accent)" }}
                />

                <div
                  className={`ml-8 md:ml-0 md:w-1/2 ${
                    i % 2 === 0 ? "md:text-right md:pr-12" : "md:text-left md:pl-12"
                  }`}
                >
                  <p
                    className="text-2xl font-light mb-1"
                    style={{
                      fontFamily: "var(--font-cormorant)",
                      color: "var(--accent)",
                    }}
                  >
                    {m.year}
                  </p>
                  <h3
                    className="text-lg font-light mb-2"
                    style={{ fontFamily: "var(--font-cormorant)" }}
                  >
                    {m.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {m.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        className="py-20 text-center"
        style={{ backgroundColor: "var(--bg-subtle)" }}
      >
        <h2
          className="text-3xl md:text-4xl font-light mb-4"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          Experience the Craft
        </h2>
        <p
          className="max-w-md mx-auto text-sm mb-8"
          style={{ color: "var(--text-muted)" }}
        >
          Discover the collection and feel 140 years of expertise in every
          stitch.
        </p>
        <Link
          href="/shop"
          className="inline-block px-12 py-3 rounded-full text-sm font-medium tracking-wide text-white transition-opacity hover:opacity-90"
          style={{ backgroundColor: "var(--accent)" }}
        >
          Shop the Collection
        </Link>
      </section>
    </main>
  );
}
