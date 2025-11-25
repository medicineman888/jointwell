import { useState } from "react";
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
  const [steps, setSteps] = useState(1847);
  const [permissionGranted, setPermissionGranted] = useState(true);
  const [setupOpen, setSetupOpen] = useState(!isSetupComplete);

  const handleRequestPermission = () => {
    console.log('Step tracking permission requested');
    setPermissionGranted(true);
  };

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

  const getPreOpTips = () => {
    const weeksUntil = getWeeksUntilSurgery();
    
    if (weeksUntil !== null && weeksUntil <= 1) {
      return [
        {
          icon: Heart,
          title: "Take it easy this week",
          description: "Light walks and gentle stretching only – save your energy for the big day.",
        },
        {
          icon: Droplets,
          title: "Drink plenty of water",
          description: "Being well hydrated helps your body cope better with surgery.",
        },
        {
          icon: Activity,
          title: "Practise your ankle pumps",
          description: "You'll be doing lots of these afterwards to keep your blood flowing – get the hang of them now.",
        },
      ];
    }

    return [
      {
        icon: Dumbbell,
        title: "Do your exercises daily",
        description: "The stronger you are going in, the quicker you'll bounce back afterwards.",
      },
      {
        icon: TrendingUp,
        title: "Keep walking",
        description: "Regular walks now will make a real difference to how fast you recover.",
      },
      {
        icon: Heart,
        title: "Look after yourself",
        description: "Eat well, stay a healthy weight, and if you smoke – now's the time to stop.",
      },
    ];
  };

  const getPostOpTips = () => {
    if (recoveryWeek && recoveryWeek <= 2) {
      return [
        {
          icon: Droplets,
          title: "Ice it regularly",
          description: "Wrap some ice in a towel and pop it on for 15-20 minutes, a few times a day. Really helps with swelling.",
        },
        {
          icon: ArrowUp,
          title: "Get that leg up",
          description: "Keep your leg raised above your heart as much as you can – it makes a big difference to the swelling.",
        },
        {
          icon: Activity,
          title: "Ankle pumps every hour",
          description: "Wiggle your foot up and down regularly while you're awake. Keeps the blood moving and helps prevent clots.",
        },
      ];
    }
    if (recoveryWeek && recoveryWeek <= 6) {
      return [
        {
          icon: Droplets,
          title: "Keep drinking water",
          description: "Staying hydrated helps your body heal and keeps swelling down.",
        },
        {
          icon: ArrowUp,
          title: "Put your feet up after a walk",
          description: "After you've been on your feet, rest with your leg elevated for 20 minutes or so.",
        },
        {
          icon: Activity,
          title: "Keep up your exercises",
          description: "Do your ankle pumps and the exercises your physio gave you – they really do help.",
        },
      ];
    }
    return [
      {
        icon: Droplets,
        title: "Stay hydrated",
        description: "Keep drinking plenty of water – your body's still healing even if you feel better.",
      },
      {
        icon: ArrowUp,
        title: "Watch for swelling",
        description: "If your leg swells up after being active, ease off a bit and put your feet up.",
      },
      {
        icon: Activity,
        title: "Build up gradually",
        description: "Increase your walking bit by bit. Listen to your body – if it hurts, rest.",
      },
    ];
  };

  const tips = isPreOp ? getPreOpTips() : getPostOpTips();

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
          onOpenSettings={() => setSetupOpen(true)}
          permissionGranted={permissionGranted}
          onRequestPermission={handleRequestPermission}
        />
      </div>

      <div>
        <h2 className="text-lg font-medium text-foreground mb-4 px-1">
          {isPreOp ? "Getting Ready" : recoveryWeek && recoveryWeek <= 2 ? "Early Days" : "Tips for Today"}
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
            title={isPreOp ? "Exercise reminder" : "Ankle pumps"}
            description={isPreOp ? "A nudge to do your strengthening exercises each day" : "A reminder every couple of hours to do your ankle pumps"}
            enabled={ankleReminder}
            onToggle={(enabled) => {
              console.log('Exercise/ankle pumps reminder:', enabled);
              setAnkleReminder(enabled);
            }}
          />
          {!isPreOp && (
            <ReminderToggleCard
              icon={ArrowUp}
              title="Elevation breaks"
              description="A prompt to put your leg up for 20 minutes, three times a day"
              enabled={elevationReminder}
              onToggle={(enabled) => {
                console.log('Elevation reminder:', enabled);
                setElevationReminder(enabled);
              }}
            />
          )}
          <ReminderToggleCard
            icon={TrendingUp}
            title="Step goal"
            description={isPreOp ? "An evening nudge if you haven't hit your walking target" : "A gentle reminder in the evening if you're short of your step goal"}
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
        rehabPhase={settings.rehabPhase}
        onSave={handleSaveSettings}
      />
    </div>
  );
}
