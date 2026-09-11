import type { Locale } from "@/i18n/config";

/** A string that exists in every locale the storefront supports. */
export type Localized<T = string> = Record<Locale, T>;

export function t<T>(value: Localized<T>, locale: Locale): T {
  return value[locale];
}

/* -------------------------------------------------------------------------- */
/*  Money                                                                      */
/* -------------------------------------------------------------------------- */

export type CurrencyCode = "EGP" | "USD" | "AED" | "SAR";

export interface Money {
  /** Minor units (piastres / cents) to avoid floating point drift. */
  amount: number;
  currency: CurrencyCode;
}

const currencyLocale: Record<CurrencyCode, string> = {
  EGP: "en-EG",
  USD: "en-US",
  AED: "en-AE",
  SAR: "en-SA",
};

export function formatMoney(money: Money, locale: Locale): string {
  const intlLocale = locale === "ar" ? "ar-EG" : currencyLocale[money.currency];
  return new Intl.NumberFormat(intlLocale, {
    style: "currency",
    currency: money.currency,
    maximumFractionDigits: 0,
  }).format(money.amount / 100);
}

/* -------------------------------------------------------------------------- */
/*  Catalogue primitives                                                       */
/* -------------------------------------------------------------------------- */

export type CategorySlug = "men" | "women" | "kids";

export type SizeCode = "XS" | "S" | "M" | "L" | "XL" | "XXL" | "XXXL";

export type InventoryStatus = "in-stock" | "low-stock" | "made-to-order";

export interface ProductColour {
  /** Stable identifier used by variants, URLs and analytics. */
  id: string;
  name: Localized;
  /** Display swatch. Replace with a fabric crop when photography lands. */
  hex: string;
}

export interface ProductVariant {
  id: string;
  sku: string;
  size: SizeCode;
  colourId: string;
  price: Money;
  compareAtPrice?: Money;
  inventory: InventoryStatus;
}

export interface Product {
  id: string;
  slug: string;
  name: Localized;
  /** Editorial one-liner used on listing tiles. */
  strapline: Localized;
  description: Localized;
  category: CategorySlug;
  /** Maps to the line keys inside the collections dictionary. */
  line: Localized;
  fabric: Localized;
  care: Localized;
  fit: Localized;
  colours: ProductColour[];
  sizes: SizeCode[];
  variants: ProductVariant[];
  /** Key into the art-direction registry (see lib/art-direction.ts). */
  art: string;
  featured?: boolean;
}

/* -------------------------------------------------------------------------- */
/*  Cart & wishlist                                                            */
/* -------------------------------------------------------------------------- */

export interface CartLine {
  lineId: string;
  productId: string;
  variantId: string;
  quantity: number;
}

export interface ResolvedCartLine extends CartLine {
  product: Product;
  variant: ProductVariant;
  colour: ProductColour;
  lineTotal: Money;
}

/* -------------------------------------------------------------------------- */
/*  Catalogue source                                                           */
/* -------------------------------------------------------------------------- */

/**
 * The storefront reads the catalogue exclusively through this interface, so the
 * static demonstration data can be swapped for a CMS, a PIM or a commerce API
 * without touching a single component.
 */
export interface CatalogueSource {
  all(): Product[];
  byCategory(category: CategorySlug): Product[];
  bySlug(slug: string): Product | undefined;
  byId(id: string): Product | undefined;
  featured(): Product[];
  related(product: Product, limit?: number): Product[];
}

export function priceFrom(product: Product): Money {
  return product.variants.reduce<Money>(
    (lowest, variant) => (variant.price.amount < lowest.amount ? variant.price : lowest),
    product.variants[0].price,
  );
}

export function findVariant(
  product: Product,
  size: SizeCode | null,
  colourId: string | null,
): ProductVariant | undefined {
  if (!size || !colourId) return undefined;
  return product.variants.find((v) => v.size === size && v.colourId === colourId);
}
