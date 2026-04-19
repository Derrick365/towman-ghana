/**
 * Simple A/B testing utility for the idle tow prompt.
 *
 * - Variant assignment is sticky per browser (localStorage).
 * - Impressions and conversions are tracked per variant per page.
 * - Frontend prototype only — no backend reporting.
 */

export type IdleVariant = "short" | "long";

export const IDLE_VARIANT_DELAYS: Record<IdleVariant, number> = {
  short: 10_000, // 10s
  long: 20_000, // 20s
};

const VARIANT_STORAGE_KEY = "towman_idle_ab_variant";
const STATS_STORAGE_KEY = "towman_idle_ab_stats";

export type IdleEvent = "impression" | "conversion" | "dismissal";

export interface IdleStats {
  // Keyed by `${variant}:${page}`
  [key: string]: {
    impressions: number;
    conversions: number;
    dismissals: number;
  };
}

/** Get (or assign) the sticky A/B variant for this browser. */
export function getIdleVariant(): IdleVariant {
  if (typeof window === "undefined") return "short";
  try {
    const stored = localStorage.getItem(VARIANT_STORAGE_KEY) as IdleVariant | null;
    if (stored === "short" || stored === "long") return stored;
    const assigned: IdleVariant = Math.random() < 0.5 ? "short" : "long";
    localStorage.setItem(VARIANT_STORAGE_KEY, assigned);
    return assigned;
  } catch {
    return "short";
  }
}

/** Record an A/B event for a given page. */
export function trackIdleEvent(event: IdleEvent, page: string, variant: IdleVariant) {
  if (typeof window === "undefined") return;
  try {
    const raw = localStorage.getItem(STATS_STORAGE_KEY);
    const stats: IdleStats = raw ? JSON.parse(raw) : {};
    const key = `${variant}:${page}`;
    if (!stats[key]) stats[key] = { impressions: 0, conversions: 0, dismissals: 0 };
    if (event === "impression") stats[key].impressions += 1;
    if (event === "conversion") stats[key].conversions += 1;
    if (event === "dismissal") stats[key].dismissals += 1;
    localStorage.setItem(STATS_STORAGE_KEY, JSON.stringify(stats));
  } catch {
    // ignore
  }
}

/** Read the full stats object. */
export function getIdleStats(): IdleStats {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(STATS_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as IdleStats) : {};
  } catch {
    return {};
  }
}

/** Reset all A/B stats (for testing / admin). */
export function resetIdleStats() {
  try {
    localStorage.removeItem(STATS_STORAGE_KEY);
  } catch {
    // ignore
  }
}

/** Force a specific variant (useful for QA). */
export function setIdleVariant(variant: IdleVariant) {
  try {
    localStorage.setItem(VARIANT_STORAGE_KEY, variant);
  } catch {
    // ignore
  }
}
