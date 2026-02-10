import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import logoImage from "@assets/JointWell Logo Mk1_1764104757072.png";

interface WelcomeCardProps {
  isPreOp: boolean;
  procedureLabel?: string;
  weeksUntilSurgery: number | null;
  recoveryWeek: number | null;
}

export default function WelcomeCard({
  isPreOp,
  procedureLabel,
  weeksUntilSurgery,
  recoveryWeek,
}: WelcomeCardProps) {
  const phaseSummary = isPreOp
    ? weeksUntilSurgery !== null
      ? `${weeksUntilSurgery} week${weeksUntilSurgery === 1 ? "" : "s"} until surgery`
      : "Waiting list preparation"
    : recoveryWeek !== null
      ? `Recovery week ${recoveryWeek}`
      : "Post-op recovery mode";

  return (
    <Card className="p-6 bg-gradient-to-br from-card via-card to-primary/5 border-primary/20">
      <div className="flex items-start justify-between gap-4">
        <img 
          src={logoImage} 
          alt="JointWell" 
          className="w-14 h-14 rounded-full flex-shrink-0"
        />
        <div className="space-y-2 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-2xl font-medium text-foreground">JointWell</h2>
            <Badge variant="secondary">Evidence-led</Badge>
            {procedureLabel && <Badge variant="outline">{procedureLabel}</Badge>}
          </div>
          <p className="text-base text-foreground leading-relaxed">
            Your perioperative coach from waiting list to rehabilitation. Focus on a small number of high-impact actions to improve outcomes after joint replacement.
          </p>
          <p className="text-sm text-muted-foreground">{phaseSummary}</p>
        </div>
      </div>
    </Card>
  );
}
