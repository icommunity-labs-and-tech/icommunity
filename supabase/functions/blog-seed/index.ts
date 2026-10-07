// One-off seed of legacy blog posts; deleted after running.
import { createClient } from "npm:@supabase/supabase-js@2";
import { rows } from "./rows.ts";
Deno.serve(async () => {
  const sb = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
  const { error, count } = await sb.from("blog_posts").upsert(rows, { onConflict: "slug", ignoreDuplicates: true, count: "exact" });
  return new Response(JSON.stringify({ error: error?.message ?? null, count }), { headers: { "Content-Type": "application/json" } });
});
