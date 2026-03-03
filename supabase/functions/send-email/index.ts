import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// Simple in-memory rate limiter (per IP, resets on cold start)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute
const RATE_LIMIT_MAX = 5; // max 5 requests per minute per IP

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  entry.count++;
  return entry.count > RATE_LIMIT_MAX;
}

// Sanitize user input: strip HTML tags and limit length
function sanitize(input: unknown, maxLength = 500): string {
  if (typeof input !== "string") return "";
  return input
    .replace(/<[^>]*>/g, "") // strip HTML tags
    .replace(/[&<>"']/g, (ch) => {
      const map: Record<string, string> = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
      return map[ch] || ch;
    })
    .trim()
    .slice(0, maxLength);
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 255;
}

const VALID_TYPES = ["contact", "whitepaper", "newsletter"];
const VALID_ORG_TYPES = ["administracion-publica", "proveedor-identidad", "plataforma-regulada", "partner-integrador", "otro"];

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Rate limiting
  const clientIp = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (isRateLimited(clientIp)) {
    return new Response(
      JSON.stringify({ success: false, error: "Too many requests. Please try again later." }),
      { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  try {
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY is not configured");
    }

    const body = await req.json();
    const { type, data } = body;

    // Validate type
    if (!type || !VALID_TYPES.includes(type)) {
      return new Response(
        JSON.stringify({ success: false, error: "Invalid request type." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (!data || typeof data !== "object") {
      return new Response(
        JSON.stringify({ success: false, error: "Invalid request data." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    let subject = "";
    let contentHtml = "";

    switch (type) {
      case "contact": {
        const name = sanitize(data.name, 100);
        const company = sanitize(data.company, 100);
        const role = sanitize(data.role, 100);
        const email = sanitize(data.email, 255);
        const country = sanitize(data.country, 100);
        const orgType = VALID_ORG_TYPES.includes(data.orgType) ? data.orgType : "otro";
        const message = sanitize(data.message, 1000);

        if (!name || !company || !role || !country) {
          return new Response(
            JSON.stringify({ success: false, error: "Missing required fields." }),
            { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }
        if (!isValidEmail(email)) {
          return new Response(
            JSON.stringify({ success: false, error: "Invalid email address." }),
            { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }

        subject = `[iCommunity] Nuevo contacto: ${company} (${orgType})`;
        contentHtml = `
          <h2 style="margin:0 0 20px;font-size:20px;color:#0d3bad;">Nuevo formulario de contacto</h2>
          <table style="border-collapse:collapse;width:100%;">
            <tr><td style="padding:10px 14px;border-bottom:1px solid #e5e7eb;font-weight:600;color:#1a1f36;width:130px;">Nombre</td><td style="padding:10px 14px;border-bottom:1px solid #e5e7eb;color:#374151;">${name}</td></tr>
            <tr><td style="padding:10px 14px;border-bottom:1px solid #e5e7eb;font-weight:600;color:#1a1f36;">Empresa</td><td style="padding:10px 14px;border-bottom:1px solid #e5e7eb;color:#374151;">${company}</td></tr>
            <tr><td style="padding:10px 14px;border-bottom:1px solid #e5e7eb;font-weight:600;color:#1a1f36;">Cargo</td><td style="padding:10px 14px;border-bottom:1px solid #e5e7eb;color:#374151;">${role}</td></tr>
            <tr><td style="padding:10px 14px;border-bottom:1px solid #e5e7eb;font-weight:600;color:#1a1f36;">Email</td><td style="padding:10px 14px;border-bottom:1px solid #e5e7eb;color:#374151;">${email}</td></tr>
            <tr><td style="padding:10px 14px;border-bottom:1px solid #e5e7eb;font-weight:600;color:#1a1f36;">País</td><td style="padding:10px 14px;border-bottom:1px solid #e5e7eb;color:#374151;">${country}</td></tr>
            <tr><td style="padding:10px 14px;border-bottom:1px solid #e5e7eb;font-weight:600;color:#1a1f36;">Tipo org.</td><td style="padding:10px 14px;border-bottom:1px solid #e5e7eb;color:#374151;">${orgType}</td></tr>
            <tr><td style="padding:10px 14px;font-weight:600;color:#1a1f36;">Mensaje</td><td style="padding:10px 14px;color:#374151;">${message || "—"}</td></tr>
          </table>
        `;
        break;
      }
      case "whitepaper": {
        const company = sanitize(data.company, 100);
        const email = sanitize(data.email, 255);

        if (!company) {
          return new Response(
            JSON.stringify({ success: false, error: "Missing required fields." }),
            { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }
        if (!isValidEmail(email)) {
          return new Response(
            JSON.stringify({ success: false, error: "Invalid email address." }),
            { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }

        subject = `[iCommunity] Descarga whitepaper: ${company}`;
        contentHtml = `
          <h2 style="margin:0 0 20px;font-size:20px;color:#0d3bad;">Solicitud de descarga de Whitepaper</h2>
          <table style="border-collapse:collapse;width:100%;">
            <tr><td style="padding:10px 14px;border-bottom:1px solid #e5e7eb;font-weight:600;color:#1a1f36;width:130px;">Empresa</td><td style="padding:10px 14px;border-bottom:1px solid #e5e7eb;color:#374151;">${company}</td></tr>
            <tr><td style="padding:10px 14px;font-weight:600;color:#1a1f36;">Email</td><td style="padding:10px 14px;color:#374151;">${email}</td></tr>
          </table>
        `;
        break;
      }
      case "newsletter": {
        const name = sanitize(data.name, 100);
        const email = sanitize(data.email, 255);

        if (!name) {
          return new Response(
            JSON.stringify({ success: false, error: "Missing required fields." }),
            { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }
        if (!isValidEmail(email)) {
          return new Response(
            JSON.stringify({ success: false, error: "Invalid email address." }),
            { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }

        subject = `[iCommunity] Nueva suscripción newsletter: ${name}`;
        contentHtml = `
          <h2 style="margin:0 0 20px;font-size:20px;color:#0d3bad;">Nueva suscripción al newsletter</h2>
          <table style="border-collapse:collapse;width:100%;">
            <tr><td style="padding:10px 14px;border-bottom:1px solid #e5e7eb;font-weight:600;color:#1a1f36;width:130px;">Nombre</td><td style="padding:10px 14px;border-bottom:1px solid #e5e7eb;color:#374151;">${name}</td></tr>
            <tr><td style="padding:10px 14px;font-weight:600;color:#1a1f36;">Email</td><td style="padding:10px 14px;color:#374151;">${email}</td></tr>
          </table>
        `;
        break;
      }
      default:
        return new Response(
          JSON.stringify({ success: false, error: "Unknown email type." }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
    }

    const htmlBody = `
<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background-color:#f4f5f7;font-family:'Inter',Helvetica,Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f5f7;padding:40px 0;">
    <tr><td align="center">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
        <!-- Header -->
        <tr><td style="background:linear-gradient(135deg,#0d3bad 0%,#386df0 100%);padding:32px 40px;border-radius:12px 12px 0 0;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td>
                <span style="font-size:24px;font-weight:700;color:#ffffff;letter-spacing:-0.02em;">iCommunity</span>
                <span style="display:block;margin-top:4px;font-size:13px;color:rgba(255,255,255,0.75);font-weight:400;">Trust Infrastructure</span>
              </td>
            </tr>
          </table>
        </td></tr>
        <!-- Body -->
        <tr><td style="background-color:#ffffff;padding:32px 40px;border-left:1px solid #e5e7eb;border-right:1px solid #e5e7eb;">
          ${contentHtml}
        </td></tr>
        <!-- Footer -->
        <tr><td style="background-color:#ffffff;padding:20px 40px 28px;border-radius:0 0 12px 12px;border-left:1px solid #e5e7eb;border-right:1px solid #e5e7eb;border-bottom:1px solid #e5e7eb;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            <tr><td style="border-top:1px solid #e5e7eb;padding-top:20px;">
              <p style="margin:0;font-size:12px;color:#9ca3af;line-height:1.5;">
                Este correo ha sido generado automáticamente desde el formulario de <a href="https://icommunity.io" style="color:#386df0;text-decoration:none;">icommunity.io</a>.
              </p>
              <p style="margin:8px 0 0;font-size:12px;color:#9ca3af;">© ${new Date().getFullYear()} iCommunity Labs S.L.</p>
            </td></tr>
          </table>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "iCommunity <onboarding@resend.dev>",
        to: ["hello@icommunity.io"],
        subject,
        html: htmlBody,
      }),
    });

    const resData = await res.json();

    if (!res.ok) {
      // Don't leak Resend error details to client
      console.error(`Resend API error [${res.status}]:`, JSON.stringify(resData));
      return new Response(
        JSON.stringify({ success: false, error: "Failed to send email." }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: unknown) {
    console.error("Error sending email:", error);
    return new Response(
      JSON.stringify({ success: false, error: "An unexpected error occurred." }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
