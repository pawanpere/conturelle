"use client";

import { useState, useEffect } from "react";

export default function ChatTrigger() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 30000);
    return () => clearTimeout(timer);
  }, []);

  if (!visible || dismissed) return null;

  return (
    <button
      onClick={() => setDismissed(true)}
      className="fixed z-[130] right-4 bottom-6 md:bottom-8 bg-[var(--dark)] border border-[rgba(201,169,110,0.2)] px-3.5 py-2.5 flex items-center gap-2 cursor-pointer shadow-lg hover:border-[var(--gold)] transition-all max-md:bottom-[88px]"
    >
      <span className="text-base">&#128172;</span>
      <span className="text-[10px] tracking-[0.05em] text-[var(--gold)]">Need help?</span>
      <span className="ml-1 text-[rgba(245,239,232,0.3)] text-sm">&times;</span>
    </button>
  );
}
