import { WaitlistForm } from "@/components/landing/waitlist-form";

export function CTASection() {
  return (
    <section className="border-t border-white/5 bg-zinc-950 py-24">
      <div className="mx-auto max-w-2xl px-4 text-center">
        <h2 className="animate-on-scroll text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Get early access
        </h2>
        <p className="animate-on-scroll mt-3 text-zinc-500">
          Join the waitlist. Be the first to try FaceLook when we launch.
        </p>
        <div className="animate-on-scroll mt-8">
          <WaitlistForm source="cta" />
        </div>
      </div>
    </section>
  );
}
