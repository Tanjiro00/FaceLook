import Link from "next/link";
import { Sparkles } from "lucide-react";

const links = {
  product: [
    { label: "How It Works", href: "#how-it-works" },
    { label: "Demo", href: "#demo" },
    { label: "Procedures", href: "#procedures" },
    { label: "Pricing", href: "#pricing" },
  ],
  company: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Contact", href: "mailto:hello@facelook.ai" },
  ],
  social: [
    { label: "Twitter / X", href: "https://x.com/facelook_ai" },
    { label: "Instagram", href: "https://instagram.com/facelook.ai" },
    { label: "TikTok", href: "https://tiktok.com/@facelook.ai" },
  ],
};

export function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-zinc-950">
      <div className="bg-noise pointer-events-none absolute inset-0" />

      <div className="relative mx-auto max-w-6xl px-4 py-14">
        <div className="grid gap-10 md:grid-cols-5">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2 text-lg font-bold text-white">
              <Sparkles className="h-5 w-5 text-violet-400" />
              FaceLook
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-zinc-600">
              AI-powered cosmetic procedure visualization.
              See yourself. Decide with confidence.
            </p>
            {/* Social links */}
            <div className="mt-5 flex items-center gap-4">
              {links.social.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-zinc-600 transition-colors hover:text-white"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-zinc-500">
              Product
            </h4>
            <ul className="mt-4 space-y-2.5">
              {links.product.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-zinc-600 transition-colors hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-zinc-500">
              Company
            </h4>
            <ul className="mt-4 space-y-2.5">
              {links.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-zinc-600 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Medical Disclaimer */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-zinc-500">
              Disclaimer
            </h4>
            <p className="mt-4 text-xs leading-relaxed text-zinc-700">
              FaceLook provides AI-generated visualizations for informational
              purposes only. Results are not medical advice or guaranteed
              surgical outcomes. Always consult a board-certified professional.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="section-divider mt-10" />
        <div className="flex flex-col items-center justify-between gap-4 pt-6 sm:flex-row">
          <p className="text-xs text-zinc-700">
            &copy; {new Date().getFullYear()} FaceLook. All rights reserved.
          </p>
          <div className="flex items-center gap-1.5 text-xs text-zinc-700">
            <span>Built with</span>
            <span className="animate-gradient bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text font-medium text-transparent">
              AI
            </span>
            <span>for a better you</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
