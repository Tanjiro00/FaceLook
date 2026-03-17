"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";

interface WaitlistFormProps {
  source?: string;
  className?: string;
  variant?: "hero" | "inline";
}

export function WaitlistForm({ source = "landing", className = "", variant = "hero" }: WaitlistFormProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source }),
      });

      const data = await res.json();

      if (!res.ok && res.status !== 200) {
        setStatus("error");
        setMessage(data.error || "Something went wrong");
        return;
      }

      setStatus("success");
      setMessage(data.message);
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  };

  if (status === "success") {
    return (
      <div className={`flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-6 py-3 ${className}`}>
        <CheckCircle2 className="h-4 w-4 text-emerald-400" />
        <span className="text-sm font-medium text-emerald-300">{message}</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`flex flex-col items-center gap-3 ${className}`}>
      <div className="relative flex w-full max-w-md items-center">
        {/* Glow behind input */}
        {variant === "hero" && (
          <div className="animate-pulse-glow absolute -inset-1 rounded-full bg-gradient-to-r from-violet-600 via-pink-600 to-cyan-600 opacity-30 blur-lg" />
        )}
        <div className="relative flex w-full items-center rounded-full border border-white/10 bg-zinc-900/80 backdrop-blur-sm">
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (status === "error") setStatus("idle");
            }}
            placeholder="Enter your email"
            required
            className="w-full bg-transparent px-5 py-3.5 text-sm text-white placeholder-zinc-500 outline-none"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="mr-1.5 flex shrink-0 items-center gap-1.5 rounded-full bg-white px-5 py-2 text-sm font-semibold text-black transition-all hover:bg-zinc-200 disabled:opacity-50"
          >
            {status === "loading" ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <>
                Join Waitlist
                <ArrowRight className="h-3.5 w-3.5" />
              </>
            )}
          </button>
        </div>
      </div>

      {status === "error" && (
        <p className="text-xs text-red-400">{message}</p>
      )}

      <p className="text-xs text-zinc-600">
        Free early access · No spam · Unsubscribe anytime
      </p>
    </form>
  );
}
