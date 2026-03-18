"use client";

import { posthog } from "./posthog-client";

// ─── Funnel: Acquisition ─────────────────────────────────
export function trackWaitlistSignup(source: string) {
  posthog.capture("waitlist_signup", { source });
}

// ─── Funnel: Authentication ──────────────────────────────
export function trackSignupStarted(method: "email" | "google") {
  posthog.capture("signup_started", { method });
}

export function trackSignupCompleted() {
  posthog.capture("signup_completed");
}

export function trackLogin(method: "email" | "google") {
  posthog.capture("login", { method });
}

// ─── Funnel: Generation ──────────────────────────────────
export function trackProcedureSelected(procedureId: string) {
  posthog.capture("procedure_selected", { procedure_id: procedureId });
}

export function trackGenerationStarted(procedureId: string, intensity: number) {
  posthog.capture("generation_started", {
    procedure_id: procedureId,
    intensity,
  });
}

export function trackGenerationCompleted(
  procedureId: string,
  processingTimeMs: number
) {
  posthog.capture("generation_completed", {
    procedure_id: procedureId,
    processing_time_ms: processingTimeMs,
  });
}

export function trackGenerationFailed(procedureId: string, error: string) {
  posthog.capture("generation_failed", {
    procedure_id: procedureId,
    error,
  });
}

export function trackGenerationCancelled(procedureId: string) {
  posthog.capture("generation_cancelled", { procedure_id: procedureId });
}

// ─── Funnel: Monetization ────────────────────────────────
export function trackUpgradeClicked(source: string, currentTier: string) {
  posthog.capture("upgrade_clicked", { source, current_tier: currentTier });
}

export function trackCheckoutStarted(priceId: string) {
  posthog.capture("checkout_started", { price_id: priceId });
}

// ─── Engagement ──────────────────────────────────────────
export function trackDownloadResult(generationId: string) {
  posthog.capture("download_result", { generation_id: generationId });
}

export function trackImageUploaded() {
  posthog.capture("image_uploaded");
}

// ─── User Identification ─────────────────────────────────
export function identifyUser(
  userId: string,
  properties?: Record<string, unknown>
) {
  posthog.identify(userId, properties);
}

export function resetUser() {
  posthog.reset();
}
