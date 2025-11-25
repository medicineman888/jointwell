import { Info } from "lucide-react";

export default function DisclaimerBanner() {
  return (
    <div className="bg-muted border-t border-border p-4">
      <div className="flex gap-3 items-start max-w-4xl mx-auto">
        <Info className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
        <p className="text-sm text-muted-foreground leading-relaxed">
          This app supports your recovery. It is not a substitute for medical advice – always consult your surgeon or GP.
        </p>
      </div>
    </div>
  );
}
