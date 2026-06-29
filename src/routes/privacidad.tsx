import { createFileRoute } from "@tanstack/react-router";

import { LegalLayout } from "@/components/site/ServicePage";
import { COMPANY } from "@/lib/site-config";

export const Route = createFileRoute("/privacidad")({
  head: () => ({
    meta: [
      { title: "Política de Privacidad | Servicios Generales" },
      { name: "description", content: "Política de privacidad y tratamiento de datos personales." },
    ],
  }),
  component: () => (
    <LegalLayout title="Política de Privacidad">
      <p>
        En cumplimiento del Reglamento (UE) 2016/679 (RGPD) y la Ley Orgánica 3/2018 (LOPDGDD), te
        informamos sobre el tratamiento de tus datos personales.
      </p>
      <h2>Responsable del tratamiento</h2>
      <p>
        {COMPANY.name}. Contacto: {COMPANY.phone} · {COMPANY.email}.
      </p>
      <h2>Finalidad</h2>
      <p>
        Los datos que nos facilitas a través de los formularios se utilizan únicamente para atender
        tu solicitud de presupuesto o de empleo y para ponernos en contacto contigo.
      </p>
      <h2>Conservación</h2>
      <p>
        Conservamos los datos durante el tiempo necesario para gestionar tu solicitud y mientras no
        solicites su supresión.
      </p>
      <h2>Derechos</h2>
      <p>
        Puedes ejercer tus derechos de acceso, rectificación, supresión, oposición, limitación y
        portabilidad escribiéndonos a {COMPANY.email}.
      </p>
    </LegalLayout>
  ),
});
