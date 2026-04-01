"use client";

import { useState, useEffect } from "react";

const messages = [
  "Free Shipping on Orders Over \u20ac75",
  "30-Day Easy Returns \u2014 No Questions Asked",
  "Crafted in Europe Since 1885",
];

export default function AnnouncementBar() {
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % messages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[200] border-b border-[rgba(201,169,110,0.15)] bg-[var(--dark)] px-12 py-2.5 flex justify-center items-center">
      {messages.map((msg, i) => (
        <span
          key={i}
          className={`text-[11px] tracking-[0.1em] uppercase text-[var(--gold)] transition-opacity duration-500 ${
            i === active ? "inline" : "hidden"
          }`}
        >
          {msg}
        </span>
      ))}
      <button
        onClick={() => setVisible(false)}
        className="absolute right-4 bg-transparent border-none text-[rgba(245,239,232,0.3)] text-base cursor-pointer hover:text-[var(--cream)]"
      >
        &times;
      </button>
    </div>
  );
}
