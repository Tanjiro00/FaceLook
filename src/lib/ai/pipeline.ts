// ============================================================
// FaceLook AI Pipeline
// Stage 1: Face Detection (MediaPipe — client-side)
// Stage 2: Prompt Engineering (procedure + intensity → instruction)
// Stage 3: Image Editing (FLUX Kontext Pro via fal.ai)
// Stage 4: Face Restore (CodeFormer via fal.ai)
// Stage 5: HD Upscale (Real-ESRGAN via fal.ai — premium only)
// ============================================================

import { fal } from "@fal-ai/client";
import { INTENSITY_CONFIGS } from "@/config/procedures";

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

  return `${procedurePrompt} The result must look like a real unedited high-resolution photograph. Preserve natural skin pores, texture, lighting, and shadows. Do NOT change the person's identity, hair, clothing, background, or any other features. Only modify the specified area.`;
}

/**
 * Stage 3: FLUX Kontext Pro — instruction-based image editing.
 */
async function editWithFluxKontext(
  imageUrl: string,
  prompt: string
): Promise<string> {
  const result = await fal.subscribe("fal-ai/flux-pro/kontext/max", {
    input: {
      image_url: imageUrl,
      prompt,
      guidance_scale: 4,
      output_format: "jpeg",
      safety_tolerance: "5" as const,
    },
    logs: false,
  });

  const output = result.data as { images?: { url: string }[] };
  if (!output.images?.[0]?.url) {
    throw new Error("FLUX Kontext returned no images");
  }
  return output.images[0].url;
}

/**
 * Stage 4: CodeFormer — face restoration to fix artifacts.
 */
async function restoreFace(imageUrl: string): Promise<string> {
  const result = await fal.subscribe("fal-ai/codeformer", {
    input: {
      image_url: imageUrl,
      fidelity: 0.8,
    },
    logs: false,
  });

  const output = result.data as { image?: { url: string } };
  return output.image?.url ?? imageUrl;
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

  const output = result.data as { image?: { url: string } };
  return output.image?.url ?? imageUrl;
}

/**
 * Mock pipeline for development — returns original image with a delay.
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
    console.log("[AI Pipeline] Running in MOCK mode");
    return runMockPipeline(input);
  }

  const start = Date.now();

  const config = INTENSITY_CONFIGS[input.procedureId];
  const intensity = input.intensity ?? config?.default ?? 50;

  // Stage 2: Build prompt
  const prompt = buildPrompt(input.procedureId, intensity);

  // Stage 3: FLUX Kontext Max edit
  let resultUrl = await editWithFluxKontext(input.imageBase64, prompt);

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
