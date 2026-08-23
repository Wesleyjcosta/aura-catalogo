export const STORE_NAME = "AURA";
export const STORE_DISPLAY_NAME = "AURA Acessórios";
export const STORE_TAGLINE = "Joias & Acessórios";

export const STORE_WHATSAPP = "5531983400829";
export const STORE_WHATSAPP_DISPLAY = "(31) 98340-0829";
export const STORE_WHATSAPP_URL = `https://wa.me/${STORE_WHATSAPP}`;

export const STORE_ADDRESS =
  "Galeria Maria Mucci, nº 54, loja 113A — Calçadão, Viçosa/MG";

export const STORE_MAP_URL =
  "https://www.google.com/maps/search/?api=1&query=Galeria%20Maria%20Mucci%2054%20loja%20113A%20Calcadao%20Vicosa%20MG";

export const STORE_INSTAGRAM = "@auraacessoriosc";
export const STORE_INSTAGRAM_URL =
  "https://www.instagram.com/auraacessoriosc?igsh=MTR6a3p0OHZlbzl4NQ==";

export const STORE_SLOGAN =
  "Acessórios que transformam o básico em incrível!";

export const STORE_HOURS_WEEKDAYS = "Segunda a sexta: 9h às 18h30";
export const STORE_HOURS_SATURDAY = "Sábado: 9h às 13h";

/**
 * Mantido por compatibilidade com o bloco institucional existente.
 * A esteira de qualidade confirmará o formato efetivamente consumido
 * pelo StoreInfo.tsx no próximo check.
 */
export const STORE_HOURS: any = Object.assign(
  [
    {
      label: "Segunda a sexta",
      days: "Segunda a sexta",
      dia: "Segunda a sexta",
      value: "9h às 18h30",
      hours: "9h às 18h30",
      horario: "9h às 18h30",
    },
    {
      label: "Sábado",
      days: "Sábado",
      dia: "Sábado",
      value: "9h às 13h",
      hours: "9h às 13h",
      horario: "9h às 13h",
    },
  ],
  {
    weekdays: "9h às 18h30",
    saturday: "9h às 13h",
  },
);

export const STORE_PAYMENT = "Pix, crédito, débito e dinheiro";
export const STORE_PICKUP = "Retirada na loja — grátis";
