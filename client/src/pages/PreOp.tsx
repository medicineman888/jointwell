import { useState } from "react";
import ProcedureToggle from "@/components/ProcedureToggle";
import ContentAccordion from "@/components/ContentAccordion";

const hipPreOpSections = [
  {
    id: 'hip-exercises',
    title: 'Pre-operative Strengthening Exercises',
    badge: 'NICE',
    content: (
      <div className="space-y-3">
        <p>Begin strengthening exercises 4-6 weeks before surgery. Focus on:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Quadriceps sets:</strong> Tighten thigh muscles, hold 5 seconds, repeat 10 times</li>
          <li><strong>Glute squeezes:</strong> Tighten buttock muscles, hold 5 seconds, repeat 10 times</li>
          <li><strong>Hip abduction:</strong> Lie on side, lift top leg slowly, repeat 10 times each side</li>
          <li><strong>Ankle pumps:</strong> Move foot up and down, 20 repetitions hourly</li>
        </ul>
        <p className="text-sm text-muted-foreground mt-4">Perform 2-3 times daily. Stronger muscles improve post-operative outcomes.</p>
      </div>
    ),
  },
  {
    id: 'hip-preparation',
    title: 'Preparing Your Home',
    content: 'Arrange furniture to create clear walking paths. Install grab rails in bathroom if possible. Move frequently used items to waist height. Consider a raised toilet seat and shower chair. Arrange help for first 2 weeks post-surgery.',
  },
  {
    id: 'hip-health',
    title: 'Optimising Your Health',
    badge: 'BOA',
    content: 'Stop smoking at least 4 weeks before surgery to improve healing. Maintain a healthy weight. Continue regular medications unless advised otherwise. Inform your surgeon of all medications and supplements. Report any infections to your surgical team immediately.',
  },
  {
    id: 'hip-dvt',
    title: 'Understanding DVT Prevention',
    badge: 'NICE',
    content: 'Deep vein thrombosis (DVT) is a blood clot risk after surgery. Prevention includes anticoagulant medication, compression stockings, and early mobilisation. You will perform ankle pumps every hour whilst awake. Report any calf pain, swelling, or breathing difficulties immediately.',
  },
];

const kneePreOpSections = [
  {
    id: 'knee-exercises',
    title: 'Pre-operative Strengthening Exercises',
    badge: 'NICE',
    content: (
      <div className="space-y-3">
        <p>Begin strengthening exercises 4-6 weeks before surgery. Focus on:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Quadriceps sets:</strong> Tighten thigh muscles, hold 5 seconds, repeat 10 times</li>
          <li><strong>Straight leg raises:</strong> Tighten thigh, lift leg 15cm, hold 3 seconds, repeat 10 times</li>
          <li><strong>Knee extensions:</strong> Sit with leg supported, straighten knee fully, hold 5 seconds</li>
          <li><strong>Ankle pumps:</strong> Move foot up and down, 20 repetitions hourly</li>
        </ul>
        <p className="text-sm text-muted-foreground mt-4">Perform 2-3 times daily. Stronger muscles improve post-operative outcomes.</p>
      </div>
    ),
  },
  {
    id: 'knee-preparation',
    title: 'Preparing Your Home',
    content: 'Arrange furniture to create clear walking paths. Install grab rails in bathroom if possible. Move frequently used items to waist height. Consider a raised toilet seat. Remove trip hazards like loose rugs. Arrange help for first 2 weeks post-surgery.',
  },
  {
    id: 'knee-health',
    title: 'Optimising Your Health',
    badge: 'BOA',
    content: 'Stop smoking at least 4 weeks before surgery to improve healing. Maintain a healthy weight to reduce stress on your new knee. Continue regular medications unless advised otherwise. Inform your surgeon of all medications and supplements. Report any infections to your surgical team immediately.',
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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-medium text-foreground mb-2">Pre-Operative Preparation</h1>
        <p className="text-base text-muted-foreground leading-relaxed mb-6">
          Evidence-based guidance to prepare for your surgery and optimise recovery outcomes.
        </p>
        <ProcedureToggle selected={procedure} onSelect={setProcedure} />
      </div>

      <ContentAccordion sections={procedure === "hip" ? hipPreOpSections : kneePreOpSections} />
    </div>
  );
}
