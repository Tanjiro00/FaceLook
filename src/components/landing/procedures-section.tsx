"use client";

import { PROCEDURES } from "@/config/procedures";
import { Lock } from "lucide-react";

export function ProceduresSection() {
  return (
    <section id="procedures" className="relative bg-zinc-950 py-24">
      <div className="bg-noise pointer-events-none absolute inset-0" />
      <div className="section-divider absolute top-0 left-0 right-0" />

      <div className="relative mx-auto max-w-6xl px-4">
        <div className="animate-on-scroll text-center">
          <span className="inline-block rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-wider text-zinc-500">
            Procedures
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
            What You Can Try
          </h2>
          <p className="mt-3 text-zinc-500">
            Face procedures available now. Body coming in v1.
          </p>
        </div>

        <div className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {PROCEDURES.map((proc, i) => (
            <div
              key={proc.id}
              className={`animate-on-scroll stagger-${Math.min(i + 1, 6)} group relative rounded-xl border border-white/5 bg-zinc-900/30 p-5 transition-all duration-300 hover:border-white/10 hover:bg-zinc-900/60 ${
                !proc.available ? "opacity-40" : ""
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{proc.icon}</span>
                  <div>
                    <h3 className="font-semibold text-white">{proc.name}</h3>
                    <p className="mt-0.5 text-xs text-zinc-500">{proc.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {proc.tier !== "free" && (
                    <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-zinc-500">
                      {proc.tier}
                    </span>
                  )}
                  {!proc.available && <Lock className="h-3.5 w-3.5 text-zinc-500" />}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
