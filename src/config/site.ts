export const siteConfig = {
  name: "FaceLook",
  description:
    "AI-Powered Virtual Try-On for Cosmetic Procedures. See your results before the surgery.",
  tagline: "See yourself. Decide with confidence.",
  url: process.env.NEXT_PUBLIC_APP_URL ?? "https://facelook.ai",
  ogImage: "/og.png",
  links: {
    twitter: "https://twitter.com/facelook_ai",
    instagram: "https://instagram.com/facelook.ai",
    tiktok: "https://tiktok.com/@facelook.ai",
  },
} as const;
