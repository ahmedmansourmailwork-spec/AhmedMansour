"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SectionMeta } from "@/components/ui/SectionMeta";
import { RevealText } from "@/components/ui/RevealText";
import { useLocale } from "@/components/providers/LocaleProvider";
import { sizeChart } from "@/data/sizes";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Largest value on the chart, so every bar shares one scale. */
const CEILING = 140;

export function SizeExplorer() {
  const { dict, locale } = useLocale();
  const [active, setActive] = useState(2); // M — the reference block
  const s = dict.sizes;
  const spec = sizeChart[active];

  const measures = [
    { label: s.chestLabel, range: spec.chest },
    { label: s.waistLabel, range: spec.waist },
    { label: s.lengthLabel, range: [spec.length, spec.length] as [number, number] },
  ];

  const nf = new Intl.NumberFormat(locale === "ar" ? "ar-EG" : "en-US");

  return (
    <section id="sizes" className="relative bg-paper py-20 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-[110rem] px-5 sm:px-8 lg:px-16">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <SectionMeta index={s.index} label={s.label} />
            <h2 className="t-display fs-xl mt-6 max-w-[10ch]">
              <RevealText text={s.title} accent={s.titleAccent} accentClassName="t-serif text-clay" />
            </h2>
            <p className="t-body mt-7 max-w-md text-ink/65">{s.lead}</p>
            <p className="t-body mt-8 max-w-md border-t border-ink/15 pt-4 text-xs text-ink/60">
              {s.note}
            </p>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            {/* The range, as a single row of plates */}
            <p className="t-label mb-4 text-ink/60">{s.explorerHint}</p>
            <div className="flex flex-wrap gap-2" role="group" aria-label={s.label}>
              {sizeChart.map((size, i) => {
                const isActive = i === active;
                return (
                  <button
                    key={size.code}
                    type="button"
                    onClick={() => setActive(i)}
                    aria-pressed={isActive}
                    className={cn(
                      "t-num relative flex h-14 min-w-14 items-center justify-center border px-3 text-sm transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] sm:h-16 sm:min-w-16",
                      isActive
                        ? "border-ink bg-ink text-paper"
                        : "border-ink/20 text-ink/60 hover:border-ink/50 hover:text-ink",
                    )}
                  >
                    {size.code}
                  </button>
                );
              })}
            </div>

            {/* Measurements */}
            <div className="mt-10 border-t border-ink/15 pt-8">
              <div className="flex items-baseline justify-between gap-4">
                <p className="t-display text-[clamp(3rem,8vw,5.5rem)] leading-none">{spec.code}</p>
                <p className="t-label max-w-[14rem] text-end text-ink/60">
                  {s.fitsLabel}
                  <span className="mt-1.5 block text-ink">{spec.profile[locale]}</span>
                </p>
              </div>

              <dl className="mt-8 space-y-6">
                {measures.map((measure) => {
                  const [min, max] = measure.range;
                  const start = (min / CEILING) * 100;
                  const width = Math.max(((max - min) / CEILING) * 100, 1.5);
                  return (
                    <div key={measure.label}>
                      <div className="flex items-baseline justify-between">
                        <dt className="t-label text-ink/60">{measure.label}</dt>
                        <dd className="t-num text-sm">
                          {min === max
                            ? `${nf.format(min)} ${s.unit}`
                            : `${nf.format(min)}–${nf.format(max)} ${s.unit}`}
                        </dd>
                      </div>
                      <div className="mt-2.5 h-1.5 w-full bg-ink/8">
                        <motion.div
                          className="h-full bg-clay"
                          initial={false}
                          animate={{
                            marginInlineStart: `${start}%`,
                            width: `${width}%`,
                          }}
                          transition={{ duration: 0.7, ease: EASE }}
                        />
                      </div>
                    </div>
                  );
                })}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
