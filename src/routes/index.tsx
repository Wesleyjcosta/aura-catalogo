import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { catalogoQuery, type Produto } from "@/lib/catalog";
import { CartProvider, useCart } from "@/lib/cart";
import { ProductCard } from "@/components/aura/ProductCard";
import { ProductSheet } from "@/components/aura/ProductSheet";
import { CartBar } from "@/components/aura/CartBar";
import { CartSheet } from "@/components/aura/CartSheet";
import { StoreHeader } from "@/components/aura/StoreHeader";
import { HeroSection } from "@/components/aura/HeroSection";
import { CatalogControls, type CatalogCategory } from "@/components/aura/CatalogControls";
import { STORE_NAME } from "@/config/store";

const TITLE = "AURA — Joias & Acessórios | Catálogo online";
const DESCRIPTION =
  "Explore a coleção AURA de joias e acessórios: peças selecionadas, preços atualizados e pedido direto pelo WhatsApp.";

const CATALOG_SKELETON_KEYS = [
  "catalog-skeleton-1",
  "catalog-skeleton-2",
  "catalog-skeleton-3",
  "catalog-skeleton-4",
  "catalog-skeleton-5",
  "catalog-skeleton-6",
  "catalog-skeleton-7",
  "catalog-skeleton-8",
] as const;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <CartProvider>
      <Storefront />
    </CartProvider>
  ),
});

function normalizarCategoria(valor: string) {
  return valor
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLocaleLowerCase("pt-BR");
}

function categoriaCanonica(normalizada: string) {
  const aliases: Record<string, string> = {
    bolsa: "Bolsas",
    bolsas: "Bolsas",
    colar: "Colares",
    colares: "Colares",
    pulseira: "Pulseiras",
    pulseiras: "Pulseiras",
    brinco: "Brincos",
    brincos: "Brincos",
    anel: "Anéis",
    aneis: "Anéis",
    oculos: "Óculos",
    acessorio: "Acessórios",
    acessorios: "Acessórios",
  };
  return aliases[normalizada] ?? null;
}

function categoriaCorresponde(categoriaProduto: string, categoriaSelecionada: string) {
  const produtoNormalizado = normalizarCategoria(categoriaProduto);
  const selecionadaNormalizada = normalizarCategoria(categoriaSelecionada);
  const produtoCanonico = categoriaCanonica(produtoNormalizado);
  const selecionadaCanonica = categoriaCanonica(selecionadaNormalizada);

  if (produtoCanonico || selecionadaCanonica) {
    return produtoCanonico === selecionadaCanonica;
  }

  return produtoNormalizado === selecionadaNormalizada;
}

function Storefront() {
  const { data, isLoading, isError, refetch } = useQuery(catalogoQuery);
  const { count } = useCart();
  const [busca, setBusca] = useState("");
  const [categoria, setCategoria] = useState("Todos");
  const [selecionado, setSelecionado] = useState<Produto | null>(null);
  const [sacolaAberta, setSacolaAberta] = useState(false);

  const categorias = useMemo<CatalogCategory[]>(() => {
    const padrao: CatalogCategory[] = [
      { label: "Todos", value: "Todos" },
      { label: "Bolsas", value: "Bolsas" },
      { label: "Colares", value: "Colares" },
      { label: "Pulseiras", value: "Pulseiras" },
      { label: "Brincos", value: "Brincos" },
      { label: "Anéis", value: "Anéis" },
      { label: "Óculos", value: "Óculos" },
      { label: "Acessórios", value: "Acessórios" },
    ];

    const conhecidos = new Set(
      padrao.slice(1).map((item) => normalizarCategoria(item.value)),
    );
    const extras = new Map<string, string>();

    (data ?? []).forEach((produto) => {
      const original = produto.categoria?.trim();
      if (!original) return;
      const normalizada = normalizarCategoria(original);
      const canonica = categoriaCanonica(normalizada);
      if (canonica) return;
      if (!conhecidos.has(normalizada) && !extras.has(normalizada)) {
        extras.set(normalizada, original);
      }
    });

    const adicionais = Array.from(extras.values())
      .sort((a, b) => a.localeCompare(b, "pt-BR"))
      .map((label) => ({ label, value: label }));

    return [...padrao, ...adicionais];
  }, [data]);

  const produtos = useMemo(() => {
    const termo = busca.trim().toLowerCase();
    return (data ?? []).filter((p) => {
      const catOk =
        categoria === "Todos" || categoriaCorresponde(p.categoria ?? "", categoria);
      if (!catOk) return false;
      if (!termo) return true;
      return [p.nome, p.codigo, p.referencia, p.categoria, p.material]
        .filter(Boolean)
        .some((v) => String(v).toLowerCase().includes(termo));
    });
  }, [data, busca, categoria]);

  return (
    <div id="inicio" className="min-h-screen bg-background pb-28">
      <StoreHeader count={count} onCartOpen={() => setSacolaAberta(true)} />
      <HeroSection />

      <main id="colecoes" className="mx-auto max-w-6xl px-4">
        <CatalogControls
          busca={busca}
          onBuscaChange={setBusca}
          categoria={categoria}
          onCategoriaChange={setCategoria}
          categorias={categorias}
        />

        <div className="mt-7 flex items-end justify-between gap-4">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-muted-foreground">
              Coleção
            </p>
            <h1 className="font-display text-3xl leading-tight text-foreground sm:text-4xl">
              Escolha sua próxima peça
            </h1>
          </div>
          <p className="shrink-0 text-xs text-muted-foreground">
            {isLoading ? "Carregando…" : `${produtos.length} peças`}
          </p>
        </div>

        {isError && (
          <div className="mt-8 rounded-2xl border border-border bg-card p-6 text-center">
            <p className="text-sm text-foreground">Não foi possível carregar a coleção.</p>
            <button
              type="button"
              onClick={() => refetch()}
              className="mt-3 rounded-full bg-foreground px-5 py-2.5 text-xs font-medium uppercase tracking-[0.14em] text-background"
            >
              Tentar novamente
            </button>
          </div>
        )}

        {isLoading && (
          <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {CATALOG_SKELETON_KEYS.map((skeletonKey) => (
              <div
                key={skeletonKey}
                className="overflow-hidden rounded-2xl border border-border bg-card"
                aria-hidden="true"
              >
                <div className="aspect-[4/5] w-full animate-pulse bg-muted" />
                <div className="space-y-2 p-4">
                  <div className="h-2 w-1/3 animate-pulse rounded bg-muted" />
                  <div className="h-3 w-3/4 animate-pulse rounded bg-muted" />
                  <div className="h-8 w-full animate-pulse rounded-full bg-muted" />
                </div>
              </div>
            ))}
          </div>
        )}

        {!isLoading && !isError && produtos.length === 0 && (
          <p className="mt-10 text-center text-sm text-muted-foreground">
            Nenhuma peça encontrada para esta busca.
          </p>
        )}

        {!isLoading && produtos.length > 0 && (
          <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {produtos.map((p) => (
              <ProductCard key={p.id_publico} produto={p} onOpen={setSelecionado} />
            ))}
          </div>
        )}
      </main>

      <footer className="mx-auto mt-14 max-w-6xl px-4 pb-6 text-center">
        <p className="font-display text-lg tracking-[0.3em] text-foreground">{STORE_NAME}</p>
        <p className="mt-1 text-[11px] text-muted-foreground">
          Pedidos e dúvidas pelo WhatsApp · disponibilidade, pagamento e entrega confirmados
          pela loja.
        </p>
      </footer>

      <ProductSheet produto={selecionado} onClose={() => setSelecionado(null)} />
      <CartBar onOpen={() => setSacolaAberta(true)} />
      <CartSheet open={sacolaAberta} onClose={() => setSacolaAberta(false)} />
    </div>
  );
}
