const reviews = [
  {
    stars: 5,
    quote: "Finally a bra that actually fits. The spacer cups are incredibly comfortable.",
    author: "Sophie M.",
    size: "80D",
    image: "/images/206210_213210_528_7293-1024x683.jpg",
  },
  {
    stars: 5,
    quote: "I've been wearing Conturelle for years. The quality is unmatched for the price.",
    author: "Charlotte W.",
    size: "75C",
    image: "/images/80505_81305_004_21342-1024x768.jpg",
  },
  {
    stars: 5,
    quote: "The fit quiz got my size exactly right. First bra I haven't had to return.",
    author: "Emma L.",
    size: "85E",
    image: "/images/206289_213289_721_30955.jpg",
  },
  {
    stars: 5,
    quote: "The lace is beautiful and it actually supports. Best purchase this year.",
    author: "Maria K.",
    size: "90D",
    image: "/images/80622_88222_034_28902-1024x768.jpg",
  },
];

export default function ReviewsSection() {
  return (
    <section className="py-20 px-6 md:px-12 max-w-[1400px] mx-auto">
      <div className="flex items-end justify-between mb-10">
        <h2 className="font-[family-name:var(--font-cormorant)] text-[36px] md:text-[48px] font-light text-[var(--text)]">
          What Our Customers Say
        </h2>
        <p className="text-[10px] tracking-[0.06em] uppercase text-[var(--text-faint)] hidden md:block">
          @conturelle
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {reviews.map((review, i) => (
          <div key={i} className="bg-[var(--bg-card)] border border-[var(--border)] overflow-hidden">
            <div className="aspect-square overflow-hidden">
              <img
                src={review.image}
                alt={`Review by ${review.author}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="p-4">
              <div className="text-[var(--accent)] text-[11px]">
                {"★".repeat(review.stars)}
              </div>
              <p className="font-[family-name:var(--font-cormorant)] text-sm italic text-[var(--text-muted)] leading-relaxed my-2">
                &ldquo;{review.quote}&rdquo;
              </p>
              <p className="text-[10px] tracking-[0.04em] text-[var(--text-faint)]">
                &mdash; {review.author}, Size {review.size}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
