import { cn } from "@/lib/utils";

/**
 * The index marker that runs through every spread — a number, a rule and a
 * label. It is the connective tissue that makes the sections read as one
 * publication rather than a stack of blocks.
 */
export function SectionMeta({
  index,
  label,
  className,
  tone = "ink",
}: {
  index: string;
  label: string;
  className?: string;
  tone?: "ink" | "paper";
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-4",
        tone === "paper" ? "text-paper/70" : "text-ink/60",
        className,
      )}
    >
      <span className="t-num t-label">{index}</span>
      <span
        aria-hidden
        className={cn("h-px w-10 sm:w-16", tone === "paper" ? "bg-paper/30" : "bg-ink/25")}
      />
      <span className="t-label">{label}</span>
    </div>
  );
}
