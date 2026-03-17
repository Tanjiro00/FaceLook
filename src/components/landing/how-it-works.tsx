import { Camera, Wand2, SlidersHorizontal } from "lucide-react";

const steps = [
  {
    icon: Camera,
    title: "Upload a Selfie",
    description:
      "Take a photo or upload one from your gallery. Works with any front-facing photo.",
  },
  {
    icon: Wand2,
    title: "Choose a Procedure",
    description:
      "Rhinoplasty, lip fillers, botox, cheek augmentation — pick what interests you.",
  },
  {
    icon: SlidersHorizontal,
    title: "See Your Result",
    description:
      "Get a photorealistic AI visualization in ~10 seconds. Adjust intensity, compare side-by-side.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Three Steps to See Your Future Self
          </h2>
          <p className="mt-3 text-muted-foreground">
            No accounts, no downloads, no waiting rooms.
          </p>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {steps.map((step, i) => (
            <div key={step.title} className="relative text-center">
              {/* Step number */}
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <step.icon className="h-6 w-6" />
              </div>
              <span className="absolute -top-2 right-1/2 translate-x-8 text-6xl font-bold text-muted-foreground/10">
                {i + 1}
              </span>
              <h3 className="text-lg font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
