import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, Loader2, Mail, Phone } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { COMPANY, mailtoUrl, telUrl } from "@/lib/site-config";
import { fileToBase64, submitLead, type LeadAttachment } from "@/lib/leads";

export const Route = createFileRoute("/presupuesto")({
  head: () => ({
    meta: [
      { title: "Solicitar Presupuesto | Servicios Generales Alicante" },
      {
        name: "description",
        content:
          "Solicita tu presupuesto sin compromiso para electricidad, aire acondicionado o albañilería en Alicante y la Comunidad Valenciana.",
      },
      { property: "og:title", content: "Solicitar Presupuesto" },
      { property: "og:description", content: "Pide tu presupuesto sin compromiso." },
    ],
  }),
  component: Presupuesto,
});

const SERVICIOS = ["Electricidad", "Aire Acondicionado", "Albañilería", "Otro"];

function Presupuesto() {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const fields: Record<string, string> = {
      Nombre: String(fd.get("nombre") || ""),
      Apellidos: String(fd.get("apellidos") || ""),
      Teléfono: String(fd.get("telefono") || ""),
      "Correo electrónico": String(fd.get("email") || ""),
      Dirección: String(fd.get("direccion") || ""),
      "Tipo de servicio": String(fd.get("servicio") || ""),
      "Descripción del trabajo": String(fd.get("descripcion") || ""),
    };

    if (!fields.Nombre || !fields.Teléfono || !fields["Tipo de servicio"]) {
      toast.error("Completa nombre, teléfono y tipo de servicio.");
      return;
    }

    setLoading(true);
    try {
      const attachments: LeadAttachment[] = [];
      for (const f of files.slice(0, 5)) {
        if (f.size > 4 * 1024 * 1024) continue;
        attachments.push({ filename: f.name, content: await fileToBase64(f) });
      }
      const res = await submitLead({
        type: "presupuesto",
        subject: `Presupuesto: ${fields["Tipo de servicio"]} - ${fields.Nombre}`,
        fields,
        attachments,
      });
      if (res.ok) {
        setDone(true);
        form.reset();
        setFiles([]);
      } else {
        toast.error(res.message || "No se pudo enviar. Inténtalo de nuevo.");
      }
    } finally {
      setLoading(false);
    }
  }

  if (done) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center sm:px-6">
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-success/15 text-success">
          <CheckCircle2 className="h-8 w-8" />
        </span>
        <h1 className="mt-6 text-2xl font-bold">¡Solicitud enviada!</h1>
        <p className="mt-3 text-muted-foreground">
          Gracias. Hemos recibido tu solicitud. Nos pondremos en contacto contigo lo antes posible.
        </p>
        <Button className="mt-6" onClick={() => setDone(false)}>
          Enviar otra solicitud
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-accent/30">
      <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:py-20 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold sm:text-4xl">Solicitar Presupuesto</h1>
          <p className="mt-3 text-muted-foreground">
            Rellena el formulario y te responderemos lo antes posible. Sin compromiso.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3 text-sm">
            <a href={telUrl} className="inline-flex items-center gap-2 font-semibold text-primary">
              <Phone className="h-4 w-4" /> {COMPANY.phone}
            </a>
            <a href={mailtoUrl} className="inline-flex items-center gap-2 font-semibold text-primary">
              <Mail className="h-4 w-4" /> {COMPANY.email}
            </a>
          </div>
        </div>

        <form
          onSubmit={onSubmit}
          className="mt-10 space-y-5 rounded-2xl border border-border bg-card p-6 shadow-card sm:p-8"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Nombre" name="nombre" required />
            <Field label="Apellidos" name="apellidos" />
            <Field label="Teléfono" name="telefono" type="tel" required />
            <Field label="Correo electrónico" name="email" type="email" />
          </div>
          <Field label="Dirección" name="direccion" />
          <div className="space-y-2">
            <Label htmlFor="servicio">
              Tipo de servicio <span className="text-destructive">*</span>
            </Label>
            <select
              id="servicio"
              name="servicio"
              required
              defaultValue=""
              className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              <option value="" disabled>
                Selecciona un servicio
              </option>
              {SERVICIOS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="descripcion">Descripción del trabajo</Label>
            <Textarea id="descripcion" name="descripcion" rows={4} placeholder="Cuéntanos qué necesitas..." />
          </div>
          <div className="space-y-2">
            <Label htmlFor="fotos">Adjuntar fotografías (opcional)</Label>
            <Input
              id="fotos"
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => setFiles(Array.from(e.target.files ?? []))}
              className="cursor-pointer"
            />
            {files.length > 0 && (
              <p className="text-xs text-muted-foreground">{files.length} archivo(s) seleccionado(s)</p>
            )}
          </div>
          <Button type="submit" size="lg" className="w-full" disabled={loading}>
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            {loading ? "Enviando..." : "Enviar Presupuesto"}
          </Button>
        </form>
      </div>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={name}>
        {label} {required && <span className="text-destructive">*</span>}
      </Label>
      <Input id={name} name={name} type={type} required={required} />
    </div>
  );
}
