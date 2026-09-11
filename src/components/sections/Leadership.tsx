"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { SectionMeta } from "@/components/ui/SectionMeta";
import { RevealText } from "@/components/ui/RevealText";
import { BrandImage } from "@/components/ui/BrandImage";
import { Reveal } from "@/components/ui/Reveal";
import { useLocale } from "@/components/providers/LocaleProvider";
import { brand } from "@/data/brand";

/**
 * Executive spread. No portrait ships with the site and no generated likeness
 * stands in for a real person — the frame holds an abstract plate and states
 * plainly that the official photograph is pending.
 */
export function Leadership() {
  const { dict, locale } = useLocale();
  const c = dict.chairman;
  const portrait = brand.chairman.portrait;

  return (
    <section id="leadership" className="relative bg-bone py-20 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-[110rem] px-5 sm:px-8 lg:px-16">
        <SectionMeta index={c.index} label={c.label} />

        <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Portrait frame */}
          <Reveal className="lg:col-span-4" from="side">
            <figure className="relative">
              <div className="relative aspect-4/5 overflow-hidden bg-paper-dim">
                {portrait ? (
                  <Image
                    src={portrait}
                    alt={`${c.honorific} ${c.name} — ${c.role}`}
                    fill
                    sizes="(max-width: 1024px) 90vw, 30vw"
                    className="object-cover"
                  />
                ) : (
                  <>
                    <BrandImage art="chairman-portrait" locale={locale} className="h-full w-full" decorative />
                    <div
                      aria-hidden
                      className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent"
                    />
                    <div className="absolute inset-x-0 bottom-0 p-5">
                      <span className="t-label block text-paper/80">{c.portraitNote}</span>
                      <span className="t-label mt-1.5 block text-[0.5625rem] text-paper/55">
                        {c.portraitHint}
                      </span>
                    </div>
                    {/* Registration marks — the frame reads as a reserved plate. */}
                    <span aria-hidden className="absolute start-4 top-4 h-5 w-5 border-s border-t border-paper/40" />
                    <span aria-hidden className="absolute end-4 top-4 h-5 w-5 border-e border-t border-paper/40" />
                  </>
                )}
              </div>
              <figcaption className="t-label mt-4 text-ink/60">
                {c.honorific} {c.name} — {c.role}
              </figcaption>
            </figure>
          </Reveal>

          {/* Statement */}
          <div className="lg:col-span-7 lg:col-start-6">
            <p className="t-label text-clay-deep">{c.role}</p>

            <h2 className="t-display fs-xl mt-4">
              <RevealText text={`${c.honorific} ${c.name}`} />
            </h2>

            <motion.blockquote
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="relative mt-9 border-s-2 border-clay ps-6"
            >
              <p className="t-serif text-[clamp(1.25rem,2.4vw,1.875rem)] leading-[1.35] text-ink">
                {c.quote}
              </p>
            </motion.blockquote>

            <div className="mt-9 grid gap-6 sm:grid-cols-2">
              <Reveal delay={0.1}>
                <p className="t-body text-ink/70">{c.body}</p>
              </Reveal>
              <Reveal delay={0.18}>
                <p className="t-body text-ink/60">{c.body2}</p>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
