// ============================================================
// FaceLook AI Pipeline
// Stage 1: Face Detection (MediaPipe — client-side)
// Stage 2: Prompt Engineering (procedure + intensity → instruction)
// Stage 3: Image Editing (Nano Banana Edit via fal.ai)
// Stage 4: Face Restore (CodeFormer via fal.ai)
// Stage 5: HD Upscale (Real-ESRGAN via fal.ai — premium only)
// ============================================================

import { fal } from "@fal-ai/client";
import { z } from "zod";
import { INTENSITY_CONFIGS } from "@/config/procedures";

const nanoBananaResponseSchema = z.object({
  images: z.array(z.object({ url: z.string() })).min(1),
});

const singleImageResponseSchema = z.object({
  image: z.object({ url: z.string() }).optional(),
});

fal.config({ credentials: process.env.FAL_KEY! });

interface PipelineInput {
  imageBase64: string; // data:image/...;base64,...
  procedureId: string;
  intensity?: number; // procedure-specific value (ml, units, level)
  hdUpscale?: boolean;
}

interface PipelineResult {
  resultImageUrl: string;
  processingTimeMs: number;
}

/**
 * Build the editing prompt from procedure-specific intensity config.
 */
function buildPrompt(procedureId: string, intensity: number): string {
  const config = INTENSITY_CONFIGS[procedureId];
  if (!config) throw new Error(`Unknown procedure: ${procedureId}`);

  const procedurePrompt = config.buildPrompt(intensity);

  return `${procedurePrompt} IMPORTANT: This is the same person in the same photo. Do NOT change identity, facial features, skin color, hair, pose, background, lighting, clothing, or any other details. Only modify the specified area. The result must be photorealistic and indistinguishable from a real photograph.`;
}

/**
 * Stage 3: Nano Banana Edit — Google's image editing model.
 * Better identity preservation than FLUX Kontext.
 */
async function editWithNanoBanana(
  imageUrl: string,
  prompt: string
): Promise<string> {
  const result = await fal.subscribe("fal-ai/nano-banana/edit", {
    input: {
      image_urls: [imageUrl],
      prompt,
      output_format: "jpeg",
      aspect_ratio: "auto",
    },
    logs: false,
  });

  const parsed = nanoBananaResponseSchema.safeParse(result.data);
  if (!parsed.success) {
    throw new Error("Nano Banana returned unexpected response format");
  }
  return parsed.data.images[0].url;
}

/**
 * Stage 4: CodeFormer — face restoration to fix artifacts.
 */
async function restoreFace(imageUrl: string): Promise<string> {
  const result = await fal.subscribe("fal-ai/codeformer", {
    input: {
      image_url: imageUrl,
      fidelity: 0.9,
    },
    logs: false,
  });

  const parsed = singleImageResponseSchema.safeParse(result.data);
  return parsed.success && parsed.data.image?.url ? parsed.data.image.url : imageUrl;
}

/**
 * Stage 5: Real-ESRGAN — 2x upscale for premium users.
 */
async function upscaleHD(imageUrl: string): Promise<string> {
  const result = await fal.subscribe("fal-ai/real-esrgan", {
    input: {
      image_url: imageUrl,
      scale: 2,
    },
    logs: false,
  });

  const parsed = singleImageResponseSchema.safeParse(result.data);
  return parsed.success && parsed.data.image?.url ? parsed.data.image.url : imageUrl;
}

/**
 * Mock pipeline for development.
 */
async function runMockPipeline(input: PipelineInput): Promise<PipelineResult> {
  const start = Date.now();
  await new Promise((r) => setTimeout(r, 2000));
  return {
    resultImageUrl: input.imageBase64,
    processingTimeMs: Date.now() - start,
  };
}

/**
 * Run the full AI pipeline.
 */
export async function runPipeline(input: PipelineInput): Promise<PipelineResult> {
  if (!process.env.FAL_KEY || process.env.USE_MOCK_AI === "true") {
    // Mock mode — no real AI calls
    return runMockPipeline(input);
  }

  const start = Date.now();

  const config = INTENSITY_CONFIGS[input.procedureId];
  const intensity = input.intensity ?? config?.default ?? 50;

  // Stage 2: Build prompt
  const prompt = buildPrompt(input.procedureId, intensity);

  // Stage 3: Nano Banana edit
  let resultUrl = await editWithNanoBanana(input.imageBase64, prompt);

  // Stage 4: Face restore
  resultUrl = await restoreFace(resultUrl);

  // Stage 5: Optional HD upscale
  if (input.hdUpscale) {
    resultUrl = await upscaleHD(resultUrl);
  }

  return {
    resultImageUrl: resultUrl,
    processingTimeMs: Date.now() - start,
  };
}
