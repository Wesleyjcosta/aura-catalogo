import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { catalogoQuery, type Produto } from "@/lib/catalog";
import { CartProvider, useCart } from "@/lib/cart";
import { ProductGrid } from "@/components/aura/ProductGrid";
import { ProductStory } from "@/components/aura/ProductStory";
import { ProductSheet } from "@/components/aura/ProductSheet";
import { CartBar } from "@/components/aura/CartBar";
import { CartSheet } from "@/components/aura/CartSheet";
import { StoreHeader } from "@/components/aura/StoreHeader";
import { CatalogControls, type CatalogCategory } from "@/components/aura/CatalogControls";
import { STORE_NAME } from "@/config/store";

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
  const { data, isLoading, isError, isFetching, refetch } = useQuery(catalogoQuery);
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
      <ProductStory />

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
          <p className="shrink-0 text-xs text-muted-foreground" aria-live="polite">
            {isLoading ? "Carregando…" : `${produtos.length} peças`}
          </p>
        </div>

        <ProductGrid
          produtos={produtos}
          isLoading={isLoading}
          isError={isError}
          isRetrying={isError && isFetching}
          onRetry={() => void refetch()}
          onOpen={setSelecionado}
        />
      </main>

      <footer className="mx-auto mt-14 max-w-6xl px-4 pb-6 text-center">
        <p className="font-display text-lg tracking-[0.3em] text-foreground">{STORE_NAME}</p>
        <p className="mt-1 text-[11px] text-muted-foreground">
          Pedidos e dúvidas pelo WhatsApp · disponibilidade, pagamento e retirada na loja
          confirmados pela equipe AURA.
        </p>
      </footer>

      <ProductSheet produto={selecionado} onClose={() => setSelecionado(null)} />
      <CartBar onOpen={() => setSacolaAberta(true)} />
      <CartSheet open={sacolaAberta} onClose={() => setSacolaAberta(false)} />
    </div>
  );
}
