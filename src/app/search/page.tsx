"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect, useCallback, Suspense } from "react";
import { searchProducts } from "@/lib/products";
import ProductCard from "@/components/ProductCard";

const suggestions = [
  "Balconette bra",
  "Spacer bra",
  "Lace thong",
  "Full cup",
  "Bodysuit",
  "Minimizer",
];

function SearchInner() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialQuery = searchParams.get("q") ?? "";
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<ReturnType<typeof searchProducts>>([]);
  const [hasSearched, setHasSearched] = useState(initialQuery.length > 0);

  const runSearch = useCallback(
    (q: string) => {
      const trimmed = q.trim();
      if (trimmed.length === 0) {
        setResults([]);
        setHasSearched(false);
        return;
      }
      setResults(searchProducts(trimmed));
      setHasSearched(true);
      /* Update URL without full navigation */
      const params = new URLSearchParams();
      params.set("q", trimmed);
      router.replace(`/search?${params.toString()}`, { scroll: false });
    },
    [router]
  );

  /* Run once on mount if there is an initial query */
  useEffect(() => {
    if (initialQuery) {
      runSearch(initialQuery);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    runSearch(value);
  };

  const handleSuggestion = (s: string) => {
    setQuery(s);
    runSearch(s);
  };

  return (
    <main
      className="min-h-screen"
      style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}
    >
      {/* Search header */}
      <section className="px-6 pt-20 pb-10 max-w-3xl mx-auto text-center">
        <h1
          className="text-4xl md:text-5xl font-light tracking-wide mb-8"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          Search
        </h1>
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={handleChange}
            placeholder="What are you looking for?"
            autoFocus
            className="w-full px-6 py-4 rounded-full text-sm outline-none transition-shadow focus:shadow-md"
            style={{
              backgroundColor: "var(--bg-card)",
              border: "1px solid var(--border)",
              color: "var(--text)",
            }}
          />
          {query.length > 0 && (
            <button
              onClick={() => {
                setQuery("");
                setResults([]);
                setHasSearched(false);
                router.replace("/search", { scroll: false });
              }}
              className="absolute right-5 top-1/2 -translate-y-1/2 text-lg leading-none"
              style={{ color: "var(--text-faint)" }}
              aria-label="Clear search"
            >
              &times;
            </button>
          )}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-24">
        {/* Results */}
        {hasSearched && results.length > 0 && (
          <>
            <p className="text-sm mb-8" style={{ color: "var(--text-muted)" }}>
              {results.length} result{results.length !== 1 ? "s" : ""} for{" "}
              <span className="font-medium" style={{ color: "var(--text)" }}>
                &ldquo;{query.trim()}&rdquo;
              </span>
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {results.map((product) => (
                <ProductCard key={product.slug} product={product} />
              ))}
            </div>
          </>
        )}

        {/* No results */}
        {hasSearched && results.length === 0 && (
          <div className="text-center py-16">
            <p
              className="text-lg mb-2"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              No results found
            </p>
            <p className="text-sm mb-8" style={{ color: "var(--text-muted)" }}>
              We could not find anything matching &ldquo;{query.trim()}&rdquo;.
              Try a different term or browse our suggestions below.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => handleSuggestion(s)}
                  className="px-5 py-2 rounded-full text-sm transition-colors hover:opacity-80"
                  style={{
                    backgroundColor: "var(--bg-subtle)",
                    border: "1px solid var(--border)",
                    color: "var(--text-muted)",
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Empty / initial state */}
        {!hasSearched && (
          <div className="text-center py-16">
            <p className="text-sm mb-6" style={{ color: "var(--text-muted)" }}>
              Start typing to search, or try one of these:
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => handleSuggestion(s)}
                  className="px-5 py-2 rounded-full text-sm transition-colors hover:opacity-80"
                  style={{
                    backgroundColor: "var(--bg-subtle)",
                    border: "1px solid var(--border)",
                    color: "var(--text-muted)",
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}
      </section>
    </main>
  );
}

export default function SearchPage() {
  return (
    <Suspense>
      <SearchInner />
    </Suspense>
  );
}
