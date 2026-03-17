import { Hero } from "@/components/landing/hero";
import { DemoSection } from "@/components/landing/demo-section";
import { HowItWorks } from "@/components/landing/how-it-works";
import { ProceduresSection } from "@/components/landing/procedures-section";
import { PricingSection } from "@/components/landing/pricing-section";
import { CTASection } from "@/components/landing/cta-section";

export default function LandingPage() {
  return (
    <>
      <Hero />
      <DemoSection />
      <HowItWorks />
      <ProceduresSection />
      <PricingSection />
      <CTASection />
    </>
  );
}
