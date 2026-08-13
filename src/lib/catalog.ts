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

const SUPABASE_URL = "https://aizxtktxnlhdrmqyiiam.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_Wu34cKpAube7_PF4erf2cQ_Sy7ajR8k";

const FIELDS = [
  "id_publico",
  "codigo",
  "referencia",
  "nome",
  "categoria",
  "material",
  "descricao",
  "preco",
  "preco_promocional",
  "estoque",
  "disponivel",
  "destaque",
  "imagem_url",
  "imagem_thumb_url",
  "atualizado_em",
].join(",");

export async function fetchCatalogo(): Promise<Produto[]> {
  const url = `${SUPABASE_URL}/rest/v1/catalogo_publico?select=${FIELDS}&order=destaque.desc,nome.asc`;
  const res = await fetch(url, {
    headers: {
      apikey: SUPABASE_PUBLISHABLE_KEY,
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
