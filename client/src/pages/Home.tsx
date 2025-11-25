import { useState } from "react";
import WelcomeCard from "@/components/WelcomeCard";
import StepCounter from "@/components/StepCounter";
import QuickTipCard from "@/components/QuickTipCard";
import ReminderToggleCard from "@/components/ReminderToggleCard";
import SetupModal from "@/components/SetupModal";
import { useUserSettings } from "@/hooks/useUserSettings";
import { Droplets, ArrowUp, Activity, TrendingUp } from "lucide-react";

export default function Home() {
  const { settings, updateSettings, getRecoveryWeek, getStepGoal, getRecoveryPhase, isSetupComplete } = useUserSettings();
  
  const [ankleReminder, setAnkleReminder] = useState(true);
  const [elevationReminder, setElevationReminder] = useState(false);
  const [stepReminder, setStepReminder] = useState(true);
  const [steps, setSteps] = useState(1847);
  const [permissionGranted, setPermissionGranted] = useState(true);
  const [setupOpen, setSetupOpen] = useState(!isSetupComplete);

  const handleRequestPermission = () => {
    console.log('Step tracking permission requested');
    setPermissionGranted(true);
  };

  const handleSaveSettings = (procedureType: "hip" | "knee", surgeryDate: string) => {
    updateSettings({ procedureType, surgeryDate });
  };

  const recoveryWeek = getRecoveryWeek();
  const stepGoal = getStepGoal();
  const recoveryPhase = getRecoveryPhase();

  const getTipsForPhase = () => {
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
        title: "Build Gradually",
        description: "Increase walking distance slowly. Listen to your body and rest when needed.",
      },
    ];
  };

  const tips = getTipsForPhase();

  return (
    <div className="space-y-6">
      <WelcomeCard />
      
      <div>
        <h2 className="text-lg font-medium text-foreground mb-4 px-1">Today's Progress</h2>
        <StepCounter 
          steps={steps} 
          goal={stepGoal}
          recoveryWeek={recoveryWeek}
          recoveryPhase={recoveryPhase}
          procedureType={settings.procedureType}
          onOpenSettings={() => setSetupOpen(true)}
          permissionGranted={permissionGranted}
          onRequestPermission={handleRequestPermission}
        />
      </div>

      <div>
        <h2 className="text-lg font-medium text-foreground mb-4 px-1">
          {recoveryWeek && recoveryWeek <= 2 ? "Early Recovery Tips" : "Tips for Today"}
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

      <div>
        <h2 className="text-lg font-medium text-foreground mb-4 px-1">Gentle Reminders</h2>
        <div className="space-y-4">
          <ReminderToggleCard
            icon={Activity}
            title="Ankle Pumps"
            description="Reminder every 2 hours to perform ankle pump exercises"
            enabled={ankleReminder}
            onToggle={(enabled) => {
              console.log('Ankle pumps reminder:', enabled);
              setAnkleReminder(enabled);
            }}
          />
          <ReminderToggleCard
            icon={ArrowUp}
            title="Elevation Breaks"
            description="Reminder to elevate your leg for 20 minutes, 3 times daily"
            enabled={elevationReminder}
            onToggle={(enabled) => {
              console.log('Elevation reminder:', enabled);
              setElevationReminder(enabled);
            }}
          />
          <ReminderToggleCard
            icon={TrendingUp}
            title="Daily Step Goal"
            description="Evening reminder if you haven't reached your step target"
            enabled={stepReminder}
            onToggle={(enabled) => {
              console.log('Step goal reminder:', enabled);
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
        onSave={handleSaveSettings}
      />
    </div>
  );
}
