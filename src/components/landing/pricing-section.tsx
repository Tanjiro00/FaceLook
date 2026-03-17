"use client";

import { useState } from "react";
import Link from "next/link";
import { PRICING_PLANS } from "@/config/procedures";
import { Check } from "lucide-react";

export function PricingSection() {
  const [annual, setAnnual] = useState(false);

  return (
    <section id="pricing" className="border-t border-white/5 bg-zinc-950 py-24">
      <div className="mx-auto max-w-6xl px-4">
        <div className="animate-on-scroll text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Pricing
          </h2>
          <p className="mt-3 text-zinc-500">
            Start free. Upgrade when you&apos;re ready.
          </p>

          {/* Toggle */}
          <div className="mt-6 inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1">
            <button
              onClick={() => setAnnual(false)}
              className={`rounded-full px-4 py-1.5 text-sm transition-all ${
                !annual ? "bg-white text-black" : "text-zinc-500"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`rounded-full px-4 py-1.5 text-sm transition-all ${
                annual ? "bg-white text-black" : "text-zinc-500"
              }`}
            >
              Annual <span className="text-emerald-500">-20%</span>
            </button>
          </div>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {PRICING_PLANS.map((plan, i) => {
            const price = annual && plan.price > 0 && plan.id !== "pay_per_use"
              ? Math.round(plan.price * 0.8 * 100) / 100
              : plan.price;

            return (
              <div
                key={plan.id}
                className={`animate-on-scroll stagger-${i + 1} relative flex flex-col rounded-2xl border p-6 ${
                  plan.popular
                    ? "border-violet-500/30 bg-violet-500/[0.04]"
                    : "border-white/5 bg-white/[0.02]"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-6 rounded-full bg-violet-500 px-3 py-0.5 text-xs font-medium text-white">
                    Popular
                  </div>
                )}

                <div className="text-xs font-medium uppercase tracking-wider text-zinc-600">
                  {plan.name}
                </div>

                <div className="mt-3 flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-white">
                    {price === 0 ? "Free" : `$${price}`}
                  </span>
                  {plan.id !== "pay_per_use" && price > 0 && (
                    <span className="text-sm text-zinc-600">/mo</span>
                  )}
                  {plan.id === "pay_per_use" && (
                    <span className="text-sm text-zinc-600">/pack</span>
                  )}
                </div>

                <ul className="mt-5 flex-1 space-y-2.5">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-zinc-400">
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-zinc-600" />
                      {f}
                    </li>
                  ))}
                </ul>

                <Link
                  href="/signup"
                  className={`mt-6 block rounded-lg py-2.5 text-center text-sm font-medium transition-colors ${
                    plan.popular
                      ? "bg-white text-black hover:bg-zinc-200"
                      : "border border-white/10 text-zinc-400 hover:text-white"
                  }`}
                >
                  {price === 0 ? "Get started" : "Subscribe"}
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
