import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Check } from "lucide-react";

import { Button } from "@/components/ui/button";

type ServicePageProps = {
  eyebrow: string;
  title: string;
  description: string;
  services: string[];
  tint: string; // background tint css color
  image: string;
  imageAlt: string;
};

export function ServicePage({
  eyebrow,
  title,
  description,
  services,
  tint,
  image,
  imageAlt,
}: ServicePageProps) {
  return (
    <div style={{ backgroundColor: tint }}>
      <section className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:py-20 lg:px-8">
        <div className="animate-fade-up">
          <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
            {eyebrow}
          </span>
          <h1 className="mt-4 text-3xl font-extrabold leading-tight text-foreground sm:text-4xl lg:text-5xl">
            {title}
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {description}
          </p>
          <div className="mt-7">
            <Button asChild size="lg">
              <Link to="/presupuesto">Solicitar Presupuesto</Link>
            </Button>
          </div>
        </div>
        <div className="animate-fade-up overflow-hidden rounded-3xl shadow-card">
          <img
            src={image}
            alt={imageAlt}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-foreground sm:text-3xl">Nuestros servicios</h2>
        <p className="mt-2 text-muted-foreground">
          Trabajos realizados por profesionales con garantía y atención cercana.
        </p>
        <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <li
              key={s}
              className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3.5 shadow-soft transition-transform hover:-translate-y-0.5"
            >
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-success/15 text-success">
                <Check className="h-4 w-4" />
              </span>
              <span className="text-sm font-medium text-card-foreground">{s}</span>
            </li>
          ))}
        </ul>

        <div className="mt-12 flex flex-col items-start gap-4 rounded-2xl bg-primary px-6 py-8 text-primary-foreground sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-lg font-bold">¿Necesitas este servicio?</p>
            <p className="text-sm opacity-90">Solicita tu presupuesto sin compromiso.</p>
          </div>
          <Button asChild size="lg" variant="secondary">
            <Link to="/presupuesto">Solicitar Presupuesto</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}

export function LegalLayout({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:py-20 lg:px-8">
      <h1 className="text-3xl font-extrabold text-foreground sm:text-4xl">{title}</h1>
      <div className="mt-8 space-y-5 text-sm leading-relaxed text-muted-foreground [&_h2]:mt-8 [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:text-foreground">
        {children}
      </div>
    </div>
  );
}
