import { products } from "@/lib/products";
import ProductCard from "@/components/ProductCard";

const categories = [
  { name: "Spacer Bras", image: "https://conturelle.com/wp-content/uploads/2016/09/206210_531_F.jpg" },
  { name: "Lace Bras", image: "https://conturelle.com/wp-content/uploads/2019/07/80505_004_F-e1637667019877.jpg" },
  { name: "T-Shirt Bras", image: "https://conturelle.com/wp-content/uploads/2023/10/202289_721_F1.jpg" },
  { name: "Matching Briefs", image: "https://conturelle.com/wp-content/uploads/2019/01/88322_004_F.jpg" },
  { name: "Complete Sets", image: "https://conturelle.com/wp-content/uploads/2025/07/803837_814837_732_2526-683x1024.jpg" },
  { name: "Sale", image: "https://conturelle.com/wp-content/uploads/2016/09/Rhapsody_1_249_NudeHintergrund-1024x768.jpg", badge: "Up to 30% Off" },
];

const reviews = [
  { stars: 5, quote: "Finally a bra that actually fits. The spacer cups are incredibly comfortable.", author: "Sarah M., Size 80D", image: "https://conturelle.com/wp-content/uploads/2016/09/206210_213210_528_7293-1024x683.jpg" },
  { stars: 5, quote: "I've been wearing Conturelle for years. The quality is unmatched for the price.", author: "Anna K., Size 75C", image: "https://conturelle.com/wp-content/uploads/2021/08/80505_81305_004_21342-1024x768.jpg" },
  { stars: 5, quote: "This quiz got my size exactly right. First bra I haven't had to return.", author: "Maria L., Size 85E", image: "https://conturelle.com/wp-content/uploads/2023/10/206289_213289_721_30955.jpg" },
  { stars: 5, quote: "The lace is beautiful and it actually supports. Best purchase this year.", author: "Julia W., Size 90D", image: "https://conturelle.com/wp-content/uploads/2021/08/80622_88222_034_28902-1024x768.jpg" },
];

export default function Home() {
  return (
    <div className="relative z-[2]">
      {/* Hero */}
      <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url("https://conturelle.com/wp-content/uploads/2021/08/80505_81305_004_21342.jpg")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center top',
          }}
        />
        <div className="absolute inset-0 z-0 bg-[rgba(21,8,16,0.68)]" />

        <div className="absolute inset-0 z-[1] opacity-[0.06]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300' viewBox='0 0 300 300'%3E%3Cg fill='none' stroke='%23f5efe8' stroke-width='0.5'%3E%3Ccircle cx='150' cy='150' r='140'/%3E%3Ccircle cx='150' cy='150' r='110'/%3E%3Ccircle cx='150' cy='150' r='80'/%3E%3Ccircle cx='150' cy='150' r='50'/%3E%3Ccircle cx='150' cy='150' r='20'/%3E%3Cpath d='M150 10 Q200 80 150 150 Q100 220 150 290'/%3E%3Cpath d='M10 150 Q80 100 150 150 Q220 200 290 150'/%3E%3Cpath d='M40 40 Q100 100 150 150 Q200 200 260 260'/%3E%3Cpath d='M260 40 Q200 100 150 150 Q100 200 40 260'/%3E%3Cpath d='M150 10 Q240 60 260 150 Q240 240 150 290 Q60 240 40 150 Q60 60 150 10Z'/%3E%3Cellipse cx='150' cy='75' rx='45' ry='22'/%3E%3Cellipse cx='150' cy='225' rx='45' ry='22'/%3E%3Cellipse cx='75' cy='150' rx='22' ry='45'/%3E%3Cellipse cx='225' cy='150' rx='22' ry='45'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '300px 300px',
          backgroundRepeat: 'repeat',
        }} />

        <div className="absolute w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(74,24,37,0.35)_0%,transparent_70%)] top-[10%] left-[35%] blur-[60px] animate-glow z-[1]" />

        <div className="relative z-[2] text-center px-4">
          <h1 className="font-[family-name:var(--font-cormorant)] text-[clamp(48px,10vw,120px)] font-light leading-[0.9] tracking-[-0.02em] text-[var(--cream)]">
            Engineered for<br />the Way You Move
          </h1>
          <p className="mt-7 text-[11px] tracking-[0.15em] uppercase text-[rgba(245,239,232,0.45)]">
            Premium European Lingerie &middot; Since 1885
          </p>
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-5">
            <a href="#collection" className="hero-cta inline-block py-3.5 px-10 border border-[rgba(245,239,232,0.4)] text-[10px] tracking-[0.15em] uppercase text-[var(--cream)] no-underline">
              <span className="relative z-[1]">Shop the Collection</span>
            </a>
            <a href="#fit-finder" className="text-[11px] tracking-[0.1em] uppercase text-[rgba(245,239,232,0.45)] no-underline border-b border-[rgba(245,239,232,0.3)] pb-[3px] hover:text-[var(--gold)] hover:border-[var(--gold)] transition-colors">
              Find Your Fit &rarr;
            </a>
          </div>
        </div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-[10px] tracking-[0.1em] text-[rgba(245,239,232,0.3)] uppercase whitespace-nowrap hidden md:block">
          From yarn to perfect fit &mdash; every step, ours.
        </div>
      </section>

      {/* Trust Bar */}
      <div className="relative z-[2] border-t border-b border-[rgba(201,169,110,0.1)] py-4 px-6 md:px-12 bg-[var(--mid)] flex flex-col md:flex-row justify-center items-center gap-3 md:gap-8">
        <div className="flex items-center gap-2">
          <span className="text-[var(--star-gold)] text-xs">&#9733;&#9733;&#9733;&#9733;&#9733;</span>
          <span className="text-[11px] tracking-[0.08em] text-[rgba(245,239,232,0.5)]">
            4.8/5 from 2,000+ reviews
          </span>
        </div>
        <span className="text-[rgba(201,169,110,0.2)] text-lg hidden md:inline">&middot;</span>
        <span className="text-[11px] tracking-[0.08em] text-[rgba(245,239,232,0.5)]">
          Free shipping over &euro;75
        </span>
        <span className="text-[rgba(201,169,110,0.2)] text-lg hidden md:inline">&middot;</span>
        <span className="text-[11px] tracking-[0.08em] text-[rgba(245,239,232,0.5)]">
          30-day easy returns
        </span>
      </div>

      {/* Shop by Style */}
      <section id="categories" className="py-20 px-6 md:px-12 max-w-[1400px] mx-auto">
        <h2 className="font-[family-name:var(--font-cormorant)] text-[36px] md:text-[48px] font-light text-[var(--cream)] mb-10">
          Shop by Style
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-1">
          {categories.map((cat) => (
            <a key={cat.name} href="#collection" className="relative aspect-[4/3] overflow-hidden flex items-end p-5 no-underline group cursor-pointer rounded-sm">
              <img
                src={cat.image}
                alt={cat.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-[1.04]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(21,8,16,0.75)] via-[rgba(21,8,16,0.15)] to-transparent" />
              <span className="relative z-[1] font-[family-name:var(--font-cormorant)] text-[20px] text-white font-light">
                {cat.name}
              </span>
              {cat.badge && (
                <span className="absolute top-3 right-3 z-[1] text-[9px] tracking-[0.1em] uppercase text-white bg-[var(--sale-red)] px-2 py-0.5">
                  {cat.badge}
                </span>
              )}
            </a>
          ))}
        </div>
      </section>

      {/* Heritage — single editorial section */}
      <section id="heritage" className="relative z-[2] py-20 md:py-28 px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-[1200px] mx-auto">
        <div className="relative aspect-[3/4] overflow-hidden rounded-sm">
          <img
            src="https://conturelle.com/wp-content/uploads/2021/08/80505_81005_528_3354-1024x768.jpg"
            alt="Conturelle heritage craftsmanship"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[rgba(21,8,16,0.4)] to-transparent" />
        </div>

        <div className="flex flex-col gap-6">
          <p className="text-[10px] tracking-[0.15em] uppercase text-[var(--terracotta)]">
            European Craft Since 1885
          </p>
          <h2 className="font-[family-name:var(--font-cormorant)] text-[36px] md:text-[42px] font-light leading-[1.1] text-[var(--cream)]">
            140 Years in the Making
          </h2>
          <div className="gold-line" />
          <p className="text-[13px] leading-[1.9] text-[rgba(245,239,232,0.5)]">
            Every Conturelle bra is assembled from up to 80 individual pieces &mdash;
            each one cut, sewn, and finished by skilled artisans in Europe. From
            the first thread of yarn to the finished product, we control every step.
          </p>
          <div className="flex gap-10 mt-2">
            <div>
              <div className="font-[family-name:var(--font-cormorant)] text-[36px] font-light text-[var(--gold)] leading-none">80</div>
              <div className="text-[10px] tracking-[0.08em] text-[rgba(245,239,232,0.4)] mt-1">Pieces per bra</div>
            </div>
            <div>
              <div className="font-[family-name:var(--font-cormorant)] text-[36px] font-light text-[var(--gold)] leading-none">100%</div>
              <div className="text-[10px] tracking-[0.08em] text-[rgba(245,239,232,0.4)] mt-1">European made</div>
            </div>
          </div>
          <a href="#" className="line-link text-[10px] tracking-[0.12em] uppercase text-[var(--gold)] no-underline self-start mt-2">
            Our Story &rarr;
          </a>
        </div>
      </section>

      {/* Fit Finder CTA — promoted to higher position */}
      <section id="fit-finder" className="relative z-[2] overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#3d1028_0%,#150810_40%,#2B1021_70%,#4a1825_100%)]" />
        <div className="relative z-[2] text-center py-20 md:py-28 px-6 md:px-12">
          <p className="text-[10px] tracking-[0.15em] uppercase text-[var(--terracotta)] mb-6">
            No measuring tape needed
          </p>
          <h2 className="font-[family-name:var(--font-cormorant)] text-[clamp(36px,8vw,80px)] font-light leading-[0.95] text-[var(--cream)]">
            Find Your Perfect Fit
          </h2>
          <p className="mt-6 text-[12px] text-[rgba(245,239,232,0.4)] max-w-[400px] mx-auto leading-relaxed">
            Answer 4 quick questions and we&rsquo;ll match you to your ideal size and style. Sizes EU 70&ndash;100, cups B&ndash;G.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 sm:gap-8 justify-center items-center">
            <a href="#" className="inline-block py-4 px-12 bg-[var(--burgundy)] border border-[var(--burgundy)] text-[10px] tracking-[0.15em] uppercase text-[var(--cream)] no-underline hover:bg-transparent hover:border-[var(--rose)] hover:text-[var(--rose)] transition-all">
              Start the Fit Quiz
            </a>
            <a href="#" className="text-[10px] tracking-[0.1em] uppercase text-[rgba(245,239,232,0.45)] no-underline border-b border-[rgba(245,239,232,0.2)] pb-[3px] hover:text-[var(--gold)] hover:border-[var(--gold)] transition-colors">
              View Size Guide
            </a>
          </div>
        </div>
      </section>

      {/* Bestsellers */}
      <section id="collection" className="relative z-[2] py-20 px-6 md:px-12 max-w-[1400px] mx-auto">
        <div className="flex items-end justify-between mb-12">
          <h2 className="font-[family-name:var(--font-cormorant)] text-[36px] md:text-[48px] font-light text-[var(--cream)]">
            Bestsellers
          </h2>
          <p className="text-[10px] tracking-[0.1em] uppercase text-[rgba(245,239,232,0.3)] hidden md:block">
            The pieces our customers come back for
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>

      {/* Reviews */}
      <section id="reviews" className="py-20 px-6 md:px-12 max-w-[1400px] mx-auto">
        <div className="flex items-end justify-between mb-10">
          <h2 className="font-[family-name:var(--font-cormorant)] text-[36px] md:text-[48px] font-light text-[var(--cream)]">
            What Our Customers Say
          </h2>
          <p className="text-[10px] tracking-[0.1em] uppercase text-[rgba(245,239,232,0.3)] hidden md:block">
            @conturelle
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {reviews.map((review, i) => (
            <div key={i} className="bg-[var(--mid)] border border-[rgba(201,169,110,0.06)] overflow-hidden rounded-sm">
              <div className="aspect-square overflow-hidden">
                <img src={review.image} alt={`Review by ${review.author}`} className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div className="p-4">
                <div className="text-[var(--star-gold)] text-[11px]">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
                <p className="font-[family-name:var(--font-cormorant)] text-sm italic text-[rgba(245,239,232,0.5)] leading-relaxed my-2">
                  &ldquo;{review.quote}&rdquo;
                </p>
                <p className="text-[10px] tracking-[0.08em] text-[rgba(245,239,232,0.35)]">
                  &mdash; {review.author}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Email Capture — single, clean inline section */}
      <section className="relative z-[2] py-20 px-6 md:px-12 text-center bg-[var(--mid)] border-t border-b border-[rgba(201,169,110,0.1)]">
        <h2 className="font-[family-name:var(--font-cormorant)] text-[clamp(32px,5vw,56px)] font-light leading-[1] text-[var(--cream)]">
          10% Off Your First Order
        </h2>
        <p className="mt-4 text-[12px] text-[rgba(245,239,232,0.45)] max-w-[360px] mx-auto leading-relaxed">
          Join our list for early access to new collections and exclusive offers.
        </p>
        <div className="inline-flex flex-col sm:flex-row gap-0 mt-8 max-w-[440px] w-full">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 py-3.5 px-5 bg-[rgba(21,8,16,0.6)] border border-[rgba(201,169,110,0.15)] sm:border-r-0 text-[var(--cream)] text-xs tracking-[0.03em] outline-none placeholder:text-[rgba(245,239,232,0.3)] focus:border-[var(--gold)]"
          />
          <button className="py-3.5 px-8 bg-[var(--burgundy)] border border-[var(--burgundy)] text-[10px] tracking-[0.15em] uppercase text-[var(--cream)] cursor-pointer whitespace-nowrap hover:bg-transparent hover:border-[var(--rose)] hover:text-[var(--rose)] transition-all">
            Subscribe
          </button>
        </div>
        <p className="mt-3 text-[10px] text-[rgba(245,239,232,0.25)]">
          No spam. Unsubscribe anytime.
        </p>
      </section>
    </div>
  );
}
