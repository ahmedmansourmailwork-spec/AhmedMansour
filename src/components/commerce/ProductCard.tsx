"use client";

import { BrandImage } from "@/components/ui/BrandImage";
import { LocaleLink } from "@/components/ui/LocaleLink";
import { useLocale } from "@/components/providers/LocaleProvider";
import { useCart } from "@/components/providers/CartProvider";
import { formatMoney, priceFrom, type Product } from "@/lib/commerce/types";
import type { ArtKey } from "@/lib/art-direction";
import { cn } from "@/lib/utils";

export function ProductCard({
  product,
  index,
  className,
}: {
  product: Product;
  index?: number;
  className?: string;
}) {
  const { dict, locale } = useLocale();
  const { isSaved, toggleSaved } = useCart();
  const saved = isSaved(product.id);

  return (
    <article className={cn("group relative flex flex-col", className)}>
      <LocaleLink href={`/product/${product.slug}`} className="block">
        <div className="relative aspect-[4/5] overflow-hidden bg-bone">
          <BrandImage
            art={product.art as ArtKey}
            locale={locale}
            className="h-full w-full"
            imageClassName="h-full w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
            sizes="(max-width: 640px) 80vw, (max-width: 1024px) 40vw, 25vw"
            decorative
          />

          {typeof index === "number" && (
            <span className="t-num t-label absolute start-3 top-3 text-paper/70 mix-blend-difference">
              {String(index + 1).padStart(2, "0")}
            </span>
          )}

          <span
            aria-hidden
            className="absolute inset-x-0 bottom-0 flex translate-y-full items-center justify-center bg-ink/85 py-3 text-paper transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0"
          >
            <span className="t-label">{dict.showcase.viewProduct}</span>
          </span>
        </div>
      </LocaleLink>

      <div className="mt-4 flex min-h-[4.5rem] items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="t-heading text-base leading-tight">
            <LocaleLink href={`/product/${product.slug}`} className="link-rule">
              {product.name[locale]}
            </LocaleLink>
          </h3>
          <p className="t-label mt-2 text-ink/60">{product.line[locale]}</p>
        </div>
        <p className="t-num shrink-0 text-sm">{formatMoney(priceFrom(product), locale)}</p>
      </div>

      <div className="mt-3 flex items-center justify-between gap-3">
        <ul className="flex items-center gap-1.5" aria-label={dict.product.selectColour}>
          {product.colours.map((colour) => (
            <li key={colour.id}>
              <span
                className="block h-3 w-3 rounded-full border border-ink/15"
                style={{ backgroundColor: colour.hex }}
                title={colour.name[locale]}
              />
              <span className="sr-only">{colour.name[locale]}</span>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => toggleSaved(product.id)}
          aria-pressed={saved}
          aria-label={`${saved ? dict.product.saved : dict.product.save} — ${product.name[locale]}`}
          className={cn(
            "t-label transition-colors duration-300",
            saved ? "text-clay-deep" : "text-ink/60 hover:text-ink",
          )}
        >
          {saved ? dict.product.saved : dict.product.save}
        </button>
      </div>
    </article>
  );
}
