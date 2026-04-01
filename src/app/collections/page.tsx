import Link from "next/link";
import Image from "next/image";
import { collections, getProductsByCollection } from "@/lib/products";

export const metadata = {
  title: "Collections | Conturelle",
  description: "Explore our curated lingerie collections — from timeless classics to modern silhouettes.",
};

export default function CollectionsPage() {
  return (
    <main className="min-h-screen bg-[var(--bg)]">
      {/* Hero */}
      <div className="bg-[var(--bg-subtle)] py-20 text-center">
        <h1 className="font-[var(--font-cormorant)] text-4xl md:text-5xl lg:text-6xl text-[var(--text)] mb-3">
          Our Collections
        </h1>
        <p className="text-[var(--text-muted)] max-w-lg mx-auto text-sm md:text-base leading-relaxed px-4">
          Each collection is a story of craftsmanship and elegance, designed to celebrate the beauty of every silhouette.
        </p>
      </div>

      {/* Collections grid */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {collections.map((collection) => {
            const collectionProducts = getProductsByCollection(collection.key);
            return (
              <Link
                key={collection.key}
                href={`/collections/${collection.slug}`}
                className="group block"
              >
                <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-[var(--bg-subtle)]">
                  <Image
                    src={collection.heroImage}
                    alt={collection.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

                  {/* Content overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <p className="text-xs tracking-[0.2em] uppercase opacity-70 mb-1">
                      Collection {collection.number}
                    </p>
                    <h2 className="font-[var(--font-cormorant)] text-2xl md:text-3xl mb-1">
                      {collection.name}
                    </h2>
                    <p className="text-sm opacity-70">
                      {collectionProducts.length} {collectionProducts.length === 1 ? "piece" : "pieces"}
                    </p>
                  </div>
                </div>

                {/* Description below card */}
                <div className="mt-3 px-1">
                  <p className="text-[var(--text-muted)] text-sm line-clamp-2 leading-relaxed">
                    {collection.description}
                  </p>
                  <span className="inline-block mt-2 text-xs text-[var(--accent)] tracking-wider uppercase group-hover:underline">
                    Explore Collection
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}
