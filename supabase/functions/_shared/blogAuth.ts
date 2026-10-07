import { createClient, type SupabaseClient } from "npm:@supabase/supabase-js@2";

export const serviceClient = (): SupabaseClient =>
  createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);

/** Returns the caller's user id when the bearer token is valid, else null. */
export async function getCallerId(req: Request): Promise<string | null> {
  const auth = req.headers.get("Authorization");
  if (!auth?.startsWith("Bearer ")) return null;
  const client = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_ANON_KEY")!, {
    global: { headers: { Authorization: auth } },
  });
  const { data, error } = await client.auth.getClaims(auth.slice(7));
  if (error || !data?.claims?.sub) return null;
  return data.claims.sub as string;
}

export async function hasBlogRole(userId: string, roles: string[]): Promise<boolean> {
  const { data } = await serviceClient().from("user_roles").select("role").eq("user_id", userId).in("role", roles);
  return (data ?? []).length > 0;
}
