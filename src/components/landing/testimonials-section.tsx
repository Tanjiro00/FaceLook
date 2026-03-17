"use client";

import { Star } from "lucide-react";

const testimonials = [
  {
    text: "I've been considering rhinoplasty for years but was terrified of the unknown. FaceLook showed me exactly what I'd look like — now I've booked my consultation.",
    name: "Sarah K.",
    role: "Verified User",
    rating: 5,
  },
  {
    text: "As a plastic surgeon, I recommend FaceLook to all my patients before consultation. It sets realistic expectations and saves us both time.",
    name: "Dr. Elena M.",
    role: "Board-Certified Plastic Surgeon",
    rating: 5,
  },
  {
    text: "The AI quality is insane — it's not morphing, it actually looks like a real photo. I tried lip fillers and cheek augmentation before deciding.",
    name: "Jessica L.",
    role: "Premium User",
    rating: 5,
  },
  {
    text: "I showed my results to my surgeon and he was amazed at how close the AI prediction was to what he had in mind. Incredible technology.",
    name: "Michael R.",
    role: "Verified User",
    rating: 5,
  },
  {
    text: "Finally a tool that doesn't just warp your face. The results look natural and helped me make the right decision about my procedure.",
    name: "Anna P.",
    role: "Premium User",
    rating: 5,
  },
  {
    text: "We've integrated FaceLook into our clinic's workflow. Patients come in better prepared, consultations are more productive, and satisfaction rates are higher.",
    name: "Dr. James W.",
    role: "Clinic Director",
    rating: 5,
  },
  {
    text: "Tried every app out there — nothing comes close to FaceLook's quality. The 10-second turnaround is just a bonus at this point.",
    name: "Olivia T.",
    role: "Beauty Blogger",
    rating: 5,
  },
  {
    text: "The privacy aspect sold me. Knowing my photos aren't stored anywhere gave me the confidence to actually try it. Results were stunning.",
    name: "David H.",
    role: "Verified User",
    rating: 5,
  },
];

// Split into two rows for marquee
const row1 = testimonials.slice(0, 4);
const row2 = testimonials.slice(4);

function TestimonialCard({ t }: { t: (typeof testimonials)[0] }) {
  return (
    <div className="glass-card w-[350px] shrink-0 rounded-2xl p-6 transition-all duration-300">
      {/* Stars */}
      <div className="flex gap-0.5">
        {Array.from({ length: t.rating }).map((_, j) => (
          <Star key={j} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
        ))}
      </div>

      {/* Quote */}
      <p className="mt-4 text-sm leading-relaxed text-zinc-300">
        &ldquo;{t.text}&rdquo;
      </p>

      {/* Author */}
      <div className="mt-5 flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-violet-500/20 to-cyan-500/20 text-sm font-bold text-white">
          {t.name.charAt(0)}
        </div>
        <div>
          <div className="text-sm font-medium text-white">{t.name}</div>
          <div className="text-xs text-zinc-600">{t.role}</div>
        </div>
      </div>
    </div>
  );
}

export function TestimonialsSection() {
  return (
    <section className="relative overflow-hidden bg-zinc-950 py-24">
      <div className="bg-noise pointer-events-none absolute inset-0" />

      <div className="relative mx-auto max-w-6xl px-4">
        <div className="animate-on-scroll text-center">
          <span className="inline-block rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-wider text-zinc-500">
            Testimonials
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Loved by Users & Doctors
          </h2>
          <p className="mt-3 text-zinc-500">
            Join thousands who made informed decisions with FaceLook.
          </p>
        </div>
      </div>

      {/* Marquee row 1 — scrolls left */}
      <div className="marquee-container relative mt-14">
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-32 bg-gradient-to-r from-zinc-950 to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-32 bg-gradient-to-l from-zinc-950 to-transparent" />

        <div className="animate-marquee flex w-max gap-6">
          {[...row1, ...row1].map((t, i) => (
            <TestimonialCard key={i} t={t} />
          ))}
        </div>
      </div>

      {/* Marquee row 2 — scrolls right (reversed direction) */}
      <div className="marquee-container relative mt-6">
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-32 bg-gradient-to-r from-zinc-950 to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-32 bg-gradient-to-l from-zinc-950 to-transparent" />

        <div
          className="animate-marquee flex w-max gap-6"
          style={{ animationDirection: "reverse" }}
        >
          {[...row2, ...row2].map((t, i) => (
            <TestimonialCard key={i} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
