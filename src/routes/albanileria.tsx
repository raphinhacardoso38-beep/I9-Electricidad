import { createFileRoute } from "@tanstack/react-router";

import { ServicePage } from "@/components/site/ServicePage";
import albanileriaImg from "@/assets/albanileria.jpg";

export const Route = createFileRoute("/albanileria")({
  head: () => ({
    meta: [
      { title: "Servicios Generales de Albañilería y Reformas en Alicante | Presupuesto" },
      {
        name: "description",
        content:
          "Construcción, reformas y mantenimiento para particulares y empresas: reformas integrales, baños, cocinas, alicatados, pladur, pintura, fachadas e impermeabilización.",
      },
      { property: "og:title", content: "Servicios Generales de Albañilería" },
      {
        property: "og:description",
        content: "Reformas integrales, baños, cocinas, alicatados, pladur, pintura y fachadas.",
      },
      { property: "og:image", content: albanileriaImg },
    ],
  }),
  component: () => (
    <ServicePage
      tint="#F3F3F3"
      eyebrow="Albañilería"
      title="Servicios Generales de Albañilería"
      description="Realizamos todo tipo de trabajos de construcción, reformas y mantenimiento para particulares y empresas."
      image={albanileriaImg}
      imageAlt="Albañil realizando una reforma de baño"
      services={[
        "Reformas integrales",
        "Reformas parciales",
        "Alicatados",
        "Solados",
        "Pladur",
        "Pintura",
        "Muros",
        "Fachadas",
        "Baños",
        "Cocinas",
        "Hormigón",
        "Reparaciones",
        "Impermeabilización",
        "Mantenimiento general",
      ]}
    />
  ),
});
