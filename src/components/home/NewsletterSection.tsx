"use client";

import { useState } from "react";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <section className="py-20 px-6 md:px-12 max-w-[1400px] mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0 overflow-hidden">
        <div className="aspect-[4/3] md:aspect-auto overflow-hidden">
          <img
            src="/images/206289_213289_721_30955.jpg"
            alt="Conturelle lifestyle"
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        <div className="bg-[var(--bg-subtle)] flex flex-col justify-center px-8 md:px-14 py-12 md:py-0">
          <p className="text-[10px] tracking-[0.06em] uppercase text-[var(--accent)] mb-4">
            Join the world of Conturelle
          </p>
          <h2 className="font-[family-name:var(--font-cormorant)] text-[clamp(32px,5vw,48px)] font-light leading-[1] text-[var(--text)]">
            10% Off Your First Order
          </h2>
          <p className="mt-4 text-[12px] text-[var(--text-muted)] leading-relaxed max-w-[360px]">
            Join our list for early access to new collections and exclusive
            offers.
          </p>

          {submitted ? (
            <div className="mt-6 py-3 px-5 bg-[var(--bg-card)] border border-[var(--border)]">
              <p className="text-[12px] text-[var(--text)]">
                Welcome! Check your inbox for your 10% code.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-0 mt-8 max-w-[400px]">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 py-3.5 px-5 bg-[var(--bg-card)] border border-[var(--border)] sm:border-r-0 text-[var(--text)] text-xs tracking-[0.03em] outline-none placeholder:text-[var(--text-faint)] focus:border-[var(--accent)]"
              />
              <button
                type="submit"
                className="py-3.5 px-8 bg-[var(--text)] text-[10px] tracking-[0.08em] uppercase text-[var(--bg)] cursor-pointer whitespace-nowrap hover:opacity-90 transition-opacity"
              >
                Subscribe
              </button>
            </form>
          )}
          <p className="mt-3 text-[10px] text-[var(--text-faint)]">
            No spam. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
}
