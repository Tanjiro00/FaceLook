import Link from "next/link";
import { Sparkles } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 font-bold text-lg">
              <Sparkles className="h-5 w-5 text-primary" />
              FaceLook
            </Link>
            <p className="mt-2 text-sm text-muted-foreground">
              See yourself. Decide with confidence.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="mb-3 text-sm font-semibold">Product</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#how-it-works" className="hover:text-foreground">How It Works</a></li>
              <li><a href="#procedures" className="hover:text-foreground">Procedures</a></li>
              <li><a href="#pricing" className="hover:text-foreground">Pricing</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="mb-3 text-sm font-semibold">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/privacy" className="hover:text-foreground">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-foreground">Terms of Service</Link></li>
              <li><a href="mailto:hello@facelook.ai" className="hover:text-foreground">Contact</a></li>
            </ul>
          </div>

          {/* Disclaimer */}
          <div>
            <h4 className="mb-3 text-sm font-semibold">Medical Disclaimer</h4>
            <p className="text-xs text-muted-foreground">
              FaceLook provides AI-generated visualizations for informational purposes only.
              Results are not medical advice or guaranteed surgical outcomes.
              Always consult a board-certified medical professional.
            </p>
          </div>
        </div>

        <div className="mt-8 border-t border-border/40 pt-6 text-center text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} FaceLook. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
