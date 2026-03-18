import { PostHog } from "posthog-node";

let _posthog: PostHog | null = null;

export function getPostHogServer(): PostHog | null {
  if (_posthog) return _posthog;

  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  if (!key) return null;

  _posthog = new PostHog(key, {
    host: process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com",
    flushAt: 1,
    flushInterval: 0,
  });

  return _posthog;
}
