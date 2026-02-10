import type { ProfileTag } from "@/hooks/useOptimizationProfile";
import type { ProcedureType, RehabPhase } from "@/types/clinical";

export type EvidenceQuality = "RCT" | "Systematic review/meta-analysis" | "Guideline consensus";

export interface EvidenceCitation {
  id: string;
  shortLabel: string;
  title: string;
  journal: string;
  year: number;
  quality: EvidenceQuality;
  doi?: string;
  pmid?: string;
  practicalTakeaway: string;
}

export interface InterventionDefinition {
  id: string;
  title: string;
  timeframe: string;
  summary: string;
  actions: string[];
  impactStatement: string;
  phase: RehabPhase | "both";
  procedures: Array<ProcedureType | "both">;
  profileTags: ProfileTag[];
  evidenceIds: string[];
}

export interface ProcedureMetadata {
  title: string;
  keyRisks: string[];
  specialFocus: string[];
}

// Expand this map when adding new procedures.
export const procedureMetadata: Record<ProcedureType, ProcedureMetadata> = {
  hip: {
    title: "Total Hip Arthroplasty",
    keyRisks: ["dislocation", "venous thromboembolism", "surgical site infection"],
    specialFocus: [
      "Practice safe sit-to-stand mechanics and avoid deep flexion positions after surgery.",
      "Build upper-body strength to reduce fatigue when using crutches or a frame.",
    ],
  },
  knee: {
    title: "Total Knee Arthroplasty",
    keyRisks: ["stiffness", "venous thromboembolism", "surgical site infection"],
    specialFocus: [
      "Prioritize quadriceps activation and knee range of motion from day 1 after surgery.",
      "Plan swelling-control routines (ice + elevation) before discharge day.",
    ],
  },
};

export const evidenceLibrary: EvidenceCitation[] = [
  {
    id: "lancet-smoking-2002",
    shortLabel: "Lancet RCT",
    title: "Effect of preoperative smoking intervention on postoperative complications: a randomised clinical trial.",
    journal: "Lancet",
    year: 2002,
    quality: "RCT",
    doi: "10.1016/S0140-6736(02)07369-5",
    pmid: "11809253",
    practicalTakeaway: "Structured smoking cessation before surgery reduces postoperative complications.",
  },
  {
    id: "annsurg-fast-track-2008",
    shortLabel: "Ann Surg review",
    title: "Evidence-based surgical care and the evolution of fast-track surgery.",
    journal: "Annals of Surgery",
    year: 2008,
    quality: "Systematic review/meta-analysis",
    doi: "10.1097/SLA.0b013e31817f2c1a",
    pmid: "18650627",
    practicalTakeaway: "Multimodal perioperative pathways improve recovery speed and reduce complications.",
  },
  {
    id: "acta-eras-2020",
    shortLabel: "ERAS consensus",
    title:
      "Consensus statement for perioperative care in total hip replacement and total knee replacement surgery: Enhanced Recovery After Surgery (ERAS) Society recommendations.",
    journal: "Acta Orthopaedica",
    year: 2020,
    quality: "Guideline consensus",
    doi: "10.1080/17453674.2019.1683790",
    pmid: "31663402",
    practicalTakeaway:
      "Arthroplasty-specific ERAS pathways support pre-op optimization, early mobilization, and standardized discharge planning.",
  },
  {
    id: "jama-prehab-2023",
    shortLabel: "JAMA meta-analysis",
    title: "Prehabilitation for Patients Undergoing Orthopedic Surgery: A Systematic Review and Meta-analysis.",
    journal: "JAMA Network Open",
    year: 2023,
    quality: "Systematic review/meta-analysis",
    doi: "10.1001/jamanetworkopen.2023.8050",
    pmid: "37052919",
    practicalTakeaway:
      "Exercise-led prehabilitation improves preoperative function and early postoperative recovery in orthopaedic surgery.",
  },
  {
    id: "jbjs-prehab-2017",
    shortLabel: "JBJS review",
    title:
      "The Value of Preoperative Exercise and Education for Patients Undergoing Total Hip and Knee Arthroplasty: A Systematic Review and Meta-Analysis.",
    journal: "JBJS Reviews",
    year: 2017,
    quality: "Systematic review/meta-analysis",
    doi: "10.2106/JBJS.RVW.17.00015",
    pmid: "29232265",
    practicalTakeaway:
      "Combined pre-op exercise plus education is associated with better pain/function trajectories after THA/TKA.",
  },
  {
    id: "glycemic-jarthro-2018",
    shortLabel: "Glycaemia meta-analysis",
    title:
      "Inadequate Glycemic Control Is Associated With Increased Surgical Site Infection in Total Joint Arthroplasty: A Systematic Review and Meta-Analysis.",
    journal: "The Journal of Arthroplasty",
    year: 2018,
    quality: "Systematic review/meta-analysis",
    doi: "10.1016/j.arth.2018.02.020",
    pmid: "29605149",
    practicalTakeaway:
      "Poor perioperative glycaemic control is linked to higher infection risk after total joint replacement.",
  },
  {
    id: "pji-risk-iwj-2017",
    shortLabel: "PJI risk meta-analysis",
    title: "Risk factors for periprosthetic joint infection following primary total hip or knee arthroplasty: a meta-analysis.",
    journal: "International Wound Journal",
    year: 2017,
    quality: "Systematic review/meta-analysis",
    doi: "10.1111/iwj.12640",
    pmid: "27397553",
    practicalTakeaway:
      "Modifiable factors such as smoking and glycaemic status are consistently associated with infection risk.",
  },
  {
    id: "bjj-bariatric-2016",
    shortLabel: "Bone & Joint meta-analysis",
    title:
      "Does bariatric surgery prior to total hip or knee arthroplasty reduce post-operative complications and improve clinical outcomes for obese patients? Systematic review and meta-analysis.",
    journal: "Bone & Joint Journal",
    year: 2016,
    quality: "Systematic review/meta-analysis",
    doi: "10.1302/0301-620X.98B9.38024",
    pmid: "27587514",
    practicalTakeaway:
      "Weight optimization strategies can influence perioperative risk and should be individualized with the surgical team.",
  },
];

export const interventions: InterventionDefinition[] = [
  {
    id: "stop-smoking",
    title: "Stop smoking and vaping as early as possible",
    timeframe: "Best started at least 4 weeks before surgery",
    summary:
      "Smoking is one of the highest-impact modifiable risks for wound complications, pulmonary events, and delayed healing.",
    actions: [
      "Set a quit date this week and remove tobacco/vape access at home.",
      "Ask your GP/pharmacist for nicotine replacement or formal cessation support.",
      "Track smoke-free days in-app and celebrate each 7-day streak.",
    ],
    impactStatement: "High impact for infection prevention and respiratory recovery.",
    phase: "pre-op",
    procedures: ["both"],
    profileTags: ["smoker"],
    evidenceIds: ["lancet-smoking-2002", "pji-risk-iwj-2017", "acta-eras-2020"],
  },
  {
    id: "glycaemic-optimization",
    title: "Optimize blood sugar control (if diabetic)",
    timeframe: "Start now and review with your diabetes team before surgery",
    summary:
      "Perioperative hyperglycaemia is linked to higher surgical site infection rates and poorer wound healing after arthroplasty.",
    actions: [
      "Book a diabetes medication review and discuss perioperative planning.",
      "Monitor home glucose trends and bring records to pre-assessment clinic.",
      "Ask your surgical team what local HbA1c threshold they use for elective surgery.",
    ],
    impactStatement: "High impact for reducing preventable infection risk.",
    phase: "pre-op",
    procedures: ["both"],
    profileTags: ["diabetes"],
    evidenceIds: ["glycemic-jarthro-2018", "acta-eras-2020", "pji-risk-iwj-2017"],
  },
  {
    id: "structured-prehabilitation",
    title: "Build a structured prehabilitation routine",
    timeframe: "4-12 weeks before surgery",
    summary:
      "Progressive strengthening, aerobic activity, and education improve readiness and early function after surgery.",
    actions: [
      "Complete at least 3 structured exercise sessions each week.",
      "Aim for daily step consistency with gradual weekly increases.",
      "Practice procedure-specific movements (hip safety positions or knee ROM drills).",
    ],
    impactStatement: "High impact for functional recovery speed.",
    phase: "pre-op",
    procedures: ["both"],
    profileTags: ["all", "low-activity"],
    evidenceIds: ["jama-prehab-2023", "jbjs-prehab-2017", "acta-eras-2020"],
  },
  {
    id: "weight-and-nutrition",
    title: "Optimize weight and nutrition quality",
    timeframe: "Start immediately while on waiting list",
    summary:
      "A supervised plan for gradual weight reduction (when indicated) plus adequate protein intake supports wound healing and mobility.",
    actions: [
      "If BMI is elevated, set a realistic short-term target with your clinician.",
      "Prioritize protein at each meal and avoid prolonged fasting or crash diets.",
      "Log weekly weight to track trend, not daily fluctuations.",
    ],
    impactStatement: "Moderate-to-high impact for wound and complication risk profile.",
    phase: "pre-op",
    procedures: ["both"],
    profileTags: ["all", "higher-bmi"],
    evidenceIds: ["bjj-bariatric-2016", "acta-eras-2020"],
  },
  {
    id: "education-expectations",
    title: "Complete pre-op education and expectation setting",
    timeframe: "Before your final pre-assessment appointment",
    summary:
      "Patients with clear expectations and practical preparation tend to mobilize earlier and manage postoperative symptoms more effectively.",
    actions: [
      "Attend your joint school (or virtual education class) if available.",
      "Review postoperative red flags with a family member or support person.",
      "Prepare a home support and transport plan for the first 2 weeks post-op.",
    ],
    impactStatement: "High impact for confidence, adherence, and discharge readiness.",
    phase: "pre-op",
    procedures: ["both"],
    profileTags: ["all"],
    evidenceIds: ["jbjs-prehab-2017", "acta-eras-2020", "annsurg-fast-track-2008"],
  },
  {
    id: "early-mobilization",
    title: "Mobilize early and consistently after surgery",
    timeframe: "Day 0 onward, within surgeon/PT guidance",
    summary:
      "Early mobilization is a core ERAS principle to lower complications and speed restoration of independence.",
    actions: [
      "Stand and walk with staff support as soon as medically cleared.",
      "Break activity into short frequent sessions across the day.",
      "Use your prescribed walking aid and progression plan exactly as instructed.",
    ],
    impactStatement: "High impact for reducing deconditioning and thrombotic risk.",
    phase: "post-op",
    procedures: ["both"],
    profileTags: ["all", "low-activity"],
    evidenceIds: ["acta-eras-2020", "annsurg-fast-track-2008"],
  },
  {
    id: "vte-and-wound-safety",
    title: "Protect against clots and monitor wound safety",
    timeframe: "First 2-6 weeks after surgery",
    summary:
      "Adherence to thromboprophylaxis, ankle pumping, and wound surveillance is central to safe early recovery.",
    actions: [
      "Take anticoagulation exactly as prescribed and do not skip doses.",
      "Perform ankle pumps every hour while awake in week 1-2.",
      "Seek urgent review for calf pain/swelling, chest pain, fever, or increasing wound leakage.",
    ],
    impactStatement: "High impact for preventing severe postoperative complications.",
    phase: "post-op",
    procedures: ["both"],
    profileTags: ["all"],
    evidenceIds: ["acta-eras-2020", "pji-risk-iwj-2017"],
  },
  {
    id: "swelling-pain-management",
    title: "Use a repeatable swelling and pain management routine",
    timeframe: "Daily in early recovery phase",
    summary:
      "Patients recover better when pain is controlled enough to complete physiotherapy while avoiding overactivity spikes.",
    actions: [
      "Use ice and elevation blocks after exercise sessions.",
      "Follow your pain medication plan before physiotherapy sessions.",
      "Scale step volume gradually when swelling settles for 24 hours.",
    ],
    impactStatement: "Moderate-to-high impact for sustained rehabilitation adherence.",
    phase: "post-op",
    procedures: ["both"],
    profileTags: ["all"],
    evidenceIds: ["acta-eras-2020", "annsurg-fast-track-2008"],
  },
];

interface InterventionFilters {
  procedure: ProcedureType;
  phase: RehabPhase;
  profileTags: ProfileTag[];
}

function scoreIntervention(item: InterventionDefinition, tags: ProfileTag[]): number {
  const matchingSpecificTags = item.profileTags.filter((tag) => tag !== "all" && tags.includes(tag)).length;
  const allTagBonus = item.profileTags.includes("all") ? 1 : 0;
  return matchingSpecificTags * 3 + allTagBonus;
}

export function getPersonalizedInterventions(filters: InterventionFilters): InterventionDefinition[] {
  const scoped = interventions.filter((item) => {
    const supportsPhase = item.phase === "both" || item.phase === filters.phase;
    const supportsProcedure = item.procedures.includes("both") || item.procedures.includes(filters.procedure);
    return supportsPhase && supportsProcedure;
  });

  return scoped
    .map((item) => ({ item, score: scoreIntervention(item, filters.profileTags) }))
    .sort((left, right) => right.score - left.score)
    .map((entry) => entry.item);
}

export function getEvidenceForInterventions(interventionList: InterventionDefinition[]): EvidenceCitation[] {
  const ids = new Set(interventionList.flatMap((item) => item.evidenceIds));
  return evidenceLibrary.filter((citation) => ids.has(citation.id));
}
