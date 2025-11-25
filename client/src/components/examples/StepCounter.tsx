import StepCounter from '../StepCounter';

export default function StepCounterExample() {
  return (
    <div className="p-4">
      <StepCounter 
        steps={1847} 
        goal={3000} 
        permissionGranted={true}
      />
    </div>
  );
}
