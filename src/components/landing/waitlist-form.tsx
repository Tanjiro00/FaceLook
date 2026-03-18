"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2, Loader2, Share2 } from "lucide-react";
import { trackWaitlistSignup } from "@/lib/analytics/events";

export function WaitlistForm({ source = "landing" }: { source?: string }) {
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

      if (!res.ok) {
        setStatus("error");
        setMessage(data.error || "Something went wrong");
        return;
      }

      setStatus("success");
      setMessage(data.message);
      setEmail("");
      trackWaitlistSignup(source);
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: "FaceLook — AI Virtual Try-On",
      text: "See your cosmetic procedure results before surgery with AI. Check it out:",
      url: "https://facelook.ai",
    };
    if (navigator.share) {
      await navigator.share(shareData);
    } else {
      await navigator.clipboard.writeText(
        `${shareData.text} ${shareData.url}`
      );
      setMessage("Link copied!");
    }
  };

  if (status === "success") {
    return (
      <div className="flex flex-col items-center gap-3">
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-5 py-3">
          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          <span className="text-sm text-emerald-300">{message}</span>
        </div>
        <button
          onClick={handleShare}
          className="inline-flex items-center gap-1.5 text-xs text-zinc-500 transition-colors hover:text-white"
        >
          <Share2 className="h-3 w-3" />
          Share with friends
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center gap-2">
      <div className="flex w-full max-w-sm items-center rounded-full border border-white/10 bg-white/5 transition-all duration-300 focus-within:border-violet-500/40 focus-within:shadow-[0_0_20px_-4px_rgba(139,92,246,0.3)]">
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === "error") setStatus("idle");
          }}
          placeholder="you@email.com"
          required
          className="w-full bg-transparent px-5 py-3 text-sm text-white placeholder-zinc-600 outline-none"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="mr-1 flex shrink-0 items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-zinc-200 disabled:opacity-50"
        >
          {status === "loading" ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : (
            <>
              Join
              <ArrowRight className="h-3.5 w-3.5" />
            </>
          )}
        </button>
      </div>
      {status === "error" && (
        <p className="text-xs text-red-400">{message}</p>
      )}
    </form>
  );
}
