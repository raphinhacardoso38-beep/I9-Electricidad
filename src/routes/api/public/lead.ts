import { createFileRoute } from "@tanstack/react-router";

const EMAIL = "i9electricidad@gmail.com";

type Attachment = { filename: string; content: string }; // content = base64

type LeadBody = {
  type: "presupuesto" | "empleo";
  subject?: string;
  fields?: Record<string, string>;
  attachments?: Attachment[];
};

function renderHtml(type: string, fields: Record<string, string>) {
  const rows = Object.entries(fields)
    .map(
      ([k, v]) =>
        `<tr><td style="padding:8px 12px;font-weight:600;background:#f3f6fb;border:1px solid #e5eaf2">${k}</td><td style="padding:8px 12px;border:1px solid #e5eaf2">${(v || "-")
          .replace(/</g, "&lt;")
          .replace(/\n/g, "<br>")}</td></tr>`,
    )
    .join("");
  const title =
    type === "empleo" ? "Nueva solicitud de empleo" : "Nueva solicitud de presupuesto";
  return `<div style="font-family:Arial,sans-serif;max-width:640px;margin:0 auto">
    <h2 style="color:#1f5fbf">${title}</h2>
    <table style="border-collapse:collapse;width:100%">${rows}</table>
    <p style="color:#888;font-size:12px;margin-top:16px">Enviado desde el sitio web de Servicios Generales.</p>
  </div>`;
}

export const Route = createFileRoute("/api/public/lead")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = (await request.json()) as LeadBody;
          const fields = body.fields ?? {};
          const apiKey = process.env.RESEND_API_KEY;
          const subject =
            body.subject ??
            (body.type === "empleo"
              ? "Nueva solicitud de empleo"
              : "Nueva solicitud de presupuesto");

          if (!apiKey) {
            console.log("[LEAD] (sin RESEND_API_KEY)", body.type, JSON.stringify(fields));
            return Response.json({
              ok: true,
              delivered: false,
              message:
                "Solicitud recibida. El envío automático por email aún no está configurado.",
            });
          }

          const res = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${apiKey}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              from: "I9 Electricidad <onboarding@resend.dev>",
              to: [EMAIL],
              reply_to: fields["Correo electrónico"] || undefined,
              subject,
              html: renderHtml(body.type, fields),
              attachments: (body.attachments ?? []).slice(0, 5).map((a) => ({
                filename: a.filename,
                content: a.content,
              })),
            }),
          });

          if (!res.ok) {
            const text = await res.text();
            console.error("[LEAD] resend error", text);
            return Response.json(
              { ok: false, message: "No se pudo enviar el email." },
              { status: 502 },
            );
          }

          return Response.json({ ok: true, delivered: true });
        } catch (e) {
          console.error("[LEAD] error", e);
          return Response.json({ ok: false, message: "Error en el servidor." }, { status: 500 });
        }
      },
    },
  },
});
