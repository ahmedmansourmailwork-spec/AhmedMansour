import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n";
import { brand } from "@/data/brand";

import { IndexRail } from "@/components/layout/IndexRail";
import { Hero } from "@/components/sections/Hero";
import { TickerBand } from "@/components/sections/TickerBand";
import { Philosophy } from "@/components/sections/Philosophy";
import { Collections } from "@/components/sections/Collections";
import { Showcase } from "@/components/sections/Showcase";
import { Manufacturing } from "@/components/sections/Manufacturing";
import { Quality } from "@/components/sections/Quality";
import { Fabrics } from "@/components/sections/Fabrics";
import { SizeExplorer } from "@/components/sections/SizeExplorer";
import { Origin } from "@/components/sections/Origin";
import { Leadership } from "@/components/sections/Leadership";
import { ClosingCta } from "@/components/sections/ClosingCta";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: brand.name,
    url: `${brand.siteUrl}/${locale}`,
    inLanguage: locale === "ar" ? "ar-EG" : "en",
    description: dict.meta.description,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <IndexRail />
      <Hero />
      <TickerBand />
      <Philosophy />
      <Collections />
      <Showcase />
      <Manufacturing />
      <Quality />
      <Fabrics />
      <SizeExplorer />
      <Origin />
      <Leadership />
      <ClosingCta />
    </>
  );
}
