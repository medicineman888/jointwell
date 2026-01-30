import { memo } from "react";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { LucideIcon } from "lucide-react";

interface HomeReadyChecklistCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  checked: boolean;
  onToggle: () => void;
  testId: string;
}

export default memo(function HomeReadyChecklistCard({
  icon: Icon,
  title,
  description,
  checked,
  onToggle,
  testId,
}: HomeReadyChecklistCardProps) {
  return (
    <Card
      className={`p-5 cursor-pointer transition-colors ${checked ? 'bg-accent/5 border-accent/30' : 'hover-elevate'}`}
      onClick={onToggle}
      role="checkbox"
      aria-checked={checked}
      aria-label={title}
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); onToggle(); } }}
      data-testid={testId}
    >
      <div className="flex gap-4">
        <div className="flex items-start pt-0.5">
          <Checkbox
            checked={checked}
            onCheckedChange={onToggle}
            className="w-5 h-5"
            tabIndex={-1}
            data-testid={`${testId}-checkbox`}
          />
        </div>
        <div className="flex-1">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
              <Icon className="w-4 h-4 text-accent" />
            </div>
            <div className="flex-1 space-y-1">
              <h3 className={`text-base font-medium ${checked ? 'text-accent' : 'text-foreground'}`}>
                {title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
});
