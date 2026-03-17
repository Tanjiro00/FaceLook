import type { Metadata } from "next";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-3xl font-bold">Privacy Policy</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Last updated: March 2026
      </p>

      <div className="prose prose-neutral dark:prose-invert mt-8 max-w-none space-y-6 text-muted-foreground">
        <section>
          <h2 className="text-xl font-semibold text-foreground">
            1. What We Collect
          </h2>
          <p>
            We collect your email address and authentication data when you
            create an account. Photos you upload are processed in real-time by
            our AI pipeline and are <strong>never stored</strong> on our servers
            after processing is complete.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">
            2. How We Use Your Data
          </h2>
          <ul className="list-disc space-y-1 pl-6">
            <li>To provide AI-powered visualization services</li>
            <li>To manage your account and subscription</li>
            <li>To improve our AI models and prompt accuracy</li>
            <li>To send transactional emails (receipts, account updates)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">
            3. Photo Processing
          </h2>
          <p>
            Uploaded photos are sent to third-party AI APIs (fal.ai) for
            processing. Photos are transmitted securely via HTTPS and are not
            retained by our AI providers after processing. We do not use your
            photos to train AI models.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">
            4. Data Storage
          </h2>
          <p>
            Account data is stored in Supabase (hosted on AWS). Payment data is
            processed by Stripe and never touches our servers. We do not store
            credit card numbers.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">
            5. Your Rights (GDPR)
          </h2>
          <p>
            You have the right to access, correct, or delete your personal data
            at any time. To request data deletion, email{" "}
            <a
              href="mailto:privacy@facelook.ai"
              className="text-primary underline"
            >
              privacy@facelook.ai
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">
            6. Cookies
          </h2>
          <p>
            We use essential cookies for authentication only. We do not use
            tracking cookies or third-party analytics.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">7. Contact</h2>
          <p>
            Questions about this policy? Email us at{" "}
            <a
              href="mailto:privacy@facelook.ai"
              className="text-primary underline"
            >
              privacy@facelook.ai
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
