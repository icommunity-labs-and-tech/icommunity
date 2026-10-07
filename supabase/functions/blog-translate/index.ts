// Translates a Spanish blog post to English for the admin panel.
// auth check → payload validation → translation → response
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { z } from "npm:zod@3";
import { getCallerId, hasBlogRole } from "../_shared/blogAuth.ts";

const Block = z.discriminatedUnion("type", [
  z.object({ type: z.literal("heading"), text: z.string().max(500) }),
  z.object({ type: z.literal("paragraph"), text: z.string().max(10000) }),
  z.object({ type: z.literal("list"), items: z.array(z.string().max(2000)).max(100) }),
  z.object({ type: z.literal("image"), url: z.string().url().max(2000), alt: z.string().max(500) }),
]);
const Body = z.object({
  title: z.string().min(1).max(300),
  description: z.string().max(1000),
  blocks: z.array(Block).max(300),
});

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...corsHeaders, "Content-Type": "application/json" } });

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  try {
    const userId = await getCallerId(req);
    if (!userId) return json({ error: "Inicia sesión para traducir" }, 401);
    if (!(await hasBlogRole(userId, ["admin", "editor"]))) return json({ error: "Sin permiso de edición" }, 403);

    const parsed = Body.safeParse(await req.json().catch(() => null));
    if (!parsed.success) return json({ error: "Contenido no válido", details: parsed.error.flatten().fieldErrors }, 400);
    const input = parsed.data;

    const apiKey = Deno.env.get("OPENAI_API_KEY");
    if (!apiKey) return json({ error: "Falta configurar la clave de IA" }, 500);

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        temperature: 0.2,
        response_format: { type: "json_object" },
        messages: [
          {
            role: "system",
            content:
              "You translate blog posts for iCommunity (verifiable evidence, blockchain timestamping, traceability) from Spanish (Spain) to natural, professional British-neutral English. Keep product names (CertyPass, CertyFile, Privaro, MusicDibs, iCommunity) unchanged. Use 'timestamp' for 'sellado de tiempo' and 'traceable evidence' for 'evidencia trazable'. Return JSON with exactly the same structure as the input: {title, description, blocks}. Keep block order, types and image URLs; translate only text, list items and image alt.",
          },
          { role: "user", content: JSON.stringify(input) },
        ],
      }),
    });
    if (!res.ok) {
      const details = await res.text();
      console.error(`OpenAI error [${res.status}]: ${details}`);
      return json({ error: res.status === 429 ? "La IA está saturada, prueba en un minuto" : "La traducción ha fallado" }, 502);
    }
    const out = await res.json();
    const translated = Body.safeParse(JSON.parse(out.choices?.[0]?.message?.content ?? "{}"));
    if (!translated.success) return json({ error: "La traducción no tiene el formato esperado, inténtalo de nuevo" }, 502);
    return json(translated.data);
  } catch (err) {
    console.error("blog-translate failed", err);
    return json({ error: "Error inesperado al traducir" }, 500);
  }
});
