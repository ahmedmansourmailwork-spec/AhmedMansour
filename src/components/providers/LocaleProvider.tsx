"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";
import type { Dictionary } from "@/i18n/dictionaries/en";
import { localeMeta, type Locale } from "@/i18n/config";

interface LocaleContextValue {
  locale: Locale;
  dict: Dictionary;
  dir: "ltr" | "rtl";
  /** +1 in LTR, -1 in RTL — multiply any horizontal motion offset by this. */
  flip: 1 | -1;
  isRtl: boolean;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({
  locale,
  dict,
  children,
}: {
  locale: Locale;
  dict: Dictionary;
  children: ReactNode;
}) {
  const value = useMemo<LocaleContextValue>(() => {
    const dir = localeMeta[locale].dir;
    return { locale, dict, dir, flip: dir === "rtl" ? -1 : 1, isRtl: dir === "rtl" };
  }, [locale, dict]);

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale(): LocaleContextValue {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used inside <LocaleProvider>");
  return ctx;
}
