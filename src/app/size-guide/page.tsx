import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Size Guide | Conturelle",
  description:
    "Find your perfect fit with our comprehensive EU size charts for bras, dresses, and panties.",
};

const bandSizes = [65, 70, 75, 80, 85, 90, 95, 100, 105, 110, 115];
const cupSizes = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K"];

const dressSizes = [
  { eu: 34, bust: "78-81", waist: "60-63", hips: "84-87" },
  { eu: 36, bust: "82-85", waist: "64-67", hips: "88-91" },
  { eu: 38, bust: "86-89", waist: "68-71", hips: "92-95" },
  { eu: 40, bust: "90-93", waist: "72-75", hips: "96-99" },
  { eu: 42, bust: "94-97", waist: "76-79", hips: "100-103" },
  { eu: 44, bust: "98-101", waist: "80-83", hips: "104-107" },
  { eu: 46, bust: "102-105", waist: "84-87", hips: "108-111" },
  { eu: 48, bust: "106-109", waist: "88-91", hips: "112-115" },
  { eu: 50, bust: "110-113", waist: "92-95", hips: "116-119" },
  { eu: 52, bust: "114-117", waist: "96-99", hips: "120-123" },
  { eu: 54, bust: "118-121", waist: "100-103", hips: "124-127" },
  { eu: 56, bust: "122-125", waist: "104-107", hips: "128-131" },
];

const pantySizes = [
  { eu: 60, hips: "82-85" },
  { eu: 65, hips: "86-89" },
  { eu: 70, hips: "90-93" },
  { eu: 75, hips: "94-97" },
  { eu: 80, hips: "98-101" },
  { eu: 85, hips: "102-105" },
  { eu: 90, hips: "106-109" },
  { eu: 95, hips: "110-113" },
  { eu: 100, hips: "114-117" },
  { eu: 105, hips: "118-121" },
  { eu: 110, hips: "122-125" },
  { eu: 115, hips: "126-129" },
];

/* Underbust ranges per band size (cm) */
const underbustMap: Record<number, string> = {
  65: "63-67",
  70: "68-72",
  75: "73-77",
  80: "78-82",
  85: "83-87",
  90: "88-92",
  95: "93-97",
  100: "98-102",
  105: "103-107",
  110: "108-112",
  115: "113-117",
};

/* Full-bust difference that maps to each cup letter (cm) */
const cupDiffMap: Record<string, string> = {
  A: "12-13",
  B: "14-15",
  C: "16-17",
  D: "18-19",
  E: "20-21",
  F: "22-23",
  G: "24-25",
  H: "26-27",
  I: "28-29",
  J: "30-31",
  K: "32-33",
};

export default function SizeGuidePage() {
  return (
    <main
      className="min-h-screen"
      style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}
    >
      {/* Hero */}
      <section className="px-6 py-20 text-center">
        <h1
          className="text-4xl md:text-5xl font-light tracking-wide mb-4"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          Size Guide
        </h1>
        <p
          className="max-w-xl mx-auto text-base leading-relaxed"
          style={{ color: "var(--text-muted)" }}
        >
          Finding the perfect fit is essential to comfort and confidence. Use our
          EU size charts and measuring tips below.
        </p>
      </section>

      <div className="max-w-5xl mx-auto px-6 pb-24 space-y-20">
        {/* ── How to Measure ── */}
        <section>
          <h2
            className="text-2xl md:text-3xl font-light mb-8"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            How to Measure
          </h2>
          <div className="grid md:grid-cols-2 gap-10">
            <div
              className="rounded-2xl p-8"
              style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border)" }}
            >
              <h3
                className="text-xl font-light mb-3"
                style={{ fontFamily: "var(--font-cormorant)" }}
              >
                Band Size (Underbust)
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                Wrap a soft measuring tape snugly around your ribcage, directly
                under your bust. Keep the tape level and breathe normally. Round
                to the nearest centimetre and match the result to the band column
                in the chart below.
              </p>
            </div>
            <div
              className="rounded-2xl p-8"
              style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border)" }}
            >
              <h3
                className="text-xl font-light mb-3"
                style={{ fontFamily: "var(--font-cormorant)" }}
              >
                Cup Size (Full Bust)
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                Measure around the fullest part of your bust, keeping the tape
                parallel to the floor. Subtract your underbust measurement from
                your full-bust measurement. The difference in centimetres
                determines your cup size.
              </p>
            </div>
            <div
              className="rounded-2xl p-8"
              style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border)" }}
            >
              <h3
                className="text-xl font-light mb-3"
                style={{ fontFamily: "var(--font-cormorant)" }}
              >
                Waist
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                Measure around the narrowest part of your natural waistline,
                usually just above the navel. Do not pull the tape tight — it
                should sit comfortably against the skin.
              </p>
            </div>
            <div
              className="rounded-2xl p-8"
              style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border)" }}
            >
              <h3
                className="text-xl font-light mb-3"
                style={{ fontFamily: "var(--font-cormorant)" }}
              >
                Hips
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                Stand with your feet together and measure around the fullest part
                of your hips and buttocks. Keep the tape level all the way
                around. This measurement is used for both dress and panty sizing.
              </p>
            </div>
          </div>
        </section>

        {/* ── Bra Size Chart ── */}
        <section>
          <h2
            className="text-2xl md:text-3xl font-light mb-2"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            EU Bra Sizes
          </h2>
          <p className="text-sm mb-6" style={{ color: "var(--text-muted)" }}>
            Band = underbust (cm) &middot; Cup = full-bust difference (cm)
          </p>
          <div className="overflow-x-auto rounded-2xl" style={{ border: "1px solid var(--border)" }}>
            <table className="w-full text-sm" style={{ backgroundColor: "var(--bg-card)" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid var(--border)" }}>
                  <th
                    className="px-4 py-3 text-left font-medium"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Band
                  </th>
                  <th
                    className="px-4 py-3 text-left font-medium"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Underbust
                  </th>
                  {cupSizes.map((c) => (
                    <th
                      key={c}
                      className="px-3 py-3 text-center font-medium"
                      style={{ color: "var(--accent)" }}
                    >
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {bandSizes.map((band, i) => (
                  <tr
                    key={band}
                    style={{
                      borderBottom:
                        i < bandSizes.length - 1
                          ? "1px solid var(--border)"
                          : undefined,
                    }}
                  >
                    <td className="px-4 py-3 font-medium">{band}</td>
                    <td className="px-4 py-3" style={{ color: "var(--text-muted)" }}>
                      {underbustMap[band]} cm
                    </td>
                    {cupSizes.map((c) => (
                      <td
                        key={c}
                        className="px-3 py-3 text-center"
                        style={{ color: "var(--text-muted)" }}
                      >
                        {band}
                        {c}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs mt-3" style={{ color: "var(--text-faint)" }}>
            Cup difference guide:{" "}
            {Object.entries(cupDiffMap)
              .map(([letter, diff]) => `${letter} = ${diff} cm`)
              .join(" · ")}
          </p>
        </section>

        {/* ── Dress Size Chart ── */}
        <section>
          <h2
            className="text-2xl md:text-3xl font-light mb-6"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            EU Dress Sizes
          </h2>
          <div className="overflow-x-auto rounded-2xl" style={{ border: "1px solid var(--border)" }}>
            <table className="w-full text-sm" style={{ backgroundColor: "var(--bg-card)" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid var(--border)" }}>
                  {["EU Size", "Bust (cm)", "Waist (cm)", "Hips (cm)"].map(
                    (h) => (
                      <th
                        key={h}
                        className="px-5 py-3 text-left font-medium"
                        style={{ color: "var(--text-muted)" }}
                      >
                        {h}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {dressSizes.map((row, i) => (
                  <tr
                    key={row.eu}
                    style={{
                      borderBottom:
                        i < dressSizes.length - 1
                          ? "1px solid var(--border)"
                          : undefined,
                    }}
                  >
                    <td className="px-5 py-3 font-medium">{row.eu}</td>
                    <td className="px-5 py-3" style={{ color: "var(--text-muted)" }}>
                      {row.bust}
                    </td>
                    <td className="px-5 py-3" style={{ color: "var(--text-muted)" }}>
                      {row.waist}
                    </td>
                    <td className="px-5 py-3" style={{ color: "var(--text-muted)" }}>
                      {row.hips}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ── Panty Size Chart ── */}
        <section>
          <h2
            className="text-2xl md:text-3xl font-light mb-6"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            EU Panty Sizes
          </h2>
          <div className="overflow-x-auto rounded-2xl" style={{ border: "1px solid var(--border)" }}>
            <table className="w-full text-sm" style={{ backgroundColor: "var(--bg-card)" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid var(--border)" }}>
                  {["EU Size", "Hips (cm)"].map((h) => (
                    <th
                      key={h}
                      className="px-5 py-3 text-left font-medium"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {pantySizes.map((row, i) => (
                  <tr
                    key={row.eu}
                    style={{
                      borderBottom:
                        i < pantySizes.length - 1
                          ? "1px solid var(--border)"
                          : undefined,
                    }}
                  >
                    <td className="px-5 py-3 font-medium">{row.eu}</td>
                    <td className="px-5 py-3" style={{ color: "var(--text-muted)" }}>
                      {row.hips}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="text-center py-12">
          <h2
            className="text-2xl md:text-3xl font-light mb-4"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            Still unsure?
          </h2>
          <p className="mb-8 text-sm" style={{ color: "var(--text-muted)" }}>
            Our fit quiz recommends the ideal size based on your measurements and
            preferences.
          </p>
          <Link
            href="/fit-quiz"
            className="inline-block px-10 py-3 rounded-full text-sm font-medium tracking-wide text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: "var(--accent)" }}
          >
            Take the Fit Quiz
          </Link>
        </section>
      </div>
    </main>
  );
}
