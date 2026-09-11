import type { MetadataRoute } from "next";
import { brand } from "@/data/brand";
import { locales } from "@/i18n/config";
import { products, categoryOrder } from "@/data/products";

const staticRoutes = ["", "/collections", "/about", "/manufacturing", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    const alternates = Object.fromEntries(
      locales.map((other) => [other, `${brand.siteUrl}/${other}`]),
    );

    for (const route of staticRoutes) {
      entries.push({
        url: `${brand.siteUrl}/${locale}${route}`,
        lastModified: now,
        changeFrequency: route === "" ? "weekly" : "monthly",
        priority: route === "" ? 1 : 0.8,
        alternates: {
          languages: Object.fromEntries(
            Object.entries(alternates).map(([code]) => [code, `${brand.siteUrl}/${code}${route}`]),
          ),
        },
      });
    }

    for (const category of categoryOrder) {
      entries.push({
        url: `${brand.siteUrl}/${locale}/collections/${category}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.8,
      });
    }

    for (const product of products) {
      entries.push({
        url: `${brand.siteUrl}/${locale}/product/${product.slug}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.6,
      });
    }
  }

  return entries;
}
