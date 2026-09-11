"use client";

import { motion } from "framer-motion";
import { BrandImage } from "@/components/ui/BrandImage";
import { RevealText } from "@/components/ui/RevealText";
import { Reveal, RevealFrame } from "@/components/ui/Reveal";
import { SectionMeta } from "@/components/ui/SectionMeta";
import { useLocale } from "@/components/providers/LocaleProvider";

const EASE = [0.16, 1, 0.3, 1] as const;

export function AboutBody() {
  const { dict, locale } = useLocale();
  const a = dict.about;

  const statements = [
    { key: "who", title: a.whoTitle, body: a.whoBody },
    { key: "stand", title: a.standTitle, body: a.standBody },
    { key: "why", title: a.whyTitle, body: a.whyBody },
  ];

  return (
    <>
      {/* Three statements, uneven by design — the first carries the weight. */}
      <section className="bg-paper py-20 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-[110rem] px-5 sm:px-8 lg:px-16">
          <SectionMeta index="01" label={a.whoTitle} />
          <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-12">
            {statements.map((statement, i) => (
              <motion.div
                key={statement.key}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.8, delay: i * 0.08, ease: EASE }}
                className={
                  i === 0
                    ? "border-t border-ink/20 pt-6 lg:col-span-6"
                    : "border-t border-ink/12 pt-6 lg:col-span-3"
                }
              >
                <h2 className={i === 0 ? "t-heading fs-md" : "t-heading text-lg"}>{statement.title}</h2>
                <p
                  className={
                    i === 0
                      ? "t-body mt-4 text-ink/75"
                      : "t-body mt-4 text-sm text-ink/60"
                  }
                >
                  {statement.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision & mission, set against the ink field. */}
      <section className="dark-field bg-ink py-20 text-paper sm:py-24 lg:py-28">
        <div className="mx-auto max-w-[110rem] px-5 sm:px-8 lg:px-16">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            {[
              { key: "vision", index: "02", title: a.visionTitle, body: a.visionBody },
              { key: "mission", index: "03", title: a.missionTitle, body: a.missionBody },
            ].map((block) => (
              <div key={block.key}>
                <SectionMeta index={block.index} label={block.title} tone="paper" />
                <p className="t-display fs-lg mt-7 max-w-[18ch]">
                  <RevealText text={block.title} />
                </p>
                <p className="t-body mt-5 max-w-lg text-paper/65">{block.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-paper-dim py-20 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-[110rem] px-5 sm:px-8 lg:px-16">
          <SectionMeta index="04" label={a.valuesTitle} />
          <div className="mt-10 grid gap-px border border-ink/12 bg-ink/12 sm:grid-cols-2 lg:grid-cols-3">
            {a.values.map((value, i) => (
              <motion.div
                key={value.key}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, delay: (i % 3) * 0.07 }}
                className="group relative bg-paper-dim p-6 transition-colors duration-500 hover:bg-paper sm:p-8"
              >
                <span className="t-num t-label text-clay-deep">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="t-heading mt-4 text-lg">{value.title}</h3>
                <p className="t-body mt-2.5 text-sm text-ink/60">{value.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Journey */}
      <section className="bg-paper py-20 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-[110rem] px-5 sm:px-8 lg:px-16">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-5">
              <RevealFrame className="relative aspect-3/4 overflow-hidden bg-bone">
                <BrandImage art="about-fabric" locale={locale} className="h-full w-full" decorative />
              </RevealFrame>
            </div>

            <div className="lg:col-span-6 lg:col-start-7 lg:self-center">
              <SectionMeta index="05" label={a.journeyTitle} />
              <h2 className="t-display fs-lg mt-6 max-w-[14ch]">
                <RevealText text={a.journeyTitle} />
              </h2>
              <Reveal delay={0.1}>
                <p className="t-body mt-6 text-ink/70">{a.journeyBody}</p>
              </Reveal>
              <Reveal delay={0.18}>
                <p className="t-body mt-4 text-ink/60">{a.journeyBody2}</p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
