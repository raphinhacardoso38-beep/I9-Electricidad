export const COMPANY = {
  name: "Servicios Generales",
  region: "Alicante y toda la Comunidad Valenciana",
  phone: "624 811 313",
  phoneRaw: "624811313",
  phoneIntl: "+34624811313",
  whatsapp: "34624811313",
  email: "raphinhacardoso37@gmail.com",
} as const;

export const NAV_LINKS = [
  { label: "Inicio", to: "/" },
  { label: "Electricidad", to: "/electricidad" },
  { label: "Aire Acondicionado", to: "/aire-acondicionado" },
  { label: "Albañilería", to: "/albanileria" },
  { label: "Presupuesto", to: "/presupuesto" },
  { label: "Únete al Equipo", to: "/unete" },
] as const;

export const whatsappUrl = (text?: string) =>
  `https://wa.me/${COMPANY.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ""}`;

export const telUrl = `tel:${COMPANY.phoneIntl}`;
export const mailtoUrl = `mailto:${COMPANY.email}`;
