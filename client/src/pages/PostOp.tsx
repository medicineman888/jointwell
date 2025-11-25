import { useState } from "react";
import ProcedureToggle from "@/components/ProcedureToggle";
import ContentAccordion from "@/components/ContentAccordion";

const hipPostOpSections = [
  {
    id: 'hip-pain',
    title: 'Pain Management',
    badge: 'NICE',
    content: 'Take prescribed pain medication regularly for the first few weeks, even if pain is mild. This allows you to participate in physiotherapy and maintain mobility. Do not wait until pain is severe. Contact your GP if pain is not controlled or worsens unexpectedly.',
  },
  {
    id: 'hip-swelling',
    title: 'Managing Swelling',
    content: 'Swelling is normal for 3-6 months. Elevate your leg above heart level for 20 minutes, 3 times daily. Apply ice packs (wrapped in towel) for 15 minutes, 3-4 times daily. Reduce activity if swelling increases. Contact your surgeon if swelling is severe, sudden, or accompanied by warmth and redness.',
  },
  {
    id: 'hip-wound',
    title: 'Wound Care',
    badge: 'BOA',
    content: 'Keep wound dry for 14 days. Do not remove dressings unless instructed. Look for signs of infection: increased redness, warmth, discharge, or fever above 38°C. Stitches/staples typically removed at 10-14 days. Contact your surgical team immediately if you suspect infection.',
  },
  {
    id: 'hip-movement',
    title: 'Hip Precautions',
    content: (
      <div className="space-y-3">
        <p>For the first 6-12 weeks, avoid movements that can dislocate your hip:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>No bending:</strong> Do not bend hip beyond 90 degrees</li>
          <li><strong>No crossing:</strong> Do not cross your operated leg over the other</li>
          <li><strong>No twisting:</strong> Do not twist or pivot on your operated leg</li>
          <li><strong>Use raised toilet seat</strong> to avoid excessive hip flexion</li>
        </ul>
        <p className="text-sm text-muted-foreground mt-4">Your surgeon will advise when these restrictions can be relaxed.</p>
      </div>
    ),
  },
  {
    id: 'hip-complications',
    title: 'Recognising Complications',
    content: 'Seek immediate medical attention for: sudden severe pain, inability to weight-bear, leg appears shorter or rotated, chest pain or breathing difficulties, calf pain with swelling (DVT signs), wound discharge or fever above 38°C.',
  },
];

const kneePostOpSections = [
  {
    id: 'knee-pain',
    title: 'Pain Management',
    badge: 'NICE',
    content: 'Take prescribed pain medication regularly for the first few weeks, even if pain is mild. This allows you to participate in physiotherapy and achieve full range of motion. Do not wait until pain is severe. Contact your GP if pain is not controlled or worsens unexpectedly.',
  },
  {
    id: 'knee-swelling',
    title: 'Managing Swelling',
    content: 'Swelling is normal for 3-6 months. Elevate your leg above heart level for 20 minutes, 3 times daily. Apply ice packs (wrapped in towel) for 15 minutes, 3-4 times daily. Perform ankle pumps hourly. Reduce activity if swelling increases. Contact your surgeon if swelling is severe, sudden, or accompanied by warmth and redness.',
  },
  {
    id: 'knee-wound',
    title: 'Wound Care',
    badge: 'BOA',
    content: 'Keep wound dry for 14 days. Do not remove dressings unless instructed. Look for signs of infection: increased redness, warmth, discharge, or fever above 38°C. Stitches/staples typically removed at 10-14 days. Contact your surgical team immediately if you suspect infection.',
  },
  {
    id: 'knee-movement',
    title: 'Range of Motion Exercises',
    content: (
      <div className="space-y-3">
        <p>Achieving full knee extension (straight) and flexion (bent) is crucial. Begin these exercises immediately:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Heel slides:</strong> Slide heel towards buttock, hold 5 seconds, repeat 10 times</li>
          <li><strong>Knee extensions:</strong> Tighten thigh, straighten knee fully, hold 5 seconds</li>
          <li><strong>Ankle pumps:</strong> Move foot up and down, 20 repetitions hourly</li>
        </ul>
        <p className="text-sm text-muted-foreground mt-4">Aim for 0-90 degrees flexion by week 2, 0-120 degrees by week 6.</p>
      </div>
    ),
  },
  {
    id: 'knee-complications',
    title: 'Recognising Complications',
    content: 'Seek immediate medical attention for: sudden severe pain, inability to weight-bear, knee feels unstable, chest pain or breathing difficulties, calf pain with swelling (DVT signs), wound discharge or fever above 38°C, inability to achieve straight knee after 2 weeks.',
  },
];

export default function PostOp() {
  const [procedure, setProcedure] = useState<"hip" | "knee">("hip");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-medium text-foreground mb-2">Post-Operative Risks & Management</h1>
        <p className="text-base text-muted-foreground leading-relaxed mb-6">
          Understanding potential complications and how to manage your recovery safely.
        </p>
        <ProcedureToggle selected={procedure} onSelect={setProcedure} />
      </div>

      <ContentAccordion sections={procedure === "hip" ? hipPostOpSections : kneePostOpSections} />
    </div>
  );
}
