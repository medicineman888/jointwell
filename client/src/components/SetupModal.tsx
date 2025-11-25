import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Settings, Circle, Clock, CheckCircle } from "lucide-react";
import { format } from "date-fns";

interface SetupModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  procedureType: "hip" | "knee" | null;
  surgeryDate: string | null;
  rehabPhase: "pre-op" | "post-op";
  onSave: (procedureType: "hip" | "knee", surgeryDate: string | null, rehabPhase: "pre-op" | "post-op") => void;
}

export default function SetupModal({ 
  open, 
  onOpenChange, 
  procedureType: initialProcedure, 
  surgeryDate: initialDate,
  rehabPhase: initialPhase,
  onSave 
}: SetupModalProps) {
  const [selectedProcedure, setSelectedProcedure] = useState<"hip" | "knee" | null>(initialProcedure);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    initialDate ? new Date(initialDate) : undefined
  );
  const [selectedPhase, setSelectedPhase] = useState<"pre-op" | "post-op">(initialPhase);
  const [calendarOpen, setCalendarOpen] = useState(false);

  useEffect(() => {
    setSelectedProcedure(initialProcedure);
    setSelectedDate(initialDate ? new Date(initialDate) : undefined);
    setSelectedPhase(initialPhase);
  }, [initialProcedure, initialDate, initialPhase, open]);

  const handleSave = () => {
    if (selectedProcedure) {
      const dateStr = selectedDate ? selectedDate.toISOString().split('T')[0] : null;
      onSave(selectedProcedure, dateStr, selectedPhase);
      onOpenChange(false);
    }
  };

  const canSave = selectedProcedure !== null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Tell Us About You
          </DialogTitle>
          <DialogDescription>
            A few quick details so we can give you the right goals and guidance.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div>
            <label className="text-sm font-medium text-foreground mb-3 block">
              Which joint are you having done?
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
              Where are you in your journey?
            </label>
            <div className="grid grid-cols-2 gap-3">
              <Card 
                className={`p-4 cursor-pointer transition-all ${
                  selectedPhase === "pre-op" 
                    ? "border-primary bg-primary/5" 
                    : "hover-elevate"
                }`}
                onClick={() => setSelectedPhase("pre-op")}
                data-testid="button-select-preop"
              >
                <div className="text-center">
                  <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-accent/10 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-accent" />
                  </div>
                  <div className="font-medium text-foreground">Before surgery</div>
                  <div className="text-xs text-muted-foreground">Getting ready</div>
                </div>
              </Card>
              <Card 
                className={`p-4 cursor-pointer transition-all ${
                  selectedPhase === "post-op" 
                    ? "border-primary bg-primary/5" 
                    : "hover-elevate"
                }`}
                onClick={() => setSelectedPhase("post-op")}
                data-testid="button-select-postop"
              >
                <div className="text-center">
                  <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-primary/10 flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-primary" />
                  </div>
                  <div className="font-medium text-foreground">After surgery</div>
                  <div className="text-xs text-muted-foreground">Recovering</div>
                </div>
              </Card>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-foreground mb-3 block">
              {selectedPhase === "pre-op" ? "When's your surgery? (optional)" : "When was your surgery?"}
            </label>
            <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                  data-testid="button-select-date"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {selectedDate 
                    ? format(selectedDate, "d MMMM yyyy") 
                    : selectedPhase === "pre-op" 
                      ? "Pick a date" 
                      : "Pick a date"
                  }
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
                  disabled={(date) => selectedPhase === "post-op" && date > new Date()}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            {selectedPhase === "pre-op" && (
              <p className="text-xs text-muted-foreground mt-2">
                If you know your surgery date, pop it in – it helps us tailor your preparation.
              </p>
            )}
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
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
