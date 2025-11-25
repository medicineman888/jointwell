import QuickTipCard from '../QuickTipCard';
import { Droplets, ArrowUp, Activity } from 'lucide-react';

export default function QuickTipCardExample() {
  return (
    <div className="p-4 space-y-4">
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
  );
}
