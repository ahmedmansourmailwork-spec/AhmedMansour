import Image from "next/image";
import { getArt, type ArtKey } from "@/lib/art-direction";
import { seededRandom } from "@/lib/utils";
import type { Locale } from "@/i18n/config";

/* ==========================================================================
   BRAND IMAGE
   --------------------------------------------------------------------------
   Renders licensed photography when it exists, and a generated woven-fabric
   plate when it does not — drape folds, warp/weft rules, film grain, in the
   brand's duotone system. No stock photography, no grey boxes.
   ========================================================================== */

type TonePalette = {
  from: string;
  to: string;
  light: string;
  lightOpacity: number;
  line: string;
  lineOpacity: number;
  foldLight: string;
  foldShadow: string;
  plate: string;
};

const tones: Record<string, TonePalette> = {
  ink: {
    from: "#111115",
    to: "#32323c",
    light: "#c4502b",
    lightOpacity: 0.26,
    line: "#f4f1ec",
    lineOpacity: 0.09,
    foldLight: "#a9a9b6",
    foldShadow: "#000000",
    plate: "#f4f1ec",
  },
  clay: {
    from: "#8a3419",
    to: "#cf5c33",
    light: "#f5c4a8",
    lightOpacity: 0.34,
    line: "#f4f1ec",
    lineOpacity: 0.12,
    foldLight: "#f7bc98",
    foldShadow: "#4a1a09",
    plate: "#fbeee7",
  },
  indigo: {
    from: "#162130",
    to: "#3d5370",
    light: "#a6c6e0",
    lightOpacity: 0.28,
    line: "#e6e1d8",
    lineOpacity: 0.1,
    foldLight: "#b2cade",
    foldShadow: "#070c12",
    plate: "#e6e1d8",
  },
  sand: {
    from: "#9d8a6d",
    to: "#d8cab3",
    light: "#fff6e6",
    lightOpacity: 0.26,
    line: "#3a3024",
    lineOpacity: 0.11,
    foldLight: "#fffaf0",
    foldShadow: "#5d4d35",
    plate: "#2a2318",
  },
  bone: {
    from: "#c3bbaa",
    to: "#eae6de",
    light: "#ffffff",
    lightOpacity: 0.26,
    line: "#2a2620",
    lineOpacity: 0.1,
    foldLight: "#ffffff",
    foldShadow: "#7d7364",
    plate: "#2a2620",
  },
  paper: {
    from: "#ddd7c9",
    to: "#f6f3ee",
    light: "#ffffff",
    lightOpacity: 0.22,
    line: "#2a2620",
    lineOpacity: 0.085,
    foldLight: "#ffffff",
    foldShadow: "#a89d8b",
    plate: "#2a2620",
  },
};

const W = 900;
const H = 1200;

interface FoldSpec {
  d: string;
  light: boolean;
  opacity: number;
}

function buildFolds(seed: string): FoldSpec[] {
  const rnd = seededRandom(seed);
  const folds: FoldSpec[] = [];
  const count = 8 + Math.floor(rnd() * 5);

  for (let i = 0; i < count; i += 1) {
    const width = W * (0.1 + rnd() * 0.22);
    const start = -W * 0.18 + rnd() * W * 1.1;
    const sway = (rnd() - 0.5) * W * 0.55;
    const bend = (rnd() - 0.5) * W * 0.45;
    const end = start + sway;

    const d = [
      `M ${start.toFixed(1)} ${-40}`,
      `C ${(start + bend).toFixed(1)} ${H * 0.34}`,
      `${(end + bend * 0.4).toFixed(1)} ${H * 0.7}`,
      `${end.toFixed(1)} ${H + 40}`,
      `L ${(end + width).toFixed(1)} ${H + 40}`,
      `C ${(end + bend * 0.4 + width).toFixed(1)} ${H * 0.7}`,
      `${(start + bend + width).toFixed(1)} ${H * 0.34}`,
      `${(start + width).toFixed(1)} ${-40}`,
      "Z",
    ].join(" ");

    folds.push({ d, light: i % 2 === 0, opacity: 0.22 + rnd() * 0.4 });
  }
  return folds;
}

const TILE = 56;
const TILE_STEP = 7;

/**
 * The weave is emitted as a tiling <pattern> rather than a few hundred <line>
 * elements, so a plate costs roughly two dozen nodes regardless of its size.
 */
function buildWeaveTile(seed: string) {
  const rnd = seededRandom(`${seed}-rules`);
  const warp: { p: number; o: number }[] = [];
  const weft: { p: number; o: number }[] = [];
  for (let p = 0; p < TILE; p += TILE_STEP) {
    warp.push({ p, o: 0.35 + rnd() * 0.65 });
    weft.push({ p, o: 0.2 + rnd() * 0.5 });
  }
  return { warp, weft };
}

export interface BrandImageProps {
  art: ArtKey;
  locale: Locale;
  className?: string;
  /** Applied to the <img>/<svg> itself, e.g. "object-cover". */
  imageClassName?: string;
  priority?: boolean;
  sizes?: string;
  /** Shows the art-direction plate marker (contact-sheet style). */
  showPlate?: boolean;
  /** Overrides the alt text — use when the surrounding copy already names it. */
  alt?: string;
  decorative?: boolean;
}

export function BrandImage({
  art,
  locale,
  className,
  imageClassName = "h-full w-full object-cover",
  priority,
  sizes = "100vw",
  showPlate = false,
  alt,
  decorative = false,
}: BrandImageProps) {
  const entry = getArt(art);
  const altText = decorative ? "" : (alt ?? (locale === "ar" ? entry.briefAr : entry.brief));

  if (entry.src) {
    return (
      <div className={className}>
        <Image
          src={entry.src}
          alt={altText}
          fill
          priority={priority}
          sizes={sizes}
          className={imageClassName}
        />
      </div>
    );
  }

  const tone = tones[entry.tone] ?? tones.ink;
  const folds = buildFolds(entry.seed);
  const weave = buildWeaveTile(entry.seed);
  const uid = `ak-${art.replace(/[^a-z0-9]/gi, "")}`;

  return (
    <div className={className}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="xMidYMid slice"
        className={imageClassName}
        role={decorative ? "presentation" : "img"}
        aria-label={decorative ? undefined : altText}
        aria-hidden={decorative || undefined}
      >
        {!decorative && <title>{altText}</title>}
        <defs>
          <linearGradient id={`${uid}-base`} x1="0" y1="0" x2="0.6" y2="1">
            <stop offset="0%" stopColor={tone.from} />
            <stop offset="100%" stopColor={tone.to} />
          </linearGradient>

          <radialGradient id={`${uid}-key`} cx="0.28" cy="0.18" r="0.85">
            <stop offset="0%" stopColor={tone.light} stopOpacity={tone.lightOpacity} />
            <stop offset="100%" stopColor={tone.light} stopOpacity="0" />
          </radialGradient>

          <linearGradient id={`${uid}-fold-l`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={tone.foldLight} stopOpacity="0" />
            <stop offset="45%" stopColor={tone.foldLight} stopOpacity="0.9" />
            <stop offset="100%" stopColor={tone.foldLight} stopOpacity="0" />
          </linearGradient>

          <linearGradient id={`${uid}-fold-s`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={tone.foldShadow} stopOpacity="0" />
            <stop offset="55%" stopColor={tone.foldShadow} stopOpacity="0.85" />
            <stop offset="100%" stopColor={tone.foldShadow} stopOpacity="0" />
          </linearGradient>

          <radialGradient id={`${uid}-vig`} cx="0.5" cy="0.45" r="0.78">
            <stop offset="55%" stopColor="#000000" stopOpacity="0" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.34" />
          </radialGradient>

          <filter id={`${uid}-soft`} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="19" />
          </filter>

          <pattern
            id={`${uid}-weave`}
            width={TILE}
            height={TILE}
            patternUnits="userSpaceOnUse"
          >
            <g stroke={tone.line} strokeWidth="1" shapeRendering="crispEdges">
              {weave.warp.map((line) => (
                <line
                  key={`w${line.p}`}
                  x1={line.p}
                  y1="0"
                  x2={line.p}
                  y2={TILE}
                  opacity={tone.lineOpacity * line.o}
                />
              ))}
              {weave.weft.map((line) => (
                <line
                  key={`f${line.p}`}
                  x1="0"
                  y1={line.p}
                  x2={TILE}
                  y2={line.p}
                  opacity={tone.lineOpacity * line.o * 0.7}
                />
              ))}
            </g>
          </pattern>

          <filter id={`${uid}-grain`}>
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
        </defs>

        <rect width={W} height={H} fill={`url(#${uid}-base)`} />

        {/* Drape — soft folds reading as suspended cloth. */}
        <g filter={`url(#${uid}-soft)`}>
          {folds.map((fold, i) => (
            <path
              key={i}
              d={fold.d}
              fill={`url(#${uid}-fold-${fold.light ? "l" : "s"})`}
              opacity={fold.opacity}
            />
          ))}
        </g>

        {/* Warp & weft — the woven rule system, at thread scale. */}
        <rect width={W} height={H} fill={`url(#${uid}-weave)`} />

        <rect width={W} height={H} fill={`url(#${uid}-key)`} />
        <rect width={W} height={H} fill={`url(#${uid}-vig)`} />
        <rect width={W} height={H} filter={`url(#${uid}-grain)`} opacity="0.16" />

        {showPlate && (
          <g opacity="0.5">
            <rect
              x="26"
              y="26"
              width={W - 52}
              height={H - 52}
              fill="none"
              stroke={tone.plate}
              strokeWidth="1"
              opacity="0.4"
            />
            <text
              x="44"
              y={H - 44}
              fill={tone.plate}
              fontSize="20"
              letterSpacing="6"
              fontFamily="ui-monospace, monospace"
            >
              A&amp;K · {art.toUpperCase()}
            </text>
          </g>
        )}
      </svg>
    </div>
  );
}
