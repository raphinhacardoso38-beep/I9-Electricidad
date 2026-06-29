import { createFileRoute } from "@tanstack/react-router";

import { ServicePage } from "@/components/site/ServicePage";
import electricidadImg from "@/assets/electricidad.jpg";

export const Route = createFileRoute("/electricidad")({
  head: () => ({
    meta: [
      { title: "Servicios Generales de Electricidad en Alicante | Presupuesto" },
      {
        name: "description",
        content:
          "Servicios eléctricos para viviendas, comunidades, oficinas, locales e industrias: instalaciones, reparaciones, averías, cuadros eléctricos, urgencias y más.",
      },
      { property: "og:title", content: "Servicios Generales de Electricidad" },
      {
        property: "og:description",
        content: "Instalaciones, reparaciones, averías, cuadros eléctricos y urgencias.",
      },
      { property: "og:image", content: electricidadImg },
    ],
  }),
  component: () => (
    <ServicePage
      tint="#EAF6FF"
      eyebrow="Electricidad"
      title="Servicios Generales de Electricidad"
      description="Prestamos todo tipo de servicios eléctricos para viviendas, comunidades, oficinas, locales comerciales e industrias."
      image={electricidadImg}
      imageAlt="Electricista trabajando en un cuadro eléctrico"
      services={[
        "Instalaciones eléctricas",
        "Reparaciones",
        "Averías",
        "Cortocircuitos",
        "Cuadros eléctricos",
        "Iluminación interior y exterior",
        "Enchufes e interruptores",
        "Automatización",
        "Instalaciones nuevas",
        "Reformas",
        "Mantenimiento preventivo",
        "Mantenimiento correctivo",
        "Certificados",
        "Servicio de urgencias",
      ]}
    />
  ),
});
