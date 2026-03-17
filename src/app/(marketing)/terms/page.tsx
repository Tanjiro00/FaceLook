import type { Metadata } from "next";

export const metadata: Metadata = { title: "Terms of Service" };

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-3xl font-bold">Terms of Service</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Last updated: March 2026
      </p>

      <div className="prose prose-neutral dark:prose-invert mt-8 max-w-none space-y-6 text-muted-foreground">
        <section>
          <h2 className="text-xl font-semibold text-foreground">
            1. Service Description
          </h2>
          <p>
            FaceLook provides AI-generated visualizations of cosmetic procedures
            for informational and entertainment purposes. Our service uses
            generative AI to create photorealistic simulations based on your
            uploaded photos.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">
            2. Medical Disclaimer
          </h2>
          <p>
            <strong>
              FaceLook is NOT a medical device and does NOT provide medical
              advice.
            </strong>{" "}
            AI-generated results are approximations and do not guarantee actual
            surgical outcomes. Results may differ significantly from real
            procedures. Always consult a board-certified medical professional
            before making decisions about cosmetic procedures.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">
            3. Acceptable Use
          </h2>
          <p>You agree not to:</p>
          <ul className="list-disc space-y-1 pl-6">
            <li>Upload photos of other people without their consent</li>
            <li>Use generated images to deceive or mislead others</li>
            <li>Use the service for any illegal purpose</li>
            <li>Attempt to reverse-engineer our AI pipeline</li>
            <li>Exceed rate limits or abuse the service</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">
            4. Subscriptions & Payments
          </h2>
          <p>
            Paid subscriptions are billed monthly via Stripe. You can cancel at
            any time from your dashboard. Refunds are handled on a case-by-case
            basis. Unused generations do not roll over to the next billing
            period.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">
            5. Intellectual Property
          </h2>
          <p>
            You retain ownership of your uploaded photos. AI-generated results
            are licensed to you for personal use. You may share results on
            social media with attribution.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">
            6. Limitation of Liability
          </h2>
          <p>
            FaceLook is provided &quot;as is&quot; without warranty. We are not
            liable for any decisions made based on AI-generated visualizations,
            including but not limited to decisions about cosmetic procedures.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">
            7. Changes to Terms
          </h2>
          <p>
            We may update these terms from time to time. Continued use of the
            service after changes constitutes acceptance of the new terms.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">8. Contact</h2>
          <p>
            Questions? Email us at{" "}
            <a
              href="mailto:legal@facelook.ai"
              className="text-primary underline"
            >
              legal@facelook.ai
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
