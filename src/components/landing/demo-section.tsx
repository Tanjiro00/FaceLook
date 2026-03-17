"use client";

import { useState } from "react";
import { BeforeAfterSlider } from "@/components/shared/before-after-slider";
import { cn } from "@/lib/utils";

const demos = [
  {
    id: "rhinoplasty",
    label: "Rhinoplasty",
    icon: "👃",
    before: "/demo/rhino-before.svg",
    after: "/demo/rhino-after.svg",
  },
  {
    id: "lip-filler",
    label: "Lip Filler",
    icon: "💋",
    before: "/demo/lips-before.svg",
    after: "/demo/lips-after.svg",
  },
  {
    id: "botox",
    label: "Botox",
    icon: "✨",
    before: "/demo/botox-before.svg",
    after: "/demo/botox-after.svg",
  },
];

export function DemoSection() {
  const [active, setActive] = useState(0);
  const demo = demos[active];

  return (
    <section id="demo" className="relative bg-zinc-950 py-24">
      <div className="bg-noise pointer-events-none absolute inset-0" />

      {/* Subtle glow */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-[400px] w-[600px] rounded-full bg-violet-600/5 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4">
        <div className="animate-on-scroll text-center">
          <span className="inline-block rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-wider text-zinc-500">
            Live Demo
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
            See the Difference
          </h2>
          <p className="mt-3 text-zinc-500">
            Drag the slider to compare. Powered by generative AI, not morphing.
          </p>
        </div>

        {/* Procedure tabs */}
        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {demos.map((d, i) => (
            <button
              key={d.id}
              onClick={() => setActive(i)}
              className={cn(
                "flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-all",
                active === i
                  ? "bg-white text-black shadow-lg shadow-white/10"
                  : "border border-white/10 bg-white/5 text-zinc-400 hover:border-white/20 hover:text-white"
              )}
            >
              <span>{d.icon}</span>
              {d.label}
            </button>
          ))}
        </div>

        {/* Slider */}
        <div className="animate-scale-on-scroll mx-auto mt-10 max-w-2xl">
          <div className="rounded-2xl border border-white/10 bg-zinc-900/50 p-2 shadow-2xl shadow-black/50">
            <BeforeAfterSlider
              key={demo.id}
              beforeSrc={demo.before}
              afterSrc={demo.after}
              className="aspect-[4/3] rounded-xl"
            />
          </div>

          {/* Disclaimer */}
          <div className="mt-4 flex items-center justify-center gap-2 text-xs text-zinc-600">
            <span className="rounded-full border border-white/5 bg-white/5 px-2.5 py-0.5">
              AI-generated
            </span>
            <span>Not a real patient · For demonstration only</span>
          </div>
        </div>
      </div>
    </section>
  );
}
