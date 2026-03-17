"use client";

import { useRef, useEffect } from "react";
import {
  Sparkles,
  ShieldCheck,
  Gauge,
  Eye,
  SlidersHorizontal,
  Globe,
} from "lucide-react";

const features = [
  {
    icon: Sparkles,
    title: "Generative AI, Not Morphing",
    description:
      "Powered by FLUX Kontext Pro — we generate entirely new photorealistic images, not warped copies of your face.",
    color: "violet",
    span: "md:col-span-2",
  },
  {
    icon: Gauge,
    title: "10-Second Results",
    description: "See your transformation in real time. No waiting, no scheduling.",
    color: "cyan",
    span: "",
  },
  {
    icon: Eye,
    title: "98% Identity Match",
    description: "Our AI preserves your unique features — only the target area changes.",
    color: "pink",
    span: "",
  },
  {
    icon: ShieldCheck,
    title: "Privacy First",
    description: "Photos processed and discarded. Zero storage, zero tracking, full HIPAA compliance.",
    color: "emerald",
    span: "",
  },
  {
    icon: SlidersHorizontal,
    title: "Adjustable Intensity",
    description:
      "Fine-tune how subtle or dramatic the result is. From natural to bold — you decide.",
    color: "amber",
    span: "md:col-span-2",
  },
  {
    icon: Globe,
    title: "Works Everywhere",
    description: "No app to download. Works on any device with a camera and browser.",
    color: "cyan",
    span: "",
  },
];

const colorMap: Record<string, { bg: string; text: string; border: string }> = {
  violet: { bg: "bg-violet-500/10", text: "text-violet-400", border: "group-hover:border-violet-500/20" },
  cyan: { bg: "bg-cyan-500/10", text: "text-cyan-400", border: "group-hover:border-cyan-500/20" },
  pink: { bg: "bg-pink-500/10", text: "text-pink-400", border: "group-hover:border-pink-500/20" },
  emerald: { bg: "bg-emerald-500/10", text: "text-emerald-400", border: "group-hover:border-emerald-500/20" },
  amber: { bg: "bg-amber-500/10", text: "text-amber-400", border: "group-hover:border-amber-500/20" },
};

export function FeaturesSection() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const handleMouseMove = (e: MouseEvent) => {
      const cards = grid.querySelectorAll<HTMLElement>(".bento-glow");
      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
        card.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
      });
    };

    grid.addEventListener("mousemove", handleMouseMove);
    return () => grid.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="relative bg-zinc-950 py-24">
      <div className="bg-noise pointer-events-none absolute inset-0" />

      <div className="relative mx-auto max-w-6xl px-4">
        <div className="animate-on-scroll text-center">
          <span className="inline-block rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-wider text-zinc-500">
            Why FaceLook
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
            Built Different
          </h2>
          <p className="mt-3 text-zinc-500">
            Not another photo filter. Real AI-generated visualizations.
          </p>
        </div>

        {/* Bento grid */}
        <div
          ref={gridRef}
          className="mt-14 grid gap-4 md:grid-cols-3"
        >
          {features.map((f, i) => {
            const c = colorMap[f.color];
            return (
              <div
                key={f.title}
                className={`bento-glow animate-on-scroll stagger-${i + 1} group rounded-2xl border border-white/5 bg-zinc-900/30 p-6 transition-all duration-500 hover:border-white/10 ${f.span} ${c.border}`}
              >
                <div className={`mb-4 inline-flex rounded-xl ${c.bg} p-3`}>
                  <f.icon className={`h-5 w-5 ${c.text}`} />
                </div>
                <h3 className="text-lg font-semibold text-white">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-500">
                  {f.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
