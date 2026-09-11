import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n";
import { localeAlternates } from "@/lib/seo";
import { PageCover } from "@/components/layout/PageCover";
import { Collections } from "@/components/sections/Collections";
import { CatalogueGrid } from "@/components/commerce/CatalogueGrid";
import { ClosingCta } from "@/components/sections/ClosingCta";
import { products } from "@/data/products";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return {
    title: dict.nav.collections,
    description: dict.collections.lead,
    alternates: localeAlternates(locale, "/collections"),
  };
}

export default async function CollectionsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  return (
    <>
      <PageCover
        eyebrow={dict.collections.label}
        title={dict.collections.title}
        accent={dict.collections.titleAccent}
        lead={dict.collections.lead}
        art="hero-primary"
        crumbs={[{ label: dict.nav.collections }]}
      />
      <Collections showHeader={false} />
      <CatalogueGrid products={products} showFilters heading={dict.showcase.label} />
      <ClosingCta />
    </>
  );
}
