import Link from "next/link";

export default function NotFound() {
  return (
    <main
      className="min-h-screen flex items-center justify-center px-6"
      style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}
    >
      <div className="text-center max-w-md">
        <p
          className="text-8xl font-light mb-4"
          style={{
            fontFamily: "var(--font-cormorant)",
            color: "var(--accent)",
          }}
        >
          404
        </p>
        <h1
          className="text-3xl md:text-4xl font-light mb-4"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          Page Not Found
        </h1>
        <p
          className="text-sm leading-relaxed mb-10"
          style={{ color: "var(--text-muted)" }}
        >
          The page you are looking for may have been moved, removed, or never
          existed. Let us help you find your way.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-block px-10 py-3 rounded-full text-sm font-medium tracking-wide text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: "var(--accent)" }}
          >
            Back to Home
          </Link>
          <Link
            href="/shop"
            className="inline-block px-10 py-3 rounded-full text-sm font-medium tracking-wide transition-opacity hover:opacity-80"
            style={{
              border: "1px solid var(--border)",
              color: "var(--text-muted)",
            }}
          >
            Browse the Shop
          </Link>
        </div>
      </div>
    </main>
  );
}
