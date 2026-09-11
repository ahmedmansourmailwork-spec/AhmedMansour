import { notFound } from "next/navigation";

/**
 * Catch-all inside the locale segment. Any unmatched localised URL falls
 * through to here and renders the branded 404 *within* the site chrome —
 * navigation, footer and language switch all intact — rather than the bare
 * root fallback.
 */
export default function LocaleCatchAll(): never {
  notFound();
}
