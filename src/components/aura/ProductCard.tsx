import { useState } from "react";
import { ImageIcon } from "lucide-react";
import {
  imagemCard,
  brl,
  precoFinal,
  estoqueDisponivel,
  type Produto,
} from "@/lib/catalog";

export function ProductCard({
  produto,
  onOpen,
}: {
  produto: Produto;
  onOpen: (p: Produto) => void;
}) {
  const img = imagemCard(produto);
  const [imageState, setImageState] = useState<"loading" | "loaded" | "error">(
    img ? "loading" : "error",
  );
  const preco = precoFinal(produto);
  const estoque = estoqueDisponivel(produto);
  const promo = produto.preco_promocional != null && produto.preco != null;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl bg-card shadow-soft ring-1 ring-foreground/5 transition-[transform,box-shadow] duration-200 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] motion-reduce:transform-none motion-reduce:transition-none hover:-translate-y-0.5 hover:shadow-lift">
      <button
        type="button"
        onClick={() => onOpen(produto)}
        aria-label={`Ver detalhes de ${produto.nome}`}
        className="relative block aspect-square w-full overflow-hidden bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset"
      >
        {img && imageState !== "error" ? (
          <>
            {imageState === "loading" && (
              <div
                className="absolute inset-3 rounded-xl bg-muted/70 sm:inset-4"
                aria-hidden="true"
              />
            )}
            <img
              src={img}
              alt={produto.nome}
              loading="lazy"
              decoding="async"
              onLoad={() => setImageState("loaded")}
              onError={() => setImageState("error")}
              className={`h-full w-full object-contain p-3 transition-[opacity,transform] duration-300 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] motion-reduce:transform-none motion-reduce:transition-none sm:p-4 ${
                imageState === "loaded" ? "opacity-100" : "opacity-0"
              } group-hover:scale-[1.015]`}
            />
          </>
        ) : (
          <span className="flex h-full w-full flex-col items-center justify-center gap-2 text-muted-foreground">
            <ImageIcon className="h-6 w-6 text-gold-strong/65" aria-hidden="true" />
            <span className="font-display text-lg tracking-[0.18em]">AURA</span>
          </span>
        )}

        {estoque <= 0 && (
          <span className="absolute left-3 top-3 rounded-full bg-foreground/90 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.16em] text-background shadow-soft">
            Esgotado
          </span>
        )}
        {estoque > 0 && promo && (
          <span className="absolute left-3 top-3 rounded-full bg-gold-strong px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.16em] text-white shadow-soft">
            Oferta
          </span>
        )}
      </button>

      <div className="flex flex-1 flex-col p-3.5 sm:p-4">
        <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-gold-strong">
          {produto.categoria?.trim() || "Coleção"}
        </p>
        <h3 className="mt-1 line-clamp-2 min-h-10 font-display text-base leading-tight text-foreground sm:text-lg">
          {produto.nome}
        </h3>

        <div className="mt-2 flex min-h-11 flex-wrap items-baseline gap-x-2 gap-y-0.5">
          <span className="text-base font-semibold text-foreground sm:text-lg">{brl(preco)}</span>
          {promo && (
            <span className="text-xs text-muted-foreground line-through">
              {brl(Number(produto.preco))}
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={() => onOpen(produto)}
          className="mt-auto w-full rounded-full bg-foreground px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-background shadow-sm transition-[transform,opacity] duration-150 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] motion-reduce:transform-none motion-reduce:transition-none hover:opacity-90 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          Ver detalhes
        </button>
      </div>
    </article>
  );
}
