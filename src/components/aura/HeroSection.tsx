import { ArrowRight, MessageCircle, Sparkles } from "lucide-react";
import { HERO_CONTENT } from "@/config/hero";

export function HeroSection() {
  return (
    <section
      aria-labelledby="aura-hero-title"
      className="border-b border-border bg-white"
    >
      <div className="mx-auto grid max-w-7xl overflow-hidden lg:min-h-[470px] lg:grid-cols-[0.92fr_1.08fr]">
        <div className="relative flex items-center px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-14 xl:px-16">
          <div className="relative max-w-xl">
            <p className="mb-5 flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.26em] text-gold-strong">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              {HERO_CONTENT.eyebrow}
            </p>

            <h1
              id="aura-hero-title"
              className="font-display text-[2.7rem] font-medium leading-[0.96] tracking-[-0.025em] text-foreground sm:text-6xl lg:text-[4.15rem]"
            >
              {HERO_CONTENT.title}{" "}
              <span className="text-gold-strong">{HERO_CONTENT.highlight}</span>
            </h1>

            <div className="my-6 h-px w-20 bg-gold-strong/75" aria-hidden="true" />

            <p className="max-w-lg text-[15px] leading-7 text-muted-foreground sm:text-base">
              {HERO_CONTENT.subtitle}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={HERO_CONTENT.primaryButton.href}
                className="inline-flex min-h-12 items-center justify-center gap-3 rounded-lg bg-gold-strong px-6 text-sm font-medium text-white shadow-soft transition-[transform,box-shadow,filter] duration-200 hover:-translate-y-0.5 hover:brightness-95 hover:shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                {HERO_CONTENT.primaryButton.label}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>

              <a
                href={HERO_CONTENT.secondaryButton.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-12 items-center justify-center gap-2.5 rounded-lg border border-border bg-white px-6 text-sm font-medium text-foreground shadow-sm transition-[transform,border-color,box-shadow] duration-200 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:border-foreground/25 hover:shadow-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <MessageCircle className="h-[18px] w-[18px]" aria-hidden="true" />
                {HERO_CONTENT.secondaryButton.label}
              </a>
            </div>
          </div>
        </div>

        <div className="relative min-h-[330px] overflow-hidden sm:min-h-[410px] lg:min-h-full">
          <img
            src={HERO_CONTENT.image}
            alt={HERO_CONTENT.imageAlt}
            width={848}
            height={900}
            fetchPriority="high"
            className="absolute inset-0 h-full w-full object-cover object-[50%_56%]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-r from-white/18 via-transparent to-transparent lg:from-white/8"
          />
        </div>
      </div>
    </section>
  );
}
