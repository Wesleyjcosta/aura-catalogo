import { ArrowDown, ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const clamp = (value: number) => Math.min(1, Math.max(0, value));

function rangeProgress(progress: number, start: number, end: number) {
  if (end <= start) return progress >= end ? 1 : 0;
  return clamp((progress - start) / (end - start));
}

function enterExit(progress: number, enterStart: number, enterEnd: number, exitStart: number, exitEnd: number) {
  const enter = rangeProgress(progress, enterStart, enterEnd);
  const exit = 1 - rangeProgress(progress, exitStart, exitEnd);
  return Math.min(enter, exit);
}

const DETAIL_CALLOUTS = [
  {
    label: "Alça",
    className: "left-[5%] top-[28%]",
    lineClassName: "w-16 sm:w-24",
    enter: [0.28, 0.36],
    exit: [0.72, 0.79],
  },
  {
    label: "Acabamento",
    className: "left-[2%] top-[54%]",
    lineClassName: "w-14 sm:w-20",
    enter: [0.38, 0.46],
    exit: [0.74, 0.81],
  },
  {
    label: "Estrutura",
    className: "right-[1%] top-[57%] flex-row-reverse",
    lineClassName: "w-14 sm:w-20",
    enter: [0.48, 0.56],
    exit: [0.76, 0.83],
  },
  {
    label: "Detalhes dourados",
    className: "right-[3%] top-[72%] flex-row-reverse",
    lineClassName: "w-12 sm:w-16",
    enter: [0.58, 0.66],
    exit: [0.78, 0.85],
  },
] as const;

export function ProductStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncPreference = () => setReduceMotion(media.matches);

    syncPreference();
    media.addEventListener("change", syncPreference);
    return () => media.removeEventListener("change", syncPreference);
  }, []);

  useEffect(() => {
    if (reduceMotion) {
      setProgress(1);
      return;
    }

    let animationFrame = 0;

    const updateProgress = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const scrollableDistance = Math.max(1, rect.height - window.innerHeight);
      const nextProgress = clamp(-rect.top / scrollableDistance);

      setProgress((current) => (Math.abs(current - nextProgress) >= 0.004 ? nextProgress : current));
    };

    const scheduleUpdate = () => {
      cancelAnimationFrame(animationFrame);
      animationFrame = requestAnimationFrame(updateProgress);
    };

    updateProgress();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, [reduceMotion]);

  const zoomProgress = rangeProgress(progress, 0.08, 0.64);
  const settleProgress = rangeProgress(progress, 0.78, 0.96);
  const imageScale = reduceMotion ? 1 : 1 + zoomProgress * 0.105 - settleProgress * 0.06;
  const imageTranslateY = reduceMotion ? 0 : zoomProgress * -10 + settleProgress * 6;
  const introOpacity = reduceMotion ? 1 : 1 - rangeProgress(progress, 0.12, 0.28);
  const detailHeaderOpacity = reduceMotion ? 0 : enterExit(progress, 0.22, 0.34, 0.76, 0.86);
  const ctaOpacity = reduceMotion ? 1 : rangeProgress(progress, 0.84, 0.96);
  const mobileDetailsOpacity = reduceMotion
    ? 1
    : enterExit(progress, 0.28, 0.42, 0.76, 0.86);

  return (
    <section
      ref={sectionRef}
      aria-label="Descubra os detalhes da bolsa AURA"
      className={`relative mt-20 bg-white sm:mt-28 ${reduceMotion ? "h-auto" : "h-[205vh] sm:h-[235vh]"}`}
    >
      <div
        className={`${reduceMotion ? "relative min-h-[760px] sm:min-h-[820px]" : "sticky top-20 h-[calc(100vh-5rem)] min-h-[620px] sm:top-24 sm:h-[calc(100vh-6rem)]"} flex items-center overflow-hidden bg-white`}
      >
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative mx-auto flex min-h-[560px] max-w-6xl flex-col items-center justify-center sm:min-h-[620px]">
            <div
              className="pointer-events-none absolute inset-x-0 top-2 z-20 text-center sm:top-0"
              style={{ opacity: introOpacity }}
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-gold-strong">
                AURA em detalhes
              </p>
              <h2 className="mx-auto mt-2 max-w-2xl font-display text-3xl leading-[0.98] text-foreground sm:text-5xl lg:text-6xl">
                Descubra os detalhes
              </h2>
              <p className="mx-auto mt-3 max-w-lg text-xs leading-relaxed text-muted-foreground sm:text-sm">
                Role para explorar a bolsa de perto.
              </p>
              <ArrowDown className="mx-auto mt-4 h-4 w-4 text-gold-strong" aria-hidden="true" />
            </div>

            <div
              className="pointer-events-none absolute inset-x-0 top-3 z-20 text-center sm:top-2"
              style={{ opacity: detailHeaderOpacity }}
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-gold-strong">
                Observe de perto
              </p>
              <p className="mt-1 font-display text-2xl text-foreground sm:text-3xl">
                Cada detalhe faz diferença
              </p>
            </div>

            <div className="relative mt-16 h-[58vh] min-h-[390px] w-full max-w-4xl sm:mt-12 sm:h-[66vh] sm:min-h-[500px]">
              <div
                className="absolute inset-0 will-change-transform motion-reduce:transform-none"
                style={{
                  transform: `translate3d(0, ${imageTranslateY}px, 0) scale(${imageScale})`,
                  transition: reduceMotion ? "none" : "transform 90ms linear",
                }}
              >
                <div className="relative h-full w-full">
                  <img
                    src="/brand/aura-bolsa-detalhes.webp"
                    alt="Bolsa marrom AURA com alças de corrente dourada"
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-contain object-center [filter:saturate(.82)_contrast(1.02)_brightness(1.04)]"
                    style={{
                      WebkitMaskImage:
                        "radial-gradient(ellipse 62% 69% at 52% 55%, #000 64%, rgba(0,0,0,.92) 76%, transparent 100%)",
                      maskImage:
                        "radial-gradient(ellipse 62% 69% at 52% 55%, #000 64%, rgba(0,0,0,.92) 76%, transparent 100%)",
                    }}
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_42%,rgba(255,255,255,.18)_67%,white_92%)]"
                  />
                </div>
              </div>

              <div className="pointer-events-none absolute inset-0 hidden sm:block" aria-hidden="true">
                {DETAIL_CALLOUTS.map((detail) => {
                  const opacity = reduceMotion
                    ? 1
                    : enterExit(
                        progress,
                        detail.enter[0],
                        detail.enter[1],
                        detail.exit[0],
                        detail.exit[1],
                      );

                  return (
                    <div
                      key={detail.label}
                      className={`absolute flex items-center gap-2 ${detail.className}`}
                      style={{
                        opacity,
                        transform: `translate3d(0, ${(1 - opacity) * 7}px, 0)`,
                      }}
                    >
                      <span className="rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-foreground shadow-soft ring-1 ring-foreground/10 backdrop-blur-sm">
                        {detail.label}
                      </span>
                      <span className={`h-px bg-gold-strong/70 ${detail.lineClassName}`} />
                      <span className="h-1.5 w-1.5 rounded-full bg-gold-strong shadow-[0_0_0_4px_rgba(184,142,61,.12)]" />
                    </div>
                  );
                })}
              </div>
            </div>

            <div
              className="absolute inset-x-4 bottom-16 z-20 grid grid-cols-2 gap-2 sm:hidden"
              style={{ opacity: mobileDetailsOpacity }}
            >
              {DETAIL_CALLOUTS.map((detail) => (
                <div
                  key={detail.label}
                  className="rounded-full bg-white/95 px-3 py-2 text-center text-[9px] font-semibold uppercase tracking-[0.13em] text-foreground shadow-soft ring-1 ring-foreground/10 backdrop-blur-sm"
                >
                  <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-gold-strong" />
                  {detail.label}
                </div>
              ))}
            </div>

            <div
              aria-hidden={!reduceMotion && ctaOpacity < 0.5}
              className="absolute inset-x-0 bottom-4 z-30 flex flex-col items-center text-center sm:bottom-2"
              style={{
                opacity: ctaOpacity,
                pointerEvents: reduceMotion || ctaOpacity >= 0.5 ? "auto" : "none",
                transform: `translate3d(0, ${(1 - ctaOpacity) * 12}px, 0)`,
              }}
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-gold-strong">
                Sua escolha
              </p>
              <p className="mt-1 font-display text-2xl text-foreground sm:text-3xl">
                Encontre a sua próxima peça
              </p>
              <a
                href="#colecoes"
                tabIndex={reduceMotion || ctaOpacity >= 0.5 ? 0 : -1}
                className="mt-3 inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-background transition-[transform,opacity] duration-150 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] hover:opacity-90 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 motion-reduce:transform-none motion-reduce:transition-none"
              >
                Ver coleção
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
