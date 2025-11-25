import StepCounter from '../StepCounter';

export default function StepCounterExample() {
  return (
    <div className="p-4 space-y-6">
      <StepCounter 
        steps={1847} 
        goal={2000}
        recoveryWeek={3}
        recoveryPhase={{
          name: "Building Mobility",
          description: "Gradually increasing activity. Swelling management remains important."
        }}
        procedureType="knee"
        onOpenSettings={() => console.log('Open settings')}
        permissionGranted={true}
      />
    </div>
  );
}
