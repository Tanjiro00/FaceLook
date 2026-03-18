import { z } from "zod";
import { INTENSITY_CONFIGS } from "@/config/procedures";

const validProcedureIds = Object.keys(INTENSITY_CONFIGS) as [
  string,
  ...string[],
];

// ~10MB binary ≈ ~14MB base64
const MAX_BASE64_LENGTH = 14 * 1024 * 1024;

export const generateRequestSchema = z.object({
  procedureId: z.enum(validProcedureIds, {
    error: "Unknown procedure",
  }),
  imageBase64: z
    .string()
    .min(1, "Image is required")
    .refine(
      (val) => val.startsWith("data:image/"),
      "Invalid image format — must be a base64 data URL"
    )
    .refine(
      (val) => val.length <= MAX_BASE64_LENGTH,
      "Image too large — maximum 10MB"
    ),
  options: z
    .object({
      intensity: z.number().min(0).max(100).optional().default(70),
      hdUpscale: z.boolean().optional().default(false),
    })
    .optional(),
});

export type ValidatedGenerateRequest = z.infer<typeof generateRequestSchema>;
