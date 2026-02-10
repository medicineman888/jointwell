import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import type { WeightEntry } from "@/hooks/useDailyMetrics";
import { Scale, TrendingDown, TrendingUp } from "lucide-react";

interface WeightSummary {
  latest: WeightEntry | null;
  baseline: WeightEntry | null;
  deltaKg: number | null;
}

interface WeightTrackerCardProps {
  summary: WeightSummary;
  onLogWeight: (weightKg: number) => void;
}

export default function WeightTrackerCard({ summary, onLogWeight }: WeightTrackerCardProps) {
  const [weightInput, setWeightInput] = useState("");

  const handleLogWeight = () => {
    const parsed = Number(weightInput);
    if (!Number.isFinite(parsed) || parsed <= 0) {
      return;
    }
    onLogWeight(parsed);
    setWeightInput("");
  };

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Scale className="w-4 h-4 text-primary" />
              <h3 className="text-lg font-medium text-foreground">Weekly Weight Tracker</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Optional but useful for safe pre-op optimization when weight goals are part of your care plan.
            </p>
          </div>
          {summary.latest && <Badge variant="secondary">{summary.latest.weightKg.toFixed(1)} kg</Badge>}
        </div>

        {summary.deltaKg !== null && (
          <div className={`rounded-md border p-3 ${summary.deltaKg <= 0 ? "border-accent/30 bg-accent/5" : "border-border bg-muted/40"}`}>
            <div className="flex items-center gap-2 text-sm">
              {summary.deltaKg <= 0 ? (
                <TrendingDown className="w-4 h-4 text-accent" />
              ) : (
                <TrendingUp className="w-4 h-4 text-primary" />
              )}
              <span className="font-medium text-foreground">
                {summary.deltaKg <= 0 ? `${Math.abs(summary.deltaKg).toFixed(1)} kg down` : `${summary.deltaKg.toFixed(1)} kg up`}
              </span>
              <span className="text-muted-foreground">since first log</span>
            </div>
          </div>
        )}

        <div className="flex gap-3">
          <Input
            type="number"
            inputMode="decimal"
            step="0.1"
            min="1"
            placeholder="Enter weight in kg"
            value={weightInput}
            onChange={(event) => setWeightInput(event.target.value)}
            data-testid="input-weight-kg"
          />
          <Button onClick={handleLogWeight} data-testid="button-log-weight">
            Save
          </Button>
        </div>
      </div>
    </Card>
  );
}
