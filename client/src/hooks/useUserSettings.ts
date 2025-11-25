import { useState, useEffect } from "react";

export interface UserSettings {
  procedureType: "hip" | "knee" | null;
  surgeryDate: string | null;
}

const STORAGE_KEY = "jointwell-user-settings";

const defaultSettings: UserSettings = {
  procedureType: null,
  surgeryDate: null,
};

export function useUserSettings() {
  const [settings, setSettings] = useState<UserSettings>(() => {
    if (typeof window === "undefined") return defaultSettings;
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return defaultSettings;
      }
    }
    return defaultSettings;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  }, [settings]);

  const updateSettings = (updates: Partial<UserSettings>) => {
    setSettings((prev) => ({ ...prev, ...updates }));
  };

  const clearSettings = () => {
    setSettings(defaultSettings);
    localStorage.removeItem(STORAGE_KEY);
  };

  const getRecoveryWeek = (): number | null => {
    if (!settings.surgeryDate) return null;
    const surgery = new Date(settings.surgeryDate);
    const now = new Date();
    const diffTime = now.getTime() - surgery.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays < 0) return null;
    return Math.floor(diffDays / 7) + 1;
  };

  const getStepGoal = (): number => {
    const week = getRecoveryWeek();
    if (week === null) return 3000;

    if (week <= 1) return 500;
    if (week <= 2) return 1000;
    if (week <= 3) return 1500;
    if (week <= 4) return 2000;
    if (week <= 6) return 2500;
    if (week <= 8) return 3000;
    if (week <= 10) return 4000;
    if (week <= 12) return 5000;
    return 6000;
  };

  const getRecoveryPhase = (): { name: string; description: string } | null => {
    const week = getRecoveryWeek();
    if (week === null) return null;

    if (week <= 2) {
      return {
        name: "Early Recovery",
        description: "Focus on rest, ice, elevation, and gentle movement. Limit walking to short distances.",
      };
    }
    if (week <= 6) {
      return {
        name: "Building Mobility",
        description: "Gradually increasing activity. Swelling management remains important.",
      };
    }
    if (week <= 12) {
      return {
        name: "Strengthening Phase",
        description: "Building strength and endurance. Continue monitoring for swelling.",
      };
    }
    return {
      name: "Full Recovery",
      description: "Most activities can resume. Maintain exercise routine for joint health.",
    };
  };

  const isSetupComplete = settings.procedureType !== null && settings.surgeryDate !== null;

  return {
    settings,
    updateSettings,
    clearSettings,
    getRecoveryWeek,
    getStepGoal,
    getRecoveryPhase,
    isSetupComplete,
  };
}
