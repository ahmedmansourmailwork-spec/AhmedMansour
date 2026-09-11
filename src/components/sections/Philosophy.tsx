"use client";

import { motion } from "framer-motion";
import { SectionMeta } from "@/components/ui/SectionMeta";
import { RevealText } from "@/components/ui/RevealText";
import { Reveal } from "@/components/ui/Reveal";
import { useLocale } from "@/components/providers/LocaleProvider";

export function Philosophy() {
  const { dict } = useLocale();
  const p = dict.philosophy;

  return (
    <section id="philosophy" className="relative bg-paper py-20 sm:py-28 lg:py-36">
      <div className="mx-auto max-w-[110rem] px-5 sm:px-8 lg:px-16">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Statement — holds position while the pillars run past it. */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <SectionMeta index={p.index} label={p.label} />
              <h2 className="t-display fs-xl mt-7 max-w-[10ch]">
                <RevealText text={p.title} accent={p.titleAccent} accentClassName="t-serif text-clay" />
              </h2>
              <Reveal delay={0.15}>
                <p className="t-body mt-7 max-w-sm text-ink/65">{p.intro}</p>
              </Reveal>
            </div>
          </div>

          {/* Pillars */}
          <ol className="lg:col-span-6 lg:col-start-7">
            {p.pillars.map((pillar, i) => (
              <motion.li
                key={pillar.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.85, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="group grid grid-cols-[2.5rem_1fr] gap-x-4 border-t border-ink/15 py-7 last:border-b sm:grid-cols-[3.5rem_1fr] sm:gap-x-6 sm:py-9"
              >
                <span className="t-serif pt-1 text-lg text-clay-deep sm:text-xl">{pillar.num}</span>
                <div>
                  <h3 className="t-heading fs-md">{pillar.title}</h3>
                  <p className="t-body mt-3 max-w-lg text-ink/65">{pillar.body}</p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>

        {/* Closing line — the full measure of the page, set as large as it fits. */}
        <div className="mt-20 sm:mt-28">
          <p className="t-display fs-xxl max-w-[16ch]">
            <RevealText
              text={p.closing}
              accent={p.closingAccent}
              accentClassName="t-serif text-clay"
              stagger={0.06}
            />
          </p>
        </div>
      </div>
    </section>
  );
}
