// ============================================================
// FaceLook AI Pipeline
// Stage 1: Face Detection (MediaPipe — client-side)
// Stage 2: Prompt Engineering (procedure → instruction)
// Stage 3: Image Editing (FLUX Kontext Pro via fal.ai)
// Stage 4: Face Restore (CodeFormer via fal.ai)
// Stage 5: HD Upscale (Real-ESRGAN via fal.ai — premium only)
// ============================================================

import { fal } from "@fal-ai/client";
import { getProcedureById } from "@/config/procedures";

fal.config({ credentials: process.env.FAL_KEY! });

interface PipelineInput {
  imageBase64: string; // data:image/...;base64,...
  procedureId: string;
  intensity?: number; // 0–100, default 70
  hdUpscale?: boolean;
}

interface PipelineResult {
  resultImageUrl: string;
  processingTimeMs: number;
}

/**
 * Build the editing prompt from procedure config + intensity.
 */
function buildPrompt(procedureId: string, intensity: number): string {
  const procedure = getProcedureById(procedureId);
  if (!procedure) throw new Error(`Unknown procedure: ${procedureId}`);

  const intensityLabel =
    intensity < 30 ? "subtly" : intensity < 70 ? "moderately" : "noticeably";

  return `${procedure.prompt} Apply the changes ${intensityLabel}. The result must look like a real unedited photograph — photorealistic lighting, skin pores, and natural shadows. Do NOT change the person's identity.`;
}

/**
 * Stage 3: FLUX Kontext Pro — instruction-based image editing.
 * Identity preservation + photorealistic output.
 */
async function editWithFluxKontext(
  imageUrl: string,
  prompt: string
): Promise<string> {
  const result = await fal.subscribe("fal-ai/flux-pro/kontext", {
    input: {
      image_url: imageUrl,
      prompt,
      guidance_scale: 7.5,
      output_format: "jpeg",
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
      fidelity: 0.7, // balance between quality and identity
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
 * Remove this when fal.ai billing is set up.
 */
async function runMockPipeline(input: PipelineInput): Promise<PipelineResult> {
  const start = Date.now();
  // Simulate processing delay
  await new Promise((r) => setTimeout(r, 2000));

  return {
    resultImageUrl: input.imageBase64, // return original as "result"
    processingTimeMs: Date.now() - start,
  };
}

/**
 * Run the full AI pipeline.
 * Falls back to mock if FAL_KEY is missing or in dev mock mode.
 */
export async function runPipeline(input: PipelineInput): Promise<PipelineResult> {
  // Use mock if no FAL_KEY or explicitly enabled
  if (!process.env.FAL_KEY || process.env.USE_MOCK_AI === "true") {
    console.log("[AI Pipeline] Running in MOCK mode — set FAL_KEY and billing to use real AI");
    return runMockPipeline(input);
  }

  const start = Date.now();
  const intensity = input.intensity ?? 70;

  // Stage 2: Build prompt
  const prompt = buildPrompt(input.procedureId, intensity);

  // Stage 3: FLUX Kontext edit
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
