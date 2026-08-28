import { ArrowDown, ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const clamp = (value: number) => Math.min(1, Math.max(0, value));

function rangeProgress(progress: number, start: number, end: number) {
  if (end <= start) return progress >= end ? 1 : 0;
  return clamp((progress - start) / (end - start));
}

function enterExit(
  progress: number,
  enterStart: number,
  enterEnd: number,
  exitStart: number,
  exitEnd: number,
) {
  const enter = rangeProgress(progress, enterStart, enterEnd);
  const exit = 1 - rangeProgress(progress, exitStart, exitEnd);
  return Math.min(enter, exit);
}

const DETAIL_CALLOUTS = [
  {
    label: "Alça",
    className: "left-[3%] top-[21%]",
    lineClassName: "w-14 lg:w-24",
    enter: [0.38, 0.44],
    exit: [0.68, 0.74],
  },
  {
    label: "Acabamento",
    className: "right-[1%] top-[35%] flex-row-reverse",
    lineClassName: "w-14 lg:w-20",
    enter: [0.44, 0.5],
    exit: [0.7, 0.76],
  },
  {
    label: "Estrutura",
    className: "right-[3%] top-[59%] flex-row-reverse",
    lineClassName: "w-12 lg:w-20",
    enter: [0.5, 0.56],
    exit: [0.72, 0.78],
  },
  {
    label: "Detalhes dourados",
    className: "left-[5%] top-[73%]",
    lineClassName: "w-12 lg:w-20",
    enter: [0.56, 0.62],
    exit: [0.74, 0.8],
  },
] as const;

const PHOTO_FILTER = "saturate(.84) contrast(1.035) brightness(1.045)";

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

      setProgress((current) =>
        Math.abs(current - nextProgress) >= 0.003 ? nextProgress : current,
      );
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

  const approach = rangeProgress(progress, 0.08, 0.34);
  const detailBlend = reduceMotion
    ? 0
    : enterExit(progress, 0.3, 0.42, 0.68, 0.8);
  const returnProgress = rangeProgress(progress, 0.76, 0.92);

  const mainScale = reduceMotion ? 1 : 1 + approach * 0.12 - returnProgress * 0.07;
  const mainTranslateY = reduceMotion ? 0 : approach * -11 + returnProgress * 7;
  const mainOpacity = reduceMotion ? 1 : 1 - detailBlend * 0.93;

  const detailScale = reduceMotion ? 1 : 1.02 + rangeProgress(progress, 0.38, 0.66) * 0.06;
  const detailTranslateY = reduceMotion ? 0 : -6 + rangeProgress(progress, 0.38, 0.66) * -8;

  const introOpacity = reduceMotion ? 1 : 1 - rangeProgress(progress, 0.08, 0.24);
  const detailTitleOpacity = reduceMotion
    ? 0
    : enterExit(progress, 0.32, 0.4, 0.69, 0.77);
  const finalOpacity = reduceMotion ? 1 : rangeProgress(progress, 0.84, 0.96);
  const mobileLabelsOpacity = reduceMotion
    ? 1
    : enterExit(progress, 0.4, 0.5, 0.69, 0.79);

  return (
    <section
      ref={sectionRef}
      aria-label="Explore os detalhes da bolsa AURA"
      className={`relative mt-20 bg-white sm:mt-28 ${
        reduceMotion ? "h-auto" : "h-[230vh] sm:h-[270vh]"
      }`}
    >
      <div
        className={`${
          reduceMotion
            ? "relative min-h-[780px] sm:min-h-[860px]"
            : "sticky top-20 h-[calc(100vh-5rem)] min-h-[620px] sm:top-24 sm:h-[calc(100vh-6rem)]"
        } flex items-center overflow-hidden bg-white`}
      >
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative mx-auto flex min-h-[570px] max-w-6xl flex-col items-center justify-center sm:min-h-[640px]">
            <div
              className="pointer-events-none absolute inset-x-0 top-1 z-30 text-center sm:top-0"
              style={{ opacity: introOpacity }}
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-gold-strong">
                AURA em detalhes
              </p>
              <h2 className="mx-auto mt-2 max-w-2xl font-display text-3xl leading-[0.98] text-foreground sm:text-5xl lg:text-6xl">
                Conheça de perto
              </h2>
              <p className="mx-auto mt-3 max-w-lg text-xs leading-relaxed text-muted-foreground sm:text-sm">
                Role para explorar acabamento, estrutura e detalhes da peça.
              </p>
              <ArrowDown className="mx-auto mt-4 h-4 w-4 text-gold-strong" aria-hidden="true" />
            </div>

            <div
              className="pointer-events-none absolute inset-x-0 top-2 z-30 text-center"
              style={{ opacity: detailTitleOpacity }}
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-gold-strong">
                Observe de perto
              </p>
              <p className="mt-1 font-display text-2xl text-foreground sm:text-3xl">
                Detalhes que fazem diferença
              </p>
            </div>

            <div className="relative mt-14 h-[61vh] min-h-[410px] w-full max-w-4xl sm:mt-10 sm:h-[69vh] sm:min-h-[520px]">
              <div
                className="absolute inset-0 will-change-transform motion-reduce:transform-none"
                style={{
                  opacity: mainOpacity,
                  transform: `translate3d(0, ${mainTranslateY}px, 0) scale(${mainScale})`,
                }}
              >
                <img
                  src="/brand/aura-bolsa-scroll-principal.webp"
                  alt="Bolsa marrom com corrente dourada segurada pela alça"
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-contain object-center"
                  style={{ filter: PHOTO_FILTER }}
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_48%,rgba(255,255,255,.04)_63%,white_96%)]"
                />
              </div>

              <div
                className="absolute inset-[4%] overflow-hidden rounded-[1.75rem] bg-white shadow-[0_28px_75px_rgba(20,18,15,.08)] ring-1 ring-black/[0.045] sm:inset-[2%_8%]"
                style={{
                  opacity: detailBlend,
                  transform: `translate3d(0, ${detailTranslateY}px, 0) scale(${detailScale})`,
                }}
              >
                <img
                  src="/brand/aura-bolsa-scroll-detalhe.webp"
                  alt="Close da corrente, ilhó, costura e acabamento da bolsa"
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover object-[55%_42%] sm:object-[56%_38%]"
                  style={{ filter: PHOTO_FILTER }}
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-white/15"
                />
              </div>

              <div className="pointer-events-none absolute inset-0 z-20 hidden sm:block" aria-hidden="true">
                {DETAIL_CALLOUTS.map((detail) => {
                  const opacity = reduceMotion
                    ? 0
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
                      <span className={`h-px bg-gold-strong/75 ${detail.lineClassName}`} />
                      <span className="h-1.5 w-1.5 rounded-full bg-gold-strong shadow-[0_0_0_4px_rgba(184,142,61,.13)]" />
                    </div>
                  );
                })}
              </div>
            </div>

            <div
              className="pointer-events-none absolute inset-x-4 bottom-16 z-30 grid grid-cols-2 gap-2 sm:hidden"
              style={{ opacity: mobileLabelsOpacity }}
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
              aria-hidden={!reduceMotion && finalOpacity < 0.5}
              className="absolute inset-x-0 bottom-2 z-40 flex flex-col items-center text-center sm:bottom-0"
              style={{
                opacity: finalOpacity,
                pointerEvents: reduceMotion || finalOpacity >= 0.5 ? "auto" : "none",
                transform: `translate3d(0, ${(1 - finalOpacity) * 12}px, 0)`,
              }}
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-gold-strong">
                Sua escolha
              </p>
              <p className="mt-1 font-display text-2xl leading-tight text-foreground sm:text-3xl">
                Essência que acompanha você
              </p>
              <a
                href="#colecoes"
                tabIndex={reduceMotion || finalOpacity >= 0.5 ? 0 : -1}
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
