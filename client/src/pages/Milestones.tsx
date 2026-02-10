import MilestoneTimeline from "@/components/MilestoneTimeline";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useUserSettings } from "@/hooks/useUserSettings";
import { Car, CalendarClock, Compass, Expand, CheckCircle2 } from "lucide-react";

export default function Milestones() {
  const { settings, getWeeksUntilSurgery, getRecoveryWeek, getStepGoal } = useUserSettings();
  const selectedProcedure = settings.procedureType ?? "hip";
  const weeksUntilSurgery = getWeeksUntilSurgery();
  const recoveryWeek = getRecoveryWeek();
  const stepGoal = getStepGoal();

  const waitingListMilestones = [
    {
      week: "12+ weeks out",
      title: "Baseline setup",
      description: "Complete profile setup, identify modifiable risks, and agree your first 3 optimization targets.",
      completed: settings.rehabPhase === "post-op" || (weeksUntilSurgery !== null && weeksUntilSurgery <= 12),
    },
    {
      week: "6-12 weeks out",
      title: "Build prehab consistency",
      description: "Target 3 exercise sessions per week and build daily movement tolerance.",
      completed: settings.rehabPhase === "post-op" || (weeksUntilSurgery !== null && weeksUntilSurgery <= 6),
    },
    {
      week: "2-6 weeks out",
      title: "Finalize logistics",
      description: "Complete home safety setup, support planning, and pre-op education modules.",
      completed: settings.rehabPhase === "post-op" || (weeksUntilSurgery !== null && weeksUntilSurgery <= 2),
    },
    {
      week: "Surgery week",
      title: "Ready for admission",
      description: "Follow fasting and medication instructions exactly, and use your packed checklist.",
      completed: settings.rehabPhase === "post-op" || (weeksUntilSurgery !== null && weeksUntilSurgery <= 0),
    },
  ];

  const recoveryMilestones = [
    {
      week: "Week 0-2",
      title: "Protect and mobilize",
      description:
        "Short frequent walks, hourly ankle pumps, strict medication adherence, and close wound monitoring.",
      completed: recoveryWeek !== null && recoveryWeek > 2,
    },
    {
      week: "Week 3-6",
      title: "Rebuild confidence",
      description:
        "Progress walking distance safely and continue physiotherapy with swelling control routines.",
      completed: recoveryWeek !== null && recoveryWeek > 6,
    },
    {
      week: "Week 7-12",
      title: "Restore function",
      description:
        "Advance strength and endurance while returning to household and community activities.",
      completed: recoveryWeek !== null && recoveryWeek > 12,
    },
    {
      week: "Beyond week 12",
      title: "Long-term joint health",
      description: "Maintain regular activity, strength training, and weight management to protect implant longevity.",
      completed: recoveryWeek !== null && recoveryWeek > 16,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-medium text-foreground mb-2">Waitlist-to-Recovery Milestones</h1>
        <p className="text-base text-muted-foreground leading-relaxed mb-6">
          A single pathway from waiting list optimization to post-op function milestones.
        </p>
      </div>

      <Card className="p-5 bg-muted/40">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <Badge variant="secondary">{selectedProcedure === "hip" ? "Hip pathway" : "Knee pathway"}</Badge>
          <Badge variant="outline">{settings.rehabPhase === "pre-op" ? "Pre-op mode" : "Post-op mode"}</Badge>
        </div>
        <p className="text-sm text-muted-foreground">
          Current daily step goal: <span className="font-medium text-foreground">{stepGoal.toLocaleString()} steps</span>
        </p>
      </Card>

      <div>
        <div className="flex items-center gap-2 mb-4 px-1">
          <CalendarClock className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-medium text-foreground">Before Surgery</h2>
        </div>
        <MilestoneTimeline milestones={waitingListMilestones} />
      </div>

      <div>
        <div className="flex items-center gap-2 mb-4 px-1">
          <Compass className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-medium text-foreground">After Surgery</h2>
        </div>
        <MilestoneTimeline milestones={recoveryMilestones} />
      </div>

      <div>
        <h2 className="text-lg font-medium text-foreground mb-4 px-1">Returning to Driving</h2>
        <Card className="p-6">
          <div className="flex gap-4 mb-6">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Car className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-medium text-foreground mb-2">DVLA Guidelines</h3>
              <p className="text-base text-muted-foreground leading-relaxed">
                You may return to driving only when you can safely perform an emergency stop and are not impaired by sedating medication. Typical timeframes are often around 6-8 weeks for right-sided procedures, but individual advice varies.
              </p>
            </div>
          </div>

          <div className="space-y-4 pl-2">
            <h4 className="text-base font-medium text-foreground mb-3">Before Driving, You Must Be Able To:</h4>
            <div className="space-y-3">
              <div className="flex gap-3 items-start">
                <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <p className="text-base text-foreground">Enter and exit the vehicle comfortably and safely</p>
              </div>
              <div className="flex gap-3 items-start">
                <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <p className="text-base text-foreground">Perform an emergency stop without hesitation</p>
              </div>
              <div className="flex gap-3 items-start">
                <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <p className="text-base text-foreground">Maintain full control including checking blind spots</p>
              </div>
              <div className="flex gap-3 items-start">
                <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <p className="text-base text-foreground">No longer taking pain medication that impairs judgment</p>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-border">
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Important:</strong> Obtain clearance from your surgeon or GP, confirm insurance cover, and start with short supervised routes.
              </p>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-5 border-primary/20">
        <div className="flex items-start gap-3">
          <Expand className="w-5 h-5 text-primary mt-0.5" />
          <div>
            <h3 className="text-base font-medium text-foreground">Built for expansion</h3>
            <p className="text-sm text-muted-foreground">
              This app now uses a data-driven pathway model, so additional procedures (e.g., shoulder arthroplasty, spine, sports surgery) can be added with the same intervention/evidence framework.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
