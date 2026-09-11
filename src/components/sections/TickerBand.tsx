"use client";

import { Marquee } from "@/components/ui/Marquee";
import { useLocale } from "@/components/providers/LocaleProvider";

/** The seam between spreads — a running headline in the house grotesk. */
export function TickerBand() {
  const { dict } = useLocale();

  return (
    <div className="relative border-y border-ink/10 bg-clay py-3 text-paper sm:py-4">
      <Marquee
        items={dict.ticker}
        duration={58}
        itemClassName="t-heading text-[clamp(1rem,2.4vw,1.75rem)]"
        separator={
          <svg viewBox="0 0 12 12" className="h-2 w-2" aria-hidden>
            <path d="M6 0v12M0 6h12" stroke="currentColor" strokeWidth="1.6" />
          </svg>
        }
      />
    </div>
  );
}
