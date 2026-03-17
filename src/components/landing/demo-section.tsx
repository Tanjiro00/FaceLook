"use client";

import { useState } from "react";
import { BeforeAfterSlider } from "@/components/shared/before-after-slider";
import { Badge } from "@/components/ui/badge";
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
    <section className="bg-muted/30 py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            See the Difference
          </h2>
          <p className="mt-3 text-muted-foreground">
            Drag the slider to compare before and after. Powered by generative AI.
          </p>
        </div>

        {/* Procedure tabs */}
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {demos.map((d, i) => (
            <button
              key={d.id}
              onClick={() => setActive(i)}
              className={cn(
                "flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all",
                active === i
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              )}
            >
              <span>{d.icon}</span>
              {d.label}
            </button>
          ))}
        </div>

        {/* Slider */}
        <div className="mx-auto mt-8 max-w-2xl">
          <BeforeAfterSlider
            key={demo.id}
            beforeSrc={demo.before}
            afterSrc={demo.after}
            className="aspect-[4/3] rounded-2xl shadow-2xl"
          />
          <div className="mt-4 flex items-center justify-center gap-2">
            <Badge variant="secondary">AI-generated result</Badge>
            <span className="text-xs text-muted-foreground">
              · Not a real patient · For demonstration only
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
