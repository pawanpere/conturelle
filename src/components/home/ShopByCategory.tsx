import Link from "next/link";

const categories = [
  {
    name: "Embroidery",
    description: "Artisan lace & detail",
    image: "/images/80505_81305_004_21342-1024x768.jpg",
    href: "/shop?style=embroidery",
  },
  {
    name: "Lace",
    description: "Feminine elegance",
    image: "/images/805838_813838_535_16175.jpg",
    href: "/shop?style=lace",
  },
  {
    name: "Shape",
    description: "Smooth & sculpting",
    image: "/images/80622_88022_004_26540_1200x800px-1024x683.jpg",
    href: "/shop?style=shape",
  },
  {
    name: "Daily",
    description: "Everyday essentials",
    image: "/images/806810_815810_004_8222_1200x800px-1024x683.jpg",
    href: "/shop?style=daily",
  },
  {
    name: "Corsetry",
    description: "Classic support",
    image: "/images/5076_004_023_1200x800px-1024x683.jpg",
    href: "/shop?style=corsetry",
  },
];

export default function ShopByCategory() {
  return (
    <section className="py-20 px-6 md:px-12 max-w-[1400px] mx-auto">
      <div className="flex items-end justify-between mb-10">
        <h2 className="font-[family-name:var(--font-cormorant)] text-[36px] md:text-[48px] font-light text-[var(--text)]">
          Shop by Style
        </h2>
        <Link
          href="/shop"
          className="text-[10px] tracking-[0.06em] uppercase text-[var(--text-muted)] hover:text-[var(--text)] transition-colors no-underline hidden md:block"
        >
          View All &rarr;
        </Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {categories.map((cat) => (
          <Link
            key={cat.name}
            href={cat.href}
            className="relative aspect-[3/4] overflow-hidden flex items-end p-5 no-underline group cursor-pointer"
          >
            <img
              src={cat.image}
              alt={cat.name}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-[1.04]"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[rgba(45,41,38,0.7)] via-[rgba(45,41,38,0.1)] to-transparent" />
            <div className="relative z-[1]">
              <span className="font-[family-name:var(--font-cormorant)] text-[22px] text-white font-light block leading-tight">
                {cat.name}
              </span>
              <span className="text-[10px] tracking-[0.04em] text-white/60 mt-0.5 block">
                {cat.description}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
