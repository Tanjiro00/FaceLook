import { Procedure, PricingPlan } from "@/types";

export const PROCEDURES: Procedure[] = [
  // ─── Face ───────────────────────────────────────────
  {
    id: "rhinoplasty",
    name: "Rhinoplasty",
    nameRu: "Ринопластика",
    category: "face",
    description: "Reshape your nose — narrower bridge, refined tip, straighter profile",
    prompt:
      "Make the nose narrower, straighter, and more refined. Keep the bridge smooth and the tip slightly upturned. Maintain natural skin texture, lighting, and all other facial features exactly as they are.",
    icon: "👃",
    available: true,
    tier: "free",
  },
  {
    id: "lip-filler",
    name: "Lip Filler",
    nameRu: "Филлеры губ",
    category: "face",
    description: "Fuller, more defined lips with natural volume",
    prompt:
      "Make the lips fuller and more voluminous with a natural shape. Enhance the cupid's bow slightly. Keep the skin texture, color balance, and all other facial features exactly the same.",
    icon: "💋",
    available: true,
    tier: "free",
  },
  {
    id: "botox-forehead",
    name: "Botox (Forehead)",
    nameRu: "Ботокс (лоб)",
    category: "face",
    description: "Smooth forehead lines for a refreshed, youthful look",
    prompt:
      "Smooth out all forehead wrinkles and frown lines completely. Make the forehead skin look smooth and youthful. Keep every other facial feature, skin texture, and lighting exactly the same.",
    icon: "✨",
    available: true,
    tier: "basic",
  },
  {
    id: "cheek-filler",
    name: "Cheek Filler",
    nameRu: "Филлеры скул",
    category: "face",
    description: "Enhanced cheekbone definition and lift",
    prompt:
      "Add volume to the cheekbones to create higher, more defined cheeks with a subtle lift effect. Maintain natural skin texture, lighting, and all other facial features exactly as they are.",
    icon: "🌟",
    available: true,
    tier: "basic",
  },
  {
    id: "chin-augmentation",
    name: "Chin Augmentation",
    nameRu: "Подбородок",
    category: "face",
    description: "More defined chin and jawline profile",
    prompt:
      "Make the chin slightly more projected and defined. Create a balanced, harmonious facial profile. Keep skin texture, lighting, and all other features exactly the same.",
    icon: "💎",
    available: true,
    tier: "basic",
  },
  // ─── Body (v1 launch) ──────────────────────────────
  {
    id: "bbl",
    name: "BBL (Brazilian Butt Lift)",
    nameRu: "BBL",
    category: "body",
    description: "Enhanced buttock shape and volume",
    prompt:
      "Enhance the buttocks to be rounder and more voluminous while maintaining natural proportions. Keep clothing, skin tone, and all other body features exactly the same.",
    icon: "🍑",
    available: false,
    tier: "premium",
  },
  {
    id: "breast-augmentation",
    name: "Breast Augmentation",
    nameRu: "Маммопластика",
    category: "body",
    description: "Natural-looking breast enhancement",
    prompt:
      "Increase breast size by approximately one cup size with a natural shape. Maintain clothing fit, skin tone, and all other body features exactly the same.",
    icon: "🦋",
    available: false,
    tier: "premium",
  },
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: "free",
    name: "Free",
    price: 0,
    priceLabel: "$0",
    generationsLimit: 3,
    features: [
      "3 generations with watermark",
      "Rhinoplasty & lip fillers",
      "Standard quality",
    ],
    stripePriceId: "",
  },
  {
    id: "basic",
    name: "Basic",
    price: 9.99,
    priceLabel: "$9.99/mo",
    generationsLimit: 30,
    features: [
      "30 generations/month",
      "All procedures",
      "No watermark",
      "Before/after slider",
    ],
    popular: true,
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_BASIC_PRICE_ID ?? "",
  },
  {
    id: "premium",
    name: "Premium",
    price: 24.99,
    priceLabel: "$24.99/mo",
    generationsLimit: 100,
    features: [
      "100 generations/month",
      "All procedures incl. body",
      "HD upscale",
      "Clinic matching",
      "Priority processing",
    ],
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_PREMIUM_PRICE_ID ?? "",
  },
  {
    id: "pay_per_use",
    name: "Pay Per Use",
    price: 1.99,
    priceLabel: "$1.99",
    generationsLimit: 5,
    features: [
      "5 generations pack",
      "All face procedures",
      "No subscription needed",
    ],
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_PPU_PRICE_ID ?? "",
  },
];

export function getProcedureById(id: string): Procedure | undefined {
  return PROCEDURES.find((p) => p.id === id);
}

export function getAvailableProcedures(tier: string): Procedure[] {
  const tierOrder = { free: 0, basic: 1, premium: 2 };
  const userLevel = tierOrder[tier as keyof typeof tierOrder] ?? 0;
  return PROCEDURES.filter(
    (p) => p.available && tierOrder[p.tier] <= userLevel
  );
}
