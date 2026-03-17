import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function CTASection() {
  return (
    <section className="bg-muted/30 py-20">
      <div className="mx-auto max-w-3xl px-4 text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Ready to See Your Future Self?
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Join thousands of people making informed decisions about cosmetic
          procedures. Your first 3 generations are completely free.
        </p>
        <Button size="lg" className="mt-8 gap-2 px-8 text-base" render={<Link href="/signup" />}>
          Start Free Now
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </section>
  );
}
