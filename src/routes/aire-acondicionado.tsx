import { createFileRoute } from "@tanstack/react-router";

import { ServicePage } from "@/components/site/ServicePage";
import aireImg from "@/assets/aire.jpg";

export const Route = createFileRoute("/aire-acondicionado")({
  head: () => ({
    meta: [
      { title: "Servicios Generales de Aire Acondicionado en Alicante | Presupuesto" },
      {
        name: "description",
        content:
          "Climatización para viviendas, comercios, oficinas y empresas: instalación, reparación, mantenimiento, recarga de gas, bombas de calor y sistemas Split.",
      },
      { property: "og:title", content: "Servicios Generales de Aire Acondicionado" },
      {
        property: "og:description",
        content: "Instalación, reparación y mantenimiento de aire acondicionado y climatización.",
      },
      { property: "og:image", content: aireImg },
    ],
  }),
  component: () => (
    <ServicePage
      tint="#FFFFFF"
      eyebrow="Aire Acondicionado"
      title="Servicios Generales de Aire Acondicionado"
      description="Realizamos todo tipo de trabajos relacionados con climatización para viviendas, comercios, oficinas y empresas."
      image={aireImg}
      imageAlt="Técnico instalando un equipo de aire acondicionado"
      services={[
        "Instalación",
        "Reparación",
        "Mantenimiento",
        "Limpieza",
        "Recarga de gas",
        "Sustitución de equipos",
        "Diagnóstico de averías",
        "Montaje",
        "Desmontaje",
        "Bombas de calor",
        "Sistemas Split",
        "Conductos",
        "Climatización comercial",
        "Climatización residencial",
      ]}
    />
  ),
});
