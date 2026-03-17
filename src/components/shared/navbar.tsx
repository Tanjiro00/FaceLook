"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Sparkles } from "lucide-react";

const navLinks = [
  { href: "#demo", label: "Demo" },
  { href: "#how-it-works", label: "How It Works" },
  { href: "#procedures", label: "Procedures" },
  { href: "#pricing", label: "Pricing" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4">
      <nav
        className={`flex w-full max-w-5xl items-center justify-between rounded-2xl border px-4 py-2.5 transition-all duration-300 ${
          scrolled
            ? "border-white/10 bg-black/60 shadow-lg shadow-black/20 backdrop-blur-xl"
            : "border-transparent bg-transparent"
        }`}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-lg text-white">
          <Sparkles className="h-5 w-5 text-violet-400" />
          FaceLook
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-1.5 text-sm text-zinc-400 transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden items-center gap-2 md:flex">
          <Button variant="ghost" className="text-zinc-400 hover:text-white" render={<Link href="/login" />}>
            Log In
          </Button>
          <Link
            href="/signup"
            className="relative inline-flex items-center rounded-full bg-white px-5 py-2 text-sm font-semibold text-black transition-all hover:scale-105"
          >
            <span className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-violet-600 to-cyan-600 opacity-0 blur-md transition-opacity hover:opacity-50" />
            <span className="relative">Try Free</span>
          </Link>
        </div>

        {/* Mobile */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger render={<Button variant="ghost" size="icon" className="text-white md:hidden" />}>
            <Menu className="h-5 w-5" />
          </SheetTrigger>
          <SheetContent side="right" className="w-72 border-white/5 bg-zinc-950">
            <div className="mt-8 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-lg font-medium text-zinc-300"
                >
                  {link.label}
                </a>
              ))}
              <div className="mt-4 flex flex-col gap-2">
                <Button variant="outline" render={<Link href="/login" />}>
                  Log In
                </Button>
                <Button render={<Link href="/signup" />}>
                  Try Free
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}
