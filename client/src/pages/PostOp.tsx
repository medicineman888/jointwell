import { useMemo } from "react";
import ProcedureToggle from "@/components/ProcedureToggle";
import ImpactInterventionCard from "@/components/ImpactInterventionCard";
import { useInterventionProgress } from "@/hooks/useInterventionProgress";
import { useOptimizationProfile } from "@/hooks/useOptimizationProfile";
import { useUserSettings } from "@/hooks/useUserSettings";
import { getPersonalizedInterventions, getEvidenceForInterventions, procedureMetadata } from "@/data/clinicalProgram";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, ShieldAlert, Activity, Droplets, Pill } from "lucide-react";

export default function PostOp() {
  const { settings, updateSettings, getRecoveryWeek } = useUserSettings();
  const { tags } = useOptimizationProfile();
  const { progress, markIntervention } = useInterventionProgress();
  const recoveryWeek = getRecoveryWeek();
  const selectedProcedure = settings.procedureType ?? "hip";

  const interventions = getPersonalizedInterventions({
    procedure: selectedProcedure,
    phase: "post-op",
    profileTags: tags,
  });

  const evidence = getEvidenceForInterventions(interventions);
  const evidenceMap = useMemo(() => {
    return Object.fromEntries(evidence.map((item) => [item.id, item]));
  }, [evidence]);

  const redFlags = [
    "Chest pain, sudden shortness of breath, or coughing blood.",
    "Calf pain/swelling that is new or increasing.",
    "Fever above 38°C with worsening wound redness, leakage, or odor.",
    "Rapidly increasing pain or inability to weight-bear.",
  ];

  const recoveryChecklist = [
    { icon: Activity, text: "Short, frequent walks spread through the day." },
    { icon: Droplets, text: "Hydration and regular meals to support healing." },
    { icon: Pill, text: "Take pain relief and anticoagulation exactly as prescribed." },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-medium text-foreground mb-2">Post-Operative Recovery Plan</h1>
        <p className="text-base text-muted-foreground leading-relaxed mb-6">
          Evidence-based actions for the first 12 weeks after surgery, tailored to your joint replacement pathway.
        </p>
        <ProcedureToggle selected={selectedProcedure} onSelect={(procedure) => updateSettings({ procedureType: procedure })} />
      </div>

      {settings.rehabPhase !== "post-op" && (
        <Card className="p-5 border-primary/20 bg-primary/5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-foreground">You're currently in pre-op mode.</p>
              <p className="text-sm text-muted-foreground">Switch to post-op mode to unlock week-specific recovery goals.</p>
            </div>
            <Button onClick={() => updateSettings({ rehabPhase: "post-op" })} data-testid="button-switch-to-postop-mode">
              Switch to Post-Op
            </Button>
          </div>
        </Card>
      )}

      <Card className="p-5 bg-muted/40">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <div>
            <p className="text-sm font-medium text-foreground">{procedureMetadata[selectedProcedure].title}</p>
            <p className="text-sm text-muted-foreground">
              Key complication risks: {procedureMetadata[selectedProcedure].keyRisks.join(", ")}.
            </p>
          </div>
          <Badge variant="secondary">{recoveryWeek ? `Week ${recoveryWeek}` : "Recovery stage pending surgery date"}</Badge>
        </div>
        <div className="grid gap-2">
          {recoveryChecklist.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.text} className="flex items-start gap-2 text-sm text-foreground">
                <Icon className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
                <span>{item.text}</span>
              </div>
            );
          })}
        </div>
      </Card>

      <div className="space-y-4">
        {interventions.map((intervention) => (
          <ImpactInterventionCard
            key={intervention.id}
            intervention={intervention}
            completed={Boolean(progress[intervention.id])}
            evidence={intervention.evidenceIds
              .map((evidenceId) => evidenceMap[evidenceId])
              .filter((item): item is (typeof evidence)[number] => item !== undefined)}
            onToggle={(nextValue) => markIntervention(intervention.id, nextValue)}
          />
        ))}
      </div>

      <Card className="p-6 border-destructive/20 bg-destructive/5">
        <div className="flex items-start gap-3 mb-4">
          <ShieldAlert className="w-5 h-5 text-destructive mt-0.5" />
          <div>
            <h3 className="text-lg font-medium text-foreground">Urgent Red Flags</h3>
            <p className="text-sm text-muted-foreground">Seek urgent review immediately if any of the following occur:</p>
          </div>
        </div>
        <div className="space-y-2">
          {redFlags.map((flag) => (
            <div key={flag} className="flex items-start gap-2 text-sm text-foreground">
              <AlertTriangle className="w-4 h-4 mt-0.5 text-destructive flex-shrink-0" />
              <span>{flag}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
