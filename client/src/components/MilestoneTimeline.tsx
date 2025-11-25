import { Card } from "@/components/ui/card";
import { CheckCircle2, Circle } from "lucide-react";

interface Milestone {
  week: string;
  title: string;
  description: string;
  completed?: boolean;
}

interface MilestoneTimelineProps {
  milestones: Milestone[];
}

export default function MilestoneTimeline({ milestones }: MilestoneTimelineProps) {
  return (
    <div className="space-y-4">
      {milestones.map((milestone, index) => (
        <Card key={index} className="p-6" data-testid={`milestone-${index}`}>
          <div className="flex gap-4">
            <div className="flex flex-col items-center">
              {milestone.completed ? (
                <CheckCircle2 className="w-8 h-8 text-accent flex-shrink-0" />
              ) : (
                <Circle className="w-8 h-8 text-muted-foreground flex-shrink-0" />
              )}
              {index < milestones.length - 1 && (
                <div className="w-0.5 h-12 bg-border mt-2" />
              )}
            </div>
            <div className="flex-1 space-y-2 pb-4">
              <div className="flex items-baseline gap-3">
                <span className="text-sm font-medium text-muted-foreground">{milestone.week}</span>
                <h3 className="text-lg font-medium text-foreground">{milestone.title}</h3>
              </div>
              <p className="text-base text-muted-foreground leading-relaxed">
                {milestone.description}
              </p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
