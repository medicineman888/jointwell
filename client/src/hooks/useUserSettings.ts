import { useState, useEffect } from "react";

export interface UserSettings {
  procedureType: "hip" | "knee" | null;
  surgeryDate: string | null;
  rehabPhase: "pre-op" | "post-op";
}

const STORAGE_KEY = "jointwell-user-settings";

const defaultSettings: UserSettings = {
  procedureType: null,
  surgeryDate: null,
  rehabPhase: "pre-op",
};

export function useUserSettings() {
  const [settings, setSettings] = useState<UserSettings>(() => {
    if (typeof window === "undefined") return defaultSettings;
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (!parsed.rehabPhase) {
          parsed.rehabPhase = parsed.surgeryDate ? "post-op" : "pre-op";
        }
        return { ...defaultSettings, ...parsed };
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

  const switchToPostOp = (surgeryDate: string) => {
    setSettings((prev) => ({
      ...prev,
      surgeryDate,
      rehabPhase: "post-op",
    }));
  };

  const getWeeksUntilSurgery = (): number | null => {
    if (settings.rehabPhase !== "pre-op" || !settings.surgeryDate) return null;
    const surgery = new Date(settings.surgeryDate);
    const now = new Date();
    const diffTime = surgery.getTime() - now.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays < 0) return 0;
    return Math.ceil(diffDays / 7);
  };

  const getRecoveryWeek = (): number | null => {
    if (settings.rehabPhase !== "post-op" || !settings.surgeryDate) return null;
    const surgery = new Date(settings.surgeryDate);
    const now = new Date();
    const diffTime = now.getTime() - surgery.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays < 0) return null;
    return Math.floor(diffDays / 7) + 1;
  };

  const getPreOpStepGoal = (): number => {
    const weeksUntil = getWeeksUntilSurgery();
    if (weeksUntil === null || weeksUntil > 6) return 3000;
    if (weeksUntil > 4) return 4000;
    if (weeksUntil > 2) return 5000;
    if (weeksUntil > 1) return 4000;
    return 2000;
  };

  const getPostOpStepGoal = (): number => {
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

  const getStepGoal = (): number => {
    if (settings.rehabPhase === "pre-op") {
      return getPreOpStepGoal();
    }
    return getPostOpStepGoal();
  };

  const getPreOpPhase = (): { name: string; description: string } | null => {
    const weeksUntil = getWeeksUntilSurgery();
    if (weeksUntil === null) {
      return {
        name: "Prehabilitation",
        description: "Build strength and fitness before your surgery to improve recovery outcomes.",
      };
    }

    if (weeksUntil > 4) {
      return {
        name: "Building Strength",
        description: "Focus on strengthening exercises and building cardiovascular fitness.",
      };
    }
    if (weeksUntil > 1) {
      return {
        name: "Final Preparation",
        description: "Continue exercises whilst preparing your home and support network.",
      };
    }
    return {
      name: "Surgery Week",
      description: "Rest and prepare. Light movement only. Good luck with your surgery!",
    };
  };

  const getPostOpPhase = (): { name: string; description: string } | null => {
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

  const getRecoveryPhase = (): { name: string; description: string } | null => {
    if (settings.rehabPhase === "pre-op") {
      return getPreOpPhase();
    }
    return getPostOpPhase();
  };

  const isSetupComplete = settings.procedureType !== null;
  const hasDateSet = settings.surgeryDate !== null;

  return {
    settings,
    updateSettings,
    clearSettings,
    switchToPostOp,
    getWeeksUntilSurgery,
    getRecoveryWeek,
    getStepGoal,
    getRecoveryPhase,
    isSetupComplete,
    hasDateSet,
  };
}
