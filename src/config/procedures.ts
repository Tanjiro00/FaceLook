import { Procedure, PricingPlan } from "@/types";

export interface IntensityConfig {
  min: number;
  max: number;
  step: number;
  default: number;
  unit: string;
  labels: { value: number; label: string }[];
  buildPrompt: (value: number) => string;
}

export const INTENSITY_CONFIGS: Record<string, IntensityConfig> = {
  "rhinoplasty": {
    min: 1,
    max: 5,
    step: 1,
    default: 3,
    unit: "level",
    labels: [
      { value: 1, label: "Minimal" },
      { value: 2, label: "Subtle" },
      { value: 3, label: "Moderate" },
      { value: 4, label: "Noticeable" },
      { value: 5, label: "Dramatic" },
    ],
    buildPrompt: (v) => {
      const descriptions: Record<number, string> = {
        1: "Very subtly refine the nose — slightly smoother bridge, barely noticeable change. Keep the overall nose shape almost identical.",
        2: "Slightly narrow the nose bridge and refine the tip. The change should look like a minor natural variation.",
        3: "Reshape the nose to be noticeably narrower with a refined tip and straighter bridge. Natural-looking result.",
        4: "Significantly narrow and refine the nose — slim bridge, defined tip, straight profile. Clear visible change.",
        5: "Dramatically reshape the nose — very narrow bridge, sculpted tip, perfectly straight profile. Major transformation.",
      };
      return descriptions[v] || descriptions[3];
    },
  },
  "lip-filler": {
    min: 0.5,
    max: 3,
    step: 0.5,
    default: 1,
    unit: "ml",
    labels: [
      { value: 0.5, label: "0.5 ml — Subtle" },
      { value: 1, label: "1 ml — Natural" },
      { value: 1.5, label: "1.5 ml — Full" },
      { value: 2, label: "2 ml — Plump" },
      { value: 2.5, label: "2.5 ml — Bold" },
      { value: 3, label: "3 ml — Maximum" },
    ],
    buildPrompt: (v) => {
      if (v <= 0.5) return "Add a very subtle amount of lip volume — barely noticeable enhancement. Slightly more defined lip border. Keep the natural lip shape.";
      if (v <= 1) return "Add natural-looking lip volume equivalent to 1ml filler. Fuller lips with enhanced cupid's bow and slightly more defined vermillion border. Balanced upper and lower lip.";
      if (v <= 1.5) return "Make the lips noticeably fuller and more voluminous — equivalent to 1.5ml filler. Well-defined cupid's bow, plump lower lip, smooth and natural-looking.";
      if (v <= 2) return "Make the lips significantly fuller and plumper — equivalent to 2ml filler. Very defined shape, voluminous both upper and lower lip. Still natural-looking skin texture.";
      if (v <= 2.5) return "Make the lips very full and voluminous — equivalent to 2.5ml filler. Bold, plump lips with strong definition. Prominent cupid's bow.";
      return "Make the lips extremely full and voluminous — maximum filler look equivalent to 3ml. Very plump, dramatic lip volume with bold shape.";
    },
  },
  "botox-forehead": {
    min: 10,
    max: 40,
    step: 5,
    default: 20,
    unit: "units",
    labels: [
      { value: 10, label: "10 units — Light" },
      { value: 20, label: "20 units — Standard" },
      { value: 30, label: "30 units — Full" },
      { value: 40, label: "40 units — Maximum" },
    ],
    buildPrompt: (v) => {
      if (v <= 10) return "Slightly smooth the most visible forehead wrinkles. Keep some natural expression lines — the person should not look frozen. Subtle refreshed appearance.";
      if (v <= 20) return "Smooth out forehead wrinkles and frown lines. The forehead should look relaxed and refreshed but still natural — not completely frozen.";
      if (v <= 30) return "Remove most forehead wrinkles and frown lines. Smooth, youthful-looking forehead with minimal remaining lines. Natural skin texture preserved.";
      return "Completely smooth all forehead wrinkles, frown lines, and expression lines. Perfectly smooth forehead. Keep natural skin texture and pores visible.";
    },
  },
  "cheek-filler": {
    min: 1,
    max: 4,
    step: 0.5,
    default: 2,
    unit: "ml",
    labels: [
      { value: 1, label: "1 ml — Subtle lift" },
      { value: 2, label: "2 ml — Defined" },
      { value: 3, label: "3 ml — Sculpted" },
      { value: 4, label: "4 ml — Maximum" },
    ],
    buildPrompt: (v) => {
      if (v <= 1) return "Add subtle volume to the cheekbones for a slightly more defined, lifted look. Very natural enhancement — barely noticeable change.";
      if (v <= 2) return "Add noticeable volume to the cheekbones. Higher, more defined cheeks with a youthful mid-face lift. Natural-looking result.";
      if (v <= 3) return "Significantly enhance cheekbone volume and definition. Sculpted, high cheekbones with visible lift effect. Model-like bone structure.";
      return "Dramatically enhance cheekbone volume. Very high, sculpted cheekbones with maximum definition and lift. Bold transformation.";
    },
  },
  "chin-augmentation": {
    min: 1,
    max: 5,
    step: 1,
    default: 2,
    unit: "level",
    labels: [
      { value: 1, label: "Minimal" },
      { value: 2, label: "Subtle" },
      { value: 3, label: "Moderate" },
      { value: 4, label: "Strong" },
      { value: 5, label: "Dramatic" },
    ],
    buildPrompt: (v) => {
      if (v <= 1) return "Very slightly project the chin forward for a more balanced facial profile. Minimal change — barely noticeable enhancement.";
      if (v <= 2) return "Subtly enhance chin projection and definition. More balanced jawline profile with slightly more defined chin point.";
      if (v <= 3) return "Noticeably enhance chin projection and jawline definition. Clear improvement in facial balance and profile.";
      if (v <= 4) return "Significantly project and define the chin. Strong, defined jawline with prominent chin. Clear masculine/feminine enhancement.";
      return "Dramatically reshape the chin — strong projection, defined jawline, bold facial profile transformation.";
    },
  },
  "bbl": {
    min: 1, max: 5, step: 1, default: 3, unit: "level",
    labels: [{ value: 1, label: "Subtle" }, { value: 3, label: "Moderate" }, { value: 5, label: "Dramatic" }],
    buildPrompt: (v) => {
      if (v <= 2) return "Subtly enhance buttock shape and roundness. Natural-looking improvement in contour.";
      if (v <= 3) return "Noticeably enhance buttock volume and shape. Rounder, more lifted appearance while maintaining natural proportions.";
      return "Dramatically increase buttock volume and roundness. Bold, voluminous shape with lifted contour.";
    },
  },
  "breast-augmentation": {
    min: 1, max: 4, step: 1, default: 1, unit: "cup size",
    labels: [{ value: 1, label: "+1 cup" }, { value: 2, label: "+2 cups" }, { value: 3, label: "+3 cups" }, { value: 4, label: "+4 cups" }],
    buildPrompt: (v) => `Increase breast size by approximately ${v} cup size${v > 1 ? "s" : ""}. Natural, proportional shape. Maintain clothing fit and all other body features exactly.`,
  },
};

export const PROCEDURES: Procedure[] = [
  {
    id: "rhinoplasty",
    name: "Rhinoplasty",
    nameRu: "Ринопластика",
    category: "face",
    description: "Reshape your nose — narrower bridge, refined tip, straighter profile",
    prompt: "", // Now built dynamically via INTENSITY_CONFIGS
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
    prompt: "",
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
    prompt: "",
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
    prompt: "",
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
    prompt: "",
    icon: "💎",
    available: true,
    tier: "basic",
  },
  {
    id: "bbl",
    name: "BBL (Brazilian Butt Lift)",
    nameRu: "BBL",
    category: "body",
    description: "Enhanced buttock shape and volume",
    prompt: "",
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
    prompt: "",
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
