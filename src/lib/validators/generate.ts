import { z } from "zod";

export const generateRequestSchema = z.object({
  procedureId: z.string().min(1, "Procedure is required"),
  imageBase64: z
    .string()
    .min(1, "Image is required")
    .refine(
      (val) => val.startsWith("data:image/"),
      "Invalid image format — must be a base64 data URL"
    ),
  options: z
    .object({
      intensity: z.number().min(0).max(100).optional().default(70),
      hdUpscale: z.boolean().optional().default(false),
    })
    .optional(),
});

export type ValidatedGenerateRequest = z.infer<typeof generateRequestSchema>;
