"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { BeforeAfterSlider } from "@/components/shared/before-after-slider";
import { Download, History, Eye, Wand2 } from "lucide-react";
import Link from "next/link";

interface Generation {
  id: string;
  procedure_id: string;
  original_image_url: string | null;
  result_image_url: string | null;
  status: string;
  processing_time_ms: number | null;
  created_at: string;
}

export function HistoryContent({ generations }: { generations: Generation[] }) {
  const [selected, setSelected] = useState<Generation | null>(null);

  if (generations.length === 0) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">History</h1>
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <div className="mb-4 rounded-full bg-muted p-4">
              <History className="h-8 w-8 text-muted-foreground" />
            </div>
            <p className="font-medium">No generations yet</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Your AI-generated results will appear here.
            </p>
            <Button className="mt-4" render={<Link href="/generate" />}>
              <Wand2 className="mr-2 h-4 w-4" />
              Create Your First
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">History</h1>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {generations.map((gen) => (
          <Card
            key={gen.id}
            className="cursor-pointer overflow-hidden transition-shadow hover:shadow-md"
            onClick={() => setSelected(gen)}
          >
            {gen.result_image_url ? (
              <div className="relative">
                <img
                  src={gen.result_image_url}
                  alt={`${gen.procedure_id} result`}
                  className="aspect-square w-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all hover:bg-black/20 hover:opacity-100">
                  <Eye className="h-8 w-8 text-white" />
                </div>
              </div>
            ) : (
              <div className="flex aspect-square items-center justify-center bg-muted">
                <Badge variant="secondary">{gen.status}</Badge>
              </div>
            )}
            <CardContent className="p-3">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium capitalize">
                  {gen.procedure_id.replace("-", " ")}
                </p>
                <Badge
                  variant={gen.status === "completed" ? "default" : "secondary"}
                  className="text-xs"
                >
                  {gen.status}
                </Badge>
              </div>
              <div className="mt-1 flex items-center justify-between text-xs text-muted-foreground">
                <span>{new Date(gen.created_at).toLocaleDateString()}</span>
                {gen.processing_time_ms && (
                  <span>{(gen.processing_time_ms / 1000).toFixed(1)}s</span>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Detail Dialog */}
      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="capitalize">
              {selected?.procedure_id.replace("-", " ")}
            </DialogTitle>
          </DialogHeader>

          {selected?.original_image_url && selected?.result_image_url ? (
            <BeforeAfterSlider
              beforeSrc={selected.original_image_url}
              afterSrc={selected.result_image_url}
              className="aspect-[4/3]"
            />
          ) : selected?.result_image_url ? (
            <img
              src={selected.result_image_url}
              alt="Result"
              className="rounded-lg"
            />
          ) : null}

          <div className="flex justify-end gap-2">
            {selected?.result_image_url && (
              <Button variant="outline" render={<a href={selected.result_image_url} download />}>
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
