"use client";

import { LocaleLink } from "@/components/ui/LocaleLink";
import { LanguageToggle } from "@/components/layout/LanguageToggle";
import { useLocale } from "@/components/providers/LocaleProvider";
import { footerNav } from "@/data/navigation";
import { brand } from "@/data/brand";

export function Footer() {
  const { dict } = useLocale();
  const year = new Date().getFullYear();

  const toTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="dark-field relative bg-ink text-paper">
      <div className="mx-auto max-w-[110rem] px-5 pb-8 pt-14 sm:px-8 sm:pb-10 sm:pt-16 lg:px-10">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="t-display text-[clamp(2.5rem,8vw,5rem)] leading-[0.8]">
              A&amp;K
              <span className="t-serif ms-3 text-[0.42em] tracking-normal text-clay-soft">
                {dict.common.wordmarkSuffix}
              </span>
            </p>
            <p className="t-label mt-5 text-paper/55">
              {dict.footer.tagline1}
              <span className="mx-2 opacity-40">/</span>
              {dict.footer.tagline2}
            </p>
          </div>

          <div className="flex flex-wrap gap-x-12 gap-y-8">
            <nav aria-label={dict.footer.navTitle}>
              <p className="t-label mb-4 text-paper/55">{dict.footer.navTitle}</p>
              <ul className="space-y-2.5">
                {footerNav.map((item) => (
                  <li key={item.key}>
                    <LocaleLink href={item.href} className="t-label link-rule text-paper/80 hover:text-paper">
                      {dict.nav[item.key]}
                    </LocaleLink>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <p className="t-label mb-4 text-paper/55">{dict.footer.connectTitle}</p>
              <ul className="space-y-2.5">
                {brand.social.map((item) => (
                  <li key={item.key}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="t-label link-rule text-paper/80 hover:text-paper"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-paper/12 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="t-label text-paper/55">
            © {year} {dict.footer.credit}. {dict.footer.rights}
          </p>
          <div className="flex items-center gap-6">
            <LanguageToggle className="text-paper/70" />
            <button
              type="button"
              onClick={toTop}
              className="t-label group flex items-center gap-2 text-paper/60 transition-colors hover:text-paper"
            >
              {dict.footer.backToTop}
              <svg viewBox="0 0 12 16" className="h-3 w-2.5" fill="none" aria-hidden>
                <path
                  d="M6 15V1M1 6l5-5 5 5"
                  stroke="currentColor"
                  strokeWidth="1.3"
                  className="transition-transform duration-500 group-hover:-translate-y-0.5"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
