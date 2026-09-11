import type {
  CategorySlug,
  CatalogueSource,
  InventoryStatus,
  Localized,
  Product,
  ProductColour,
  ProductVariant,
  SizeCode,
} from "@/lib/commerce/types";

/* ==========================================================================
   DEMONSTRATION CATALOGUE
   --------------------------------------------------------------------------
   Shape-accurate sample data so the storefront, cart and product pages are
   fully exercised. Swap this module for a CMS/PIM adapter that satisfies
   `CatalogueSource` and the rest of the application is unaffected.
   ========================================================================== */

const ADULT_SIZES: SizeCode[] = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"];
const KIDS_SIZES: SizeCode[] = ["XS", "S", "M", "L", "XL"];

const palette = {
  ink: { id: "ink", name: { en: "Ink", ar: "حبري" }, hex: "#14141a" },
  bone: { id: "bone", name: { en: "Bone", ar: "عظمي" }, hex: "#e6e1d8" },
  clay: { id: "clay", name: { en: "Clay", ar: "طيني" }, hex: "#c4502b" },
  sand: { id: "sand", name: { en: "Sand", ar: "رملي" }, hex: "#cbbba0" },
  indigo: { id: "indigo", name: { en: "Indigo", ar: "نيلي" }, hex: "#1e2a38" },
  olive: { id: "olive", name: { en: "Olive", ar: "زيتوني" }, hex: "#4c5238" },
  slate: { id: "slate", name: { en: "Slate", ar: "رصاصي" }, hex: "#5a6067" },
  ecru: { id: "ecru", name: { en: "Ecru", ar: "بيج فاتح" }, hex: "#ded5c4" },
} satisfies Record<string, ProductColour>;

interface Seed {
  slug: string;
  name: Localized;
  strapline: Localized;
  description: Localized;
  category: CategorySlug;
  line: Localized;
  fabric: Localized;
  care: Localized;
  fit: Localized;
  colours: ProductColour[];
  /** Base price in EGP major units; variants derive from it. */
  price: number;
  art: string;
  sizes?: SizeCode[];
  featured?: boolean;
}

const CARE_STANDARD: Localized = {
  en: "Machine wash cold, inside out. Do not bleach. Reshape and dry flat. Warm iron on the reverse.",
  ar: "غسيل آلي بارد والقطعة مقلوبة. يُمنع استخدام المبيض. أعِد تشكيلها وجفّفها مفرودة. كي دافئ من الداخل.",
};

const CARE_DELICATE: Localized = {
  en: "Wash cold on a gentle cycle. Do not tumble dry. Cool iron. Wash with similar colours.",
  ar: "غسيل بارد على دورة خفيفة. يُمنع التجفيف بالنشّافة. كي على درجة منخفضة. يُغسل مع الألوان المشابهة.",
};

const seeds: Seed[] = [
  /* ------------------------------- MEN ---------------------------------- */
  {
    slug: "structure-heavyweight-tee",
    name: { en: "Structure Heavyweight Tee", ar: "تيشيرت ستركتشر الثقيل" },
    strapline: { en: "240 gsm, built to hold its shape", ar: "٢٤٠ جم/م²، مصمم ليحافظ على شكله" },
    description: {
      en: "A dense cotton jersey with a set-in collar rib and double-needle hems. Cut with a straight body and a marginally dropped shoulder so it reads clean over the chest without collapsing after washing.",
      ar: "جيرسيه قطني كثيف بياقة ريب مركّبة وحواشٍ بإبرتين. قَصّة مستقيمة مع كتف منخفض قليلًا، فتبدو نظيفة على الصدر دون أن تفقد شكلها بعد الغسيل.",
    },
    category: "men",
    line: { en: "Essentials", ar: "أساسيات" },
    fabric: { en: "100% combed cotton, 240 gsm", ar: "قطن ممشّط ١٠٠٪، ٢٤٠ جم/م²" },
    care: CARE_STANDARD,
    fit: { en: "Regular", ar: "عادية" },
    colours: [palette.ink, palette.bone, palette.clay, palette.olive],
    price: 690,
    art: "product-tee",
    featured: true,
  },
  {
    slug: "meridian-oxford-shirt",
    name: { en: "Meridian Oxford Shirt", ar: "قميص ميريديان أكسفورد" },
    strapline: { en: "Oxford weave, softened finish", ar: "نسيج أكسفورد بتشطيب ناعم" },
    description: {
      en: "A button-down oxford finished to sit between formal and everyday. Reinforced placket, split yoke and a collar cut with enough roll to work open or closed.",
      ar: "قميص أكسفورد بأزرار ياقة يقع بين الرسمي واليومي. قبة مقوّاة وكتف مقسّم وياقة بانحناءة تسمح بارتدائه مفتوحًا أو مغلقًا.",
    },
    category: "men",
    line: { en: "Formal", ar: "رسمي" },
    fabric: { en: "100% cotton oxford, 140 gsm", ar: "قطن أكسفورد ١٠٠٪، ١٤٠ جم/م²" },
    care: CARE_DELICATE,
    fit: { en: "Tailored", ar: "مفصّلة" },
    colours: [palette.bone, palette.indigo, palette.ecru],
    price: 1180,
    art: "product-shirt",
    featured: true,
  },
  {
    slug: "workline-cotton-trouser",
    name: { en: "Workline Cotton Trouser", ar: "بنطلون ووركلاين القطني" },
    strapline: { en: "Utility cut, clean finish", ar: "قَصّة عملية بتشطيب نظيف" },
    description: {
      en: "A straight-leg trouser in a mid-weight cotton twill with a clean waistband and bar-tacked stress points. Designed to take daily wear without reading as workwear.",
      ar: "بنطلون مستقيم الساق من تويل قطني متوسط الوزن بحزام وسط نظيف وتقوية عند نقاط الإجهاد. مصمم للاستخدام اليومي دون أن يبدو كملابس عمل.",
    },
    category: "men",
    line: { en: "Casual", ar: "كاجوال" },
    fabric: { en: "98% cotton / 2% elastane twill", ar: "تويل ٩٨٪ قطن / ٢٪ إيلاستين" },
    care: CARE_STANDARD,
    fit: { en: "Straight", ar: "مستقيمة" },
    colours: [palette.ink, palette.sand, palette.olive],
    price: 1350,
    art: "product-trouser",
  },
  {
    slug: "atlas-heavy-hoodie",
    name: { en: "Atlas Heavy Hoodie", ar: "هودي أطلس الثقيل" },
    strapline: { en: "Brushed fleece, structured hood", ar: "فليس مبطّن بكابوشة مهيكلة" },
    description: {
      en: "Brushed-back fleece with a two-panel hood that stands rather than slumps, ribbed cuffs with recovery, and a kangaroo pocket bar-tacked at both openings.",
      ar: "فليس مبطّن من الداخل بكابوشة من بانلين تقف ولا تنهار، وأساور ريب تستعيد شكلها، وجيب كنغر مقوّى عند الفتحتين.",
    },
    category: "men",
    line: { en: "Streetwear", ar: "ستريت وير" },
    fabric: { en: "80% cotton / 20% polyester fleece, 340 gsm", ar: "فليس ٨٠٪ قطن / ٢٠٪ بوليستر، ٣٤٠ جم/م²" },
    care: CARE_STANDARD,
    fit: { en: "Relaxed", ar: "واسعة" },
    colours: [palette.ink, palette.slate, palette.clay],
    price: 1590,
    art: "product-hoodie",
    featured: true,
  },
  {
    slug: "circuit-training-tee",
    name: { en: "Circuit Training Tee", ar: "تيشيرت سيركت الرياضي" },
    strapline: { en: "Flatlock seams, mesh back panel", ar: "حياكة فلات لوك وبانل شبكي خلفي" },
    description: {
      en: "A training top with flatlock seams to reduce abrasion and a mesh panel across the upper back. Cut close without restricting the shoulder.",
      ar: "قطعة تدريب بحياكة فلات لوك تقلل الاحتكاك وبانل شبكي أعلى الظهر. قَصّة قريبة من الجسم دون تقييد حركة الكتف.",
    },
    category: "men",
    line: { en: "Sportswear", ar: "رياضي" },
    fabric: { en: "88% polyester / 12% elastane", ar: "٨٨٪ بوليستر / ١٢٪ إيلاستين" },
    care: CARE_DELICATE,
    fit: { en: "Athletic", ar: "رياضية" },
    colours: [palette.ink, palette.slate],
    price: 780,
    art: "product-sport",
  },
  {
    slug: "quarter-zip-overshirt",
    name: { en: "Quarter-Zip Overshirt", ar: "أوفر شيرت بسوستة ربع" },
    strapline: { en: "A layer between shirt and jacket", ar: "طبقة بين القميص والجاكيت" },
    description: {
      en: "A mid-layer in brushed cotton twill with a quarter zip, chest pocket and a hem cut to sit just below the belt line.",
      ar: "طبقة وسطى من تويل قطني مبطّن بسوستة ربع وجيب صدر وحاشية تنتهي أسفل خط الحزام مباشرة.",
    },
    category: "men",
    line: { en: "Casual", ar: "كاجوال" },
    fabric: { en: "100% brushed cotton twill", ar: "تويل قطني مبطّن ١٠٠٪" },
    care: CARE_STANDARD,
    fit: { en: "Regular", ar: "عادية" },
    colours: [palette.olive, palette.ink, palette.ecru],
    price: 1690,
    art: "product-jacket",
  },

  /* ------------------------------ WOMEN --------------------------------- */
  {
    slug: "drape-column-dress",
    name: { en: "Drape Column Dress", ar: "فستان دريب كولَم" },
    strapline: { en: "Weight that falls, not clings", ar: "خامة تنسدل ولا تلتصق" },
    description: {
      en: "A column silhouette in a fluid viscose blend, bias-finished at the neckline so the fabric follows the body without gripping it.",
      ar: "سيلويت عمودي من مزيج فيسكوز انسيابي بتشطيب بايس عند فتحة الرقبة، فتتبع الخامة الجسم دون أن تشدّه.",
    },
    category: "women",
    line: { en: "Elegant", ar: "أنيق" },
    fabric: { en: "Viscose blend, 160 gsm", ar: "مزيج فيسكوز، ١٦٠ جم/م²" },
    care: CARE_DELICATE,
    fit: { en: "Fluid", ar: "انسيابية" },
    colours: [palette.ink, palette.clay, palette.sand],
    price: 1890,
    art: "product-dress",
    featured: true,
  },
  {
    slug: "line-cotton-tee",
    name: { en: "Line Cotton Tee", ar: "تيشيرت لاين القطني" },
    strapline: { en: "The everyday, corrected", ar: "القطعة اليومية بعد ضبطها" },
    description: {
      en: "A fine-gauge cotton tee with a narrow rib collar and a shoulder seam set to sit exactly on the joint. Length graded independently across the range.",
      ar: "تيشيرت قطني ناعم بياقة ريب ضيقة وحياكة كتف تقع تمامًا على المفصل. الطول مُدرَّج بشكل مستقل عبر نطاق المقاسات.",
    },
    category: "women",
    line: { en: "Essentials", ar: "أساسيات" },
    fabric: { en: "100% cotton jersey, 160 gsm", ar: "جيرسيه قطن ١٠٠٪، ١٦٠ جم/م²" },
    care: CARE_STANDARD,
    fit: { en: "Slim", ar: "ضيقة" },
    colours: [palette.bone, palette.ink, palette.clay, palette.ecru],
    price: 620,
    art: "product-tee",
  },
  {
    slug: "atelier-linen-shirt",
    name: { en: "Atelier Linen Shirt", ar: "قميص أتيليه الكتان" },
    strapline: { en: "Open weave, honest crease", ar: "نسيج مفتوح وتجعّد صادق" },
    description: {
      en: "An oversized linen shirt with a soft-roll collar and a dropped shoulder. Cut long enough to wear closed, open, or as a layer.",
      ar: "قميص كتان واسع بياقة مرنة وكتف منخفض. طوله يسمح بارتدائه مغلقًا أو مفتوحًا أو كطبقة فوق غيره.",
    },
    category: "women",
    line: { en: "Modern", ar: "مودرن" },
    fabric: { en: "100% linen, 180 gsm", ar: "كتان ١٠٠٪، ١٨٠ جم/م²" },
    care: CARE_DELICATE,
    fit: { en: "Oversized", ar: "أوفرسايز" },
    colours: [palette.ecru, palette.sand, palette.indigo],
    price: 1450,
    art: "product-shirt",
  },
  {
    slug: "studio-wide-trouser",
    name: { en: "Studio Wide Trouser", ar: "بنطلون ستوديو الواسع" },
    strapline: { en: "High rise, clean break", ar: "خصر عالٍ وانكسار نظيف" },
    description: {
      en: "A high-rise wide-leg trouser with a flat front and a hem engineered to break once. Pressed crease set during finishing, not at the machine.",
      ar: "بنطلون واسع الساق بخصر عالٍ وواجهة مسطّحة وحاشية مصممة لتنكسر مرة واحدة. الكسرة تُضبط في مرحلة التشطيب لا على الماكينة.",
    },
    category: "women",
    line: { en: "Elegant", ar: "أنيق" },
    fabric: { en: "Cotton blend suiting, 230 gsm", ar: "خامة بدل قطنية مخلوطة، ٢٣٠ جم/م²" },
    care: CARE_DELICATE,
    fit: { en: "Wide", ar: "واسعة" },
    colours: [palette.ink, palette.slate, palette.ecru],
    price: 1620,
    art: "product-trouser",
    featured: true,
  },
  {
    slug: "kerb-oversized-hoodie",
    name: { en: "Kerb Oversized Hoodie", ar: "هودي كيرب الأوفرسايز" },
    strapline: { en: "Volume with a defined shoulder", ar: "اتساع مع كتف محدد" },
    description: {
      en: "An oversized hoodie that keeps a defined shoulder line, with a wide rib hem that holds the volume rather than letting it drop.",
      ar: "هودي أوفرسايز يحافظ على خط كتف محدد، بحاشية ريب عريضة تمسك الاتساع بدلًا من أن تتركه ينسدل.",
    },
    category: "women",
    line: { en: "Streetwear", ar: "ستريت وير" },
    fabric: { en: "Cotton-rich fleece, 320 gsm", ar: "فليس غني بالقطن، ٣٢٠ جم/م²" },
    care: CARE_STANDARD,
    fit: { en: "Oversized", ar: "أوفرسايز" },
    colours: [palette.sand, palette.ink, palette.clay],
    price: 1540,
    art: "product-hoodie",
  },
  {
    slug: "quiet-home-set",
    name: { en: "Quiet Home Set", ar: "طقم كوايت المنزلي" },
    strapline: { en: "Home wear held to shirting standards", ar: "ملابس منزلية بمعايير القمصان" },
    description: {
      en: "A two-piece home set in washed cotton, finished with the same seam specification as our shirting. Elastic waist with an internal drawcord.",
      ar: "طقم منزلي من قطعتين بقطن مغسول، منفّذ بمواصفة الحياكة نفسها المستخدمة في قمصاننا. وسط بأستك مع رباط داخلي.",
    },
    category: "women",
    line: { en: "Casual", ar: "كاجوال" },
    fabric: { en: "100% washed cotton, 150 gsm", ar: "قطن مغسول ١٠٠٪، ١٥٠ جم/م²" },
    care: CARE_STANDARD,
    fit: { en: "Relaxed", ar: "واسعة" },
    colours: [palette.ecru, palette.slate],
    price: 1290,
    art: "product-home",
  },

  /* ------------------------------- KIDS --------------------------------- */
  {
    slug: "play-everyday-tee",
    name: { en: "Play Everyday Tee", ar: "تيشيرت بلاي اليومي" },
    strapline: { en: "Soft hand, reinforced shoulders", ar: "ملمس ناعم وأكتاف مقوّاة" },
    description: {
      en: "A soft cotton tee with taped shoulder seams and a collar tested for repeated stretching. Colour selected for wash fastness first.",
      ar: "تيشيرت قطني ناعم بحياكة كتف مشرّطة وياقة مُختبرة على الشد المتكرر. اللون مُختار بناءً على ثباته في الغسيل أولًا.",
    },
    category: "kids",
    line: { en: "Everyday", ar: "يومي" },
    fabric: { en: "100% cotton jersey, 180 gsm", ar: "جيرسيه قطن ١٠٠٪، ١٨٠ جم/م²" },
    care: CARE_STANDARD,
    fit: { en: "Regular", ar: "عادية" },
    colours: [palette.clay, palette.bone, palette.indigo],
    price: 390,
    art: "product-kids",
    sizes: KIDS_SIZES,
    featured: true,
  },
  {
    slug: "recess-fleece-hoodie",
    name: { en: "Recess Fleece Hoodie", ar: "هودي ريسيس الفليس" },
    strapline: { en: "Warm without the weight", ar: "دفء دون ثقل" },
    description: {
      en: "A lighter fleece hoodie for movement, with a hood cut to stay on and cuffs sized to cover the wrist without slipping over the hand.",
      ar: "هودي فليس أخف يناسب الحركة، بكابوشة مصممة لتثبت وأساور بمقاس يغطي الرسغ دون أن ينزلق فوق اليد.",
    },
    category: "kids",
    line: { en: "Play", ar: "لعب" },
    fabric: { en: "Cotton-rich fleece, 280 gsm", ar: "فليس غني بالقطن، ٢٨٠ جم/م²" },
    care: CARE_STANDARD,
    fit: { en: "Relaxed", ar: "واسعة" },
    colours: [palette.indigo, palette.sand],
    price: 790,
    art: "product-hoodie",
    sizes: KIDS_SIZES,
  },
  {
    slug: "term-school-trouser",
    name: { en: "Term School Trouser", ar: "بنطلون تيرم المدرسي" },
    strapline: { en: "Adjustable waist, reinforced knee", ar: "وسط قابل للضبط وركبة مقوّاة" },
    description: {
      en: "A school trouser with an internal adjustable waistband and a reinforced knee panel, in a twill chosen to release creases after washing.",
      ar: "بنطلون مدرسي بحزام وسط داخلي قابل للضبط وبانل ركبة مقوّى، من تويل مُختار ليتخلص من التجاعيد بعد الغسيل.",
    },
    category: "kids",
    line: { en: "School", ar: "مدرسي" },
    fabric: { en: "Polyester-cotton twill", ar: "تويل بوليستر وقطن" },
    care: CARE_STANDARD,
    fit: { en: "Straight", ar: "مستقيمة" },
    colours: [palette.ink, palette.indigo],
    price: 620,
    art: "product-trouser",
    sizes: KIDS_SIZES,
  },
  {
    slug: "season-padded-jacket",
    name: { en: "Season Padded Jacket", ar: "جاكيت سيزون المبطّن" },
    strapline: { en: "Winter layer, washable", ar: "طبقة شتوية قابلة للغسيل" },
    description: {
      en: "A padded jacket with a wind-resistant shell, a chin guard over the zip and an inner lining that survives a machine wash.",
      ar: "جاكيت مبطّن بقشرة خارجية مقاومة للهواء وحماية للذقن أعلى السوستة وبطانة داخلية تتحمّل الغسيل الآلي.",
    },
    category: "kids",
    line: { en: "Seasonal", ar: "موسمي" },
    fabric: { en: "Polyester shell with recycled fill", ar: "قشرة بوليستر بحشو معاد تدويره" },
    care: CARE_DELICATE,
    fit: { en: "Regular", ar: "عادية" },
    colours: [palette.clay, palette.indigo],
    price: 1490,
    art: "product-jacket",
    sizes: KIDS_SIZES,
  },
  {
    slug: "first-layer-set",
    name: { en: "First Layer Set", ar: "طقم الطبقة الأولى" },
    strapline: { en: "Two pieces, one wash cycle", ar: "قطعتان بدورة غسيل واحدة" },
    description: {
      en: "A matched top and bottom in the same jersey, so both pieces age and shrink at the same rate after repeated washing.",
      ar: "قطعة علوية وأخرى سفلية من الجيرسيه نفسه، فتتقادم القطعتان وتنكمشان بالمعدل نفسه بعد الغسيل المتكرر.",
    },
    category: "kids",
    line: { en: "Essentials", ar: "أساسيات" },
    fabric: { en: "100% cotton jersey, 170 gsm", ar: "جيرسيه قطن ١٠٠٪، ١٧٠ جم/م²" },
    care: CARE_STANDARD,
    fit: { en: "Regular", ar: "عادية" },
    colours: [palette.bone, palette.sand, palette.clay],
    price: 690,
    art: "product-kids",
    sizes: KIDS_SIZES,
  },
];

/* --------------------------------------------------------------------------
   Variant expansion — size × colour, with a deterministic stock signal so the
   UI exercises every inventory state without random output between renders.
   -------------------------------------------------------------------------- */

function inventoryFor(index: number): InventoryStatus {
  const cycle = index % 9;
  if (cycle === 4) return "low-stock";
  if (cycle === 7) return "made-to-order";
  return "in-stock";
}

/** Larger sizes carry a modest grading uplift, as they do in real production. */
function sizeUplift(size: SizeCode): number {
  switch (size) {
    case "XXL":
      return 5000;
    case "XXXL":
      return 9000;
    default:
      return 0;
  }
}

function buildVariants(seed: Seed, sizes: SizeCode[]): ProductVariant[] {
  const variants: ProductVariant[] = [];
  let index = 0;
  for (const colour of seed.colours) {
    for (const size of sizes) {
      variants.push({
        id: `${seed.slug}--${colour.id}--${size.toLowerCase()}`,
        sku: `AK-${seed.slug.slice(0, 3).toUpperCase()}-${colour.id.slice(0, 3).toUpperCase()}-${size}`,
        size,
        colourId: colour.id,
        price: { amount: seed.price * 100 + sizeUplift(size), currency: "EGP" },
        inventory: inventoryFor(index),
      });
      index += 1;
    }
  }
  return variants;
}

export const products: Product[] = seeds.map((seed, i) => {
  const sizes = seed.sizes ?? ADULT_SIZES;
  return {
    id: `ak-${String(i + 1).padStart(3, "0")}`,
    slug: seed.slug,
    name: seed.name,
    strapline: seed.strapline,
    description: seed.description,
    category: seed.category,
    line: seed.line,
    fabric: seed.fabric,
    care: seed.care,
    fit: seed.fit,
    colours: seed.colours,
    sizes,
    variants: buildVariants(seed, sizes),
    art: seed.art,
    featured: seed.featured,
  };
});

/* --------------------------------------------------------------------------
   Catalogue adapter
   -------------------------------------------------------------------------- */

export const catalogue: CatalogueSource = {
  all: () => products,
  byCategory: (category) => products.filter((p) => p.category === category),
  bySlug: (slug) => products.find((p) => p.slug === slug),
  byId: (id) => products.find((p) => p.id === id),
  featured: () => products.filter((p) => p.featured),
  related: (product, limit = 3) =>
    products
      .filter((p) => p.id !== product.id && p.category === product.category)
      .slice(0, limit),
};

export const categoryOrder: CategorySlug[] = ["men", "women", "kids"];
