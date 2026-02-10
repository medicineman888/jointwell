export type ProcedureType = "hip" | "knee";
export type RehabPhase = "pre-op" | "post-op";

export type SmokingStatus = "unknown" | "never" | "former" | "current";
export type DiabetesStatus = "unknown" | "yes" | "no";
export type BmiCategory = "unknown" | "under-30" | "30-39.9" | "40-plus";
export type ActivityLevel = "unknown" | "low" | "moderate" | "high";

export interface OptimizationProfile {
  smokingStatus: SmokingStatus;
  diabetesStatus: DiabetesStatus;
  bmiCategory: BmiCategory;
  activityLevel: ActivityLevel;
}
