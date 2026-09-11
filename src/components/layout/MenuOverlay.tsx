"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { LocaleLink } from "@/components/ui/LocaleLink";
import { LanguageToggle } from "@/components/layout/LanguageToggle";
import { BrandImage } from "@/components/ui/BrandImage";
import { useLocale } from "@/components/providers/LocaleProvider";
import { brand } from "@/data/brand";
import { indexNav } from "@/data/navigation";
import { useFocusTrap } from "@/lib/hooks/useFocusTrap";
import { cn } from "@/lib/utils";

const EASE = [0.76, 0, 0.24, 1] as const;

export function MenuOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { dict, locale } = useLocale();
  const reduced = useReducedMotion();
  const [hovered, setHovered] = useState<number | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useFocusTrap(panelRef, open, onClose);

  const meta: Record<string, string> = {
    men: dict.collections.men.subtitle,
    women: dict.collections.women.subtitle,
    kids: dict.collections.kids.subtitle,
    manufacturing: dict.manufacturing.label,
    about: dict.about.eyebrow,
    contact: dict.contact.eyebrow,
  };

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  const activeArt = hovered !== null ? indexNav[hovered].art : null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={panelRef}
          className="dark-field fixed inset-0 z-[90] bg-ink text-paper"
          initial={{ clipPath: reduced ? undefined : "inset(0 0 100% 0)", opacity: reduced ? 0 : 1 }}
          animate={{ clipPath: "inset(0 0 0% 0)", opacity: 1 }}
          exit={{ clipPath: reduced ? undefined : "inset(0 0 100% 0)", opacity: reduced ? 0 : 1 }}
          transition={{ duration: reduced ? 0.2 : 0.75, ease: EASE }}
          role="dialog"
          aria-modal="true"
          aria-label={dict.common.menu}
        >
          {/* Hovered entry previews its plate behind the list. */}
          <div className="pointer-events-none absolute inset-0 hidden lg:block">
            <AnimatePresence>
              {activeArt && (
                <motion.div
                  key={activeArt}
                  className="absolute inset-y-0 end-0 w-[42%]"
                  initial={{ opacity: 0, scale: 1.06 }}
                  animate={{ opacity: 0.45, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                >
                  <BrandImage art={activeArt} locale={locale} className="h-full w-full" decorative />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="relative flex h-full flex-col justify-between px-6 pb-8 pt-24 sm:px-10 lg:px-16 lg:pt-28">
            <nav aria-label={dict.common.menu}>
              <ul>
                {indexNav.map((entry, i) => (
                  <motion.li
                    key={entry.href}
                    initial={{ opacity: 0, y: 34 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.12 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                    onMouseEnter={() => setHovered(i)}
                    onMouseLeave={() => setHovered((h) => (h === i ? null : h))}
                    className="border-b border-paper/12"
                  >
                    <LocaleLink
                      href={entry.href}
                      onClick={onClose}
                      className={cn(
                        "group flex items-baseline gap-4 py-3 transition-opacity duration-500 sm:gap-8 lg:py-4",
                        hovered !== null && hovered !== i && "lg:opacity-35",
                      )}
                    >
                      <span className="t-num t-label w-8 shrink-0 text-clay-soft">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="t-heading fs-lg block transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2 rtl:group-hover:-translate-x-2">
                        {dict.nav[entry.key]}
                      </span>
                      <span className="t-label ms-auto hidden self-center text-paper/55 sm:block">
                        {meta[entry.key]}
                      </span>
                    </LocaleLink>
                  </motion.li>
                ))}
              </ul>
            </nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-10 flex flex-wrap items-end justify-between gap-6"
            >
              <div className="max-w-xs">
                <p className="t-label mb-3 text-paper/55">{dict.footer.connectTitle}</p>
                <ul className="flex flex-wrap gap-x-5 gap-y-2">
                  {brand.social.map((item) => (
                    <li key={item.key}>
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="t-label link-rule text-paper/75 hover:text-paper"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <LanguageToggle className="text-paper" />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
