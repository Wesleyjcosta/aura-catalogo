import { ImageIcon } from "lucide-react";
import { useState } from "react";
import {
  brl,
  estoqueDisponivel,
  imagemCard,
  precoFinal,
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
  const categoria = produto.categoria?.trim();

  return (
    <article className="group flex h-full flex-col">
      <button
        type="button"
        onClick={() => onOpen(produto)}
        aria-label={`Ver detalhes de ${produto.nome}`}
        className="relative block aspect-[4/3] w-full overflow-hidden bg-muted/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4"
      >
        {img && imageState !== "error" ? (
          <>
            {imageState === "loading" && (
              <div className="absolute inset-0 bg-muted/55" aria-hidden="true" />
            )}
            <img
              src={img}
              alt={produto.nome}
              loading="lazy"
              decoding="async"
              onLoad={() => setImageState("loaded")}
              onError={() => setImageState("error")}
              className={`h-full w-full object-contain p-2 transition-[opacity,transform] duration-200 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] motion-reduce:transform-none motion-reduce:transition-none sm:p-2.5 ${
                imageState === "loaded" ? "opacity-100" : "opacity-0"
              } group-hover:scale-[1.012]`}
            />
          </>
        ) : (
          <span className="flex h-full w-full flex-col items-center justify-center gap-3 text-muted-foreground">
            <ImageIcon className="h-6 w-6 text-gold-strong/60" aria-hidden="true" />
            <span className="font-display text-lg tracking-[0.2em]">AURA</span>
          </span>
        )}

        {estoque <= 0 && (
          <span className="absolute left-3 top-3 bg-foreground px-2 py-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-background">
            Esgotado
          </span>
        )}
        {estoque > 0 && promo && (
          <span className="absolute left-3 top-3 bg-white/95 px-2 py-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-gold-strong">
            Oferta
          </span>
        )}
      </button>

      <div className="flex flex-1 flex-col pt-3.5 sm:pt-4">
        {categoria && (
          <p className="text-[9px] font-medium uppercase tracking-[0.22em] text-gold-strong">
            {categoria}
          </p>
        )}

        <h3
          className={`line-clamp-2 font-display text-lg leading-[1.08] text-foreground sm:text-xl ${
            categoria ? "mt-1.5" : "mt-0.5"
          }`}
        >
          {produto.nome}
        </h3>

        <div className="mt-2.5 flex flex-wrap items-baseline gap-x-2 gap-y-1">
          <span className="text-base font-semibold tracking-[-0.01em] text-foreground sm:text-lg">
            {brl(preco)}
          </span>
          {promo && (
            <span className="text-xs text-muted-foreground line-through">
              {brl(Number(produto.preco))}
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={() => onOpen(produto)}
          className="mt-4 inline-flex w-fit items-center gap-2 border-b border-transparent pb-1 text-[10px] font-semibold uppercase tracking-[0.17em] text-foreground transition-[border-color,color] duration-150 hover:border-gold-strong hover:text-gold-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 motion-reduce:transition-none sm:text-[11px]"
        >
          Ver detalhes
          <span
            aria-hidden="true"
            className="text-base font-normal leading-none transition-transform duration-150 group-hover:translate-x-0.5 motion-reduce:transform-none motion-reduce:transition-none"
          >
            →
          </span>
        </button>
      </div>
    </article>
  );
}
