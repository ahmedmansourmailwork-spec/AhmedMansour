"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, localeMeta, withLocale } from "@/i18n/config";
import { useLocale } from "@/components/providers/LocaleProvider";
import { cn } from "@/lib/utils";

export function LanguageToggle({ className }: { className?: string }) {
  const pathname = usePathname() || "/";
  const { locale, dict } = useLocale();

  return (
    <div className={cn("flex items-center gap-1", className)} role="group" aria-label={dict.common.languageSwitch}>
      {locales.map((code, i) => {
        const isActive = code === locale;
        return (
          <span key={code} className="flex items-center">
            {i > 0 && (
              <span aria-hidden className="mx-1 h-3 w-px bg-current opacity-25" />
            )}
            <Link
              href={withLocale(pathname, code)}
              hrefLang={localeMeta[code].htmlLang}
              aria-current={isActive ? "true" : undefined}
              aria-label={code === "ar" ? dict.common.switchToArabic : dict.common.switchToEnglish}
              className={cn(
                "t-label px-1 py-1 transition-opacity duration-300",
                isActive ? "opacity-100" : "opacity-45 hover:opacity-90",
              )}
            >
              {localeMeta[code].short}
            </Link>
          </span>
        );
      })}
    </div>
  );
}
