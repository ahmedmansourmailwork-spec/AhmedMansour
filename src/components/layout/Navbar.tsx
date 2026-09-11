"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { LocaleLink } from "@/components/ui/LocaleLink";
import { LanguageToggle } from "@/components/layout/LanguageToggle";
import { MenuOverlay } from "@/components/layout/MenuOverlay";
import { useLocale } from "@/components/providers/LocaleProvider";
import { useCart } from "@/components/providers/CartProvider";
import { inlineNav } from "@/data/navigation";
import { cn } from "@/lib/utils";

export function Navbar() {
  const { dict, locale } = useLocale();
  const { count, open: openCart } = useCart();
  const pathname = usePathname() || "";
  const reduced = useReducedMotion();

  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        setScrolled(y > 48);
        // Retreat on the way down, return on the way up — never near the top.
        setHidden(y > 420 && y > lastY.current + 4);
        lastY.current = y;
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const solid = scrolled && !menuOpen;
  const strippedPath = pathname.replace(`/${locale}`, "") || "/";

  return (
    <>
      <motion.header
        className={cn(
          "fixed inset-x-0 top-0 transition-[background-color,box-shadow,backdrop-filter] duration-700",
          // While the index overlay is open the bar has to sit above it, or the
          // close control disappears behind the panel on touch devices.
          menuOpen ? "z-[92]" : "z-[80]",
          solid
            ? "border-b border-ink/10 bg-paper/88 backdrop-blur-md"
            : "border-b border-transparent bg-transparent",
          menuOpen ? "text-paper" : solid ? "text-ink" : "text-paper",
        )}
        animate={{ y: hidden && !menuOpen ? "-102%" : "0%" }}
        transition={{ duration: reduced ? 0 : 0.55, ease: [0.16, 1, 0.3, 1] }}
      >
        <div
          className={cn(
            "mx-auto flex items-center justify-between gap-4 px-5 transition-all duration-500 sm:px-8 lg:px-10",
            solid ? "h-16 lg:h-[4.25rem]" : "h-[4.5rem] lg:h-[5.5rem]",
          )}
        >
          {/* Wordmark */}
          <LocaleLink
            href="/"
            className="group flex items-baseline gap-2.5 leading-none"
            aria-label={dict.common.brandFull}
          >
            <span className="t-display text-[1.45rem] tracking-[-0.05em] sm:text-[1.6rem]">A&amp;K</span>
            <span
              className={cn(
                "t-label hidden transition-opacity duration-500 sm:block",
                solid ? "opacity-55" : "opacity-70",
              )}
            >
              {dict.common.wordmarkSuffix}
            </span>
          </LocaleLink>

          {/* Inline index */}
          <nav aria-label={dict.common.index} className="hidden lg:block">
            <ul className="flex items-center gap-8">
              {inlineNav.map((item) => {
                const active = strippedPath.startsWith(item.href);
                return (
                  <li key={item.key}>
                    <LocaleLink
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "t-label link-rule transition-opacity duration-300",
                        active ? "opacity-100" : "opacity-60 hover:opacity-100",
                      )}
                    >
                      {dict.nav[item.key]}
                    </LocaleLink>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Utilities */}
          <div className="flex items-center gap-3 sm:gap-5">
            <LanguageToggle className="hidden sm:flex" />

            <button
              type="button"
              onClick={() => {
                setMenuOpen(false);
                openCart();
              }}
              className="t-label group relative flex items-center gap-1.5 py-2 transition-opacity duration-300 hover:opacity-70"
              aria-label={`${dict.nav.cart}${count > 0 ? ` (${count})` : ""}`}
            >
              <span className="hidden xs:inline">{dict.nav.cart}</span>
              <span
                className={cn(
                  "t-num inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-[0.625rem] transition-colors duration-500",
                  count > 0 ? "bg-clay text-paper" : "border border-current opacity-60",
                )}
              >
                {count}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-label={menuOpen ? dict.common.close : dict.common.menu}
              className="t-label group flex items-center gap-2.5 py-2"
            >
              <span className="hidden sm:inline">{menuOpen ? dict.common.close : dict.common.menu}</span>
              <span className="relative flex h-3.5 w-6 flex-col justify-between" aria-hidden>
                <span
                  className={cn(
                    "block h-px w-full origin-center bg-current transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                    menuOpen ? "translate-y-[6.5px] rotate-45" : "group-hover:translate-x-0.5",
                  )}
                />
                <span
                  className={cn(
                    "block h-px w-full bg-current transition-opacity duration-300",
                    menuOpen && "opacity-0",
                  )}
                />
                <span
                  className={cn(
                    "block h-px w-full origin-center bg-current transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                    menuOpen ? "-translate-y-[6.5px] -rotate-45" : "group-hover:-translate-x-0.5",
                  )}
                />
              </span>
            </button>
          </div>
        </div>
      </motion.header>

      <MenuOverlay open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
