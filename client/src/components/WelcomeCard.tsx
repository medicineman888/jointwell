import { Card } from "@/components/ui/card";
import logoImage from "@assets/JointWell Logo Mk1_1764104757072.png";

export default function WelcomeCard() {
  return (
    <Card className="p-6">
      <div className="flex items-start gap-4">
        <img 
          src={logoImage} 
          alt="JointWell" 
          className="w-14 h-14 rounded-full flex-shrink-0"
        />
        <div className="space-y-2">
          <h2 className="text-2xl font-medium text-foreground">Welcome to JointWell</h2>
          <p className="text-base text-foreground leading-relaxed">
            Your friendly guide to getting through hip or knee replacement surgery. We'll help you prepare, recover, and get back on your feet.
          </p>
        </div>
      </div>
    </Card>
  );
}
