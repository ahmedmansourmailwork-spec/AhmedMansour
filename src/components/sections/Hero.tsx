"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion, type MotionValue } from "framer-motion";
import { BrandImage } from "@/components/ui/BrandImage";
import { ActionLink } from "@/components/ui/ActionLink";
import { useLocale } from "@/components/providers/LocaleProvider";
import type { ArtKey } from "@/lib/art-direction";
import type { Locale } from "@/i18n/config";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Three plates at three depths, the wordmark cropping across them. The type
 * sits in the page flow so it never overruns the first screen; only the plates
 * move on scroll.
 */
const plates: { art: ArtKey; className: string; rate: number }[] = [
  {
    art: "hero-primary",
    className: "absolute inset-x-0 -top-[10%] h-[126%]",
    rate: -14,
  },
  {
    art: "hero-floor",
    className:
      "absolute end-[4%] top-[11%] hidden h-[43%] w-[30%] shadow-[0_24px_70px_rgba(0,0,0,0.5)] md:block lg:w-[26%]",
    rate: -30,
  },
  {
    art: "hero-detail",
    className:
      "absolute end-[33%] top-[29%] hidden h-[21%] w-[13%] shadow-[0_20px_60px_rgba(0,0,0,0.55)] lg:block",
    rate: -52,
  },
];

export function Hero() {
  const { dict, locale } = useLocale();
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const typeY = useTransform(scrollYProgress, [0, 1], ["0%", reduced ? "0%" : "26%"]);
  const typeOpacity = useTransform(scrollYProgress, [0, 0.8], [1, reduced ? 1 : 0.15]);

  const stats = [
    { value: dict.hero.stat1Value, label: dict.hero.stat1Label },
    { value: dict.hero.stat2Value, label: dict.hero.stat2Label },
    { value: dict.hero.stat3Value, label: dict.hero.stat3Label },
  ];

  return (
    <section
      ref={ref}
      id="hero"
      className="dark-field relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-ink text-paper"
    >
      <div className="absolute inset-0">
        {plates.map((plate) => (
          <Plate
            key={plate.art}
            {...plate}
            progress={scrollYProgress}
            reduced={Boolean(reduced)}
            locale={locale}
          />
        ))}
      </div>

      {/* Scrim — enough to hold the type, not enough to flatten the cloth. */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(11,11,12,0.7)_0%,rgba(11,11,12,0.2)_40%,rgba(11,11,12,0.88)_100%)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(to_right,rgba(11,11,12,0.88)_0%,rgba(11,11,12,0.3)_55%,rgba(11,11,12,0.2)_100%)] rtl:bg-[linear-gradient(to_left,rgba(11,11,12,0.88)_0%,rgba(11,11,12,0.3)_55%,rgba(11,11,12,0.2)_100%)]"
      />

      <div className="relative z-10 flex min-h-[100svh] flex-col justify-between gap-8 px-5 pb-7 pt-[calc(var(--nav-h)+1.25rem)] sm:px-8 sm:pb-9 lg:px-16">
        <motion.header
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35, ease: EASE }}
          className="flex items-center gap-4"
        >
          <span aria-hidden className="h-px w-8 bg-clay sm:w-14" />
          <p className="t-label text-paper/70">{dict.hero.eyebrow}</p>
        </motion.header>

        <motion.div style={{ y: typeY, opacity: typeOpacity }}>
          <h1 className="t-display fs-hero">
            <MaskLine delay={0.45}>{dict.hero.titleLine1}</MaskLine>
            <MaskLine delay={0.6}>
              {/* The accent breaks the left margin — the house signature. */}
              <span className="t-serif ms-[0.12em] text-clay-soft">{dict.hero.titleAccent}</span>
            </MaskLine>
          </h1>
        </motion.div>

        <motion.footer
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.85, ease: EASE }}
          className="grid gap-7 lg:grid-cols-12 lg:items-end lg:gap-6"
        >
          <div className="lg:col-span-5">
            <p className="t-body max-w-md text-[0.9375rem] text-paper/75 sm:text-base">
              {dict.hero.lead}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <ActionLink href="/collections" variant="inverse">
                {dict.hero.ctaPrimary}
              </ActionLink>
              <ActionLink
                href="/manufacturing"
                variant="ghost"
                className="px-2 opacity-80 hover:opacity-100"
              >
                {dict.hero.ctaSecondary}
              </ActionLink>
            </div>
          </div>

          <dl className="flex flex-wrap gap-x-8 gap-y-5 lg:col-span-5 lg:col-start-8 lg:justify-end">
            {stats.map((stat) => (
              <div key={stat.label} className="border-t border-paper/25 pt-3">
                <dt className="t-label mb-1.5 text-paper/55">{stat.label}</dt>
                <dd className="t-num text-lg sm:text-xl">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </motion.footer>
      </div>

      {/* Scroll cue — trailing edge, out of the footer's way. */}
      <div
        aria-hidden
        className="pointer-events-none absolute end-4 top-1/2 z-10 hidden -translate-y-1/2 flex-col items-center gap-3 mix-blend-difference lg:flex"
      >
        <span className="t-label text-[0.5625rem] text-paper/70 [writing-mode:vertical-rl] rtl:[writing-mode:vertical-lr]">
          {dict.common.scroll}
        </span>
        <span className="block h-14 w-px overflow-hidden bg-paper/20">
          <span className="block h-full w-full origin-top bg-paper [animation:ak-scroll-cue_2.6s_ease-in-out_infinite]" />
        </span>
      </div>

    </section>
  );
}

function Plate({
  art,
  className,
  rate,
  progress,
  reduced,
  locale,
}: {
  art: ArtKey;
  className: string;
  rate: number;
  progress: MotionValue<number>;
  reduced: boolean;
  locale: Locale;
}) {
  const y = useTransform(progress, [0, 1], ["0%", reduced ? "0%" : `${rate}%`]);
  return (
    <motion.div style={{ y }} className={`overflow-hidden ${className}`}>
      <BrandImage art={art} locale={locale} className="h-full w-full" priority decorative />
    </motion.div>
  );
}

function MaskLine({ children, delay }: { children: React.ReactNode; delay: number }) {
  const reduced = useReducedMotion();
  if (reduced) return <span className="block">{children}</span>;
  return (
    <span className="mask-line block overflow-hidden">
      <motion.span
        className="block"
        initial={{ y: "108%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 1.1, delay, ease: EASE }}
      >
        {children}
      </motion.span>
    </span>
  );
}
