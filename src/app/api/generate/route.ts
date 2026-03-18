import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { runPipeline } from "@/lib/ai/pipeline";
import { generateRequestSchema } from "@/lib/validators/generate";
import { checkRateLimit } from "@/lib/rate-limit";
import { errorResponse } from "@/lib/api/response";

export const maxDuration = 120; // Allow up to 120s for AI pipeline + storage upload

export async function POST(request: NextRequest) {
  let userId: string | undefined;
  let procedureId: string | undefined;

  try {
    // 1. Authenticate
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return errorResponse("Unauthorized", 401);
    }
    userId = user.id;

    // 2. Rate limit
    const { success: withinLimit } = await checkRateLimit(user.id);
    if (!withinLimit) {
      return errorResponse("Too many requests. Please wait a moment.", 429);
    }

    // 3. Validate request body
    const body = await request.json();
    const parsed = generateRequestSchema.safeParse(body);
    if (!parsed.success) {
      return errorResponse(parsed.error.issues[0].message, 400);
    }

    procedureId = parsed.data.procedureId;

    // 4. Atomically consume one generation slot (check + increment in one call)
    const { data: consumed, error: consumeError } = await supabase.rpc(
      "try_consume_generation",
      { p_user_id: user.id }
    );

    if (consumeError || !consumed || consumed.length === 0) {
      return errorResponse(
        "Generation limit reached. Please upgrade your plan.",
        403,
        "LIMIT_REACHED"
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
      return errorResponse("Failed to create generation record", 500);
    }

    // 7. Run AI pipeline
    const result = await runPipeline({
      imageBase64: parsed.data.imageBase64,
      procedureId: parsed.data.procedureId,
      intensity: parsed.data.options?.intensity,
      hdUpscale: parsed.data.options?.hdUpscale,
    });

    // 8. Download result from fal.ai and upload to Supabase Storage (permanent URL)
    let permanentResultUrl = result.resultImageUrl;
    try {
      const imageResponse = await fetch(result.resultImageUrl);
      if (imageResponse.ok) {
        const imageBuffer = Buffer.from(await imageResponse.arrayBuffer());
        const resultPath = `${user.id}/${Date.now()}-result.jpeg`;

        const { error: resultUploadError } = await supabase.storage
          .from("generations")
          .upload(resultPath, imageBuffer, {
            contentType: "image/jpeg",
            upsert: false,
          });

        if (!resultUploadError) {
          const { data: resultUrlData } = supabase.storage
            .from("generations")
            .getPublicUrl(resultPath);
          permanentResultUrl = resultUrlData.publicUrl;
        }
      }
    } catch {
      // Fall back to fal.ai URL if upload fails
    }

    // 9. Update generation record
    await supabase
      .from("generations")
      .update({
        result_image_url: permanentResultUrl,
        status: "completed",
        processing_time_ms: result.processingTimeMs,
      })
      .eq("id", generation.id);

    return NextResponse.json({
      generationId: generation.id,
      status: "completed",
      resultImageUrl: permanentResultUrl,
      processingTimeMs: result.processingTimeMs,
    });
  } catch (error) {
    // Rollback the consumed generation slot on failure
    if (userId) {
      try {
        const supabaseForRollback = await createClient();
        await supabaseForRollback.rpc("rollback_generation", {
          p_user_id: userId,
        });
      } catch {
        // Best-effort rollback
      }
    }

    console.error("Generation error:", {
      userId,
      procedureId,
      error: error instanceof Error ? error.message : error,
    });
    return errorResponse("Generation failed. Please try again.", 500);
  }
}
