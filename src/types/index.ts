// ============================================================
// FaceLook — Core Type Definitions
// ============================================================

export type ProcedureCategory = "face" | "body" | "skin";

export interface Procedure {
  id: string;
  name: string;
  nameRu: string;
  category: ProcedureCategory;
  description: string;
  prompt: string;
  icon: string;
  available: boolean;
  tier: "free" | "basic" | "premium";
}

export interface Generation {
  id: string;
  userId: string;
  procedureId: string;
  originalImageUrl: string;
  resultImageUrl: string | null;
  status: "pending" | "processing" | "completed" | "failed";
  error: string | null;
  createdAt: string;
  processingTimeMs: number | null;
}

export type SubscriptionTier = "free" | "basic" | "premium" | "pay_per_use";

export interface UserProfile {
  id: string;
  email: string;
  subscriptionTier: SubscriptionTier;
  generationsUsed: number;
  generationsLimit: number;
  stripeCustomerId: string | null;
  stripeSubscriptionId: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface PricingPlan {
  id: SubscriptionTier;
  name: string;
  price: number;
  priceLabel: string;
  generationsLimit: number;
  features: string[];
  popular?: boolean;
  stripePriceId: string;
}

export interface GenerateRequest {
  procedureId: string;
  imageBase64: string;
  options?: {
    intensity?: number; // 0-100
    hdUpscale?: boolean;
  };
}

export interface GenerateResponse {
  generationId: string;
  status: "processing" | "completed" | "failed";
  resultImageUrl?: string;
  processingTimeMs?: number;
  error?: string;
}

export interface FaceLandmarks {
  nose: { x: number; y: number }[];
  lips: { x: number; y: number }[];
  jawline: { x: number; y: number }[];
  cheeks: { x: number; y: number }[];
  forehead: { x: number; y: number }[];
}
