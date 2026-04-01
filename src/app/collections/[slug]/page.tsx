import Image from "next/image";
import { notFound } from "next/navigation";
import { collections, getCollection, getProductsByCollection } from "@/lib/products";
import ProductCard from "@/components/ProductCard";

export function generateStaticParams() {
  return collections.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const collection = getCollection(slug);
  if (!collection) return { title: "Collection Not Found | Conturelle" };
  return {
    title: `${collection.name} | Conturelle`,
    description: collection.description,
  };
}

export default async function CollectionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const collection = getCollection(slug);

  if (!collection) {
    notFound();
  }

  const collectionProducts = getProductsByCollection(collection.key);

  return (
    <main className="min-h-screen bg-[var(--bg)]">
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px] max-h-[600px] overflow-hidden">
        <Image
          src={collection.heroImage}
          alt={collection.name}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/10" />

        <div className="absolute inset-0 flex items-end">
          <div className="max-w-[1400px] mx-auto w-full px-4 sm:px-6 lg:px-8 pb-12 md:pb-16 text-white">
            <p className="text-xs tracking-[0.25em] uppercase opacity-60 mb-2">
              {collection.brand} &middot; Collection {collection.number}
            </p>
            <h1 className="font-[var(--font-cormorant)] text-4xl md:text-5xl lg:text-6xl mb-3">
              {collection.name}
            </h1>
            <p className="max-w-xl text-sm md:text-base opacity-80 leading-relaxed">
              {collection.description}
            </p>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-[var(--font-cormorant)] text-2xl md:text-3xl text-[var(--text)]">
            The Collection
          </h2>
          <span className="text-sm text-[var(--text-muted)]">
            {collectionProducts.length} {collectionProducts.length === 1 ? "piece" : "pieces"}
          </span>
        </div>

        {collectionProducts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-[var(--text-muted)]">No products available in this collection yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {collectionProducts.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
