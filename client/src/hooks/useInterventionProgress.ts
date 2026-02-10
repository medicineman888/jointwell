import { useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "jointwell-intervention-progress";

type ProgressState = Record<string, boolean>;

function parseStoredState(raw: string | null): ProgressState {
  if (!raw) {
    return {};
  }

  try {
    const parsed = JSON.parse(raw) as Record<string, unknown>;
    const validatedEntries = Object.entries(parsed).filter((entry): entry is [string, boolean] => {
      return typeof entry[0] === "string" && typeof entry[1] === "boolean";
    });
    return Object.fromEntries(validatedEntries);
  } catch {
    return {};
  }
}

export function useInterventionProgress() {
  const [progress, setProgress] = useState<ProgressState>(() => {
    if (typeof window === "undefined") {
      return {};
    }
    return parseStoredState(localStorage.getItem(STORAGE_KEY));
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  const toggleIntervention = (interventionId: string) => {
    setProgress((previous) => ({
      ...previous,
      [interventionId]: !previous[interventionId],
    }));
  };

  const markIntervention = (interventionId: string, completed: boolean) => {
    setProgress((previous) => ({
      ...previous,
      [interventionId]: completed,
    }));
  };

  const getCompletedCount = (interventionIds: string[]) => {
    return interventionIds.filter((id) => progress[id]).length;
  };

  const completedCount = useMemo(() => {
    return Object.values(progress).filter(Boolean).length;
  }, [progress]);

  return {
    progress,
    toggleIntervention,
    markIntervention,
    getCompletedCount,
    completedCount,
  };
}
