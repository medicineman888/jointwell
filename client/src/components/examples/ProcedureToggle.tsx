import { useState } from 'react';
import ProcedureToggle from '../ProcedureToggle';

export default function ProcedureToggleExample() {
  const [selected, setSelected] = useState<"hip" | "knee">("hip");

  return (
    <div className="p-4">
      <ProcedureToggle selected={selected} onSelect={setSelected} />
    </div>
  );
}
