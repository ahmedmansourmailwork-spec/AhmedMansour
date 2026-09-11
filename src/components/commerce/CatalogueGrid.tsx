"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ProductCard } from "@/components/commerce/ProductCard";
import { useLocale } from "@/components/providers/LocaleProvider";
import type { CategorySlug, Product } from "@/lib/commerce/types";
import { cn } from "@/lib/utils";

type Filter = "all" | CategorySlug | string;

/**
 * Editorial grid — deliberately irregular: every fifth piece takes a double
 * column so the page never settles into a repeating tile pattern.
 */
export function CatalogueGrid({
  products,
  showFilters = false,
  lineFilter = false,
  heading,
}: {
  products: Product[];
  showFilters?: boolean;
  lineFilter?: boolean;
  /** Names the listing for assistive tech and anchors the heading outline. */
  heading?: string;
}) {
  const { dict, locale } = useLocale();
  const [filter, setFilter] = useState<Filter>("all");

  const lines = useMemo(() => {
    const set = new Map<string, string>();
    products.forEach((p) => set.set(p.line.en, p.line[locale]));
    return Array.from(set.entries());
  }, [products, locale]);

  const visible = useMemo(() => {
    if (filter === "all") return products;
    if (lineFilter) return products.filter((p) => p.line.en === filter);
    return products.filter((p) => p.category === filter);
  }, [products, filter, lineFilter]);

  const options: { key: Filter; label: string }[] = lineFilter
    ? [
        { key: "all", label: dict.showcase.filterAll },
        ...lines.map(([key, label]) => ({ key, label })),
      ]
    : [
        { key: "all", label: dict.showcase.filterAll },
        { key: "men", label: dict.nav.men },
        { key: "women", label: dict.nav.women },
        { key: "kids", label: dict.nav.kids },
      ];

  return (
    <section className="relative bg-paper py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[110rem] px-5 sm:px-8 lg:px-16">
        <h2 className="sr-only">{heading ?? dict.showcase.label}</h2>

        {(showFilters || lineFilter) && (
          <div className="mb-10 flex flex-wrap items-center justify-between gap-5 border-b border-ink/15 pb-5">
            <div className="flex flex-wrap gap-x-6 gap-y-2" role="group" aria-label={dict.showcase.label}>
              {options.map((option) => {
                const active = filter === option.key;
                return (
                  <button
                    key={String(option.key)}
                    type="button"
                    onClick={() => setFilter(option.key)}
                    aria-pressed={active}
                    className={cn(
                      "t-label relative py-1 transition-colors duration-300",
                      active ? "text-ink" : "text-ink/60 hover:text-ink/75",
                    )}
                  >
                    {option.label}
                    <span
                      aria-hidden
                      className={cn(
                        "absolute inset-x-0 -bottom-1.5 block h-px origin-left bg-clay transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] rtl:origin-right",
                        active ? "scale-x-100" : "scale-x-0",
                      )}
                    />
                  </button>
                );
              })}
            </div>
            <p className="t-num t-label text-ink/60">
              {String(visible.length).padStart(2, "0")}
            </p>
          </div>
        )}

        <div className="grid grid-cols-2 gap-x-4 gap-y-12 sm:gap-x-6 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-20">
          {visible.map((product, i) => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: (i % 4) * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className={cn(
                i % 7 === 3 && "lg:col-span-2 lg:row-span-1",
                i % 7 === 3 && "lg:[&_article>a>div]:aspect-3/2",
              )}
            >
              <ProductCard product={product} index={i} />
            </motion.div>
          ))}
        </div>

        {visible.length === 0 && (
          <p className="t-body py-16 text-center text-ink/60">{dict.cart.savedEmpty}</p>
        )}

        <p className="t-body mt-14 border-t border-ink/12 pt-5 text-xs text-ink/60">
          {dict.showcase.demoNotice}
        </p>
      </div>
    </section>
  );
}
