import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { CartBar } from "@/components/aura/CartBar";
import { CartSheet } from "@/components/aura/CartSheet";
import {
  CatalogControls,
  type CatalogCategory,
} from "@/components/aura/CatalogControls";
import { ProductGrid } from "@/components/aura/ProductGrid";
import { ProductSheet } from "@/components/aura/ProductSheet";
import { ProductStory } from "@/components/aura/ProductStory";
import { StoreHeader } from "@/components/aura/StoreHeader";
import { STORE_NAME } from "@/config/store";
import { CartProvider, useCart } from "@/lib/cart";
import { catalogoQuery, type Produto } from "@/lib/catalog";

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

function normalizarTexto(valor: string) {
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
    mochila: "Mochilas",
    mochilas: "Mochilas",
    semijoia: "Semijoias",
    semijoias: "Semijoias",
    semojoia: "Semijoias",
    semojoias: "Semijoias",
  };

  return aliases[normalizada] ?? null;
}

function categoriaCorresponde(categoriaProduto: string, categoriaSelecionada: string) {
  const produtoNormalizado = normalizarTexto(categoriaProduto);
  const selecionadaNormalizada = normalizarTexto(categoriaSelecionada);
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
      { label: "Mochilas", value: "Mochilas" },
      { label: "Semijoias", value: "Semijoias" },
    ];

    const conhecidos = new Set(
      padrao.slice(1).map((item) => normalizarTexto(item.value)),
    );
    const extras = new Map<string, string>();

    (data ?? []).forEach((produto) => {
      const original = produto.categoria?.trim();
      if (!original) return;

      const normalizada = normalizarTexto(original);
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
    const termo = normalizarTexto(busca);

    return (data ?? []).filter((produto) => {
      const catOk =
        categoria === "Todos" ||
        categoriaCorresponde(produto.categoria ?? "", categoria);

      if (!catOk) return false;
      if (!termo) return true;

      return [
        produto.nome,
        produto.codigo,
        produto.referencia,
        produto.categoria,
        produto.material,
      ]
        .filter(Boolean)
        .some((valor) => normalizarTexto(String(valor)).includes(termo));
    });
  }, [data, busca, categoria]);

  const contador = produtos.length === 1 ? "1 peça" : `${produtos.length} peças`;

  return (
    <div id="inicio" className="min-h-screen bg-background pb-28">
      <StoreHeader count={count} onCartOpen={() => setSacolaAberta(true)} />
      <ProductStory />

      <main id="colecoes" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-5 pt-10 sm:pt-14 lg:flex-row lg:items-end lg:justify-between lg:pt-16">
          <div>
            <p className="text-[9px] font-semibold uppercase tracking-[0.28em] text-gold-strong">
              Coleção AURA
            </p>
            <h1 className="mt-2 max-w-3xl font-display text-4xl leading-[0.98] text-foreground sm:text-5xl lg:text-[56px]">
              Escolha sua próxima peça
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
              Uma seleção para descobrir com calma — detalhes, acabamentos e peças
              que acompanham o seu estilo.
            </p>
          </div>

          <p
            className="shrink-0 pb-1 text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground"
            aria-live="polite"
          >
            {isLoading ? "Carregando…" : contador}
          </p>
        </div>

        <CatalogControls
          busca={busca}
          onBuscaChange={setBusca}
          categoria={categoria}
          onCategoriaChange={setCategoria}
          categorias={categorias}
        />

        <ProductGrid
          produtos={produtos}
          isLoading={isLoading}
          isError={isError}
          isRetrying={isError && isFetching}
          onRetry={() => void refetch()}
          onOpen={setSelecionado}
        />
      </main>

      <footer className="mx-auto mt-20 max-w-7xl px-4 pb-6 text-center sm:px-6 lg:px-8">
        <p className="font-display text-lg tracking-[0.3em] text-foreground">
          {STORE_NAME}
        </p>
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
