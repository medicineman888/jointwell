import { useState, useEffect } from "react";

export interface HomeReadyChecklistState {
  pathsCleared: boolean;
  itemsAtWaistHeight: boolean;
  grabRailsToiletSeat: boolean;
  showerChairReady: boolean;
  freezerStockedHelpSorted: boolean;
}

const STORAGE_KEY = "jointwell-home-ready-checklist";

const defaultState: HomeReadyChecklistState = {
  pathsCleared: false,
  itemsAtWaistHeight: false,
  grabRailsToiletSeat: false,
  showerChairReady: false,
  freezerStockedHelpSorted: false,
};

export function useHomeReadyChecklist() {
  const [checklist, setChecklist] = useState<HomeReadyChecklistState>(() => {
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

  const toggleItem = (key: keyof HomeReadyChecklistState) => {
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
