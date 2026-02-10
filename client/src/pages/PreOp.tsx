import { useMemo } from "react";
import ProcedureToggle from "@/components/ProcedureToggle";
import OptimizationProfileCard from "@/components/OptimizationProfileCard";
import ImpactInterventionCard from "@/components/ImpactInterventionCard";
import HomeReadyChecklistCard from "@/components/HomeReadyChecklistCard";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useHomeReadyChecklist } from "@/hooks/useHomeReadyChecklist";
import { useOptimizationProfile } from "@/hooks/useOptimizationProfile";
import { useInterventionProgress } from "@/hooks/useInterventionProgress";
import { useUserSettings } from "@/hooks/useUserSettings";
import { getEvidenceForInterventions, getPersonalizedInterventions, procedureMetadata } from "@/data/clinicalProgram";
import {
  Armchair,
  BookOpenCheck,
  CheckCircle2,
  CircleAlert,
  Hand,
  Home,
  ListChecks,
  ShowerHead,
  UtensilsCrossed,
} from "lucide-react";

export default function PreOp() {
  const { settings, updateSettings, getWeeksUntilSurgery } = useUserSettings();
  const { profile, updateProfile, tags, completionPercentage } = useOptimizationProfile();
  const { progress, markIntervention, getCompletedCount } = useInterventionProgress();
  const { checklist: homeChecklist, toggleItem: toggleHomeItem, completedCount: homeCompletedCount, totalCount: homeTotalCount } =
    useHomeReadyChecklist();

  const selectedProcedure = settings.procedureType ?? "hip";
  const weeksUntilSurgery = getWeeksUntilSurgery();

  const interventions = getPersonalizedInterventions({
    procedure: selectedProcedure,
    phase: "pre-op",
    profileTags: tags,
  });
  const completedCount = getCompletedCount(interventions.map((item) => item.id));
  const progressPercentage = interventions.length > 0 ? (completedCount / interventions.length) * 100 : 0;

  const evidence = getEvidenceForInterventions(interventions);
  const evidenceMap = useMemo(() => Object.fromEntries(evidence.map((item) => [item.id, item])), [evidence]);
  const homeProgressPercentage = homeTotalCount > 0 ? (homeCompletedCount / homeTotalCount) * 100 : 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-medium text-foreground mb-2">Pre-Operative Optimization Plan</h1>
        <p className="text-base text-muted-foreground leading-relaxed mb-6">
          High-impact interventions personalized to your profile and procedure. Start these actions while on the waiting list.
        </p>
        <ProcedureToggle selected={selectedProcedure} onSelect={(procedure) => updateSettings({ procedureType: procedure })} />
      </div>

      <Card className="p-5 bg-muted/40">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="space-y-1">
            <p className="text-sm font-medium text-foreground">{procedureMetadata[selectedProcedure].title}</p>
            <p className="text-sm text-muted-foreground">
              Focus risks: {procedureMetadata[selectedProcedure].keyRisks.join(", ")}.
            </p>
          </div>
          {weeksUntilSurgery !== null ? (
            <Badge variant="secondary">
              {weeksUntilSurgery} week{weeksUntilSurgery === 1 ? "" : "s"} to surgery
            </Badge>
          ) : null}
        </div>
        <div className="mt-4 space-y-2">
          {procedureMetadata[selectedProcedure].specialFocus.map((tip) => (
            <div key={tip} className="flex items-start gap-2 text-sm text-foreground">
              <ListChecks className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              <span>{tip}</span>
            </div>
          ))}
        </div>
      </Card>

      <OptimizationProfileCard
        profile={profile}
        completionPercentage={completionPercentage}
        onProfileChange={updateProfile}
      />

      <Card className="p-6 bg-primary/5 border-primary/20">
        <div className="flex items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-6 h-6 text-primary" />
            <div>
              <h3 className="text-lg font-medium text-foreground">Optimization Progress</h3>
              <p className="text-sm text-muted-foreground">
                {completedCount} of {interventions.length} actions started
              </p>
            </div>
          </div>
          {completedCount >= 3 ? (
            <Badge className="bg-accent text-accent-foreground">
              <BookOpenCheck className="w-3 h-3 mr-1" />
              Evidence-informed
            </Badge>
          ) : null}
        </div>
        <Progress value={progressPercentage} className="h-3" />
        <p className="text-sm text-muted-foreground mt-3">
          Start with the top-ranked cards first; these are prioritized from your current risk profile and phase of care.
        </p>
      </Card>

      <div className="space-y-4">
        {interventions.map((intervention) => (
          <ImpactInterventionCard
            key={intervention.id}
            intervention={intervention}
            completed={Boolean(progress[intervention.id])}
            evidence={intervention.evidenceIds.flatMap((evidenceId) => {
              const citation = evidenceMap[evidenceId];
              return citation ? [citation] : [];
            })}
            onToggle={(nextValue) => markIntervention(intervention.id, nextValue)}
          />
        ))}
      </div>

      <div className="pt-4">
        <div className="flex items-center gap-3 mb-2">
          <Home className="w-6 h-6 text-accent" />
          <h2 className="text-xl font-medium text-foreground">Getting Your House Ready</h2>
        </div>
        <p className="text-base text-muted-foreground leading-relaxed mb-6">
          Preparing your home environment will make your recovery safer and more comfortable. Complete these arrangements before your surgery.
        </p>

        <Card className="p-5 bg-accent/5 border-accent/20 mb-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-accent" />
              <p className="text-sm font-medium text-foreground">
                {homeCompletedCount} of {homeTotalCount} completed
              </p>
            </div>
            {homeCompletedCount === homeTotalCount && homeCompletedCount > 0 ? (
              <Badge className="bg-accent text-accent-foreground">All done!</Badge>
            ) : null}
          </div>
          <Progress value={homeProgressPercentage} className="h-2 mt-3" />
        </Card>

        <div className="space-y-3">
          <HomeReadyChecklistCard
            icon={Armchair}
            title="Clear pathways and remove trip hazards"
            description="Create clear walking routes through your home. Remove or relocate furniture, rugs, and other obstacles that could cause falls."
            checked={homeChecklist.pathsCleared}
            onToggle={() => toggleHomeItem("pathsCleared")}
            testId="home-paths"
          />
          <HomeReadyChecklistCard
            icon={Hand}
            title="Position everyday items at waist height"
            description="Arrange frequently-used items (remote, phone charger, kettle) between knee and shoulder height to avoid bending or reaching during recovery."
            checked={homeChecklist.itemsAtWaistHeight}
            onToggle={() => toggleHomeItem("itemsAtWaistHeight")}
            testId="home-items"
          />
          <HomeReadyChecklistCard
            icon={Hand}
            title="Install grab rails and raised toilet seat"
            description="Install grab rails beside the toilet and in the shower for safety and stability. Consider a raised toilet seat to reduce hip or knee flexion."
            checked={homeChecklist.grabRailsToiletSeat}
            onToggle={() => toggleHomeItem("grabRailsToiletSeat")}
            testId="home-rails"
          />
          <HomeReadyChecklistCard
            icon={ShowerHead}
            title="Obtain a shower chair or stool"
            description="A shower chair allows you to bathe safely while managing mobility restrictions."
            checked={homeChecklist.showerChairReady}
            onToggle={() => toggleHomeItem("showerChairReady")}
            testId="home-shower"
          />
          <HomeReadyChecklistCard
            icon={UtensilsCrossed}
            title="Stock supplies and arrange support"
            description="Stock ready meals and arrange practical support for the first 2 weeks at home."
            checked={homeChecklist.freezerStockedHelpSorted}
            onToggle={() => toggleHomeItem("freezerStockedHelpSorted")}
            testId="home-freezer"
          />
        </div>
      </div>

      <Card className="p-6 border-primary/20">
        <div className="flex items-start gap-3 mb-4">
          <CircleAlert className="w-5 h-5 text-primary mt-0.5" />
          <div>
            <h3 className="text-lg font-medium text-foreground">Evidence Library</h3>
            <p className="text-sm text-muted-foreground">
              Studies used to prioritize recommendations in this app. Discuss local protocol differences with your surgical team.
            </p>
          </div>
        </div>
        <div className="space-y-3">
          {evidence.map((item) => (
            <div key={item.id} className="rounded-lg border border-border p-4 bg-muted/40">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <Badge variant="secondary">{item.shortLabel}</Badge>
                <Badge variant="outline">{item.quality}</Badge>
              </div>
              <p className="text-sm text-foreground leading-relaxed">{item.title}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {item.journal} ({item.year})
                {item.pmid ? ` • PMID ${item.pmid}` : ""}
                {item.doi ? ` • DOI ${item.doi}` : ""}
              </p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
