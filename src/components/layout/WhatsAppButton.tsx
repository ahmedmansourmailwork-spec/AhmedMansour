"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { brand, whatsappHref } from "@/data/brand";
import { useLocale } from "@/components/providers/LocaleProvider";

/**
 * Floating contact affordance. It stays out of the way until the visitor has
 * committed to the page (past the first screen), and never covers the footer's
 * own controls on small screens.
 */
export function WhatsAppButton() {
  const { dict, locale } = useLocale();
  const reduced = useReducedMotion();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.75);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const message =
    locale === "ar"
      ? "مرحبًا A&K Brand، أود الاستفسار عن منتجاتكم."
      : "Hello A&K Brand, I'd like to enquire about your products.";

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href={whatsappHref(message)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={dict.contact.whatsappCta}
          title={
            brand.contact.whatsapp.placeholder
              ? `${dict.contact.whatsappCta} — ${brand.contact.whatsapp.value}`
              : dict.contact.whatsappCta
          }
          className="group fixed bottom-5 end-5 z-[75] flex h-12 w-12 items-center justify-center rounded-full bg-ink text-paper shadow-[0_8px_30px_rgba(11,11,12,0.28)] transition-colors duration-500 hover:bg-clay sm:bottom-7 sm:end-7 sm:h-14 sm:w-14"
          initial={{ opacity: 0, scale: 0.7, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.7, y: 12 }}
          transition={{ duration: reduced ? 0 : 0.45, ease: [0.16, 1, 0.3, 1] }}
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5 sm:h-6 sm:w-6" fill="currentColor" aria-hidden>
            <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.76-1.66-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35z" />
            <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.32 4.96L2 22l5.25-1.38a9.87 9.87 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.85 9.85 0 0 0 12.04 2zm0 18.15h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.11.82.83-3.04-.2-.31a8.16 8.16 0 0 1-1.25-4.37c0-4.54 3.7-8.24 8.24-8.24 2.2 0 4.27.86 5.83 2.41a8.19 8.19 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.26 8.24z" />
          </svg>
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-full border border-current opacity-0 transition-all duration-700 group-hover:scale-125 group-hover:opacity-30"
          />
        </motion.a>
      )}
    </AnimatePresence>
  );
}
