export type Produto = {
  id_publico: string;
  codigo: string | null;
  referencia: string | null;
  nome: string;
  categoria: string | null;
  material: string | null;
  descricao: string | null;
  preco: number | null;
  preco_promocional: number | null;
  estoque: number | null;
  disponivel: boolean | null;
  destaque: boolean | null;
  imagem_url: string | null;
  imagem_thumb_url: string | null;
  atualizado_em: string | null;
};

export async function fetchCatalogo(): Promise<Produto[]> {
  const res = await fetch("/catalogo.json", {
    headers: {
      Accept: "application/json",
    },
  });
  if (!res.ok) throw new Error("Não foi possível carregar o catálogo.");
  return (await res.json()) as Produto[];
}
export const catalogoQuery = {
  queryKey: ["catalogo_publico"],
  queryFn: fetchCatalogo,
  staleTime: 60_000,
};

export function precoFinal(p: Produto): number {
  return Number(p.preco_promocional ?? p.preco ?? 0);
}

export function estoqueDisponivel(p: Produto): number {
  if (p.disponivel === false) return 0;
  return Math.max(0, Number(p.estoque ?? 0));
}

export function imagemCard(p: Produto): string | null {
  return p.imagem_thumb_url || p.imagem_url || null;
}

export function brl(v: number): string {
  return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}
