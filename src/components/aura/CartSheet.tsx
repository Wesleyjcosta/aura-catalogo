import { useEffect, useState } from "react";
import { Minus, Plus, Trash2, X } from "lucide-react";
import { useCart } from "@/lib/cart";
import { brl } from "@/lib/catalog";
import { buildWhatsappUrl } from "@/lib/whatsapp";

export function CartSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { items, count, total, setQtd, remove, clear } = useCart();
  const [nome, setNome] = useState("");
  const [entrega, setEntrega] = useState("");
  const [observacao, setObservacao] = useState("");

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  const enviar = () => {
    if (items.length === 0) return;
    window.open(buildWhatsappUrl(items, total, { nome, entrega, observacao }), "_blank");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      <button
        type="button"
        aria-label="Fechar sacola"
        onClick={onClose}
        className="absolute inset-0 bg-foreground/40 backdrop-blur-sm"
      />
      <section
        role="dialog"
        aria-modal="true"
        aria-label="Minha sacola"
        className="relative flex h-[92vh] w-full max-w-xl flex-col rounded-t-3xl bg-surface shadow-lift sm:h-[86vh] sm:rounded-3xl"
      >
        <header className="flex items-start gap-3 border-b border-border px-5 pb-4 pt-5">
          <div className="flex-1">
            <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Revise seu pedido
            </p>
            <h2 className="font-display text-2xl text-foreground">
              Minha sacola <span className="text-muted-foreground">· {count} peças</span>
            </h2>
            {items.length > 0 && (
              <button
                type="button"
                onClick={clear}
                className="mt-2 text-xs font-medium text-destructive underline underline-offset-4"
              >
                Limpar sacola
              </button>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </header>

        <div className="flex-1 space-y-3 overflow-y-auto px-5 py-4">
          {items.length === 0 && (
            <p className="py-10 text-center text-sm text-muted-foreground">
              Sua sacola está vazia. Explore a coleção e adicione suas peças favoritas.
            </p>
          )}

          {items.map((i) => (
            <div
              key={i.id}
              className="flex gap-3 rounded-2xl bg-card p-3 shadow-soft"
            >
              <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-muted">
                {i.imagem && (
                  <img src={i.imagem} alt={i.nome} className="h-full w-full object-cover" />
                )}
              </div>
              <div className="flex min-w-0 flex-1 flex-col">
                <h3 className="truncate font-display text-sm text-foreground">{i.nome}</h3>
                <p className="text-[11px] text-muted-foreground">
                  {i.codigo ? `Cód. ${i.codigo}` : ""}
                  {i.variacao ? ` · ${i.variacao}` : ""}
                </p>
                <p className="mt-1 text-sm font-semibold text-gold-strong">{brl(i.preco)}</p>
                <div className="mt-2 flex items-center gap-2">
                  <div className="flex items-center rounded-full border border-border">
                    <button
                      type="button"
                      aria-label={`Diminuir quantidade de ${i.nome}`}
                      onClick={() => setQtd(i.id, i.qtd - 1)}
                      className="flex h-8 w-8 items-center justify-center rounded-full text-foreground hover:bg-accent"
                    >
                      <Minus className="h-3.5 w-3.5" aria-hidden="true" />
                    </button>
                    <span className="w-8 text-center text-sm font-medium" aria-live="polite">
                      {i.qtd}
                    </span>
                    <button
                      type="button"
                      aria-label={`Aumentar quantidade de ${i.nome}`}
                      disabled={i.qtd >= i.estoque}
                      onClick={() => setQtd(i.id, i.qtd + 1)}
                      className="flex h-8 w-8 items-center justify-center rounded-full text-foreground hover:bg-accent disabled:opacity-40"
                    >
                      <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                    </button>
                  </div>
                  <button
                    type="button"
                    aria-label={`Remover ${i.nome} da sacola`}
                    onClick={() => remove(i.id)}
                    className="ml-auto flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground hover:bg-accent hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {items.length > 0 && (
            <div className="space-y-2 pt-2">
              <label className="block text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                Nome
                <input
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-border bg-card px-3 py-2 text-sm normal-case tracking-normal text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  placeholder="Seu nome"
                />
              </label>
              <label className="block text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                Forma de entrega
                <input
                  value={entrega}
                  onChange={(e) => setEntrega(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-border bg-card px-3 py-2 text-sm normal-case tracking-normal text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  placeholder="Retirada ou entrega"
                />
              </label>
              <label className="block text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                Observação
                <textarea
                  value={observacao}
                  onChange={(e) => setObservacao(e.target.value)}
                  rows={2}
                  className="mt-1 w-full resize-none rounded-xl border border-border bg-card px-3 py-2 text-sm normal-case tracking-normal text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  placeholder="Alguma preferência?"
                />
              </label>
            </div>
          )}
        </div>

        <footer className="space-y-3 border-t border-border bg-surface px-5 pb-5 pt-4">
          <div className="flex items-end justify-between">
            <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Total do pedido
            </span>
            <span className="font-display text-2xl text-foreground">{brl(total)}</span>
          </div>
          <button
            type="button"
            onClick={enviar}
            disabled={items.length === 0}
            className="w-full rounded-full bg-whatsapp px-5 py-3.5 text-sm font-semibold uppercase tracking-[0.12em] text-whatsapp-foreground transition-opacity hover:opacity-90 disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            Enviar pedido pelo WhatsApp
          </button>
          <button
            type="button"
            onClick={onClose}
            className="w-full text-xs font-medium text-muted-foreground underline underline-offset-4"
          >
            Continuar comprando
          </button>
          <p className="text-center text-[10px] leading-relaxed text-muted-foreground">
            A loja confirmará disponibilidade, pagamento e entrega pelo WhatsApp.
          </p>
        </footer>
      </section>
    </div>
  );
}
