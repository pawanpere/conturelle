export default function EditorialBreak({
  image,
  alt = "Editorial",
}: {
  image: string;
  alt?: string;
}) {
  return (
    <section className="w-full">
      <div className="aspect-[16/9] md:aspect-[21/9] overflow-hidden">
        <img
          src={image}
          alt={alt}
          className="w-full h-full object-cover object-center"
          loading="lazy"
        />
      </div>
    </section>
  );
}
