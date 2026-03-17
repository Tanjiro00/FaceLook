"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Play, Shield } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background" />
        <div className="absolute top-0 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-6xl px-4 pb-20 pt-24 text-center md:pt-32">
        <Badge variant="secondary" className="mb-6 px-4 py-1.5">
          <Play className="mr-1 h-3 w-3" />
          AI-Powered · No App Download Required
        </Badge>

        <h1 className="mx-auto max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          See Your Results{" "}
          <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Before Surgery
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
          Upload a selfie, choose a cosmetic procedure, and get a photorealistic
          AI visualization in 10 seconds. Not morphing — real generative AI.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button size="lg" className="gap-2 px-8 text-base" render={<Link href="/signup" />}>
            Try Free — 3 Generations
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button size="lg" variant="outline" className="gap-2 px-8 text-base" render={<a href="#how-it-works" />}>
            See How It Works
          </Button>
        </div>

        <div className="mt-6 flex items-center justify-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Shield className="h-3 w-3" />
            Photos never stored
          </span>
          <span>·</span>
          <span>No credit card required</span>
          <span>·</span>
          <span>GDPR compliant</span>
        </div>
      </div>
    </section>
  );
}
