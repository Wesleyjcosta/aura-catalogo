import { STORE_WHATSAPP } from "@/config/store";

const whatsappMessage =
  "Olá! Vim pelo catálogo da AURA e gostaria de conhecer as peças disponíveis.";

export const HERO_CONTENT = {
  eyebrow: "Coleção AURA",
  title: "Acessórios que transformam o básico",
  highlight: "em incrível!",
  subtitle:
    "Bolsas, joias e acessórios selecionados para realçar sua beleza com elegância e personalidade.",
  image: "/brand/aura-hero-colecao.webp",
  imageAlt: "Bolsas, joias e acessórios em composição elegante da AURA",
  primaryButton: {
    label: "Ver coleção",
    href: "#colecoes",
  },
  secondaryButton: {
    label: "Falar no WhatsApp",
    href: `https://wa.me/${STORE_WHATSAPP}?text=${encodeURIComponent(whatsappMessage)}`,
  },
} as const;
