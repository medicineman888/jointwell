import MilestoneTimeline from '../MilestoneTimeline';

const milestones = [
  {
    week: 'Week 1-2',
    title: 'Early Mobilisation',
    description: 'Begin walking with aids, perform ankle pumps hourly, and manage pain with prescribed medication.',
    completed: true,
  },
  {
    week: 'Week 3-6',
    title: 'Increasing Independence',
    description: 'Gradually reduce walking aids, increase walking distance to 500-1000 steps daily, and attend physiotherapy sessions.',
    completed: true,
  },
  {
    week: 'Week 6-12',
    title: 'Return to Activities',
    description: 'Progress to 3,000 steps daily, resume light activities, and continue strengthening exercises.',
    completed: false,
  },
  {
    week: 'Week 12+',
    title: 'Full Recovery',
    description: 'Most patients achieve full independence. Continue exercises and gradually return to normal activities including driving (with GP clearance).',
    completed: false,
  },
];

export default function MilestoneTimelineExample() {
  return (
    <div className="p-4">
      <MilestoneTimeline milestones={milestones} />
    </div>
  );
}
