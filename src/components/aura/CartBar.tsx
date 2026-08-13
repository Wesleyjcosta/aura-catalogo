import { ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart";
import { brl } from "@/lib/catalog";

export function CartBar({ onOpen }: { onOpen: () => void }) {
  const { count, total } = useCart();
  if (count === 0) return null;

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 flex justify-center px-4 pb-4">
      <button
        type="button"
        onClick={onOpen}
        aria-label={`Ver sacola com ${count} peças, total ${brl(total)}`}
        className="pointer-events-auto flex w-full max-w-xl items-center gap-3 rounded-full bg-gold px-4 py-3 text-gold-foreground shadow-lift transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40 sm:px-5"
      >
        <span className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold-foreground/10">
          <ShoppingBag className="h-4 w-4" aria-hidden="true" />
          <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-foreground px-1 text-[10px] font-semibold text-background">
            {count}
          </span>
        </span>
        <span className="flex flex-col items-start leading-tight">
          <span className="text-[10px] font-medium uppercase tracking-[0.2em] opacity-80">
            Sua sacola
          </span>
          <span className="text-sm font-medium underline decoration-gold-foreground/40 underline-offset-4">
            Ver sacola
          </span>
        </span>
        <span className="ml-auto text-right text-base font-semibold">{brl(total)}</span>
      </button>
    </div>
  );
}
