import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, MessageCircle } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { whatsappUrl } from "@/lib/site-config";


export const Route = createFileRoute("/unete")({
  head: () => ({
    meta: [
      { title: "Únete al Equipo | Servicios Generales Alicante" },
      {
        name: "description",
        content:
          "¿Quieres trabajar con nosotros? Únete a nuestro equipo de electricidad, aire acondicionado o albañilería en Alicante y la Comunidad Valenciana.",
      },
      { property: "og:title", content: "Únete al Equipo" },
      { property: "og:description", content: "Forma parte de nuestro equipo de profesionales." },
    ],
  }),
  component: Unete,
});

const ESPECIALIDADES = ["Electricidad", "Aire Acondicionado", "Albañilería", "Otro"];

function Unete() {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [cv, setCv] = useState<File | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const fields: Record<string, string> = {
      "Nombre completo": String(fd.get("nombre") || ""),
      Teléfono: String(fd.get("telefono") || ""),
      "Correo electrónico": String(fd.get("email") || ""),
      Ciudad: String(fd.get("ciudad") || ""),
      Especialidad: String(fd.get("especialidad") || ""),
      "Experiencia profesional": String(fd.get("experiencia") || ""),
    };

    if (!fields["Nombre completo"] || !fields.Teléfono || !fields.Especialidad) {
      toast.error("Completa nombre, teléfono y especialidad.");
      return;
    }

    setLoading(true);
    try {
      const attachments: LeadAttachment[] = [];
      if (cv && cv.size <= 5 * 1024 * 1024) {
        attachments.push({ filename: cv.name, content: await fileToBase64(cv) });
      }
      const res = await submitLead({
        type: "empleo",
        subject: `Empleo: ${fields.Especialidad} - ${fields["Nombre completo"]}`,
        fields,
        attachments,
      });
      if (res.ok) {
        setDone(true);
        form.reset();
        setCv(null);
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
        <h1 className="mt-6 text-2xl font-bold">¡Solicitud recibida!</h1>
        <p className="mt-3 text-muted-foreground">
          Gracias por tu interés. Revisaremos tu solicitud y contactaremos contigo si tu perfil se
          ajusta a nuestras necesidades.
        </p>
        <Button className="mt-6" onClick={() => setDone(false)}>
          Enviar otra solicitud
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-secondary/40">
      <div className="mx-auto max-w-2xl px-4 py-14 sm:px-6 lg:py-20 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold sm:text-4xl">Únete al Equipo</h1>
          <p className="mt-3 text-muted-foreground">
            ¿Quieres formar parte de nuestro equipo? Completa el formulario y nos pondremos en
            contacto contigo.
          </p>
        </div>

        <form
          onSubmit={onSubmit}
          className="mt-10 space-y-5 rounded-2xl border border-border bg-card p-6 shadow-card sm:p-8"
        >
          <Field label="Nombre completo" name="nombre" required />
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Teléfono" name="telefono" type="tel" required />
            <Field label="Correo electrónico" name="email" type="email" />
          </div>
          <Field label="Ciudad" name="ciudad" />
          <div className="space-y-2">
            <Label htmlFor="especialidad">
              Especialidad <span className="text-destructive">*</span>
            </Label>
            <select
              id="especialidad"
              name="especialidad"
              required
              defaultValue=""
              className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              <option value="" disabled>
                Selecciona tu especialidad
              </option>
              {ESPECIALIDADES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="experiencia">Experiencia profesional</Label>
            <Textarea
              id="experiencia"
              name="experiencia"
              rows={4}
              placeholder="Cuéntanos sobre tu experiencia..."
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cv">Adjuntar CV (PDF o DOC)</Label>
            <Input
              id="cv"
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(e) => setCv(e.target.files?.[0] ?? null)}
              className="cursor-pointer"
            />
            {cv && <p className="text-xs text-muted-foreground">{cv.name}</p>}
          </div>
          <Button type="submit" size="lg" className="w-full" disabled={loading}>
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            {loading ? "Enviando..." : "Enviar Solicitud"}
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
