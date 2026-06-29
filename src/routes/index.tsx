import { createFileRoute, Link } from "@tanstack/react-router";
import { AirVent, ArrowRight, Briefcase, Hammer, MessageCircle, Phone, ShieldCheck, Sparkles, Zap } from "lucide-react";

import { Button } from "@/components/ui/button";
import { COMPANY, telUrl, whatsappUrl } from "@/lib/site-config";
import heroImg from "@/assets/hero.jpg";
import electricidadImg from "@/assets/electricidad.jpg";
import aireImg from "@/assets/aire.jpg";
import albanileriaImg from "@/assets/albanileria.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title:
          "Servicios Generales en Alicante | Electricidad, Aire Acondicionado y Albañilería",
      },
      {
        name: "description",
        content:
          "Empresa de servicios generales en Alicante y la Comunidad Valenciana. Electricidad, aire acondicionado y albañilería. Solicita tu presupuesto sin compromiso.",
      },
      {
        property: "og:title",
        content: "Servicios Generales en Alicante y Comunidad Valenciana",
      },
      {
        property: "og:description",
        content:
          "Electricidad, aire acondicionado y albañilería con profesionales de confianza. Presupuesto sin compromiso.",
      },
      { property: "og:image", content: heroImg },
    ],
  }),
  component: Home,
});

const SERVICES = [
  {
    icon: Zap,
    title: "Electricidad",
    text: "Instalaciones, reparaciones, averías, cuadros eléctricos, iluminación y urgencias.",
    to: "/electricidad" as const,
    image: electricidadImg,
  },
  {
    icon: AirVent,
    title: "Aire Acondicionado",
    text: "Instalación, mantenimiento, recarga de gas, bombas de calor y sistemas Split.",
    to: "/aire-acondicionado" as const,
    image: aireImg,
  },
  {
    icon: Hammer,
    title: "Albañilería",
    text: "Reformas integrales, baños, cocinas, alicatados, pladur, pintura y fachadas.",
    to: "/albanileria" as const,
    image: albanileriaImg,
  },
];

const FEATURES = [
  { icon: ShieldCheck, title: "Profesionales de confianza", text: "Trabajos con garantía y atención cercana." },
  { icon: Phone, title: "Servicio de urgencias", text: "Respondemos rápido cuando más lo necesitas." },
  { icon: Sparkles, title: "Acabados de calidad", text: "Cuidamos cada detalle de principio a fin." },
];

function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-accent/40 to-background">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:gap-12 lg:py-24 lg:px-8">
          <div className="animate-fade-up">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" /> {COMPANY.region}
            </span>
            <h1 className="mt-5 text-4xl font-extrabold leading-[1.05] text-foreground sm:text-5xl lg:text-6xl">
              Servicios Generales <span className="text-primary">profesionales</span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Expertos en electricidad, aire acondicionado y albañilería para viviendas,
              comunidades, oficinas, locales e industrias. Calidad, confianza y atención cercana.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link to="/presupuesto">
                  Solicitar Presupuesto <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href={telUrl}>
                  <Phone className="h-4 w-4" /> Llamar Ahora
                </a>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href={whatsappUrl("Hola, me gustaría más información.")} target="_blank" rel="noreferrer">
                  <MessageCircle className="h-4 w-4" /> WhatsApp
                </a>
              </Button>
              <Button asChild size="lg" variant="ghost">
                <Link to="/unete">
                  <Briefcase className="h-4 w-4" /> Únete al Equipo
                </Link>
              </Button>
            </div>
          </div>
          <div className="animate-fade-up overflow-hidden rounded-3xl shadow-card">
            <img
              src={heroImg}
              alt="Servicios generales: electricidad, aire acondicionado y construcción"
              width={1280}
              height={960}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">Nuestros servicios</h2>
          <p className="mt-3 text-muted-foreground">
            Tres especialidades, un solo equipo de confianza para todo lo que tu hogar o negocio
            necesita.
          </p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {SERVICES.map((s) => (
            <Link
              key={s.title}
              to={s.to}
              className="group overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition-all hover:-translate-y-1 hover:shadow-card"
            >
              <div className="relative h-44 overflow-hidden">
                <img
                  src={s.image}
                  alt={s.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary">
                  <s.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-lg font-bold text-card-foreground">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                  Ver más <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="bg-secondary/50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-3">
            {FEATURES.map((f) => (
              <div key={f.title} className="flex gap-4">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-primary text-primary-foreground">
                  <f.icon className="h-6 w-6" />
                </span>
                <div>
                  <h3 className="font-semibold text-foreground">{f.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{f.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start gap-6 rounded-3xl bg-primary px-6 py-10 text-primary-foreground sm:px-10 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-bold sm:text-3xl">¿Listo para empezar tu proyecto?</h2>
            <p className="mt-2 max-w-xl opacity-90">
              Cuéntanos qué necesitas y te enviaremos un presupuesto sin compromiso.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg" variant="secondary">
              <Link to="/presupuesto">Solicitar Presupuesto</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground/10">
              <a href={telUrl}>
                <Phone className="h-4 w-4" /> {COMPANY.phone}
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
