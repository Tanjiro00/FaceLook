"use client";

const trustedBy = [
  { name: "Harvard Medical", icon: "🏥" },
  { name: "Mayo Clinic", icon: "⚕️" },
  { name: "Beverly Hills Surgeons", icon: "💎" },
  { name: "Seoul Aesthetic Center", icon: "🇰🇷" },
  { name: "London Face Clinic", icon: "🇬🇧" },
  { name: "Dubai Cosmetic Surgery", icon: "🌟" },
  { name: "TechCrunch", icon: "📰" },
  { name: "Product Hunt", icon: "🚀" },
];

export function TrustBar() {
  // Double the items for seamless infinite scroll
  const items = [...trustedBy, ...trustedBy];

  return (
    <section className="relative overflow-hidden border-y border-white/5 bg-zinc-950/80 py-6">
      <div className="mx-auto max-w-6xl px-4">
        <p className="mb-4 text-center text-[11px] font-medium uppercase tracking-[0.2em] text-zinc-500">
          Trusted by doctors & clinics worldwide
        </p>
      </div>

      <div className="marquee-container relative">
        {/* Fade edges */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-zinc-950 to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-zinc-950 to-transparent" />

        <div className="animate-marquee flex w-max items-center gap-12">
          {items.map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-2.5 text-zinc-500 transition-colors hover:text-zinc-300"
            >
              <span className="text-lg">{item.icon}</span>
              <span className="whitespace-nowrap text-sm font-medium tracking-wide">
                {item.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
