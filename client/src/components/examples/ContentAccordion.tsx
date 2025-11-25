import ContentAccordion from '../ContentAccordion';

const sections = [
  {
    id: 'pre-op-exercises',
    title: 'Pre-operative Strengthening',
    badge: 'NICE',
    content: 'Begin quadriceps and hip flexor exercises 4-6 weeks before surgery. Stronger muscles improve post-operative outcomes and reduce recovery time. Aim for 10-15 repetitions, 2-3 times daily.',
  },
  {
    id: 'dvt-prevention',
    title: 'DVT Prevention',
    badge: 'BOA',
    content: 'Deep vein thrombosis prevention includes regular ankle pumps, early mobilisation, compression stockings, and anticoagulant medication as prescribed. Perform ankle pumps every hour whilst awake for the first 2 weeks.',
  },
  {
    id: 'pain-management',
    title: 'Pain Management',
    content: 'Take prescribed pain medication regularly for the first few weeks, even if pain is mild. This allows you to participate in physiotherapy and maintain mobility. Contact your GP if pain is not controlled or worsens.',
  },
];

export default function ContentAccordionExample() {
  return (
    <div className="p-4">
      <ContentAccordion sections={sections} />
    </div>
  );
}
