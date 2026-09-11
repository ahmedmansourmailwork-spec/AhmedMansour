"use client";

import { useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { BrandImage } from "@/components/ui/BrandImage";
import { LocaleLink } from "@/components/ui/LocaleLink";
import { useCart } from "@/components/providers/CartProvider";
import { useLocale } from "@/components/providers/LocaleProvider";
import { formatMoney } from "@/lib/commerce/types";
import { useFocusTrap } from "@/lib/hooks/useFocusTrap";
import type { ArtKey } from "@/lib/art-direction";

const EASE = [0.16, 1, 0.3, 1] as const;

export function CartDrawer() {
  const { dict, locale, flip } = useLocale();
  const { isOpen, close, lines, subtotal, setQuantity, remove, count } = useCart();
  const reduced = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);

  useFocusTrap(panelRef, isOpen, close);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[88]" role="dialog" aria-modal="true" aria-label={dict.cart.title}>
          <motion.button
            type="button"
            tabIndex={-1}
            aria-hidden
            onClick={close}
            className="absolute inset-0 h-full w-full cursor-default bg-ink/55 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          />

          <motion.div
            ref={panelRef}
            tabIndex={-1}
            className="absolute inset-y-0 end-0 flex w-full max-w-[26rem] flex-col bg-paper text-ink outline-none"
            initial={{ x: reduced ? 0 : `${100 * flip}%`, opacity: reduced ? 0 : 1 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: reduced ? 0 : `${100 * flip}%`, opacity: reduced ? 0 : 1 }}
            transition={{ duration: reduced ? 0.2 : 0.6, ease: EASE }}
          >
            <header className="flex items-center justify-between border-b border-ink/10 px-6 py-5">
              <h2 className="t-label">
                {dict.cart.title}
                <span className="t-num ms-2 opacity-50">({count})</span>
              </h2>
              <button type="button" onClick={close} className="t-label opacity-60 hover:opacity-100">
                {dict.common.close}
              </button>
            </header>

            <div className="flex-1 overflow-y-auto overscroll-contain px-6">
              {lines.length === 0 ? (
                <div className="flex h-full flex-col items-start justify-center gap-5">
                  <p className="t-body text-ink/60">{dict.cart.empty}</p>
                  <LocaleLink
                    href="/collections"
                    onClick={close}
                    className="t-label link-rule text-clay-deep"
                  >
                    {dict.cart.emptyCta}
                  </LocaleLink>
                </div>
              ) : (
                <ul className="divide-y divide-ink/10">
                  {lines.map((line) => (
                    <li key={line.lineId} className="flex gap-4 py-5">
                      <LocaleLink
                        href={`/product/${line.product.slug}`}
                        onClick={close}
                        className="relative block h-24 w-20 shrink-0 overflow-hidden bg-bone"
                      >
                        <BrandImage
                          art={line.product.art as ArtKey}
                          locale={locale}
                          className="h-full w-full"
                          decorative
                        />
                      </LocaleLink>

                      <div className="flex min-w-0 flex-1 flex-col">
                        <LocaleLink
                          href={`/product/${line.product.slug}`}
                          onClick={close}
                          className="t-heading text-sm leading-tight hover:text-clay-deep"
                        >
                          {line.product.name[locale]}
                        </LocaleLink>
                        <p className="t-label mt-2 text-ink/60">
                          {dict.cart.size} {line.variant.size}
                          <span className="mx-2 opacity-40">/</span>
                          {line.colour.name[locale]}
                        </p>

                        <div className="mt-auto flex items-center justify-between gap-3 pt-3">
                          <div className="flex items-center border border-ink/15">
                            <button
                              type="button"
                              onClick={() => setQuantity(line.lineId, line.quantity - 1)}
                              className="px-2.5 py-1 text-sm leading-none hover:bg-ink hover:text-paper"
                              aria-label={`${dict.cart.quantity} −`}
                            >
                              −
                            </button>
                            <span className="t-num min-w-6 text-center text-xs">{line.quantity}</span>
                            <button
                              type="button"
                              onClick={() => setQuantity(line.lineId, line.quantity + 1)}
                              className="px-2.5 py-1 text-sm leading-none hover:bg-ink hover:text-paper"
                              aria-label={`${dict.cart.quantity} +`}
                            >
                              +
                            </button>
                          </div>
                          <span className="t-num text-xs">{formatMoney(line.lineTotal, locale)}</span>
                        </div>

                        <button
                          type="button"
                          onClick={() => remove(line.lineId)}
                          className="t-label mt-2 self-start text-ink/60 underline-offset-4 hover:text-clay-deep hover:underline"
                        >
                          {dict.cart.remove}
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <footer className="border-t border-ink/10 px-6 py-5">
              <div className="flex items-baseline justify-between">
                <span className="t-label text-ink/60">{dict.cart.subtotal}</span>
                <span className="t-num text-lg">{formatMoney(subtotal, locale)}</span>
              </div>

              <button
                type="button"
                disabled
                title={dict.cart.checkoutDisabled}
                className="t-label mt-4 w-full cursor-not-allowed border border-ink/20 bg-ink/5 py-4 text-ink/60"
              >
                {dict.cart.checkout}
              </button>

              <p className="t-body mt-3 text-[0.6875rem] leading-relaxed text-ink/60">
                {dict.cart.note}
              </p>
            </footer>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
