"use client";

import { ActionLink } from "@/components/ui/ActionLink";
import { RevealText } from "@/components/ui/RevealText";
import { Marquee } from "@/components/ui/Marquee";
import { useLocale } from "@/components/providers/LocaleProvider";
import { brand, whatsappHref } from "@/data/brand";

/** The last spread before the footer: one instruction, two ways to act on it. */
export function ClosingCta() {
  const { dict, locale } = useLocale();

  const message =
    locale === "ar"
      ? "مرحبًا A&K Brand، أود الاستفسار عن الإنتاج والجملة."
      : "Hello A&K Brand, I'd like to enquire about production and wholesale.";

  return (
    <section className="dark-field relative overflow-hidden bg-ink text-paper">
      <div className="border-b border-paper/12 py-4">
        <Marquee
          items={[dict.common.brandFull, dict.common.tagline, dict.contact.companyValue]}
          duration={70}
          itemClassName="t-display text-[clamp(2rem,7vw,5rem)] text-paper/12"
          separator={<span className="text-clay/60">/</span>}
        />
      </div>

      <div className="mx-auto max-w-[110rem] px-5 py-16 sm:px-8 sm:py-20 lg:px-16 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <h2 className="t-display fs-xl max-w-[12ch]">
              <RevealText
                text={dict.contact.title}
                accent={dict.contact.titleAccent}
                accentClassName="t-serif text-clay-soft"
              />
            </h2>
            <p className="t-body mt-6 max-w-lg text-paper/65">{dict.contact.lead}</p>
          </div>

          <div className="flex flex-wrap items-center gap-3 lg:col-span-5 lg:justify-end">
            <ActionLink href="/contact" variant="inverse">
              {dict.common.getInTouch}
            </ActionLink>
            <ActionLink
              href={whatsappHref(message)}
              variant="outlineInverse"
              external
            >
              {dict.contact.whatsappCta}
            </ActionLink>
          </div>
        </div>

        <p className="t-label mt-12 border-t border-paper/12 pt-5 text-paper/55">
          {brand.legalName[locale]}
          <span className="mx-3 opacity-40">/</span>
          {dict.contact.chairmanLabel}: {dict.chairman.honorific} {dict.chairman.name}
        </p>
      </div>
    </section>
  );
}
