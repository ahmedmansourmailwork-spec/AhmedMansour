# A&K Brand

The official website for **A&K Brand** — an Egyptian clothing company and
manufacturing house producing menswear, womenswear and kidswear.

Bilingual (Arabic / English) with genuine RTL support, built as a marketing site
on top of a commerce architecture that is ready to become a full store.

---

## Running it

```bash
npm install
npm run dev        # http://localhost:3000 → redirects to /en or /ar
```

```bash
npm run build && npm run start   # production
npm run lint                     # eslint
npm run typecheck                # tsc --noEmit
```

Requires Node 20+. The first `build` downloads the web fonts through
`next/font`, so it needs network access once.

---

## Art direction

The site is designed as *Editorial Industrial* — a fashion magazine printed on a
factory floor.

| | |
|---|---|
| **Palette** | Ink `#0b0b0c` · Paper `#f4f1ec` · Bone `#e6e1d8` · Indigo `#1e2a38`, with **Clay** `#c4502b` as the single accent |
| **Type** | Archivo (industrial grotesk, set large and tight) × Instrument Serif italic for exactly one accent word per spread × IBM Plex Sans Arabic and Alexandria for Arabic |
| **Signature** | A vertical index rail, a warp/weft rule system borrowed from woven cloth, and oversized type cropping against image edges |
| **Motion** | Lenis smooth scrolling, masked line and word reveals, clip-path image reveals, sticky scroll storytelling, magnetic CTAs — all disabled under `prefers-reduced-motion` |

Every colour token is defined once in `src/app/globals.css` under `@theme`.

---

## Replacing the placeholders

Nothing in the codebase invents a fact. Everything provisional lives in two
files.

### 1. Company details — `src/data/brand.ts`

Phone, WhatsApp, email, address, working hours and social links are all marked
`placeholder: true` and render with a discreet "placeholder" chip on the contact
page. Replace the values and set the flag to `false`.

```ts
whatsapp: {
  placeholder: false,
  number: "201234567890",   // digits only, international, no + or spaces
  value: "+20 123 456 7890",
},
```

The floating WhatsApp button, the contact page and the closing call to action
all read from here — there is no phone number hard-coded anywhere else.

### 2. The chairperson's portrait

No photograph ships with the site, and **no AI-generated likeness is used to
represent a real person**. The frame renders an abstract plate with a visible
"official portrait to be added" marker until you supply the real image:

```ts
// src/data/brand.ts
chairman: {
  nameEn: "Kholoud Saad",
  nameAr: "خلود سعد",
  portrait: "/images/chairman.jpg",   // drop the file into /public/images
}
```

### 3. Photography — `src/lib/art-direction.ts`

Rather than filling the site with generic stock, every image slot is registered
with the brief for the shot that belongs in it, and renders until then as a
generated woven-fabric plate in the brand's duotone system (drape folds, warp
and weft rules, film grain — deterministic per slot).

To add real photography:

1. Put the file in `/public/images`, e.g. `/public/images/hero-primary.jpg`
2. Set `src` on the matching registry entry

```ts
"hero-primary": {
  brief: "Full-length editorial portrait, three models …",
  tone: "indigo",
  seed: "hero-a",
  src: "/images/hero-primary.jpg",   // ← add this
},
```

`<BrandImage>` switches to `next/image` automatically — no component changes.
The `brief` doubles as the alt text, so keep it descriptive.

### 4. Site origin

Set `NEXT_PUBLIC_SITE_URL` (see `.env.example`) before deploying. It drives
canonical URLs, hreflang alternates, `sitemap.xml` and Open Graph tags.

---

## Content and translation

All copy lives in `src/i18n/dictionaries/{en,ar}.ts`. The Arabic is written for
an Egyptian and Arab audience rather than translated word-for-word, and the two
dictionaries are structurally identical — `ar` is typed as `Dictionary`, so a
missing or renamed key is a compile error, not a runtime blank.

RTL is a layout change, not a text direction flag: `dir` is set on `<html>`,
spacing uses logical properties (`ms-`, `pe-`, `text-start`), horizontal motion
offsets are multiplied by a direction factor from `useLocale().flip`, the type
scale and line height switch to the Arabic faces, and reveal masks grow to clear
Arabic descenders.

---

## E-commerce architecture

The storefront is built against an interface, not against the sample data.

```
src/lib/commerce/types.ts     Money, Product, ProductVariant, ProductColour,
                              SizeCode, InventoryStatus, CartLine, CatalogueSource
src/data/products.ts          Demonstration catalogue + the CatalogueSource adapter
src/components/providers/     CartProvider — cart + wishlist, localStorage-backed
```

Every component reads the catalogue through `CatalogueSource`. To move to a CMS,
PIM or commerce API, implement that interface and swap the export in
`src/data/products.ts`; nothing else changes.

**Working today:** product catalogue, product detail pages, colour and size
variants, per-variant SKUs and pricing, inventory states, cart drawer with
quantity editing, wishlist, and persistence across reloads.

**Deliberately not wired:** checkout and payment. The checkout button is present
and disabled with an explanatory note. Adding a gateway means implementing the
checkout step — the cart, variants and pricing are already in place.

Prices and stock are demonstration data and are labelled as such in the UI.

---

## Project structure

```
src/
  app/
    [locale]/                  every route lives under a locale segment
      layout.tsx               <html>, fonts, providers, chrome, metadata
      page.tsx                 homepage
      collections/             index + [category]
      product/[slug]/          product detail
      about/ manufacturing/ contact/
      [...rest]/               catch-all → branded 404 inside the site chrome
      opengraph-image.tsx      generated share card
    globals.css                design system (@theme + @layer base/components)
    sitemap.ts robots.ts
  components/
    layout/                    Navbar, MenuOverlay, Footer, IndexRail, PageCover,
                               Loader, CursorHalo, WhatsAppButton, LanguageToggle
    sections/                  one file per spread of the homepage
    commerce/                  ProductCard, CatalogueGrid, ProductDetail, CartDrawer
    ui/                        BrandImage, Reveal, RevealText, Marquee, Magnetic,
                               ActionLink, Counter, SectionMeta, Grain, LocaleLink
    providers/                 LocaleProvider, CartProvider, SmoothScroll
  data/                        brand, products, sizes, navigation
  i18n/                        locale config + dictionaries
  lib/                         commerce types, art direction, seo, hooks, utils
  middleware.ts                locale negotiation and redirect
```

---

## Accessibility

- Skip link as the first tab stop; `<main>` is focusable
- Focus trapping and focus restoration in the menu overlay and cart drawer,
  Escape to dismiss
- One `<h1>` per page and no skipped heading levels
- Every control has an accessible name; form fields have real `<label>`s
- Text colours meet WCAG AA (4.5:1 small, 3:1 large) on their own grounds
- All motion is gated behind `prefers-reduced-motion`; no content depends on an
  animation to become visible
- Hover-only detail is duplicated inline at small screen sizes

## SEO

Per-locale titles and descriptions, canonical URLs, a complete hreflang set
including `x-default`, Open Graph and Twitter cards, a generated share image,
`Organization`, `WebSite` and `Product` JSON-LD, plus `sitemap.xml` and
`robots.txt` generated from the catalogue.

---

© A&K Brand — Clothing Company & Factory.
