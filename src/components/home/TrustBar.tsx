export default function TrustBar() {
  return (
    <div className="border-t border-b border-[var(--border)] py-4 px-6 md:px-12 bg-[var(--bg-subtle)] flex flex-col md:flex-row justify-center items-center gap-3 md:gap-8">
      <div className="flex items-center gap-2">
        <span className="text-[var(--accent)] text-xs">&#9733;&#9733;&#9733;&#9733;&#9733;</span>
        <span className="text-[11px] tracking-[0.04em] text-[var(--text-muted)]">
          4.8/5 from 2,000+ reviews
        </span>
      </div>
      <span className="text-[var(--border)] text-lg hidden md:inline">&middot;</span>
      <span className="text-[11px] tracking-[0.04em] text-[var(--text-muted)]">
        Free shipping over $75
      </span>
      <span className="text-[var(--border)] text-lg hidden md:inline">&middot;</span>
      <span className="text-[11px] tracking-[0.04em] text-[var(--text-muted)]">
        30-day easy returns
      </span>
    </div>
  );
}
