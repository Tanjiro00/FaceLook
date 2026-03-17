import { WaitlistForm } from "@/components/landing/waitlist-form";

export function CTASection() {
  return (
    <section className="relative overflow-hidden bg-zinc-950 py-32">
      <div className="bg-noise pointer-events-none absolute inset-0 z-[1]" />

      {/* Multi-layer glow background */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="absolute h-[300px] w-[600px] rounded-full bg-violet-600/20 blur-[120px]" />
        <div className="absolute h-[200px] w-[400px] translate-x-32 rounded-full bg-pink-600/15 blur-[100px]" />
        <div className="absolute h-[200px] w-[400px] -translate-x-32 rounded-full bg-cyan-600/10 blur-[100px]" />
      </div>

      {/* Grid pattern */}
      <div className="bg-grid absolute inset-0 opacity-30" />
      <div className="bg-radial-fade absolute inset-0" />

      {/* Gradient divider top */}
      <div className="section-divider absolute top-0 left-0 right-0" />

      <div className="relative z-10 mx-auto max-w-3xl px-4 text-center">
        <div className="animate-on-scroll">
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
            Ready to See Your{" "}
            <span className="animate-gradient bg-gradient-to-r from-violet-400 via-pink-400 to-cyan-400 bg-[length:200%_auto] bg-clip-text text-transparent">
              Future Self?
            </span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-zinc-400">
            Be the first to try FaceLook. Join the waitlist and get free early access
            when we launch.
          </p>

          {/* Waitlist form */}
          <div className="mt-10">
            <WaitlistForm source="cta" variant="inline" />
          </div>
        </div>
      </div>
    </section>
  );
}
