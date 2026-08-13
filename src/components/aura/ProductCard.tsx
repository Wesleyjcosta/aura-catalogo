import { imagemCard, brl, precoFinal, estoqueDisponivel, type Produto } from "@/lib/catalog";

export function ProductCard({
  produto,
  onOpen,
}: {
  produto: Produto;
  onOpen: (p: Produto) => void;
}) {
  const img = imagemCard(produto);
  const preco = precoFinal(produto);
  const estoque = estoqueDisponivel(produto);
  const promo = produto.preco_promocional != null && produto.preco != null;

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition-shadow hover:shadow-lift">
      <button
        type="button"
        onClick={() => onOpen(produto)}
        aria-label={`Ver detalhes de ${produto.nome}`}
        className="relative block aspect-[4/5] w-full overflow-hidden bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        {img ? (
          <img
            src={img}
            alt={produto.nome}
            loading="lazy"
            className="h-full w-full object-contain p-2 transition-opacity duration-300 group-hover:opacity-95"
          />
        ) : (
          <span className="flex h-full w-full items-center justify-center font-display text-2xl text-muted-foreground">
            AURA
          </span>
        )}
        {estoque <= 0 && (
          <span className="absolute left-3 top-3 rounded-full bg-foreground/85 px-2.5 py-1 text-[10px] font-medium uppercase tracking-widest text-background">
            Esgotado
          </span>
        )}
        {estoque > 0 && promo && (
          <span className="absolute left-3 top-3 rounded-full bg-gold px-2.5 py-1 text-[10px] font-medium uppercase tracking-widest text-gold-foreground">
            Oferta
          </span>
        )}
      </button>

      <div className="flex flex-1 flex-col gap-1 p-3 sm:p-4">
        <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
          {produto.categoria?.trim() || "Coleção"}
        </p>
        <h3 className="line-clamp-2 font-display text-sm leading-snug text-foreground sm:text-base">
          {produto.nome}
        </h3>
        <p className="mt-1 flex items-baseline gap-2">
          <span className="text-base font-medium text-foreground">{brl(preco)}</span>
          {promo && (
            <span className="text-xs text-muted-foreground line-through">
              {brl(Number(produto.preco))}
            </span>
          )}
        </p>
        <button
          type="button"
          onClick={() => onOpen(produto)}
          className="mt-3 w-full rounded-full bg-foreground px-4 py-2.5 text-xs font-medium uppercase tracking-[0.14em] text-background transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          Ver detalhes
        </button>
      </div>
    </article>
  );
}
