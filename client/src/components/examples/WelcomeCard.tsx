import WelcomeCard from '../WelcomeCard';

export default function WelcomeCardExample() {
  return (
    <div className="p-4">
      <WelcomeCard isPreOp={true} weeksUntilSurgery={5} recoveryWeek={null} procedureLabel="Total Knee Arthroplasty" />
    </div>
  );
}
