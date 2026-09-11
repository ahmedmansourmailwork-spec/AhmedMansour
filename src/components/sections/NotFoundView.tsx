"use client";

import { ActionLink } from "@/components/ui/ActionLink";
import { RevealText } from "@/components/ui/RevealText";
import { Marquee } from "@/components/ui/Marquee";
import { useLocale } from "@/components/providers/LocaleProvider";

export function NotFoundView() {
  const { dict } = useLocale();
  const n = dict.notFound;

  return (
    <section className="dark-field relative flex min-h-[100svh] flex-col justify-between overflow-hidden bg-ink text-paper">
      <div aria-hidden className="weave pointer-events-none absolute inset-0 opacity-20" />

      <div className="relative flex flex-1 items-center px-5 pt-[var(--nav-h)] sm:px-8 lg:px-16">
        <div className="w-full max-w-[110rem]">
          <div className="flex items-center gap-4">
            <span aria-hidden className="h-px w-10 bg-clay sm:w-16" />
            <p className="t-num t-label text-paper/70">{n.code}</p>
          </div>

          <h1 className="t-display fs-xxl mt-7 max-w-[14ch]">
            <RevealText text={n.title} accent={n.titleAccent} accentClassName="t-serif text-clay-soft" />
          </h1>

          <p className="t-body mt-7 max-w-md text-paper/65">{n.body}</p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <ActionLink href="/" variant="inverse">
              {n.cta}
            </ActionLink>
            <ActionLink href="/collections" variant="outlineInverse">
              {n.secondary}
            </ActionLink>
          </div>
        </div>
      </div>

      <div className="relative border-t border-paper/12 py-5">
        <Marquee
          items={[dict.common.brandFull, dict.common.tagline, n.code]}
          duration={52}
          itemClassName="t-display text-[clamp(1.5rem,5vw,3.5rem)] text-paper/10"
          separator={<span className="text-clay/50">/</span>}
        />
      </div>
    </section>
  );
}
