"use client";

import { useState, useEffect } from "react";

export default function ExitPopup() {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("conturelle_popup_dismissed")) return;
    if (sessionStorage.getItem("conturelle_email_captured")) return;

    let triggered = false;

    const handleMouseLeave = (e: MouseEvent) => {
      if (triggered) return;
      if (e.clientY <= 0) {
        triggered = true;
        setVisible(true);
      }
    };

    const timeout = setTimeout(() => {
      if (!triggered) {
        triggered = true;
        setVisible(true);
      }
    }, 30000);

    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      clearTimeout(timeout);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const dismiss = () => {
    setVisible(false);
    sessionStorage.setItem("conturelle_popup_dismissed", "1");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      sessionStorage.setItem("conturelle_email_captured", "1");
      sessionStorage.setItem("conturelle_popup_dismissed", "1");
      setTimeout(dismiss, 2000);
    }
  };

  if (!visible) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-[500]" onClick={dismiss} />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[501] bg-[var(--bg)] max-w-[720px] w-[92%] overflow-hidden shadow-2xl">
        <button
          onClick={dismiss}
          className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text)] transition-colors bg-transparent border-none cursor-pointer"
          aria-label="Close"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="hidden md:block aspect-[3/4] overflow-hidden">
            <img
              src="/images/205225_280225_722_22719.jpg"
              alt="Conturelle lingerie"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex flex-col justify-center px-8 py-10 md:px-10">
            {!submitted ? (
              <>
                <p className="text-[10px] tracking-[0.06em] uppercase text-[var(--accent)] mb-3">
                  Before you go
                </p>
                <h2 className="font-[family-name:var(--font-cormorant)] text-[32px] font-light text-[var(--text)] leading-tight">
                  10% Off Your First Order
                </h2>
                <p className="text-[12px] text-[var(--text-muted)] mt-3 leading-relaxed">
                  Join the Conturelle world. Get early access to new collections, styling tips, and an exclusive welcome discount.
                </p>
                <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="w-full py-3.5 px-4 bg-[var(--bg-card)] border border-[var(--border)] text-[var(--text)] text-xs outline-none placeholder:text-[var(--text-faint)] focus:border-[var(--accent)]"
                  />
                  <button
                    type="submit"
                    className="w-full py-3.5 bg-[var(--text)] text-[10px] tracking-[0.08em] uppercase text-[var(--bg)] cursor-pointer hover:opacity-90 transition-opacity"
                  >
                    Get My 10% Off
                  </button>
                </form>
                <button
                  onClick={dismiss}
                  className="mt-4 text-[10px] text-[var(--text-faint)] bg-transparent border-none cursor-pointer hover:text-[var(--text-muted)] transition-colors"
                >
                  No thanks
                </button>
                <p className="text-[10px] text-[var(--text-faint)] mt-3">
                  No spam. Unsubscribe anytime.
                </p>
              </>
            ) : (
              <div className="text-center py-6">
                <span className="text-[var(--success)] text-3xl">&#10003;</span>
                <h3 className="font-[family-name:var(--font-cormorant)] text-2xl text-[var(--text)] mt-3">
                  Welcome!
                </h3>
                <p className="text-[11px] text-[var(--text-muted)] mt-2">
                  Check your inbox for your discount code.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
