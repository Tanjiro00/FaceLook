import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: NextRequest) {
  try {
    const { email, source } = await req.json();

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { error: "Valid email is required" },
        { status: 400 }
      );
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
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
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
