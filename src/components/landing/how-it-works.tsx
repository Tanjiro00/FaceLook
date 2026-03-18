import { Camera, Wand2, SlidersHorizontal } from "lucide-react";

const steps = [
  { icon: Camera, title: "Upload a selfie", description: "Front-facing photo, any device." },
  { icon: Wand2, title: "Pick a procedure", description: "Rhinoplasty, lip fillers, botox, and more." },
  { icon: SlidersHorizontal, title: "See the result", description: "Photorealistic visualization in ~10 seconds." },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="border-t border-white/5 bg-zinc-950 py-24">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="animate-on-scroll text-center text-3xl font-bold tracking-tight text-white sm:text-4xl">
          How it works
        </h2>

        <div className="mt-16 grid gap-12 md:grid-cols-3 md:gap-8">
          {steps.map((step, i) => (
            <div
              key={step.title}
              className={`animate-on-scroll stagger-${i + 1} group rounded-2xl border border-transparent p-6 text-center transition-all duration-300 hover:border-white/5 hover:bg-white/[0.02]`}
            >
              <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-all duration-300 group-hover:border-violet-500/30 group-hover:bg-violet-500/10">
                <step.icon className="h-5 w-5 text-zinc-400 transition-colors group-hover:text-violet-400" />
              </div>
              <div className="mb-2 text-xs font-medium text-zinc-500">
                Step {i + 1}
              </div>
              <h3 className="text-lg font-semibold text-white">{step.title}</h3>
              <p className="mt-1 text-sm text-zinc-500">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
