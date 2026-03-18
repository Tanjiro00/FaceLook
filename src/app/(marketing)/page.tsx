import type { Metadata } from "next";
import { Hero } from "@/components/landing/hero";
import { DemoSection } from "@/components/landing/demo-section";
import { HowItWorks } from "@/components/landing/how-it-works";
import { TestimonialsSection } from "@/components/landing/testimonials-section";
import { PricingSection } from "@/components/landing/pricing-section";
import { FAQSection } from "@/components/landing/faq-section";
import { CTASection } from "@/components/landing/cta-section";

export const metadata: Metadata = {
  title: "AI Virtual Try-On for Cosmetic Procedures",
  description:
    "Upload a selfie, choose a procedure, see your photorealistic result in 10 seconds. Rhinoplasty, lip fillers, botox and more.",
  openGraph: {
    title: "FaceLook — See Yourself Before Surgery",
    description:
      "AI-powered virtual try-on for cosmetic procedures. Photorealistic results in seconds.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "FaceLook",
      url: "https://facelook.ai",
      description:
        "AI-powered virtual try-on for cosmetic procedures. Upload a selfie, choose a procedure, see your photorealistic result in 10 seconds.",
      applicationCategory: "HealthApplication",
      operatingSystem: "Web",
      offers: [
        {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
          name: "Free",
          description: "3 AI generations with watermark",
        },
        {
          "@type": "Offer",
          price: "9.99",
          priceCurrency: "USD",
          name: "Basic",
          description: "30 generations/month, all procedures",
        },
        {
          "@type": "Offer",
          price: "24.99",
          priceCurrency: "USD",
          name: "Premium",
          description: "100 generations/month, HD upscale, body procedures",
        },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "How does FaceLook work?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Upload a selfie, choose a procedure, and our AI generates a photorealistic visualization using generative AI (FLUX Kontext Pro), not morphing.",
          },
        },
        {
          "@type": "Question",
          name: "Are my photos stored?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. Photos are processed in real-time and immediately discarded. We never store or share your images.",
          },
        },
        {
          "@type": "Question",
          name: "How accurate are the results?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Our AI achieves 98% identity preservation. Results are for visualization only — always consult a medical professional.",
          },
        },
        {
          "@type": "Question",
          name: "Do I need to download an app?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. FaceLook works in any modern browser on any device.",
          },
        },
        {
          "@type": "Question",
          name: "Can I cancel anytime?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. No contracts, no lock-in. Cancel from your account settings.",
          },
        },
      ],
    },
  ],
};

export default function LandingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <DemoSection />
      <HowItWorks />
      <TestimonialsSection />
      <PricingSection />
      <FAQSection />
      <CTASection />
    </>
  );
}
