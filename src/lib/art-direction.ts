/**
 * A&K ART DIRECTION REGISTRY
 * ---------------------------------------------------------------------------
 * The site ships without licensed photography. Rather than filling it with
 * generic stock, every image slot is registered here with the brief for the
 * shot that belongs in it, and is rendered until then as a generated woven
 * fabric plate in the brand's duotone system.
 *
 * TO ADD REAL PHOTOGRAPHY
 *   1. Drop the file into /public/images (e.g. /public/images/hero-primary.jpg)
 *   2. Set `src` on the matching entry below.
 * Nothing else changes — <BrandImage> switches to next/image automatically.
 */

export type ArtTone = "ink" | "clay" | "indigo" | "sand" | "bone" | "paper";

export interface ArtEntry {
  /** Direction for the photographer / retoucher. Also used as the alt text. */
  brief: string;
  briefAr: string;
  tone: ArtTone;
  /** Deterministic seed — changing it regenerates the weave composition. */
  seed: string;
  /** Real photography, once available. */
  src?: string;
  /** Intrinsic ratio hint for layout stability. */
  ratio?: number;
}

export const artRegistry = {
  "hero-primary": {
    brief:
      "Full-length editorial portrait, three models in A&K menswear, womenswear and kidswear against a raw plaster wall, hard side light",
    briefAr:
      "بورتريه إديتوريال بالطول الكامل يجمع ثلاثة عارضين بملابس A&K رجالي وحريمي وأطفال أمام جدار محارة خام بإضاءة جانبية حادة",
    tone: "indigo",
    seed: "hero-a",
    ratio: 3 / 4,
  },
  "hero-detail": {
    brief: "Macro detail of a shoulder seam and topstitching on heavyweight cotton",
    briefAr: "لقطة ماكرو لحياكة الكتف والغرز الظاهرة على قطن ثقيل",
    tone: "clay",
    seed: "hero-b",
    ratio: 1,
  },
  "hero-floor": {
    brief: "Cutting table in the factory, fabric spread mid-lay, overhead angle",
    briefAr: "طاولة القص داخل المصنع والخامة مفرودة، لقطة من أعلى",
    tone: "bone",
    seed: "hero-c",
    ratio: 4 / 5,
  },
  "collection-men": {
    brief: "Menswear campaign frame — structured shirt and trousers, neutral studio, standing figure cropped at the chin",
    briefAr: "لقطة حملة رجالي — قميص مهيكل وبنطلون في استوديو محايد، والقَصّة عند الذقن",
    tone: "indigo",
    seed: "col-men",
    ratio: 4 / 5,
  },
  "collection-women": {
    brief: "Womenswear campaign frame — drape-led silhouette in motion, warm neutral backdrop",
    briefAr: "لقطة حملة حريمي — سيلويت يعتمد على انسدال الخامة أثناء الحركة على خلفية محايدة دافئة",
    tone: "clay",
    seed: "col-women",
    ratio: 4 / 5,
  },
  "collection-kids": {
    brief: "Kidswear campaign frame — child mid-movement, bright but restrained palette, daylight",
    briefAr: "لقطة حملة أطفال — طفل أثناء الحركة بألوان مشرقة لكن منضبطة وإضاءة نهار",
    tone: "sand",
    seed: "col-kids",
    ratio: 4 / 5,
  },
  "manufacturing-wide": {
    brief: "Wide shot of the production floor, sewing lines in perspective, natural light from high windows",
    briefAr: "لقطة واسعة لصالة الإنتاج وخطوط الحياكة بمنظور ممتد وإضاءة طبيعية من النوافذ العلوية",
    tone: "ink",
    seed: "mfg-wide",
    ratio: 16 / 10,
  },
  "manufacturing-hands": {
    brief: "Hands guiding fabric under a machine foot, shallow depth of field",
    briefAr: "أيدٍ توجّه الخامة أسفل قدم الماكينة بعمق ميدان ضحل",
    tone: "clay",
    seed: "mfg-hands",
    ratio: 1,
  },
  "manufacturing-qc": {
    brief: "Quality control station — garment on a measuring table with a tape and spec sheet",
    briefAr: "محطة مراقبة الجودة — قطعة على طاولة القياس مع شريط قياس وورقة مواصفات",
    tone: "bone",
    seed: "mfg-qc",
    ratio: 4 / 3,
  },
  "quality-detail": {
    brief: "Stitch density close-up across a double-needle hem",
    briefAr: "لقطة قريبة لكثافة الغرزة على حاشية بإبرتين",
    tone: "indigo",
    seed: "qc-detail",
    ratio: 3 / 2,
  },
  "egypt-architecture": {
    brief: "Contemporary Egyptian architecture — concrete geometry and shadow, no landmarks",
    briefAr: "عمارة مصرية معاصرة — هندسة خرسانية وظلال، دون معالم سياحية",
    tone: "sand",
    seed: "eg-arch",
    ratio: 4 / 5,
  },
  "egypt-street": {
    brief: "Street texture — painted wall, worn metal shutter, late afternoon light",
    briefAr: "ملمس الشارع — جدار مدهون وشيش معدني مستهلك في ضوء العصر",
    tone: "clay",
    seed: "eg-street",
    ratio: 1,
  },
  "chairman-portrait": {
    brief: "Official portrait of the Chairperson of the Board — to be supplied by the company",
    briefAr: "البورتريه الرسمي لرئيس مجلس الإدارة — تُورَّد من الشركة",
    tone: "ink",
    seed: "chair",
    ratio: 4 / 5,
  },
  "about-atelier": {
    brief: "Design studio — pattern paper, fabric swatches and a dress form",
    briefAr: "استوديو التصميم — ورق الباترون وعينات الخامات ومانيكان",
    tone: "bone",
    seed: "about-a",
    ratio: 3 / 2,
  },
  "about-fabric": {
    brief: "Rolled fabric bolts stacked by weight and colour",
    briefAr: "توب خامات ملفوفة ومرتّبة حسب الوزن واللون",
    tone: "indigo",
    seed: "about-b",
    ratio: 4 / 5,
  },
  "product-tee": {
    brief: "Heavyweight cotton t-shirt, flat lay with raking light",
    briefAr: "تيشيرت قطن ثقيل، تصوير مسطّح بإضاءة مائلة",
    tone: "bone",
    seed: "p-tee",
    ratio: 4 / 5,
  },
  "product-shirt": {
    brief: "Shirt on a hanger against plaster, collar and placket in focus",
    briefAr: "قميص على شماعة أمام جدار محارة مع التركيز على الياقة والقبة",
    tone: "paper",
    seed: "p-shirt",
    ratio: 4 / 5,
  },
  "product-hoodie": {
    brief: "Hoodie worn, hood up, cropped at the mouth, studio grey",
    briefAr: "هودي مرتدى والكابوشة مرفوعة، القَصّة عند الفم، استوديو رمادي",
    tone: "ink",
    seed: "p-hoodie",
    ratio: 4 / 5,
  },
  "product-trouser": {
    brief: "Trousers on the body from the waist down, side stance, hard shadow",
    briefAr: "بنطلون على الجسم من الوسط لأسفل بوقفة جانبية وظل حاد",
    tone: "indigo",
    seed: "p-trouser",
    ratio: 4 / 5,
  },
  "product-jacket": {
    brief: "Outerwear three-quarter view, collar raised, cold neutral light",
    briefAr: "جاكيت بزاوية ثلاثة أرباع والياقة مرفوعة بإضاءة محايدة باردة",
    tone: "indigo",
    seed: "p-jacket",
    ratio: 4 / 5,
  },
  "product-dress": {
    brief: "Dress in motion, fabric caught mid-turn, warm backdrop",
    briefAr: "فستان أثناء الحركة والخامة ملتقطة في منتصف الدوران على خلفية دافئة",
    tone: "clay",
    seed: "p-dress",
    ratio: 4 / 5,
  },
  "product-kids": {
    brief: "Kidswear flat lay — two pieces styled together on textured paper",
    briefAr: "ملابس أطفال بتصوير مسطّح — قطعتان منسّقتان على ورق ذي ملمس",
    tone: "sand",
    seed: "p-kids",
    ratio: 4 / 5,
  },
  "product-sport": {
    brief: "Technical sportswear detail — mesh panel and flatlock seam",
    briefAr: "تفصيلة ملابس رياضية — بانل شبكي وحياكة فلات لوك",
    tone: "ink",
    seed: "p-sport",
    ratio: 4 / 5,
  },
  "product-home": {
    brief: "Home wear on an unmade bed, morning light, soft focus",
    briefAr: "ملابس منزلية على سرير غير مرتب بضوء الصباح وتركيز ناعم",
    tone: "paper",
    seed: "p-home",
    ratio: 4 / 5,
  },
} satisfies Record<string, ArtEntry>;

export type ArtKey = keyof typeof artRegistry;

export function getArt(key: ArtKey): ArtEntry {
  return artRegistry[key];
}
