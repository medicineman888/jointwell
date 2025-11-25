import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { Activity } from "lucide-react";

interface StepCounterProps {
  steps: number;
  goal: number;
  onRequestPermission?: () => void;
  permissionGranted?: boolean;
}

export default function StepCounter({ steps, goal, onRequestPermission, permissionGranted = false }: StepCounterProps) {
  const percentage = Math.min((steps / goal) * 100, 100);

  return (
    <Card className="p-8">
      <div className="flex flex-col items-center space-y-6">
        <div className="relative w-48 h-48 flex items-center justify-center">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 200 200">
            <circle
              cx="100"
              cy="100"
              r="85"
              fill="none"
              stroke="hsl(var(--muted))"
              strokeWidth="12"
            />
            <circle
              cx="100"
              cy="100"
              r="85"
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth="12"
              strokeDasharray={`${2 * Math.PI * 85}`}
              strokeDashoffset={`${2 * Math.PI * 85 * (1 - percentage / 100)}`}
              strokeLinecap="round"
              className="transition-all duration-500"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-4xl font-bold text-foreground">{steps.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">of {goal.toLocaleString()} steps</div>
          </div>
        </div>
        
        {!permissionGranted && (
          <button 
            onClick={onRequestPermission}
            data-testid="button-request-step-tracking"
            className="flex items-center gap-2 text-sm text-primary hover:underline"
          >
            <Activity className="w-4 h-4" />
            Enable step tracking
          </button>
        )}
        
        {permissionGranted && (
          <div className="text-center">
            <div className="text-lg font-medium text-foreground">{percentage.toFixed(0)}% of daily goal</div>
            <p className="text-sm text-muted-foreground mt-1">
              {steps < goal ? `${(goal - steps).toLocaleString()} steps to go` : "Goal achieved!"}
            </p>
          </div>
        )}
      </div>
    </Card>
  );
}
