import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n";
import { localeAlternates } from "@/lib/seo";
import { PageCover } from "@/components/layout/PageCover";
import { Manufacturing } from "@/components/sections/Manufacturing";
import { Quality } from "@/components/sections/Quality";
import { Fabrics } from "@/components/sections/Fabrics";
import { SizeExplorer } from "@/components/sections/SizeExplorer";
import { ClosingCta } from "@/components/sections/ClosingCta";

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
    title: dict.nav.manufacturing,
    description: dict.manufacturing.lead,
    alternates: localeAlternates(locale, "/manufacturing"),
  };
}

export default async function ManufacturingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale as Locale);

  return (
    <>
      <PageCover
        eyebrow={dict.manufacturing.label}
        title={dict.manufacturing.title}
        accent={dict.manufacturing.titleAccent}
        lead={dict.manufacturing.lead}
        art="manufacturing-wide"
        size="tall"
        crumbs={[{ label: dict.nav.manufacturing }]}
      />
      <Manufacturing />
      <Quality />
      <Fabrics />
      <SizeExplorer />
      <ClosingCta />
    </>
  );
}
