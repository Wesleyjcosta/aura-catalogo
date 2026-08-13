import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { Search, ShoppingBag } from "lucide-react";
import { catalogoQuery, type Produto } from "@/lib/catalog";
import { CartProvider, useCart } from "@/lib/cart";
import { ProductCard } from "@/components/aura/ProductCard";
import { ProductSheet } from "@/components/aura/ProductSheet";
import { CartBar } from "@/components/aura/CartBar";
import { CartSheet } from "@/components/aura/CartSheet";
import { STORE_NAME, STORE_TAGLINE } from "@/config/store";

const TITLE = "AURA — Joias & Acessórios | Catálogo online";
const DESCRIPTION =
  "Explore a coleção AURA de joias e acessórios: peças selecionadas, preços atualizados e pedido direto pelo WhatsApp.";

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

function Storefront() {
  const { data, isLoading, isError, refetch } = useQuery(catalogoQuery);
  const { count } = useCart();
  const [busca, setBusca] = useState("");
  const [categoria, setCategoria] = useState("Todos");
  const [selecionado, setSelecionado] = useState<Produto | null>(null);
  const [sacolaAberta, setSacolaAberta] = useState(false);

  const categorias = useMemo(() => {
    const set = new Set<string>();
    (data ?? []).forEach((p) => {
      const c = p.categoria?.trim();
      if (c) set.add(c);
    });
    return ["Todos", ...Array.from(set).sort((a, b) => a.localeCompare(b, "pt-BR"))];
  }, [data]);

  const produtos = useMemo(() => {
    const termo = busca.trim().toLowerCase();
    return (data ?? []).filter((p) => {
      const catOk = categoria === "Todos" || (p.categoria?.trim() || "") === categoria;
      if (!catOk) return false;
      if (!termo) return true;
      return [p.nome, p.codigo, p.referencia, p.categoria, p.material]
        .filter(Boolean)
        .some((v) => String(v).toLowerCase().includes(termo));
    });
  }, [data, busca, categoria]);

  return (
    <div className="min-h-screen bg-background pb-28">
      <header className="sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div>
            <p className="font-display text-2xl leading-none tracking-[0.28em] text-foreground">
              {STORE_NAME}
            </p>
            <p className="text-[9px] uppercase tracking-[0.22em] text-muted-foreground">
              {STORE_TAGLINE}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setSacolaAberta(true)}
            aria-label={`Abrir sacola (${count} peças)`}
            className="relative flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <ShoppingBag className="h-4.5 w-4.5" aria-hidden="true" />
            {count > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-gold px-1 text-[10px] font-semibold text-gold-foreground">
                {count}
              </span>
            )}
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4">
        <nav aria-label="Categorias" className="-mx-4 overflow-x-auto px-4 pt-4">
          <ul className="flex gap-2 pb-1">
            {categorias.map((c) => (
              <li key={c}>
                <button
                  type="button"
                  onClick={() => setCategoria(c)}
                  aria-pressed={categoria === c}
                  className={`whitespace-nowrap rounded-full border px-4 py-2 text-xs font-medium uppercase tracking-[0.12em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                    categoria === c
                      ? "border-foreground bg-foreground text-background"
                      : "border-border bg-card text-muted-foreground hover:bg-accent"
                  }`}
                >
                  {c}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="relative mt-4">
          <Search
            className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <input
            type="search"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            aria-label="Buscar peças"
            placeholder="Buscar por nome, código ou material"
            className="w-full rounded-full border border-border bg-card py-3.5 pl-11 pr-4 text-sm text-foreground outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>

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
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
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
