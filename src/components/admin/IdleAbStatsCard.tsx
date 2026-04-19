import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RotateCcw, FlaskConical } from "lucide-react";
import { getIdleStats, resetIdleStats, type IdleStats, type IdleVariant, IDLE_VARIANT_DELAYS } from "@/lib/ab-testing";

interface Row {
  variant: IdleVariant;
  page: string;
  impressions: number;
  conversions: number;
  dismissals: number;
  rate: number;
}

const buildRows = (stats: IdleStats): Row[] => {
  return Object.entries(stats).map(([key, v]) => {
    const [variant, page] = key.split(":") as [IdleVariant, string];
    const rate = v.impressions > 0 ? (v.conversions / v.impressions) * 100 : 0;
    return { variant, page, ...v, rate };
  }).sort((a, b) => a.page.localeCompare(b.page) || a.variant.localeCompare(b.variant));
};

const IdleAbStatsCard = () => {
  const [tick, setTick] = useState(0);
  const rows = useMemo(() => buildRows(getIdleStats()), [tick]);

  const totals = useMemo(() => {
    const acc: Record<IdleVariant, { impressions: number; conversions: number }> = {
      short: { impressions: 0, conversions: 0 },
      long: { impressions: 0, conversions: 0 },
    };
    rows.forEach((r) => {
      acc[r.variant].impressions += r.impressions;
      acc[r.variant].conversions += r.conversions;
    });
    return acc;
  }, [rows]);

  const handleReset = () => {
    resetIdleStats();
    setTick((t) => t + 1);
  };

  const winner: IdleVariant | null = (() => {
    const sRate = totals.short.impressions > 0 ? totals.short.conversions / totals.short.impressions : 0;
    const lRate = totals.long.impressions > 0 ? totals.long.conversions / totals.long.impressions : 0;
    if (totals.short.impressions === 0 && totals.long.impressions === 0) return null;
    return sRate >= lRate ? "short" : "long";
  })();

  return (
    <Card>
      <CardHeader className="pb-3 flex flex-row items-center justify-between space-y-0">
        <div className="flex items-center gap-2">
          <FlaskConical className="w-4 h-4 text-secondary" />
          <CardTitle className="text-sm font-medium">Idle Prompt A/B Test</CardTitle>
        </div>
        <Button size="sm" variant="ghost" onClick={() => setTick((t) => t + 1)} className="h-7 text-xs">
          Refresh
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-xs text-muted-foreground">
          Comparing <strong>short ({IDLE_VARIANT_DELAYS.short / 1000}s)</strong> vs{" "}
          <strong>long ({IDLE_VARIANT_DELAYS.long / 1000}s)</strong> idle delays. Stats are stored locally per browser.
        </p>

        {/* Totals */}
        <div className="grid grid-cols-2 gap-3">
          {(["short", "long"] as IdleVariant[]).map((v) => {
            const t = totals[v];
            const rate = t.impressions > 0 ? (t.conversions / t.impressions) * 100 : 0;
            const isWinner = winner === v && (totals.short.impressions + totals.long.impressions) > 0;
            return (
              <div
                key={v}
                className={`rounded-lg border p-3 ${isWinner ? "border-secondary bg-secondary/5" : "border-border"}`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    {v} ({IDLE_VARIANT_DELAYS[v] / 1000}s)
                  </span>
                  {isWinner && (
                    <span className="text-[10px] font-bold text-secondary uppercase">Leading</span>
                  )}
                </div>
                <div className="text-2xl font-bold font-display tabular-nums">{rate.toFixed(1)}%</div>
                <div className="text-xs text-muted-foreground mt-1">
                  {t.conversions} / {t.impressions} conversions
                </div>
              </div>
            );
          })}
        </div>

        {/* Per-page breakdown */}
        {rows.length === 0 ? (
          <p className="text-xs text-muted-foreground italic text-center py-4">
            No data yet. Trigger the popup on Home, Listings, or Operator pages to start collecting.
          </p>
        ) : (
          <div className="border border-border rounded-lg overflow-hidden">
            <table className="w-full text-xs">
              <thead className="bg-muted/50">
                <tr className="text-left">
                  <th className="px-3 py-2 font-medium text-muted-foreground">Page</th>
                  <th className="px-3 py-2 font-medium text-muted-foreground">Variant</th>
                  <th className="px-3 py-2 font-medium text-muted-foreground text-right">Shown</th>
                  <th className="px-3 py-2 font-medium text-muted-foreground text-right">Tow</th>
                  <th className="px-3 py-2 font-medium text-muted-foreground text-right">Dismiss</th>
                  <th className="px-3 py-2 font-medium text-muted-foreground text-right">Rate</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={`${r.variant}:${r.page}`} className="border-t border-border">
                    <td className="px-3 py-2 capitalize">{r.page}</td>
                    <td className="px-3 py-2 capitalize">{r.variant}</td>
                    <td className="px-3 py-2 text-right tabular-nums">{r.impressions}</td>
                    <td className="px-3 py-2 text-right tabular-nums">{r.conversions}</td>
                    <td className="px-3 py-2 text-right tabular-nums">{r.dismissals}</td>
                    <td className="px-3 py-2 text-right tabular-nums font-semibold">{r.rate.toFixed(1)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <Button size="sm" variant="outline" onClick={handleReset} className="gap-2">
          <RotateCcw className="w-3.5 h-3.5" /> Reset Stats
        </Button>
      </CardContent>
    </Card>
  );
};

export default IdleAbStatsCard;
