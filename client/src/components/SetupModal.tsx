import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Settings, Circle } from "lucide-react";
import { format } from "date-fns";

interface SetupModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  procedureType: "hip" | "knee" | null;
  surgeryDate: string | null;
  onSave: (procedureType: "hip" | "knee", surgeryDate: string) => void;
}

export default function SetupModal({ 
  open, 
  onOpenChange, 
  procedureType: initialProcedure, 
  surgeryDate: initialDate,
  onSave 
}: SetupModalProps) {
  const [selectedProcedure, setSelectedProcedure] = useState<"hip" | "knee" | null>(initialProcedure);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    initialDate ? new Date(initialDate) : undefined
  );
  const [calendarOpen, setCalendarOpen] = useState(false);

  const handleSave = () => {
    if (selectedProcedure && selectedDate) {
      onSave(selectedProcedure, selectedDate.toISOString().split('T')[0]);
      onOpenChange(false);
    }
  };

  const canSave = selectedProcedure !== null && selectedDate !== undefined;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Your Recovery Details
          </DialogTitle>
          <DialogDescription>
            Set your procedure type and surgery date to receive personalised step goals based on your recovery stage.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div>
            <label className="text-sm font-medium text-foreground mb-3 block">
              Type of Replacement
            </label>
            <div className="grid grid-cols-2 gap-3">
              <Card 
                className={`p-4 cursor-pointer transition-all ${
                  selectedProcedure === "hip" 
                    ? "border-primary bg-primary/5" 
                    : "hover-elevate"
                }`}
                onClick={() => setSelectedProcedure("hip")}
                data-testid="button-select-hip-setup"
              >
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-primary/10 flex items-center justify-center">
                    <Circle className="w-6 h-6 text-primary" />
                  </div>
                  <div className="font-medium text-foreground">Hip</div>
                  <div className="text-xs text-muted-foreground">Replacement</div>
                </div>
              </Card>
              <Card 
                className={`p-4 cursor-pointer transition-all ${
                  selectedProcedure === "knee" 
                    ? "border-primary bg-primary/5" 
                    : "hover-elevate"
                }`}
                onClick={() => setSelectedProcedure("knee")}
                data-testid="button-select-knee-setup"
              >
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-primary/10 flex items-center justify-center">
                    <svg className="w-6 h-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 4v4M12 16v4M8 12h8M12 12a2 2 0 100-4 2 2 0 000 4z" />
                    </svg>
                  </div>
                  <div className="font-medium text-foreground">Knee</div>
                  <div className="text-xs text-muted-foreground">Replacement</div>
                </div>
              </Card>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-foreground mb-3 block">
              Date of Surgery
            </label>
            <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                  data-testid="button-select-date"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {selectedDate ? format(selectedDate, "d MMMM yyyy") : "Select your surgery date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => {
                    setSelectedDate(date);
                    setCalendarOpen(false);
                  }}
                  disabled={(date) => date > new Date()}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div className="flex gap-3">
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSave}
            disabled={!canSave}
            className="flex-1"
            data-testid="button-save-settings"
          >
            Save Settings
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
