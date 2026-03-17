"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "How does FaceLook work?",
    a: "Upload a selfie, choose a cosmetic procedure, and our generative AI creates a photorealistic visualization of the potential result. Unlike apps that morph or warp your photo, we generate an entirely new image using FLUX Kontext Pro AI.",
  },
  {
    q: "Is the AI result accurate?",
    a: "Our AI achieves 98% identity preservation — meaning your unique facial features remain intact while only the targeted area changes. However, results are for visualization purposes only and should not be considered a guarantee of surgical outcomes.",
  },
  {
    q: "Are my photos stored or shared?",
    a: "No. Your uploaded photos are processed in real-time and immediately discarded after generation. We never store, share, or use your images for training. Your privacy is our top priority.",
  },
  {
    q: "How long does it take to generate a result?",
    a: "Most generations complete in approximately 10 seconds. Premium users get priority processing for even faster results.",
  },
  {
    q: "Can I use FaceLook on my phone?",
    a: "Yes! FaceLook is a web-based platform that works on any device with a camera and modern browser. No app download required — just open your browser and go.",
  },
  {
    q: "Is FaceLook approved by medical professionals?",
    a: "FaceLook is used and recommended by board-certified plastic surgeons and dermatologists worldwide. It's designed to set realistic expectations before consultations, not to replace medical advice.",
  },
  {
    q: "What procedures are available?",
    a: "Currently we offer face procedures including rhinoplasty, lip fillers, botox, cheek fillers, and chin augmentation. Body procedures (BBL, breast augmentation) are coming in our next release.",
  },
  {
    q: "Can I cancel my subscription anytime?",
    a: "Absolutely. No contracts, no lock-in periods. Cancel your subscription at any time from your account settings and you won't be charged again.",
  },
];

export function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="relative bg-zinc-950 py-24">
      <div className="bg-noise pointer-events-none absolute inset-0" />

      <div className="relative mx-auto max-w-3xl px-4">
        <div className="animate-on-scroll text-center">
          <span className="inline-block rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-wider text-zinc-500">
            FAQ
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Questions? Answered.
          </h2>
          <p className="mt-3 text-zinc-500">
            Everything you need to know about FaceLook.
          </p>
        </div>

        <div className="mt-14 space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <div
                key={i}
                className={`animate-on-scroll stagger-${Math.min(i + 1, 6)} rounded-xl border transition-all duration-300 ${
                  isOpen
                    ? "border-white/10 bg-white/[0.03]"
                    : "border-white/5 bg-transparent hover:border-white/10"
                }`}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between px-6 py-5 text-left"
                >
                  <span className="pr-4 text-sm font-medium text-white">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 text-zinc-500 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`grid transition-all duration-300 ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-5 text-sm leading-relaxed text-zinc-400">
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
