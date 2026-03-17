"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Sparkles,
  LayoutDashboard,
  Wand2,
  History,
  CreditCard,
  LogOut,
  Menu,
} from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/generate", label: "Generate", icon: Wand2 },
  { href: "/history", label: "History", icon: History },
];

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  return (
    <>
      {/* Logo */}
      <Link
        href="/dashboard"
        className="mb-8 flex items-center gap-2 font-bold text-xl"
        onClick={onNavigate}
      >
        <Sparkles className="h-5 w-5 text-primary" />
        FaceLook
      </Link>

      {/* Navigation */}
      <nav className="flex-1 space-y-1">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={onNavigate}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              pathname === link.href
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            <link.icon className="h-4 w-4" />
            {link.label}
          </Link>
        ))}
      </nav>

      {/* Footer */}
      <div className="space-y-1 border-t border-border/40 pt-4">
        <Link
          href="/dashboard?tab=billing"
          onClick={onNavigate}
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
        >
          <CreditCard className="h-4 w-4" />
          Billing
        </Link>
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 px-3 text-sm text-muted-foreground"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4" />
          Log Out
        </Button>
      </div>
    </>
  );
}

export function AppSidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden h-screen w-64 flex-col border-r border-border/40 bg-background p-4 md:flex">
        <SidebarContent />
      </aside>

      {/* Mobile header + sheet */}
      <div className="sticky top-0 z-50 flex h-14 items-center gap-3 border-b border-border/40 bg-background/80 px-4 backdrop-blur-xl md:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger render={<Button variant="ghost" size="icon" />}>
            <Menu className="h-5 w-5" />
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-4">
            <div className="flex h-full flex-col">
              <SidebarContent onNavigate={() => setOpen(false)} />
            </div>
          </SheetContent>
        </Sheet>
        <Link href="/dashboard" className="flex items-center gap-2 font-bold">
          <Sparkles className="h-5 w-5 text-primary" />
          FaceLook
        </Link>
      </div>
    </>
  );
}
