"use client";

import { useState, useEffect } from "react";

export default function ExitPopup() {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    // Don't show if already dismissed OR submitted
    if (sessionStorage.getItem("conturelle_popup_dismissed")) return;
    if (sessionStorage.getItem("conturelle_email_captured")) return;

    let triggered = false;

    // Desktop only: exit intent (mouse leaves viewport top)
    const handleMouseLeave = (e: MouseEvent) => {
      if (triggered) return;
      if (e.clientY <= 0) {
        triggered = true;
        setVisible(true);
      }
    };

    // Long timeout fallback (90s) — gentle, not aggressive
    const timeout = setTimeout(() => {
      if (!triggered) {
        triggered = true;
        setVisible(true);
      }
    }, 90000);

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
      <div className="fixed inset-0 bg-black/60 z-[500]" onClick={dismiss} />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[501] bg-[var(--dark)] border border-[rgba(201,169,110,0.2)] w-[90%] max-w-[380px] overflow-hidden shadow-2xl">
        <button
          onClick={dismiss}
          className="absolute top-3 right-3 z-10 bg-transparent border-none text-[rgba(245,239,232,0.4)] text-xl cursor-pointer hover:text-[var(--cream)]"
          aria-label="Close"
        >
          &times;
        </button>

        <div className="w-full h-36 overflow-hidden relative">
          <img
            src="https://conturelle.com/wp-content/uploads/2021/08/80505_81305_004_21342-1024x768.jpg"
            alt="Conturelle"
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[var(--dark)]" />
        </div>

        <div className="px-6 pb-6 text-center -mt-4 relative">
          {!submitted ? (
            <>
              <h3 className="font-[family-name:var(--font-cormorant)] text-[26px] font-light text-[var(--cream)] leading-tight">
                Before You Go
              </h3>
              <p className="mt-3 text-[11px] text-[rgba(245,239,232,0.5)] leading-relaxed">
                Get 10% off your first order.
              </p>
              <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-3">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full py-3.5 px-4 bg-[rgba(21,8,16,0.6)] border border-[rgba(201,169,110,0.15)] text-[var(--cream)] text-xs tracking-[0.03em] outline-none placeholder:text-[rgba(245,239,232,0.3)] focus:border-[var(--gold)] text-center"
                />
                <button
                  type="submit"
                  className="w-full py-3.5 bg-[var(--gold)] text-[var(--dark)] text-[10px] tracking-[0.15em] uppercase font-medium border-none cursor-pointer hover:bg-[var(--cream)] transition-all"
                >
                  Get 10% Off
                </button>
              </form>
              <button
                onClick={dismiss}
                className="mt-4 text-[10px] text-[rgba(245,239,232,0.3)] bg-transparent border-none cursor-pointer hover:text-[rgba(245,239,232,0.5)]"
              >
                No thanks
              </button>
            </>
          ) : (
            <div className="py-6">
              <span className="text-[var(--success)] text-3xl">&#10003;</span>
              <h3 className="font-[family-name:var(--font-cormorant)] text-2xl text-[var(--cream)] mt-3">
                Welcome!
              </h3>
              <p className="text-[11px] text-[rgba(245,239,232,0.5)] mt-2">
                Check your inbox for your discount code.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
