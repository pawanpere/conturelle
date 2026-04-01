"use client";

import { useState, useEffect } from "react";

const messages = [
  "Free Shipping on Orders Over $75",
  "30-Day Easy Returns — No Questions Asked",
  "Crafted in Europe Since 1885",
];

export default function AnnouncementBar() {
  const [active, setActive] = useState(0);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % messages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--announcement-height",
      dismissed ? "0px" : "36px"
    );
  }, [dismissed]);

  if (dismissed) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[200] h-9 bg-[var(--text)] flex items-center justify-center overflow-hidden">
      <div className="relative w-full h-full flex items-center justify-center">
        {messages.map((msg, i) => (
          <span
            key={i}
            className={`absolute inset-0 flex items-center justify-center text-[11px] tracking-[0.06em] text-[var(--bg)] transition-opacity duration-500 ${
              i === active ? "opacity-100" : "opacity-0"
            }`}
          >
            {msg}
          </span>
        ))}
      </div>
      <button
        onClick={() => setDismissed(true)}
        className="absolute right-3 text-[var(--bg)] opacity-40 hover:opacity-80 transition-opacity"
        aria-label="Dismiss"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    </div>
  );
}
