import { Link } from "@tanstack/react-router";
import { Mail, Phone } from "lucide-react";

import { COMPANY, mailtoUrl, telUrl, whatsappUrl } from "@/lib/site-config";
import logo from "@/assets/i9-logo.jpg.asset.json";

const serviceLinks = [
  { label: "Inicio", to: "/" },
  { label: "Electricidad", to: "/electricidad" },
  { label: "Aire Acondicionado", to: "/aire-acondicionado" },
  { label: "Albañilería", to: "/albanileria" },
  { label: "Solicitar Presupuesto", to: "/presupuesto" },
  { label: "Únete al Equipo", to: "/unete" },
] as const;

const legalLinks = [
  { label: "Política de Privacidad", to: "/privacidad" },
  { label: "Aviso Legal", to: "/aviso-legal" },
  { label: "Política de Cookies", to: "/cookies" },
] as const;

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-secondary/50">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div className="lg:col-span-1">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center overflow-hidden rounded-xl bg-foreground ring-1 ring-border">
              <img src={logo.url} alt="I9 Electricidad" className="h-full w-full object-cover" />
            </span>
            <span className="text-sm font-bold tracking-tight">{COMPANY.name}</span>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            Servicios profesionales de electricidad, aire acondicionado y albañilería en{" "}
            {COMPANY.region}.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold">Servicios</h3>
          <ul className="mt-4 space-y-2.5">
            {serviceLinks.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold">Legal</h3>
          <ul className="mt-4 space-y-2.5">
            {legalLinks.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold">Contacto</h3>
          <ul className="mt-4 space-y-3">
            <li>
              <a
                href={telUrl}
                className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                <Phone className="h-4 w-4 shrink-0" /> {COMPANY.phone}
              </a>
            </li>
            <li>
              <a
                href={whatsappUrl()}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                <Phone className="h-4 w-4 shrink-0" /> WhatsApp
              </a>
            </li>
            <li>
              <a
                href={mailtoUrl}
                className="flex items-center gap-2 break-all text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                <Mail className="h-4 w-4 shrink-0" /> {COMPANY.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 py-5 text-center text-xs text-muted-foreground sm:px-6 lg:px-8">
          © 2026 {COMPANY.name}. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
