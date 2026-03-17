"use client";

import { WaitlistForm } from "@/components/landing/waitlist-form";

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-zinc-950 px-4 pt-16">
      {/* Single subtle glow */}
      <div className="absolute top-1/3 left-1/2 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/10 blur-[200px]" />

      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <h1 className="text-5xl font-bold leading-[1.08] tracking-tight text-white sm:text-6xl md:text-7xl">
          See your results
          <br />
          <span className="animate-gradient bg-gradient-to-r from-violet-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
            before surgery
          </span>
        </h1>

        <p className="mx-auto mt-5 max-w-lg text-lg text-zinc-400">
          Upload a selfie, choose a procedure, get a photorealistic
          AI visualization in 10 seconds.
        </p>

        <div className="mt-8">
          <WaitlistForm source="hero" />
        </div>

        <p className="mt-4 text-xs text-zinc-600">
          Free early access · No spam
        </p>
      </div>
    </section>
  );
}
