"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { SectionMeta } from "@/components/ui/SectionMeta";
import { BrandImage } from "@/components/ui/BrandImage";
import { Reveal } from "@/components/ui/Reveal";
import { useLocale } from "@/components/providers/LocaleProvider";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Origin, stated in three lines that arrive in sequence — Egypt, the region,
 * the world — with no monuments and no tourism imagery.
 */
export function Origin() {
  const { dict, locale } = useLocale();
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const e = dict.egypt;

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const nearY = useTransform(scrollYProgress, [0, 1], ["8%", reduced ? "8%" : "-12%"]);
  const farY = useTransform(scrollYProgress, [0, 1], ["-4%", reduced ? "-4%" : "16%"]);

  const lines = [e.line1, e.line2, e.line3];

  return (
    <section
      ref={ref}
      id="origin"
      className="dark-field relative overflow-hidden bg-indigo py-20 text-paper sm:py-28 lg:py-32"
    >
      {/* Warp rules borrowed from the weave, scaled up as architecture. */}
      <div aria-hidden className="weave pointer-events-none absolute inset-0 text-paper opacity-[0.18]" />

      <div className="relative mx-auto max-w-[110rem] px-5 sm:px-8 lg:px-16">
        <SectionMeta index={e.index} label={e.label} tone="paper" />

        {/* The statement runs the full measure so no line ever wraps. */}
        <h2 className="t-display fs-statement mt-10">
          {lines.map((line, i) => (
            <motion.span
              key={line}
              className="mask-line block overflow-hidden"
              initial="hidden"
              whileInView="shown"
              viewport={{ once: true, amount: 0.5 }}
            >
              <motion.span
                className="block"
                variants={{ hidden: { y: "110%" }, shown: { y: "0%" } }}
                transition={{ duration: 1, delay: i * 0.14, ease: EASE }}
              >
                {i === 2 ? <span className="t-serif text-clay-soft">{line}</span> : line}
              </motion.span>
            </motion.span>
          ))}
        </h2>

        <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <div className="grid gap-6 sm:grid-cols-2">
              <Reveal delay={0.1}>
                <p className="t-body text-paper/70">{e.body}</p>
              </Reveal>
              <Reveal delay={0.18}>
                <p className="t-body text-paper/55">{e.body2}</p>
              </Reveal>
            </div>

            <dl className="mt-10 grid grid-cols-1 gap-px border border-paper/15 bg-paper/15 sm:grid-cols-3">
              {e.markers.map((marker) => (
                <div key={marker.key} className="bg-indigo p-5">
                  <dt className="t-label mb-2 text-paper/55">{marker.label}</dt>
                  <dd className="t-heading text-lg">{marker.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Two plates, two depths — street texture over built form. */}
          <div className="relative lg:col-span-4 lg:col-start-9 lg:-mt-24">
            <motion.div style={{ y: farY }} className="relative aspect-4/5 overflow-hidden">
              <BrandImage art="egypt-architecture" locale={locale} className="h-full w-full" decorative />
            </motion.div>
            <motion.div
              style={{ y: nearY }}
              className="relative -mt-16 ms-auto aspect-square w-[62%] overflow-hidden border-4 border-indigo"
            >
              <BrandImage art="egypt-street" locale={locale} className="h-full w-full" decorative />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
