import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import "../globals.css";

import { fontVariables } from "@/app/fonts";
import { getDictionary } from "@/i18n";
import { isLocale, locales, localeMeta, type Locale } from "@/i18n/config";
import { brand } from "@/data/brand";
import { localeAlternates } from "@/lib/seo";

import { LocaleProvider } from "@/components/providers/LocaleProvider";
import { CartProvider } from "@/components/providers/CartProvider";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Loader } from "@/components/layout/Loader";
import { CursorHalo } from "@/components/layout/CursorHalo";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { CartDrawer } from "@/components/commerce/CartDrawer";
import { Grain } from "@/components/ui/Grain";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: "#0b0b0c",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  const url = `${brand.siteUrl}/${locale}`;

  return {
    metadataBase: new URL(brand.siteUrl),
    title: { default: dict.meta.title, template: dict.meta.titleTemplate },
    description: dict.meta.description,
    keywords: dict.meta.keywords.split(",").map((k) => k.trim()),
    applicationName: brand.name,
    authors: [{ name: brand.name }],
    creator: brand.name,
    publisher: brand.name,
    alternates: localeAlternates(locale),
    openGraph: {
      type: "website",
      siteName: brand.name,
      title: dict.meta.title,
      description: dict.meta.description,
      url,
      locale: locale === "ar" ? "ar_EG" : "en_US",
      images: [{ url: `/${locale}/opengraph-image`, width: 1200, height: 630, alt: dict.meta.ogAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.title,
      description: dict.meta.description,
      images: [`/${locale}/opengraph-image`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large" },
    },
    icons: {
      icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
      apple: [{ url: "/icon.svg" }],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const typed = locale as Locale;
  const dict = getDictionary(typed);
  const { dir, htmlLang } = localeMeta[typed];

  const organisationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: brand.name,
    alternateName: brand.legalName[typed],
    url: `${brand.siteUrl}/${typed}`,
    description: dict.meta.description,
    foundingLocation: { "@type": "Country", name: "Egypt" },
    address: { "@type": "PostalAddress", addressCountry: "EG" },
    employee: {
      "@type": "Person",
      name: typed === "ar" ? brand.chairman.nameAr : brand.chairman.nameEn,
      jobTitle: dict.chairman.role,
    },
    sameAs: brand.social.map((s) => s.href),
  };

  return (
    <html lang={htmlLang} dir={dir} className={fontVariables} suppressHydrationWarning>
      <body className="relative antialiased">
        <script
          type="application/ld+json"
          // Structured data is generated from local, trusted brand data only.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organisationSchema) }}
        />

        <LocaleProvider locale={typed} dict={dict}>
          <CartProvider>
            <a
              href="#main"
              className="sr-only-focusable fixed start-4 top-4 z-[120] bg-ink px-5 py-3 text-paper t-label"
            >
              {dict.common.skipToContent}
            </a>

            <SmoothScroll />
            <Loader />
            <CursorHalo />
            <Grain />

            <Navbar />

            <main id="main" tabIndex={-1} className="relative outline-none">
              {children}
            </main>

            <Footer />
            <WhatsAppButton />
            <CartDrawer />
          </CartProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
