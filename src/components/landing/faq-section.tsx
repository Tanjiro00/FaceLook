"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "How does it work?",
    a: "Upload a selfie, choose a procedure, and our AI generates a photorealistic visualization. We use generative AI (FLUX Kontext Pro), not morphing.",
  },
  {
    q: "Are my photos stored?",
    a: "No. Photos are processed in real-time and immediately discarded. We never store or share your images.",
  },
  {
    q: "How accurate are the results?",
    a: "Our AI achieves 98% identity preservation. Results are for visualization only — always consult a medical professional.",
  },
  {
    q: "Do I need to download an app?",
    a: "No. FaceLook works in any modern browser on any device.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes. No contracts, no lock-in. Cancel from your account settings.",
  },
];

export function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="border-t border-white/5 bg-zinc-950 py-24">
      <div className="mx-auto max-w-2xl px-4">
        <h2 className="animate-on-scroll text-center text-3xl font-bold tracking-tight text-white sm:text-4xl">
          FAQ
        </h2>

        <div className="mt-12 space-y-2">
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <div
                key={i}
                className="animate-on-scroll rounded-xl border border-white/5 transition-colors hover:border-white/10"
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${i}`}
                  className="flex w-full items-center justify-between px-5 py-4 text-left"
                >
                  <span className="text-sm font-medium text-white">{faq.q}</span>
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 text-zinc-500 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  id={`faq-panel-${i}`}
                  role="region"
                  className={`grid transition-all duration-200 ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-4 text-sm leading-relaxed text-zinc-500">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
