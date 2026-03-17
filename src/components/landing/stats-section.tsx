"use client";

const stats = [
  { value: "~10s", label: "Average Generation Time", accent: "text-cyan-400" },
  { value: "98%", label: "Identity Preservation", accent: "text-violet-400" },
  { value: "$0.05", label: "Per Generation Cost", accent: "text-emerald-400" },
  { value: "7+", label: "Procedures Available", accent: "text-pink-400" },
];

export function StatsSection() {
  return (
    <section className="relative bg-zinc-950">
      {/* Gradient divider top */}
      <div className="section-divider" />

      <div className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="animate-on-scroll text-center">
              <div className={`text-3xl font-bold tabular-nums md:text-4xl ${stat.accent}`}>
                {stat.value}
              </div>
              <div className="mt-1 text-sm text-zinc-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Gradient divider bottom */}
      <div className="section-divider" />
    </section>
  );
}
