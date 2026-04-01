"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function CheckoutPage() {
  const { items, removeItem, total, count, clearCart } = useCart();
  const [step, setStep] = useState<"info" | "shipping" | "payment" | "confirmed">("info");
  const [formData, setFormData] = useState({
    email: "", firstName: "", lastName: "",
    address: "", city: "", postalCode: "", country: "DE",
    phone: "",
  });

  const shipping = total >= 75 ? 0 : 5.95;
  const grandTotal = total + shipping;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === "info") setStep("shipping");
    else if (step === "shipping") setStep("payment");
    else if (step === "payment") {
      setStep("confirmed");
      clearCart();
    }
  };

  const inputClass = "w-full py-3.5 px-4 bg-[rgba(21,8,16,0.6)] border border-[rgba(201,169,110,0.15)] text-[var(--cream)] text-xs tracking-[0.05em] outline-none placeholder:text-[rgba(245,239,232,0.3)] focus:border-[var(--gold)] rounded-sm";

  if (items.length === 0 && step !== "confirmed") {
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

  if (step === "confirmed") {
    return (
      <div className="relative z-[2] pt-36 pb-32 text-center px-6">
        <div className="text-[var(--success)] text-4xl mb-6">&#10003;</div>
        <h1 className="font-[family-name:var(--font-cormorant)] text-[48px] font-light text-[var(--cream)]">
          Thank <em className="italic text-[var(--terracotta)]">You</em>
        </h1>
        <p className="mt-4 text-[10px] tracking-[0.3em] uppercase text-[rgba(245,239,232,0.5)]">
          Your order has been confirmed. We&rsquo;ll send you a confirmation email shortly.
        </p>
        <p className="mt-2 text-[9px] tracking-[0.2em] uppercase text-[rgba(245,239,232,0.3)]">
          Order #CTR-{Math.random().toString(36).substring(2, 8).toUpperCase()}
        </p>
        <Link
          href="/"
          className="mt-8 inline-block py-4 px-12 bg-[var(--burgundy)] border border-[var(--burgundy)] text-[9px] tracking-[0.35em] uppercase text-[var(--cream)] no-underline hover:bg-transparent hover:border-[var(--rose)] hover:text-[var(--rose)] transition-all"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="relative z-[2] pt-28 md:pt-36 pb-20 px-6 md:px-12 max-w-[1200px] mx-auto">
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
                {["info", "shipping", "payment"].indexOf(step) > i ? "&#10003;" : i + 1}
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
          <form onSubmit={handleSubmit}>
            {step === "info" && (
              <div>
                <h2 className="font-[family-name:var(--font-cormorant)] text-2xl text-[var(--cream)] mb-6">Contact Information</h2>
                <div className="flex flex-col gap-4">
                  <input name="email" type="email" required placeholder="Email address" value={formData.email} onChange={handleChange} className={inputClass} />
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
                    </div>
                    <div className="flex flex-col gap-3">
                      <input placeholder="Card number" className={inputClass} />
                      <div className="grid grid-cols-2 gap-3">
                        <input placeholder="MM / YY" className={inputClass} />
                        <input placeholder="CVC" className={inputClass} />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {["PayPal", "Klarna", "Apple Pay", "Google Pay"].map((m) => (
                      <div key={m} className="p-3 border border-[rgba(201,169,110,0.15)] text-[10px] text-[rgba(245,239,232,0.5)] cursor-pointer hover:border-[var(--gold)] transition-colors rounded-sm">
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
                className="py-4 px-12 bg-[var(--burgundy)] border border-[var(--burgundy)] text-[9px] tracking-[0.35em] uppercase text-[var(--cream)] cursor-pointer transition-all hover:bg-transparent hover:border-[var(--rose)] hover:text-[var(--rose)]"
              >
                {step === "payment" ? "Place Order" : "Continue"}
              </button>
            </div>
          </form>
        </div>

        {/* Order summary */}
        <div className="lg:col-span-2">
          <div className="bg-[var(--mid)] border border-[rgba(201,169,110,0.1)] p-6 rounded-sm">
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
              <div className="border-t border-[rgba(201,169,110,0.06)] pt-3 mt-2 flex justify-between">
                <span className="text-xs text-[var(--cream)]">Total</span>
                <span className="font-[family-name:var(--font-cormorant)] text-xl text-[var(--gold)]">
                  &euro;{grandTotal.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[rgba(201,169,110,0.06)] flex flex-col gap-2 text-[8px] tracking-[0.15em] uppercase text-[rgba(245,239,232,0.3)]">
              <span>&#128274; Secure SSL Encrypted Checkout</span>
              <span>&#9745; 30-Day Easy Returns</span>
              <span>&#9745; OEKO-TEX&reg; Certified Products</span>
              <span>&#9745; Made in Europe Since 1885</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
