import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { GenerateFlow } from "@/components/app/generate-flow";

export const metadata = { title: "Generate" };

export default async function GeneratePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login?redirect=/generate");

  const { data: profile } = await supabase
    .from("profiles")
    .select("subscription_tier, generations_used, generations_limit")
    .eq("id", user.id)
    .single();

  return (
    <GenerateFlow
      tier={profile?.subscription_tier ?? "free"}
      generationsUsed={profile?.generations_used ?? 0}
      generationsLimit={profile?.generations_limit ?? 3}
    />
  );
}
