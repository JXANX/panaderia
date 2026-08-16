// Datos de contacto reales de la panadería — única fuente de verdad.
// Editar acá cuando el local tenga su número y redes definitivos.
export const SITE = {
  name: 'Vainilla y Chocolate',
  city: 'Mar de Ajó',
  province: 'Buenos Aires',
  country: 'Argentina',
  foundingYear: 1974,
  hoursMorning: '6:30 – 14:00',
  hoursAfternoon: '17:00 – 20:30',
  // Número en formato internacional, sin "+", espacios ni guiones.
  whatsappInternational: '57300778899',
  whatsappDisplay: '+57 300 778899',
  instagram: null as string | null,
  facebook: null as string | null,
} as const;

// CTA de WhatsApp con mensaje precargado.
export const whatsappLink = (text: string) =>
  `https://wa.me/${SITE.whatsappInternational}?text=${encodeURIComponent(text)}`;

export const telLink = () => `tel:+${SITE.whatsappInternational}`;
