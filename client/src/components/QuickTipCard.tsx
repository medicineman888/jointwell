import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface QuickTipCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export default function QuickTipCard({ icon: Icon, title, description }: QuickTipCardProps) {
  return (
    <Card className="p-6 hover-elevate cursor-pointer" data-testid={`card-tip-${title.toLowerCase().replace(/\s+/g, '-')}`}>
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
          <Icon className="w-5 h-5 text-accent" />
        </div>
        <div className="space-y-1 flex-1">
          <h3 className="text-lg font-medium text-foreground">{title}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
        </div>
      </div>
    </Card>
  );
}
