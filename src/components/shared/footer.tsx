import Link from "next/link";
import { Sparkles } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-zinc-950">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row">
          <div>
            <Link href="/" className="inline-flex items-center gap-2 text-lg font-bold text-white">
              <Sparkles className="h-4 w-4 text-violet-400" />
              FaceLook
            </Link>
            <p className="mt-2 max-w-xs text-sm text-zinc-600">
              AI-powered cosmetic procedure visualization.
            </p>
          </div>

          <div className="flex gap-16 text-sm">
            <div className="space-y-2.5">
              <a href="#demo" className="block text-zinc-500 hover:text-white">Demo</a>
              <a href="#how-it-works" className="block text-zinc-500 hover:text-white">How It Works</a>
              <a href="#pricing" className="block text-zinc-500 hover:text-white">Pricing</a>
            </div>
            <div className="space-y-2.5">
              <Link href="/privacy" className="block text-zinc-500 hover:text-white">Privacy</Link>
              <Link href="/terms" className="block text-zinc-500 hover:text-white">Terms</Link>
              <a href="mailto:hello@facelook.ai" className="block text-zinc-500 hover:text-white">Contact</a>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-2 border-t border-white/5 pt-6 text-xs text-zinc-700 sm:flex-row">
          <span>&copy; {new Date().getFullYear()} FaceLook</span>
          <span>AI visualizations are for informational purposes only. Consult a medical professional.</span>
        </div>
      </div>
    </footer>
  );
}
