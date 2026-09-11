"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { SectionMeta } from "@/components/ui/SectionMeta";
import { RevealText } from "@/components/ui/RevealText";
import { BrandImage } from "@/components/ui/BrandImage";
import { Counter } from "@/components/ui/Counter";
import { useLocale } from "@/components/providers/LocaleProvider";
import { sizeChart } from "@/data/sizes";
import { categoryOrder } from "@/data/products";

export function Quality() {
  const { dict, locale } = useLocale();
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const q = dict.quality;

  // Every figure is counted from the site's own content — nothing asserted.
  const counts: Record<string, number> = {
    stages: dict.manufacturing.stages.length,
    sizes: sizeChart.length,
    collections: categoryOrder.length,
  };

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const plateY = useTransform(scrollYProgress, [0, 1], ["-6%", reduced ? "-6%" : "10%"]);

  return (
    <section id="quality" className="relative overflow-hidden bg-paper-dim py-20 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-[110rem] px-5 sm:px-8 lg:px-16">
        <SectionMeta index={q.index} label={q.label} />

        {/* The statement takes the full measure — nothing shares its line. */}
        <h2 className="t-display fs-xxl mt-7 max-w-[14ch]">
          <RevealText text={q.title} accent={q.titleAccent} accentClassName="t-serif text-clay" />
        </h2>
        <p className="t-body mt-7 max-w-lg text-ink/65">{q.lead}</p>

        <div ref={ref} className="mt-16 grid gap-10 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-[calc(var(--nav-h)+3rem)]">
              <div className="relative aspect-3/4 overflow-hidden bg-bone lg:aspect-2/3">
                <motion.div style={{ y: plateY }} className="absolute inset-[-8%]">
                  <BrandImage art="quality-detail" locale={locale} className="h-full w-full" decorative />
                </motion.div>
              </div>
              <p className="t-label mt-4 text-ink/60">{q.label} — {q.index}</p>
            </div>
          </div>

          <ol className="lg:col-span-7 lg:col-start-6">
            {q.points.map((point, i) => (
              <motion.li
                key={point.num}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.75, delay: (i % 2) * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="group border-t border-ink/15 py-6 last:border-b sm:py-8"
              >
                <div className="flex items-baseline gap-5 sm:gap-8">
                  <span className="t-num t-label text-clay-deep">{point.num}</span>
                  <div className="flex-1">
                    <h3 className="t-heading text-lg sm:text-xl">{point.title}</h3>
                    <p className="t-body mt-2.5 max-w-xl text-ink/65">{point.body}</p>
                  </div>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>

        {/* Counted, not claimed. */}
        <div className="mt-16 border-t border-ink/15 pt-8">
          <p className="t-label mb-7 text-ink/60">{q.figuresLabel}</p>
          <dl className="grid gap-8 sm:grid-cols-3">
            {q.figures.map((figure) => (
              <div key={figure.key}>
                <dd className="t-display text-[clamp(3rem,7vw,5rem)] leading-none">
                  <Counter to={counts[figure.key] ?? 0} />
                </dd>
                <dt className="t-label mt-3 text-ink/60">{figure.label}</dt>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
