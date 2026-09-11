import type { Metadata } from "next";
import { brand } from "@/data/brand";
import { locales, localeMeta, defaultLocale, type Locale } from "@/i18n/config";

/**
 * Canonical plus a complete hreflang set for one route. Page-level `alternates`
 * replaces the layout's wholesale, so every page must emit the full object.
 */
export function localeAlternates(locale: Locale, path = ""): Metadata["alternates"] {
  const languages: Record<string, string> = Object.fromEntries(
    locales.map((code) => [localeMeta[code].htmlLang, `${brand.siteUrl}/${code}${path}`]),
  );
  languages["x-default"] = `${brand.siteUrl}/${defaultLocale}${path}`;

  return {
    canonical: `${brand.siteUrl}/${locale}${path}`,
    languages,
  };
}
