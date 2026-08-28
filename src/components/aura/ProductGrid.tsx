import { RefreshCw, SearchX } from "lucide-react";
import { ProductCard } from "@/components/aura/ProductCard";
import { ProductCardSkeleton } from "@/components/aura/ProductCardSkeleton";
import type { Produto } from "@/lib/catalog";

const SKELETON_KEYS = [
  "product-skeleton-1",
  "product-skeleton-2",
  "product-skeleton-3",
  "product-skeleton-4",
  "product-skeleton-5",
  "product-skeleton-6",
  "product-skeleton-7",
  "product-skeleton-8",
] as const;

type ProductGridProps = {
  produtos: Produto[];
  isLoading: boolean;
  isError: boolean;
  isRetrying: boolean;
  onRetry: () => void;
  onOpen: (produto: Produto) => void;
};

export function ProductGrid({
  produtos,
  isLoading,
  isError,
  isRetrying,
  onRetry,
  onOpen,
}: ProductGridProps) {
  if (isLoading) {
    return (
      <section
        className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4"
        aria-label="Carregando produtos"
        aria-busy="true"
      >
        {SKELETON_KEYS.map((key) => (
          <ProductCardSkeleton key={key} />
        ))}
      </section>
    );
  }

  if (isError) {
    return (
      <section
        className="mt-8 rounded-3xl bg-card px-6 py-10 text-center shadow-soft ring-1 ring-foreground/5"
        aria-live="polite"
      >
        <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-gold/15 text-gold-strong">
          <RefreshCw className="h-5 w-5" aria-hidden="true" />
        </div>
        <h2 className="mt-4 font-display text-2xl text-foreground">
          Não foi possível carregar a coleção
        </h2>
        <p className="mx-auto mt-1 max-w-md text-sm leading-relaxed text-muted-foreground">
          Verifique sua conexão e tente novamente. Nenhuma alteração foi feita na sua sacola.
        </p>
        <button
          type="button"
          onClick={onRetry}
          disabled={isRetrying}
          className="mt-5 inline-flex min-w-44 items-center justify-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-background transition-[transform,opacity] duration-150 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] motion-reduce:transform-none motion-reduce:transition-none hover:opacity-90 active:scale-[0.98] disabled:cursor-wait disabled:opacity-65 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          {isRetrying && (
            <RefreshCw className="h-3.5 w-3.5 animate-spin motion-reduce:animate-none" aria-hidden="true" />
          )}
          {isRetrying ? "Tentando…" : "Tentar novamente"}
        </button>
      </section>
    );
  }

  if (produtos.length === 0) {
    return (
      <section className="mt-10 rounded-3xl bg-card px-6 py-12 text-center shadow-soft ring-1 ring-foreground/5">
        <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-gold/15 text-gold-strong">
          <SearchX className="h-5 w-5" aria-hidden="true" />
        </div>
        <h2 className="mt-4 font-display text-2xl text-foreground">Nenhuma peça encontrada</h2>
        <p className="mx-auto mt-1 max-w-md text-sm leading-relaxed text-muted-foreground">
          Tente outro nome, código, material ou selecione uma categoria diferente.
        </p>
      </section>
    );
  }

  return (
    <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
      {produtos.map((produto) => (
        <ProductCard key={produto.id_publico} produto={produto} onOpen={onOpen} />
      ))}
    </div>
  );
}
