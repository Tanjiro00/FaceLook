"use client";

import { Shield, Zap, Clock, Play } from "lucide-react";
import { WaitlistForm } from "@/components/landing/waitlist-form";

export function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-zinc-950">
      {/* Noise texture */}
      <div className="bg-noise pointer-events-none absolute inset-0 z-[1]" />

      {/* Animated gradient orbs */}
      <div className="absolute inset-0">
        <div className="animate-float absolute -top-20 left-1/4 h-[600px] w-[600px] rounded-full bg-violet-600/20 blur-[150px]" />
        <div className="animate-float-delayed absolute bottom-1/4 right-1/4 h-[500px] w-[500px] rounded-full bg-cyan-600/15 blur-[150px]" />
        <div className="animate-float-slow absolute top-1/2 left-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-pink-500/10 blur-[120px]" />
      </div>

      {/* Grid pattern */}
      <div className="bg-grid absolute inset-0" />
      <div className="bg-radial-fade absolute inset-0" />

      {/* Content */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 pt-20 text-center">
        {/* Badge */}
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-zinc-400 backdrop-blur-sm">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          AI-Powered · Launching Soon
        </div>

        {/* Heading */}
        <h1 className="mx-auto max-w-5xl text-5xl font-bold tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl">
          See Your Results
          <br />
          <span className="animate-gradient bg-gradient-to-r from-violet-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
            Before Surgery
          </span>
        </h1>

        {/* Subheading */}
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400 md:text-xl">
          Upload a selfie. Choose a cosmetic procedure.
          <br className="hidden sm:block" />
          Get a photorealistic AI visualization in{" "}
          <span className="font-medium text-white">10 seconds</span>.
        </p>

        {/* Waitlist form */}
        <div className="mt-10 w-full">
          <WaitlistForm source="hero" variant="hero" />
        </div>

        {/* Demo link */}
        <a
          href="#demo"
          className="group mt-6 inline-flex items-center gap-2 text-sm text-zinc-500 transition-colors hover:text-white"
        >
          <Play className="h-3.5 w-3.5 fill-current" />
          See how it works
        </a>

        {/* Social proof avatars */}
        <div className="mt-10 flex flex-col items-center gap-3">
          <div className="flex items-center -space-x-2">
            {["violet", "pink", "cyan", "amber", "emerald"].map((color, i) => (
              <div
                key={i}
                className={`flex h-8 w-8 items-center justify-center rounded-full border-2 border-zinc-950 text-xs font-bold text-white ${
                  color === "violet" ? "bg-violet-500" :
                  color === "pink" ? "bg-pink-500" :
                  color === "cyan" ? "bg-cyan-500" :
                  color === "amber" ? "bg-amber-500" :
                  "bg-emerald-500"
                }`}
              >
                {["S", "M", "J", "A", "D"][i]}
              </div>
            ))}
            <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-zinc-950 bg-zinc-800 text-[10px] font-bold text-zinc-300">
              +10k
            </div>
          </div>
          <p className="text-sm text-zinc-500">
            Join <span className="font-medium text-zinc-300">10,000+</span> people on the waitlist
          </p>
        </div>

        {/* Trust indicators */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-zinc-600">
          <span className="flex items-center gap-1.5">
            <Shield className="h-3.5 w-3.5 text-emerald-500/60" />
            Photos never stored
          </span>
          <span className="h-3 w-px bg-white/10" />
          <span className="flex items-center gap-1.5">
            <Zap className="h-3.5 w-3.5 text-amber-500/60" />
            Free early access
          </span>
          <span className="h-3 w-px bg-white/10" />
          <span className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 text-cyan-500/60" />
            Results in 10 seconds
          </span>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <div className="flex h-8 w-5 items-start justify-center rounded-full border border-white/20 p-1">
            <div className="h-1.5 w-1 animate-bounce rounded-full bg-white/40" />
          </div>
        </div>
      </div>
    </section>
  );
}
