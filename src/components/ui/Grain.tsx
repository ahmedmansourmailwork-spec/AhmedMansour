import { cn } from "@/lib/utils";

/** Site-wide paper stock. Purely decorative, never intercepts a pointer. */
export function Grain({ invert = false }: { invert?: boolean }) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none fixed inset-0 z-[60] opacity-[0.38]",
        invert ? "mix-blend-screen" : "mix-blend-multiply",
      )}
      style={{
        backgroundImage: "var(--grain-url)",
        backgroundSize: "180px 180px",
      }}
    />
  );
}
