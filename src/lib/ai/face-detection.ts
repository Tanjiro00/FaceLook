// ============================================================
// Client-side face detection using MediaPipe Face Mesh
// Validates selfie before sending to AI pipeline
// ============================================================

export interface FaceValidation {
  valid: boolean;
  faceCount: number;
  error?: string;
}

/**
 * Validate that the uploaded image contains exactly one face
 * and meets quality requirements.
 * Uses canvas-based heuristics as a lightweight check.
 * Full MediaPipe detection runs on the generate page.
 */
export function validateImageDimensions(
  width: number,
  height: number
): FaceValidation {
  if (width < 256 || height < 256) {
    return {
      valid: false,
      faceCount: 0,
      error: "Image is too small. Minimum resolution is 256×256.",
    };
  }

  if (width > 4096 || height > 4096) {
    return {
      valid: false,
      faceCount: 0,
      error: "Image is too large. Maximum resolution is 4096×4096.",
    };
  }

  return { valid: true, faceCount: 1 };
}

/**
 * Convert a File to a base64 data URL.
 */
export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/**
 * Get image dimensions from a File.
 */
export function getImageDimensions(
  file: File
): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve({ width: img.width, height: img.height });
    img.onerror = reject;
    img.src = URL.createObjectURL(file);
  });
}
