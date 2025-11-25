import { useState } from "react";
import ProcedureToggle from "@/components/ProcedureToggle";
import MilestoneTimeline from "@/components/MilestoneTimeline";
import { Card } from "@/components/ui/card";
import { CheckCircle2, Circle, Car } from "lucide-react";

const hipMilestones = [
  {
    week: 'Week 1-2',
    title: 'Early Mobilisation',
    description: 'Begin walking with frame or crutches. Perform ankle pumps hourly. Follow hip precautions strictly. Manage pain with prescribed medication. Attend physiotherapy.',
    completed: true,
  },
  {
    week: 'Week 3-6',
    title: 'Increasing Independence',
    description: 'Progress from frame to crutches or stick. Increase walking distance to 500-1,000 steps daily. Continue hip precautions. Attend outpatient physiotherapy sessions.',
    completed: true,
  },
  {
    week: 'Week 6-12',
    title: 'Return to Light Activities',
    description: 'Progress to 3,000 steps daily. Hip precautions may be relaxed (confirm with surgeon). Resume light activities like swimming. Continue strengthening exercises.',
    completed: false,
  },
  {
    week: 'Week 12+',
    title: 'Full Recovery',
    description: 'Most patients achieve full independence. Continue exercises to maintain strength. Gradually return to normal activities. Driving permitted with GP clearance and adequate hip control.',
    completed: false,
  },
];

const kneeMilestones = [
  {
    week: 'Week 1-2',
    title: 'Early Mobilisation',
    description: 'Begin walking with frame or crutches. Perform ankle pumps hourly and knee exercises 3 times daily. Aim for 0-90 degrees knee flexion. Manage pain and swelling.',
    completed: true,
  },
  {
    week: 'Week 3-6',
    title: 'Increasing Independence',
    description: 'Progress from frame to crutches or stick. Aim for 0-120 degrees knee flexion. Increase walking to 500-1,000 steps daily. Attend outpatient physiotherapy.',
    completed: true,
  },
  {
    week: 'Week 6-12',
    title: 'Return to Light Activities',
    description: 'Progress to 3,000 steps daily. Most patients walk independently. Resume light activities like swimming and cycling. Continue strengthening exercises.',
    completed: false,
  },
  {
    week: 'Week 12+',
    title: 'Full Recovery',
    description: 'Most patients achieve full independence with good range of motion. Continue exercises to maintain strength and flexibility. Driving permitted with GP clearance when you can perform emergency stop safely.',
    completed: false,
  },
];

export default function Milestones() {
  const [procedure, setProcedure] = useState<"hip" | "knee">("hip");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-medium text-foreground mb-2">Recovery Milestones & Driving</h1>
        <p className="text-base text-muted-foreground leading-relaxed mb-6">
          Track your recovery progress and understand when you can safely return to driving.
        </p>
        <ProcedureToggle selected={procedure} onSelect={setProcedure} />
      </div>

      <div>
        <h2 className="text-lg font-medium text-foreground mb-4 px-1">Recovery Timeline</h2>
        <MilestoneTimeline milestones={procedure === "hip" ? hipMilestones : kneeMilestones} />
      </div>

      <div>
        <h2 className="text-lg font-medium text-foreground mb-4 px-1">Returning to Driving</h2>
        <Card className="p-6">
          <div className="flex gap-4 mb-6">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Car className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-medium text-foreground mb-2">DVLA Guidelines</h3>
              <p className="text-base text-muted-foreground leading-relaxed">
                You may return to driving when you can safely perform an emergency stop and are not impaired by pain medication. This is typically 6-8 weeks for right hip/knee, 4-6 weeks for left side (automatic transmission).
              </p>
            </div>
          </div>

          <div className="space-y-4 pl-2">
            <h4 className="text-base font-medium text-foreground mb-3">Before Driving, You Must Be Able To:</h4>
            <div className="space-y-3">
              <div className="flex gap-3 items-start">
                <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <p className="text-base text-foreground">Enter and exit the vehicle comfortably and safely</p>
              </div>
              <div className="flex gap-3 items-start">
                <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <p className="text-base text-foreground">Perform an emergency stop without hesitation</p>
              </div>
              <div className="flex gap-3 items-start">
                <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <p className="text-base text-foreground">Maintain full control including checking blind spots</p>
              </div>
              <div className="flex gap-3 items-start">
                <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <p className="text-base text-foreground">No longer taking pain medication that impairs judgment</p>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-border">
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Important:</strong> You must obtain clearance from your GP or surgeon before driving. Check with your insurance company regarding cover after surgery. Start with short journeys to build confidence.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
