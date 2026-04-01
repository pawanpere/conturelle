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
      {/* SECTION 3: Hero — woman in lace lingerie from felina.de */}
      <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
        {/* Hero background image — Conturelle Provence model */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url("https://conturelle.com/wp-content/uploads/2021/08/80505_81305_004_21342.jpg")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center top',
          }}
        />
        {/* Dark burgundy overlay for text readability */}
        <div className="absolute inset-0 z-0 bg-[rgba(21,8,16,0.68)]" />

        {/* Lace pattern overlay for texture */}
        <div className="absolute inset-0 z-[1] opacity-[0.06]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300' viewBox='0 0 300 300'%3E%3Cg fill='none' stroke='%23f5efe8' stroke-width='0.5'%3E%3Ccircle cx='150' cy='150' r='140'/%3E%3Ccircle cx='150' cy='150' r='110'/%3E%3Ccircle cx='150' cy='150' r='80'/%3E%3Ccircle cx='150' cy='150' r='50'/%3E%3Ccircle cx='150' cy='150' r='20'/%3E%3Cpath d='M150 10 Q200 80 150 150 Q100 220 150 290'/%3E%3Cpath d='M10 150 Q80 100 150 150 Q220 200 290 150'/%3E%3Cpath d='M40 40 Q100 100 150 150 Q200 200 260 260'/%3E%3Cpath d='M260 40 Q200 100 150 150 Q100 200 40 260'/%3E%3Cpath d='M150 10 Q240 60 260 150 Q240 240 150 290 Q60 240 40 150 Q60 60 150 10Z'/%3E%3Cellipse cx='150' cy='75' rx='45' ry='22'/%3E%3Cellipse cx='150' cy='225' rx='45' ry='22'/%3E%3Cellipse cx='75' cy='150' rx='22' ry='45'/%3E%3Cellipse cx='225' cy='150' rx='22' ry='45'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '300px 300px',
          backgroundRepeat: 'repeat',
        }} />

        <div className="absolute w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(74,24,37,0.35)_0%,transparent_70%)] top-[10%] left-[35%] blur-[60px] animate-glow z-[1]" />

        <div className="relative z-[2] text-center px-4">
          <p className="text-[9px] tracking-[0.4em] uppercase text-[var(--terracotta)] mb-6">
            140 Years of German Precision
          </p>
          <h1 className="font-[family-name:var(--font-cormorant)] text-[clamp(48px,10vw,130px)] font-light leading-[0.9] tracking-[-0.02em] text-[var(--cream)]">
            Engineered for<br />the Way You <em className="italic text-[var(--rose)]">Move</em>
          </h1>
          <p className="mt-7 text-[10px] tracking-[0.35em] uppercase text-[rgba(245,239,232,0.5)]">
            80 pieces &middot; Perfect fit &middot; Made in Europe
          </p>
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-5">
            <a href="#collection" className="hero-cta inline-block py-3.5 px-10 border border-[rgba(245,239,232,0.4)] text-[9px] tracking-[0.35em] uppercase text-[var(--cream)] no-underline">
              <span className="relative z-[1]">Shop the Collection</span>
            </a>
            <a href="#fit-finder" className="text-[10px] tracking-[0.25em] uppercase text-[rgba(245,239,232,0.5)] no-underline border-b border-[rgba(245,239,232,0.3)] pb-[3px] hover:text-[var(--gold)] hover:border-[var(--gold)] transition-colors">
              Find Your Perfect Fit &rarr;
            </a>
          </div>
        </div>

        {/* Corner elements */}
        <div className="absolute bottom-12 left-6 md:left-12 text-[9px] tracking-[0.2em] text-[rgba(245,239,232,0.35)] uppercase leading-loose">
          <span>EUROPE <span className="animate-blink">EST. 1885</span></span><br />
          <span>CONTURELLE BY FELINA</span><br />
          <span>EUROPEAN LINGERIE GROUP</span>
        </div>
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-[9px] tracking-[0.3em] text-[rgba(245,239,232,0.35)] uppercase whitespace-nowrap hidden md:block">
          From yarn to perfect fit &mdash; every step, ours.
        </div>
        <div className="absolute bottom-12 right-6 md:right-12 text-[8px] tracking-[0.15em] text-[rgba(201,169,110,0.6)] uppercase text-right leading-loose">
          &#9733;&#9733;&#9733;&#9733;&#9733; 4.8/5<br />2,000+ REVIEWS
        </div>
      </section>

      {/* SECTION 4: Brag Bar */}
      <div className="relative z-[2] border-t border-b border-[rgba(201,169,110,0.1)] py-4.5 px-6 md:px-12 bg-[var(--mid)] flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8">
        <div className="flex items-center gap-2">
          <span className="text-[var(--star-gold)] text-xs">&#9733;&#9733;&#9733;&#9733;&#9733;</span>
          <span className="text-[10px] tracking-[0.2em] uppercase text-[rgba(245,239,232,0.5)]">
            Rated 4.8/5 by 2,000+ women
          </span>
        </div>
        <span className="text-[rgba(201,169,110,0.2)] text-lg hidden md:inline">&middot;</span>
        <span className="text-[10px] tracking-[0.2em] uppercase text-[rgba(245,239,232,0.5)]">
          As Featured In Vogue DE &middot; Elle &middot; Brigitte
        </span>
        <span className="text-[rgba(201,169,110,0.2)] text-lg hidden md:inline">&middot;</span>
        <span className="text-[10px] tracking-[0.2em] uppercase text-[rgba(245,239,232,0.5)]">
          Est. 1885 &mdash; 140 Years of Craft
        </span>
      </div>

      {/* SECTION 5: Category Navigation Tiles */}
      <section id="categories" className="py-20 px-6 md:px-12 max-w-[1400px] mx-auto">
        <div className="flex items-end gap-6 mb-12">
          <div className="font-[family-name:var(--font-cormorant)] text-[80px] font-light text-[rgba(245,239,232,0.06)] leading-none tracking-[-0.05em]">01</div>
          <h2 className="font-[family-name:var(--font-cormorant)] text-[36px] md:text-[48px] font-light text-[var(--cream)]">
            Shop by <em className="italic text-[var(--terracotta)]">Style</em>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
          {categories.map((cat) => (
            <a key={cat.name} href="#collection" className="relative aspect-[4/3] overflow-hidden flex items-end p-6 no-underline group cursor-pointer rounded-sm">
              <img
                src={cat.image}
                alt={cat.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-[1.04]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(21,8,16,0.75)] via-[rgba(21,8,16,0.15)] to-transparent" />
              <span className="relative z-[1] font-[family-name:var(--font-cormorant)] text-[22px] text-white font-light">
                {cat.name}
              </span>
              {cat.badge && (
                <span className="absolute top-4 right-4 z-[1] text-[8px] tracking-[0.2em] uppercase text-white bg-[var(--sale-red)] px-2.5 py-1">
                  {cat.badge}
                </span>
              )}
            </a>
          ))}
        </div>
      </section>

      {/* SECTION 6: Heritage / Editorial */}
      <section id="heritage" className="relative z-[2] py-20 md:py-28 px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-12 items-center max-w-[1400px] mx-auto">
        <div className="flex flex-col gap-10">
          {[
            { num: "80", label: "Pieces per bra" },
            { num: "140", label: "Years of heritage" },
            { num: "100%", label: "European made" },
          ].map((stat) => (
            <div key={stat.label} className="border-l-2 border-[var(--rose)] pl-5">
              <div className="font-[family-name:var(--font-cormorant)] text-[42px] font-light text-[var(--gold)] leading-none">
                {stat.num}
              </div>
              <div className="text-[8px] tracking-[0.3em] uppercase text-[rgba(245,239,232,0.5)] mt-1.5">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        <div className="relative aspect-[3/4] overflow-hidden rounded-sm">
          <div className="w-full h-full relative overflow-hidden">
            <img
              src="https://conturelle.com/wp-content/uploads/2021/08/80505_81005_528_3354-1024x768.jpg"
              alt="Conturelle Provence Collection"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[rgba(21,8,16,0.4)] to-transparent" />
            <div className="absolute top-5 left-5 text-[8px] tracking-[0.2em] uppercase text-white/60">
              EST. &mdash; 1885
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-8 md:text-right">
          <div>
            <p className="text-[9px] tracking-[0.35em] uppercase text-[var(--terracotta)] mb-4">
              The Conturelle Difference
            </p>
            <h2 className="font-[family-name:var(--font-cormorant)] text-[42px] font-light leading-[1.1] text-[var(--cream)]">
              140 Years<br />in the <em className="italic text-[var(--terracotta)]">Making</em>
            </h2>
            <div className="gold-line md:ml-auto" />
          </div>
          <p className="text-[11px] leading-loose text-[rgba(245,239,232,0.5)] tracking-[0.05em]">
            Every Conturelle bra is assembled from up to 80 individual pieces &mdash;
            each one cut, sewn, and finished by skilled artisans in Europe. From
            the first thread of yarn to the finished product on your shoulders,
            we control every step. That&rsquo;s how we guarantee a fit no one else can.
          </p>
          <a href="#" className="line-link text-[9px] tracking-[0.3em] uppercase text-[var(--gold)] no-underline md:self-end">
            Discover Our Story &rarr;
          </a>
        </div>
      </section>

      {/* SECTION 7: Bestseller Product Grid */}
      <section id="collection" className="relative z-[2] py-20 px-6 md:px-12 max-w-[1400px] mx-auto">
        <div className="flex items-end justify-between mb-14">
          <div className="flex items-end gap-6">
            <div className="font-[family-name:var(--font-cormorant)] text-[80px] font-light text-[rgba(245,239,232,0.06)] leading-none tracking-[-0.05em]">02</div>
            <h2 className="font-[family-name:var(--font-cormorant)] text-[36px] md:text-[48px] font-light text-[var(--cream)]">
              Our <em className="italic text-[var(--terracotta)]">Bestsellers</em>
            </h2>
          </div>
          <div className="hidden md:block">
            <p className="text-[9px] tracking-[0.3em] uppercase text-[rgba(245,239,232,0.3)]">
              The pieces our customers come back for, again and again
            </p>
            <div className="gold-line ml-auto w-6 mt-2" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>

      {/* SECTION 8: Feature Strip / Value Props */}
      <div className="border-t border-b border-[rgba(201,169,110,0.1)] bg-[var(--mid)] relative z-[2]">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-0 max-w-[1400px] mx-auto py-20 px-6 md:px-12">
          {[
            { num: "01 /", title: ["European ", "Craft"], text: "Every bra assembled from up to 80 individual pieces by skilled European artisans. 140 years of perfecting the art of fit." },
            { num: "02 /", title: ["Perfect ", "Fit"], text: "Our Fit Finder quiz matches your measurements to your ideal size. Sizes EU 70-100, cups B through G. No more guessing." },
            { num: "03 /", title: ["Free ", "Returns"], text: "Not quite right? Return within 30 days, no questions asked. Free shipping on orders over \u20ac75. We make it easy." },
            { num: "04 /", title: ["Yarn to ", "You"], text: "We control every step \u2014 from the first thread of premium European fabric to the finished product on your shoulders." },
          ].map((feature, i) => (
            <div key={i} className={`px-0 md:px-10 py-8 md:py-0 ${i > 0 ? "border-t md:border-t-0 md:border-l border-[rgba(201,169,110,0.1)]" : ""} ${i === 0 ? "md:pl-0" : ""}`}>
              <div className="font-[family-name:var(--font-cormorant)] text-[11px] text-[var(--terracotta)] tracking-[0.2em] mb-5">
                {feature.num}
              </div>
              <div className="font-[family-name:var(--font-cormorant)] text-[22px] font-light text-[var(--cream)] leading-[1.3] mb-3">
                {feature.title[0]}<em className="italic">{feature.title[1]}</em>
              </div>
              <p className="text-[10px] leading-loose text-[rgba(245,239,232,0.5)] tracking-[0.03em]">
                {feature.text}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 9: Fit Finder CTA */}
      <section id="fit-finder" className="relative z-[2] overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#3d1028_0%,#150810_40%,#2B1021_70%,#4a1825_100%)]" />
        <div className="absolute inset-0 overflow-hidden">
          <svg width="100%" height="100%" viewBox="0 0 1400 520" preserveAspectRatio="none">
            <path d="M0 260 Q350 200 700 260 Q1050 320 1400 260" stroke="rgba(201,169,110,0.06)" strokeWidth="1" fill="none" />
            <path d="M0 200 Q350 260 700 200 Q1050 140 1400 200" stroke="rgba(165,40,72,0.08)" strokeWidth="1" fill="none" />
          </svg>
        </div>
        <div className="relative z-[2] text-center py-24 md:py-32 px-6 md:px-12">
          <p className="text-[9px] tracking-[0.5em] uppercase text-[var(--terracotta)] mb-8">
            Reduce Returns. Build Confidence.
          </p>
          <h2 className="font-[family-name:var(--font-cormorant)] text-[clamp(36px,8vw,100px)] font-light leading-[0.95] text-[var(--cream)]">
            Find Your Perfect<br /><em className="italic text-[var(--rose)]">Fit</em>
          </h2>
          <p className="mt-8 text-[10px] tracking-[0.3em] uppercase text-[rgba(245,239,232,0.35)] max-w-[400px] mx-auto leading-loose">
            No measuring tape needed. Answer 4 quick questions and we&rsquo;ll recommend your ideal size and style.
          </p>
          <div className="mt-12 flex flex-col sm:flex-row gap-4 sm:gap-12 justify-center items-center">
            <a href="#" className="inline-block py-4 px-12 bg-[var(--burgundy)] border border-[var(--burgundy)] text-[9px] tracking-[0.35em] uppercase text-[var(--cream)] no-underline hover:bg-transparent hover:border-[var(--rose)] hover:text-[var(--rose)] transition-all">
              Start the Fit Quiz
            </a>
            <a href="#" className="text-[9px] tracking-[0.3em] uppercase text-[rgba(245,239,232,0.5)] no-underline border-b border-[rgba(245,239,232,0.2)] pb-[3px] hover:text-[var(--gold)] hover:border-[var(--gold)] transition-colors">
              View Size Guide
            </a>
          </div>
          <p className="mt-8 font-[family-name:var(--font-cormorant)] text-sm italic text-[rgba(245,239,232,0.35)] max-w-[500px] mx-auto">
            &ldquo;This quiz got my size exactly right. First bra I haven&rsquo;t had to return.&rdquo; &mdash; Maria K.
          </p>
        </div>
      </section>

      {/* SECTION 10: UGC / Reviews */}
      <section id="reviews" className="py-20 px-6 md:px-12 max-w-[1400px] mx-auto">
        <div className="flex items-end justify-between mb-10">
          <div className="flex items-end gap-6">
            <div className="font-[family-name:var(--font-cormorant)] text-[80px] font-light text-[rgba(245,239,232,0.06)] leading-none tracking-[-0.05em]">03</div>
            <h2 className="font-[family-name:var(--font-cormorant)] text-[36px] md:text-[48px] font-light text-[var(--cream)]">
              Real Women.<br /><em className="italic text-[var(--terracotta)]">Real Fit.</em>
            </h2>
          </div>
          <p className="text-[9px] tracking-[0.3em] uppercase text-[rgba(245,239,232,0.3)] hidden md:block">
            Tag @conturelle to be featured
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {reviews.map((review, i) => (
            <div key={i} className="bg-[var(--mid)] border border-[rgba(201,169,110,0.06)] overflow-hidden rounded-sm">
              <div className="aspect-square overflow-hidden">
                <img src={review.image} alt={`Review by ${review.author}`} className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div className="p-4">
                <div className="text-[var(--star-gold)] text-[10px]">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
                <p className="font-[family-name:var(--font-cormorant)] text-sm italic text-[rgba(245,239,232,0.5)] leading-relaxed my-2">
                  &ldquo;{review.quote}&rdquo;
                </p>
                <p className="text-[9px] tracking-[0.2em] uppercase text-[rgba(245,239,232,0.3)]">
                  &mdash; {review.author}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 11: Email Capture */}
      <section className="relative z-[2] py-24 px-6 md:px-12 text-center bg-[var(--mid)] border-t border-b border-[rgba(201,169,110,0.1)]">
        <h2 className="font-[family-name:var(--font-cormorant)] text-[clamp(36px,6vw,72px)] font-light leading-[0.95] text-[var(--cream)]">
          Your First Fit<br />Is <em className="italic text-[var(--terracotta)]">On Us</em>
        </h2>
        <p className="mt-8 text-[10px] tracking-[0.3em] uppercase text-[rgba(245,239,232,0.5)] max-w-[400px] mx-auto leading-loose">
          Get 10% off your first order + exclusive early access to new collections.
        </p>
        <div className="inline-flex flex-col sm:flex-row gap-0 mt-10 max-w-[480px] w-full">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 py-4 px-5 bg-[rgba(21,8,16,0.6)] border border-[rgba(201,169,110,0.15)] sm:border-r-0 text-[var(--cream)] text-xs tracking-[0.05em] outline-none placeholder:text-[rgba(245,239,232,0.3)] focus:border-[var(--gold)]"
          />
          <button className="py-4 px-10 bg-[var(--burgundy)] border border-[var(--burgundy)] text-[9px] tracking-[0.35em] uppercase text-[var(--cream)] cursor-pointer whitespace-nowrap hover:bg-transparent hover:border-[var(--rose)] hover:text-[var(--rose)] transition-all">
            Get 10% Off
          </button>
        </div>
        <p className="mt-4 text-[9px] tracking-[0.15em] text-[rgba(245,239,232,0.3)]">
          No spam. Unsubscribe anytime. We respect your privacy.
        </p>
      </section>

      {/* SECTION 12: Campaign Banner */}
      <section className="relative z-[2] min-h-[520px] flex items-center justify-center overflow-hidden my-10">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#3d1028_0%,#150810_40%,#2B1021_70%,#4a1825_100%)]" />
        <div className="absolute inset-0 overflow-hidden">
          <svg width="100%" height="100%" viewBox="0 0 1400 520" preserveAspectRatio="none">
            <path d="M0 260 Q350 200 700 260 Q1050 320 1400 260" stroke="rgba(201,169,110,0.06)" strokeWidth="1" fill="none" />
            <path d="M0 200 Q350 260 700 200 Q1050 140 1400 200" stroke="rgba(165,40,72,0.08)" strokeWidth="1" fill="none" />
            <path d="M0 320 Q350 380 700 320 Q1050 260 1400 320" stroke="rgba(201,169,110,0.04)" strokeWidth="1" fill="none" />
          </svg>
        </div>
        <div className="relative z-[2] text-center py-20 px-6 md:px-12">
          <p className="text-[9px] tracking-[0.5em] uppercase text-[var(--terracotta)] mb-8">
            Spring Collection 2026
          </p>
          <h2 className="font-[family-name:var(--font-cormorant)] text-[clamp(52px,8vw,100px)] font-light leading-[0.95] text-[var(--cream)]">
            New<br /><em className="italic text-[var(--rose)]">Arrivals</em>
          </h2>
          <p className="mt-8 text-[10px] tracking-[0.3em] uppercase text-[rgba(245,239,232,0.35)] max-w-[400px] mx-auto leading-loose">
            Fresh styles in the lightest European fabrics. Designed for warm days and effortless comfort.
          </p>
          <div className="mt-12 flex flex-col sm:flex-row gap-4 sm:gap-12 justify-center items-center">
            <a href="#collection" className="inline-block py-4 px-12 bg-[var(--burgundy)] border border-[var(--burgundy)] text-[9px] tracking-[0.35em] uppercase text-[var(--cream)] no-underline hover:bg-transparent hover:border-[var(--rose)] hover:text-[var(--rose)] transition-all">
              Shop New Arrivals
            </a>
            <a href="#collection" className="text-[9px] tracking-[0.3em] uppercase text-[rgba(245,239,232,0.5)] no-underline border-b border-[rgba(245,239,232,0.2)] pb-[3px] hover:text-[var(--gold)] hover:border-[var(--gold)] transition-colors">
              Shop Sale &mdash; Up to 30% Off
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
