import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n";
import { localeAlternates } from "@/lib/seo";
import { PageCover } from "@/components/layout/PageCover";
import { CatalogueGrid } from "@/components/commerce/CatalogueGrid";
import { ClosingCta } from "@/components/sections/ClosingCta";
import { catalogue, categoryOrder } from "@/data/products";
import type { CategorySlug } from "@/lib/commerce/types";
import type { ArtKey } from "@/lib/art-direction";

const categoryArt: Record<CategorySlug, ArtKey> = {
  men: "collection-men",
  women: "collection-women",
  kids: "collection-kids",
};

function isCategory(value: string): value is CategorySlug {
  return (categoryOrder as string[]).includes(value);
}

export function generateStaticParams() {
  return locales.flatMap((locale) => categoryOrder.map((category) => ({ locale, category })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; category: string }>;
}): Promise<Metadata> {
  const { locale, category } = await params;
  if (!isLocale(locale) || !isCategory(category)) return {};
  const dict = getDictionary(locale);
  const data = dict.collections[category];
  return {
    title: `${data.name} — ${dict.nav.collections}`,
    description: data.body,
    alternates: localeAlternates(locale, `/collections/${category}`),
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ locale: string; category: string }>;
}) {
  const { locale, category } = await params;
  if (!isLocale(locale) || !isCategory(category)) notFound();

  const typed = locale as Locale;
  const dict = getDictionary(typed);
  const data = dict.collections[category];
  const items = catalogue.byCategory(category);

  return (
    <>
      <PageCover
        eyebrow={dict.collections.label}
        title={data.name}
        accent={data.subtitle}
        lead={data.body}
        art={categoryArt[category]}
        size="tall"
        crumbs={[{ label: dict.nav.collections, href: "/collections" }, { label: data.name }]}
      >
        <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-3 border-t border-paper/15 pt-6">
          {data.lines.map((line, i) => (
            <li key={line} className="flex items-baseline gap-2">
              <span className="t-num t-label text-clay-soft">{String(i + 1).padStart(2, "0")}</span>
              <span className="t-label text-paper/75">{line}</span>
            </li>
          ))}
        </ul>
      </PageCover>

      <CatalogueGrid products={items} lineFilter heading={`${data.name} — ${dict.showcase.label}`} />
      <ClosingCta />
    </>
  );
}
