"use client";

import { useState, useEffect } from "react";

export default function ChatTrigger() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 20000);
    return () => clearTimeout(timer);
  }, []);

  if (!visible || dismissed) return null;

  return (
    <button
      onClick={() => setDismissed(true)}
      className="fixed z-[140] right-5 bottom-20 md:bottom-8 bg-[var(--dark)] border border-[rgba(201,169,110,0.3)] px-4 py-3 flex items-center gap-2.5 cursor-pointer shadow-lg hover:border-[var(--gold)] transition-all animate-pulse-subtle"
      style={{ animation: "chatPulse 3s ease-in-out infinite" }}
    >
      <span className="text-lg">&#128172;</span>
      <div className="text-left">
        <p className="text-[9px] tracking-[0.15em] uppercase text-[var(--gold)]">Need sizing help?</p>
        <p className="text-[8px] text-[rgba(245,239,232,0.4)]">Chat with us</p>
      </div>
    </button>
  );
}
