import { useState } from "react";
import ProcedureToggle from "@/components/ProcedureToggle";
import MilestoneTimeline from "@/components/MilestoneTimeline";
import { Card } from "@/components/ui/card";
import { CheckCircle2, Car } from "lucide-react";

const hipMilestones = [
  {
    week: 'Week 1-2',
    title: 'First Steps',
    description: 'You\'ll be up and walking with a frame or crutches. Do your ankle pumps every hour, follow your hip precautions, and take your pain meds regularly. You\'ll have physio sessions to get you moving.',
    completed: true,
  },
  {
    week: 'Week 3-6',
    title: 'Getting More Independent',
    description: 'Move from the frame to crutches or a stick. Start building up your walking – aim for 500-1,000 steps a day. Keep following your hip precautions and going to your physio appointments.',
    completed: true,
  },
  {
    week: 'Week 6-12',
    title: 'Back to Normal Activities',
    description: 'Build up to 3,000 steps a day. Your surgeon might relax the hip precautions around now – check with them first. You can start doing things like swimming. Keep up your strengthening exercises.',
    completed: false,
  },
  {
    week: 'Week 12+',
    title: 'Full Recovery',
    description: 'Most people are back to normal by now. Keep exercising to stay strong. You can gradually get back to your usual activities. Driving is usually fine once your GP says so and you can do an emergency stop comfortably.',
    completed: false,
  },
];

const kneeMilestones = [
  {
    week: 'Week 1-2',
    title: 'First Steps',
    description: 'You\'ll be up and walking with a frame or crutches. Do your ankle pumps every hour and your knee exercises three times a day. Aim to bend your knee to 90 degrees. Take your pain meds and manage the swelling.',
    completed: true,
  },
  {
    week: 'Week 3-6',
    title: 'Getting More Independent',
    description: 'Move from the frame to crutches or a stick. Work on bending your knee to 120 degrees. Build up your walking to 500-1,000 steps a day. Keep going to your physio appointments.',
    completed: true,
  },
  {
    week: 'Week 6-12',
    title: 'Back to Normal Activities',
    description: 'Build up to 3,000 steps a day. Most people are walking without aids by now. You can start doing things like swimming and gentle cycling. Keep up your strengthening exercises.',
    completed: false,
  },
  {
    week: 'Week 12+',
    title: 'Full Recovery',
    description: 'Most people are back to normal with good movement in their knee. Keep exercising to stay strong and flexible. Driving is usually fine once your GP says so and you can do an emergency stop without hesitating.',
    completed: false,
  },
];

export default function Milestones() {
  const [procedure, setProcedure] = useState<"hip" | "knee">("hip");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-medium text-foreground mb-2">Your Recovery Timeline</h1>
        <p className="text-base text-muted-foreground leading-relaxed mb-6">
          A rough guide to what to expect week by week – and when you might be able to drive again.
        </p>
        <ProcedureToggle selected={procedure} onSelect={setProcedure} />
      </div>

      <div>
        <h2 className="text-lg font-medium text-foreground mb-4 px-1">What to Expect</h2>
        <MilestoneTimeline milestones={procedure === "hip" ? hipMilestones : kneeMilestones} />
      </div>

      <div>
        <h2 className="text-lg font-medium text-foreground mb-4 px-1">Getting Back Behind the Wheel</h2>
        <Card className="p-6">
          <div className="flex gap-4 mb-6">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Car className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-medium text-foreground mb-2">When Can I Drive?</h3>
              <p className="text-base text-muted-foreground leading-relaxed">
                You can drive again when you can safely do an emergency stop and you're not taking strong painkillers. That's usually 6-8 weeks if it was your right hip or knee, or 4-6 weeks for the left side if you drive an automatic.
              </p>
            </div>
          </div>

          <div className="space-y-4 pl-2">
            <h4 className="text-base font-medium text-foreground mb-3">Before you drive, you need to be able to:</h4>
            <div className="space-y-3">
              <div className="flex gap-3 items-start">
                <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <p className="text-base text-foreground">Get in and out of the car comfortably</p>
              </div>
              <div className="flex gap-3 items-start">
                <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <p className="text-base text-foreground">Do an emergency stop without any hesitation</p>
              </div>
              <div className="flex gap-3 items-start">
                <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <p className="text-base text-foreground">Check your blind spots and stay in full control</p>
              </div>
              <div className="flex gap-3 items-start">
                <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <p className="text-base text-foreground">Be off any painkillers that could affect your reactions</p>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-border">
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Important:</strong> Get the all-clear from your GP or surgeon first. Check with your insurance company too – they might want to know about your surgery. Start with short trips to get your confidence back.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
