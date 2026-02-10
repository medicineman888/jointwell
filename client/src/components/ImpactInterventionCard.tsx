import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import type { EvidenceCitation, InterventionDefinition } from "@/data/clinicalProgram";
import { CheckCircle2, FlaskConical } from "lucide-react";

interface ImpactInterventionCardProps {
  intervention: InterventionDefinition;
  completed: boolean;
  evidence: EvidenceCitation[];
  onToggle: (nextValue: boolean) => void;
}

export default function ImpactInterventionCard({
  intervention,
  completed,
  evidence,
  onToggle,
}: ImpactInterventionCardProps) {
  return (
    <Card
      className={`p-6 cursor-pointer transition-all ${completed ? "bg-accent/5 border-accent/30" : "hover-elevate"}`}
      onClick={() => onToggle(!completed)}
      data-testid={`intervention-${intervention.id}`}
    >
      <div className="space-y-4">
        <div className="flex items-start gap-4">
          <div className="pt-1" onClick={(event) => event.stopPropagation()}>
            <Checkbox
              checked={completed}
              onCheckedChange={(checked) => onToggle(Boolean(checked))}
              className="w-6 h-6"
              data-testid={`intervention-${intervention.id}-checkbox`}
            />
          </div>

          <div className="flex-1 space-y-3">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className={`text-lg font-medium ${completed ? "text-accent" : "text-foreground"}`}>{intervention.title}</h3>
              <Badge variant="secondary">{intervention.timeframe}</Badge>
            </div>

            <p className="text-base text-foreground leading-relaxed">{intervention.summary}</p>
            <p className="text-sm font-medium text-primary">{intervention.impactStatement}</p>
          </div>
        </div>

        <div className="pl-10 space-y-2">
          {intervention.actions.map((action) => (
            <div key={action} className="flex items-start gap-2 text-sm text-foreground">
              <CheckCircle2 className="w-4 h-4 mt-0.5 text-accent flex-shrink-0" />
              <span>{action}</span>
            </div>
          ))}
        </div>

        <div className="pl-10">
          <details onClick={(event) => event.stopPropagation()} className="group">
            <summary className="list-none cursor-pointer flex items-center gap-2 text-sm text-muted-foreground">
              <FlaskConical className="w-4 h-4" />
              <span className="underline decoration-dotted">View supporting evidence</span>
            </summary>
            <div className="mt-3 space-y-3">
              {evidence.map((citation) => (
                <div key={citation.id} className="rounded-md border border-border bg-muted/40 p-3">
                  <div className="flex flex-wrap gap-2 mb-1">
                    <Badge variant="secondary">{citation.shortLabel}</Badge>
                    <Badge variant="outline">{citation.quality}</Badge>
                  </div>
                  <p className="text-sm text-foreground leading-relaxed">{citation.title}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {citation.journal} ({citation.year})
                    {citation.pmid ? ` • PMID ${citation.pmid}` : ""}
                  </p>
                </div>
              ))}
            </div>
          </details>
        </div>
      </div>
    </Card>
  );
}
