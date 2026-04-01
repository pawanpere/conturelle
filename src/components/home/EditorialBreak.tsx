import Link from "next/link";

export default function EditorialBreak({
  image,
  alt = "Editorial",
  headline,
  subtext,
  cta,
  ctaHref = "/shop",
  align = "right",
}: {
  image: string;
  alt?: string;
  headline?: string;
  subtext?: string;
  cta?: string;
  ctaHref?: string;
  align?: "left" | "right" | "center";
}) {
  const alignClass =
    align === "left"
      ? "items-start text-left left-8 md:left-16"
      : align === "center"
      ? "items-center text-center left-1/2 -translate-x-1/2"
      : "items-end text-right right-8 md:right-16";

  return (
    <section className="relative w-full overflow-hidden">
      <img
        src={image}
        alt={alt}
        className="w-full h-auto block"
        loading="lazy"
      />
      {headline && (
        <>
          <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/10 to-transparent" />
          <div
            className={`absolute bottom-8 md:bottom-12 z-[1] flex flex-col gap-2 ${alignClass}`}
          >
            {subtext && (
              <p className="text-[10px] md:text-[11px] tracking-[0.12em] uppercase text-white/60">
                {subtext}
              </p>
            )}
            <h3 className="font-[family-name:var(--font-cormorant)] text-[28px] md:text-[42px] font-light text-white leading-tight">
              {headline}
            </h3>
            {cta && (
              <Link
                href={ctaHref}
                className="mt-2 inline-block text-[10px] tracking-[0.1em] uppercase text-white/80 no-underline border-b border-white/40 pb-[2px] hover:text-white hover:border-white transition-colors"
              >
                {cta}
              </Link>
            )}
          </div>
        </>
      )}
    </section>
  );
}
