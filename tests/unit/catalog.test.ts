import { describe, expect, test } from "bun:test";
import {
  brl,
  estoqueDisponivel,
  imagemCard,
  precoFinal,
  type Produto,
} from "../../src/lib/catalog";

function produto(overrides: Partial<Produto> = {}): Produto {
  return {
    id_publico: "produto-1",
    codigo: "JC0001",
    referencia: null,
    nome: "Bolsa AURA",
    categoria: "Bolsas",
    material: null,
    descricao: null,
    preco: 199.9,
    preco_promocional: null,
    estoque: 3,
    disponivel: true,
    destaque: false,
    imagem_url: "https://example.com/principal.webp",
    imagem_thumb_url: "https://example.com/thumb.webp",
    atualizado_em: null,
    ...overrides,
  };
}

describe("catálogo", () => {
  test("usa preço promocional quando disponível", () => {
    expect(precoFinal(produto({ preco: 199.9, preco_promocional: 149.9 }))).toBe(149.9);
  });

  test("nunca retorna estoque negativo e respeita indisponível", () => {
    expect(estoqueDisponivel(produto({ estoque: -4 }))).toBe(0);
    expect(estoqueDisponivel(produto({ estoque: 10, disponivel: false }))).toBe(0);
  });

  test("prioriza miniatura e usa imagem principal como fallback", () => {
    expect(imagemCard(produto())).toContain("thumb.webp");
    expect(imagemCard(produto({ imagem_thumb_url: null }))).toContain("principal.webp");
    expect(imagemCard(produto({ imagem_thumb_url: null, imagem_url: null }))).toBeNull();
  });

  test("formata moeda em BRL", () => {
    const valor = brl(1234.56);
    expect(valor).toContain("1.234,56");
    expect(valor).toContain("R$");
  });
});
