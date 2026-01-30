import { memo } from "react";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { LucideIcon } from "lucide-react";

interface PreOpChecklistCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  statistic: string;
  statisticLabel: string;
  checked: boolean;
  onToggle: () => void;
  testId: string;
}

export default memo(function PreOpChecklistCard({
  icon: Icon,
  title,
  description,
  statistic,
  statisticLabel,
  checked,
  onToggle,
  testId,
}: PreOpChecklistCardProps) {
  return (
    <Card
      className={`p-6 cursor-pointer transition-colors ${checked ? 'bg-primary/5 border-primary/30' : 'hover-elevate'}`}
      onClick={onToggle}
      role="checkbox"
      aria-checked={checked}
      aria-label={title}
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); onToggle(); } }}
      data-testid={testId}
    >
      <div className="flex gap-4">
        <div className="flex items-start pt-1">
          <Checkbox
            checked={checked}
            onCheckedChange={onToggle}
            className="w-6 h-6"
            tabIndex={-1}
            data-testid={`${testId}-checkbox`}
          />
        </div>
        <div className="flex-1 space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Icon className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className={`text-lg font-medium ${checked ? 'text-primary' : 'text-foreground'}`}>
                {title}
              </h3>
            </div>
          </div>
          <p className="text-base text-foreground leading-relaxed">{description}</p>
          <div className="flex items-center gap-2 pt-1">
            <Badge variant="secondary" className="text-sm font-medium px-3 py-1">
              {statistic}
            </Badge>
            <span className="text-sm text-muted-foreground">{statisticLabel}</span>
          </div>
        </div>
      </div>
    </Card>
  );
});
