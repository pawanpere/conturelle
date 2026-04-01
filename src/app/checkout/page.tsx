"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { products } from "@/lib/products";
import ProductCard from "@/components/ProductCard";

const ORDER_BUMPS = [
  {
    id: "wash-bag",
    name: "Lingerie Wash Bag",
    description: "Protect your investment. Extend the life of your Conturelle with our premium mesh wash bag.",
    price: 4.95,
    image: "https://conturelle.com/wp-content/uploads/2016/09/Rhapsody_1_249_NudeHintergrund-1024x768.jpg",
  },
  {
    id: "gift-wrap",
    name: "Gift Wrapping",
    description: "Premium gift box with ribbon and personalized note card.",
    price: 6.95,
    image: "https://conturelle.com/wp-content/uploads/2025/07/803837_732_F.jpg",
  },
];

export default function CheckoutPage() {
  const { items, removeItem, total, count, clearCart, addItem } = useCart();
  const [step, setStep] = useState<"info" | "shipping" | "payment" | "post-purchase" | "confirmed">("info");
  const [formData, setFormData] = useState({
    email: "", firstName: "", lastName: "",
    address: "", city: "", postalCode: "", country: "DE",
    phone: "", newsletter: true,
  });
  const [orderBumps, setOrderBumps] = useState<Record<string, boolean>>({});
  const [postPurchaseAccepted, setPostPurchaseAccepted] = useState(false);
  const [orderNumber] = useState(() => "CN-" + Math.random().toString(36).substring(2, 8).toUpperCase());
  const [referralCode] = useState(() => "conturelle.com/ref/" + Math.random().toString(36).substring(2, 6).toUpperCase());
  const [copied, setCopied] = useState(false);

  const bumpsTotal = Object.entries(orderBumps)
    .filter(([, checked]) => checked)
    .reduce((sum, [id]) => {
      const bump = ORDER_BUMPS.find((b) => b.id === id);
      return sum + (bump?.price || 0);
    }, 0);

  const shipping = total >= 75 ? 0 : 5.95;
  const grandTotal = total + shipping + bumpsTotal;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === "info") setStep("shipping");
    else if (step === "shipping") setStep("payment");
    else if (step === "payment") {
      clearCart();
      setStep("post-purchase");
    }
  };

  const handlePostPurchaseAccept = () => {
    setPostPurchaseAccepted(true);
    setTimeout(() => setStep("confirmed"), 1500);
  };

  const inputClass = "w-full py-3.5 px-4 bg-[rgba(21,8,16,0.6)] border border-[rgba(201,169,110,0.15)] text-[var(--cream)] text-xs tracking-[0.05em] outline-none placeholder:text-[rgba(245,239,232,0.3)] focus:border-[var(--gold)] rounded-sm";

  // Empty cart screen
  if (items.length === 0 && step !== "post-purchase" && step !== "confirmed") {
    return (
      <div className="relative z-[2] pt-36 pb-32 text-center px-6">
        <h1 className="font-[family-name:var(--font-cormorant)] text-[48px] font-light text-[var(--cream)]">
          Your Cart is <em className="italic text-[var(--terracotta)]">Empty</em>
        </h1>
        <p className="mt-4 text-[10px] tracking-[0.3em] uppercase text-[rgba(245,239,232,0.5)]">
          Discover our collection and find your perfect fit.
        </p>
        <Link
          href="/#collection"
          className="mt-8 inline-block py-4 px-12 bg-[var(--burgundy)] border border-[var(--burgundy)] text-[9px] tracking-[0.35em] uppercase text-[var(--cream)] no-underline hover:bg-transparent hover:border-[var(--rose)] hover:text-[var(--rose)] transition-all"
        >
          Shop the Collection
        </Link>
      </div>
    );
  }

  // Post-purchase upsell page
  if (step === "post-purchase") {
    const upsellProduct = products.find((p) => p.badge === "bestseller") || products[0];
    const upsellPrice = Math.round(upsellProduct.price * 0.7 * 100) / 100;

    return (
      <div className="relative z-[2] pt-28 md:pt-36 pb-20 px-6 max-w-[600px] mx-auto text-center">
        <div className="text-[var(--success)] text-3xl mb-4">&#10003;</div>
        <p className="text-[10px] tracking-[0.3em] uppercase text-[var(--success)] mb-2">
          Your order is confirmed!
        </p>
        <h1 className="font-[family-name:var(--font-cormorant)] text-[36px] font-light text-[var(--cream)] mb-8">
          Thank You, {formData.firstName || "there"}!
        </h1>

        <div className="border border-[rgba(201,169,110,0.2)] bg-[rgba(74,24,37,0.15)] p-6 md:p-8 text-center">
          <p className="text-[9px] tracking-[0.4em] uppercase text-[var(--terracotta)] mb-2">
            Exclusive Offer &mdash; One Time Only
          </p>
          <h2 className="font-[family-name:var(--font-cormorant)] text-[28px] font-light text-[var(--cream)] mb-4">
            Wait &mdash; Add This <em className="italic text-[var(--rose)]">Bestseller</em>
          </h2>

          <div className="w-full aspect-[4/3] overflow-hidden bg-[var(--mid)] mb-4 rounded-sm">
            <img src={upsellProduct.images[0]} alt={upsellProduct.name} className="w-full h-full object-cover" />
          </div>

          <p className="font-[family-name:var(--font-cormorant)] text-xl text-[var(--cream)]">
            {upsellProduct.name}
          </p>
          <p className="text-[10px] text-[rgba(245,239,232,0.5)] mt-1">{upsellProduct.subtitle}</p>
          <div className="flex items-center justify-center gap-3 mt-3">
            <span className="font-[family-name:var(--font-cormorant)] text-lg text-[rgba(245,239,232,0.3)] line-through">
              &euro;{upsellProduct.price}
            </span>
            <span className="font-[family-name:var(--font-cormorant)] text-2xl text-[var(--sale-red)]">
              &euro;{upsellPrice.toFixed(2)}
            </span>
            <span className="text-[8px] bg-[var(--sale-red)] text-[var(--cream)] px-2 py-1">
              SAVE 30%
            </span>
          </div>
          <p className="text-[9px] text-[rgba(245,239,232,0.35)] mt-2 italic">
            This offer won&rsquo;t be available again.
          </p>

          {!postPurchaseAccepted ? (
            <>
              <button
                onClick={handlePostPurchaseAccept}
                className="mt-6 w-full py-4 bg-[var(--gold)] text-[var(--dark)] text-[9px] tracking-[0.35em] uppercase font-medium border-none cursor-pointer hover:bg-[var(--cream)] transition-all"
              >
                Yes &mdash; Add to My Order (&euro;{upsellPrice.toFixed(2)})
              </button>
              <button
                onClick={() => setStep("confirmed")}
                className="mt-3 text-[9px] tracking-[0.15em] text-[rgba(245,239,232,0.3)] bg-transparent border-none cursor-pointer underline hover:text-[var(--cream)]"
              >
                No thanks, continue to my order summary
              </button>
            </>
          ) : (
            <div className="mt-6 py-4 text-center">
              <span className="text-[var(--success)] text-lg">&#10003;</span>
              <p className="text-[10px] tracking-[0.2em] uppercase text-[var(--success)] mt-1">
                Added to your order!
              </p>
            </div>
          )}

          <div className="flex flex-col items-center gap-1.5 mt-6 text-[8px] tracking-[0.1em] uppercase text-[rgba(245,239,232,0.25)]">
            <span>&#10003; Same-shipment delivery</span>
            <span>&#10003; 30-day return policy</span>
            <span>&#10003; One-click, no re-entering payment info</span>
          </div>
        </div>
      </div>
    );
  }

  // Thank you / order confirmed page
  if (step === "confirmed") {
    const bestsellers = products.slice(0, 3);

    return (
      <div className="relative z-[2] pt-28 md:pt-36 pb-20 px-6 max-w-[800px] mx-auto">
        <div className="text-center mb-12">
          <div className="text-[var(--success)] text-4xl mb-4">&#10003;</div>
          <h1 className="font-[family-name:var(--font-cormorant)] text-[48px] font-light text-[var(--cream)]">
            Order <em className="italic text-[var(--terracotta)]">Confirmed</em>
          </h1>
          <p className="mt-2 text-xs text-[rgba(245,239,232,0.5)]">
            Order {orderNumber}
          </p>
          <p className="mt-4 text-[11px] text-[rgba(245,239,232,0.5)] leading-relaxed max-w-md mx-auto">
            Thank you, {formData.firstName || "there"}! Your order is being prepared with the same care we put into every stitch.
          </p>
          {formData.email && (
            <p className="mt-2 text-[10px] text-[rgba(245,239,232,0.4)]">
              Confirmation email sent to {formData.email}
            </p>
          )}
        </div>

        {/* What's next */}
        <div className="bg-[var(--mid)] border border-[rgba(201,169,110,0.1)] p-6 mb-8 rounded-sm">
          <h3 className="font-[family-name:var(--font-cormorant)] text-xl text-[var(--cream)] mb-4">
            What&rsquo;s Next
          </h3>
          <div className="flex flex-col gap-3">
            {[
              { icon: "\u2709\uFE0F", text: "Confirmation email sent" },
              { icon: "\uD83D\uDCE6", text: "Shipping notification within 24 hours" },
              { icon: "\uD83D\uDE9A", text: "Delivery in 3-5 business days" },
            ].map((step, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="text-lg">{step.icon}</span>
                <span className="text-[11px] text-[rgba(245,239,232,0.5)]">{step.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Referral program */}
        <div className="border border-[rgba(201,169,110,0.2)] bg-[rgba(74,24,37,0.1)] p-6 md:p-8 text-center mb-8 rounded-sm">
          <p className="text-[9px] tracking-[0.35em] uppercase text-[var(--gold)] mb-3">Share &amp; Earn</p>
          <h3 className="font-[family-name:var(--font-cormorant)] text-2xl text-[var(--cream)]">
            Give &euro;10, Get &euro;10
          </h3>
          <p className="text-[11px] text-[rgba(245,239,232,0.5)] mt-3 leading-relaxed max-w-sm mx-auto">
            Share your unique link with a friend. They get &euro;10 off their first order, you get &euro;10 off your next.
          </p>
          <div className="mt-5 flex items-center justify-center gap-2">
            <div className="py-2.5 px-4 bg-[rgba(21,8,16,0.6)] border border-[rgba(201,169,110,0.15)] text-xs text-[var(--gold)] tracking-wide">
              {referralCode}
            </div>
            <button
              onClick={() => {
                navigator.clipboard?.writeText(referralCode);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
              className="py-2.5 px-5 bg-[var(--burgundy)] border border-[var(--burgundy)] text-[9px] tracking-[0.2em] uppercase text-[var(--cream)] cursor-pointer hover:bg-transparent hover:border-[var(--rose)] transition-all"
            >
              {copied ? "Copied!" : "Copy Link"}
            </button>
          </div>
        </div>

        {/* Social follow */}
        <div className="text-center mb-12">
          <p className="text-[10px] tracking-[0.2em] uppercase text-[rgba(245,239,232,0.5)] mb-4">
            Follow us for styling tips and new arrivals
          </p>
          <div className="flex justify-center gap-6">
            {["Instagram", "TikTok", "Pinterest", "Facebook"].map((s) => (
              <a
                key={s}
                href="#"
                className="text-[9px] tracking-[0.2em] uppercase text-[rgba(245,239,232,0.4)] no-underline hover:text-[var(--gold)] transition-colors border border-[rgba(201,169,110,0.15)] px-4 py-2"
              >
                {s}
              </a>
            ))}
          </div>
        </div>

        {/* Fit quiz invite */}
        <div className="text-center mb-12 py-6 border-t border-b border-[rgba(201,169,110,0.08)]">
          <p className="text-[11px] text-[rgba(245,239,232,0.5)]">
            Haven&rsquo;t taken our Fit Quiz yet? Get personalized size recommendations for your next order.
          </p>
          <a href="/fit-quiz" className="mt-3 inline-block text-[9px] tracking-[0.25em] uppercase text-[var(--gold)] no-underline border-b border-[var(--gold)] pb-0.5 hover:text-[var(--cream)] hover:border-[var(--cream)] transition-colors">
            Take the Fit Quiz &rarr;
          </a>
        </div>

        {/* Continue shopping - bestsellers */}
        <div>
          <h3 className="font-[family-name:var(--font-cormorant)] text-2xl text-[var(--cream)] text-center mb-8">
            Bestsellers to <em className="italic text-[var(--terracotta)]">Explore</em>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {bestsellers.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <Link
            href="/"
            className="inline-block py-4 px-12 bg-[var(--burgundy)] border border-[var(--burgundy)] text-[9px] tracking-[0.35em] uppercase text-[var(--cream)] no-underline hover:bg-transparent hover:border-[var(--rose)] hover:text-[var(--rose)] transition-all"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  // Main checkout form
  return (
    <div className="relative z-[2] pt-28 md:pt-36 pb-20 px-6 md:px-12 max-w-[1200px] mx-auto">
      {/* Secure checkout header */}
      <div className="text-center mb-4">
        <p className="text-[9px] tracking-[0.2em] uppercase text-[rgba(245,239,232,0.4)]">
          &#128274; Secure Checkout
        </p>
      </div>

      {/* Progress bar */}
      <div className="flex items-center justify-center gap-4 mb-12">
        {["info", "shipping", "payment"].map((s, i) => (
          <div key={s} className="flex items-center gap-4">
            <div className={`flex items-center gap-2 ${step === s || (["info", "shipping", "payment"].indexOf(step) > i) ? "text-[var(--gold)]" : "text-[rgba(245,239,232,0.3)]"}`}>
              <span className={`w-6 h-6 rounded-full text-[10px] flex items-center justify-center border ${
                ["info", "shipping", "payment"].indexOf(step) > i
                  ? "bg-[var(--burgundy)] text-[var(--cream)] border-[var(--burgundy)]"
                  : step === s
                  ? "border-[var(--gold)] text-[var(--gold)]"
                  : "border-[rgba(201,169,110,0.2)] text-[rgba(245,239,232,0.3)]"
              }`}>
                {["info", "shipping", "payment"].indexOf(step) > i ? "\u2713" : i + 1}
              </span>
              <span className="text-[9px] tracking-[0.2em] uppercase hidden sm:inline">
                {s === "info" ? "Information" : s === "shipping" ? "Shipping" : "Payment"}
              </span>
            </div>
            {i < 2 && <div className="w-12 h-px bg-[rgba(201,169,110,0.1)]" />}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
        <div className="lg:col-span-3">
          {/* Express checkout */}
          {step === "info" && (
            <div className="mb-8">
              <p className="text-[9px] tracking-[0.25em] uppercase text-[rgba(245,239,232,0.5)] text-center mb-4">
                Express Checkout
              </p>
              <div className="flex flex-col sm:flex-row gap-2 mb-6">
                <button className="flex-1 py-3.5 bg-[#5A31F4] text-white text-xs font-medium border-none cursor-pointer rounded-sm hover:opacity-90 transition-opacity">
                  Shop Pay
                </button>
                <button className="flex-1 py-3.5 bg-white text-[#3C4043] text-xs font-medium border-none cursor-pointer rounded-sm hover:opacity-90 transition-opacity">
                  G Pay
                </button>
                <button className="flex-1 py-3.5 bg-black text-white text-xs font-medium border-none cursor-pointer rounded-sm hover:opacity-90 transition-opacity">
                   Pay
                </button>
              </div>
              <button className="w-full py-3.5 bg-[#FFC439] text-[#003087] text-xs font-medium border-none cursor-pointer rounded-sm hover:opacity-90 transition-opacity mb-6">
                PayPal
              </button>
              <div className="flex items-center gap-4 mb-6">
                <div className="flex-1 h-px bg-[rgba(201,169,110,0.1)]" />
                <span className="text-[9px] tracking-[0.2em] uppercase text-[rgba(245,239,232,0.3)]">or</span>
                <div className="flex-1 h-px bg-[rgba(201,169,110,0.1)]" />
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {step === "info" && (
              <div>
                <h2 className="font-[family-name:var(--font-cormorant)] text-2xl text-[var(--cream)] mb-6">Contact Information</h2>
                <div className="flex flex-col gap-4">
                  <input name="email" type="email" required placeholder="Email address" value={formData.email} onChange={handleChange} className={inputClass} />
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      name="newsletter"
                      checked={formData.newsletter}
                      onChange={handleChange}
                      className="w-4 h-4 accent-[var(--gold)]"
                    />
                    <span className="text-[10px] text-[rgba(245,239,232,0.5)]">
                      Email me with news and offers
                    </span>
                  </label>
                  <h2 className="font-[family-name:var(--font-cormorant)] text-2xl text-[var(--cream)] mt-6 mb-2">Shipping Address</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <input name="firstName" required placeholder="First name" value={formData.firstName} onChange={handleChange} className={inputClass} />
                    <input name="lastName" required placeholder="Last name" value={formData.lastName} onChange={handleChange} className={inputClass} />
                  </div>
                  <input name="address" required placeholder="Address" value={formData.address} onChange={handleChange} className={inputClass} />
                  <div className="grid grid-cols-3 gap-4">
                    <input name="city" required placeholder="City" value={formData.city} onChange={handleChange} className={inputClass} />
                    <input name="postalCode" required placeholder="Postal code" value={formData.postalCode} onChange={handleChange} className={inputClass} />
                    <select name="country" value={formData.country} onChange={handleChange} className={inputClass}>
                      <option value="DE">Germany</option>
                      <option value="AT">Austria</option>
                      <option value="CH">Switzerland</option>
                      <option value="FR">France</option>
                      <option value="NL">Netherlands</option>
                      <option value="BE">Belgium</option>
                      <option value="IT">Italy</option>
                      <option value="ES">Spain</option>
                    </select>
                  </div>
                  <input name="phone" type="tel" placeholder="Phone (optional)" value={formData.phone} onChange={handleChange} className={inputClass} />
                </div>
              </div>
            )}

            {step === "shipping" && (
              <div>
                <h2 className="font-[family-name:var(--font-cormorant)] text-2xl text-[var(--cream)] mb-6">Shipping Method</h2>
                <div className="flex flex-col gap-3">
                  {[
                    { label: "Standard Shipping", desc: "3-5 business days", price: total >= 75 ? "Free" : "\u20ac5.95" },
                    { label: "Express Shipping", desc: "1-2 business days", price: "\u20ac12.95" },
                  ].map((method, i) => (
                    <label key={i} className={`flex items-center justify-between p-4 border cursor-pointer transition-all rounded-sm ${
                      i === 0 ? "border-[var(--gold)] bg-[rgba(201,169,110,0.05)]" : "border-[rgba(201,169,110,0.15)] hover:border-[var(--gold)]"
                    }`}>
                      <div className="flex items-center gap-3">
                        <div className={`w-4 h-4 rounded-full border ${i === 0 ? "border-[var(--gold)]" : "border-[rgba(201,169,110,0.2)]"} flex items-center justify-center`}>
                          {i === 0 && <div className="w-2 h-2 rounded-full bg-[var(--gold)]" />}
                        </div>
                        <div>
                          <p className="text-xs text-[var(--cream)]">{method.label}</p>
                          <p className="text-[9px] text-[rgba(245,239,232,0.3)]">{method.desc}</p>
                        </div>
                      </div>
                      <span className={`text-xs ${method.price === "Free" ? "text-[var(--success)]" : "text-[var(--cream)]"}`}>{method.price}</span>
                    </label>
                  ))}
                </div>

                {/* Order bumps */}
                <div className="mt-8">
                  <p className="text-[9px] tracking-[0.25em] uppercase text-[rgba(245,239,232,0.5)] mb-4">
                    Enhance Your Order
                  </p>
                  {ORDER_BUMPS.map((bump) => (
                    <label
                      key={bump.id}
                      className={`flex items-start gap-4 p-4 border mb-3 cursor-pointer transition-all rounded-sm ${
                        orderBumps[bump.id]
                          ? "border-[var(--gold)] bg-[rgba(201,169,110,0.05)]"
                          : "border-[rgba(201,169,110,0.1)] hover:border-[rgba(201,169,110,0.25)]"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={orderBumps[bump.id] || false}
                        onChange={(e) => setOrderBumps({ ...orderBumps, [bump.id]: e.target.checked })}
                        className="w-4 h-4 mt-0.5 accent-[var(--gold)] flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-xs text-[var(--cream)]">
                            ADD: {bump.name}
                          </p>
                          <span className="text-xs text-[var(--gold)] flex-shrink-0">&euro;{bump.price.toFixed(2)}</span>
                        </div>
                        <p className="text-[10px] text-[rgba(245,239,232,0.4)] mt-1 leading-relaxed">
                          {bump.description}
                        </p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {step === "payment" && (
              <div>
                <h2 className="font-[family-name:var(--font-cormorant)] text-2xl text-[var(--cream)] mb-6">Payment</h2>
                <div className="flex flex-col gap-4">
                  <div className="p-4 border border-[var(--gold)] bg-[rgba(201,169,110,0.05)] rounded-sm">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-4 h-4 rounded-full border border-[var(--gold)] flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-[var(--gold)]" />
                      </div>
                      <span className="text-xs text-[var(--cream)]">Credit Card</span>
                      <div className="ml-auto flex gap-1.5">
                        {["Visa", "MC", "Amex"].map((c) => (
                          <span key={c} className="text-[7px] border border-[rgba(201,169,110,0.2)] px-1.5 py-0.5 text-[rgba(245,239,232,0.4)] rounded-sm">{c}</span>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-col gap-3">
                      <input placeholder="Card number" className={inputClass} />
                      <div className="grid grid-cols-2 gap-3">
                        <input placeholder="MM / YY" className={inputClass} />
                        <input placeholder="CVC" className={inputClass} />
                      </div>
                    </div>
                  </div>

                  <label className="flex items-center justify-between p-4 border border-[rgba(201,169,110,0.15)] cursor-pointer hover:border-[var(--gold)] transition-colors rounded-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded-full border border-[rgba(201,169,110,0.2)] flex items-center justify-center" />
                      <div>
                        <span className="text-xs text-[var(--cream)]">Klarna</span>
                        <span className="text-[9px] text-[rgba(245,239,232,0.4)] ml-2">&mdash; Pay in 4 installments</span>
                      </div>
                    </div>
                    <span className="text-[9px] text-[rgba(245,239,232,0.4)]">4 &times; &euro;{(grandTotal / 4).toFixed(2)}</span>
                  </label>

                  <div className="flex gap-2">
                    {["PayPal", "Apple Pay", "Google Pay"].map((m) => (
                      <div key={m} className="flex-1 p-3 border border-[rgba(201,169,110,0.15)] text-[10px] text-[rgba(245,239,232,0.5)] text-center cursor-pointer hover:border-[var(--gold)] transition-colors rounded-sm">
                        {m}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div className="flex items-center justify-between mt-8">
              {step !== "info" ? (
                <button
                  type="button"
                  onClick={() => setStep(step === "payment" ? "shipping" : "info")}
                  className="text-[9px] tracking-[0.2em] uppercase text-[rgba(245,239,232,0.5)] bg-transparent border-none cursor-pointer hover:text-[var(--gold)]"
                >
                  &larr; Back
                </button>
              ) : (
                <Link href="/#collection" className="text-[9px] tracking-[0.2em] uppercase text-[rgba(245,239,232,0.5)] no-underline hover:text-[var(--gold)]">
                  &larr; Continue Shopping
                </Link>
              )}
              <button
                type="submit"
                className="py-4 px-12 bg-[var(--gold)] text-[var(--dark)] text-[9px] tracking-[0.35em] uppercase font-medium border-none cursor-pointer transition-all hover:bg-[var(--cream)]"
              >
                {step === "payment" ? "Complete Order" : "Continue"}
              </button>
            </div>

            {step === "payment" && (
              <p className="text-[8px] text-[rgba(245,239,232,0.25)] text-center mt-4">
                By placing this order, you agree to our Terms of Service and Privacy Policy.
              </p>
            )}
          </form>
        </div>

        {/* Order summary sidebar */}
        <div className="lg:col-span-2">
          <div className="bg-[var(--mid)] border border-[rgba(201,169,110,0.1)] p-6 rounded-sm sticky top-36">
            <h3 className="font-[family-name:var(--font-cormorant)] text-xl text-[var(--cream)] mb-6">Order Summary</h3>
            <div className="flex flex-col gap-4 mb-6">
              {items.map((item, i) => (
                <div key={i} className="flex gap-3">
                  <div className="w-14 h-18 bg-[var(--dark)] overflow-hidden flex-shrink-0 relative rounded-sm">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-[var(--burgundy)] text-[var(--cream)] text-[8px] rounded-full flex items-center justify-center">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-[var(--cream)] truncate">{item.name}</p>
                    <p className="text-[8px] text-[rgba(245,239,232,0.3)] mt-0.5">
                      {item.color}{item.bandSize ? ` \u00b7 ${item.bandSize}${item.cupSize}` : ""}
                    </p>
                  </div>
                  <p className="text-xs text-[var(--cream)] flex-shrink-0">&euro;{(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>

            <div className="border-t border-[rgba(201,169,110,0.06)] pt-4 flex flex-col gap-2">
              <div className="flex justify-between text-[10px] text-[rgba(245,239,232,0.5)]">
                <span>Subtotal ({count} items)</span>
                <span>&euro;{total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[10px] text-[rgba(245,239,232,0.5)]">
                <span>Shipping</span>
                <span className={shipping === 0 ? "text-[var(--success)]" : ""}>
                  {shipping === 0 ? "Free" : `\u20ac${shipping.toFixed(2)}`}
                </span>
              </div>
              {bumpsTotal > 0 && (
                <div className="flex justify-between text-[10px] text-[rgba(245,239,232,0.5)]">
                  <span>Add-ons</span>
                  <span>&euro;{bumpsTotal.toFixed(2)}</span>
                </div>
              )}
              <div className="border-t border-[rgba(201,169,110,0.06)] pt-3 mt-2 flex justify-between">
                <span className="text-xs text-[var(--cream)]">Total</span>
                <span className="font-[family-name:var(--font-cormorant)] text-xl text-[var(--gold)]">
                  &euro;{grandTotal.toFixed(2)}
                </span>
              </div>
              <p className="text-[9px] text-[rgba(245,239,232,0.3)] text-right">
                or 4 &times; &euro;{(grandTotal / 4).toFixed(2)} with Klarna
              </p>
            </div>

            {/* Trust signals */}
            <div className="mt-6 pt-4 border-t border-[rgba(201,169,110,0.06)] flex flex-col gap-2 text-[8px] tracking-[0.15em] uppercase text-[rgba(245,239,232,0.3)]">
              <span>&#128274; 256-bit SSL Encryption</span>
              <span>&#10003; 30-Day Money-Back Guarantee</span>
              <span>&#10003; Secure Payment Processing</span>
              <span>&#127466;&#127482; Made in Europe Since 1885</span>
            </div>

            {/* Payment logos */}
            <div className="mt-4 flex flex-wrap gap-1.5">
              {["Visa", "MC", "Amex", "PayPal", "Klarna", "Apple Pay", "G Pay"].map((p) => (
                <span key={p} className="border border-[rgba(201,169,110,0.15)] px-2 py-0.5 text-[8px] text-[rgba(245,239,232,0.3)] rounded-sm">{p}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
