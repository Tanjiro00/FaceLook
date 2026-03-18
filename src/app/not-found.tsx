import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          This page doesn&apos;t exist.
        </p>
        <Button className="mt-6" render={<Link href="/" />}>
          Go home
        </Button>
      </div>
    </div>
  );
}
