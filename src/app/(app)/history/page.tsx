import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { HistoryContent } from "@/components/app/history-content";

export const metadata = { title: "History" };

export default async function HistoryPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: generations } = await supabase
    .from("generations")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(50);

  return <HistoryContent generations={generations ?? []} />;
}
