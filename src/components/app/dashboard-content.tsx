"use client";

import Link from "next/link";
import type { User } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Wand2, TrendingUp, Zap } from "lucide-react";

interface DashboardContentProps {
  user: User;
  profile: {
    subscription_tier: string;
    generations_used: number;
    generations_limit: number;
  } | null;
  recentGenerations: {
    id: string;
    procedure_id: string;
    status: string;
    result_image_url: string | null;
    created_at: string;
  }[];
}

export function DashboardContent({
  user,
  profile,
  recentGenerations,
}: DashboardContentProps) {
  const tier = profile?.subscription_tier ?? "free";
  const used = profile?.generations_used ?? 0;
  const limit = profile?.generations_limit ?? 3;
  const usagePercent = limit > 0 ? (used / limit) * 100 : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Welcome back</h1>
          <p className="text-muted-foreground">{user.email}</p>
        </div>
        <Button render={<Link href="/generate" />} className="gap-2">
          <Wand2 className="h-4 w-4" />
          New Generation
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Plan</CardDescription>
            <CardTitle className="flex items-center gap-2">
              <Badge variant="secondary" className="capitalize">
                {tier}
              </Badge>
            </CardTitle>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Generations Used</CardDescription>
            <CardTitle>
              {used} / {limit}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Progress value={usagePercent} className="h-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Generated</CardDescription>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-primary" />
              {recentGenerations.length}
            </CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Upgrade CTA (free tier) */}
      {tier === "free" && (
        <Card className="border-primary/30 bg-primary/5">
          <CardContent className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <Zap className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium">Upgrade for more generations</p>
                <p className="text-sm text-muted-foreground">
                  Get 30 generations/month with Basic plan — $9.99/mo
                </p>
              </div>
            </div>
            <Button size="sm" render={<Link href="/dashboard?tab=billing" />}>
              Upgrade
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Recent Generations */}
      <div>
        <h2 className="mb-4 text-lg font-semibold">Recent Results</h2>
        {recentGenerations.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
              <Wand2 className="mb-3 h-8 w-8 text-muted-foreground" />
              <p className="font-medium">No generations yet</p>
              <p className="text-sm text-muted-foreground">
                Create your first AI visualization
              </p>
              <Button className="mt-4" render={<Link href="/generate" />}>
                Get Started
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {recentGenerations.map((gen) => (
              <Card key={gen.id} className="overflow-hidden">
                {gen.result_image_url ? (
                  <img
                    src={gen.result_image_url}
                    alt={`${gen.procedure_id} result`}
                    className="aspect-square w-full object-cover"
                  />
                ) : (
                  <div className="flex aspect-square items-center justify-center bg-muted">
                    <Badge variant="secondary">{gen.status}</Badge>
                  </div>
                )}
                <CardContent className="p-3">
                  <p className="text-sm font-medium capitalize">
                    {gen.procedure_id.replace("-", " ")}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(gen.created_at).toLocaleDateString()}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
