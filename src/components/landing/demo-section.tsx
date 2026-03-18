"use client";

import { useState } from "react";
import { BeforeAfterSlider } from "@/components/shared/before-after-slider";

const demos = [
  { id: "rhinoplasty", label: "Rhinoplasty", before: "/demo/rhino-before.svg", after: "/demo/rhino-after.svg" },
  { id: "lip-filler", label: "Lip Filler", before: "/demo/lips-before.svg", after: "/demo/lips-after.svg" },
  { id: "botox", label: "Botox", before: "/demo/botox-before.svg", after: "/demo/botox-after.svg" },
];

export function DemoSection() {
  const [active, setActive] = useState(0);
  const demo = demos[active];

  return (
    <section id="demo" className="bg-zinc-950 py-24">
      <div className="mx-auto max-w-6xl px-4">
        <div className="animate-on-scroll text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            See the difference
          </h2>
          <p className="mt-3 text-zinc-500">
            Drag to compare. AI-generated, not morphing.
          </p>
        </div>

        {/* Tabs */}
        <div className="mt-10 flex justify-center gap-2">
          {demos.map((d, i) => (
            <button
              key={d.id}
              onClick={() => setActive(i)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${
                active === i
                  ? "bg-white text-black"
                  : "text-zinc-500 hover:text-white"
              }`}
            >
              {d.label}
            </button>
          ))}
        </div>

        {/* Slider */}
        <div className="mx-auto mt-8 max-w-2xl">
          <div className="rounded-2xl border border-white/5 bg-zinc-900/30 p-2">
            <BeforeAfterSlider
              key={demo.id}
              beforeSrc={demo.before}
              afterSrc={demo.after}
              className="aspect-[4/3] rounded-xl"
            />
          </div>
          <p className="mt-3 text-center text-xs text-zinc-500">
            AI-generated · Not a real patient · For demonstration only
          </p>
        </div>
      </div>
    </section>
  );
}
