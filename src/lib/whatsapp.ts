import type { CartItem } from "./cart";
import { brl } from "./catalog";
import { STORE_NAME, STORE_WHATSAPP } from "@/config/store";

export type Checkout = {
  nome: string;
  entrega: string;
  observacao: string;
};

export function buildWhatsappUrl(items: CartItem[], total: number, dados: Checkout) {
  const linhas = items.map(
    (i, idx) =>
      `${idx + 1}. ${i.nome}` +
      (i.codigo ? `\n   Código: ${i.codigo}` : "") +
      `\n   Qtd: ${i.qtd} x ${brl(i.preco)}` +
      `\n   Subtotal: ${brl(i.qtd * i.preco)}`,
  );

  const msg = [
    `*${STORE_NAME}* — novo pedido`,
    "",
    ...linhas,
    "",
    `*TOTAL DO PEDIDO:* ${brl(total)}`,
    "",
    `Nome: ${dados.nome || "-"}`,
    `Forma de entrega: ${dados.entrega || "-"}`,
    `Observação: ${dados.observacao || "-"}`,
  ].join("\n");

  return `https://wa.me/${STORE_WHATSAPP}?text=${encodeURIComponent(msg)}`;
}
