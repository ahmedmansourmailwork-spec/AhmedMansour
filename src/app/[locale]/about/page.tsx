import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n";
import { localeAlternates } from "@/lib/seo";
import { PageCover } from "@/components/layout/PageCover";
import { AboutBody } from "@/components/sections/AboutBody";
import { Leadership } from "@/components/sections/Leadership";
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
    title: dict.about.eyebrow,
    description: dict.about.lead,
    alternates: localeAlternates(locale, "/about"),
  };
}

export default async function AboutPage({
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
        eyebrow={dict.about.eyebrow}
        title={dict.about.title}
        accent={dict.about.titleAccent}
        lead={dict.about.lead}
        art="about-atelier"
        size="tall"
        crumbs={[{ label: dict.nav.about }]}
      />
      <AboutBody />
      <Leadership />
      <ClosingCta />
    </>
  );
}
