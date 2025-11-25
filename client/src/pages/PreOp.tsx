import { useState } from "react";
import ProcedureToggle from "@/components/ProcedureToggle";
import ContentAccordion from "@/components/ContentAccordion";
import PreOpChecklistCard from "@/components/PreOpChecklistCard";
import HomeReadyChecklistCard from "@/components/HomeReadyChecklistCard";
import { usePreOpChecklist } from "@/hooks/usePreOpChecklist";
import { useHomeReadyChecklist } from "@/hooks/useHomeReadyChecklist";
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
  TrendingDown,
  Home,
  Armchair,
  Hand,
  ShowerHead,
  UtensilsCrossed,
  Users
} from "lucide-react";

const additionalSections = [
  {
    id: 'dvt-info',
    title: 'Understanding DVT Prevention',
    badge: 'NICE',
    content: 'Deep vein thrombosis (DVT) is a blood clot risk after surgery. Prevention includes anticoagulant medication, compression stockings, and early mobilisation. You will perform ankle pumps every hour whilst awake. Report any calf pain, swelling, or breathing difficulties immediately.',
  },
];

export default function PreOp() {
  const [procedure, setProcedure] = useState<"hip" | "knee">("hip");
  const { checklist, toggleItem, completedCount, totalCount } = usePreOpChecklist();
  const { 
    checklist: homeChecklist, 
    toggleItem: toggleHomeItem, 
    completedCount: homeCompletedCount, 
    totalCount: homeTotalCount 
  } = useHomeReadyChecklist();

  const progressPercentage = (completedCount / totalCount) * 100;
  const homeProgressPercentage = (homeCompletedCount / homeTotalCount) * 100;

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
          title="Drink your pre-op drinks as instructed"
          description="Your hospital team will give you special drinks to have before surgery. Drinking them as directed reduces nausea and helps you recover faster."
          statistic="½ day"
          statisticLabel="quicker discharge from hospital"
          checked={checklist.carbDrinksReady}
          onToggle={() => toggleItem('carbDrinksReady')}
          testId="checklist-carb-drinks"
        />
      </div>

      <div className="pt-4">
        <div className="flex items-center gap-3 mb-2">
          <Home className="w-6 h-6 text-accent" />
          <h2 className="text-xl font-medium text-foreground">Getting Your House Ready</h2>
        </div>
        <p className="text-base text-muted-foreground leading-relaxed mb-6">
          Preparing your home environment will make your recovery safer and more comfortable. Complete these arrangements before your surgery.
        </p>

        <Card className="p-5 bg-accent/5 border-accent/20 mb-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-accent" />
              <div>
                <p className="text-sm font-medium text-foreground">
                  {homeCompletedCount} of {homeTotalCount} completed
                </p>
              </div>
            </div>
            {homeCompletedCount === homeTotalCount && homeCompletedCount > 0 && (
              <Badge className="bg-accent text-accent-foreground">
                All done!
              </Badge>
            )}
          </div>
          <Progress value={homeProgressPercentage} className="h-2 mt-3" />
        </Card>

        <div className="space-y-3">
          <HomeReadyChecklistCard
            icon={Armchair}
            title="Clear pathways and remove trip hazards"
            description="Create clear walking routes through your home. Remove or relocate furniture, rugs, and other obstacles that could cause falls."
            checked={homeChecklist.pathsCleared}
            onToggle={() => toggleHomeItem('pathsCleared')}
            testId="home-paths"
          />

          <HomeReadyChecklistCard
            icon={Hand}
            title="Position everyday items at waist height"
            description="Arrange frequently-used items (remote, phone charger, kettle) between knee and shoulder height to avoid bending or reaching during recovery."
            checked={homeChecklist.itemsAtWaistHeight}
            onToggle={() => toggleHomeItem('itemsAtWaistHeight')}
            testId="home-items"
          />

          <HomeReadyChecklistCard
            icon={Hand}
            title="Install grab rails and raised toilet seat"
            description="Install grab rails beside the toilet and in the shower for safety and stability. Consider a raised toilet seat to reduce hip or knee flexion. Your hospital may loan equipment."
            checked={homeChecklist.grabRailsToiletSeat}
            onToggle={() => toggleHomeItem('grabRailsToiletSeat')}
            testId="home-rails"
          />

          <HomeReadyChecklistCard
            icon={ShowerHead}
            title="Obtain a shower chair or stool"
            description="A shower chair allows you to bathe safely whilst managing mobility restrictions. Your hospital may be able to provide one."
            checked={homeChecklist.showerChairReady}
            onToggle={() => toggleHomeItem('showerChairReady')}
            testId="home-shower"
          />

          <HomeReadyChecklistCard
            icon={UtensilsCrossed}
            title="Stock supplies and arrange support"
            description="Stock your freezer with ready meals and ensure adequate supplies of essentials within easy reach. Arrange for someone to provide assistance for the first 2 weeks."
            checked={homeChecklist.freezerStockedHelpSorted}
            onToggle={() => toggleHomeItem('freezerStockedHelpSorted')}
            testId="home-freezer"
          />
        </div>
      </div>

      <div className="pt-2">
        <h2 className="text-lg font-medium text-foreground mb-4 px-1">More Information</h2>
        <ContentAccordion sections={additionalSections} />
      </div>
    </div>
  );
}
