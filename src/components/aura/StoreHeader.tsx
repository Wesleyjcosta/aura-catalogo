import { useState } from "react";
import { Menu, ShoppingBag, X } from "lucide-react";

const NAV_ITEMS = [
  { label: "Novidades", href: "#novidades" },
  { label: "Mais vendidos", href: "#mais-vendidos" },
  { label: "Coleções", href: "#colecoes" },
  { label: "Sobre nós", href: "#sobre" },
  { label: "Contato", href: "#contato" },
];

export function StoreHeader({
  count,
  onCartOpen,
}: {
  count: number;
  onCartOpen: () => void;
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-white/96 shadow-[0_1px_12px_oklch(0.15_0_0_/_0.045)] backdrop-blur-xl">
      <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:h-[88px] lg:px-8">
        {/* Mobile menu */}
        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuOpen}
          className="flex h-11 w-11 items-center justify-center rounded-full text-foreground transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring lg:hidden"
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        {/* Brand */}
        <a
          href="/"
          aria-label="AURA Acessórios — voltar ao início"
          onClick={closeMenu}
          className="absolute left-1/2 flex -translate-x-1/2 items-center gap-3 lg:static lg:translate-x-0"
        >
          <img
            src="/brand/aura-simbolo-header.webp"
            alt=""
            aria-hidden="true"
            className="hidden h-12 w-12 object-contain lg:block"
          />
          <img
            src="/brand/aura-logo-header.webp"
            alt="AURA Acessórios"
            className="h-[48px] w-auto object-contain sm:h-[54px] lg:h-[58px]"
          />
        </a>

        {/* Desktop navigation */}
        <nav aria-label="Navegação principal" className="ml-auto hidden items-center lg:flex">
          <ul className="flex items-center gap-7 xl:gap-9">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="group relative py-3 text-[13px] font-medium tracking-[0.01em] text-foreground/78 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4"
                >
                  {item.label}
                  <span className="absolute inset-x-1 bottom-1 h-px origin-center scale-x-0 bg-gold-strong transition-transform duration-200 group-hover:scale-x-100" />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Cart */}
        <div className="flex items-center lg:ml-8 lg:border-l lg:border-border lg:pl-6">
          <button
            type="button"
            onClick={onCartOpen}
            aria-label={`Abrir sacola (${count} ${count === 1 ? "item" : "itens"})`}
            className="relative flex h-11 w-11 items-center justify-center rounded-full text-foreground transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <ShoppingBag className="h-[21px] w-[21px] stroke-[1.6]" aria-hidden="true" />
            <span
              className={`absolute -right-0.5 -top-0.5 flex h-[19px] min-w-[19px] items-center justify-center rounded-full bg-gold-strong px-1 text-[10px] font-semibold leading-none text-white shadow-sm ${
                count === 0 ? "opacity-80" : ""
              }`}
              aria-hidden="true"
            >
              {count}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile navigation panel */}
      <div
        className={`overflow-hidden border-t border-border/70 bg-background transition-[max-height,opacity] duration-300 lg:hidden ${
          menuOpen ? "max-h-[360px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav aria-label="Menu móvel" className="mx-auto max-w-7xl px-5 py-4">
          <ul className="divide-y divide-border/65">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={closeMenu}
                  className="flex min-h-12 items-center justify-between py-3 text-sm font-medium text-foreground/82 transition-colors hover:text-gold-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {item.label}
                  <span className="text-gold-strong" aria-hidden="true">
                    →
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
