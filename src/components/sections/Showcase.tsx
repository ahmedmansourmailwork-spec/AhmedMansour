"use client";

import { useMemo, useRef, useState } from "react";
import { SectionMeta } from "@/components/ui/SectionMeta";
import { RevealText } from "@/components/ui/RevealText";
import { Reveal } from "@/components/ui/Reveal";
import { ProductCard } from "@/components/commerce/ProductCard";
import { LocaleLink } from "@/components/ui/LocaleLink";
import { useLocale } from "@/components/providers/LocaleProvider";
import { products } from "@/data/products";
import type { CategorySlug } from "@/lib/commerce/types";
import { cn } from "@/lib/utils";

type Filter = "all" | CategorySlug;

const filters: Filter[] = ["all", "men", "women", "kids"];

/**
 * A scrolling rail rather than a grid: the catalogue reads left to right like a
 * lookbook, snaps on touch, and steps with the arrow keys on desktop.
 */
export function Showcase() {
  const { dict, flip } = useLocale();
  const [filter, setFilter] = useState<Filter>("all");
  const railRef = useRef<HTMLUListElement>(null);
  const s = dict.showcase;

  const visible = useMemo(
    () => (filter === "all" ? products : products.filter((p) => p.category === filter)),
    [filter],
  );

  const step = (direction: -1 | 1) => {
    const rail = railRef.current;
    if (!rail) return;
    const card = rail.querySelector("li");
    const distance = card ? card.getBoundingClientRect().width + 24 : 340;
    rail.scrollBy({ left: distance * direction * flip, behavior: "smooth" });
  };

  return (
    <section id="showcase" className="relative overflow-hidden bg-paper py-20 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-[110rem] px-5 sm:px-8 lg:px-16">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <SectionMeta index={s.index} label={s.label} />
            <h2 className="t-display fs-xl mt-6">
              <RevealText text={s.title} accent={s.titleAccent} accentClassName="t-serif text-clay" />
            </h2>
          </div>
          <Reveal from="side" delay={0.1}>
            <p className="t-body max-w-sm text-ink/60 lg:text-end">{s.lead}</p>
          </Reveal>
        </div>

        {/* Filters + rail controls */}
        <div className="mt-10 flex flex-wrap items-center justify-between gap-5 border-t border-ink/15 pt-5">
          <div className="flex flex-wrap gap-x-6 gap-y-2" role="group" aria-label={s.label}>
            {filters.map((key) => {
              const active = filter === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setFilter(key)}
                  aria-pressed={active}
                  className={cn(
                    "t-label relative py-1 transition-colors duration-300",
                    active ? "text-ink" : "text-ink/60 hover:text-ink/75",
                  )}
                >
                  {key === "all" ? s.filterAll : dict.nav[key]}
                  <span
                    aria-hidden
                    className={cn(
                      "absolute inset-x-0 -bottom-px block h-px origin-left bg-clay transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] rtl:origin-right",
                      active ? "scale-x-100" : "scale-x-0",
                    )}
                  />
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            <span className="t-label hidden text-ink/60 sm:inline">{dict.common.dragOrScroll}</span>
            <div className="flex">
              {([-1, 1] as const).map((direction) => (
                <button
                  key={direction}
                  type="button"
                  onClick={() => step(direction)}
                  aria-label={direction === -1 ? dict.common.previous : dict.common.next}
                  className="flex h-9 w-9 items-center justify-center border border-ink/15 transition-colors duration-300 hover:bg-ink hover:text-paper"
                >
                  <svg
                    viewBox="0 0 24 12"
                    className={cn("h-2 w-5", direction === -1 && "rotate-180")}
                    fill="none"
                    aria-hidden
                  >
                    <path d="M0 6h22M17 1l5 5-5 5" stroke="currentColor" strokeWidth="1.4" />
                  </svg>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <ul
        ref={railRef}
        className="mt-10 flex snap-x snap-mandatory scroll-ps-5 gap-6 overflow-x-auto px-5 pb-4 [scrollbar-width:none] sm:scroll-ps-8 sm:px-8 lg:scroll-ps-16 lg:px-16 [&::-webkit-scrollbar]:hidden"
        tabIndex={0}
        aria-label={s.label}
      >
        {visible.map((product, i) => (
          <li
            key={product.id}
            className="w-[74vw] shrink-0 snap-start sm:w-[42vw] lg:w-[26vw] xl:w-[21vw]"
          >
            <ProductCard product={product} index={i} />
          </li>
        ))}
      </ul>

      <div className="mx-auto mt-8 flex max-w-[110rem] flex-wrap items-center justify-between gap-4 px-5 pe-20 sm:px-8 sm:pe-24 lg:px-16 lg:pe-28">
        <p className="t-body text-xs text-ink/60">{s.demoNotice}</p>
        <LocaleLink href="/collections" className="t-label link-rule text-clay-deep">
          {dict.common.viewAll}
        </LocaleLink>
      </div>
    </section>
  );
}
