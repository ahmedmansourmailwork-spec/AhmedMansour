"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useLocale } from "@/components/providers/LocaleProvider";

const EASE = [0.76, 0, 0.24, 1] as const;
const SESSION_KEY = "ak-brand:intro-seen";

/**
 * The opening title card. Short by design — 1.6s, once per session, skipped
 * entirely under reduced motion. It never blocks content from existing in the
 * DOM, so search engines and assistive tech are unaffected.
 */
export function Loader() {
  const reduced = useReducedMotion();
  const { dict } = useLocale();
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (reduced) return;
    let seen = false;
    try {
      seen = window.sessionStorage.getItem(SESSION_KEY) === "1";
    } catch {
      seen = false;
    }
    if (seen) return;

    setActive(true);
    document.body.style.overflow = "hidden";

    const timer = window.setTimeout(() => {
      setActive(false);
      document.body.style.overflow = "";
      try {
        window.sessionStorage.setItem(SESSION_KEY, "1");
      } catch {
        /* ignored */
      }
    }, 1750);

    return () => {
      window.clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, [reduced]);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          key="intro"
          className="dark-field fixed inset-0 z-[100] flex items-center justify-center bg-ink"
          initial={{ opacity: 1 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.85, ease: EASE }}
          aria-hidden
        >
          <div className="relative flex flex-col items-center">
            <motion.span
              className="t-display fs-xxl block text-paper"
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE }}
            >
              A&amp;K
            </motion.span>

            <motion.span
              aria-hidden
              className="my-4 block h-px bg-clay"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 0.7, delay: 0.35, ease: EASE }}
            />

            <div className="overflow-hidden">
              <motion.span
                className="t-label block text-paper/70"
                initial={{ y: "120%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 0.6, delay: 0.5, ease: EASE }}
              >
                {dict.common.wordmarkSuffix} — {dict.loader.line}
              </motion.span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
