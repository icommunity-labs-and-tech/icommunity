// Admin-only management of blog panel members (invite / remove).
// auth check → payload validation → business logic → response
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { z } from "npm:zod@3";
import { getCallerId, hasBlogRole, serviceClient } from "../_shared/blogAuth.ts";

const Body = z.discriminatedUnion("action", [
  z.object({ action: z.literal("add"), email: z.string().trim().toLowerCase().email().max(255), role: z.enum(["admin", "editor"]) }),
  z.object({ action: z.literal("remove"), user_id: z.string().uuid(), role: z.enum(["admin", "editor"]) }),
]);

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...corsHeaders, "Content-Type": "application/json" } });

const SITE = "https://icommunity.io";

async function findUserByEmail(email: string) {
  const admin = serviceClient().auth.admin;
  for (let page = 1; page <= 20; page++) {
    const { data, error } = await admin.listUsers({ page, perPage: 200 });
    if (error) throw error;
    const hit = data.users.find((u) => u.email?.toLowerCase() === email);
    if (hit) return hit;
    if (data.users.length < 200) return null;
  }
  return null;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  try {
    const callerId = await getCallerId(req);
    if (!callerId) return json({ error: "Inicia sesión" }, 401);
    if (!(await hasBlogRole(callerId, ["admin"]))) return json({ error: "Solo un administrador puede gestionar el equipo" }, 403);

    const parsed = Body.safeParse(await req.json().catch(() => null));
    if (!parsed.success) return json({ error: "Datos no válidos" }, 400);
    const body = parsed.data;
    const db = serviceClient();

    if (body.action === "remove") {
      if (body.user_id === callerId) return json({ error: "No puedes retirarte el acceso a ti mismo" }, 400);
      const { error } = await db.from("user_roles").delete().eq("user_id", body.user_id).eq("role", body.role);
      if (error) throw error;
      return json({ ok: true });
    }

    let user = await findUserByEmail(body.email);
    let invited = false;
    if (!user) {
      const { data, error } = await db.auth.admin.inviteUserByEmail(body.email, { redirectTo: `${SITE}/admin/nueva-contrasena` });
      if (error) throw error;
      user = data.user;
      invited = true;
    }
    const { error } = await db
      .from("user_roles")
      .upsert({ user_id: user.id, email: body.email, role: body.role }, { onConflict: "user_id,role", ignoreDuplicates: true });
    if (error) throw error;
    return json({ ok: true, invited });
  } catch (err) {
    console.error("blog-team failed", err);
    return json({ error: err instanceof Error ? err.message : "Error inesperado" }, 500);
  }
});
