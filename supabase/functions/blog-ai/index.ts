// AI helpers for the blog editor: draft a new article (Spanish) or generate a cover image.
// auth check → payload validation → business logic → response
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { z } from "npm:zod@3";
import { getCallerId, hasBlogRole } from "../_shared/blogAuth.ts";

const Block = z.discriminatedUnion("type", [
  z.object({ type: z.literal("heading"), text: z.string().max(500) }),
  z.object({ type: z.literal("paragraph"), text: z.string().max(10000) }),
  z.object({ type: z.literal("list"), items: z.array(z.string().max(2000)).max(100) }),
]);
const Article = z.object({ title: z.string().min(1).max(300), description: z.string().max(1000), blocks: z.array(Block).min(1).max(300) });

const Body = z.discriminatedUnion("action", [
  z.object({
    action: z.literal("article"),
    topic: z.string().trim().min(5).max(500),
    notes: z.string().trim().max(4000).optional().default(""),
    kind: z.enum(["article", "case", "news"]),
    length: z.enum(["short", "medium", "long"]).default("medium"),
  }),
  z.object({ action: z.literal("cover"), prompt: z.string().trim().min(5).max(1500) }),
]);

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...corsHeaders, "Content-Type": "application/json" } });

const WORDS = { short: "500-700", medium: "900-1200", long: "1500-2000" } as const;
const KIND = { article: "artículo divulgativo/técnico", case: "caso de éxito de cliente", news: "noticia corporativa" } as const;

const SYSTEM = `Eres el redactor de contenidos de iCommunity (iCommunity Labs & Tech S.L., Madrid): infraestructura de evidencia verificable con blockchain. Productos: CertyPass (pasaporte digital de producto y trazabilidad), CertyFile (certificación de documentos), Privaro (privacidad y protección de datos con IA, privaro.ai), MusicDibs (registro de obras musicales). Usa "sellado de tiempo" y "evidencia trazable". Escribe en español de España, tono profesional pero cercano, orientado a SEO (encabezados claros, frases cortas, sin relleno). No inventes cifras, clientes ni citas concretas: si hacen falta, usa marcadores como [dato a confirmar]. Termina con una llamada a la acción suave hacia iCommunity. La descripción debe tener 140-160 caracteres.`;

const articleSchema = {
  type: "object",
  additionalProperties: false,
  required: ["title", "description", "blocks"],
  properties: {
    title: { type: "string" },
    description: { type: "string" },
    blocks: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["type", "text", "items"],
        properties: {
          type: { type: "string", enum: ["heading", "paragraph", "list"] },
          text: { type: "string", description: "Texto para heading/paragraph; vacío en list" },
          items: { type: "array", items: { type: "string" }, description: "Elementos para list; vacío en otros" },
        },
      },
    },
  },
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  try {
    const userId = await getCallerId(req);
    if (!userId) return json({ error: "Inicia sesión" }, 401);
    if (!(await hasBlogRole(userId, ["admin", "editor"]))) return json({ error: "Sin permiso de edición" }, 403);

    const parsed = Body.safeParse(await req.json().catch(() => null));
    if (!parsed.success) return json({ error: "Datos no válidos", details: parsed.error.flatten().fieldErrors }, 400);
    const body = parsed.data;

    const apiKey = Deno.env.get("OPENAI_API_KEY");
    if (!apiKey) return json({ error: "Falta configurar la clave de IA" }, 500);
    const headers = { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" };

    if (body.action === "cover") {
      const res = await fetch("https://api.openai.com/v1/images/generations", {
        method: "POST",
        headers,
        body: JSON.stringify({
          model: "gpt-image-1",
          size: "1536x1024",
          quality: "medium",
          n: 1,
          prompt: `Imagen de cabecera para un blog corporativo B2B de tecnología (evidencia verificable, blockchain, trazabilidad). Estilo editorial limpio, técnico tipo "blueprint" con líneas finas, tonos azules y neutros, sin texto, sin logotipos, sin marcas de agua. Tema: ${body.prompt}`,
        }),
      });
      if (!res.ok) {
        console.error(`OpenAI image error [${res.status}]: ${await res.text()}`);
        return json({ error: res.status === 429 ? "La IA está saturada, prueba en un minuto" : "No se pudo generar la imagen" }, 502);
      }
      const out = await res.json();
      const b64 = out.data?.[0]?.b64_json;
      if (!b64) return json({ error: "La IA no devolvió imagen" }, 502);
      return json({ image: b64, mime: "image/png" });
    }

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers,
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        temperature: 0.6,
        response_format: { type: "json_schema", json_schema: { name: "article", strict: true, schema: articleSchema } },
        messages: [
          { role: "system", content: SYSTEM },
          {
            role: "user",
            content: `Escribe un ${KIND[body.kind]} de ${WORDS[body.length]} palabras.\nTema: ${body.topic}\n${body.notes ? `Notas e ideas a incluir:\n${body.notes}` : ""}`,
          },
        ],
      }),
    });
    if (!res.ok) {
      console.error(`OpenAI text error [${res.status}]: ${await res.text()}`);
      return json({ error: res.status === 429 ? "La IA está saturada, prueba en un minuto" : "No se pudo generar el artículo" }, 502);
    }
    const out = await res.json();
    const raw = JSON.parse(out.choices?.[0]?.message?.content ?? "{}");
    const normalized = {
      title: raw.title,
      description: raw.description,
      blocks: (raw.blocks ?? [])
        .map((b: { type: string; text: string; items: string[] }) =>
          b.type === "list" ? { type: "list", items: b.items } : { type: b.type, text: b.text })
        .filter((b: { text?: string; items?: string[] }) => (b.items ? b.items.length > 0 : !!b.text?.trim())),
    };
    const article = Article.safeParse(normalized);
    if (!article.success) return json({ error: "El artículo no tiene el formato esperado, inténtalo de nuevo" }, 502);
    return json(article.data);
  } catch (err) {
    console.error("blog-ai failed", err);
    return json({ error: "Error inesperado de la IA" }, 500);
  }
});
