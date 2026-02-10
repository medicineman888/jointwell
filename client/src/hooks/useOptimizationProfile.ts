import { useEffect, useState } from "react";
import {
  type OptimizationProfile,
  type SmokingStatus,
  type DiabetesStatus,
  type BmiCategory,
  type ActivityLevel,
} from "@/types/clinical";

export type ProfileTag = "all" | "smoker" | "diabetes" | "higher-bmi" | "low-activity";

const STORAGE_KEY = "jointwell-optimization-profile";

const defaultProfile: OptimizationProfile = {
  smokingStatus: "unknown",
  diabetesStatus: "unknown",
  bmiCategory: "unknown",
  activityLevel: "unknown",
};

function isSmokingStatus(value: unknown): value is SmokingStatus {
  return value === "unknown" || value === "never" || value === "former" || value === "current";
}

function isBmiCategory(value: unknown): value is BmiCategory {
  return value === "unknown" || value === "under-30" || value === "30-39.9" || value === "40-plus";
}

function isDiabetesStatus(value: unknown): value is DiabetesStatus {
  return value === "unknown" || value === "yes" || value === "no";
}

function isActivityLevel(value: unknown): value is ActivityLevel {
  return value === "unknown" || value === "low" || value === "moderate" || value === "high";
}

function parseStoredProfile(raw: string | null): OptimizationProfile {
  if (!raw) {
    return defaultProfile;
  }

  try {
    const parsed = JSON.parse(raw) as Partial<OptimizationProfile>;

    return {
      smokingStatus: isSmokingStatus(parsed.smokingStatus) ? parsed.smokingStatus : defaultProfile.smokingStatus,
      diabetesStatus: isDiabetesStatus(parsed.diabetesStatus) ? parsed.diabetesStatus : defaultProfile.diabetesStatus,
      bmiCategory: isBmiCategory(parsed.bmiCategory) ? parsed.bmiCategory : defaultProfile.bmiCategory,
      activityLevel: isActivityLevel(parsed.activityLevel) ? parsed.activityLevel : defaultProfile.activityLevel,
    };
  } catch {
    return defaultProfile;
  }
}

export function getProfileTags(profile: OptimizationProfile): ProfileTag[] {
  const tags: ProfileTag[] = ["all"];

  if (profile.smokingStatus === "current") {
    tags.push("smoker");
  }
  if (profile.diabetesStatus === "yes") {
    tags.push("diabetes");
  }
  if (profile.bmiCategory === "30-39.9" || profile.bmiCategory === "40-plus") {
    tags.push("higher-bmi");
  }
  if (profile.activityLevel === "low") {
    tags.push("low-activity");
  }

  return tags;
}

export function useOptimizationProfile() {
  const [profile, setProfile] = useState<OptimizationProfile>(() => {
    if (typeof window === "undefined") {
      return defaultProfile;
    }
    return parseStoredProfile(localStorage.getItem(STORAGE_KEY));
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  }, [profile]);

  const updateProfile = (updates: Partial<OptimizationProfile>) => {
    setProfile((previous) => ({ ...previous, ...updates }));
  };

  const completionCount = Object.values(profile).filter((value) => value !== "unknown").length;

  const completionPercentage = Math.round((completionCount / 4) * 100);

  return {
    profile,
    updateProfile,
    tags: getProfileTags(profile),
    completionCount,
    completionPercentage,
  };
}
