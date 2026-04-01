"use client";

import { useState } from "react";
import Link from "next/link";
import { products } from "@/lib/products";

// ── Quiz Data ──────────────────────────────────────────────────────

interface QuizOption {
  label: string;
  value: string;
  description?: string;
}

interface QuizStep {
  id: string;
  question: string;
  subtitle: string;
  options: QuizOption[];
}

const steps: QuizStep[] = [
  {
    id: "shape",
    question: "What's your preferred style?",
    subtitle: "This helps us match you to the right cup shape.",
    options: [
      { label: "Everyday smooth", value: "smooth", description: "Invisible under t-shirts and fitted tops" },
      { label: "Lace & detail", value: "lace", description: "Beautiful design you can see and feel" },
      { label: "Full coverage", value: "full", description: "Maximum support and confidence" },
      { label: "Matching set", value: "set", description: "Coordinated bra and brief" },
    ],
  },
  {
    id: "priority",
    question: "What matters most to you?",
    subtitle: "We'll weight our recommendation around this.",
    options: [
      { label: "All-day comfort", value: "comfort", description: "Forget you're wearing it" },
      { label: "Support & lift", value: "support", description: "Secure hold, no shifting" },
      { label: "Beautiful design", value: "design", description: "Looks as good as it feels" },
      { label: "Invisible fit", value: "invisible", description: "Seamless under any outfit" },
    ],
  },
  {
    id: "band",
    question: "What's your band size?",
    subtitle: "Measure snugly around your ribcage, just under your bust.",
    options: [
      { label: "EU 70", value: "70", description: "UK 32 · US 32" },
      { label: "EU 75", value: "75", description: "UK 34 · US 34" },
      { label: "EU 80", value: "80", description: "UK 36 · US 36" },
      { label: "EU 85", value: "85", description: "UK 38 · US 38" },
      { label: "EU 90", value: "90", description: "UK 40 · US 40" },
      { label: "EU 95–100", value: "95", description: "UK 42–44 · US 42–44" },
    ],
  },
  {
    id: "cup",
    question: "What's your cup size?",
    subtitle: "If unsure, pick the size you usually wear — we'll fine-tune it.",
    options: [
      { label: "B", value: "B" },
      { label: "C", value: "C" },
      { label: "D", value: "D" },
      { label: "E", value: "E" },
      { label: "F", value: "F" },
      { label: "G–H", value: "G" },
    ],
  },
];

// ── Recommendation Logic ───────────────────────────────────────────

function getRecommendations(answers: Record<string, string>) {
  const { shape, priority, band, cup } = answers;
  const bandNum = parseInt(band) || 80;

  // Score each product
  const scored = products
    .filter((p) => p.productType.includes("bra")) // Only bras
    .map((p) => {
      let score = 0;

      // Style match
      if (shape === "smooth" && (p.productType === "spacer-bra" || p.productType === "molded-bra")) score += 30;
      if (shape === "lace" && (p.styleCategory === "lace" || p.styleCategory === "embroidery")) score += 30;
      if (shape === "full" && (p.productType === "wired-bra" || p.styleCategory === "corsetry")) score += 30;
      if (shape === "set" && p.badge === "bestseller") score += 30;

      // Priority match
      if (priority === "comfort" && (p.productType === "spacer-bra" || p.productType === "molded-bra")) score += 15;
      if (priority === "support" && (p.styleCategory === "corsetry" || p.productType === "wired-bra")) score += 15;
      if (priority === "design" && (p.styleCategory === "lace" || p.styleCategory === "embroidery")) score += 15;
      if (priority === "invisible" && (p.productType === "spacer-bra" || p.productType === "molded-bra")) score += 15;

      // Size availability
      const sizeStr = bandNum + cup;
      const hasSize = p.euSizes.includes(sizeStr);
      if (hasSize) score += 20;

      // Boost bestsellers slightly
      if (p.badge === "bestseller") score += 5;

      return { product: p, score, hasSize };
    })
    .sort((a, b) => b.score - a.score);

  // Top match + alternates
  const top = scored[0];
  const alternates = scored.slice(1, 3);

  return { top, alternates, bandNum, cup };
}

// ── Component ──────────────────────────────────────────────────────

export default function FitQuizPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);

  const step = steps[currentStep];
  const progress = ((currentStep) / steps.length) * 100;

  const selectOption = (value: string) => {
    const updated = { ...answers, [step.id]: value };
    setAnswers(updated);

    if (currentStep < steps.length - 1) {
      setTimeout(() => setCurrentStep(currentStep + 1), 200);
    } else {
      setTimeout(() => setShowResults(true), 300);
    }
  };

  const goBack = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const restart = () => {
    setCurrentStep(0);
    setAnswers({});
    setShowResults(false);
  };

  // ── Results View ─────────────────────────────────────────────────
  if (showResults) {
    const { top, alternates, bandNum } = getRecommendations(answers);
    const sizeStr = `${bandNum}${answers.cup}`;

    return (
      <div className="relative z-[2] min-h-screen pt-28 pb-20 px-6 md:px-12">
        <div className="max-w-[900px] mx-auto">
          {/* Header */}
          <div className="text-center mb-14">
            <p className="text-[10px] tracking-[0.15em] uppercase text-[var(--accent)] mb-3">Your results</p>
            <h1 className="font-[family-name:var(--font-cormorant)] text-[clamp(32px,6vw,56px)] font-light text-[var(--text)] leading-tight">
              We Found Your Fit
            </h1>
            <p className="mt-4 text-[13px] text-[var(--text-faint)] max-w-[400px] mx-auto leading-relaxed">
              Based on your answers, here&rsquo;s what we recommend in size <strong className="text-[var(--accent)]">{sizeStr}</strong>.
            </p>
          </div>

          {/* Top Pick */}
          <div className="bg-[var(--bg-card)] border border-[var(--border)] overflow-hidden mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="aspect-square md:aspect-auto overflow-hidden">
                <img
                  src={top.product.images[0]}
                  alt={top.product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8 md:p-10 flex flex-col justify-center">
                <span className="text-[9px] tracking-[0.15em] uppercase text-[var(--accent)] mb-2">Best Match</span>
                <h2 className="font-[family-name:var(--font-cormorant)] text-[32px] font-light text-[var(--text)] leading-tight">
                  {top.product.name}
                </h2>
                <p className="text-[12px] text-[var(--text-faint)] mt-1">{top.product.subtitle}</p>
                <div className="flex items-center gap-2 mt-3">
                  <span className="text-[var(--accent)] text-[11px]">&#9733;&#9733;&#9733;&#9733;&#9733;</span>
                  <span className="text-[11px] text-[var(--text-faint)]">({top.product.reviewCount} reviews)</span>
                </div>
                <p className="text-[13px] text-[var(--text-muted)] mt-4 leading-relaxed">
                  {top.product.description.split('.').slice(0, 2).join('.') + '.'}
                </p>
                <div className="mt-3 text-[12px] text-[var(--text-faint)]">
                  {top.hasSize ? (
                    <span className="text-[var(--success)]">&#10003; Size {sizeStr} is available</span>
                  ) : (
                    <span>Closest available sizes in this style</span>
                  )}
                </div>
                <div className="flex items-center gap-4 mt-6">
                  <span className="font-[family-name:var(--font-cormorant)] text-[24px] font-light text-[var(--accent)]">
                    ${top.product.price}
                  </span>
                  <Link
                    href={`/product/${top.product.slug}`}
                    className="py-3 px-8 bg-[var(--text)] border border-[var(--text)] text-[10px] tracking-[0.12em] uppercase text-[var(--bg)] no-underline hover:bg-transparent hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all"
                  >
                    View Product
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Alternates */}
          {alternates.length > 0 && (
            <>
              <p className="text-[11px] tracking-[0.1em] uppercase text-[var(--text-faint)] mt-10 mb-5">Also great for you</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {alternates.map(({ product, hasSize }) => (
                  <Link
                    key={product.slug}
                    href={`/product/${product.slug}`}
                    className="bg-[var(--bg-card)] border border-[var(--border)] overflow-hidden no-underline group flex"
                  >
                    <div className="w-32 shrink-0 overflow-hidden">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-5 flex flex-col justify-center">
                      <h3 className="font-[family-name:var(--font-cormorant)] text-lg font-light text-[var(--text)]">
                        {product.name}
                      </h3>
                      <p className="text-[11px] text-[var(--text-faint)] mt-0.5">{product.subtitle}</p>
                      <div className="flex items-center gap-3 mt-2">
                        <span className="font-[family-name:var(--font-cormorant)] text-lg text-[var(--accent)]">
                          ${product.price}
                        </span>
                        {hasSize && (
                          <span className="text-[10px] text-[var(--success)]">&#10003; {sizeStr}</span>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12">
            <button
              onClick={restart}
              className="text-[11px] tracking-[0.1em] uppercase text-[var(--text-muted)] bg-transparent border border-[var(--border)] px-8 py-3 cursor-pointer hover:border-[var(--accent)] hover:text-[var(--text)] transition-all"
            >
              Retake Quiz
            </button>
            <Link
              href="/shop"
              className="text-[11px] tracking-[0.1em] uppercase text-[var(--text-muted)] no-underline hover:text-[var(--accent)] transition-colors"
            >
              Browse All Products &rarr;
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ── Quiz Steps View ──────────────────────────────────────────────
  return (
    <div className="relative z-[2] min-h-screen pt-28 pb-20 px-6 md:px-12 flex flex-col items-center">
      <div className="w-full max-w-[560px]">
        {/* Progress bar */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-3">
            <span className="text-[10px] tracking-[0.1em] uppercase text-[var(--text-faint)]">
              Step {currentStep + 1} of {steps.length}
            </span>
            {currentStep > 0 && (
              <button
                onClick={goBack}
                className="text-[10px] tracking-[0.1em] uppercase text-[var(--text-faint)] bg-transparent border-none cursor-pointer hover:text-[var(--accent)] transition-colors"
              >
                &larr; Back
              </button>
            )}
          </div>
          <div className="w-full h-[2px] bg-[var(--border)] rounded-full overflow-hidden">
            <div
              className="h-full bg-[var(--accent)] transition-all duration-500 ease-out rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <div className="text-center mb-10">
          <h1 className="font-[family-name:var(--font-cormorant)] text-[clamp(28px,5vw,42px)] font-light text-[var(--text)] leading-tight">
            {step.question}
          </h1>
          <p className="mt-3 text-[12px] text-[var(--text-muted)] leading-relaxed">
            {step.subtitle}
          </p>
        </div>

        {/* Options */}
        <div className={`grid gap-3 ${step.options.length > 4 ? "grid-cols-2 sm:grid-cols-3" : "grid-cols-1"}`}>
          {step.options.map((option) => {
            const isSelected = answers[step.id] === option.value;
            const isCompact = step.options.length > 4;

            return (
              <button
                key={option.value}
                onClick={() => selectOption(option.value)}
                className={`group relative border cursor-pointer transition-all duration-200 text-left ${
                  isCompact ? "p-4 text-center" : "p-5 flex flex-col"
                } ${
                  isSelected
                    ? "bg-[var(--bg-card)] border-[var(--accent)]"
                    : "bg-[var(--bg-card)] border-[var(--border)] hover:border-[var(--accent)]"
                }`}
              >
                <span className={`font-[family-name:var(--font-cormorant)] text-[var(--text)] leading-tight ${
                  isCompact ? "text-lg block text-center" : "text-xl"
                }`}>
                  {option.label}
                </span>
                {option.description && !isCompact && (
                  <span className="text-[11px] text-[var(--text-faint)] mt-1 leading-relaxed">
                    {option.description}
                  </span>
                )}
                {option.description && isCompact && (
                  <span className="text-[9px] text-[var(--text-faint)] mt-0.5 block text-center">
                    {option.description}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Size guide hint on size steps */}
        {(step.id === "band" || step.id === "cup") && (
          <p className="mt-6 text-center text-[11px] text-[var(--text-faint)]">
            Not sure? Check our{" "}
            <Link href="/size-guide" className="text-[var(--accent)] underline">size guide</Link>{" "}
            or pick your usual size — we offer free exchanges.
          </p>
        )}
      </div>
    </div>
  );
}
