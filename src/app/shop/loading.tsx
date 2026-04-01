export default function ShopLoading() {
  return (
    <main className="min-h-screen bg-[var(--bg)]">
      {/* Header skeleton */}
      <div className="bg-[var(--bg-subtle)] py-16 text-center">
        <div className="h-10 w-48 bg-[var(--border)] rounded mx-auto mb-3 animate-pulse" />
        <div className="h-4 w-64 bg-[var(--border)] rounded mx-auto animate-pulse" />
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Toolbar skeleton */}
        <div className="flex items-center justify-between mb-6">
          <div className="h-4 w-24 bg-[var(--border)] rounded animate-pulse" />
          <div className="h-9 w-40 bg-[var(--border)] rounded animate-pulse" />
        </div>

        <div className="flex gap-8">
          {/* Sidebar skeleton (desktop) */}
          <aside className="hidden lg:block w-64 shrink-0 space-y-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="space-y-3">
                <div className="h-5 w-24 bg-[var(--border)] rounded animate-pulse" />
                <div className="space-y-2">
                  {Array.from({ length: 4 }).map((_, j) => (
                    <div key={j} className="h-4 w-32 bg-[var(--border)] rounded animate-pulse" />
                  ))}
                </div>
              </div>
            ))}
          </aside>

          {/* Product grid skeleton */}
          <div className="flex-1 grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-[3/4] bg-[var(--bg-subtle)] rounded-sm mb-3" />
                <div className="space-y-2 px-1">
                  <div className="h-3 w-20 bg-[var(--border)] rounded" />
                  <div className="h-4 w-full bg-[var(--border)] rounded" />
                  <div className="h-3 w-16 bg-[var(--border)] rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
