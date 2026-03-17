"use client";

import { useState } from "react";
import Link from "next/link";
import { PRICING_PLANS } from "@/config/procedures";
import { Check, Sparkles } from "lucide-react";

export function PricingSection() {
  const [annual, setAnnual] = useState(false);

  return (
    <section id="pricing" className="relative bg-zinc-950 py-24">
      <div className="bg-noise pointer-events-none absolute inset-0" />

      {/* Background glow */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-[500px] w-[800px] rounded-full bg-violet-600/5 blur-[150px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4">
        <div className="animate-on-scroll text-center">
          <span className="inline-block rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-wider text-zinc-500">
            Pricing
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
            Simple, Transparent Pricing
          </h2>
          <p className="mt-3 text-zinc-500">
            Start free. Upgrade when you&apos;re ready.
          </p>

          {/* Monthly / Annual toggle */}
          <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 p-1 backdrop-blur-sm">
            <button
              onClick={() => setAnnual(false)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${
                !annual
                  ? "bg-white text-black shadow-lg shadow-white/10"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`relative rounded-full px-5 py-2 text-sm font-medium transition-all ${
                annual
                  ? "bg-white text-black shadow-lg shadow-white/10"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Annual
              <span className="absolute -right-2 -top-2 rounded-full bg-emerald-500 px-1.5 py-0.5 text-[10px] font-bold text-white">
                -20%
              </span>
            </button>
          </div>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {PRICING_PLANS.map((plan, i) => {
            const displayPrice = annual && plan.price > 0 && plan.id !== "pay_per_use"
              ? Math.round(plan.price * 0.8 * 100) / 100
              : plan.price;

            return (
              <div
                key={plan.id}
                className={`animate-on-scroll stagger-${i + 1} group relative flex flex-col`}
              >
                {/* Gradient border glow for popular plan */}
                {plan.popular && (
                  <div className="animate-pulse-glow absolute -inset-px rounded-2xl bg-gradient-to-b from-violet-500 via-pink-500 to-cyan-500 opacity-70 blur-[1px]" />
                )}

                <div
                  className={`relative flex flex-1 flex-col rounded-2xl border p-6 transition-all duration-300 ${
                    plan.popular
                      ? "border-transparent bg-zinc-900"
                      : "border-white/5 bg-white/[0.02] hover:border-white/10 hover:bg-white/[0.04]"
                  }`}
                >
                  {/* Popular badge */}
                  {plan.popular && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                      <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-violet-500 to-pink-500 px-3 py-1 text-xs font-semibold text-white shadow-lg shadow-violet-500/25">
                        <Sparkles className="h-3 w-3" />
                        Most Popular
                      </span>
                    </div>
                  )}

                  {/* Plan name */}
                  <h3 className="text-sm font-medium uppercase tracking-wider text-zinc-500">
                    {plan.name}
                  </h3>

                  {/* Price */}
                  <div className="mt-4 flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-white">
                      {displayPrice === 0 ? "Free" : `$${displayPrice}`}
                    </span>
                    {plan.id !== "pay_per_use" && displayPrice > 0 && (
                      <span className="text-sm text-zinc-600">/mo</span>
                    )}
                    {plan.id === "pay_per_use" && (
                      <span className="text-sm text-zinc-600">/pack</span>
                    )}
                  </div>

                  {/* Annual savings indicator */}
                  {annual && plan.price > 0 && plan.id !== "pay_per_use" && (
                    <p className="mt-1 text-xs text-emerald-400">
                      Save ${Math.round(plan.price * 0.2 * 12 * 100) / 100}/year
                    </p>
                  )}

                  {/* Features */}
                  <ul className="mt-6 flex-1 space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5 text-sm text-zinc-400">
                        <Check
                          className={`mt-0.5 h-4 w-4 shrink-0 ${
                            plan.popular ? "text-violet-400" : "text-zinc-600"
                          }`}
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Link
                    href="/signup"
                    className={`mt-6 block rounded-xl py-2.5 text-center text-sm font-semibold transition-all duration-300 ${
                      plan.popular
                        ? "bg-white text-black shadow-lg shadow-white/10 hover:bg-zinc-200"
                        : "border border-white/10 bg-white/5 text-white hover:border-white/20 hover:bg-white/10"
                    }`}
                  >
                    {plan.price === 0 ? "Get Started" : "Subscribe"}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
