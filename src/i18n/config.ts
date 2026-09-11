export const locales = ["en", "ar"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const localeMeta: Record<
  Locale,
  { dir: "ltr" | "rtl"; label: string; short: string; htmlLang: string }
> = {
  en: { dir: "ltr", label: "English", short: "EN", htmlLang: "en" },
  ar: { dir: "rtl", label: "العربية", short: "ع", htmlLang: "ar" },
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** Swaps the locale segment of a pathname, preserving the rest of the route. */
export function withLocale(pathname: string, locale: Locale): string {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length > 0 && isLocale(segments[0])) {
    segments[0] = locale;
  } else {
    segments.unshift(locale);
  }
  return `/${segments.join("/")}`;
}
