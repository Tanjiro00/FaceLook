import { Camera, Wand2, SlidersHorizontal } from "lucide-react";

const steps = [
  {
    icon: Camera,
    title: "Upload a Selfie",
    description: "Take a photo or upload from gallery. Front-facing works best.",
    color: "violet",
  },
  {
    icon: Wand2,
    title: "Choose a Procedure",
    description: "Rhinoplasty, lip fillers, botox, cheek augmentation — pick what interests you.",
    color: "pink",
  },
  {
    icon: SlidersHorizontal,
    title: "See Your Result",
    description: "Get a photorealistic AI visualization in ~10 sec. Adjust intensity, compare side-by-side.",
    color: "cyan",
  },
];

const colorMap: Record<string, { bg: string; text: string; glow: string; line: string }> = {
  violet: { bg: "bg-violet-500/10", text: "text-violet-400", glow: "shadow-violet-500/20", line: "from-violet-500" },
  pink: { bg: "bg-pink-500/10", text: "text-pink-400", glow: "shadow-pink-500/20", line: "from-pink-500" },
  cyan: { bg: "bg-cyan-500/10", text: "text-cyan-400", glow: "shadow-cyan-500/20", line: "from-cyan-500" },
};

export function HowItWorks() {
  return (
    <section id="how-it-works" className="relative bg-zinc-950 py-24">
      <div className="bg-dots absolute inset-0" />
      <div className="bg-radial-fade absolute inset-0" />
      <div className="bg-noise pointer-events-none absolute inset-0" />

      <div className="relative mx-auto max-w-6xl px-4">
        <div className="animate-on-scroll text-center">
          <span className="inline-block rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-wider text-zinc-500">
            How It Works
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
            Three Steps to Your Future Self
          </h2>
          <p className="mt-3 text-zinc-500">
            No downloads, no waiting rooms, no guesswork.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {steps.map((step, i) => {
            const c = colorMap[step.color];
            return (
              <div
                key={step.title}
                className={`animate-on-scroll stagger-${i + 1} group relative rounded-2xl border border-white/5 bg-zinc-900/50 p-8 transition-all duration-300 hover:-translate-y-1 hover:border-white/10 hover:shadow-xl ${c.glow}`}
              >
                {/* Step number with gradient line */}
                <span className={`absolute -top-3 right-6 flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-zinc-900 text-xs font-bold ${c.text}`}>
                  {i + 1}
                </span>

                <div className={`mb-5 inline-flex rounded-xl ${c.bg} p-3`}>
                  <step.icon className={`h-6 w-6 ${c.text}`} />
                </div>

                <h3 className="text-lg font-semibold text-white">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-500">
                  {step.description}
                </p>

                {/* Connector line (hidden on last) */}
                {i < 2 && (
                  <div className="absolute -right-3 top-1/2 hidden h-px w-6 bg-gradient-to-r from-white/10 to-transparent md:block" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
