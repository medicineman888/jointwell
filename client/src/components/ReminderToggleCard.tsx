import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { LucideIcon } from "lucide-react";

interface ReminderToggleCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  enabled: boolean;
  onToggle: (enabled: boolean) => void;
}

export default function ReminderToggleCard({ 
  icon: Icon, 
  title, 
  description, 
  enabled, 
  onToggle 
}: ReminderToggleCardProps) {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-start gap-4 flex-1">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Icon className="w-5 h-5 text-primary" />
          </div>
          <div className="space-y-1 flex-1">
            <h3 className="text-base font-medium text-foreground">{title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
          </div>
        </div>
        <Switch 
          checked={enabled} 
          onCheckedChange={onToggle}
          data-testid={`toggle-reminder-${title.toLowerCase().replace(/\s+/g, '-')}`}
        />
      </div>
    </Card>
  );
}
