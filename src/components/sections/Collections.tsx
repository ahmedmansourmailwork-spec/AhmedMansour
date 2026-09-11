"use client";

import { useState } from "react";
import { BrandImage } from "@/components/ui/BrandImage";
import { LocaleLink } from "@/components/ui/LocaleLink";
import { SectionMeta } from "@/components/ui/SectionMeta";
import { RevealText } from "@/components/ui/RevealText";
import { Reveal } from "@/components/ui/Reveal";
import { useLocale } from "@/components/providers/LocaleProvider";
import type { ArtKey } from "@/lib/art-direction";
import { cn } from "@/lib/utils";

type Panel = {
  key: "men" | "women" | "kids";
  href: string;
  art: ArtKey;
  num: string;
};

const panels: Panel[] = [
  { key: "men", href: "/collections/men", art: "collection-men", num: "01" },
  { key: "women", href: "/collections/women", art: "collection-women", num: "02" },
  { key: "kids", href: "/collections/kids", art: "collection-kids", num: "03" },
];

/**
 * Three panels sharing one horizontal field. Attention — hover or keyboard
 * focus — redistributes the width rather than opening a modal or a card grid.
 */
export function Collections({ showHeader = true }: { showHeader?: boolean } = {}) {
  // Without the section header above them, the panels are the top-level
  // headings on the page and must not skip a level under the <h1>.
  const PanelHeading = showHeader ? "h3" : "h2";
  const { dict, locale } = useLocale();
  const [active, setActive] = useState<number | null>(null);
  const c = dict.collections;

  return (
    <section id="collections" className="dark-field relative bg-ink py-20 text-paper sm:py-24 lg:py-28">
      {showHeader && (
      <div className="mx-auto max-w-[110rem] px-5 sm:px-8 lg:px-16">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <SectionMeta index={c.index} label={c.label} tone="paper" />
            <h2 className="t-display fs-xl mt-6 max-w-[12ch]">
              <RevealText text={c.title} accent={c.titleAccent} accentClassName="t-serif text-clay-soft" />
            </h2>
          </div>
          <Reveal from="side" delay={0.1}>
            <p className="t-body max-w-sm text-paper/60 lg:text-end">{c.lead}</p>
          </Reveal>
        </div>
      </div>
      )}

      <div
        className={cn(
          "flex flex-col gap-1.5 px-1.5 sm:gap-2 sm:px-3 lg:h-[78vh] lg:min-h-[34rem] lg:flex-row",
          showHeader && "mt-12 sm:mt-14",
        )}
      >
        {panels.map((panel, i) => {
          const data = c[panel.key];
          const isActive = active === i;
          const isDimmed = active !== null && !isActive;

          return (
            <LocaleLink
              key={panel.key}
              href={panel.href}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive((v) => (v === i ? null : v))}
              onFocus={() => setActive(i)}
              onBlur={() => setActive((v) => (v === i ? null : v))}
              className={cn(
                "group relative block overflow-hidden transition-[flex-grow,opacity] duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
                "h-[58vh] min-h-[22rem] lg:h-auto",
                isActive ? "lg:grow-[2.4]" : "lg:grow",
                isDimmed && "lg:opacity-70",
              )}
              style={{ flexBasis: 0 }}
              aria-label={`${data.name} — ${c.enter}`}
            >
              <div className="absolute inset-0">
                <BrandImage
                  art={panel.art}
                  locale={locale}
                  className="h-full w-full"
                  imageClassName={cn(
                    "h-full w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
                    isActive ? "scale-[1.06]" : "scale-100",
                  )}
                  decorative
                />
              </div>

              <div
                aria-hidden
                className={cn(
                  "absolute inset-0 transition-colors duration-700",
                  "bg-gradient-to-t from-ink via-ink/25 to-transparent",
                  isActive ? "opacity-95" : "opacity-80",
                )}
              />

              <div className="relative flex h-full flex-col justify-between p-5 sm:p-7">
                <div className="flex items-start justify-between gap-4">
                  <span className="t-num t-label text-paper/55">{panel.num}</span>
                  <span
                    className={cn(
                      "t-label flex items-center gap-2 text-paper transition-all duration-700",
                      isActive ? "opacity-100" : "opacity-0 lg:translate-y-1",
                    )}
                  >
                    {c.enter}
                    <svg viewBox="0 0 24 12" className="h-2 w-5 rtl:rotate-180" fill="none" aria-hidden>
                      <path d="M0 6h22M17 1l5 5-5 5" stroke="currentColor" strokeWidth="1.4" />
                    </svg>
                  </span>
                </div>

                <div>
                  <PanelHeading className="t-display fs-lg leading-[0.85]">{data.name}</PanelHeading>
                  <p className="t-label mt-3 text-clay-soft">{data.subtitle}</p>

                  <div
                    className={cn(
                      "hidden transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] lg:grid",
                      isActive ? "mt-4 grid-rows-[1fr] opacity-100" : "mt-0 grid-rows-[0fr] opacity-0",
                    )}
                  >
                    <div className="overflow-hidden">
                      <p className="t-body max-w-sm text-sm text-paper/70">{data.body}</p>
                      <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
                        {data.lines.map((line) => (
                          <li key={line} className="t-label text-paper/55">
                            {line}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* On small screens the detail is always open — no hover to rely on. */}
                  <div className="mt-4 lg:hidden">
                    <p className="t-body max-w-sm text-sm text-paper/70">{data.body}</p>
                    <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
                      {data.lines.map((line) => (
                        <li key={line} className="t-label text-paper/55">
                          {line}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </LocaleLink>
          );
        })}
      </div>
    </section>
  );
}
