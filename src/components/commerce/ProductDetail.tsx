"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BrandImage } from "@/components/ui/BrandImage";
import { LocaleLink } from "@/components/ui/LocaleLink";
import { ProductCard } from "@/components/commerce/ProductCard";
import { useLocale } from "@/components/providers/LocaleProvider";
import { useCart } from "@/components/providers/CartProvider";
import { catalogue } from "@/data/products";
import { sizeChart } from "@/data/sizes";
import { findVariant, formatMoney, priceFrom, type Product, type SizeCode } from "@/lib/commerce/types";
import type { ArtKey } from "@/lib/art-direction";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

export function ProductDetail({ product }: { product: Product }) {
  const { dict, locale } = useLocale();
  const { add, isSaved, toggleSaved } = useCart();

  const [colourId, setColourId] = useState(product.colours[0].id);
  const [size, setSize] = useState<SizeCode | null>(null);
  const [openPanel, setOpenPanel] = useState<string | null>("details");
  const [showGuide, setShowGuide] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const variant = findVariant(product, size, colourId);
  const colour = product.colours.find((c) => c.id === colourId) ?? product.colours[0];
  const related = catalogue.related(product, 3);
  const saved = isSaved(product.id);

  const availability = variant
    ? variant.inventory === "in-stock"
      ? dict.product.inStock
      : variant.inventory === "low-stock"
        ? dict.product.lowStock
        : dict.product.outOfStock
    : null;

  const handleAdd = () => {
    if (!variant) {
      setFeedback(dict.product.sizeRequired);
      return;
    }
    add(product.id, variant.id, 1);
    setFeedback(dict.product.addedToBag);
  };

  const panels = [
    { key: "details", title: dict.product.details, body: product.description[locale] },
    { key: "fabric", title: dict.product.fabric, body: product.fabric[locale] },
    { key: "care", title: dict.product.care, body: product.care[locale] },
    { key: "fit", title: dict.product.fit, body: product.fit[locale] },
  ];

  return (
    <>
      {/* Ink header band — keeps the navigation legible above a light page. */}
      <div className="dark-field bg-ink pb-6 pt-[calc(var(--nav-h)+1.75rem)] text-paper">
        <div className="mx-auto flex max-w-[110rem] flex-wrap items-center gap-2 px-5 sm:px-8 lg:px-16">
          <LocaleLink href="/collections" className="t-label text-paper/55 hover:text-paper">
            {dict.nav.collections}
          </LocaleLink>
          <span aria-hidden className="text-paper/55">/</span>
          <LocaleLink
            href={`/collections/${product.category}`}
            className="t-label text-paper/55 hover:text-paper"
          >
            {dict.collections[product.category].name}
          </LocaleLink>
          <span aria-hidden className="text-paper/55">/</span>
          <span className="t-label text-paper/85">{product.name[locale]}</span>
        </div>
      </div>

      <article className="bg-paper">
        <div className="mx-auto grid max-w-[110rem] gap-10 px-5 py-10 sm:px-8 lg:grid-cols-12 lg:gap-14 lg:px-16 lg:py-14">
          {/* Plates */}
          <div className="lg:col-span-7">
            <div className="relative aspect-4/5 overflow-hidden bg-bone">
              <AnimatePresence mode="wait">
                <motion.div
                  key={colourId}
                  className="absolute inset-0"
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: EASE }}
                >
                  <BrandImage
                    art={product.art as ArtKey}
                    locale={locale}
                    className="h-full w-full"
                    sizes="(max-width: 1024px) 100vw, 58vw"
                    alt={`${product.name[locale]} — ${colour.name[locale]}`}
                  />
                </motion.div>
              </AnimatePresence>

              <span className="t-label absolute end-4 top-4 bg-ink/70 px-2.5 py-1.5 text-paper/80">
                {product.line[locale]}
              </span>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-3">
              <div className="relative aspect-3/2 overflow-hidden bg-bone">
                <BrandImage art="quality-detail" locale={locale} className="h-full w-full" decorative />
              </div>
              <div className="relative aspect-3/2 overflow-hidden bg-bone">
                <BrandImage art="manufacturing-hands" locale={locale} className="h-full w-full" decorative />
              </div>
            </div>
          </div>

          {/* Specification */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-[calc(var(--nav-h)+2rem)]">
              <p className="t-label text-clay-deep">{dict.collections[product.category].name}</p>
              <h1 className="t-display fs-lg mt-3">{product.name[locale]}</h1>
              <p className="t-body mt-3 text-ink/60">{product.strapline[locale]}</p>

              <p className="mt-6 flex items-baseline gap-2.5">
                {!variant && <span className="t-label text-ink/60">{dict.showcase.from}</span>}
                <span className="t-num text-2xl">
                  {formatMoney(variant ? variant.price : priceFrom(product), locale)}
                </span>
              </p>

              {/* Colour */}
              <fieldset className="mt-8">
                <legend className="t-label mb-3 text-ink/60">
                  {dict.product.selectColour}
                  <span className="ms-2 text-ink">{colour.name[locale]}</span>
                </legend>
                <div className="flex flex-wrap gap-2.5">
                  {product.colours.map((option) => (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => setColourId(option.id)}
                      aria-pressed={option.id === colourId}
                      aria-label={option.name[locale]}
                      className={cn(
                        "h-9 w-9 rounded-full border-2 transition-all duration-300",
                        option.id === colourId
                          ? "border-ink scale-105"
                          : "border-ink/15 hover:border-ink/45",
                      )}
                    >
                      <span
                        className="block h-full w-full rounded-full border border-paper/40"
                        style={{ backgroundColor: option.hex }}
                      />
                    </button>
                  ))}
                </div>
              </fieldset>

              {/* Size */}
              <fieldset className="mt-8">
                <div className="mb-3 flex items-baseline justify-between">
                  <legend className="t-label text-ink/60">{dict.product.selectSize}</legend>
                  <button
                    type="button"
                    onClick={() => setShowGuide((v) => !v)}
                    aria-expanded={showGuide}
                    className="t-label link-rule text-ink/60 hover:text-ink"
                  >
                    {dict.product.sizeGuide}
                  </button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((code) => {
                    const isActive = size === code;
                    const stock = product.variants.find(
                      (v) => v.size === code && v.colourId === colourId,
                    );
                    return (
                      <button
                        key={code}
                        type="button"
                        onClick={() => {
                          setSize(code);
                          setFeedback(null);
                        }}
                        aria-pressed={isActive}
                        className={cn(
                          "t-num relative flex h-12 min-w-12 items-center justify-center border px-3 text-xs transition-all duration-300",
                          isActive
                            ? "border-ink bg-ink text-paper"
                            : "border-ink/20 text-ink/70 hover:border-ink/60",
                          stock?.inventory === "made-to-order" && !isActive && "text-ink/60",
                        )}
                      >
                        {code}
                      </button>
                    );
                  })}
                </div>

                <AnimatePresence initial={false}>
                  {showGuide && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <div className="mt-5 overflow-x-auto border-t border-ink/15 pt-4">
                        <table className="w-full min-w-[22rem] text-start">
                          <caption className="t-label mb-3 text-start text-ink/60">
                            {dict.sizes.note}
                          </caption>
                          <thead>
                            <tr className="border-b border-ink/10">
                              <th scope="col" className="t-label py-2 text-start text-ink/60">
                                {dict.sizes.label}
                              </th>
                              <th scope="col" className="t-label py-2 text-start text-ink/60">
                                {dict.sizes.chestLabel}
                              </th>
                              <th scope="col" className="t-label py-2 text-start text-ink/60">
                                {dict.sizes.waistLabel}
                              </th>
                              <th scope="col" className="t-label py-2 text-start text-ink/60">
                                {dict.sizes.lengthLabel}
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {sizeChart
                              .filter((row) => product.sizes.includes(row.code))
                              .map((row) => (
                                <tr key={row.code} className="border-b border-ink/8 last:border-0">
                                  <th scope="row" className="t-num py-2 text-start text-xs">
                                    {row.code}
                                  </th>
                                  <td className="t-num py-2 text-xs text-ink/65">
                                    {row.chest[0]}–{row.chest[1]}
                                  </td>
                                  <td className="t-num py-2 text-xs text-ink/65">
                                    {row.waist[0]}–{row.waist[1]}
                                  </td>
                                  <td className="t-num py-2 text-xs text-ink/65">{row.length}</td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </fieldset>

              {/* Actions */}
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={handleAdd}
                  className="group relative flex-1 overflow-hidden border border-ink bg-ink px-8 py-4 text-paper transition-colors duration-500 hover:text-ink"
                >
                  <span
                    aria-hidden
                    className="absolute inset-0 origin-left scale-x-0 bg-paper transition-transform duration-[650ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100 rtl:origin-right"
                  />
                  <span className="t-label relative z-10">{dict.product.addToBag}</span>
                </button>

                <button
                  type="button"
                  onClick={() => toggleSaved(product.id)}
                  aria-pressed={saved}
                  className={cn(
                    "t-label border px-6 py-4 transition-colors duration-300",
                    saved ? "border-clay-deep text-clay-deep" : "border-ink/20 text-ink/60 hover:border-ink",
                  )}
                >
                  {saved ? dict.product.saved : dict.product.save}
                </button>
              </div>

              <div aria-live="polite" className="min-h-6 pt-3">
                {feedback && <p className="t-label text-clay-deep">{feedback}</p>}
              </div>

              {variant && (
                <dl className="mt-2 space-y-2 border-t border-ink/12 pt-4">
                  <div className="flex justify-between gap-4">
                    <dt className="t-label text-ink/60">{dict.product.availability}</dt>
                    <dd className="t-label text-ink/80">{availability}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="t-label text-ink/60">{dict.product.sku}</dt>
                    <dd className="t-num text-xs text-ink/80">{variant.sku}</dd>
                  </div>
                </dl>
              )}

              {/* Specification panels */}
              <div className="mt-8 border-t border-ink/15">
                {panels.map((panel) => {
                  const isOpen = openPanel === panel.key;
                  return (
                    <div key={panel.key} className="border-b border-ink/12">
                      <button
                        type="button"
                        onClick={() => setOpenPanel(isOpen ? null : panel.key)}
                        aria-expanded={isOpen}
                        className="flex w-full items-center justify-between gap-4 py-4 text-start"
                      >
                        <span className="t-label">{panel.title}</span>
                        <span
                          aria-hidden
                          className={cn(
                            "relative block h-3 w-3 transition-transform duration-500",
                            isOpen && "rotate-45",
                          )}
                        >
                          <span className="absolute inset-x-0 top-1/2 block h-px bg-current" />
                          <span
                            className={cn(
                              "absolute inset-y-0 left-1/2 block w-px bg-current transition-opacity duration-300",
                              isOpen && "opacity-100",
                            )}
                          />
                        </span>
                      </button>
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.4, ease: EASE }}
                            className="overflow-hidden"
                          >
                            <p className="t-body pb-5 text-sm text-ink/65">{panel.body}</p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>

              <p className="t-body mt-5 text-xs text-ink/60">{dict.product.demoNote}</p>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <div className="mx-auto max-w-[110rem] px-5 pb-20 sm:px-8 lg:px-16 lg:pb-28">
            <h2 className="t-heading fs-md border-t border-ink/15 pt-6">{dict.product.relatedTitle}</h2>
            <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8">
              {related.map((item, i) => (
                <ProductCard key={item.id} product={item} index={i} />
              ))}
            </div>
          </div>
        )}
      </article>
    </>
  );
}
