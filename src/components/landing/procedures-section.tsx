"use client";

import { PROCEDURES } from "@/config/procedures";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Lock } from "lucide-react";

export function ProceduresSection() {
  return (
    <section id="procedures" className="bg-muted/30 py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Available Procedures
          </h2>
          <p className="mt-3 text-muted-foreground">
            Start with face — body procedures coming in v1 launch.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PROCEDURES.map((proc) => (
            <Card
              key={proc.id}
              className={`transition-all hover:shadow-md ${
                !proc.available ? "opacity-60" : ""
              }`}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <span className="text-2xl">{proc.icon}</span>
                  <div className="flex items-center gap-2">
                    {proc.tier !== "free" && (
                      <Badge variant="secondary" className="text-xs">
                        {proc.tier}
                      </Badge>
                    )}
                    {!proc.available && (
                      <Lock className="h-4 w-4 text-muted-foreground" />
                    )}
                  </div>
                </div>
                <CardTitle className="text-lg">{proc.name}</CardTitle>
                <CardDescription>{proc.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
