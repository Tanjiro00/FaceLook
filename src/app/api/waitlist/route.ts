import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { errorResponse } from "@/lib/api/response";

export async function POST(req: NextRequest) {
  try {
    const { email, source } = await req.json();

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return errorResponse("Valid email is required", 400);
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const { error } = await supabase
      .from("waitlist")
      .insert({ email: email.toLowerCase().trim(), referral_source: source || null });

    if (error) {
      // Unique constraint violation = already on waitlist
      if (error.code === "23505") {
        return NextResponse.json({ message: "You're already on the waitlist!" });
      }
      throw error;
    }

    return NextResponse.json({ message: "You're on the list! We'll be in touch." });
  } catch {
    return errorResponse("Something went wrong. Please try again.", 500);
  }
}
