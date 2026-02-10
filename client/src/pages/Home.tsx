import { useState } from "react";
import WelcomeCard from "@/components/WelcomeCard";
import StepCounter from "@/components/StepCounter";
import QuickTipCard from "@/components/QuickTipCard";
import ReminderToggleCard from "@/components/ReminderToggleCard";
import SetupModal from "@/components/SetupModal";
import SwitchToPostOpBanner from "@/components/SwitchToPostOpBanner";
import WeightTrackerCard from "@/components/WeightTrackerCard";
import OptimizationProfileCard from "@/components/OptimizationProfileCard";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { getPersonalizedInterventions, procedureMetadata } from "@/data/clinicalProgram";
import { useUserSettings } from "@/hooks/useUserSettings";
import { useOptimizationProfile } from "@/hooks/useOptimizationProfile";
import { useInterventionProgress } from "@/hooks/useInterventionProgress";
import { useDailyMetrics } from "@/hooks/useDailyMetrics";
import type { ProcedureType } from "@/types/clinical";
import { Droplets, ArrowUp, Activity, TrendingUp, Dumbbell, Heart } from "lucide-react";

export default function Home() {
  const { 
    settings, 
    updateSettings, 
    switchToPostOp,
    getRecoveryWeek, 
    getWeeksUntilSurgery,
    getStepGoal, 
    getRecoveryPhase, 
    isSetupComplete 
  } = useUserSettings();
  const { profile, updateProfile, tags, completionPercentage } = useOptimizationProfile();
  const { progress, toggleIntervention, getCompletedCount } = useInterventionProgress();
  const { todaySteps, setTodaySteps, addSteps, weightSummary, logWeight } = useDailyMetrics();

  const [ankleReminder, setAnkleReminder] = useState(true);
  const [elevationReminder, setElevationReminder] = useState(false);
  const [stepReminder, setStepReminder] = useState(true);
  const [setupOpen, setSetupOpen] = useState(!isSetupComplete);

  const handleSaveSettings = (procedureType: "hip" | "knee", surgeryDate: string | null, rehabPhase: "pre-op" | "post-op") => {
    updateSettings({ procedureType, surgeryDate, rehabPhase });
  };

  const handleSwitchToPostOp = (surgeryDate: string) => {
    switchToPostOp(surgeryDate);
  };

  const recoveryWeek = getRecoveryWeek();
  const weeksUntilSurgery = getWeeksUntilSurgery();
  const stepGoal = getStepGoal();
  const recoveryPhase = getRecoveryPhase();
  const isPreOp = settings.rehabPhase === "pre-op";
  const selectedProcedure: ProcedureType = settings.procedureType ?? "hip";
  const interventions = getPersonalizedInterventions({
    procedure: selectedProcedure,
    phase: settings.rehabPhase,
    profileTags: tags,
  });
  const topInterventions = interventions.slice(0, 3);
  const completedInterventions = getCompletedCount(interventions.map((item) => item.id));

  const interventionScore = interventions.length > 0 ? (completedInterventions / interventions.length) * 70 : 0;
  const stepScore = Math.min(todaySteps / Math.max(stepGoal, 1), 1) * 20;
  const profileScore = (completionPercentage / 100) * 10;
  const readinessScore = Math.round(interventionScore + stepScore + profileScore);

  const getPreOpTips = () => {
    if (weeksUntilSurgery !== null && weeksUntilSurgery <= 1) {
      return [
        {
          icon: Heart,
          title: "Rest Before Surgery",
          description: "Take it easy this week. Light walks and gentle stretching only.",
        },
        {
          icon: Droplets,
          title: "Stay Hydrated",
          description: "Drink plenty of water to ensure you're well hydrated for surgery.",
        },
        {
          icon: Activity,
          title: "Practice Ankle Pumps",
          description: "You'll need to do these after surgery to prevent blood clots.",
        },
      ];
    }

    return [
      {
        icon: Dumbbell,
        title: "Strengthen Your Muscles",
        description: "Perform your prescribed exercises daily to build strength for faster recovery.",
      },
      {
        icon: TrendingUp,
        title: "Build Activity Tolerance",
        description: "Aim for consistent daily movement. Small gains now often translate to easier mobilisation after surgery.",
      },
      {
        icon: Heart,
        title: "Target Modifiable Risks",
        description: "Focus first on smoking cessation, glycaemic control, and adherence to your pre-op education plan.",
      },
    ];
  };

  const getPostOpTips = () => {
    if (recoveryWeek && recoveryWeek <= 2) {
      return [
        {
          icon: Droplets,
          title: "Ice Regularly",
          description: "Apply ice wrapped in a towel for 15-20 minutes, 3-4 times daily to reduce swelling.",
        },
        {
          icon: ArrowUp,
          title: "Elevate Above Heart",
          description: "Keep your leg elevated above heart level as much as possible to minimise swelling.",
        },
        {
          icon: Activity,
          title: "Ankle Pumps Hourly",
          description: "Perform ankle pumps every hour whilst awake to prevent blood clots.",
        },
      ];
    }
    if (recoveryWeek && recoveryWeek <= 6) {
      return [
        {
          icon: Droplets,
          title: "Stay Hydrated",
          description: "Drink plenty of water to support healing and reduce swelling.",
        },
        {
          icon: ArrowUp,
          title: "Elevate After Activity",
          description: "Rest with your leg elevated for 20 minutes after walking sessions.",
        },
        {
          icon: Activity,
          title: "Gentle Movement",
          description: "Continue ankle pumps and prescribed exercises 2-3 times daily.",
        },
      ];
    }
    return [
      {
        icon: Droplets,
        title: "Stay Hydrated",
        description: "Drink plenty of water throughout the day to support ongoing healing.",
      },
      {
        icon: ArrowUp,
        title: "Monitor Swelling",
        description: "If swelling increases after activity, reduce intensity and elevate your leg.",
      },
      {
        icon: Activity,
        title: "Progress Loading Gradually",
        description: "Increase walking and exercises in small steps to avoid swelling setbacks.",
      },
    ];
  };

  const tips = isPreOp ? getPreOpTips() : getPostOpTips();

  return (
    <div className="space-y-6">
      <WelcomeCard
        isPreOp={isPreOp}
        procedureLabel={settings.procedureType ? procedureMetadata[settings.procedureType].title : undefined}
        weeksUntilSurgery={weeksUntilSurgery}
        recoveryWeek={recoveryWeek}
      />

      {isPreOp && isSetupComplete && (
        <SwitchToPostOpBanner onSwitch={handleSwitchToPostOp} />
      )}

      <Card className="p-6 border-primary/20">
        <div className="space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-lg font-medium text-foreground">{isPreOp ? "Surgery Readiness Score" : "Recovery Momentum Score"}</h3>
              <p className="text-sm text-muted-foreground">
                Built from intervention completion, daily movement progress, and profile setup quality.
              </p>
            </div>
            <Badge className="bg-primary text-primary-foreground text-base px-3 py-1">{readinessScore}%</Badge>
          </div>
          <Progress value={readinessScore} className="h-3" />
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="rounded-md bg-muted p-2">
              <p className="text-xs text-muted-foreground">Actions done</p>
              <p className="text-sm font-medium text-foreground">
                {completedInterventions}/{interventions.length}
              </p>
            </div>
            <div className="rounded-md bg-muted p-2">
              <p className="text-xs text-muted-foreground">Step progress</p>
              <p className="text-sm font-medium text-foreground">{Math.round(Math.min((todaySteps / Math.max(stepGoal, 1)) * 100, 100))}%</p>
            </div>
            <div className="rounded-md bg-muted p-2">
              <p className="text-xs text-muted-foreground">Profile setup</p>
              <p className="text-sm font-medium text-foreground">{completionPercentage}%</p>
            </div>
          </div>
        </div>
      </Card>
      
      <div>
        <h2 className="text-lg font-medium text-foreground mb-4 px-1">Today's Progress</h2>
        <StepCounter 
          steps={todaySteps} 
          goal={stepGoal}
          recoveryWeek={recoveryWeek}
          weeksUntilSurgery={weeksUntilSurgery}
          recoveryPhase={recoveryPhase}
          procedureType={settings.procedureType}
          rehabPhase={settings.rehabPhase}
          onOpenSettings={() => setSetupOpen(true)}
          onSetSteps={setTodaySteps}
          onAddSteps={addSteps}
        />
      </div>

      <WeightTrackerCard summary={weightSummary} onLogWeight={logWeight} />

      <div>
        <h2 className="text-lg font-medium text-foreground mb-4 px-1">Priority Actions This Week</h2>
        <div className="space-y-3">
          {topInterventions.map((intervention) => (
            <Card key={intervention.id} className="p-4">
              <div className="flex items-start gap-3">
                <Checkbox
                  checked={Boolean(progress[intervention.id])}
                  onCheckedChange={(checked) => toggleIntervention(intervention.id)}
                  className="mt-1"
                />
                <div className="space-y-1 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-sm font-medium text-foreground">{intervention.title}</p>
                    <Badge variant="secondary" className="text-xs">
                      {intervention.timeframe}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{intervention.summary}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-lg font-medium text-foreground mb-4 px-1">
          {isPreOp ? "Prehabilitation Tips" : recoveryWeek && recoveryWeek <= 2 ? "Early Recovery Tips" : "Tips for Today"}
        </h2>
        <div className="space-y-4">
          {tips.map((tip, index) => (
            <QuickTipCard
              key={index}
              icon={tip.icon}
              title={tip.title}
              description={tip.description}
            />
          ))}
        </div>
      </div>

      <OptimizationProfileCard
        profile={profile}
        completionPercentage={completionPercentage}
        onProfileChange={updateProfile}
      />

      <div>
        <h2 className="text-lg font-medium text-foreground mb-4 px-1">Gentle Reminders</h2>
        <div className="space-y-4">
          <ReminderToggleCard
            icon={Activity}
            title={isPreOp ? "Exercise Reminder" : "Ankle Pumps"}
            description={isPreOp ? "Daily reminder to complete your strengthening exercises" : "Reminder every 2 hours to perform ankle pump exercises"}
            enabled={ankleReminder}
            onToggle={(enabled) => {
              setAnkleReminder(enabled);
            }}
          />
          {!isPreOp && (
            <ReminderToggleCard
              icon={ArrowUp}
              title="Elevation Breaks"
              description="Reminder to elevate your leg for 20 minutes, 3 times daily"
              enabled={elevationReminder}
              onToggle={(enabled) => {
                setElevationReminder(enabled);
              }}
            />
          )}
          <ReminderToggleCard
            icon={TrendingUp}
            title="Daily Step Goal"
            description={isPreOp ? "Evening reminder to reach your prehab step target" : "Evening reminder if you haven't reached your step target"}
            enabled={stepReminder}
            onToggle={(enabled) => {
              setStepReminder(enabled);
            }}
          />
        </div>
      </div>

      <SetupModal
        open={setupOpen}
        onOpenChange={setSetupOpen}
        procedureType={settings.procedureType}
        surgeryDate={settings.surgeryDate}
        rehabPhase={settings.rehabPhase}
        onSave={handleSaveSettings}
      />
    </div>
  );
}
