import { Info } from "lucide-react";

export default function DisclaimerBanner() {
  return (
    <div className="bg-muted border-t border-border p-4">
      <div className="flex gap-3 items-start max-w-4xl mx-auto">
        <Info className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
        <p className="text-sm text-muted-foreground leading-relaxed">
          This app supports your recovery but does not replace clinical advice. If you develop chest pain, shortness of breath, calf swelling, fever, or wound leakage, seek urgent medical care.
        </p>
      </div>
    </div>
  );
}
