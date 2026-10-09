// AI helpers for the blog editor: article drafts, bulk idea plans, trend research and cover images.
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
const Kind = z.enum(["article", "case", "news"]);
const Source = z.object({ title: z.string().max(400), url: z.string().url().max(2000), outlet: z.string().max(200), summary: z.string().max(1500) });

const Body = z.discriminatedUnion("action", [
  z.object({
    action: z.literal("article"),
    topic: z.string().trim().min(5).max(500),
    notes: z.string().trim().max(4000).optional().default(""),
    kind: Kind,
    length: z.enum(["short", "medium", "long"]).default("medium"),
    source: Source.optional(),
  }),
  z.object({
    action: z.literal("ideas"),
    count: z.number().int().min(1).max(60),
    themes: z.string().trim().max(1500).optional().default(""),
  }),
  z.object({ action: z.literal("trends"), query: z.string().trim().max(300).optional().default("") }),
  z.object({ action: z.literal("cover"), prompt: z.string().trim().min(5).max(1500) }),
]);

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...corsHeaders, "Content-Type": "application/json" } });

class AiError extends Error {
  constructor(public status: number, message: string) { super(message); }
}

const WORDS = { short: "500-700", medium: "900-1200", long: "1500-2000" } as const;
const KIND = { article: "artículo divulgativo/técnico", case: "caso de éxito de cliente", news: "noticia corporativa" } as const;

const COMPANY = `iCommunity (iCommunity Labs & Tech S.L., Madrid): infraestructura de evidencia verificable con blockchain. Productos: CertyPass (pasaporte digital de producto y trazabilidad), CertyFile (certificación de documentos), Privaro (privacidad y protección de datos con IA), MusicDibs (registro de obras musicales).`;

const SYSTEM = `Eres el redactor de contenidos de ${COMPANY} Usa "sellado de tiempo" y "evidencia trazable". Escribe en español de España, tono profesional pero cercano, orientado a SEO (encabezados claros, frases cortas, sin relleno). No inventes cifras, clientes ni citas concretas: si hacen falta, usa marcadores como [dato a confirmar]. Termina con una llamada a la acción suave hacia iCommunity. La descripción debe tener 140-160 caracteres.`;

const DEFAULT_THEMES = "CertyPass y pasaporte digital de producto (DPP, ESPR), CertyFile y certificación de documentos, Privaro y protección de datos con IA, MusicDibs y registro de obras, cumplimiento normativo (eIDAS 2, NIS2, AI Act, RGPD), sellado de tiempo, trazabilidad de cadena de suministro, evidencia digital con validez legal, blockchain empresarial";

// Own and product domains never count as independent sources.
const OWN_DOMAINS = /(^|\.)(icommunity\.io|certypass\.com|certyfile\.com|privaro\.ai|musicdibs\.com)$/i;

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

const ideasSchema = {
  type: "object",
  additionalProperties: false,
  required: ["ideas"],
  properties: {
    ideas: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["title", "topic", "kind"],
        properties: {
          title: { type: "string" },
          topic: { type: "string", description: "Enfoque y puntos clave en 1-2 frases" },
          kind: { type: "string", enum: ["article", "case", "news"] },
        },
      },
    },
  },
};

const trendsSchema = {
  type: "object",
  additionalProperties: false,
  required: ["results"],
  properties: {
    results: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["title", "url", "outlet", "source_type", "date", "summary", "proposal_title", "proposal_angle"],
        properties: {
          source_type: { type: "string", enum: ["independent_media", "forum_community", "public_body", "company_or_vendor", "press_release"], description: "Quién publica la página" },
          title: { type: "string" },
          url: { type: "string" },
          outlet: { type: "string" },
          date: { type: "string", description: "YYYY-MM-DD" },
          summary: { type: "string", description: "1-2 frases en español" },
          proposal_title: { type: "string", description: "Título propuesto para un artículo del blog de iCommunity" },
          proposal_angle: { type: "string", description: "Ángulo del artículo y relación con los productos de iCommunity, 1-2 frases" },
        },
      },
    },
  },
};

const openAiHeaders = () => {
  const apiKey = Deno.env.get("OPENAI_API_KEY");
  if (!apiKey) throw new AiError(500, "Falta configurar la clave de IA");
  return { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" };
};

const failure = (status: number, what: string) =>
  new AiError(502, status === 429 ? "La IA está saturada, prueba en un minuto" : `No se pudo ${what}`);

async function chatJson<T>(name: string, schema: object, system: string, user: string, what: string): Promise<T> {
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: openAiHeaders(),
    body: JSON.stringify({
      model: "gpt-4.1-mini",
      temperature: 0.6,
      response_format: { type: "json_schema", json_schema: { name, strict: true, schema } },
      messages: [{ role: "system", content: system }, { role: "user", content: user }],
    }),
  });
  if (!res.ok) {
    console.error(`OpenAI ${name} error [${res.status}]: ${await res.text()}`);
    throw failure(res.status, what);
  }
  const out = await res.json();
  return JSON.parse(out.choices?.[0]?.message?.content ?? "{}") as T;
}

const hostOf = (u: string) => { try { return new URL(u).hostname.replace(/^www\./, ""); } catch { return ""; } };

/** Follows redirects and confirms the page exists; returns the final URL or null. */
async function verifyUrl(url: string): Promise<string | null> {
  try {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), 7000);
    const res = await fetch(url, { redirect: "follow", signal: ctrl.signal, headers: { "User-Agent": "Mozilla/5.0 (compatible; iCommunityBot/1.0)", Accept: "text/html" } });
    clearTimeout(t);
    await res.body?.cancel().catch(() => {});
    return res.ok ? res.url : null;
  } catch {
    return null;
  }
}

async function searchTrends(query: string) {
  const today = new Date().toISOString().slice(0, 10);
  const topic = query || "evidencia digital verificable, blockchain empresarial, pasaporte digital de producto, trazabilidad, eIDAS 2, sellado de tiempo, certificación de documentos, privacidad e IA, derechos de autor musicales";
  const prompt = `Hoy es ${today}. Busca en internet entre 6 y 8 noticias o análisis publicados en los últimos 30 días sobre: ${topic}.
Contexto del lector: ${COMPANY}
SOLO medios de comunicación independientes (prensa económica, tecnológica o sectorial), análisis de periodistas, organismos públicos o foros/comunidades. PROHIBIDO: notas de prensa, comunicados corporativos, blogs de empresas o proveedores hablando de sus productos, contenido patrocinado, marketing y webs de iCommunity o sus productos (icommunity.io, certypass, certyfile, privaro, musicdibs). Si un artículo existe para promocionar un producto o una empresa, descártalo.
Cada resultado debe ser un artículo concreto (no portadas, home pages ni páginas de producto) y distinto de los demás. Clasifica honestamente quién lo publica en "source_type". Para cada resultado indica la URL exacta del artículo, el medio, la fecha, un resumen en español y una propuesta de artículo para el blog de iCommunity (título y ángulo) que conecte la noticia con su propuesta de valor sin ser publicitario.`;

  const res = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: openAiHeaders(),
    body: JSON.stringify({
      model: "gpt-4.1",
      tools: [{ type: "web_search", search_context_size: "high" }],
      input: prompt,
      text: { format: { type: "json_schema", name: "trends", strict: true, schema: trendsSchema } },
    }),
  });
  if (!res.ok) {
    console.error(`OpenAI trends error [${res.status}]: ${await res.text()}`);
    throw failure(res.status, "buscar tendencias");
  }
  const out = await res.json();
  const text: string = (out.output ?? [])
    .flatMap((o: { type: string; content?: Array<{ type: string; text?: string }> }) => (o.type === "message" ? o.content ?? [] : []))
    .map((c: { text?: string }) => c.text ?? "")
    .join("");
  const parsed = JSON.parse(text || "{\"results\":[]}") as { results: Array<Record<string, string>> };

  const minDate = new Date(Date.now() - 45 * 86400_000).toISOString().slice(0, 10);
  const seen = new Set<string>();
  for (const r of parsed.results) r.date = (r.date ?? "").replace(/[\u2010-\u2015]/g, "-").slice(0, 10);
  const candidates = parsed.results.filter((r) => {
    if (!r.url?.startsWith("http") || OWN_DOMAINS.test(hostOf(r.url))) return false;
    if (!["independent_media", "forum_community", "public_body"].includes(r.source_type)) return false;
    if (/^\d{4}-\d{2}-\d{2}$/.test(r.date) && r.date < minDate) return false;
    let path = "";
    try { path = new URL(r.url).pathname.replace(/\/(es|en)\/?$/, "/"); } catch { return false; }
    if (path.split("/").filter(Boolean).length === 0) return false; // home pages are not articles
    const key = r.url.split(/[?#]/)[0].replace(/\/$/, "");
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
  const verified = await Promise.all(
    candidates.slice(0, 10).map(async (r) => {
      const finalUrl = await verifyUrl(r.url);
      if (!finalUrl || OWN_DOMAINS.test(hostOf(finalUrl))) return null;
      return {
        title: r.title, url: finalUrl.replace(/[?&]utm_source=openai$/, ""), outlet: r.outlet || hostOf(finalUrl), date: r.date,
        summary: r.summary, proposalTitle: r.proposal_title, proposalAngle: r.proposal_angle,
      };
    }),
  );
  return verified.filter((r) => r !== null);
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  try {
    const userId = await getCallerId(req);
    if (!userId) return json({ error: "Inicia sesión" }, 401);
    if (!(await hasBlogRole(userId, ["admin", "editor"]))) return json({ error: "Sin permiso de edición" }, 403);

    const parsed = Body.safeParse(await req.json().catch(() => null));
    if (!parsed.success) return json({ error: "Datos no válidos", details: parsed.error.flatten().fieldErrors }, 400);
    const body = parsed.data;

    if (body.action === "cover") {
      const res = await fetch("https://api.openai.com/v1/images/generations", {
        method: "POST",
        headers: openAiHeaders(),
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
        throw failure(res.status, "generar la imagen");
      }
      const out = await res.json();
      const b64 = out.data?.[0]?.b64_json;
      if (!b64) return json({ error: "La IA no devolvió imagen" }, 502);
      return json({ image: b64, mime: "image/png" });
    }

    if (body.action === "trends") {
      return json({ results: await searchTrends(body.query) });
    }

    if (body.action === "ideas") {
      const raw = await chatJson<{ ideas: Array<{ title: string; topic: string; kind: string }> }>(
        "ideas", ideasSchema,
        `Eres el content strategist del blog de ${COMPANY} Propones artículos útiles para responsables de cumplimiento, calidad, sostenibilidad, legal y operaciones en empresas y administraciones. Español de España.`,
        `Propón ${body.count} ideas de artículo distintas entre sí, variadas en tema y formato (mayoría "article", algún "case" solo si es un caso genérico sin cliente inventado, "news" solo para temas de actualidad normativa).\nTemas a cubrir de forma equilibrada: ${body.themes || DEFAULT_THEMES}.\nTítulos concretos y orientados a búsquedas reales, sin repetir enfoques.`,
        "generar las ideas",
      );
      const ideas = (raw.ideas ?? []).slice(0, body.count).map((i) => ({ title: i.title, topic: i.topic, kind: Kind.catch("article").parse(i.kind) }));
      return json({ ideas });
    }

    const sourceText = body.source
      ? `\nArtículo basado en esta noticia de un medio independiente (cítala con su nombre en el texto y añade al final un párrafo "Fuente: ${body.source.outlet} — ${body.source.url}"):\nTítulo: ${body.source.title}\nResumen: ${body.source.summary}`
      : "";
    const raw = await chatJson<{ title: string; description: string; blocks: Array<{ type: string; text: string; items: string[] }> }>(
      "article", articleSchema, SYSTEM,
      `Escribe un ${KIND[body.kind]} de ${WORDS[body.length]} palabras.\nTema: ${body.topic}\n${body.notes ? `Notas e ideas a incluir:\n${body.notes}` : ""}${sourceText}`,
      "generar el artículo",
    );
    const normalized = {
      title: raw.title,
      description: raw.description,
      blocks: (raw.blocks ?? [])
        .map((b) => (b.type === "list" ? { type: "list", items: b.items } : { type: b.type, text: b.text }))
        .filter((b: { text?: string; items?: string[] }) => (b.items ? b.items.length > 0 : !!b.text?.trim())),
    };
    const article = Article.safeParse(normalized);
    if (!article.success) return json({ error: "El artículo no tiene el formato esperado, inténtalo de nuevo" }, 502);
    return json(article.data);
  } catch (err) {
    if (err instanceof AiError) return json({ error: err.message }, err.status);
    console.error("blog-ai failed", err);
    return json({ error: "Error inesperado de la IA" }, 500);
  }
});
