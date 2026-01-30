import { useState, useEffect } from "react";

export interface PreOpChecklistState {
  stoppedSmoking: boolean;
  bloodSugarSorted: boolean;
  dailyExercises: boolean;
  weightProgress: boolean;
  carbDrinksReady: boolean;
}

const STORAGE_KEY = "jointwell-preop-checklist";

const defaultState: PreOpChecklistState = {
  stoppedSmoking: false,
  bloodSugarSorted: false,
  dailyExercises: false,
  weightProgress: false,
  carbDrinksReady: false,
};

export function usePreOpChecklist() {
  const [checklist, setChecklist] = useState<PreOpChecklistState>(() => {
    if (typeof window === "undefined") return defaultState;
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        return { ...defaultState, ...JSON.parse(stored) };
      } catch {
        return defaultState;
      }
    }
    return defaultState;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(checklist));
    } catch {
      // localStorage may be full or unavailable
    }
  }, [checklist]);

  const toggleItem = (key: keyof PreOpChecklistState) => {
    setChecklist((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const completedCount = Object.values(checklist).filter(Boolean).length;
  const totalCount = Object.keys(checklist).length;

  return {
    checklist,
    toggleItem,
    completedCount,
    totalCount,
  };
}
