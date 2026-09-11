import type { Dictionary } from "@/i18n/dictionaries/en";
import type { ArtKey } from "@/lib/art-direction";

export interface NavItem {
  key: keyof Dictionary["nav"];
  href: string;
}

export interface IndexNavItem extends NavItem {
  /** Plate previewed behind the entry while it is hovered. */
  art: ArtKey;
}

/** Condensed set shown inline in the bar. Paths are locale-relative. */
export const inlineNav: NavItem[] = [
  { key: "collections", href: "/collections" },
  { key: "manufacturing", href: "/manufacturing" },
  { key: "about", href: "/about" },
  { key: "contact", href: "/contact" },
];

/** The full index, shown in the overlay. */
export const indexNav: IndexNavItem[] = [
  { key: "men", href: "/collections/men", art: "collection-men" },
  { key: "women", href: "/collections/women", art: "collection-women" },
  { key: "kids", href: "/collections/kids", art: "collection-kids" },
  { key: "manufacturing", href: "/manufacturing", art: "manufacturing-wide" },
  { key: "about", href: "/about", art: "about-atelier" },
  { key: "contact", href: "/contact", art: "egypt-street" },
];

export const footerNav: NavItem[] = [
  { key: "collections", href: "/collections" },
  { key: "about", href: "/about" },
  { key: "manufacturing", href: "/manufacturing" },
  { key: "contact", href: "/contact" },
];

/** Section index used by the vertical rail on the homepage. */
export const homeSections = [
  { id: "hero", num: "00" },
  { id: "philosophy", num: "01" },
  { id: "collections", num: "02" },
  { id: "showcase", num: "03" },
  { id: "manufacturing", num: "04" },
  { id: "quality", num: "05" },
  { id: "fabrics", num: "06" },
  { id: "sizes", num: "07" },
  { id: "origin", num: "08" },
  { id: "leadership", num: "09" },
] as const;
