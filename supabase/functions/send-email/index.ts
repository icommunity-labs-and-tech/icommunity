import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY is not configured");
    }

    const { type, data } = await req.json();

    let subject = "";
    let contentHtml = "";

    switch (type) {
      case "contact": {
        subject = `[iCommunity] Nuevo contacto: ${data.company} (${data.orgType})`;
        contentHtml = `
          <h2 style="margin:0 0 20px;font-size:20px;color:#0d3bad;">Nuevo formulario de contacto</h2>
          <table style="border-collapse:collapse;width:100%;">
            <tr><td style="padding:10px 14px;border-bottom:1px solid #e5e7eb;font-weight:600;color:#1a1f36;width:130px;">Nombre</td><td style="padding:10px 14px;border-bottom:1px solid #e5e7eb;color:#374151;">${data.name}</td></tr>
            <tr><td style="padding:10px 14px;border-bottom:1px solid #e5e7eb;font-weight:600;color:#1a1f36;">Empresa</td><td style="padding:10px 14px;border-bottom:1px solid #e5e7eb;color:#374151;">${data.company}</td></tr>
            <tr><td style="padding:10px 14px;border-bottom:1px solid #e5e7eb;font-weight:600;color:#1a1f36;">Cargo</td><td style="padding:10px 14px;border-bottom:1px solid #e5e7eb;color:#374151;">${data.role}</td></tr>
            <tr><td style="padding:10px 14px;border-bottom:1px solid #e5e7eb;font-weight:600;color:#1a1f36;">Email</td><td style="padding:10px 14px;border-bottom:1px solid #e5e7eb;color:#374151;"><a href="mailto:${data.email}" style="color:#386df0;">${data.email}</a></td></tr>
            <tr><td style="padding:10px 14px;border-bottom:1px solid #e5e7eb;font-weight:600;color:#1a1f36;">País</td><td style="padding:10px 14px;border-bottom:1px solid #e5e7eb;color:#374151;">${data.country}</td></tr>
            <tr><td style="padding:10px 14px;border-bottom:1px solid #e5e7eb;font-weight:600;color:#1a1f36;">Tipo org.</td><td style="padding:10px 14px;border-bottom:1px solid #e5e7eb;color:#374151;">${data.orgType}</td></tr>
            <tr><td style="padding:10px 14px;font-weight:600;color:#1a1f36;">Mensaje</td><td style="padding:10px 14px;color:#374151;">${data.message || "—"}</td></tr>
          </table>
        `;
        break;
      }
      case "whitepaper": {
        subject = `[iCommunity] Descarga whitepaper: ${data.company}`;
        contentHtml = `
          <h2 style="margin:0 0 20px;font-size:20px;color:#0d3bad;">Solicitud de descarga de Whitepaper</h2>
          <table style="border-collapse:collapse;width:100%;">
            <tr><td style="padding:10px 14px;border-bottom:1px solid #e5e7eb;font-weight:600;color:#1a1f36;width:130px;">Empresa</td><td style="padding:10px 14px;border-bottom:1px solid #e5e7eb;color:#374151;">${data.company}</td></tr>
            <tr><td style="padding:10px 14px;font-weight:600;color:#1a1f36;">Email</td><td style="padding:10px 14px;color:#374151;"><a href="mailto:${data.email}" style="color:#386df0;">${data.email}</a></td></tr>
          </table>
        `;
        break;
      }
      case "newsletter": {
        subject = `[iCommunity] Nueva suscripción newsletter: ${data.name}`;
        contentHtml = `
          <h2 style="margin:0 0 20px;font-size:20px;color:#0d3bad;">Nueva suscripción al newsletter</h2>
          <table style="border-collapse:collapse;width:100%;">
            <tr><td style="padding:10px 14px;border-bottom:1px solid #e5e7eb;font-weight:600;color:#1a1f36;width:130px;">Nombre</td><td style="padding:10px 14px;border-bottom:1px solid #e5e7eb;color:#374151;">${data.name}</td></tr>
            <tr><td style="padding:10px 14px;font-weight:600;color:#1a1f36;">Email</td><td style="padding:10px 14px;color:#374151;"><a href="mailto:${data.email}" style="color:#386df0;">${data.email}</a></td></tr>
          </table>
        `;
        break;
      }
      default:
        throw new Error(`Unknown email type: ${type}`);
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
      throw new Error(`Resend API error [${res.status}]: ${JSON.stringify(resData)}`);
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: unknown) {
    console.error("Error sending email:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
