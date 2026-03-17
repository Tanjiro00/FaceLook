import { Star } from "lucide-react";

const testimonials = [
  {
    text: "I've been considering rhinoplasty for years but was terrified of the unknown. FaceLook showed me exactly what I'd look like.",
    name: "Sarah K.",
    role: "Patient",
  },
  {
    text: "I recommend FaceLook to all my patients before consultation. It sets realistic expectations and saves us both time.",
    name: "Dr. Elena M.",
    role: "Plastic Surgeon",
  },
  {
    text: "The AI quality is insane — it actually looks like a real photo, not a warped filter. Helped me decide on lip fillers.",
    name: "Jessica L.",
    role: "User",
  },
];

export function TestimonialsSection() {
  return (
    <section className="border-t border-white/5 bg-zinc-950 py-24">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="animate-on-scroll text-center text-3xl font-bold tracking-tight text-white sm:text-4xl">
          What people say
        </h2>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className={`animate-on-scroll stagger-${i + 1} rounded-2xl border border-white/5 bg-white/[0.02] p-6`}
            >
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} className="h-3.5 w-3.5 fill-amber-400/80 text-amber-400/80" />
                ))}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-zinc-400">
                &ldquo;{t.text}&rdquo;
              </p>
              <div className="mt-5">
                <div className="text-sm font-medium text-white">{t.name}</div>
                <div className="text-xs text-zinc-600">{t.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
