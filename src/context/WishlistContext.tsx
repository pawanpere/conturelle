"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface WishlistContextType {
  items: string[];
  toggle: (slug: string) => void;
  has: (slug: string) => boolean;
  count: number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

const STORAGE_KEY = "conturelle_wishlist";

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<string[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setItems(JSON.parse(stored));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {}
  }, [items]);

  const toggle = (slug: string) => {
    setItems((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  };

  const has = (slug: string) => items.includes(slug);

  return (
    <WishlistContext.Provider value={{ items, toggle, has, count: items.length }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
}
