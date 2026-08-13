import {
  Banknote,
  Clock3,
  CreditCard,
  Instagram,
  MapPin,
  MessageCircle,
  Store,
} from "lucide-react";
import {
  STORE_ADDRESS,
  STORE_HOURS,
  STORE_INSTAGRAM,
  STORE_INSTAGRAM_URL,
  STORE_MAP_URL,
  STORE_SLOGAN,
  STORE_WHATSAPP_DISPLAY,
  STORE_WHATSAPP_URL,
} from "@/config/store";

export function StoreInfo() {
  return (
    <section
      aria-labelledby="visite-nossa-loja"
      className="mt-16 overflow-hidden rounded-[2rem] border border-border bg-card"
    >
      <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
        <div className="relative min-h-[360px] bg-white sm:min-h-[480px] lg:min-h-full">
          <img
            src="/brand/aura-loja.webp"
            alt="Entrada da loja física AURA Acessórios em Viçosa, Minas Gerais"
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
          />
        </div>

        <div className="flex flex-col justify-center p-6 sm:p-9 lg:p-10">
          <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-gold-strong">
            AURA Acessórios
          </p>
          <h2
            id="visite-nossa-loja"
            className="mt-2 font-display text-3xl leading-tight text-foreground sm:text-4xl"
          >
            Visite nossa loja
          </h2>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
            {STORE_SLOGAN}
          </p>

          <div className="mt-7 space-y-4">
            <a
              href={STORE_MAP_URL}
              target="_blank"
              rel="noreferrer"
              className="flex gap-3 rounded-2xl border border-border p-4 transition-colors hover:bg-accent"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary">
                <MapPin className="h-4 w-4" aria-hidden="true" />
              </span>
              <span>
                <span className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  Endereço
                </span>
                <span className="mt-1 block text-sm leading-relaxed text-foreground">
                  {STORE_ADDRESS}
                </span>
                <span className="mt-1 block text-xs font-medium text-gold-strong">
                  Abrir no mapa
                </span>
              </span>
            </a>

            <div className="flex gap-3 rounded-2xl border border-border p-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary">
                <Clock3 className="h-4 w-4" aria-hidden="true" />
              </span>
              <span>
                <span className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  Horário
                </span>
                <span className="mt-1 block whitespace-pre-line text-sm leading-relaxed text-foreground">
                  {STORE_HOURS}
                </span>
              </span>
            </div>

            <div className="flex gap-3 rounded-2xl border border-border p-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary">
                <Store className="h-4 w-4" aria-hidden="true" />
              </span>
              <span>
                <span className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  Retirada
                </span>
                <span className="mt-1 block text-sm text-foreground">
                  Compre pelo catálogo e retire diretamente na loja. Sem taxa de entrega.
                </span>
              </span>
            </div>
          </div>

          <div className="mt-7">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Formas de pagamento
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-2 text-xs text-foreground">
                <Banknote className="h-3.5 w-3.5" aria-hidden="true" /> Pix
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-2 text-xs text-foreground">
                <CreditCard className="h-3.5 w-3.5" aria-hidden="true" /> Crédito
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-2 text-xs text-foreground">
                <CreditCard className="h-3.5 w-3.5" aria-hidden="true" /> Débito
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-2 text-xs text-foreground">
                <Banknote className="h-3.5 w-3.5" aria-hidden="true" /> Dinheiro
              </span>
            </div>
          </div>

          <div className="mt-8 grid gap-2 sm:grid-cols-2">
            <a
              href={STORE_WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-whatsapp px-5 py-3.5 text-sm font-semibold text-whatsapp-foreground transition-opacity hover:opacity-90"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              {STORE_WHATSAPP_DISPLAY}
            </a>
            <a
              href={STORE_INSTAGRAM_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-foreground bg-foreground px-5 py-3.5 text-sm font-semibold text-background transition-opacity hover:opacity-90"
            >
              <Instagram className="h-4 w-4" aria-hidden="true" />
              {STORE_INSTAGRAM}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
