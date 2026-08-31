import { Search, X } from "lucide-react";

export type CatalogCategory = {
  label: string;
  value: string;
};

type CatalogControlsProps = {
  busca: string;
  onBuscaChange: (value: string) => void;
  categoria: string;
  onCategoriaChange: (value: string) => void;
  categorias: CatalogCategory[];
};

export function CatalogControls({
  busca,
  onBuscaChange,
  categoria,
  onCategoriaChange,
  categorias,
}: CatalogControlsProps) {
  return (
    <section
      aria-label="Busca e categorias"
      className="mt-8 border-y border-border/80 py-5 sm:mt-10 sm:py-6"
    >
      <div className="relative max-w-xl">
        <label
          htmlFor="catalog-search"
          className="text-[9px] font-semibold uppercase tracking-[0.22em] text-muted-foreground"
        >
          Buscar na coleção
        </label>

        <div className="relative mt-2">
          <Search
            className="pointer-events-none absolute left-0 top-1/2 h-4 w-4 -translate-y-1/2 text-gold-strong"
            aria-hidden="true"
          />
          <input
            id="catalog-search"
            type="search"
            value={busca}
            onChange={(event) => onBuscaChange(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Escape" && busca) {
                onBuscaChange("");
                event.currentTarget.blur();
              }
            }}
            aria-label="Buscar produtos"
            placeholder="Nome, código ou material"
            className="h-11 w-full border-0 border-b border-foreground/20 bg-transparent pl-7 pr-9 text-sm text-foreground outline-none transition-[border-color] duration-150 placeholder:text-muted-foreground/75 focus:border-gold-strong focus:ring-0 sm:text-base"
          />
          {busca && (
            <button
              type="button"
              onClick={() => onBuscaChange("")}
              aria-label="Limpar busca"
              className="absolute right-0 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center text-muted-foreground transition-colors duration-150 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          )}
        </div>
      </div>

      <nav aria-label="Categorias de produtos" className="mt-6 sm:mt-7">
        <div className="-mx-4 overflow-x-auto px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
          <ul className="flex w-max min-w-full items-center gap-6 pb-1 sm:gap-8">
            {categorias.map((item) => {
              const ativo = categoria === item.value;

              return (
                <li key={item.value}>
                  <button
                    type="button"
                    onClick={() => onCategoriaChange(item.value)}
                    aria-pressed={ativo}
                    className={`relative whitespace-nowrap pb-2 text-[11px] font-medium uppercase tracking-[0.14em] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 sm:text-xs ${
                      ativo
                        ? "text-foreground after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-gold-strong"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {item.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </section>
  );
}
