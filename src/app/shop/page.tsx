"use client";

import { useState, useMemo, useCallback, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  products,
  collections,
  getAllProductTypes,
  getAllColors,
  getProductsByCollection,
  getProductsByType,
  getProductsByStyle,
  getProductsByColor,
  getNewArrivals,
} from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import type { Product } from "@/lib/products";

const STYLE_OPTIONS = ["embroidery", "lace", "shape", "daily", "corsetry"];
const SORT_OPTIONS = [
  { label: "Recommended", value: "recommended" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Newest", value: "newest" },
] as const;

type SortValue = (typeof SORT_OPTIONS)[number]["value"];

function FilterSection({
  title,
  options,
  selected,
  onToggle,
}: {
  title: string;
  options: { label: string; value: string }[];
  selected: string[];
  onToggle: (value: string) => void;
}) {
  const [open, setOpen] = useState(true);
  return (
    <div className="border-b border-[var(--border)] pb-4 mb-4">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full text-left font-[var(--font-cormorant)] text-lg text-[var(--text)] mb-2"
      >
        <span>{title}</span>
        <svg
          className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="flex flex-col gap-1.5 mt-1">
          {options.map((opt) => (
            <label
              key={opt.value}
              className="flex items-center gap-2 cursor-pointer text-sm text-[var(--text)] hover:text-[var(--accent)] transition-colors"
            >
              <input
                type="checkbox"
                checked={selected.includes(opt.value)}
                onChange={() => onToggle(opt.value)}
                className="w-4 h-4 rounded border-[var(--border)] accent-[var(--accent)]"
              />
              <span className="capitalize">{opt.label}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

function ColorFilterSection({
  colors,
  selected,
  onToggle,
}: {
  colors: { name: string; hex: string }[];
  selected: string[];
  onToggle: (value: string) => void;
}) {
  const [open, setOpen] = useState(true);
  return (
    <div className="border-b border-[var(--border)] pb-4 mb-4">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full text-left font-[var(--font-cormorant)] text-lg text-[var(--text)] mb-2"
      >
        <span>Color</span>
        <svg
          className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="flex flex-wrap gap-2 mt-1">
          {colors.map((c) => (
            <button
              key={c.name}
              title={c.name}
              onClick={() => onToggle(c.name)}
              className={`w-7 h-7 rounded-full border-2 transition-all ${
                selected.includes(c.name)
                  ? "border-[var(--accent)] scale-110"
                  : "border-[var(--border)] hover:border-[var(--text-faint)]"
              }`}
              style={{ backgroundColor: c.hex }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function ShopPageInner() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Read filters from URL
  const selectedCollections = searchParams.get("collection")?.split(",").filter(Boolean) ?? [];
  const selectedTypes = searchParams.get("type")?.split(",").filter(Boolean) ?? [];
  const selectedStyles = searchParams.get("style")?.split(",").filter(Boolean) ?? [];
  const selectedColors = searchParams.get("color")?.split(",").filter(Boolean) ?? [];
  const sort = (searchParams.get("sort") as SortValue) || "recommended";

  const allTypes = useMemo(() => getAllProductTypes(), []);
  const allColors = useMemo(() => getAllColors(), []);

  const updateParams = useCallback(
    (key: string, values: string[]) => {
      const params = new URLSearchParams(searchParams.toString());
      if (values.length > 0) {
        params.set(key, values.join(","));
      } else {
        params.delete(key);
      }
      router.push(`/shop?${params.toString()}`, { scroll: false });
    },
    [searchParams, router]
  );

  const toggleFilter = useCallback(
    (key: string, current: string[], value: string) => {
      const next = current.includes(value) ? current.filter((v) => v !== value) : [...current, value];
      updateParams(key, next);
    },
    [updateParams]
  );

  const setSort = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value === "recommended") {
        params.delete("sort");
      } else {
        params.set("sort", value);
      }
      router.push(`/shop?${params.toString()}`, { scroll: false });
    },
    [searchParams, router]
  );

  const clearAllFilters = useCallback(() => {
    router.push("/shop", { scroll: false });
  }, [router]);

  // Filter and sort products
  const filtered = useMemo(() => {
    let result = [...products];

    if (selectedCollections.length > 0) {
      result = result.filter((p) => selectedCollections.includes(p.collection));
    }
    if (selectedTypes.length > 0) {
      result = result.filter((p) => selectedTypes.includes(p.productType));
    }
    if (selectedStyles.length > 0) {
      result = result.filter((p) => selectedStyles.includes(p.styleCategory));
    }
    if (selectedColors.length > 0) {
      result = result.filter((p) => p.colors.some((c) => selectedColors.includes(c.name)));
    }

    switch (sort) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        result.sort((a, b) => {
          const newArrivals = getNewArrivals();
          const aIdx = newArrivals.findIndex((p) => p.slug === a.slug);
          const bIdx = newArrivals.findIndex((p) => p.slug === b.slug);
          return (aIdx === -1 ? 999 : aIdx) - (bIdx === -1 ? 999 : bIdx);
        });
        break;
      default:
        break;
    }

    return result;
  }, [selectedCollections, selectedTypes, selectedStyles, selectedColors, sort]);

  const hasActiveFilters =
    selectedCollections.length > 0 ||
    selectedTypes.length > 0 ||
    selectedStyles.length > 0 ||
    selectedColors.length > 0;

  const collectionOptions = collections.map((c) => ({ label: c.name, value: c.key }));
  const typeOptions = allTypes.map((t) => ({ label: t, value: t }));
  const styleOptions = STYLE_OPTIONS.map((s) => ({ label: s, value: s }));

  const filterSidebar = (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-[var(--font-cormorant)] text-2xl text-[var(--text)]">Filters</h2>
        {hasActiveFilters && (
          <button onClick={clearAllFilters} className="text-xs text-[var(--accent)] underline hover:no-underline">
            Clear all
          </button>
        )}
      </div>

      <FilterSection
        title="Collection"
        options={collectionOptions}
        selected={selectedCollections}
        onToggle={(v) => toggleFilter("collection", selectedCollections, v)}
      />
      <FilterSection
        title="Type"
        options={typeOptions}
        selected={selectedTypes}
        onToggle={(v) => toggleFilter("type", selectedTypes, v)}
      />
      <FilterSection
        title="Style"
        options={styleOptions}
        selected={selectedStyles}
        onToggle={(v) => toggleFilter("style", selectedStyles, v)}
      />
      <ColorFilterSection
        colors={allColors}
        selected={selectedColors}
        onToggle={(v) => toggleFilter("color", selectedColors, v)}
      />
    </div>
  );

  // Close drawer on escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDrawerOpen(false);
    };
    if (drawerOpen) {
      document.addEventListener("keydown", handleKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  return (
    <main className="min-h-screen bg-[var(--bg)]">
      {/* Header */}
      <div className="bg-[var(--bg-subtle)] py-16 text-center">
        <h1 className="font-[var(--font-cormorant)] text-4xl md:text-5xl text-[var(--text)] mb-2">Shop All</h1>
        <p className="text-[var(--text-muted)] text-sm tracking-wide">
          Discover our curated collection of lingerie
        </p>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Toolbar */}
        <div className="flex items-center justify-between mb-6 gap-4">
          <div className="flex items-center gap-3">
            {/* Mobile filter toggle */}
            <button
              onClick={() => setDrawerOpen(true)}
              className="lg:hidden flex items-center gap-2 px-4 py-2 border border-[var(--border)] rounded-sm text-sm text-[var(--text)] hover:border-[var(--accent)] transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                />
              </svg>
              Filters
            </button>
            <span className="text-sm text-[var(--text-muted)]">
              {filtered.length} {filtered.length === 1 ? "product" : "products"}
            </span>
          </div>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="bg-[var(--bg-card)] border border-[var(--border)] rounded-sm px-3 py-2 text-sm text-[var(--text)] focus:outline-none focus:border-[var(--accent)]"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-8">
          {/* Desktop sidebar */}
          <aside className="hidden lg:block w-64 shrink-0">{filterSidebar}</aside>

          {/* Product grid */}
          <div className="flex-1">
            {filtered.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-[var(--text-muted)] text-lg mb-4">No products match your filters.</p>
                <button
                  onClick={clearAllFilters}
                  className="text-[var(--accent)] underline hover:no-underline text-sm"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {filtered.map((product) => (
                  <ProductCard key={product.slug} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile filter drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/30" onClick={() => setDrawerOpen(false)} />
          <div className="absolute inset-y-0 left-0 w-80 max-w-[85vw] bg-[var(--bg)] shadow-xl overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="font-[var(--font-cormorant)] text-2xl text-[var(--text)]">Filters</span>
              <button
                onClick={() => setDrawerOpen(false)}
                className="p-1 text-[var(--text-muted)] hover:text-[var(--text)]"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            {filterSidebar}
            <button
              onClick={() => setDrawerOpen(false)}
              className="mt-6 w-full py-3 bg-[var(--accent)] text-white text-sm tracking-wider rounded-sm hover:opacity-90 transition-opacity"
            >
              VIEW {filtered.length} PRODUCTS
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

export default function ShopPage() {
  return (
    <Suspense>
      <ShopPageInner />
    </Suspense>
  );
}
