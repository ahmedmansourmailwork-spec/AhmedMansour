/**
 * A&K BRAND — SINGLE SOURCE OF TRUTH FOR COMPANY DETAILS
 * ---------------------------------------------------------------------------
 * Every value marked PLACEHOLDER is invented only in shape, never in fact.
 * Replace them here once the official channels are issued — nothing else in
 * the codebase hard-codes a phone number, address or social handle.
 */

export interface BrandContactField {
  /** PLACEHOLDER values are rendered with a discreet "to be confirmed" marker. */
  placeholder: boolean;
  value: string;
  href?: string;
}

export const brand = {
  name: "A&K Brand",
  shortName: "A&K",
  legalName: {
    en: "A&K Brand — Clothing Company & Factory",
    ar: "A&K Brand — شركة ومصنع ملابس",
  },
  founded: "Egypt",
  /** Used for canonical URLs, sitemap and Open Graph. Update on deployment. */
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://ak-brand.example",

  chairman: {
    nameEn: "Kholoud Saad",
    nameAr: "خلود سعد",
    /**
     * PLACEHOLDER — no portrait is shipped. No AI-generated likeness is used
     * to represent a real person. Drop the official photograph into
     * /public/images/chairman.jpg and set the path here.
     */
    portrait: null as string | null,
  },

  contact: {
    phone: { placeholder: true, value: "+20 (0)00 000 0000", href: "tel:+200000000000" },
    whatsapp: {
      placeholder: true,
      /** Digits only, international format, no + or spaces. */
      number: "200000000000",
      value: "+20 (0)00 000 0000",
    },
    email: { placeholder: true, value: "hello@ak-brand.example", href: "mailto:hello@ak-brand.example" },
    wholesaleEmail: {
      placeholder: true,
      value: "wholesale@ak-brand.example",
      href: "mailto:wholesale@ak-brand.example",
    },
    address: {
      placeholder: true,
      en: "Factory & Head Office — Governorate, Egypt",
      ar: "المصنع والمقر الرئيسي — المحافظة، مصر",
    },
    hours: {
      placeholder: true,
      en: "Sunday – Thursday, 09:00 – 17:00 (EET)",
      ar: "الأحد – الخميس، ٩:٠٠ – ١٧:٠٠ بتوقيت القاهرة",
    },
  },

  /** PLACEHOLDER handles — replace with the official accounts when live. */
  social: [
    { key: "instagram", label: "Instagram", handle: "@akbrand", href: "https://instagram.com/", placeholder: true },
    { key: "facebook", label: "Facebook", handle: "A&K Brand", href: "https://facebook.com/", placeholder: true },
    { key: "tiktok", label: "TikTok", handle: "@akbrand", href: "https://tiktok.com/", placeholder: true },
    { key: "youtube", label: "YouTube", handle: "A&K Brand", href: "https://youtube.com/", placeholder: true },
  ],
} as const;

export type SocialLink = (typeof brand.social)[number];

/** Prefilled WhatsApp deep link. Message text is localised by the caller. */
export function whatsappHref(message?: string): string {
  const base = `https://wa.me/${brand.contact.whatsapp.number}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
