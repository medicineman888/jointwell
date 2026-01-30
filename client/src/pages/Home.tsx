import { useState, useMemo, useCallback } from "react";
import WelcomeCard from "@/components/WelcomeCard";
import StepCounter from "@/components/StepCounter";
import QuickTipCard from "@/components/QuickTipCard";
import ReminderToggleCard from "@/components/ReminderToggleCard";
import SetupModal from "@/components/SetupModal";
import SwitchToPostOpBanner from "@/components/SwitchToPostOpBanner";
import { useUserSettings } from "@/hooks/useUserSettings";
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

  const [ankleReminder, setAnkleReminder] = useState(true);
  const [elevationReminder, setElevationReminder] = useState(false);
  const [stepReminder, setStepReminder] = useState(true);
  const [steps] = useState(1847);
  const [permissionGranted, setPermissionGranted] = useState(true);
  const [setupOpen, setSetupOpen] = useState(!isSetupComplete);

  const handleRequestPermission = useCallback(() => {
    setPermissionGranted(true);
  }, []);

  const handleSaveSettings = useCallback((procedureType: "hip" | "knee", surgeryDate: string | null, rehabPhase: "pre-op" | "post-op") => {
    updateSettings({ procedureType, surgeryDate, rehabPhase });
  }, [updateSettings]);

  const handleSwitchToPostOp = useCallback((surgeryDate: string) => {
    switchToPostOp(surgeryDate);
  }, [switchToPostOp]);

  const handleOpenSettings = useCallback(() => setSetupOpen(true), []);

  const handleAnkleToggle = useCallback((enabled: boolean) => {
    setAnkleReminder(enabled);
  }, []);

  const handleElevationToggle = useCallback((enabled: boolean) => {
    setElevationReminder(enabled);
  }, []);

  const handleStepToggle = useCallback((enabled: boolean) => {
    setStepReminder(enabled);
  }, []);

  const recoveryWeek = getRecoveryWeek();
  const weeksUntilSurgery = getWeeksUntilSurgery();
  const stepGoal = getStepGoal();
  const recoveryPhase = getRecoveryPhase();
  const isPreOp = settings.rehabPhase === "pre-op";

  const tips = useMemo(() => {
    if (isPreOp) {
      const weeksUntil = getWeeksUntilSurgery();
      if (weeksUntil !== null && weeksUntil <= 1) {
        return [
          { icon: Heart, title: "Rest Before Surgery", description: "Take it easy this week. Light walks and gentle stretching only." },
          { icon: Droplets, title: "Stay Hydrated", description: "Drink plenty of water to ensure you're well hydrated for surgery." },
          { icon: Activity, title: "Practice Ankle Pumps", description: "You'll need to do these after surgery to prevent blood clots." },
        ];
      }
      return [
        { icon: Dumbbell, title: "Strengthen Your Muscles", description: "Perform your prescribed exercises daily to build strength for faster recovery." },
        { icon: TrendingUp, title: "Build Cardiovascular Fitness", description: "Regular walking helps prepare your body for surgery and recovery." },
        { icon: Heart, title: "Optimise Your Health", description: "Eat well, maintain a healthy weight, and stop smoking if applicable." },
      ];
    }

    if (recoveryWeek && recoveryWeek <= 2) {
      return [
        { icon: Droplets, title: "Ice Regularly", description: "Apply ice wrapped in a towel for 15-20 minutes, 3-4 times daily to reduce swelling." },
        { icon: ArrowUp, title: "Elevate Above Heart", description: "Keep your leg elevated above heart level as much as possible to minimise swelling." },
        { icon: Activity, title: "Ankle Pumps Hourly", description: "Perform ankle pumps every hour whilst awake to prevent blood clots." },
      ];
    }
    if (recoveryWeek && recoveryWeek <= 6) {
      return [
        { icon: Droplets, title: "Stay Hydrated", description: "Drink plenty of water to support healing and reduce swelling." },
        { icon: ArrowUp, title: "Elevate After Activity", description: "Rest with your leg elevated for 20 minutes after walking sessions." },
        { icon: Activity, title: "Gentle Movement", description: "Continue ankle pumps and prescribed exercises 2-3 times daily." },
      ];
    }
    return [
      { icon: Droplets, title: "Stay Hydrated", description: "Drink plenty of water throughout the day to support ongoing healing." },
      { icon: ArrowUp, title: "Monitor Swelling", description: "If swelling increases after activity, reduce intensity and elevate your leg." },
      { icon: Activity, title: "Build Gradually", description: "Increase walking distance slowly. Listen to your body and rest when needed." },
    ];
  }, [isPreOp, recoveryWeek, getWeeksUntilSurgery]);

  return (
    <div className="space-y-6">
      <WelcomeCard />

      {isPreOp && isSetupComplete && (
        <SwitchToPostOpBanner onSwitch={handleSwitchToPostOp} />
      )}

      <div>
        <h2 className="text-lg font-medium text-foreground mb-4 px-1">Today's Progress</h2>
        <StepCounter
          steps={steps}
          goal={stepGoal}
          recoveryWeek={recoveryWeek}
          weeksUntilSurgery={weeksUntilSurgery}
          recoveryPhase={recoveryPhase}
          procedureType={settings.procedureType}
          rehabPhase={settings.rehabPhase}
          onOpenSettings={handleOpenSettings}
          permissionGranted={permissionGranted}
          onRequestPermission={handleRequestPermission}
        />
      </div>

      <div>
        <h2 className="text-lg font-medium text-foreground mb-4 px-1">
          {isPreOp ? "Prehabilitation Tips" : recoveryWeek && recoveryWeek <= 2 ? "Early Recovery Tips" : "Tips for Today"}
        </h2>
        <div className="space-y-4">
          {tips.map((tip) => (
            <QuickTipCard
              key={tip.title}
              icon={tip.icon}
              title={tip.title}
              description={tip.description}
            />
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-lg font-medium text-foreground mb-4 px-1">Gentle Reminders</h2>
        <div className="space-y-4">
          <ReminderToggleCard
            icon={Activity}
            title={isPreOp ? "Exercise Reminder" : "Ankle Pumps"}
            description={isPreOp ? "Daily reminder to complete your strengthening exercises" : "Reminder every 2 hours to perform ankle pump exercises"}
            enabled={ankleReminder}
            onToggle={handleAnkleToggle}
          />
          {!isPreOp && (
            <ReminderToggleCard
              icon={ArrowUp}
              title="Elevation Breaks"
              description="Reminder to elevate your leg for 20 minutes, 3 times daily"
              enabled={elevationReminder}
              onToggle={handleElevationToggle}
            />
          )}
          <ReminderToggleCard
            icon={TrendingUp}
            title="Daily Step Goal"
            description={isPreOp ? "Evening reminder to reach your prehab step target" : "Evening reminder if you haven't reached your step target"}
            enabled={stepReminder}
            onToggle={handleStepToggle}
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
