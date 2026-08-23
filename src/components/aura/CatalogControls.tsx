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
    <section aria-label="Busca e categorias" className="pt-6 sm:pt-8">
      <div className="relative mx-auto max-w-4xl">
        <Search
          className="pointer-events-none absolute left-5 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gold-strong"
          aria-hidden="true"
        />
        <input
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
          placeholder="Buscar por nome, código ou material..."
          className="h-14 w-full rounded-full border border-border bg-card pl-13 pr-12 text-sm text-foreground shadow-soft outline-none transition placeholder:text-muted-foreground focus:border-gold-strong focus:ring-4 focus:ring-gold/15 sm:h-16 sm:text-base"
        />
        {busca && (
          <button
            type="button"
            onClick={() => onBuscaChange("")}
            aria-label="Limpar busca"
            className="absolute right-4 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-muted-foreground transition hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        )}
      </div>

      <nav aria-label="Categorias de produtos" className="mt-4 sm:mt-5">
        <div className="-mx-4 overflow-x-auto px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <ul className="mx-auto flex w-max min-w-full items-center gap-2 pb-1 sm:justify-center sm:gap-3">
            {categorias.map((item) => {
              const ativo = categoria === item.value;
              return (
                <li key={item.value}>
                  <button
                    type="button"
                    onClick={() => onCategoriaChange(item.value)}
                    aria-pressed={ativo}
                    className={`min-w-[92px] whitespace-nowrap rounded-full border px-5 py-2.5 text-xs font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:min-w-[104px] sm:text-sm ${
                      ativo
                        ? "border-gold-strong bg-gold-strong text-white shadow-soft"
                        : "border-border bg-card text-foreground hover:border-gold hover:bg-gold/10"
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
