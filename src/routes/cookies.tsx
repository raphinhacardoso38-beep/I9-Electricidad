import { createFileRoute } from "@tanstack/react-router";

import { LegalLayout } from "@/components/site/ServicePage";

export const Route = createFileRoute("/cookies")({
  head: () => ({
    meta: [
      { title: "Política de Cookies | Servicios Generales" },
      { name: "description", content: "Información sobre el uso de cookies en este sitio web." },
    ],
  }),
  component: () => (
    <LegalLayout title="Política de Cookies">
      <p>
        Una cookie es un pequeño archivo que se almacena en tu dispositivo al visitar una página
        web. Este sitio utiliza cookies estrictamente necesarias para su correcto funcionamiento.
      </p>
      <h2>Tipos de cookies</h2>
      <p>
        Utilizamos cookies técnicas necesarias para la navegación y el funcionamiento básico del
        sitio. No utilizamos cookies de publicidad de terceros.
      </p>
      <h2>Gestión de cookies</h2>
      <p>
        Puedes configurar tu navegador para aceptar o rechazar las cookies, así como para eliminar
        las ya almacenadas. Consulta la ayuda de tu navegador para más información.
      </p>
    </LegalLayout>
  ),
});
