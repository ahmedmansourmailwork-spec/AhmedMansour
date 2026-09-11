"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SectionMeta } from "@/components/ui/SectionMeta";
import { RevealText } from "@/components/ui/RevealText";
import { BrandImage } from "@/components/ui/BrandImage";
import { ActionLink } from "@/components/ui/ActionLink";
import { useLocale } from "@/components/providers/LocaleProvider";
import type { ArtKey } from "@/lib/art-direction";

const stageArt: ArtKey[] = [
  "about-atelier",
  "about-fabric",
  "manufacturing-qc",
  "manufacturing-wide",
  "manufacturing-hands",
  "quality-detail",
  "manufacturing-qc",
  "manufacturing-wide",
];

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Scroll storytelling: the stage panel holds while the process runs past it, so
 * the visitor walks the floor in order rather than scanning eight tiles.
 */
export function Manufacturing() {
  const { dict, locale } = useLocale();
  const [active, setActive] = useState(0);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const m = dict.manufacturing;

  useEffect(() => {
    const nodes = itemRefs.current.filter((n): n is HTMLLIElement => Boolean(n));
    if (nodes.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const best = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!best) return;
        const index = Number((best.target as HTMLElement).dataset.stage);
        if (!Number.isNaN(index)) setActive(index);
      },
      { rootMargin: "-42% 0px -42% 0px", threshold: [0, 0.3, 0.7, 1] },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  const current = m.stages[active];

  return (
    <section id="manufacturing" className="dark-field relative bg-ink py-20 text-paper sm:py-24 lg:py-28">
      <div className="mx-auto max-w-[110rem] px-5 sm:px-8 lg:px-16">
        <SectionMeta index={m.index} label={m.label} tone="paper" />

        <div className="mt-6 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="t-display fs-xl max-w-[13ch]">
            <RevealText text={m.title} accent={m.titleAccent} accentClassName="t-serif text-clay-soft" />
          </h2>
          <p className="t-body max-w-sm text-paper/60 lg:text-end">{m.lead}</p>
        </div>

        <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:gap-10">
          {/* The panel that holds */}
          <div className="hidden lg:col-span-5 lg:block">
            <div className="sticky top-[calc(var(--nav-h)+3rem)]">
              <div className="relative aspect-4/5 w-full overflow-hidden bg-ink-soft">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={stageArt[active]}
                    className="absolute inset-0"
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: EASE }}
                  >
                    <BrandImage art={stageArt[active]} locale={locale} className="h-full w-full" decorative />
                  </motion.div>
                </AnimatePresence>

                <div aria-hidden className="absolute inset-0 bg-[linear-gradient(to_top,rgba(11,11,12,0.95)_0%,rgba(11,11,12,0.45)_45%,rgba(11,11,12,0.1)_100%)]" />

                <div className="absolute inset-x-0 bottom-0 p-7">
                  <p className="t-label mb-3 text-paper/55">{m.stageLabel}</p>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={current.num}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: 0.5, ease: EASE }}
                    >
                      <span className="t-display block text-[clamp(4rem,9vw,7.5rem)] leading-[0.8] text-clay">
                        {current.num}
                      </span>
                      <h3 className="t-heading fs-md mt-3">{current.title}</h3>
                      <p className="t-body mt-3 max-w-sm text-sm text-paper/65">{current.detail}</p>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* Progress through the process */}
              <div className="mt-5 flex items-center gap-3">
                <span className="t-num t-label text-paper/55">
                  {current.num} / {m.stages[m.stages.length - 1].num}
                </span>
                <span className="relative h-px flex-1 bg-paper/15">
                  <motion.span
                    className="absolute inset-y-0 start-0 block bg-clay"
                    animate={{ width: `${((active + 1) / m.stages.length) * 100}%` }}
                    transition={{ duration: 0.6, ease: EASE }}
                  />
                </span>
              </div>
            </div>
          </div>

          {/* The process itself */}
          <ol className="lg:col-span-6 lg:col-start-7">
            {m.stages.map((stage, i) => (
              <li
                key={stage.num}
                data-stage={i}
                ref={(node) => {
                  itemRefs.current[i] = node;
                }}
                className="border-t border-paper/12 py-8 last:border-b lg:min-h-[38vh] lg:py-10"
              >
                <motion.div
                  initial={{ opacity: 0, y: 26 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.8, ease: EASE }}
                  className="flex gap-5 sm:gap-8"
                >
                  <span
                    className={`t-num t-label pt-1.5 transition-colors duration-500 ${
                      active === i ? "text-clay-soft" : "text-paper/55"
                    }`}
                  >
                    {stage.num}
                  </span>
                  <div>
                    <h3 className="t-heading fs-md">{stage.title}</h3>
                    <p className="t-body mt-3 max-w-lg text-paper/65">{stage.body}</p>
                    <p className="t-body mt-3 max-w-lg text-sm text-paper/55 lg:hidden">{stage.detail}</p>
                  </div>
                </motion.div>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-12">
          <ActionLink href="/manufacturing" variant="inverse">
            {m.ctaLabel}
          </ActionLink>
        </div>
      </div>
    </section>
  );
}
