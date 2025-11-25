import { useState } from "react";
import ProcedureToggle from "@/components/ProcedureToggle";
import ContentAccordion from "@/components/ContentAccordion";
import PreOpChecklistCard from "@/components/PreOpChecklistCard";
import { usePreOpChecklist } from "@/hooks/usePreOpChecklist";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Cigarette, 
  Droplets, 
  Dumbbell, 
  Scale, 
  GlassWater,
  CheckCircle2,
  TrendingDown
} from "lucide-react";

const hipAdditionalSections = [
  {
    id: 'hip-preparation',
    title: 'Preparing Your Home',
    content: 'Arrange furniture to create clear walking paths. Install grab rails in bathroom if possible. Move frequently used items to waist height. Consider a raised toilet seat and shower chair. Arrange help for first 2 weeks post-surgery.',
  },
  {
    id: 'hip-dvt',
    title: 'Understanding DVT Prevention',
    badge: 'NICE',
    content: 'Deep vein thrombosis (DVT) is a blood clot risk after surgery. Prevention includes anticoagulant medication, compression stockings, and early mobilisation. You will perform ankle pumps every hour whilst awake. Report any calf pain, swelling, or breathing difficulties immediately.',
  },
];

const kneeAdditionalSections = [
  {
    id: 'knee-preparation',
    title: 'Preparing Your Home',
    content: 'Arrange furniture to create clear walking paths. Install grab rails in bathroom if possible. Move frequently used items to waist height. Consider a raised toilet seat. Remove trip hazards like loose rugs. Arrange help for first 2 weeks post-surgery.',
  },
  {
    id: 'knee-dvt',
    title: 'Understanding DVT Prevention',
    badge: 'NICE',
    content: 'Deep vein thrombosis (DVT) is a blood clot risk after surgery. Prevention includes anticoagulant medication, compression stockings, and early mobilisation. You will perform ankle pumps every hour whilst awake. Report any calf pain, swelling, or breathing difficulties immediately.',
  },
];

export default function PreOp() {
  const [procedure, setProcedure] = useState<"hip" | "knee">("hip");
  const { checklist, toggleItem, completedCount, totalCount } = usePreOpChecklist();

  const progressPercentage = (completedCount / totalCount) * 100;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-medium text-foreground mb-2">Pre-Operative Preparation</h1>
        <p className="text-base text-muted-foreground leading-relaxed mb-6">
          Your 5 highest-impact actions. Do these 4–6 weeks before surgery to give yourself the fastest, safest recovery.
        </p>
        <ProcedureToggle selected={procedure} onSelect={setProcedure} />
      </div>

      <Card className="p-6 bg-primary/5 border-primary/20">
        <div className="flex items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-6 h-6 text-primary" />
            <div>
              <h3 className="text-lg font-medium text-foreground">Your Progress</h3>
              <p className="text-sm text-muted-foreground">
                {completedCount} of {totalCount} actions started
              </p>
            </div>
          </div>
          {completedCount >= 4 && (
            <Badge className="bg-accent text-accent-foreground">
              <TrendingDown className="w-3 h-3 mr-1" />
              Up to 70% lower risk
            </Badge>
          )}
        </div>
        <Progress value={progressPercentage} className="h-3" />
        <p className="text-sm text-muted-foreground mt-3">
          Completing 4 or 5 of these can reduce your risk of complications by up to 70%.
        </p>
      </Card>

      <div className="space-y-4">
        <PreOpChecklistCard
          icon={Cigarette}
          title="Stop smoking now (aim for at least 4 weeks)"
          description="Ask your GP or pharmacist about free NHS stop-smoking support. The earlier you stop, the better your body can heal."
          statistic="50%"
          statisticLabel="lower risk of infection and lung complications"
          checked={checklist.stoppedSmoking}
          onToggle={() => toggleItem('stoppedSmoking')}
          testId="checklist-smoking"
        />

        <PreOpChecklistCard
          icon={Droplets}
          title="Get your blood sugar under control (if diabetic)"
          description="Target HbA1c below 69 mmol/mol (8.5%). Book a quick GP review to optimise your levels before surgery."
          statistic="~30%"
          statisticLabel="reduction in infection risk with improved control"
          checked={checklist.bloodSugarSorted}
          onToggle={() => toggleItem('bloodSugarSorted')}
          testId="checklist-blood-sugar"
        />

        <PreOpChecklistCard
          icon={Dumbbell}
          title="Strengthen your arms, shoulders and core daily"
          description="10–15 minutes of seated exercises (arm raises, resistance-band rows, heel slides). Makes crutches/walker easy and lets you walk the same day as surgery."
          statistic="1 day"
          statisticLabel="shorter hospital stay on average"
          checked={checklist.dailyExercises}
          onToggle={() => toggleItem('dailyExercises')}
          testId="checklist-exercises"
        />

        <PreOpChecklistCard
          icon={Scale}
          title="Lose 5–10% of body weight if your BMI is over 40"
          description="Even a few kilos in 6 weeks makes a big difference. Every 5 kg lost significantly reduces wound problems and clot risk."
          statistic="25–35%"
          statisticLabel="lower wound and clot risk per 5 kg lost"
          checked={checklist.weightProgress}
          onToggle={() => toggleItem('weightProgress')}
          testId="checklist-weight"
        />

        <PreOpChecklistCard
          icon={GlassWater}
          title="Pre-op drinks before surgery"
          description="Your hospital team will give you some special pre-op drinks for before surgery. Evidence shows that drinking them can get you home from hospital half a day quicker on average."
          statistic="½ day"
          statisticLabel="faster discharge from hospital"
          checked={checklist.carbDrinksReady}
          onToggle={() => toggleItem('carbDrinksReady')}
          testId="checklist-carb-drinks"
        />
      </div>

      <div>
        <h2 className="text-lg font-medium text-foreground mb-4 px-1">Additional Preparation</h2>
        <ContentAccordion sections={procedure === "hip" ? hipAdditionalSections : kneeAdditionalSections} />
      </div>
    </div>
  );
}
