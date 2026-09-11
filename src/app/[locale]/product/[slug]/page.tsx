import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n";
import { localeAlternates } from "@/lib/seo";
import { ProductDetail } from "@/components/commerce/ProductDetail";
import { ClosingCta } from "@/components/sections/ClosingCta";
import { catalogue, products } from "@/data/products";
import { brand } from "@/data/brand";
import { priceFrom } from "@/lib/commerce/types";

export function generateStaticParams() {
  return locales.flatMap((locale) => products.map((product) => ({ locale, slug: product.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const product = catalogue.bySlug(slug);
  if (!isLocale(locale) || !product) return {};
  const typed = locale as Locale;
  return {
    title: product.name[typed],
    description: product.strapline[typed],
    alternates: localeAlternates(locale as Locale, `/product/${slug}`),
    openGraph: {
      title: product.name[typed],
      description: product.description[typed],
      type: "website",
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const product = catalogue.bySlug(slug);
  if (!isLocale(locale) || !product) notFound();

  const typed = locale as Locale;
  const dict = getDictionary(typed);
  const price = priceFrom(product);

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name[typed],
    description: product.description[typed],
    sku: product.variants[0]?.sku,
    brand: { "@type": "Brand", name: brand.name },
    category: dict.collections[product.category].name,
    material: product.fabric[typed],
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: price.currency,
      lowPrice: (price.amount / 100).toFixed(0),
      offerCount: product.variants.length,
      availability: "https://schema.org/PreOrder",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <ProductDetail product={product} />
      <ClosingCta />
    </>
  );
}
