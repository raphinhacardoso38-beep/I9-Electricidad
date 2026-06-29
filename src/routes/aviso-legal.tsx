import { createFileRoute } from "@tanstack/react-router";

import { LegalLayout } from "@/components/site/ServicePage";
import { COMPANY } from "@/lib/site-config";

export const Route = createFileRoute("/aviso-legal")({
  head: () => ({
    meta: [
      { title: "Aviso Legal | Servicios Generales" },
      { name: "description", content: "Aviso legal y condiciones de uso del sitio web." },
    ],
  }),
  component: () => (
    <LegalLayout title="Aviso Legal">
      <p>
        Este sitio web pertenece a {COMPANY.name}, empresa de servicios generales que opera en{" "}
        {COMPANY.region}.
      </p>
      <h2>Datos de contacto</h2>
      <p>
        Teléfono / WhatsApp: {COMPANY.phone}
        <br />
        Correo electrónico: {COMPANY.email}
      </p>
      <h2>Condiciones de uso</h2>
      <p>
        El acceso y uso de este sitio web atribuye la condición de usuario e implica la aceptación
        de las presentes condiciones. El usuario se compromete a hacer un uso adecuado de los
        contenidos y servicios.
      </p>
      <h2>Propiedad intelectual</h2>
      <p>
        Todos los contenidos del sitio (textos, imágenes y diseño) están protegidos por los derechos
        de propiedad intelectual e industrial correspondientes.
      </p>
    </LegalLayout>
  ),
});
