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
    id: 'complications-prevention',
    title: 'Avoiding Complications – Infection & Clot Prevention',
    badge: 'NICE',
    content: (
      <div className="space-y-4">
        <p className="text-base text-foreground font-medium">Simple steps that make a big difference to staying safe after your operation</p>
        
        <div className="space-y-5">
          <div>
            <h4 className="font-medium text-foreground mb-2">Keep visitors with coughs, colds or infections away for the first 2 weeks</h4>
            <p className="text-muted-foreground">Germs can cause problems with the new joint. Ask family and friends to visit once they're fully better.</p>
          </div>
          
          <div>
            <h4 className="font-medium text-foreground mb-2">Keep the wound clean and dry – hands off the dressing</h4>
            <p className="text-muted-foreground">No baths or soaking until your nurse says it's safe (usually 2 weeks). If the wound becomes red, hot, swollen or leaky, or you feel feverish, contact your GP or the ward straight away.</p>
          </div>
          
          <div>
            <h4 className="font-medium text-foreground mb-2">Do your ankle pump exercises every hour you're awake</h4>
            <p className="text-muted-foreground">Point your toes up towards your nose, then down towards the floor – 10 times each hour. This keeps blood moving in your legs and greatly reduces the risk of a clot.</p>
          </div>
          
          <div>
            <h4 className="font-medium text-foreground mb-2">Take your blood-thinning medication exactly as prescribed</h4>
            <p className="text-muted-foreground">You'll usually be given tablets or injections for 14–28 days (sometimes longer). Don't miss a dose – it's the most effective way to prevent clots.</p>
          </div>
          
          <div>
            <h4 className="font-medium text-foreground mb-2">Keep moving as much as you're able</h4>
            <p className="text-muted-foreground">Short, frequent walks around the house (even with crutches or a frame) help blood flow and lower clot risk.</p>
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-border">
          <p className="text-sm text-muted-foreground mb-4">Tick when you're doing it – getting these five right gives you the best chance of a smooth recovery.</p>
          <ul className="space-y-2 text-sm text-foreground">
            <li>☐ Keeping poorly visitors away</li>
            <li>☐ Wound clean & dry – know the warning signs</li>
            <li>☐ Ankle pumps every waking hour</li>
            <li>☐ Taking blood-thinners as prescribed</li>
            <li>☐ Little and often walks around the house</li>
          </ul>
        </div>
      </div>
    ),
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
