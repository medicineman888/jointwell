import { useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "jointwell-daily-metrics";

export interface WeightEntry {
  date: string;
  weightKg: number;
}

interface DailyMetricsState {
  stepsByDate: Record<string, number>;
  weightLog: WeightEntry[];
}

const defaultState: DailyMetricsState = {
  stepsByDate: {},
  weightLog: [],
};

function getDateKey(value = new Date()): string {
  return value.toISOString().split("T")[0];
}

function parseStoredState(raw: string | null): DailyMetricsState {
  if (!raw) {
    return defaultState;
  }

  try {
    const parsed = JSON.parse(raw) as Partial<DailyMetricsState>;

    const parsedStepsByDate =
      parsed.stepsByDate && typeof parsed.stepsByDate === "object"
        ? Object.fromEntries(
            Object.entries(parsed.stepsByDate).filter((entry): entry is [string, number] => {
              return typeof entry[0] === "string" && typeof entry[1] === "number";
            }),
          )
        : {};

    const parsedWeightLog = Array.isArray(parsed.weightLog)
      ? parsed.weightLog.filter((entry): entry is WeightEntry => {
          return Boolean(
            entry &&
              typeof entry === "object" &&
              typeof (entry as WeightEntry).date === "string" &&
              typeof (entry as WeightEntry).weightKg === "number",
          );
        })
      : [];

    return {
      stepsByDate: parsedStepsByDate,
      weightLog: parsedWeightLog,
    };
  } catch {
    return defaultState;
  }
}

export function useDailyMetrics() {
  const [metrics, setMetrics] = useState<DailyMetricsState>(() => {
    if (typeof window === "undefined") {
      return defaultState;
    }
    return parseStoredState(localStorage.getItem(STORAGE_KEY));
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(metrics));
  }, [metrics]);

  const todayKey = getDateKey();
  const todaySteps = metrics.stepsByDate[todayKey] ?? 0;

  const setTodaySteps = (steps: number) => {
    setMetrics((previous) => ({
      ...previous,
      stepsByDate: {
        ...previous.stepsByDate,
        [todayKey]: Math.max(0, Math.round(steps)),
      },
    }));
  };

  const addSteps = (delta: number) => {
    setMetrics((previous) => {
      const nextValue = (previous.stepsByDate[todayKey] ?? 0) + delta;
      return {
        ...previous,
        stepsByDate: {
          ...previous.stepsByDate,
          [todayKey]: Math.max(0, Math.round(nextValue)),
        },
      };
    });
  };

  const logWeight = (weightKg: number) => {
    const roundedWeight = Number(weightKg.toFixed(1));
    const entryDate = getDateKey();

    setMetrics((previous) => {
      const withoutSameDate = previous.weightLog.filter((entry) => entry.date !== entryDate);
      return {
        ...previous,
        weightLog: [...withoutSameDate, { date: entryDate, weightKg: roundedWeight }].sort((a, b) =>
          a.date.localeCompare(b.date),
        ),
      };
    });
  };

  const weightSummary = useMemo(() => {
    if (metrics.weightLog.length === 0) {
      return {
        latest: null as WeightEntry | null,
        baseline: null as WeightEntry | null,
        deltaKg: null as number | null,
      };
    }

    const baseline = metrics.weightLog[0];
    const latest = metrics.weightLog[metrics.weightLog.length - 1];
    const deltaKg = Number((latest.weightKg - baseline.weightKg).toFixed(1));

    return { latest, baseline, deltaKg };
  }, [metrics.weightLog]);

  return {
    todaySteps,
    setTodaySteps,
    addSteps,
    weightLog: metrics.weightLog,
    logWeight,
    weightSummary,
  };
}
