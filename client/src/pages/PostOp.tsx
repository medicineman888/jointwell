import { useState } from "react";
import ProcedureToggle from "@/components/ProcedureToggle";
import ContentAccordion from "@/components/ContentAccordion";

const hipPostOpSections = [
  {
    id: 'hip-pain',
    title: 'Managing Your Pain',
    badge: 'NICE',
    content: 'Take your pain medication regularly for the first few weeks – don\'t wait until it hurts. Staying on top of the pain means you can move around and do your exercises properly. If your medication isn\'t working, have a word with your GP.',
  },
  {
    id: 'hip-swelling',
    title: 'Dealing With Swelling',
    content: 'Some swelling is completely normal and can hang around for 3-6 months. To help keep it down: put your leg up above your heart for 20 minutes, three times a day. Ice packs wrapped in a tea towel for 15 minutes also help. If the swelling gets suddenly worse or your leg feels hot and red, give your surgeon a call.',
  },
  {
    id: 'hip-wound',
    title: 'Looking After Your Wound',
    badge: 'BOA',
    content: 'Keep your wound dry for two weeks. Don\'t peel off the dressings unless you\'ve been told to. Watch out for signs of infection – more redness, warmth, any gunk coming out, or a temperature over 38°C. Your stitches or staples usually come out after 10-14 days. If you think something\'s not right, contact your surgical team straight away.',
  },
  {
    id: 'hip-movement',
    title: 'Hip Precautions – Movements to Avoid',
    content: (
      <div className="space-y-3">
        <p>For the first 6-12 weeks, there are some movements that could pop your new hip out of place:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Don't bend too far:</strong> Keep your hip at less than 90 degrees</li>
          <li><strong>Don't cross your legs:</strong> Keep your operated leg away from the other one</li>
          <li><strong>Don't twist:</strong> Turn your whole body, not just your hip</li>
          <li><strong>Use your raised toilet seat:</strong> It stops you bending too far</li>
        </ul>
        <p className="text-sm text-muted-foreground mt-4">Your surgeon will let you know when you can start relaxing these rules.</p>
      </div>
    ),
  },
  {
    id: 'hip-complications',
    title: 'When to Get Help',
    content: 'Get medical help straight away if you notice: sudden severe pain, can\'t put weight on your leg, your leg looks shorter or twisted, chest pain or trouble breathing, calf pain with swelling (could be a clot), any gunk coming from your wound, or a temperature over 38°C. Don\'t wait – it\'s always better to check.',
  },
];

const kneePostOpSections = [
  {
    id: 'knee-pain',
    title: 'Managing Your Pain',
    badge: 'NICE',
    content: 'Take your pain medication regularly for the first few weeks – don\'t wait until it hurts. Keeping on top of the pain means you can do your exercises and get your knee bending properly. If your medication isn\'t controlling things, have a word with your GP.',
  },
  {
    id: 'knee-swelling',
    title: 'Dealing With Swelling',
    content: 'Some swelling is completely normal and can stick around for 3-6 months. To help keep it down: put your leg up above your heart for 20 minutes, three times a day. Ice packs wrapped in a tea towel for 15 minutes also help. Keep doing your ankle pumps every hour. If the swelling gets suddenly worse or your knee feels hot and red, give your surgeon a call.',
  },
  {
    id: 'knee-wound',
    title: 'Looking After Your Wound',
    badge: 'BOA',
    content: 'Keep your wound dry for two weeks. Don\'t peel off the dressings unless you\'ve been told to. Watch out for signs of infection – more redness, warmth, any gunk coming out, or a temperature over 38°C. Your stitches or staples usually come out after 10-14 days. If you think something\'s not right, contact your surgical team straight away.',
  },
  {
    id: 'knee-movement',
    title: 'Getting Your Knee Moving',
    content: (
      <div className="space-y-3">
        <p>Getting your knee to straighten and bend properly is really important. Start these exercises straight away:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Heel slides:</strong> Slide your heel towards your bum, hold for 5 seconds, do it 10 times</li>
          <li><strong>Straightening:</strong> Tighten your thigh, push your knee flat, hold for 5 seconds</li>
          <li><strong>Ankle pumps:</strong> Move your foot up and down, 20 times every hour</li>
        </ul>
        <p className="text-sm text-muted-foreground mt-4">Aim to bend to 90 degrees by week 2, and 120 degrees by week 6.</p>
      </div>
    ),
  },
  {
    id: 'knee-complications',
    title: 'When to Get Help',
    content: 'Get medical help straight away if you notice: sudden severe pain, can\'t put weight on your leg, your knee feels wobbly or unstable, chest pain or trouble breathing, calf pain with swelling (could be a clot), any gunk coming from your wound, a temperature over 38°C, or you can\'t straighten your knee after 2 weeks. Don\'t wait – it\'s always better to check.',
  },
];

export default function PostOp() {
  const [procedure, setProcedure] = useState<"hip" | "knee">("hip");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-medium text-foreground mb-2">After Your Surgery</h1>
        <p className="text-base text-muted-foreground leading-relaxed mb-6">
          What to expect, what's normal, and what to watch out for as you recover.
        </p>
        <ProcedureToggle selected={procedure} onSelect={setProcedure} />
      </div>

      <ContentAccordion sections={procedure === "hip" ? hipPostOpSections : kneePostOpSections} />
    </div>
  );
}
