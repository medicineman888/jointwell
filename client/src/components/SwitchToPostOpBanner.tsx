import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, CheckCircle, ArrowRight } from "lucide-react";
import { format } from "date-fns";

interface SwitchToPostOpBannerProps {
  onSwitch: (surgeryDate: string) => void;
}

export default function SwitchToPostOpBanner({ onSwitch }: SwitchToPostOpBannerProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [calendarOpen, setCalendarOpen] = useState(false);

  const handleConfirm = () => {
    if (selectedDate) {
      onSwitch(selectedDate.toISOString().split('T')[0]);
      setDialogOpen(false);
    }
  };

  return (
    <>
      <Card className="p-6 bg-primary/5 border-primary/20">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-start gap-4 flex-1">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <CheckCircle className="w-5 h-5 text-primary" />
            </div>
            <div className="space-y-1 flex-1">
              <h3 className="text-base font-medium text-foreground">Had your surgery?</h3>
              <p className="text-sm text-muted-foreground">
                Tap here to switch to recovery mode with step goals tailored to your healing.
              </p>
            </div>
          </div>
          <Button 
            onClick={() => setDialogOpen(true)}
            className="flex-shrink-0"
            data-testid="button-switch-to-postop"
          >
            Switch
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-primary" />
              Surgery Done!
            </DialogTitle>
            <DialogDescription>
              Congratulations – you've got through the hard part! Pop in your surgery date so we can track your recovery properly.
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <label className="text-sm font-medium text-foreground mb-3 block">
              When was your surgery?
            </label>
            <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                  data-testid="button-select-surgery-date"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {selectedDate ? format(selectedDate, "d MMMM yyyy") : "Pick a date"}
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

          <div className="flex gap-3">
            <Button 
              variant="outline" 
              onClick={() => setDialogOpen(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleConfirm}
              disabled={!selectedDate}
              className="flex-1"
              data-testid="button-confirm-switch"
            >
              Start Recovery
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
