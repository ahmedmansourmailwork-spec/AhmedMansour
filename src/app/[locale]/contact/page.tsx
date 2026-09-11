import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n";
import { localeAlternates } from "@/lib/seo";
import { PageCover } from "@/components/layout/PageCover";
import { ContactBody } from "@/components/sections/ContactBody";

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
    title: dict.nav.contact,
    description: dict.contact.lead,
    alternates: localeAlternates(locale, "/contact"),
  };
}

export default async function ContactPage({
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
        eyebrow={dict.contact.eyebrow}
        title={dict.contact.title}
        accent={dict.contact.titleAccent}
        lead={dict.contact.lead}
        art="egypt-street"
        crumbs={[{ label: dict.nav.contact }]}
      />
      <ContactBody />
    </>
  );
}
