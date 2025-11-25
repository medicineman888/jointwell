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
    title: 'Preventing Blood Clots (DVT)',
    badge: 'NICE',
    content: 'Blood clots are a risk after any surgery, but there\'s lots you can do to prevent them. You\'ll be given blood-thinning medication and compression stockings. The best thing you can do is keep moving – get up and walk when you can, and do your ankle pumps every hour while you\'re awake. If you get calf pain, swelling, or any trouble breathing, tell someone straight away.',
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
        <h1 className="text-2xl font-medium text-foreground mb-2">Before Your Surgery</h1>
        <p className="text-base text-muted-foreground leading-relaxed mb-6">
          Five things that make the biggest difference. Start these 4–6 weeks before surgery for the fastest, smoothest recovery.
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
          title="Get your blood sugar sorted (if diabetic)"
          description="Aim for HbA1c below 69 mmol/mol (8.5%). Pop in to see your GP or diabetes nurse to get your levels as good as possible before the op."
          statistic="~30%"
          statisticLabel="lower infection risk with good control"
          checked={checklist.bloodSugarSorted}
          onToggle={() => toggleItem('bloodSugarSorted')}
          testId="checklist-blood-sugar"
        />

        <PreOpChecklistCard
          icon={Dumbbell}
          title="Build up your arms, shoulders and core"
          description="Just 10–15 minutes a day of seated exercises makes a huge difference. Stronger upper body means crutches are a doddle, and you'll be up walking the same day as surgery."
          statistic="1 day"
          statisticLabel="shorter hospital stay on average"
          checked={checklist.dailyExercises}
          onToggle={() => toggleItem('dailyExercises')}
          testId="checklist-exercises"
        />

        <PreOpChecklistCard
          icon={Scale}
          title="Shift some weight if your BMI is over 40"
          description="Even losing a few kilos over 6 weeks helps a lot. Every half stone you lose cuts your risk of wound problems and blood clots."
          statistic="25–35%"
          statisticLabel="lower risk per 5 kg lost"
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
          Sort this before you go in – saves a load of hassle when you're on crutches. The more you get ready now, the less you'll be struggling when you get home!
        </p>

        <Card className="p-5 bg-accent/5 border-accent/20 mb-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-accent" />
              <div>
                <p className="text-sm font-medium text-foreground">
                  {homeCompletedCount} of {homeTotalCount} sorted
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
            title="Paths cleared – no trip hazards"
            description="Clear a wide path through the living room and bedroom. Shift chairs, rugs and coffee tables out of the way so you're not tripping over stuff."
            checked={homeChecklist.pathsCleared}
            onToggle={() => toggleHomeItem('pathsCleared')}
            testId="home-paths"
          />

          <HomeReadyChecklistCard
            icon={Hand}
            title="Everyday stuff at waist height"
            description="Put everything you use daily (remote, phone charger, kettle, biscuits) between knee and shoulder height – no bending or reaching."
            checked={homeChecklist.itemsAtWaistHeight}
            onToggle={() => toggleHomeItem('itemsAtWaistHeight')}
            testId="home-items"
          />

          <HomeReadyChecklistCard
            icon={Hand}
            title="Grab rails and raised toilet seat sorted"
            description="Fit a grab rail by the toilet and in the shower if you can. Get a raised toilet seat – makes life much easier. Your hospital might lend you one, so ask."
            checked={homeChecklist.grabRailsToiletSeat}
            onToggle={() => toggleHomeItem('grabRailsToiletSeat')}
            testId="home-rails"
          />

          <HomeReadyChecklistCard
            icon={ShowerHead}
            title="Shower chair ready"
            description="Get a shower chair or stool – you'll be glad you did. Again, the hospital might be able to lend you one."
            checked={homeChecklist.showerChairReady}
            onToggle={() => toggleHomeItem('showerChairReady')}
            testId="home-shower"
          />

          <HomeReadyChecklistCard
            icon={UtensilsCrossed}
            title="Freezer stocked and help lined up"
            description="Stock the freezer with easy meals. Have plenty of loo roll, tea bags and milk within reach. Sort someone to help for the first 2 weeks – even just popping round once a day helps."
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
