import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Lazy initialization — only create when env vars are available
let ratelimit: Ratelimit | null = null;

function getRatelimit(): Ratelimit | null {
  if (ratelimit) return ratelimit;
  if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
    return null;
  }

  const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  });

  ratelimit = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(10, "60 s"),
    analytics: true,
    prefix: "facelook:ratelimit",
  });

  return ratelimit;
}

export async function checkRateLimit(
  identifier: string
): Promise<{ success: boolean; remaining: number }> {
  const rl = getRatelimit();
  if (!rl) {
    if (process.env.NODE_ENV === "production") {
      console.warn(
        "[rate-limit] Upstash not configured — rate limiting disabled in production"
      );
    }
    return { success: true, remaining: 999 };
  }

  const result = await rl.limit(identifier);
  return { success: result.success, remaining: result.remaining };
}
