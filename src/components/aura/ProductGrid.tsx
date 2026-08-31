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
  const gridClass =
    "mt-10 grid grid-cols-2 gap-x-4 gap-y-12 sm:gap-x-6 sm:gap-y-14 lg:grid-cols-4 lg:gap-x-7 lg:gap-y-16";

  if (isLoading) {
    return (
      <section className={gridClass} aria-label="Carregando produtos" aria-busy="true">
        {SKELETON_KEYS.map((key) => (
          <ProductCardSkeleton key={key} />
        ))}
      </section>
    );
  }

  if (isError) {
    return (
      <section
        className="mt-12 border-y border-border px-4 py-14 text-center sm:py-16"
        aria-live="polite"
      >
        <RefreshCw className="mx-auto h-5 w-5 text-gold-strong" aria-hidden="true" />
        <h2 className="mt-5 font-display text-2xl text-foreground sm:text-3xl">
          Não foi possível carregar a coleção
        </h2>
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
          Verifique sua conexão e tente novamente. Nenhuma alteração foi feita na sua sacola.
        </p>
        <button
          type="button"
          onClick={onRetry}
          disabled={isRetrying}
          className="mt-6 border-b border-foreground pb-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-foreground transition-opacity duration-150 hover:opacity-60 disabled:cursor-wait disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4"
        >
          {isRetrying ? "Tentando…" : "Tentar novamente"}
        </button>
      </section>
    );
  }

  if (produtos.length === 0) {
    return (
      <section className="mt-12 border-y border-border px-4 py-14 text-center sm:py-16">
        <SearchX className="mx-auto h-5 w-5 text-gold-strong" aria-hidden="true" />
        <h2 className="mt-5 font-display text-2xl text-foreground sm:text-3xl">
          Nenhuma peça encontrada
        </h2>
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
          Tente outro nome, código, material ou selecione uma categoria diferente.
        </p>
      </section>
    );
  }

  return (
    <div className={gridClass}>
      {produtos.map((produto) => (
        <ProductCard key={produto.id_publico} produto={produto} onOpen={onOpen} />
      ))}
    </div>
  );
}
