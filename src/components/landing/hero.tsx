"use client";

import { WaitlistForm } from "@/components/landing/waitlist-form";

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-zinc-950 px-4 pt-16">
      {/* Animated gradient blobs */}
      <div className="animate-drift absolute -top-32 left-1/4 h-[500px] w-[500px] rounded-full bg-violet-600/8 blur-[200px]" />
      <div className="animate-drift-reverse absolute bottom-0 right-1/4 h-[400px] w-[400px] rounded-full bg-cyan-600/6 blur-[200px]" />

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
