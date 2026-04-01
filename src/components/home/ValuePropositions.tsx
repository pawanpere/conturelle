const props = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
    title: "European Craft",
    text: "Every piece handcrafted in Europe from the finest materials, 140 years of expertise in every stitch.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
    title: "Perfect Fit",
    text: "EU sizes 65-115, cups A-K. Our Fit Finder quiz matches you to your ideal size in under 2 minutes.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
        <polyline points="23 4 23 10 17 10" />
        <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
      </svg>
    ),
    title: "Free Returns",
    text: "30-day easy returns, no questions asked. Free shipping on orders over $75.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: "Yarn to You",
    text: "We control every step from raw yarn to finished garment. No middlemen, no compromises.",
  },
];

export default function ValuePropositions() {
  return (
    <section className="py-20 px-6 md:px-12 max-w-[1400px] mx-auto">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
        {props.map((p) => (
          <div key={p.title} className="text-center">
            <div className="text-[var(--accent)] flex justify-center mb-4">
              {p.icon}
            </div>
            <h3 className="font-[family-name:var(--font-cormorant)] text-xl font-light text-[var(--text)] mb-2">
              {p.title}
            </h3>
            <p className="text-[11px] leading-relaxed text-[var(--text-muted)]">
              {p.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
