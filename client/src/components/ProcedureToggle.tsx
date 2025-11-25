import { Button } from "@/components/ui/button";

interface ProcedureToggleProps {
  selected: "hip" | "knee";
  onSelect: (procedure: "hip" | "knee") => void;
}

export default function ProcedureToggle({ selected, onSelect }: ProcedureToggleProps) {
  return (
    <div className="flex gap-2 p-1 bg-muted rounded-lg">
      <Button
        variant={selected === "hip" ? "default" : "ghost"}
        onClick={() => onSelect("hip")}
        className="flex-1"
        data-testid="button-select-hip"
      >
        Hip Replacement
      </Button>
      <Button
        variant={selected === "knee" ? "default" : "ghost"}
        onClick={() => onSelect("knee")}
        className="flex-1"
        data-testid="button-select-knee"
      >
        Knee Replacement
      </Button>
    </div>
  );
}
