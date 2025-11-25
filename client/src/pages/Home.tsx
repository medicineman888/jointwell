import { useState } from "react";
import WelcomeCard from "@/components/WelcomeCard";
import StepCounter from "@/components/StepCounter";
import QuickTipCard from "@/components/QuickTipCard";
import ReminderToggleCard from "@/components/ReminderToggleCard";
import { Droplets, ArrowUp, Activity, TrendingUp } from "lucide-react";

export default function Home() {
  const [ankleReminder, setAnkleReminder] = useState(true);
  const [elevationReminder, setElevationReminder] = useState(false);
  const [stepReminder, setStepReminder] = useState(true);
  const [steps, setSteps] = useState(1847);
  const [permissionGranted, setPermissionGranted] = useState(true);

  const handleRequestPermission = () => {
    console.log('Step tracking permission requested');
    setPermissionGranted(true);
  };

  return (
    <div className="space-y-6">
      <WelcomeCard />
      
      <div>
        <h2 className="text-lg font-medium text-foreground mb-4 px-1">Today's Progress</h2>
        <StepCounter 
          steps={steps} 
          goal={3000} 
          permissionGranted={permissionGranted}
          onRequestPermission={handleRequestPermission}
        />
      </div>

      <div>
        <h2 className="text-lg font-medium text-foreground mb-4 px-1">Quick Tips for Today</h2>
        <div className="space-y-4">
          <QuickTipCard
            icon={Droplets}
            title="Stay Hydrated"
            description="Drink plenty of water throughout the day to support healing and reduce swelling."
          />
          <QuickTipCard
            icon={ArrowUp}
            title="Elevate Your Leg"
            description="Keep your leg elevated when resting to minimise swelling and promote circulation."
          />
          <QuickTipCard
            icon={Activity}
            title="Gentle Movement"
            description="Perform ankle pumps regularly to prevent blood clots and maintain circulation."
          />
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
    </div>
  );
}
