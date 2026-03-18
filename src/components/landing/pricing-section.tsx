"use client";

import { useState } from "react";
import Link from "next/link";
import { PRICING_PLANS } from "@/config/procedures";
import { Check } from "lucide-react";

export function PricingSection() {
  const [annual, setAnnual] = useState(true);

  // Main 3 tiers (no pay_per_use) — research shows 3 tiers converts 31% better
  const mainPlans = PRICING_PLANS.filter((p) => p.id !== "pay_per_use");
  const ppuPlan = PRICING_PLANS.find((p) => p.id === "pay_per_use");

  return (
    <section id="pricing" className="border-t border-white/5 bg-zinc-950 py-24">
      <div className="mx-auto max-w-5xl px-4">
        <div className="animate-on-scroll text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Pricing
          </h2>
          <p className="mt-3 text-zinc-500">
            Start free. Upgrade when you&apos;re ready.
          </p>

          {/* Toggle — annual default */}
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

        {/* 3 main tiers */}
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {mainPlans.map((plan, i) => {
            const price = annual && plan.price > 0
              ? Math.round(plan.price * 0.8 * 100) / 100
              : plan.price;

            const isPopular = plan.popular;

            return (
              <div
                key={plan.id}
                className={`animate-on-scroll stagger-${i + 1} relative flex flex-col rounded-2xl border p-6 ${
                  isPopular
                    ? "border-violet-500/30 bg-violet-500/[0.04] ring-1 ring-violet-500/20"
                    : "border-white/5 bg-white/[0.02]"
                }`}
              >
                {isPopular && (
                  <div className="absolute -top-3 left-6 rounded-full bg-violet-500 px-3 py-0.5 text-xs font-medium text-white">
                    Most Popular
                  </div>
                )}

                <div className="text-xs font-medium uppercase tracking-wider text-zinc-500">
                  {plan.name}
                </div>

                <div className="mt-3 flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-white">
                    {price === 0 ? "Free" : `$${price}`}
                  </span>
                  {price > 0 && (
                    <span className="text-sm text-zinc-500">/mo</span>
                  )}
                </div>

                {annual && plan.price > 0 && (
                  <p className="mt-1 text-xs text-emerald-500">
                    ${Math.round(price * 12 * 100) / 100}/year — save ${Math.round(plan.price * 12 * 0.2 * 100) / 100}
                  </p>
                )}

                <ul className="mt-5 flex-1 space-y-2.5">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-zinc-400">
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-zinc-500" />
                      {f}
                    </li>
                  ))}
                </ul>

                <Link
                  href="/signup"
                  className={`mt-6 block rounded-lg py-2.5 text-center text-sm font-medium transition-colors ${
                    isPopular
                      ? "bg-white text-black hover:bg-zinc-200"
                      : "border border-white/10 text-zinc-400 hover:border-white/20 hover:text-white"
                  }`}
                >
                  {price === 0 ? "Get started free" : "Subscribe"}
                </Link>
              </div>
            );
          })}
        </div>

        {/* Pay-per-use as secondary option */}
        {ppuPlan && (
          <div className="animate-on-scroll stagger-4 mx-auto mt-6 max-w-md rounded-2xl border border-white/5 bg-white/[0.02] p-5">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm font-medium text-white">{ppuPlan.name}</span>
                <span className="ml-2 text-sm text-zinc-500">
                  — {ppuPlan.priceLabel} for {ppuPlan.generationsLimit} generations
                </span>
              </div>
              <Link
                href="/signup"
                className="rounded-lg border border-white/10 px-4 py-1.5 text-sm text-zinc-400 transition-colors hover:border-white/20 hover:text-white"
              >
                Buy Pack
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
