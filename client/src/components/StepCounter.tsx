import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Activity, Settings, TrendingUp, AlertCircle, Clock } from "lucide-react";

interface StepCounterProps {
  steps: number;
  goal: number;
  recoveryWeek: number | null;
  weeksUntilSurgery: number | null;
  recoveryPhase: { name: string; description: string } | null;
  procedureType: "hip" | "knee" | null;
  rehabPhase: "pre-op" | "post-op";
  onOpenSettings: () => void;
  onRequestPermission?: () => void;
  permissionGranted?: boolean;
}

export default function StepCounter({ 
  steps, 
  goal, 
  recoveryWeek,
  weeksUntilSurgery,
  recoveryPhase,
  procedureType,
  rehabPhase,
  onOpenSettings,
  onRequestPermission, 
  permissionGranted = false 
}: StepCounterProps) {
  const percentage = Math.min((steps / goal) * 100, 100);
  const isOverGoal = steps > goal;
  const isNearLimit = steps > goal * 0.9 && steps <= goal;

  const isPreOp = rehabPhase === "pre-op";
  const primaryColor = isPreOp ? "hsl(var(--accent))" : "hsl(var(--primary))";

  return (
    <Card className="p-6">
      <div className="flex flex-col items-center space-y-6">
        {procedureType && recoveryPhase && (
          <div className="w-full text-center bg-muted rounded-lg p-4 mb-2">
            <div className="flex items-center justify-center gap-2 mb-1">
              {isPreOp ? (
                <Clock className="w-4 h-4 text-accent" />
              ) : (
                <TrendingUp className="w-4 h-4 text-primary" />
              )}
              <span className="text-sm font-medium text-foreground">
                {isPreOp ? (
                  weeksUntilSurgery !== null && weeksUntilSurgery > 0 
                    ? `${weeksUntilSurgery} week${weeksUntilSurgery !== 1 ? 's' : ''} to go`
                    : "Getting ready"
                ) : (
                  `Week ${recoveryWeek} – ${recoveryPhase.name}`
                )}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">{recoveryPhase.description}</p>
          </div>
        )}

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
              stroke={isOverGoal && !isPreOp ? "hsl(var(--destructive))" : primaryColor}
              strokeWidth="12"
              strokeDasharray={`${2 * Math.PI * 85}`}
              strokeDashoffset={`${2 * Math.PI * 85 * (1 - Math.min(percentage, 100) / 100)}`}
              strokeLinecap="round"
              className="transition-all duration-500"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className={`text-4xl font-bold ${isOverGoal && !isPreOp ? 'text-destructive' : 'text-foreground'}`}>
              {steps.toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground">of {goal.toLocaleString()} steps</div>
          </div>
        </div>

        {isOverGoal && !isPreOp && (
          <div className="flex items-start gap-3 bg-destructive/10 border border-destructive/20 rounded-lg p-4 w-full">
            <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-foreground">You've gone past today's goal</p>
              <p className="text-xs text-muted-foreground">
                Time to put your feet up. Overdoing it can make swelling worse and slow things down.
              </p>
            </div>
          </div>
        )}

        {isOverGoal && isPreOp && (
          <div className="flex items-start gap-3 bg-accent/10 border border-accent/20 rounded-lg p-4 w-full">
            <Activity className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-foreground">Brilliant effort!</p>
              <p className="text-xs text-muted-foreground">
                You're doing great building up your fitness. Just listen to your body and rest if you need to.
              </p>
            </div>
          </div>
        )}

        {isNearLimit && !isOverGoal && (
          <div className="flex items-start gap-3 bg-accent/10 border border-accent/20 rounded-lg p-4 w-full">
            <AlertCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-foreground">Nearly there!</p>
              <p className="text-xs text-muted-foreground">
                {isPreOp 
                  ? "You're building great fitness for your surgery – well done!" 
                  : "You're doing brilliantly. Remember to put your leg up and ice it after a walk."
                }
              </p>
            </div>
          </div>
        )}
        
        {!permissionGranted && (
          <button 
            onClick={onRequestPermission}
            data-testid="button-request-step-tracking"
            className="flex items-center gap-2 text-sm text-primary hover:underline"
          >
            <Activity className="w-4 h-4" />
            Turn on step counting
          </button>
        )}
        
        {permissionGranted && !isOverGoal && !isNearLimit && (
          <div className="text-center">
            <div className="text-lg font-medium text-foreground">{percentage.toFixed(0)}% of today's goal</div>
            <p className="text-sm text-muted-foreground mt-1">
              {steps < goal ? `${(goal - steps).toLocaleString()} steps to go` : "Goal reached!"}
            </p>
          </div>
        )}

        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onOpenSettings}
          className="text-muted-foreground"
          data-testid="button-open-settings"
        >
          <Settings className="w-4 h-4 mr-2" />
          {procedureType ? "Change your details" : "Set up your details"}
        </Button>
      </div>
    </Card>
  );
}
