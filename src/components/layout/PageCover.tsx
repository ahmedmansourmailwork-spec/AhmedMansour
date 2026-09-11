"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { BrandImage } from "@/components/ui/BrandImage";
import { RevealText } from "@/components/ui/RevealText";
import { LocaleLink } from "@/components/ui/LocaleLink";
import { useLocale } from "@/components/providers/LocaleProvider";
import type { ArtKey } from "@/lib/art-direction";
import { cn } from "@/lib/utils";

export interface Crumb {
  label: string;
  href?: string;
}

/**
 * Every page opens on the same ink field, so the navigation can stay
 * transparent at the top of any route and the site reads as one publication.
 */
export function PageCover({
  eyebrow,
  title,
  accent,
  lead,
  art,
  crumbs = [],
  size = "regular",
  children,
}: {
  eyebrow: string;
  title: string;
  accent?: string;
  lead?: string;
  art: ArtKey;
  crumbs?: Crumb[];
  size?: "regular" | "tall";
  children?: React.ReactNode;
}) {
  const { dict, locale } = useLocale();
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const plateY = useTransform(scrollYProgress, [0, 1], ["0%", reduced ? "0%" : "22%"]);
  const plateScale = useTransform(scrollYProgress, [0, 1], [1, reduced ? 1 : 1.12]);

  return (
    <section
      ref={ref}
      className={cn(
        "dark-field relative isolate flex flex-col justify-end overflow-hidden bg-ink text-paper",
        size === "tall" ? "min-h-[86svh]" : "min-h-[62svh]",
      )}
    >
      <motion.div style={{ y: plateY, scale: plateScale }} className="absolute inset-0 -z-10">
        <BrandImage art={art} locale={locale} className="h-full w-full" decorative />
      </motion.div>
      <div aria-hidden className="absolute inset-0 -z-10 bg-ink/45" />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgba(11,11,12,0.97)_0%,rgba(11,11,12,0.4)_55%,rgba(11,11,12,0.75)_100%)]"
      />

      <div className="mx-auto w-full max-w-[110rem] px-5 pb-10 pt-[calc(var(--nav-h)+3rem)] sm:px-8 sm:pb-14 lg:px-16 lg:pb-16">
        {crumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <LocaleLink href="/" className="t-label text-paper/55 hover:text-paper">
                  {dict.common.brand}
                </LocaleLink>
              </li>
              {crumbs.map((crumb) => (
                <li key={crumb.label} className="flex items-center gap-2">
                  <span aria-hidden className="text-paper/55">
                    /
                  </span>
                  {crumb.href ? (
                    <LocaleLink href={crumb.href} className="t-label text-paper/55 hover:text-paper">
                      {crumb.label}
                    </LocaleLink>
                  ) : (
                    <span className="t-label text-paper/80" aria-current="page">
                      {crumb.label}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}

        <div className="flex items-center gap-4">
          <span aria-hidden className="h-px w-8 bg-clay sm:w-14" />
          <p className="t-label text-paper/70">{eyebrow}</p>
        </div>

        <h1 className={cn("t-display mt-6 max-w-[16ch]", size === "tall" ? "fs-xxl" : "fs-xl")}>
          <RevealText text={title} accent={accent} accentClassName="t-serif text-clay-soft" />
        </h1>

        {lead && <p className="t-body mt-7 max-w-xl text-paper/70">{lead}</p>}

        {children}
      </div>
    </section>
  );
}
