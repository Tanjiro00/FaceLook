import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { runPipeline } from "@/lib/ai/pipeline";
import { generateRequestSchema } from "@/lib/validators/generate";
import { checkRateLimit } from "@/lib/rate-limit";

export const maxDuration = 60; // Allow up to 60s for AI processing

export async function POST(request: NextRequest) {
  try {
    // 1. Authenticate
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. Rate limit
    const { success: withinLimit } = await checkRateLimit(user.id);
    if (!withinLimit) {
      return NextResponse.json(
        { error: "Too many requests. Please wait a moment." },
        { status: 429 }
      );
    }

    // 3. Validate request body
    const body = await request.json();
    const parsed = generateRequestSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0].message },
        { status: 400 }
      );
    }

    // 4. Check generation limits
    const { data: profile } = await supabase
      .from("profiles")
      .select("generations_used, generations_limit, subscription_tier")
      .eq("id", user.id)
      .single();

    if (profile && profile.generations_used >= profile.generations_limit) {
      return NextResponse.json(
        {
          error: "Generation limit reached. Please upgrade your plan.",
          code: "LIMIT_REACHED",
        },
        { status: 403 }
      );
    }

    // 5. Upload original image to Storage
    let originalImageUrl: string | null = null;
    try {
      const base64Data = parsed.data.imageBase64.replace(
        /^data:image\/\w+;base64,/,
        ""
      );
      const buffer = Buffer.from(base64Data, "base64");
      const ext = parsed.data.imageBase64.match(/data:image\/(\w+)/)?.[1] ?? "jpeg";
      const filePath = `${user.id}/${Date.now()}-original.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from("generations")
        .upload(filePath, buffer, {
          contentType: `image/${ext}`,
          upsert: false,
        });

      if (!uploadError) {
        const { data: urlData } = supabase.storage
          .from("generations")
          .getPublicUrl(filePath);
        originalImageUrl = urlData.publicUrl;
      }
    } catch {
      // Non-critical — continue without saving original
    }

    // 6. Create generation record
    const { data: generation, error: insertError } = await supabase
      .from("generations")
      .insert({
        user_id: user.id,
        procedure_id: parsed.data.procedureId,
        original_image_url: originalImageUrl,
        status: "processing",
      })
      .select("id")
      .single();

    if (insertError || !generation) {
      return NextResponse.json(
        { error: "Failed to create generation record" },
        { status: 500 }
      );
    }

    // 7. Run AI pipeline
    const result = await runPipeline({
      imageBase64: parsed.data.imageBase64,
      procedureId: parsed.data.procedureId,
      intensity: parsed.data.options?.intensity,
      hdUpscale: parsed.data.options?.hdUpscale,
    });

    // 8. Update generation record
    await supabase
      .from("generations")
      .update({
        result_image_url: result.resultImageUrl,
        status: "completed",
        processing_time_ms: result.processingTimeMs,
      })
      .eq("id", generation.id);

    // 9. Increment usage
    await supabase.rpc("increment_generations_used", {
      user_id: user.id,
    });

    return NextResponse.json({
      generationId: generation.id,
      status: "completed",
      resultImageUrl: result.resultImageUrl,
      processingTimeMs: result.processingTimeMs,
    });
  } catch (error) {
    console.error("Generation error:", error);
    return NextResponse.json(
      { error: "Generation failed. Please try again." },
      { status: 500 }
    );
  }
}
