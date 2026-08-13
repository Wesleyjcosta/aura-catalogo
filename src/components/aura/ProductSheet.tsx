import { useEffect, useState } from "react";
import { Minus, Plus, X } from "lucide-react";
import { brl, estoqueDisponivel, precoFinal, type Produto } from "@/lib/catalog";
import { useCart } from "@/lib/cart";

export function ProductSheet({
  produto,
  onClose,
}: {
  produto: Produto | null;
  onClose: () => void;
}) {
  const { add } = useCart();
  const [qtd, setQtd] = useState(1);

  useEffect(() => setQtd(1), [produto?.id_publico]);

  useEffect(() => {
    if (!produto) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [produto, onClose]);

  if (!produto) return null;

  const estoque = estoqueDisponivel(produto);
  const preco = precoFinal(produto);
  const promo = produto.preco_promocional != null && produto.preco != null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      <button
        type="button"
        aria-label="Fechar detalhes"
        onClick={onClose}
        className="absolute inset-0 bg-foreground/40 backdrop-blur-sm"
      />
      <section
        role="dialog"
        aria-modal="true"
        aria-label={produto.nome}
        className="relative flex max-h-[92vh] w-full max-w-lg flex-col overflow-hidden rounded-t-3xl bg-surface shadow-lift sm:rounded-3xl"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar"
          className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-card/90 text-foreground shadow-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>

        <div className="overflow-y-auto">
          <div className="aspect-square w-full bg-muted">
            {produto.imagem_url || produto.imagem_thumb_url ? (
              <img
                src={produto.imagem_url || produto.imagem_thumb_url || ""}
                alt={produto.nome}
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="flex h-full w-full items-center justify-center font-display text-3xl text-muted-foreground">
                AURA
              </span>
            )}
          </div>

          <div className="space-y-3 px-5 py-5">
            <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              {produto.categoria?.trim() || "Coleção"}
            </p>
            <h2 className="font-display text-2xl leading-tight text-foreground">
              {produto.nome}
            </h2>
            <p className="flex items-baseline gap-2">
              <span className="text-xl font-semibold text-gold-strong">{brl(preco)}</span>
              {promo && (
                <span className="text-sm text-muted-foreground line-through">
                  {brl(Number(produto.preco))}
                </span>
              )}
            </p>
            {produto.descricao?.trim() && (
              <p className="text-sm leading-relaxed text-muted-foreground">
                {produto.descricao}
              </p>
            )}
            <dl className="grid grid-cols-2 gap-3 border-t border-border pt-3 text-xs">
              {produto.material?.trim() && (
                <div>
                  <dt className="uppercase tracking-[0.16em] text-muted-foreground">Material</dt>
                  <dd className="mt-0.5 text-foreground">{produto.material}</dd>
                </div>
              )}
              {produto.referencia?.trim() && (
                <div>
                  <dt className="uppercase tracking-[0.16em] text-muted-foreground">
                    Referência
                  </dt>
                  <dd className="mt-0.5 text-foreground">{produto.referencia}</dd>
                </div>
              )}
              {produto.codigo && (
                <div>
                  <dt className="uppercase tracking-[0.16em] text-muted-foreground">Código</dt>
                  <dd className="mt-0.5 text-foreground">{produto.codigo}</dd>
                </div>
              )}
            </dl>
          </div>
        </div>

        <footer className="border-t border-border px-5 pb-5 pt-4">
          {estoque <= 0 ? (
            <p className="rounded-full bg-muted py-3 text-center text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
              Peça esgotada
            </p>
          ) : (
            <div className="flex items-center gap-3">
              <div className="flex items-center rounded-full border border-border">
                <button
                  type="button"
                  aria-label="Diminuir quantidade"
                  onClick={() => setQtd((q) => Math.max(1, q - 1))}
                  className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-accent"
                >
                  <Minus className="h-4 w-4" aria-hidden="true" />
                </button>
                <span className="w-8 text-center text-sm font-medium">{qtd}</span>
                <button
                  type="button"
                  aria-label="Aumentar quantidade"
                  disabled={qtd >= estoque}
                  onClick={() => setQtd((q) => Math.min(estoque, q + 1))}
                  className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-accent disabled:opacity-40"
                >
                  <Plus className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
              <button
                type="button"
                onClick={() => {
                  add(produto, qtd);
                  onClose();
                }}
                className="flex-1 rounded-full bg-foreground px-5 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-background transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                Adicionar à sacola
              </button>
            </div>
          )}
        </footer>
      </section>
    </div>
  );
}
