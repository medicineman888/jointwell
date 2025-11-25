import { useState } from 'react';
import ReminderToggleCard from '../ReminderToggleCard';
import { Activity, ArrowUp, TrendingUp } from 'lucide-react';

export default function ReminderToggleCardExample() {
  const [ankleEnabled, setAnkleEnabled] = useState(true);
  const [elevationEnabled, setElevationEnabled] = useState(false);
  const [stepsEnabled, setStepsEnabled] = useState(true);

  return (
    <div className="p-4 space-y-4">
      <ReminderToggleCard
        icon={Activity}
        title="Ankle Pumps"
        description="Reminder every 2 hours to perform ankle pump exercises"
        enabled={ankleEnabled}
        onToggle={setAnkleEnabled}
      />
      <ReminderToggleCard
        icon={ArrowUp}
        title="Elevation Breaks"
        description="Reminder to elevate your leg for 20 minutes, 3 times daily"
        enabled={elevationEnabled}
        onToggle={setElevationEnabled}
      />
      <ReminderToggleCard
        icon={TrendingUp}
        title="Daily Step Goal"
        description="Evening reminder if you haven't reached your step target"
        enabled={stepsEnabled}
        onToggle={setStepsEnabled}
      />
    </div>
  );
}
