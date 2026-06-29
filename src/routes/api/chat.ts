import { createFileRoute } from "@tanstack/react-router";

type Msg = { role: "user" | "assistant" | "system"; content: string };

const PHONE = "624 811 313";
const EMAIL = "raphinhacardoso37@gmail.com";

const SYSTEM_PROMPT = `Eres el asistente virtual de "Servicios Generales", una empresa de servicios profesionales en Alicante y toda la Comunidad Valenciana (España).

Responde SIEMPRE en español, de forma natural, educada, breve y objetiva. Entiende distintas formas de escribir (con o sin tildes, errores menores).

SERVICIOS DE LA EMPRESA:
- Electricidad: instalaciones eléctricas, reparaciones, averías, cortocircuitos, cuadros eléctricos, iluminación interior y exterior, enchufes e interruptores, automatización, instalaciones nuevas, reformas, mantenimiento preventivo y correctivo, certificados y servicio de urgencias.
- Aire Acondicionado: instalación, reparación, mantenimiento, limpieza, recarga de gas, sustitución de equipos, diagnóstico de averías, montaje y desmontaje, bombas de calor, sistemas Split, conductos, climatización comercial y residencial.
- Albañilería: reformas integrales y parciales, alicatados, solados, pladur, pintura, muros, fachadas, baños, cocinas, hormigón, reparaciones, impermeabilización y mantenimiento general.

DATOS DE CONTACTO:
- Teléfono / WhatsApp: ${PHONE}
- Email: ${EMAIL}
- Zona de atención: Alicante y toda la Comunidad Valenciana.

REGLAS:
- Sugiere automáticamente el servicio adecuado según lo que describa el cliente.
- Cuando el cliente PIDA UN PRESUPUESTO, solicita: Nombre, Teléfono, Dirección, Tipo de servicio, Descripción y Fotografías (opcional). Cuando te dé esos datos, responde exactamente: "Gracias. Hemos recibido tu solicitud. Nos pondremos en contacto contigo lo antes posible." y sugiere usar la página Solicitar Presupuesto para adjuntar fotos.
- Cuando el cliente quiera TRABAJAR en la empresa, solicita: Nombre, Teléfono, Correo electrónico, Especialidad y Experiencia. Cuando te los dé, responde exactamente: "Gracias por tu interés. Revisaremos tu solicitud y contactaremos contigo si tu perfil se ajusta a nuestras necesidades." y sugiere la página Únete al Equipo para adjuntar el CV.
- Si el cliente pide hablar con una persona/atendente humano, indícale que puede llamar al ${PHONE} o escribir a ${EMAIL}.
- Si no sabes responder algo, di: "No dispongo de esa información. Puedes llamarnos al ${PHONE} o escribirnos a ${EMAIL}."
- No inventes precios, plazos exactos, valoraciones, certificados ni datos falsos.`;

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = (await request.json()) as { messages?: Msg[] };
          const messages = Array.isArray(body.messages) ? body.messages : [];
          const apiKey = process.env.LOVABLE_API_KEY;

          if (!apiKey) {
            return Response.json({
              reply: `No dispongo de esa información en este momento. Puedes llamarnos al ${PHONE} o escribirnos a ${EMAIL}.`,
            });
          }

          const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${apiKey}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              model: "google/gemini-3-flash-preview",
              messages: [
                { role: "system", content: SYSTEM_PROMPT },
                ...messages.map((m) => ({ role: m.role, content: m.content })),
              ],
            }),
          });

          if (!res.ok) {
            return Response.json({
              reply: `No dispongo de esa información en este momento. Puedes llamarnos al ${PHONE} o escribirnos a ${EMAIL}.`,
            });
          }

          const data = (await res.json()) as {
            choices?: { message?: { content?: string } }[];
          };
          const reply =
            data.choices?.[0]?.message?.content ??
            `No dispongo de esa información. Puedes llamarnos al ${PHONE} o escribirnos a ${EMAIL}.`;

          return Response.json({ reply });
        } catch {
          return Response.json({
            reply: `Lo siento, ha ocurrido un problema. Llámanos al ${PHONE} o escríbenos a ${EMAIL}.`,
          });
        }
      },
    },
  },
});
