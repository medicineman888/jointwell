import { Card } from "@/components/ui/card";
import { Heart } from "lucide-react";

export default function WelcomeCard() {
  return (
    <Card className="p-6">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
          <Heart className="w-6 h-6 text-primary" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-medium text-foreground">Welcome to Jointwell</h2>
          <p className="text-base text-foreground leading-relaxed">
            Your evidence-based companion for hip and knee replacement recovery. We provide guidance from NICE and BOA recommendations to support your journey.
          </p>
        </div>
      </div>
    </Card>
  );
}
