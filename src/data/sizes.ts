import type { SizeCode } from "@/lib/commerce/types";
import type { Locale } from "@/i18n/config";

export interface SizeSpec {
  code: SizeCode;
  /** Indicative body measurements in centimetres. */
  chest: [number, number];
  waist: [number, number];
  length: number;
  profile: Record<Locale, string>;
}

/**
 * Indicative only — final charts are issued per product and per fit.
 * The range is deliberately open-ended: additional codes can be appended here
 * and every size-aware component picks them up.
 */
export const sizeChart: SizeSpec[] = [
  {
    code: "XS",
    chest: [86, 90],
    waist: [70, 74],
    length: 66,
    profile: { en: "Close through the body", ar: "قريبة من الجسم" },
  },
  {
    code: "S",
    chest: [91, 96],
    waist: [75, 80],
    length: 68,
    profile: { en: "Clean, minimal ease", ar: "نظيفة بسماح بسيط" },
  },
  {
    code: "M",
    chest: [97, 102],
    waist: [81, 86],
    length: 70,
    profile: { en: "The reference block", ar: "المقاس المرجعي" },
  },
  {
    code: "L",
    chest: [103, 108],
    waist: [87, 93],
    length: 72,
    profile: { en: "Relaxed through the chest", ar: "مريحة عند الصدر" },
  },
  {
    code: "XL",
    chest: [109, 116],
    waist: [94, 101],
    length: 74,
    profile: { en: "Extra room across the shoulder", ar: "اتساع إضافي عند الكتف" },
  },
  {
    code: "XXL",
    chest: [117, 124],
    waist: [102, 110],
    length: 76,
    profile: { en: "Regraded, not scaled", ar: "مُعاد تدريجها لا مكبَّرة" },
  },
  {
    code: "XXXL",
    chest: [125, 134],
    waist: [111, 120],
    length: 78,
    profile: { en: "Full block redraft", ar: "إعادة رسم كاملة للباترون" },
  },
];
