const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 60 * 60_000;
const MAX_PER_WINDOW = 5;

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(key);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  entry.count++;
  return entry.count > MAX_PER_WINDOW;
}

const RESOURCES = `
- Casos de uso de blockchain: https://www.icommunity.io/recursos/casos-de-uso-blockchain
- Tokenización de pagos: https://www.icommunity.io/recursos/tokenizacion-de-pagos
- Tokenización inmobiliaria: https://www.icommunity.io/recursos/tokenizacion-inmobiliaria
- CertyPass (identidad y credenciales verificables): https://certypass.io
- Privaro (privacidad y datos): https://privaro.io
- iCOM (plataforma de sellado de tiempo y evidencia trazable): https://icom.icommunity.io
- Casos de éxito: https://www.icommunity.io/#cases
- Hablar con el equipo: https://www.icommunity.io/empresa
`;

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "Método no permitido" }, 405);

  // Payload validation
  let payload: { email?: unknown; sector?: unknown; useCase?: unknown; lang?: unknown };
  try {
    payload = await req.json();
  } catch {
    return json({ error: "Solicitud no válida" }, 400);
  }
  const email = typeof payload.email === "string" ? payload.email.trim() : "";
  const sector = typeof payload.sector === "string" ? payload.sector.trim().slice(0, 120) : "";
  const useCase = typeof payload.useCase === "string" ? payload.useCase.trim().slice(0, 2000) : "";
  const lang = payload.lang === "en" ? "en" : "es";

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 255) {
    return json({ error: lang === "es" ? "Email no válido" : "Invalid email" }, 400);
  }
  if (useCase.length < 30) {
    return json({ error: lang === "es" ? "Describe tu caso con algo más de detalle (mín. 30 caracteres)" : "Please describe your case in more detail (min. 30 characters)" }, 400);
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (isRateLimited(ip) || isRateLimited(email.toLowerCase())) {
    return json({ error: lang === "es" ? "Has alcanzado el límite de guías por hora. Inténtalo más tarde." : "Hourly limit reached. Please try again later." }, 429);
  }

  const apiKey = Deno.env.get("OPENAI_API_KEY");
  if (!apiKey) return json({ error: "Servicio no configurado" }, 500);

  const system = `Eres un consultor experto de iCommunity en cumplimiento normativo (GDPR, eIDAS 2, DORA, NIS2, AI Act, MiCA, normativa sectorial) y en evidencia verificable basada en sellado de tiempo y blockchain.
Genera una guía inicial personalizada y práctica para un responsable de cumplimiento. Responde en ${lang === "es" ? "español de España, tono profesional pero cercano" : "English, professional but approachable tone"}.
Formato Markdown con estas secciones (títulos con ##):
1. Resumen del caso
2. Riesgos y obligaciones normativas relevantes
3. Qué evidencia verificable conviene generar (qué registrar, cuándo, sellado de tiempo, evidencia trazable, conservación)
4. Plan de primeros pasos (3-5 pasos numerados)
5. Recursos recomendados (elige solo los pertinentes de esta lista, con su enlace en formato Markdown):
${RESOURCES}
Máximo unas 600 palabras. No inventes normativa. Termina recordando que es una orientación inicial y no asesoramiento jurídico.`;

  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        messages: [
          { role: "system", content: system },
          { role: "user", content: `Sector: ${sector || "no indicado"}\n\nCaso de uso:\n${useCase}` },
        ],
      }),
    });

    if (!res.ok) {
      const detail = await res.text();
      console.error("OpenAI error", res.status, detail);
      const msg =
        res.status === 429
          ? lang === "es" ? "El servicio está saturado. Inténtalo en unos minutos." : "Service busy. Try again in a few minutes."
          : lang === "es" ? "No se pudo generar la guía. Inténtalo de nuevo más tarde." : "Could not generate the guide. Please try again later.";
      return json({ error: msg }, res.status === 429 ? 429 : 502);
    }

    const data = await res.json();
    const guide: string = data?.choices?.[0]?.message?.content ?? "";
    if (!guide) return json({ error: lang === "es" ? "Respuesta vacía del modelo" : "Empty model response" }, 502);

    console.log("compliance-guide lead", { email, sector });
    return json({ guide });
  } catch (err) {
    console.error("compliance-guide failure", err);
    return json({ error: lang === "es" ? "Error inesperado" : "Unexpected error" }, 500);
  }
});
