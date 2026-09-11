"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SectionMeta } from "@/components/ui/SectionMeta";
import { RevealText } from "@/components/ui/RevealText";
import { BrandImage } from "@/components/ui/BrandImage";
import { useLocale } from "@/components/providers/LocaleProvider";
import type { ArtKey } from "@/lib/art-direction";
import { cn } from "@/lib/utils";

const swatchArt: ArtKey[] = [
  "product-tee",
  "about-fabric",
  "product-sport",
  "product-shirt",
  "product-trouser",
  "product-hoodie",
  "product-dress",
  "about-atelier",
];

const EASE = [0.16, 1, 0.3, 1] as const;

/** A register you read by selection, not by scrolling through eight cards. */
export function Fabrics() {
  const { dict, locale } = useLocale();
  const [active, setActive] = useState(0);
  const f = dict.fabrics;
  const current = f.items[active];

  return (
    <section id="fabrics" className="dark-field relative bg-ink py-20 text-paper sm:py-28 lg:py-32">
      <div className="mx-auto max-w-[110rem] px-5 sm:px-8 lg:px-16">
        <SectionMeta index={f.index} label={f.label} tone="paper" />

        <div className="mt-6 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="t-display fs-xl max-w-[12ch]">
            <RevealText
              text={f.title}
              accent={`${f.titleAccent} ${f.titleTail}`}
              accentClassName="t-serif text-clay-soft"
            />
          </h2>
          <p className="t-body max-w-md text-paper/60 lg:text-end">{f.lead}</p>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Register */}
          <ul className="lg:col-span-7" role="list">
            {f.items.map((item, i) => {
              const isActive = i === active;
              return (
                <li key={item.key} className="border-t border-paper/12 last:border-b">
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    aria-expanded={isActive}
                    className="group flex w-full items-center gap-5 py-4 text-start sm:py-5"
                  >
                    <span
                      className={cn(
                        "t-num t-label transition-colors duration-500",
                        isActive ? "text-clay-soft" : "text-paper/55",
                      )}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={cn(
                        "t-heading fs-md transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
                        isActive
                          ? "translate-x-2 text-paper rtl:-translate-x-2"
                          : "text-paper/55 group-hover:text-paper/85",
                      )}
                    >
                      {item.name}
                    </span>
                    <span
                      className={cn(
                        "t-label ms-auto hidden text-paper/55 transition-opacity duration-500 sm:block",
                        isActive ? "opacity-100" : "opacity-0",
                      )}
                    >
                      {item.weight}
                    </span>
                  </button>

                  {/* Detail follows the selection inline on small screens. */}
                  <div
                    className={cn(
                      "grid overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] lg:hidden",
                      isActive ? "grid-rows-[1fr] pb-6 opacity-100" : "grid-rows-[0fr] opacity-0",
                    )}
                  >
                    <div className="min-h-0">
                      <p className="t-body text-sm text-paper/65">{item.body}</p>
                      <dl className="mt-3 flex flex-wrap gap-x-6 gap-y-1">
                        <div className="flex gap-2">
                          <dt className="t-label text-paper/55">{f.weightLabel}</dt>
                          <dd className="t-label text-paper/70">{item.weight}</dd>
                        </div>
                        <div className="flex gap-2">
                          <dt className="t-label text-paper/55">{f.usedForLabel}</dt>
                          <dd className="t-label text-paper/70">{item.usedFor}</dd>
                        </div>
                      </dl>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>

          {/* Selected swatch */}
          <div className="hidden lg:col-span-5 lg:block">
            <div className="sticky top-[calc(var(--nav-h)+3rem)]">
              <div className="relative aspect-4/5 overflow-hidden bg-ink-soft">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={current.key}
                    className="absolute inset-0"
                    initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
                    animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.7, ease: EASE }}
                  >
                    <BrandImage
                      art={swatchArt[active] ?? "about-fabric"}
                      locale={locale}
                      className="h-full w-full"
                      decorative
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={current.key}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.45, ease: EASE }}
                  className="mt-6"
                >
                  <h3 className="t-heading fs-md">{current.name}</h3>
                  <p className="t-body mt-3 max-w-sm text-sm text-paper/65">{current.body}</p>
                  <dl className="mt-5 grid grid-cols-2 gap-4 border-t border-paper/12 pt-4">
                    <div>
                      <dt className="t-label mb-1.5 text-paper/55">{f.weightLabel}</dt>
                      <dd className="t-num text-sm">{current.weight}</dd>
                    </div>
                    <div>
                      <dt className="t-label mb-1.5 text-paper/55">{f.usedForLabel}</dt>
                      <dd className="t-body text-sm">{current.usedFor}</dd>
                    </div>
                  </dl>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        <p className="t-body mt-12 max-w-2xl border-t border-paper/12 pt-5 text-xs text-paper/55">
          {f.note}
        </p>
      </div>
    </section>
  );
}
