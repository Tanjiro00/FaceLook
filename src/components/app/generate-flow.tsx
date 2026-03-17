"use client";

import { useCallback, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { BeforeAfterSlider } from "@/components/shared/before-after-slider";
import { PROCEDURES } from "@/config/procedures";
import {
  fileToBase64,
  getImageDimensions,
  validateImageDimensions,
} from "@/lib/ai/face-detection";
import {
  Upload,
  Camera,
  Wand2,
  Loader2,
  Download,
  RotateCcw,
  Lock,
  AlertCircle,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface GenerateFlowProps {
  tier: string;
  generationsUsed: number;
  generationsLimit: number;
}

type Step = "upload" | "procedure" | "generating" | "result";

export function GenerateFlow({
  tier,
  generationsUsed,
  generationsLimit,
}: GenerateFlowProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [step, setStep] = useState<Step>("upload");
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [selectedProcedure, setSelectedProcedure] = useState<string | null>(null);
  const [intensity, setIntensity] = useState(70);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);

  const remaining = generationsLimit - generationsUsed;
  const atLimit = remaining <= 0;

  const handleFileUpload = useCallback(
    async (file: File) => {
      if (!file.type.startsWith("image/")) {
        toast.error("Please upload an image file (JPG, PNG, WebP)");
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        toast.error("Image must be under 10MB");
        return;
      }

      const dimensions = await getImageDimensions(file);
      const validation = validateImageDimensions(
        dimensions.width,
        dimensions.height
      );
      if (!validation.valid) {
        toast.error(validation.error);
        return;
      }

      const base64 = await fileToBase64(file);
      setOriginalImage(base64);
      setStep("procedure");
    },
    []
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      if (file) handleFileUpload(file);
    },
    [handleFileUpload]
  );

  const handleGenerate = useCallback(async () => {
    if (!originalImage || !selectedProcedure) return;
    if (atLimit) {
      toast.error("Generation limit reached. Upgrade your plan.");
      return;
    }

    setStep("generating");
    setIsGenerating(true);
    setProgress(0);

    // Simulated progress
    const progressInterval = setInterval(() => {
      setProgress((p) => Math.min(p + Math.random() * 15, 90));
    }, 1000);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          procedureId: selectedProcedure,
          imageBase64: originalImage,
          options: { intensity },
        }),
      });

      clearInterval(progressInterval);

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Generation failed");
      }

      const data = await res.json();
      setProgress(100);
      setResultImage(data.resultImageUrl);
      setStep("result");
      toast.success(
        `Done in ${((data.processingTimeMs ?? 0) / 1000).toFixed(1)}s`
      );
    } catch (err) {
      clearInterval(progressInterval);
      toast.error(err instanceof Error ? err.message : "Generation failed");
      setStep("procedure");
    } finally {
      setIsGenerating(false);
    }
  }, [originalImage, selectedProcedure, intensity, atLimit]);

  const handleReset = () => {
    setStep("upload");
    setOriginalImage(null);
    setSelectedProcedure(null);
    setResultImage(null);
    setProgress(0);
  };

  const tierOrder: Record<string, number> = { free: 0, basic: 1, premium: 2 };
  const userLevel = tierOrder[tier] ?? 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Generate</h1>
          <p className="text-sm text-muted-foreground">
            {remaining} generation{remaining !== 1 ? "s" : ""} remaining
          </p>
        </div>
        {step !== "upload" && (
          <Button variant="outline" size="sm" onClick={handleReset}>
            <RotateCcw className="mr-2 h-3 w-3" />
            Start Over
          </Button>
        )}
      </div>

      {/* Step 1: Upload */}
      {step === "upload" && (
        <Card>
          <CardHeader>
            <CardTitle>Upload Your Photo</CardTitle>
            <CardDescription>
              Front-facing selfie works best. Photo is processed and never stored.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div
              className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-border/60 p-12 transition-colors hover:border-primary/50 hover:bg-muted/30"
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <div className="mb-4 rounded-full bg-primary/10 p-4">
                <Upload className="h-8 w-8 text-primary" />
              </div>
              <p className="font-medium">Drop your photo here or click to upload</p>
              <p className="mt-1 text-sm text-muted-foreground">
                JPG, PNG, WebP · Max 10MB · Min 256×256
              </p>
              <div className="mt-4 flex gap-2">
                <Button size="sm">
                  <Camera className="mr-2 h-4 w-4" />
                  Upload Photo
                </Button>
              </div>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFileUpload(file);
              }}
            />
          </CardContent>
        </Card>
      )}

      {/* Step 2: Select Procedure */}
      {step === "procedure" && originalImage && (
        <div className="grid gap-6 lg:grid-cols-[1fr,320px]">
          <Card>
            <CardHeader>
              <CardTitle>Choose a Procedure</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 sm:grid-cols-2">
                {PROCEDURES.filter((p) => p.available).map((proc) => {
                  const locked = tierOrder[proc.tier] > userLevel;
                  return (
                    <button
                      key={proc.id}
                      disabled={locked}
                      onClick={() => setSelectedProcedure(proc.id)}
                      className={cn(
                        "flex items-center gap-3 rounded-lg border p-3 text-left transition-all",
                        selectedProcedure === proc.id
                          ? "border-primary bg-primary/5 ring-1 ring-primary"
                          : "border-border hover:border-primary/40",
                        locked && "cursor-not-allowed opacity-50"
                      )}
                    >
                      <span className="text-xl">{proc.icon}</span>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{proc.name}</p>
                        <p className="text-xs text-muted-foreground line-clamp-1">
                          {proc.description}
                        </p>
                      </div>
                      {locked && <Lock className="h-4 w-4 text-muted-foreground" />}
                    </button>
                  );
                })}
              </div>

              {/* Intensity slider */}
              {selectedProcedure && (
                <div className="mt-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Intensity</label>
                    <span className="text-sm text-muted-foreground">
                      {intensity}%
                    </span>
                  </div>
                  <Slider
                    value={intensity}
                    onValueChange={(v) => setIntensity(v as number)}
                    min={10}
                    max={100}
                    step={5}
                  />
                  <p className="text-xs text-muted-foreground">
                    Lower = subtle change · Higher = dramatic result
                  </p>
                </div>
              )}

              <Button
                className="mt-6 w-full"
                size="lg"
                disabled={!selectedProcedure || atLimit}
                onClick={handleGenerate}
              >
                <Wand2 className="mr-2 h-4 w-4" />
                Generate Result
              </Button>

              {atLimit && (
                <div className="mt-3 flex items-center gap-2 rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
                  <AlertCircle className="h-4 w-4" />
                  Limit reached — upgrade to continue.
                </div>
              )}
            </CardContent>
          </Card>

          {/* Preview */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Your Photo</CardTitle>
            </CardHeader>
            <CardContent>
              <img
                src={originalImage}
                alt="Uploaded selfie"
                className="rounded-lg object-cover"
              />
            </CardContent>
          </Card>
        </div>
      )}

      {/* Step 3: Generating */}
      {step === "generating" && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <Loader2 className="mb-4 h-12 w-12 animate-spin text-primary" />
            <h3 className="text-lg font-semibold">Generating your result...</h3>
            <p className="mb-6 text-sm text-muted-foreground">
              This usually takes 10–15 seconds
            </p>
            <Progress value={progress} className="h-2 w-64" />
            <p className="mt-2 text-xs text-muted-foreground">
              {progress < 30
                ? "Analyzing face structure..."
                : progress < 60
                  ? "Applying procedure with AI..."
                  : progress < 90
                    ? "Enhancing quality..."
                    : "Almost done..."}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Step 4: Result */}
      {step === "result" && originalImage && resultImage && (
        <div className="space-y-6">
          <BeforeAfterSlider
            beforeSrc={originalImage}
            afterSrc={resultImage}
            className="aspect-[4/3] max-h-[600px]"
          />

          <div className="flex flex-wrap justify-center gap-3">
            <Button variant="outline" render={<a href={resultImage} download="facelook-result.jpg" />}>
              <Download className="mr-2 h-4 w-4" />
              Download Result
            </Button>
            <Button variant="outline" onClick={() => setStep("procedure")}>
              <RotateCcw className="mr-2 h-4 w-4" />
              Try Different Procedure
            </Button>
            <Button onClick={handleReset}>
              <Camera className="mr-2 h-4 w-4" />
              New Photo
            </Button>
          </div>

          {/* Medical disclaimer */}
          <div className="rounded-lg bg-muted/50 p-4 text-center text-xs text-muted-foreground">
            <strong>Disclaimer:</strong> This is an AI-generated visualization
            for informational purposes only. Actual surgical results may vary.
            Always consult a board-certified medical professional before making
            any decisions about cosmetic procedures.
          </div>
        </div>
      )}
    </div>
  );
}
